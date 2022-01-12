import { HStack, IconButton, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { BiClipboard } from 'react-icons/bi';
import { shortenAddress } from '../utils/helpers';

interface ISmallFieldProps {
  label: string;
  value?: string | boolean | number;
  canCopy?: boolean;
}

function SmallField({ label, value, canCopy }: ISmallFieldProps) {
  const toast = useToast();
  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: 'Copied to clipboard',
      description: shortenAddress(address),
      status: 'success',
      duration: 2000,
    });
  };
  return (
    <Stack>
      <Text fontSize="xs" color="gray.500">
        {label}
      </Text>
      <HStack>
        <Text>{value === undefined ? '-' : value}</Text>
        {canCopy && value && (
          <IconButton
            size="xs"
            aria-label="Copy address to clipboard"
            onClick={() => copyAddress(value?.toString())}
            icon={<BiClipboard />}
          />
        )}
      </HStack>
    </Stack>
  );
}

export default SmallField;
