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
import { IFormValues } from '../types';
import DataField from './DataField';
import SmallField from './SmallField';

function AccountInfo(data: Partial<IFormValues>) {
  const { colorMode } = useColorMode();

  const bgColor = colorMode === 'light' ? 'gray.100' : 'gray.700';

  useEffect(() => {
    console.log('DATA: ', data);
  }, []);

  const renderInfo = () => (
    <Flex w="100%" mt={6} flexDir="column">
      {/* <DataField label="Address" value={data.} /> */}
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
      {data ? renderInfo() : renderEmpty()}
    </Flex>
  );
}

export default AccountInfo;
