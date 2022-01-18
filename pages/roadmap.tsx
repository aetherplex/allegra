import {
  Text,
  Heading,
  Stack,
  Link,
  Flex,
  HStack,
  Icon,
  useColorMode,
  Box,
} from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { BiGift, BiMapAlt } from 'react-icons/bi';
import SmallField from '../components/SmallField';
import { useBoxShadow } from '../hooks/useBoxShadow';

function RoadmapPage() {
  const { boxShadowSmInset } = useBoxShadow();
  const { colorMode } = useColorMode();

  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';

  const lineColor = colorMode === 'light' ? 'gray.900' : 'white';
  const fadedLineColor = colorMode === 'light' ? 'gray.300' : 'gray.500';

  return (
    <Stack mt={{ base: 5, lg: 0 }}>
      <Head>
        <title>Roadmap | Allegra</title>
      </Head>
      <Stack>
        <HStack>
          <Icon as={BiMapAlt} w={7} h={7} />
          <Heading size="lg">Roadmap</Heading>
        </HStack>
        <Stack flexDir="column" position="relative" spacing={8}>
          <Box
            position="absolute"
            w=".2rem"
            h="40%"
            bgColor={lineColor}
            top={10}
            left=".3rem"
          />
          <Box
            position="absolute"
            w=".2rem"
            h="50%"
            bgColor={fadedLineColor}
            top="15rem"
            left=".3rem"
          />
          <HStack spacing={4}>
            <Box bgColor={lineColor} w={3} h={3} borderRadius="full" />
            <Text>AlgoSigner integration</Text>
            <Text>✅</Text>
          </HStack>
          <HStack spacing={4}>
            <Box bgColor={lineColor} w={3} h={3} borderRadius="full" />
            <Text>Algo and asset transfers</Text>
            <Text>✅</Text>
          </HStack>
          <HStack spacing={4}>
            <Box bgColor={lineColor} w={3} h={3} borderRadius="full" />
            <Text>Blockchain querying</Text>
            <Text>✅</Text>
          </HStack>
          <HStack spacing={4}>
            <Box bgColor={lineColor} w={3} h={3} borderRadius="full" />
            <Text>MyAlgo integration</Text>
            <Text>✅</Text>
          </HStack>
          <HStack spacing={4}>
            <Box
              border="2px solid"
              borderColor={fadedLineColor}
              w={3}
              h={3}
              borderRadius="full"
              zIndex={1}
            />
            <Text>WalletConnect integration</Text>
            <Text>🔨</Text>
          </HStack>
          <HStack spacing={4}>
            <Box
              bgColor={bgColor}
              border="2px solid"
              borderColor={fadedLineColor}
              w={3}
              h={3}
              borderRadius="full"
              zIndex={1}
            />
            <Text>Application-related transactions</Text>
          </HStack>

          <HStack spacing={4}>
            <Box
              bgColor={bgColor}
              border="2px solid"
              borderColor={fadedLineColor}
              w={3}
              h={3}
              borderRadius="full"
              zIndex={1}
            />
            <Text>Atomic transactions</Text>
          </HStack>
          <HStack spacing={4}>
            <Box
              bgColor={bgColor}
              border="2px solid"
              borderColor={fadedLineColor}
              w={3}
              h={3}
              borderRadius="full"
              zIndex={1}
            />
            <Text>Saved transactions</Text>
          </HStack>
          <HStack spacing={4}>
            <Box
              bgColor={bgColor}
              border="2px solid"
              borderColor={fadedLineColor}
              w={3}
              h={3}
              borderRadius="full"
              zIndex={1}
            />
            <Text>Favorites (accounts, apps, assets)</Text>
          </HStack>
          <HStack spacing={4}>
            <Box
              bgColor={bgColor}
              border="2px solid"
              borderColor={fadedLineColor}
              w={3}
              h={3}
              borderRadius="full"
              zIndex={1}
            />
            <Text>Current account info</Text>
          </HStack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default RoadmapPage;
