import { Button } from '@chakra-ui/react';
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

  const network = useSelector(selectNetwork);

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
    switch (walletType) {
      case WalletType.MyAlgo:
        connectMyAlgo();
        return;
      case WalletType.AlgoSigner:
        connectAlgoSigner(network.name);
        return;
    }
  };
  return <Button onClick={() => connectWallet(type)}>{children}</Button>;
}

export default ConnectWalletButton;
