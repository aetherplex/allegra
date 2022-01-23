import {
  Divider,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { format, fromUnixTime } from 'date-fns';
import React, { useState } from 'react';
import { useBoxShadow } from '../hooks/useBoxShadow';
import SmallField from './SmallField';

function TransactionInfo({
  id,
  confirmedRound,
  paymentTransaction,
  sender,
  transactionType,
  fee,
  note,
  roundTime,
  applicationTransaction,
  assetTransferTransaction,
  assetConfigTransaction,
  assetFreezeTransaction,
}: any) {
  const { colorMode } = useColorMode();
  const [signatureType, setSignatureType] = useState('');

  const { boxShadowSmInset } = useBoxShadow();

  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';

  const renderPaymentTransaction = () => (
    <Stack w="100%" mt={6}>
      <Heading size="sm">Payment transaction details</Heading>
      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        gap={4}
        w="100%"
        gridColumnStart={0}
        gridColumnEnd={3}
      >
        <SmallField label="Amount" value={paymentTransaction.amount} />
        <SmallField
          label="Receiver"
          value={paymentTransaction.receiver}
          canCopy
        />
        <SmallField
          label="Close amount"
          value={paymentTransaction['close-amount']}
        />
      </Grid>
    </Stack>
  );

  const renderApplicationTransaction = () => (
    <>
      <Divider pt={6} />
      <Stack w="100%" pt={6}>
        <Heading size="md">Application transaction details</Heading>
        <Grid
          gridTemplateColumns="repeat(4, 1fr)"
          gap={4}
          w="100%"
          pt={3}
          gridColumnStart={0}
          gridColumnEnd={3}
        >
          <SmallField
            label="ID"
            value={applicationTransaction['application-id']}
          />
          <SmallField
            label="OnComplete action"
            value={applicationTransaction['on-completion']}
          />
        </Grid>
        <Grid gridTemplateColumns="repeat(4, 1fr)" gap={4} w="100%" pt={6}>
          {applicationTransaction['application-args'].length ? (
            <Stack>
              <Heading size="sm">App arguments</Heading>
              {applicationTransaction['application-args'].map(
                (arg: any, index: number) => (
                  <SmallField
                    label={`Arg - ${index}`}
                    value={arg}
                    key={`${arg}-${index}`}
                  />
                )
              )}
            </Stack>
          ) : null}
          {applicationTransaction['foreign-apps'].length ? (
            <Stack>
              <Heading size="sm">Foreign apps</Heading>
              {applicationTransaction['foreign-apps'].map(
                (id: number, index: number) => (
                  <SmallField
                    label={`App ID - ${index}`}
                    value={id}
                    key={`${id}-${index}`}
                  />
                )
              )}
            </Stack>
          ) : null}
          {applicationTransaction['foreign-assets'].length ? (
            <Stack>
              <Heading size="sm">Foreign assets</Heading>
              {applicationTransaction['foreign-assets'].map(
                (id: number, index: number) => (
                  <SmallField
                    label={`Asset ID - ${index}`}
                    value={id}
                    key={`${id}-${index}`}
                  />
                )
              )}
            </Stack>
          ) : null}
          {applicationTransaction['accounts'].length ? (
            <Stack>
              <Heading size="sm">Accounts</Heading>
              {applicationTransaction['accounts'].map(
                (id: number, index: number) => (
                  <SmallField
                    label={`Address - ${index}`}
                    value={id}
                    key={`${id}-${index}`}
                  />
                )
              )}
            </Stack>
          ) : null}
        </Grid>
      </Stack>
    </>
  );

  const renderAssetTransferTransaction = () => {
    const txnType =
      assetTransferTransaction['sender'] &&
      assetTransferTransaction['sender'] !== sender
        ? 'clawback'
        : 'transfer';
    return (
      <>
        <Divider pt={6} />
        <Heading size="sm" pt={6}>
          {`Asset ${txnType} transaction`}
        </Heading>
        <Grid gridTemplateColumns="repeat(2, 1fr)" gap={4} w="100%" pt={6}>
          <SmallField
            label="Asset ID"
            value={assetTransferTransaction['asset-id']}
            canCopy
          />
          <SmallField
            label="Receiver"
            value={assetTransferTransaction['receiver']}
            canCopy
          />
          <SmallField
            label="Amount"
            value={assetTransferTransaction['amount']}
          />
          <SmallField
            label="Close amount"
            value={assetTransferTransaction['close-amount']}
          />
        </Grid>
      </>
    );
  };

  const renderAssetConfigTransaction = () => (
    <>
      <Divider pt={6} />
      <Heading size="sm" pt={6}>
        {`Asset ${
          assetConfigTransaction['asset-id'] === 0 ? 'creation' : 'config'
        } transaction`}
      </Heading>
      <Grid gridTemplateColumns="repeat(2, 1fr)" gap={4} w="100%" pt={6}>
        <SmallField
          label="Asset ID"
          value={assetConfigTransaction?.['asset-id']}
          canCopy
        />
        <SmallField
          label="Unit name"
          value={assetConfigTransaction?.params['unit-name']}
        />
        <SmallField
          label="Asset name"
          value={assetConfigTransaction.params['name']}
        />
        <SmallField
          label="Default frozen"
          value={assetConfigTransaction.params['default-frozen'].toString()}
        />
        <SmallField
          label="Total supply"
          value={assetConfigTransaction.params['total']}
        />
        <SmallField
          label="Decimals"
          value={assetConfigTransaction.params['decimals']}
        />
        <Flex gridColumnStart={1} gridColumnEnd={3}>
          <SmallField
            label="Manager address"
            value={assetConfigTransaction.params['manager']}
            canCopy
          />
        </Flex>
        <Flex gridColumnStart={1} gridColumnEnd={3}>
          <SmallField
            label="Reserve address"
            value={assetConfigTransaction.params['reserve']}
            canCopy
          />
        </Flex>
        <Flex gridColumnStart={1} gridColumnEnd={3}>
          <SmallField
            label="Freeze address"
            value={assetConfigTransaction.params['freeze']}
            canCopy
          />
        </Flex>
        <Flex gridColumnStart={1} gridColumnEnd={3}>
          <SmallField
            label="Clawback address"
            value={assetConfigTransaction.params['clawback']}
            canCopy
          />
        </Flex>
      </Grid>
    </>
  );

  const renderAssetFreezeTransaction = () => (
    <>
      <Divider pt={6} />
      <Heading size="sm" pt={6}>
        Asset freeze transaction
      </Heading>
      <Grid gridTemplateColumns="repeat(2, 1fr)" gap={4} w="100%" pt={6}>
        <SmallField
          label="Asset ID"
          value={assetFreezeTransaction?.['asset-id']}
          canCopy
        />
        <SmallField
          label="Frozen address"
          value={assetFreezeTransaction['address']}
          canCopy
        />
        <SmallField
          label="New freeze status"
          value={assetFreezeTransaction['new-freeze-status'].toString()}
        />
      </Grid>
    </>
  );

  const renderTransaction = () => {
    switch (transactionType) {
      case 'pay':
        return renderPaymentTransaction();
      case 'appl':
        return renderApplicationTransaction();
      case 'axfer':
        return renderAssetTransferTransaction();
      case 'acfg':
        return renderAssetConfigTransaction();
      case 'afrz':
        return renderAssetFreezeTransaction();
    }
  };

  const renderInfo = () => (
    <Flex
      w="100%"
      mt={6}
      flexDir="column"
      p={5}
      borderRadius="xl"
      bgColor={bgColor}
      boxShadow={boxShadowSmInset}
      position="relative"
    >
      <Grid w="100%" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
        <SmallField label="Confirmed round" value={confirmedRound} canCopy />
        <SmallField label="Transaction ID" value={id} canCopy />
        <SmallField label="Transaction type" value={transactionType} />
        <SmallField label="Sender" value={sender} canCopy />
        <SmallField label="Fee" value={fee} />
        <SmallField
          label="Timestamp"
          value={format(fromUnixTime(roundTime), 'HH:mm:ss yyyy-MM-d')}
          canCopy
        />
        <SmallField label="Note" value={note} canCopy />
      </Grid>
      {renderTransaction()}
    </Flex>
  );

  const renderEmpty = () => (
    <Flex
      w="100%"
      flexDir="column"
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
    >
      <Text color="gray.500">No search data.</Text>
    </Flex>
  );

  return (
    <Flex flexDir="column" w="100%" flexGrow={1}>
      <Heading fontSize="xl">Transaction information</Heading>
      {id ? renderInfo() : renderEmpty()}
    </Flex>
  );
}

export default TransactionInfo;
