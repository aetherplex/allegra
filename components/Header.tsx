import { Button, Flex, Text, HStack, Badge } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { setAddress } from '../store/authSlice';
import { useAppDispatch } from '../utils/helpers';
declare const AlgoSigner: any;

function Header() {
  const [accounts, setAccounts] = useState<any[]>();

  const dispatch = useAppDispatch();

  const connectWallet = async () => {
    await AlgoSigner.connect();
    console.log('Connected to AlgoSigner');
    setAccounts(await AlgoSigner.accounts({ ledger: 'Sandbox' }));
  };

  useEffect(() => {
    dispatch(setAddress(accounts?.[0]?.address));
  }, [accounts]);

  return (
    <Flex py={4} w="100%" alignItems="center" justifyContent="flex-end">
      <HStack>
        {accounts?.length ? (
          <Text fontSize="sm" py={2}>
            {accounts[0].address}
          </Text>
        ) : (
          <Button onClick={connectWallet}>Connect wallet</Button>
        )}
      </HStack>
    </Flex>
  );
}

export default Header;
