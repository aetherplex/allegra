import {
  AddIcon,
  InfoOutlineIcon,
  MinusIcon,
  PlusSquareIcon,
} from '@chakra-ui/icons';
import {
  Button,
  Checkbox,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { SuggestedParams } from 'algosdk';
import React, { useState } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useField } from '../hooks/useField';
import { FieldType, IFormValues } from '../types';
import { camelize } from '../utils/helpers';
import FileUpload from './FileUpload';
import MultiInput from './MultiInput';
import { FiFile } from 'react-icons/fi';
import { useBoxShadow } from '../hooks/useBoxShadow';

interface FieldProps {
  name: string;
  type: FieldType;
  description: string;
  required: boolean;
  codec: string;
  suggestedParams: SuggestedParams | undefined;
  useSuggestedParams: boolean;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<Partial<IFormValues>>;
}

function Field({
  name,
  type,
  description,
  required,
  codec,
  suggestedParams,
  useSuggestedParams,
  register,
  setValue,
}: FieldProps) {
  const [numInputs, setNumInputs] = useState(1);
  const { inputType } = useField({ name, type, description, required, codec });

  const { boxShadowXsInset, boxShadowXs } = useBoxShadow();

  const renderInput = () => {
    if (name === 'OnComplete') {
      setValue('onComplete', 'NoOp');
      return (
        <Select
          size="sm"
          cursor="pointer"
          {...register(camelize(name), { required })}
          boxShadow={boxShadowXs}
          border="none"
        >
          <option value="NoOp">NoOp</option>
          <option value="OptIn">OptIn</option>
          <option value="CloseOut">CloseOut</option>
          <option value="ClearState">ClearState</option>
          <option value="UpdateApplication">UpdateApplication</option>
          <option value="DeleteApplication">DeleteApplication</option>
        </Select>
      );
    }
    if (
      name === 'Accounts' ||
      name === 'App Arguments' ||
      name === 'Foreign Apps' ||
      name === 'Foreign Assets'
    ) {
      return <MultiInput register={register} name={name} />;
    }
    if (type === 'bool') {
      return <Switch {...register(camelize(name))} />;
    }
    if (name === 'Approval Program' || name === 'Clear State Program') {
      return (
        <FileUpload register={register(camelize(name), { required })}>
          <Button size="sm" leftIcon={<Icon as={FiFile} />}>
            Upload
          </Button>
        </FileUpload>
      );
    }
    if (name === 'URL') {
      return (
        <Input
          size="sm"
          type={inputType}
          border="none"
          boxShadow={boxShadowXsInset}
          {...register(name.toLowerCase(), { required })}
        />
      );
    }
    return (
      <Input
        size="sm"
        type={inputType}
        border="none"
        boxShadow={boxShadowXsInset}
        {...register(camelize(name), { required })}
      />
    );
  };

  return (
    <Stack w="100%">
      <Flex w="100%" justifyContent="space-between" alignItems="center">
        <HStack spacing=".5rem">
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
      {renderInput()}
    </Stack>
  );
}

export default Field;
