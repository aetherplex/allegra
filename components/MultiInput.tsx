import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Flex,
  Stack,
  Input,
  HStack,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { useBoxShadow } from '../hooks/useBoxShadow';
import { camelize } from '../utils/helpers';

interface IMultiInputProps {
  name: string;
  register: UseFormRegister<FieldValues>;
}

function MultiInput({ register, name }: IMultiInputProps) {
  const [numInputs, setNumInputs] = useState(1);
  const { colorMode } = useColorMode();
  const buttonBgColor = colorMode === 'light' ? 'gray.100' : 'gray.800';
  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';
  const { boxShadowXsInset, boxShadowXs } = useBoxShadow();
  return (
    <Flex alignItems="flex-start">
      <Stack w="100%">
        {Array.from(Array(numInputs).keys()).map((i) => (
          <Input
            border="none"
            size="sm"
            key={i}
            w="100%"
            bgColor={bgColor}
            fontFamily="mono"
            boxShadow={boxShadowXsInset}
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
          bgColor={buttonBgColor}
          fontFamily="mono"
          disabled={numInputs >= 8}
          boxShadow={boxShadowXs}
          onClick={() => setNumInputs((prev) => prev + 1)}
        />
        <IconButton
          ml={2}
          aria-label="add"
          icon={<MinusIcon />}
          size="sm"
          fontFamily="mono"
          boxShadow={boxShadowXs}
          bgColor={buttonBgColor}
          disabled={numInputs === 1}
          onClick={() => setNumInputs((prev) => prev - 1)}
        />
      </HStack>
    </Flex>
  );
}

export default MultiInput;
