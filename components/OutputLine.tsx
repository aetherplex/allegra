import { Text, HStack, IconButton, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { Message } from '../types';

function OutputLine({ message, action, pathname, query }: Message) {
  const { colorMode } = useColorMode();
  const router = useRouter();
  return (
    <HStack alignItems="flex-end">
      <Text
        color={colorMode === 'light' ? 'gray.900' : 'white'}
        fontSize="xs"
        mt={2}
        fontFamily="mono"
      >
        {message}
      </Text>
      {pathname && (
        <IconButton
          size="xs"
          icon={<BiSearch />}
          aria-label="Search in explorer"
          onClick={() =>
            router.push({
              pathname,
              query: {
                ...query,
              },
            })
          }
        />
      )}
    </HStack>
  );
}

export default OutputLine;
