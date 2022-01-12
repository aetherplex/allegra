import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Select,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiClipboard } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { networks } from '../data/networks';
import { useBoxShadow } from '../hooks/useBoxShadow';
import { setActiveAddress, setAddresses } from '../store/authSlice';
import {
  selectActiveAddress,
  selectAddresses,
} from '../store/authSlice/selectors';
import { setNetwork } from '../store/networkSlice';
import { selectNetwork } from '../store/networkSlice/selectors';
import { shortenAddress, useAppDispatch } from '../utils/helpers';
declare const AlgoSigner: any;

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const [accounts, setAccounts] = useState<any[]>();
  const network = useSelector(selectNetwork);
  const dispatch = useAppDispatch();
  const activeAddress = useSelector(selectActiveAddress);
  const addresses = useSelector(selectAddresses);
  const { boxShadowXs, boxShadowXsInset } = useBoxShadow();
  const [localNetwork, setLocalNetwork] = useState('mainnet');

  const fetchAddresses = async (netwk: any) => {
    const acnts = await AlgoSigner.accounts({
      // @ts-ignore
      ledger: networks[netwk],
    });
    const addresses = acnts.map((account: any) => account.address);
    dispatch(setAddresses(addresses));
  };

  const connectWallet = async () => {
    await AlgoSigner.connect();
    await fetchAddresses(localNetwork);
  };

  const changeNetwork = async (value: any) => {
    setLocalNetwork(value);
    try {
      await dispatch(setNetwork(value));
      await fetchAddresses(value);
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
  };

  const copyAddress = async () => {
    navigator.clipboard.writeText(activeAddress);
    toast({
      title: 'Address copied',
      description: `${shortenAddress(activeAddress)}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const changeAddress = async (address: string) => {
    dispatch(setActiveAddress(address));
    toast({
      title: 'Active account changed',
      description: `${shortenAddress(address)}`,
      status: 'success',
      duration: 3000,
    });
  };

  useEffect(() => {
    if (accounts?.length) {
      dispatch(setActiveAddress(accounts[0]));
    }
  }, [addresses]);

  return (
    <Flex py={4} w="100%" alignItems="center" justifyContent="flex-end">
      <HStack>
        {addresses?.length ? (
          <HStack>
            <IconButton
              aria-label="Copy address"
              icon={<BiClipboard />}
              onClick={copyAddress}
              variant="ghost"
              boxShadow={boxShadowXs}
              _hover={{
                boxShadow: boxShadowXsInset,
              }}
            />
            <Select
              cursor="pointer"
              border="none"
              onChange={(e) => changeAddress(e.target.value)}
              boxShadow={boxShadowXs}
            >
              {addresses?.map((address: any) => (
                <option key={address} value={address}>
                  {shortenAddress(address)}
                </option>
              ))}
            </Select>
          </HStack>
        ) : (
          <Button onClick={connectWallet} colorScheme="green" variant="outline">
            Connect wallet
          </Button>
        )}
        <Select
          w="auto"
          cursor="pointer"
          onChange={(e) => changeNetwork(e.target.value)}
          boxShadow={boxShadowXs}
          border="none"
        >
          <option value="mainnet">MainNet</option>
          <option value="testnet">TestNet</option>
          <option value="betanet">BetaNet</option>
          <option value="sandbox">Sandbox</option>
        </Select>
        <IconButton
          variant="ghost"
          onClick={toggleColorMode}
          boxShadow={boxShadowXs}
          _hover={{
            boxShadow: boxShadowXsInset,
          }}
          aria-label="toggle dark mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        />
      </HStack>
    </Flex>
  );
}

export default Header;
