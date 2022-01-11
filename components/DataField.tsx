import { Flex, Stack, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';

interface IDataFieldProps {
  label: string;
  value?: string | number | boolean;
}

function DataField({ label, value }: IDataFieldProps) {
  const { colorMode } = useColorMode();

  const bgColor = colorMode === 'light' ? 'gray.100' : 'gray.700';
  return (
    <Stack w="100%" p={5} bgColor={bgColor} borderRadius="xl" spacing={0.1}>
      <Text fontSize="xs" color="gray.500">
        {label}
      </Text>
      <Text fontSize="2xl" fontWeight="bold">
        {value || '-'}
      </Text>
    </Stack>
  );
}

export default DataField;
