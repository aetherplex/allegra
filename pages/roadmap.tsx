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
import { BiGift, BiMapAlt } from 'react-icons/bi';
import SmallField from '../components/SmallField';
import { useBoxShadow } from '../hooks/useBoxShadow';

function RoadmapPage() {
  const { boxShadowSmInset } = useBoxShadow();
  const { colorMode } = useColorMode();

  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';

  return (
    <Stack mt={{ base: 5, lg: 0 }}>
      <Head>
        <title>Roadmap | Allegra</title>
      </Head>
      <HStack>
        <Icon as={BiMapAlt} w={7} h={7} />
        <Heading size="lg">Roadmap</Heading>
      </HStack>
    </Stack>
  );
}

export default RoadmapPage;
