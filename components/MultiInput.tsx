import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Flex, Stack, Input, HStack, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { camelize } from '../utils/helpers';

interface IMultiInputProps {
  name: string;
  register: UseFormRegister<FieldValues>;
}

function MultiInput({ register, name }: IMultiInputProps) {
  const [numInputs, setNumInputs] = useState(1);
  return (
    <Flex alignItems="flex-start">
      <Stack w="100%">
        {Array.from(Array(numInputs).keys()).map((i) => (
          <Input
            size="sm"
            key={i}
            w="100%"
            {...register(`${camelize(name)}-${i}`, { required: false })}
          />
        ))}
      </Stack>
      <HStack>
        <IconButton
          ml={2}
          aria-label="add"
          icon={<AddIcon />}
          size="sm"
          disabled={numInputs >= 8}
          onClick={() => setNumInputs((prev) => prev + 1)}
        />
        <IconButton
          ml={2}
          aria-label="add"
          icon={<MinusIcon />}
          size="sm"
          disabled={numInputs === 1}
          onClick={() => setNumInputs((prev) => prev - 1)}
        />
      </HStack>
    </Flex>
  );
}

export default MultiInput;
