import {
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { useBoxShadow } from '../hooks/useBoxShadow';
import { IFormValues } from '../types';
import { capitalize } from '../utils/helpers';
import DataField from './DataField';
import SmallField from './SmallField';

function AssetInfo({
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

  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';

  const { boxShadowXsInset } = useBoxShadow();

  const renderInfo = () => (
    <Grid w="100%" gridTemplateColumns="repeat(3, 1fr)" gap={4} mt={6}>
      <DataField label="Asset ID" value={assetID} canCopy />
      <DataField label="Unit Name" value={unitName} canCopy />
      <DataField label="Asset Name" value={assetName} canCopy />
      <Stack
        spacing={4}
        w="100%"
        bgColor={bgColor}
        borderRadius="xl"
        p={5}
        gridColumnStart={1}
        gridColumnEnd={4}
        boxShadow={boxShadowXsInset}
      >
        <Heading size="md">Details</Heading>
        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={4}>
          <SmallField label="Total supply" value={total} />
          <SmallField label="Decimals" value={decimals} />
          <SmallField
            label="Default Frozen"
            value={capitalize(defaultFrozen!.toString())}
          />
        </Grid>
        <Grid gridTemplateColumns="1fr 2fr" gap={4}>
          <SmallField label="URL" value={url} canCopy />
          <SmallField label="MetaDataHash" value={metaDataHash} />
        </Grid>
      </Stack>
      <Stack
        w="100%"
        bgColor={bgColor}
        borderRadius="xl"
        p={5}
        gridColumnStart={1}
        gridColumnEnd={4}
        spacing={4}
        boxShadow={boxShadowXsInset}
      >
        <Heading size="md">Controlling addresses</Heading>
        <SmallField label="Manager" value={managerAddr} canCopy />
        <SmallField label="Reserve" value={reserveAddr} canCopy />
        <SmallField label="Freeze" value={freezeAddr} canCopy />
        <SmallField label="Clawback" value={clawbackAddr} canCopy />
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
      <Heading fontSize="xl">Asset information</Heading>
      {assetID ? renderInfo() : renderEmpty()}
    </Flex>
  );
}

export default AssetInfo;
