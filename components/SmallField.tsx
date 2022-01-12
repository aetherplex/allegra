import {
  HStack,
  IconButton,
  Stack,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { BiClipboard, BiSearch } from 'react-icons/bi';
import { useBoxShadow } from '../hooks/useBoxShadow';
import { shortenAddress } from '../utils/helpers';

interface ISmallFieldProps {
  label: string;
  value?: string | boolean | number;
  canCopy?: boolean;
}

function SmallField({ label, value, canCopy }: ISmallFieldProps) {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'light' ? 'gray.100' : 'gray.800';
  const { boxShadowXs } = useBoxShadow();
  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: 'Copied to clipboard',
      description: value.length > 10 ? shortenAddress(value) : value,
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
        <Text fontFamily="mono">{value === undefined ? '-' : value}</Text>
        {canCopy && value && (
          <IconButton
            boxShadow={boxShadowXs}
            size="xs"
            bgColor={bgColor}
            aria-label="Copy address to clipboard"
            onClick={() => copy(value?.toString())}
            icon={<BiClipboard />}
          />
        )}
      </HStack>
    </Stack>
  );
}

export default SmallField;
