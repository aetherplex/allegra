import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import {
  makeApplicationCreateTxnFromObject,
  OnApplicationComplete,
  Algodv2,
  modelsv2,
} from 'algosdk';
import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';
import { Base64 } from 'js-base64';
import { useEffect, useState } from 'react';
import account from 'algosdk/dist/types/src/account';
declare const AlgoSigner: any;
import { Buffer } from 'buffer';
import { addDays, getUnixTime } from 'date-fns';

type Contract = {
  contract: string;
};

type Account = {
  address: string;
};

export default function Home({ contracts }: { contracts: Contract[] }) {
  const [accounts, setAccounts] = useState<Account[]>();

  const token = { 'x-key': '709a4b2e-bcbc-40a0-9432-683e6a683842' };
  const server = 'http://localhost/sandbox/algod';
  const port = 4000;
  const client = new Algodv2(token, server, port);

  const createApp = async () => {
    if (!accounts) return;
    const from = accounts[0].address;
    console.log('From: ', from);
    const suggestedParams = await client.getTransactionParams().do();
    const encoder = new TextEncoder();
    const note = encoder.encode('');
    const approvalRaw = contracts[0].contract;
    const compiledApproval = await client.compile(approvalRaw).do();
    const approvalProgram = new Uint8Array(
      Buffer.from(compiledApproval.result, 'base64')
    );
    console.log('Approval bytes: ', approvalProgram);
    console.log('Approval bytes length: ', approvalProgram.length);
    const clearProgramRaw = contracts[1].contract;
    const compiledClearState = await client.compile(clearProgramRaw).do();
    const clearStateProgram = new Uint8Array(
      Buffer.from(compiledClearState.result, 'base64')
    );

    const regStart = getUnixTime(new Date());
    const regEnd = getUnixTime(addDays(new Date(), 7));
    const voteStart = getUnixTime(new Date());
    const voteEnd = getUnixTime(addDays(new Date(), 7));
    const tokenId = 1;

    const regStartBytes = new Uint8Array(
      Buffer.from(regStart.toString(), 'base64')
    );
    const regEndBytes = new Uint8Array(
      Buffer.from(regEnd.toString(), 'base64')
    );
    const voteStartBytes = new Uint8Array(
      Buffer.from(voteStart.toString(), 'base64')
    );
    const voteEndBytes = new Uint8Array(
      Buffer.from(voteEnd.toString(), 'base64')
    );
    const tokenIdBytes = new Uint8Array(
      Buffer.from(tokenId.toString(), 'base64')
    );

    const txn = makeApplicationCreateTxnFromObject({
      approvalProgram: approvalProgram,
      clearProgram: clearStateProgram,
      numLocalInts: 8,
      numLocalByteSlices: 8,
      numGlobalInts: 8,
      numGlobalByteSlices: 8,
      onComplete: OnApplicationComplete.NoOpOC,
      from: accounts[0].address,
      note,
      suggestedParams,
      extraPages: 1,
      appArgs: [
        regStartBytes,
        regEndBytes,
        voteStartBytes,
        voteEndBytes,
        tokenIdBytes,
      ],
    });

    const binaryTxn = txn.toByte();
    const base64Txn = AlgoSigner.encoding.msgpackToBase64(binaryTxn);
    const signedTxns = await AlgoSigner.signTxn([
      {
        txn: base64Txn,
      },
    ]);

    const binarySignedTx = AlgoSigner.encoding.base64ToMsgpack(
      signedTxns[0].blob
    );

    const res = await client.sendRawTransaction(binarySignedTx).do();

    console.log('Transaction sent: ', res);
  };

  const fetchAccounts = async () => {
    const res = await AlgoSigner.accounts({ ledger: 'Sandbox' });
    setAccounts(res);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <Flex
      w="100%"
      flexGrow={1}
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Button onClick={createApp}>Create app</Button>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'contracts');
  // @ts-ignore
  const filenames: any[] = fs.readdirSync(postsDirectory);

  const contracts = filenames.map(async (filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });

    return {
      contract: fileContents,
    };
  });

  return {
    props: {
      contracts: await Promise.all(contracts),
    },
  };
};

// appAccounts: "accounts"; appApprovalProgram: "approvalProgram"; appClearProgram: "clearProgram"; appForeignApps: "foreignApps"; appForeignAssets: "foreignAssets"; appGlobalByteSlices: "numGlobalByteSlices"; appGlobalInts: "numGlobalInts"; appLocalByteSlices: "numLocalByteSlices"; appLocalInts: "numLocalInts"; appOnComplete: "onComplete"; reKeyTo: "rekeyTo" }>, "from" | "lease" | "note" | "suggestedParams" | "appArgs" | "extraPages" | "rekeyTo" | "onComplete" | "approvalProgram" | "clearProgram" | "numLocalInts" | "numLocalByteSlices" | "numGlobalInts" | "numGlobalByteSlices" | "accounts" | "foreignApps" | "foreignAssets"
