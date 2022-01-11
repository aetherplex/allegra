import { Stack, Text } from '@chakra-ui/react';
import React from 'react';

interface ISmallFieldProps {
  label: string;
  value?: string | boolean | number;
}

function SmallField({ label, value }: ISmallFieldProps) {
  return (
    <Stack>
      <Text fontSize="xs" color="gray.500" mt={4}>
        {label}
      </Text>
      <Text>{value || '-'}</Text>
    </Stack>
  );
}

export default SmallField;
