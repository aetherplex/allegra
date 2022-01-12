import {
  Algodv2,
  makeApplicationCreateTxnFromObject,
  makeAssetConfigTxnWithSuggestedParamsFromObject,
  makeAssetCreateTxnWithSuggestedParamsFromObject,
  makeAssetFreezeTxnWithSuggestedParamsFromObject,
  makeAssetTransferTxnWithSuggestedParamsFromObject,
  makePaymentTxnWithSuggestedParamsFromObject,
  OnApplicationComplete,
  SuggestedParams,
  Transaction,
  makeApplicationNoOpTxnFromObject,
} from 'algosdk';
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNetwork } from '../store/networkSlice/selectors';
import { IField, IFormValues, Network, Token } from '../types';
import { verboseWaitForConfirmation } from '../utils/algod';
import { generateHash } from '../utils/helpers';
declare const AlgoSigner: any;

export const useAlgod = () => {
  const network = useSelector(selectNetwork);
  const [messages, setMessages] = useState<string[]>(['']);

  const [client, setClient] = useState<Algodv2>();

  useEffect(() => {
    setClient(
      new Algodv2(
        network.algodNetwork.token,
        network.algodNetwork.server,
        network.algodNetwork.port
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
    const compiledApprovalProgram = await client?.compile(approvalProgram).do();
    const compiledClearStateProgram = await client
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

    const res = await client?.sendRawTransaction(binarySignedTxn).do();

    await verboseWaitForConfirmation(res.txId, setMessages, client);
  };

  const prepareData = async (note?: string, metadata?: string) => {
    const encoder = new TextEncoder();

    const noteBytes = new Uint8Array(Buffer.from(encoder.encode(note)));
    let metadataBytes: Uint8Array | string = '';
    if (metadata) {
      metadataBytes = generateHash(metadata);
    }

    const params = await client?.getTransactionParams().do();
    return {
      params,
      noteBytes,
      metadataBytes,
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
    ...suggestedParams
  }: IFormValues) => {
    const { params, noteBytes } = await prepareData(note);
    const txn = makePaymentTxnWithSuggestedParamsFromObject({
      from: sender,
      to: receiver!,
      note: noteBytes,
      amount: parseInt(amount!.toString()),
      suggestedParams: params as SuggestedParams,
    });
    await sendTransaction(txn);
  };

  const sendKeyRegTransaction = async ({
    sender,
    receiver,
    note,
    amount,
    closeRemainderTo,
    rekeyTo,
    ...suggestedParams
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
    ...suggestedParams
  }: IFormValues) => {
    const { params, noteBytes, metadataBytes } = await prepareData(
      note,
      metaDataHash
    );
    console.log('URL: ', url);
    const txn = makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: sender,
      note: noteBytes,
      assetMetadataHash: metadataBytes,
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
    ...suggestedParams
  }: IFormValues) => {
    const { params, noteBytes } = await prepareData(note);
    const txn = makeAssetConfigTxnWithSuggestedParamsFromObject({
      from: sender,
      assetIndex: parseInt(assetID!.toString()),
      note: noteBytes,
      manager: managerAddr || undefined,
      reserve: reserveAddr || undefined,
      freeze: freezeAddr || undefined,
      clawback: clawbackAddr || undefined,
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
    ...suggestedParams
  }: IFormValues) => {
    const { params, noteBytes } = await prepareData(note);
    const txn = makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: sender,
      to: receiver!,
      assetIndex: parseInt(assetID!.toString()),
      note: noteBytes,
      amount: parseInt(amount!.toString()),
      closeRemainderTo,
      suggestedParams: params as SuggestedParams,
    });
    await sendTransaction(txn);
  };

  const sendAssetAcceptTransaction = async ({
    assetID,
    sender,
    note,
    ...suggestedParams
  }: IFormValues) => {
    const { params, noteBytes } = await prepareData(note);
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
    ...suggestedParams
  }: IFormValues) => {
    const { params, noteBytes } = await prepareData(note);

    const txn = makeAssetTransferTxnWithSuggestedParamsFromObject({
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
    ...suggestedParams
  }: IFormValues) => {
    const { params, noteBytes } = await prepareData(note);

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
    ...suggestedParams
  }: IFormValues) => {
    const { params, noteBytes } = await prepareData(note);

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
    ...suggestedParams
  }: IFormValues) => {
    const { params, noteBytes } = await prepareData(note);

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
    client,
    forwardTransaction,
    messages,
  };
};
