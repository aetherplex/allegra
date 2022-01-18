import { Select, toast, useToast } from '@chakra-ui/react';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { networks } from '../data/networks';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useBoxShadow } from '../hooks/useBoxShadow';
import { setAddresses } from '../store/authSlice';
import {
  selectAddresses,
  selectWalletType,
} from '../store/authSlice/selectors';
import { setNetwork } from '../store/networkSlice';
import { selectNetwork } from '../store/networkSlice/selectors';
import { WalletType } from '../types';
import { capitalize, useAppDispatch } from '../utils/helpers';
declare const AlgoSigner: any;

function NetworkSelector() {
  const toast = useToast();
  const { boxShadowXs } = useBoxShadow();
  const dispatch = useAppDispatch();
  const network = useSelector(selectNetwork);
  const walletType = useSelector(selectWalletType);
  const addresses = useSelector(selectAddresses);
  const fetchAlgoSignerAddresses = async (network: string) => {
    const acnts = await AlgoSigner.accounts({
      // @ts-ignore
      ledger: networks[network],
    });
    const addresses = acnts.map((account: any) => account.address);
    dispatch(setAddresses(addresses));
  };

  const fetchMyAlgoAddresses = async () => {
    const myAlgoWallet = new MyAlgoConnect();
    const accounts = await myAlgoWallet.connect();
    const addresses = accounts.map(
      (account: any) => account.address
    ) as string[];
    dispatch(setAddresses(addresses));
  };

  const fetchAddresses = async (network: any) => {
    switch (walletType) {
      case WalletType.MyAlgo:
        await fetchMyAlgoAddresses();
        break;
      case WalletType.AlgoSigner:
        await fetchAlgoSignerAddresses(network);
        break;
    }
  };

  const changeNetwork = async (value: any) => {
    try {
      await dispatch(setNetwork(value));
      await fetchAddresses(value);

      toast({
        title: 'Network changed',
        description: `You are now connected to ${capitalize(value)}`,
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

  useEffect(() => {
    console.log('Local network: ', network);
  }, [network]);

  return (
    <Select
      w="auto"
      cursor="pointer"
      onChange={(e) => changeNetwork(e.target.value)}
      boxShadow={boxShadowXs}
      border="none"
      fontFamily="mono"
      disabled={!addresses?.length}
      display="inline-block"
      value={network.name}
    >
      <option value="mainnet">MainNet</option>
      <option value="testnet">TestNet</option>
      <option value="betanet">BetaNet</option>
      <option value="sandbox">Sandbox</option>
    </Select>
  );
}

export default NetworkSelector;
