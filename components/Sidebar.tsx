import { MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons';
import {
  Flex,
  Text,
  Heading,
  IconButton,
  useColorMode,
  Stack,
  HStack,
  Icon,
  Select,
  SelectField,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';
import { BiGift, BiPencil, BiSearch } from 'react-icons/bi';
import { useAppDispatch } from '../utils/helpers';
import { useSelector } from 'react-redux';
import { selectNetwork } from '../store/networkSlice/selectors';
import { setNetwork } from '../store/networkSlice';
import { useBoxShadow } from '../hooks/useBoxShadow';
import { useWindowSize } from '../hooks/useWindowSize';

function Sidebar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const network = useSelector(selectNetwork);
  const activeColor = colorMode === 'light' ? 'gray.900' : 'white';
  const inactiveColor = colorMode === 'light' ? 'gray.600' : 'gray.400';
  const toast = useToast();
  const size = useWindowSize();

  const { boxShadowSmInset, boxShadowSm } = useBoxShadow();

  return (
    <Flex
      flexDir="column"
      bgColor={bgColor}
      px={6}
      py={12}
      flexGrow={1}
      justifyContent="space-between"
    >
      <Flex flexDir="column">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDir="column"
        >
          <Heading fontSize={{ base: 'lg', lg: '2xl' }}>Allegra</Heading>
        </Flex>
        <Stack mt={24} spacing="3rem" alignItems="center">
          <Link href="/" passHref>
            <HStack
              color={router.asPath === '/' ? activeColor : inactiveColor}
              transition=".25s ease-in-out all"
              boxShadow={router.asPath === '/' ? boxShadowSmInset : ''}
              _hover={{
                color: activeColor,
                boxShadow: () => (router.asPath === '/' ? '' : boxShadowSm),
              }}
              borderRadius="xl"
              p={{ base: 3, lg: 5 }}
              cursor="pointer"
            >
              <Icon
                as={BiPencil}
                w={{ base: 5, lg: 8 }}
                h={{ base: 5, lg: 8 }}
              />
            </HStack>
          </Link>
          <Link href="/search" passHref>
            <HStack
              color={router.asPath === '/search' ? activeColor : inactiveColor}
              transition=".25s ease-in-out all"
              boxShadow={router.asPath === '/search' ? boxShadowSmInset : ''}
              _hover={{
                color: activeColor,
                boxShadow: () =>
                  router.asPath === '/search' ? '' : boxShadowSm,
              }}
              borderRadius="xl"
              cursor="pointer"
              p={{ base: 3, lg: 5 }}
            >
              <Icon
                as={BiSearch}
                w={{ base: 5, lg: 8 }}
                h={{ base: 5, lg: 8 }}
              />
            </HStack>
          </Link>
          <Link href="/donate" passHref>
            <HStack
              color={router.asPath === '/donate' ? activeColor : inactiveColor}
              transition=".25s ease-in-out all"
              boxShadow={router.asPath === '/donate' ? boxShadowSmInset : ''}
              p={{ base: 3, lg: 5 }}
              _hover={{
                color: activeColor,
                boxShadow: () =>
                  router.asPath === '/donate' ? '' : boxShadowSm,
              }}
              I
              borderRadius="xl"
              cursor="pointer"
            >
              <Icon as={BiGift} w={{ base: 5, lg: 8 }} h={{ base: 5, lg: 8 }} />
            </HStack>
          </Link>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
