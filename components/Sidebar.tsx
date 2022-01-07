import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Flex,
  Text,
  Heading,
  IconButton,
  useColorMode,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Sidebar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = colorMode === 'light' ? 'gray.100' : 'gray.700';
  const router = useRouter();

  const activeColor = colorMode === 'light' ? 'gray.900' : 'white';
  const inactiveColor = colorMode === 'light' ? 'gray.600' : 'gray.400';
  return (
    <Flex
      flexDir="column"
      w="15%"
      bgColor={bgColor}
      height="100vh"
      px={6}
      pt={12}
    >
      <Flex justifyContent="space-between">
        <Heading size="lg">Allegory</Heading>

        <IconButton
          onClick={toggleColorMode}
          aria-label="toggle dark mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        />
      </Flex>
      <Stack mt={24} spacing="3rem">
        <Link href="/">
          <Text
            fontSize="lg"
            cursor="pointer"
            color={router.asPath === '/' ? activeColor : inactiveColor}
          >
            Create transaction
          </Text>
        </Link>
        <Link href="/search">
          <Text
            fontSize="lg"
            cursor="pointer"
            color={router.asPath === '/search' ? activeColor : inactiveColor}
          >
            Search blockchain
          </Text>
        </Link>
      </Stack>
    </Flex>
  );
}

export default Sidebar;
