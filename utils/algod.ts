import { Algodv2 } from 'algosdk';
import { Dispatch, SetStateAction } from 'react';

/**
 *
 * @param client An instance of the Algodv2 client
 * @param txnId The transaction ID to wait for
 * @returns The completed transaction information
 */
export async function verboseWaitForConfirmation(
  txnId: string,
  setMessage: Dispatch<SetStateAction<string[]>>,
  client?: Algodv2
): Promise<Record<string, any>> {
  setMessage(['Awaiting confirmation (this will take several seconds)...']);
  const roundTimeout = 2;
  setMessage((prev) => [...prev, 'Transaction ID: ' + txnId]);
  const completedTx = await waitForConfirmation(txnId, roundTimeout, client);
  setMessage((prev) => [...prev, 'Transaction successful.']);
  return completedTx;
}

/**
 *
 * @param algodclient An instance of the Algodv2 client
 * @param txId The transaction ID to wait for
 * @param timeout The number of seconds to wait for a confirmation
 * @returns  The pending transaction information
 */
async function waitForConfirmation(
  txId: string,
  timeout: number,
  algodclient?: Algodv2
): Promise<Record<string, any>> {
  if (algodclient == null || txId == null || timeout < 0) {
    throw new Error('Bad arguments.');
  }
  const status = await algodclient.status().do();
  if (typeof status === 'undefined')
    throw new Error('Unable to get node status');
  const startround = status['last-round'] + 1;
  let currentround = startround;

  /* eslint-disable no-await-in-loop */
  while (currentround < startround + timeout) {
    const pendingInfo = await algodclient
      .pendingTransactionInformation(txId)
      .do();
    if (pendingInfo !== undefined) {
      if (
        pendingInfo['confirmed-round'] !== null &&
        pendingInfo['confirmed-round'] > 0
      ) {
        // Got the completed Transaction
        return pendingInfo;
      }

      if (
        pendingInfo['pool-error'] != null &&
        pendingInfo['pool-error'].length > 0
      ) {
        // If there was a pool error, then the transaction has been rejected!
        throw new Error(
          `Transaction Rejected pool error${pendingInfo['pool-error']}`
        );
      }
    }
    await algodclient.statusAfterBlock(currentround).do();
    currentround += 1;
  }
  /* eslint-enable no-await-in-loop */
  throw new Error(`Transaction not confirmed after ${timeout} rounds!`);
}
