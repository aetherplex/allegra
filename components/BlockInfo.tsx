import {
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { format, fromUnixTime } from 'date-fns';
import { Base64 } from 'js-base64';
import React from 'react';
import { capitalize } from '../utils/helpers';
import DataField from './DataField';
import SmallField from './SmallField';

function BlockInformation({
  round,
  genesisHash,
  genesisId,
  previousBlockHash,
  rewards,
  seed,
  timestamp,
  transactions,
  transactionsRoot,
  transactionCounter,
  upgradeState,
  upgradeVote,
}: any) {
  const { colorMode } = useColorMode();

  const bgColor = colorMode === 'light' ? 'gray.100' : 'gray.700';

  const renderInfo = () => (
    <Stack w="50%" spacing={4}>
      <Grid w="100%" gridTemplateColumns="repeat(3, 1fr)" gap={4} mt={6}>
        <DataField label="Round" value={round} canCopy />
        <DataField label="Transactions" value={transactions.length} />
        <DataField
          label="Timestamp"
          value={format(fromUnixTime(timestamp), 'HH:mm:ss dd-MM-yyyy')}
        />
      </Grid>
      <DataField
        label="Previous block hash"
        value={previousBlockHash}
        canCopy
      />
    </Stack>
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
      <Heading fontSize="xl">Block information</Heading>
      {round ? renderInfo() : renderEmpty()}
    </Flex>
  );
}

export default BlockInformation;
