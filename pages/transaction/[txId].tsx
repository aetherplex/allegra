import { Flex, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Search from '../../components/Search';
import TransactionInfo from '../../components/TransactionInfo';
import { useAlgod } from '../../hooks/useAlgod';

function TransactionPage() {
  const router = useRouter();
  const { txId } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [txnData, setTxnData] = useState<any>();
  const { indexerClient } = useAlgod();

  async function fetchTransactionDetails(txId: string) {
    setIsLoading(true);
    const transactionDetails = await indexerClient
      ?.lookupTransactionByID(txId)
      .do();
    console.log('Transaction: ', transactionDetails);
    setIsLoading(false);
    setTxnData(transactionDetails);
    return transactionDetails;
  }

  const renderTransactionDetails = () => (
    <TransactionInfo
      id={txnData?.transaction?.id}
      confirmedRound={txnData?.transaction?.['confirmed-round']}
      paymentTransaction={txnData?.transaction?.['payment-transaction']}
      applicationTransaction={txnData?.transaction?.['application-transaction']}
      sender={txnData?.transaction?.['sender']}
      transactionType={txnData?.transaction?.['tx-type']}
      fee={txnData?.transaction?.['fee']}
      note={txnData?.transaction?.['note']}
      assetTransferTransaction={
        txnData?.transaction?.['asset-transfer-transaction']
      }
      assetConfigTransaction={
        txnData?.transaction?.['asset-config-transaction']
      }
      roundTime={txnData?.transaction?.['round-time']}
      createdAssetIndex={txnData?.transaction?.['created-asset-index']}
      assetFreezeTransaction={
        txnData?.transaction?.['asset-freeze-transaction']
      }
    />
  );

  const renderLoading = () => {
    return (
      <Flex
        w="100%"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <Spinner size="xl" />
      </Flex>
    );
  };

  useEffect(() => {
    console.log('TXN ID: ', txId);
    if (txId) {
      fetchTransactionDetails(txId as string);
    }
  }, [txId]);

  return (
    <Search activeSelection="asset">
      {isLoading ? renderLoading() : renderTransactionDetails()}
    </Search>
  );
}

export default TransactionPage;
