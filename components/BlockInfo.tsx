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
import { useBoxShadow } from '../hooks/useBoxShadow';
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

  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';

  const { boxShadowSmInset } = useBoxShadow();

  const renderInfo = () => (
    <HStack spacing={16} alignItems="flex-start">
      <Stack w="60%" spacing={4}>
        <Grid w="100%" gridTemplateColumns="repeat(3, 1fr)" gap={4} mt={6}>
          <DataField label="Round" value={round} canCopy />
          <DataField
            label="Number of transactions"
            value={transactions.length}
          />
          <DataField
            label="Timestamp"
            value={format(fromUnixTime(timestamp), 'HH:mm:ss dd-MM-yyyy')}
            canCopy
          />
        </Grid>
        <Flex
          w="100%"
          boxShadow={boxShadowSmInset}
          p={5}
          borderRadius="lg"
          flexDir="column"
          bgColor={bgColor}
        >
          <SmallField
            label="Previous block hash"
            value={previousBlockHash}
            canCopy
          />
        </Flex>
      </Stack>
      <Stack w="35%">
        <Heading size="md">Transaction IDs</Heading>
        <Flex
          flexDir="column"
          mt={4}
          boxShadow={boxShadowSmInset}
          p={5}
          w="100%"
          borderRadius="lg"
          bgColor={bgColor}
        >
          {transactions.map((transaction: any, index: number) => (
            <SmallField
              label={index.toString()}
              value={transaction.id}
              canCopy
              key={transaction.id}
            />
          ))}
        </Flex>
      </Stack>
    </HStack>
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
