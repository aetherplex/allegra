import {
  Algodv2,
  Indexer,
  makeApplicationCreateTxnFromObject,
  makeApplicationNoOpTxnFromObject,
  makeAssetConfigTxnWithSuggestedParamsFromObject,
  makeAssetCreateTxnWithSuggestedParamsFromObject,
  makeAssetFreezeTxnWithSuggestedParamsFromObject,
  makeAssetTransferTxnWithSuggestedParamsFromObject,
  makePaymentTxnWithSuggestedParamsFromObject,
  OnApplicationComplete,
  SuggestedParams,
  Transaction,
} from 'algosdk';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNetwork } from '../store/networkSlice/selectors';
import { IFormValues } from '../types';
import { verboseWaitForConfirmation } from '../utils/algod';
declare const AlgoSigner: any;

export const useAlgod = () => {
  const network = useSelector(selectNetwork);
  const [messages, setMessages] = useState<string[]>(['']);

  const [algodClient, setAlgodClient] = useState<Algodv2>();
  const [indexerClient, setIndexerClient] = useState<Indexer>();

  useEffect(() => {
    setAlgodClient(
      new Algodv2(
        network.algodNetwork.token,
        network.algodNetwork.server,
        network.algodNetwork.port
      )
    );
    setIndexerClient(
      new Indexer(
        network.indexerNetwork.token,
        network.indexerNetwork.server,
        network.indexerNetwork.port
      )
    );
  }, [network]);

  const prepareApplicationArgs = (applicationArgs: string[]) => {
    return applicationArgs.map(
      (arg) => new Uint8Array(Buffer.from(arg.toString(), 'base64'))
    );
  };

  const preparePrograms = async (
    approvalProgram: any,
    clearStateProgram: any
  ) => {
    const compiledApprovalProgram = await algodClient
      ?.compile(approvalProgram)
      .do();
    const compiledClearStateProgram = await algodClient
      ?.compile(clearStateProgram)
      .do();

    const approvalBytes = new Uint8Array(
      Buffer.from(compiledApprovalProgram.result, 'base64')
    );

    const clearStateBytes = new Uint8Array(
      Buffer.from(compiledClearStateProgram.result, 'base64')
    );

    return {
      approvalBytes,
      clearStateBytes,
    };
  };

  const sendTransaction = async (txn: Transaction) => {
    const binaryTxn = txn.toByte();
    const base64Txn = AlgoSigner.encoding.msgpackToBase64(binaryTxn);
    const signedTxns = await AlgoSigner.signTxn([{ txn: base64Txn }]);
    const binarySignedTxn = AlgoSigner.encoding.base64ToMsgpack(
      signedTxns[0].blob
    );

    const res = await algodClient?.sendRawTransaction(binarySignedTxn).do();

    await verboseWaitForConfirmation(res.txId, setMessages, algodClient);
  };

  const prepareMetaData = async (metadata: string) => {
    const metaDataBytes = new Uint8Array(Buffer.from(metadata, 'base64'));
    const hashedMetaData = await window.crypto.subtle.digest(
      'SHA-256',
      metaDataBytes
    );
    console.log('Length: ', hashedMetaData.byteLength);
    return new Uint8Array(hashedMetaData);
  };

  const prepareParams = async (note?: string) => {
    const encoder = new TextEncoder();

    const noteBytes = new Uint8Array(Buffer.from(encoder.encode(note)));

    const params = await algodClient?.getTransactionParams().do();
    return {
      params,
      noteBytes,
    };
  };

  const forwardTransaction = async (data: IFormValues) => {
    switch (data.transactionType) {
      case 'pay':
        await sendPayTransaction(data);
        break;
      case 'keyreg':
        await sendKeyRegTransaction(data);
        break;
      case 'acfg':
        if (data.type === 'Asset Creation') {
          await sendAssetCreationTransaction(data);
          break;
        }
        await sendAssetConfigTransaction(data);
        break;
      case 'axfer':
        if (data.type === 'Asset Clawback') {
          await sendAssetClawbackTransaction(data);
          break;
        }
        if (data.type === 'Asset Accept') {
          await sendAssetAcceptTransaction(data);
          break;
        }
        await sendAssetTransferTransaction(data);
        break;
      case 'afrz':
        await sendAssetFreezeTransaction(data);
        break;
      case 'appl':
        if (data.type === 'Application Creation') {
          await sendApplicationCreationTransaction(data);
          break;
        }
        await sendApplicationCallTransaction(data);
        break;
    }
  };

  const sendPayTransaction = async ({
    sender,
    receiver,
    note,
    amount,
    closeRemainderTo,
    rekeyTo,
  }: IFormValues) => {
    const { params, noteBytes } = await prepareParams(note);
    const txn = makePaymentTxnWithSuggestedParamsFromObject({
      from: sender,
      to: receiver!,
      note: noteBytes,
      amount: parseInt(amount!.toString()),
      suggestedParams: params as SuggestedParams,
    });
    console.log('TXN: ' + txn);
    await sendTransaction(txn);
  };

  const sendKeyRegTransaction = async ({
    sender,
    receiver,
    note,
    amount,
    closeRemainderTo,
    rekeyTo,
  }: IFormValues) => {};

  const sendAssetCreationTransaction = async ({
    sender,
    assetName,
    unitName,
    total,
    decimals,
    url,
    metaDataHash,
    defaultFrozen,
    managerAddr,
    reserveAddr,
    freezeAddr,
    clawbackAddr,
    note,
    rekeyTo,
  }: IFormValues) => {
    const { params, noteBytes } = await prepareParams(note);
    const hashedMetaData = await prepareMetaData(metaDataHash || '');

    console.log('URL: ', url);
    const txn = makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: sender,
      note: noteBytes,
      assetMetadataHash: hashedMetaData,
      unitName,
      assetName,
      assetURL: url,
      total: parseInt(total!.toString()),
      decimals: parseInt(decimals!.toString()),
      manager: managerAddr || sender,
      reserve: reserveAddr || sender,
      freeze: freezeAddr || sender,
      clawback: clawbackAddr || sender,
      defaultFrozen: defaultFrozen!,
      suggestedParams: params as SuggestedParams,
    });
    await sendTransaction(txn);
  };

  const sendAssetConfigTransaction = async ({
    assetID,
    sender,
    managerAddr,
    reserveAddr,
    freezeAddr,
    clawbackAddr,
    note,
    freezeAddrDisabled,
    clawbackAddrDisabled,
  }: IFormValues) => {
    const { params, noteBytes } = await prepareParams(note);
    const freeze = freezeAddrDisabled ? undefined : freezeAddr || undefined;
    const clawback = clawbackAddrDisabled
      ? undefined
      : clawbackAddr || undefined;
    const txn = makeAssetConfigTxnWithSuggestedParamsFromObject({
      from: sender,
      assetIndex: parseInt(assetID!.toString()),
      note: noteBytes,
      manager: managerAddr || undefined,
      reserve: reserveAddr || undefined,
      freeze,
      clawback,
      strictEmptyAddressChecking: false,
      suggestedParams: params as SuggestedParams,
    });
    await sendTransaction(txn);
  };

  const sendAssetTransferTransaction = async ({
    assetID,
    sender,
    receiver,
    amount,
    note,
    closeRemainderTo,
  }: IFormValues) => {
    const { params, noteBytes } = await prepareParams(note);
    const txn = makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: sender,
      to: receiver!,
      assetIndex: parseInt(assetID!.toString()),
      note: noteBytes,
      amount: parseInt(amount!.toString()),
      closeRemainderTo: closeRemainderTo || undefined,
      suggestedParams: params as SuggestedParams,
    });
    await sendTransaction(txn);
  };

  const sendAssetAcceptTransaction = async ({
    assetID,
    sender,
    note,
  }: IFormValues) => {
    const { params, noteBytes } = await prepareParams(note);
    const txn = makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: sender,
      to: sender!,
      assetIndex: parseInt(assetID!.toString()),
      note: noteBytes,
      suggestedParams: params as SuggestedParams,
      amount: 0,
    });
    await sendTransaction(txn);
  };

  const sendAssetClawbackTransaction = async ({
    assetID,
    sender,
    note,
    amount,
    receiver,
    targetAddress,
  }: IFormValues) => {
    const { params, noteBytes } = await prepareParams(note);

    const txn = makeAssetTransferTxnWithSuggestedParamsFromObject({
      revocationTarget: targetAddress,
      from: sender,
      amount: parseInt(amount!.toString()),
      to: receiver!,
      assetIndex: parseInt(assetID!.toString()),
      note: noteBytes,
      suggestedParams: params as SuggestedParams,
    });

    await sendTransaction(txn);
  };

  const sendAssetFreezeTransaction = async ({
    assetID,
    sender,
    receiver,
    note,
    assetFrozen,
  }: IFormValues) => {
    const { params, noteBytes } = await prepareParams(note);

    const txn = makeAssetFreezeTxnWithSuggestedParamsFromObject({
      from: sender,
      freezeTarget: receiver!,
      freezeState: assetFrozen!,
      assetIndex: parseInt(assetID!.toString()),
      note: noteBytes,
      suggestedParams: params as SuggestedParams,
    });

    await sendTransaction(txn);
  };

  const sendApplicationCreationTransaction = async ({
    sender,
    onComplete,
    accounts,
    approvalProgram,
    clearStateProgram,
    appArguments,
    foreignApps,
    foreignAssets,
    extraProgramPages,
    globalNumInts,
    globalNumByteSlices,
    localNumInts,
    localNumByteSlices,
    note,
  }: IFormValues) => {
    const { params, noteBytes } = await prepareParams(note);

    const { approvalBytes, clearStateBytes } = await preparePrograms(
      approvalProgram,
      clearStateProgram
    );

    const appArgs = prepareApplicationArgs(appArguments!);

    const txn = makeApplicationCreateTxnFromObject({
      from: sender,
      approvalProgram: approvalBytes,
      clearProgram: clearStateBytes,
      accounts,
      appArgs: appArgs || '',
      foreignApps,
      foreignAssets,
      note: noteBytes,
      numGlobalByteSlices: globalNumByteSlices!,
      numGlobalInts: globalNumInts!,
      numLocalByteSlices: localNumByteSlices!,
      numLocalInts: localNumInts!,
      extraPages: extraProgramPages!,
      onComplete: onComplete! as unknown as OnApplicationComplete,
      suggestedParams: params as SuggestedParams,
    });

    await sendTransaction(txn);
  };

  const sendApplicationCallTransaction = async ({
    applicationID,
    sender,
    accounts,
    foreignAssets,
    foreignApps,
    note,
    appArguments,
  }: IFormValues) => {
    const { params, noteBytes } = await prepareParams(note);

    const appArgs = prepareApplicationArgs(appArguments!);

    const txn = makeApplicationNoOpTxnFromObject({
      from: sender,
      appIndex: parseInt(applicationID!.toString()),
      appArgs: appArgs || '',
      accounts,
      foreignAssets,
      foreignApps,
      suggestedParams: params as SuggestedParams,
    });

    await sendTransaction(txn);
  };

  return {
    algodClient,
    indexerClient,
    forwardTransaction,
    messages,
    setMessages,
  };
};
