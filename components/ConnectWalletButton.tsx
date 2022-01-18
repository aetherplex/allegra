import { Button } from '@chakra-ui/react';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import React from 'react';
import { setAddresses, initWallet } from '../store/authSlice';
import { WalletType } from '../types';
import { useAppDispatch } from '../utils/helpers';
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

  const connectMyAlgo = async () => {
    const myAlgoWallet = new MyAlgoConnect();
    const accounts = await myAlgoWallet.connect();
    const addresses = accounts.map(
      (account: any) => account.address
    ) as string[];
    console.log('Addresses: ', addresses);
    dispatch(setAddresses(addresses));
    dispatch(initWallet({ addresses, walletType: WalletType.MyAlgo }));
    onClose();
  };

  const connectAlgoSigner = async () => {
    await AlgoSigner.connect();
    const acnts = await AlgoSigner.accounts({
      // @ts-ignore
      ledger: networks[netwk],
    });
    const addresses = acnts.map((account: any) => account.address);
    dispatch(setAddresses(addresses));
    onClose();
  };

  const connectWallet = async (walletType: WalletType) => {
    switch (walletType) {
      case WalletType.MyAlgo:
        connectMyAlgo();
        return;
      case WalletType.AlgoSigner:
        connectAlgoSigner();
        return;
    }
  };
  return <Button onClick={() => connectWallet(type)}>{children}</Button>;
}

export default ConnectWalletButton;
