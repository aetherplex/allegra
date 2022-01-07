import { Badge, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

function Footer() {
  const [round, setRound] = useState<number>();

  const { status, data, error, isFetching } = useQuery(
    'blks',
    async () => {
      const res = await axios.get(
        'http://localhost:4000/sandbox/algod/v2/status',
        {
          headers: {
            'x-key': '709a4b2e-bcbc-40a0-9432-683e6a683842',
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
    <Flex w="100%" py={6} justifyContent="center" alignItems="center">
      <Badge>Latest round: {round}</Badge>
    </Flex>
  );
}

export default Footer;
