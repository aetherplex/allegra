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
      id={txnData?.data?.transaction?.id}
      confirmedRound={txnData?.data?.transaction?.['confirmed-round']}
      paymentTransaction={txnData?.data?.transaction?.['payment-transaction']}
      applicationTransaction={
        txnData?.data?.transaction?.['application-transaction']
      }
      sender={txnData?.data?.transaction?.['sender']}
      transactionType={txnData?.data?.transaction?.['tx-type']}
      fee={txnData?.data?.transaction?.['fee']}
      note={txnData?.data?.transaction?.['note']}
      assetTransferTransaction={
        txnData?.data?.transaction?.['asset-transfer-transaction']
      }
      assetConfigTransaction={
        txnData?.data?.transaction?.['asset-config-transaction']
      }
      roundTime={txnData?.data?.transaction?.['round-time']}
      createdAssetIndex={txnData?.data?.transaction?.['created-asset-index']}
      assetFreezeTransaction={
        txnData?.data?.transaction?.['asset-freeze-transaction']
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
