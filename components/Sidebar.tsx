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

function Sidebar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = colorMode === 'light' ? 'white' : 'gray.900';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const network = useSelector(selectNetwork);
  const activeColor = colorMode === 'light' ? 'gray.900' : 'white';
  const inactiveColor = colorMode === 'light' ? 'gray.600' : 'gray.400';
  const toast = useToast();

  return (
    <Flex
      flexDir="column"
      w="10%"
      minW="10%"
      bgColor={bgColor}
      px={6}
      py={12}
      flexGrow={1}
      justifyContent="space-between"
    >
      <Flex flexDir="column">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading fontSize="2xl">Allegory</Heading>
        </Flex>
        <Stack mt={24} spacing="3rem">
          <Link href="/" passHref>
            <HStack
              color={router.asPath === '/' ? activeColor : inactiveColor}
              transition=".1s ease-in-out color"
              _hover={{
                color: activeColor,
              }}
            >
              <Icon as={BiPencil} w={3} h={3} />
              <Text fontSize="md" cursor="pointer" fontWeight="semibold">
                Create
              </Text>
            </HStack>
          </Link>
          <Link href="/search" passHref>
            <HStack
              color={router.asPath === '/search' ? activeColor : inactiveColor}
              transition=".1s ease-in-out color"
              _hover={{
                color: activeColor,
              }}
            >
              <Icon as={BiSearch} w={3} h={3} />
              <Text fontSize="md" cursor="pointer" fontWeight="semibold">
                Search
              </Text>
            </HStack>
          </Link>
          <Link href="/donate" passHref>
            <HStack
              color={router.asPath === '/donate' ? activeColor : inactiveColor}
              transition=".1s ease-in-out color"
              _hover={{
                color: activeColor,
              }}
            >
              <Icon as={BiGift} w={3} h={3} />
              <Text fontSize="md" cursor="pointer" fontWeight="semibold">
                Donate
              </Text>
            </HStack>
          </Link>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
