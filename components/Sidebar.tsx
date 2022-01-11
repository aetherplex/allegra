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
import { BiPencil, BiSearch } from 'react-icons/bi';
import { useAppDispatch } from '../utils/helpers';
import { useSelector } from 'react-redux';
import { selectNetwork } from '../store/networkSlice/selectors';
import { setNetwork } from '../store/networkSlice';

function Sidebar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = colorMode === 'light' ? 'gray.100' : 'gray.900';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const network = useSelector(selectNetwork);
  const activeColor = colorMode === 'light' ? 'gray.900' : 'white';
  const inactiveColor = colorMode === 'light' ? 'gray.600' : 'gray.400';
  const toast = useToast();

  const changeNetwork = async (value: any) => {
    if (value !== network.name) {
      try {
        await dispatch(setNetwork(value));
        toast({
          title: 'Network changed',
          description: `You are now connected to ${value}`,
          status: 'success',
          duration: 3000,
        });
      } catch (e: any) {
        toast({
          title: 'Error',
          description: e.message,
          status: 'error',
          duration: 5000,
        });
      }
    }
  };

  return (
    <Flex
      flexDir="column"
      w="15%"
      minW="10%"
      bgColor={bgColor}
      px={6}
      py={12}
      flexGrow={1}
      justifyContent="space-between"
    >
      <Flex flexDir="column">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading fontSize="xl">Allegory</Heading>
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
              <Text fontSize="md" cursor="pointer">
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
              <Text fontSize="md" cursor="pointer">
                Search
              </Text>
            </HStack>
          </Link>
        </Stack>
      </Flex>
      <Stack>
        <Text fontSize="sm" color="gray.500">
          Current network:
        </Text>
        <Select
          w="auto"
          cursor="pointer"
          onChange={(e) => changeNetwork(e.target.value)}
        >
          <option value="mainnet">MainNet</option>
          <option value="testnet">TestNet</option>
          <option value="betanet">BetaNet</option>
          <option value="sandbox">Sandbox</option>
        </Select>
      </Stack>
    </Flex>
  );
}

export default Sidebar;
