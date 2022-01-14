import {
  Text,
  Heading,
  Stack,
  Link,
  Flex,
  HStack,
  Icon,
} from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { BiGift } from 'react-icons/bi';
import SmallField from '../components/SmallField';
import { useBoxShadow } from '../hooks/useBoxShadow';

function DonatePage() {
  const { boxShadowSmInset } = useBoxShadow();
  return (
    <Stack alignItems="flex-start">
      <Head>
        <title>Donate | Allegory</title>
      </Head>
      <HStack>
        <Icon as={BiGift} w={7} h={7} />
        <Heading size="lg">Donate</Heading>
      </HStack>
      <Stack pt={2} pb={4}>
        <Text>
          Allegory was created and is maintained by a single dev (
          <Link href="https://twitter.com/daoarchitect" color="green.500">
            @daoarchitect
          </Link>
          ).
        </Text>
        <Text>
          If you find this tool useful, please donate algos or ASAs to the
          address below:
        </Text>
      </Stack>
      <Flex
        w="auto"
        p={5}
        boxShadow={boxShadowSmInset}
        borderRadius="lg"
        justifyContent="flex-start"
      >
        <SmallField
          label="Address"
          value="FTIWH2ZXQRRQ2UVZ4RXMTCHDM4WW5QP6YZC6QD7USYX6WQLTX5A67MM6VM"
          canCopy
        />
      </Flex>
    </Stack>
  );
}

export default DonatePage;
