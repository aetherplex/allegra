import { Icon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Flex,
  Text,
  Stack,
  Input,
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { isDark, isLight, lighten } from '@chakra-ui/theme-tools';
import { SuggestedParams } from 'algosdk';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useField } from '../hooks/useField';
import { selectAddress } from '../store/authSlice/selectors';
import { FieldType } from '../types';

interface FieldProps {
  name: string;
  type: FieldType;
  description: string;
  required: boolean;
  codec: string;
  suggestedParams: SuggestedParams | undefined;
  useSuggestedParams: boolean;
}

function Field({
  name,
  type,
  description,
  required,
  codec,
  suggestedParams,
  useSuggestedParams,
}: FieldProps) {
  const [value, setValue] = useState<string | number>();
  const { inputType } = useField({ name, type, description, required, codec });

  const address = useSelector(selectAddress);

  useEffect(() => {
    console.log(suggestedParams);
    if (name === 'LastValid') {
      name = 'LastRound';
    }
    if (name === 'FirstValid') {
      name = 'FirstRound';
    }
    const index = (name.charAt(0).toLowerCase() + name.slice(1)) as keyof Pick<
      SuggestedParams,
      'fee' | 'firstRound' | 'lastRound' | 'genesisHash' | 'genesisID'
    >;
    if (suggestedParams && suggestedParams[index]) {
      setValue(suggestedParams[index]);
    }
  }, []);

  return (
    <Stack w="100%">
      <Flex w="100%" justifyContent="space-between" alignItems="center">
        <HStack spacing=".1rem">
          <Text fontSize="xs">{name}</Text>
          <Popover>
            <PopoverTrigger>
              <IconButton
                aria-label="info"
                icon={<InfoOutlineIcon />}
                size="xs"
                variant="ghost"
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>{name}</PopoverHeader>
              <PopoverBody>{description}</PopoverBody>
            </PopoverContent>
          </Popover>
          <Text fontSize="xs" color="gray.500">
            {`${!required ? '(optional)' : ''}`}
          </Text>
        </HStack>
        <Text fontSize="xs" italics="true" color="gray.500" fontStyle="italic">
          {type}
        </Text>
      </Flex>
      <Input
        type={inputType}
        value={useSuggestedParams ? value : ''}
        disabled={!!value}
      />
    </Stack>
  );
}

export default Field;
