import {
  Flex,
  Text,
  Grid,
  Heading,
  Stack,
  HStack,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { IFormValues } from '../types';
import DataField from './DataField';
import SmallField from './SmallField';

function TransactionInfo({
  assetID,
  unitName,
  assetName,
  total,
  decimals,
  defaultFrozen,
  url,
  metaDataHash,
  managerAddr,
  reserveAddr,
  freezeAddr,
  clawbackAddr,
}: Partial<IFormValues>) {
  const { colorMode } = useColorMode();

  const bgColor = colorMode === 'light' ? 'gray.100' : 'gray.700';

  const renderInfo = () => (
    <Grid w="100%" gridTemplateColumns="repeat(3, 1fr)" gap={4} mt={6}>
      <DataField label="Asset ID" value={assetID} />
      <DataField label="Unit Name" value={unitName} />
      <DataField label="Asset Name" value={assetName} />
      <Flex
        flexDir="column"
        w="100%"
        bgColor={bgColor}
        borderRadius="xl"
        p={4}
        gridColumnStart={1}
        gridColumnEnd={4}
      >
        <Heading size="md">Details</Heading>
        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={4}>
          <SmallField label="Total supply" value={total} />
          <SmallField label="Decimals" value={decimals} />
          <SmallField label="Default Frozen" value={defaultFrozen} />
        </Grid>
        <Grid gridTemplateColumns="1fr 2fr" gap={4}>
          <SmallField label="URL" value={url} />
          <SmallField label="MetaDataHash" value={metaDataHash} />
        </Grid>
      </Flex>
      <Stack
        w="100%"
        bgColor={bgColor}
        borderRadius="xl"
        p={4}
        gridColumnStart={1}
        gridColumnEnd={4}
        spacing={6}
      >
        <HStack>
          <Text fontSize="sm" color="gray.500">
            Manager address:
          </Text>
          <Text fontSize="sm">{managerAddr || '-'}</Text>
        </HStack>
        <HStack>
          <Text fontSize="sm" color="gray.500">
            Reserve address:
          </Text>
          <Text fontSize="sm">{reserveAddr || '-'}</Text>
        </HStack>
        <HStack>
          <Text fontSize="sm" color="gray.500">
            Freeze address:
          </Text>
          <Text fontSize="sm">{freezeAddr || '-'}</Text>
        </HStack>
        <HStack>
          <Text fontSize="sm" color="gray.500">
            Clawback address:
          </Text>
          <Text fontSize="sm">{clawbackAddr || '-'}</Text>
        </HStack>
      </Stack>
    </Grid>
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
      {assetID ? renderInfo() : renderEmpty()}
    </Flex>
  );
}

export default TransactionInfo;
