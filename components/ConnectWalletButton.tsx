import { Button, useToast } from '@chakra-ui/react';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import React from 'react';
import { setAddresses, initWallet } from '../store/authSlice';
import { INetworkState, WalletType } from '../types';
import { useAppDispatch } from '../utils/helpers';
import { networks } from '../data/networks';
import { useSelector } from 'react-redux';
import { selectNetwork } from '../store/networkSlice/selectors';
declare const AlgoSigner: any;

interface IConnectWalletButtonProps {
  type: WalletType;
  children: React.ReactNode;
  onClose: () => void;
}

function ConnectWalletButton({
  type,
  children,
  onClose,
}: IConnectWalletButtonProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const network = useSelector(selectNetwork);

  const connectMyAlgo = async () => {
    const myAlgoWallet = new MyAlgoConnect();
    try {
      const accounts = await myAlgoWallet.connect();
      const addresses = accounts.map(
        (account: any) => account.address
      ) as string[];
      console.log('Addresses: ', addresses);
      dispatch(setAddresses(addresses));
      dispatch(initWallet({ addresses, walletType: WalletType.MyAlgo }));
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error('Could not connect to wallet.');
    }
    onClose();
  };

  const connectAlgoSigner = async (networkName: string) => {
    await AlgoSigner.connect();
    const acnts = await AlgoSigner.accounts({
      // @ts-ignore
      ledger: networks[networkName],
    });
    const addresses = acnts.map((account: any) => account.address);
    dispatch(setAddresses(addresses));
    dispatch(initWallet({ addresses, walletType: WalletType.AlgoSigner }));
    onClose();
  };

  const connectWallet = async (walletType: WalletType) => {
    try {
      switch (walletType) {
        case WalletType.MyAlgo:
          await connectMyAlgo();
          return;
        case WalletType.AlgoSigner:
          connectAlgoSigner(network.name);
          return;
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: err.message,
          status: 'error',
          duration: 5000,
        });
      }
    }
  };
  return <Button onClick={() => connectWallet(type)}>{children}</Button>;
}

export default ConnectWalletButton;
