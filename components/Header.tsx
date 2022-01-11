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
import { setActiveAddress, setAddresses } from '../store/authSlice';
import {
  selectActiveAddress,
  selectAddresses,
} from '../store/authSlice/selectors';
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

  const connectWallet = async () => {
    await AlgoSigner.connect();
    const acnts = await AlgoSigner.accounts({
      ledger: networks[`${network.name}`],
    });
    const addresses = acnts.map((account: any) => account.address);
    dispatch(setAddresses(addresses));
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
            />
            <Select
              cursor="pointer"
              onChange={(e) => dispatch(setActiveAddress(e.target.value))}
            >
              {addresses?.map((address: any) => (
                <option key={address} value={address}>
                  {shortenAddress(address)}
                </option>
              ))}
            </Select>
          </HStack>
        ) : (
          <Button onClick={connectWallet}>Connect wallet</Button>
        )}
        <IconButton
          onClick={toggleColorMode}
          aria-label="toggle dark mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        />
      </HStack>
    </Flex>
  );
}

export default Header;
