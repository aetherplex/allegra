import { Badge, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { selectNetwork } from '../store/networkSlice/selectors';
import { Network } from '../types';

function Footer() {
  const [round, setRound] = useState<number>();
  const network = useSelector(selectNetwork);

  const { status, data, error, isFetching } = useQuery(
    'blks',
    async () => {
      const res = await axios.get(
        `${
          network.name === 'sandbox'
            ? network.algodNetwork.fullServer
            : network.algodNetwork.server
        }/v2/status`,
        {
          headers: {
            ...network.algodNetwork.token,
          },
        }
      );
      return res.data;
    },
    {
      // Refetch the data every second
      refetchInterval: 1000,
    }
  );

  useEffect(() => {
    setRound(data?.['last-round']);
  }, [data]);

  return (
    <Flex
      w="100%"
      py={6}
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Text fontSize="sm" color="gray.600"></Text>
      <Badge>
        {network.name}: {round}
      </Badge>
    </Flex>
  );
}

export default Footer;
