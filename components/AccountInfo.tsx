import {
  Flex,
  Text,
  Grid,
  Heading,
  Stack,
  HStack,
  useColorMode,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
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
}: any) {
  const { colorMode } = useColorMode();

  const { boxShadowSmInset } = useBoxShadow();

  const bgColor = colorMode === 'light' ? 'gray.100' : 'gray.800';

  const renderInfo = () => (
    <Flex
      w="100%"
      mt={6}
      flexDir="column"
      p={5}
      borderRadius="xl"
      bgColor={bgColor}
      boxShadow={boxShadowSmInset}
    >
      <Stack>
        <SmallField label="Address" value={address} canCopy />
        <SmallField label="Balance" value={amount} />
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
