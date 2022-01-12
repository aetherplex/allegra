import {
  Flex,
  Text,
  Grid,
  Heading,
  Stack,
  HStack,
  useColorMode,
  Divider,
  Badge,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useBoxShadow } from '../hooks/useBoxShadow';
import { IFormValues } from '../types';
import DataField from './DataField';
import SmallField from './SmallField';

function AccountInfo({
  address,
  amount,
  amountWithoutPendingRewards,
  assets,
  createdAssets,
  createdAtRound,
  deleted,
  pendingRewards,
  rewardBase,
  rewards,
  sigType,
  status,
  apps,
}: any) {
  const { colorMode } = useColorMode();
  const [signatureType, setSignatureType] = useState('');

  const { boxShadowSmInset } = useBoxShadow();

  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';

  useEffect(() => {
    switch (sigType) {
      case 'sig':
        setSignatureType('Single signature');
        break;
      case 'msig':
        setSignatureType('Multi-signature');
        break;
      default:
        setSignatureType(sigType);
    }
  }, [sigType]);

  const renderInfo = () => (
    <Flex
      w="50%"
      mt={6}
      flexDir="column"
      p={5}
      borderRadius="xl"
      bgColor={bgColor}
      boxShadow={boxShadowSmInset}
      position="relative"
    >
      <Badge
        colorScheme={status === 'online' ? 'green' : 'gray'}
        variant="outline"
        position="absolute"
        top={5}
        right={5}
      >
        {status}
      </Badge>
      <Stack spacing={4}>
        <Heading size="sm">General</Heading>
        <Grid gridTemplateColumns="repeat(2, 1fr)" gap={4} w="100%">
          <SmallField label="Address" value={address} canCopy />
        </Grid>
        <Grid
          gridTemplateColumns="repeat(4, 1fr)"
          gap={4}
          w="100%"
          spacing={16}
        >
          <SmallField label="Round created" value={createdAtRound} />
          <SmallField label="Balance" value={amount} />
          <SmallField label="Rewards" value={rewards} />
          <SmallField label="Signature type" value={signatureType} />
        </Grid>
        {assets.length && (
          <>
            <Heading size="sm" pt={4}>
              Assets
            </Heading>
            {assets.map((asset, index) => (
              <>
                {index > 0 && <Divider />}
                <Grid gridTemplateColumns="repeat(4, 1fr)" gap={4} w="100%">
                  <SmallField label="ID" value={asset['asset-id']} canCopy />
                  <SmallField label="Balance" value={asset['amount']} />
                  <SmallField
                    label="Deleted"
                    value={asset['deleted'].toString()}
                  />
                  <SmallField
                    label="Frozen"
                    value={asset['is-frozen'].toString()}
                  />
                </Grid>
              </>
            ))}
          </>
        )}

        <Heading size="sm" pt={4}>
          Opted-in apps
        </Heading>
        {apps.map((app, index) => (
          <>
            {index > 0 && <Divider />}
            <Grid gridTemplateColumns="repeat(3, 1fr)" gap={4} w="100%">
              <SmallField label="ID" value={app['id']} canCopy />
              <SmallField
                label="Round opted-in"
                value={app['opted-in-at-round']}
              />
              <SmallField label="Deleted" value={app['deleted'].toString()} />
            </Grid>
          </>
        ))}
      </Stack>
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
      <Heading fontSize="xl">Account information</Heading>
      {address ? renderInfo() : renderEmpty()}
    </Flex>
  );
}

export default AccountInfo;
