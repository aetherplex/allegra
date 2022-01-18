import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { BiClipboard } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useBoxShadow } from '../hooks/useBoxShadow';
import { setActiveAddress } from '../store/authSlice';
import {
  selectActiveAddress,
  selectAddresses,
} from '../store/authSlice/selectors';
import { WalletType } from '../types';
import { shortenAddress, useAppDispatch } from '../utils/helpers';
declare const AlgoSigner: any;

function Header() {
  const NetworkSelector = dynamic(() => import('./NetworkSelector'), {
    ssr: false,
  });
  const ConnectWalletButton = dynamic(() => import('./ConnectWalletButton'), {
    ssr: false,
  });
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const [accounts, setAccounts] = useState<any[]>();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const activeAddress = useSelector(selectActiveAddress);
  const addresses = useSelector(selectAddresses);
  const { boxShadowXs, boxShadowXsInset } = useBoxShadow();

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
              fontFamily="mono"
            >
              {addresses?.map((address: any) => (
                <option key={address} value={address}>
                  {shortenAddress(address)}
                </option>
              ))}
            </Select>
          </HStack>
        ) : (
          <Button onClick={onOpen} colorScheme="green" variant="outline">
            Connect wallet
          </Button>
        )}
        <NetworkSelector />

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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={6} alignItems="center">
          <ModalHeader>Select wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="100%">
            <Stack w="100%">
              <ConnectWalletButton type={WalletType.MyAlgo} onClose={onClose}>
                MyAlgo
              </ConnectWalletButton>
              <ConnectWalletButton
                type={WalletType.AlgoSigner}
                onClose={onClose}
              >
                AlgoSigner
              </ConnectWalletButton>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Header;
