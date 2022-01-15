import {
  Text,
  Heading,
  Stack,
  Link,
  Flex,
  HStack,
  Icon,
  useColorMode,
} from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { BiGift } from 'react-icons/bi';
import SmallField from '../components/SmallField';
import { useBoxShadow } from '../hooks/useBoxShadow';

function DonatePage() {
  const { boxShadowSmInset } = useBoxShadow();
  const { colorMode } = useColorMode();

  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';

  return (
    <Stack mt={{ base: 5, lg: 0 }}>
      <Head>
        <title>Donate | Allegory</title>
      </Head>
      <HStack>
        <Icon as={BiGift} w={7} h={7} />
        <Heading size="lg">Donate</Heading>
      </HStack>
      <Stack pt={3} pb={6}>
        <Text>
          Allegra was created and is maintained by a single dev (
          <Link
            href="https://twitter.com/daoarchitect"
            color="green.500"
            target="_blank"
          >
            @daoarchitect
          </Link>
          ).
        </Text>
        <Text>
          If you find this tool useful, please consider donating algos to
          address below. Your generosity is appreciated.
        </Text>
      </Stack>
      <Flex
        w="auto"
        p={5}
        boxShadow={boxShadowSmInset}
        borderRadius="lg"
        bgColor={bgColor}
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
