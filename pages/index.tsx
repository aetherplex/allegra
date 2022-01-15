import {
  Button,
  chakra,
  Checkbox,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { SuggestedParams } from 'algosdk';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiPencil } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Field from '../components/Field';
import { commonFields } from '../data/commonFields';
import { transactionTypes } from '../data/transactionTypes';
import { useAlgod } from '../hooks/useAlgod';
import { useBoxShadow } from '../hooks/useBoxShadow';
import { selectActiveAddress } from '../store/authSlice/selectors';
import { IField, IFormValues, TransactionType } from '../types';
import { camelize } from '../utils/helpers';

function Home() {
  const { register, handleSubmit, watch, setValue, unregister } =
    useForm<Partial<IFormValues>>();
  const transactionType = watch('type', 'Payment');
  const [suggestedParams, setSuggestedParams] = useState<SuggestedParams>();
  const [useSuggestedParams, setUseSuggestedParams] = useState<boolean>(true);
  const [additionalParams, setAdditionalParams] = useState<string[]>([]);
  const [transactionParams, setTransactionParams] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const address = useSelector(selectActiveAddress);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  const { boxShadowXs, boxShadowSm, boxShadowXsInset } = useBoxShadow();
  const bgColor = colorMode === 'light' ? 'gray.100' : 'gray.800';
  const outputBgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';
  const toast = useToast();

  const formData = watch();

  const { onClose, onOpen, isOpen } = useDisclosure();

  useEffect(() => {
    console.log('Form data: ', formData);
  }, [formData]);

  const { algodClient, forwardTransaction, messages, setMessages } = useAlgod();

  const inactiveTypes = ['keyreg', 'appl', 'afrz', 'ac'];

  const fetchParams = async () => {
    setIsFetching(true);
    try {
      const params = await algodClient?.getTransactionParams().do();
      setSuggestedParams(params);
      setValue('fee', params?.fee);
      setValue('firstRound', params?.firstRound);
      setValue('lastRound', params?.lastRound);
      setValue('genesisHash', params?.genesisHash);
      setValue('genesisID', params?.genesisID);
      setValue('sender', address);
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
          duration: 5000,
        });
      }
    }
    setIsFetching(false);
  };

  const onSubmit = async (data: any) => {
    console.log('Submitted..', data);
    setIsLoading(true);
    try {
      await forwardTransaction(data);

      setIsLoading(false);
    } catch (err: unknown) {
      toast({
        title: 'Error',
        // @ts-ignore
        description: err.message || 'Something went wrong',
        status: 'error',
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (algodClient) {
      fetchParams();
    }
  }, [algodClient]);

  useEffect(() => {
    // @ts-ignore
    unregister(additionalParams);

    const txn = transactionTypes?.find(
      (type: TransactionType) => type?.name === transactionType
    );

    txn?.fields?.map((field: IField) => {
      setAdditionalParams((prev) => [...prev, field.name]);
    });

    const transaction = transactionTypes.find(
      (t) => t.name === transactionType
    );

    setValue('transactionType', transaction?.type);
  }, [transactionType]);

  const render = () => (
    <chakra.form
      onSubmit={handleSubmit(onSubmit)}
      flexGrow={1}
      display="flex"
      flexDir="column"
    >
      <Grid
        gridTemplateColumns={{ base: '1fr', xl: '3fr 3fr 4fr' }}
        gap={6}
        w="100%"
      >
        <Stack spacing={6} w="100%">
          <Stack mt={6}>
            <Text fontSize="xs">Transaction type</Text>
            <Select
              cursor="pointer"
              {...register('type')}
              boxShadow={boxShadowXs}
              border="none"
              fontFamily="mono"
            >
              {transactionTypes.map((type) => {
                if (inactiveTypes.includes(type.type)) {
                  return null;
                }
                return (
                  <option key={type.type + '_' + type.name} value={type.name}>
                    {type.name}
                  </option>
                );
              })}
            </Select>
          </Stack>
          <Flex w="100%" flexDir="column">
            <Heading fontSize="xl">Common transaction parameters</Heading>
            <Checkbox
              size="sm"
              mt={3}
              defaultChecked={true}
              alignItems="center"
              onChange={(e) => setUseSuggestedParams(e.target.checked)}
            >
              Use suggested transaction parameters
            </Checkbox>
            <Stack mt={3}>
              {commonFields.map((field) => {
                if (
                  useSuggestedParams &&
                  suggestedParams &&
                  // @ts-ignore
                  suggestedParams[camelize(field.name)] !== undefined
                ) {
                  return;
                }
                return (
                  <Field
                    key={field.name}
                    {...field}
                    suggestedParams={suggestedParams}
                    useSuggestedParams={useSuggestedParams}
                    register={register}
                    setValue={setValue}
                  />
                );
              })}
            </Stack>
          </Flex>
        </Stack>

        <Flex w="100%" flexDir="column">
          <Heading fontSize="xl">
            {transactionType && `${transactionType} transaction parameters`}
          </Heading>
          <Stack mt={6}>
            {transactionTypes
              .find((type: TransactionType) => type.name === transactionType)
              ?.fields.map((field: IField) =>
                field?.fields?.length ? (
                  field.fields.map((subField: IField) => (
                    <Field
                      key={subField.type + '_' + subField.name}
                      {...subField}
                      suggestedParams={suggestedParams}
                      useSuggestedParams={useSuggestedParams}
                      register={register}
                      setValue={setValue}
                    />
                  ))
                ) : (
                  <Field
                    key={field.type + '_' + field.name}
                    {...field}
                    suggestedParams={suggestedParams}
                    useSuggestedParams={useSuggestedParams}
                    register={register}
                    setValue={setValue}
                  />
                )
              )}
            )
          </Stack>
        </Flex>
        <Stack>
          {/* <Button boxShadow={boxShadowXs} onClick={onOpen}>
            View raw preview
          </Button> */}
          <Button
            type="submit"
            isLoading={isLoading}
            colorScheme="green"
            onClick={() => setMessages([])}
            minH="2.5rem"
            boxShadow={boxShadowSm}
          >{`Send ${transactionType} transaction`}</Button>
          <Flex w="100%" alignItems="flex-end" justifyContent="space-between">
            <Heading fontSize="xl" pt={4}>
              Output log
            </Heading>
            <Button
              size="xs"
              boxShadow={boxShadowXs}
              bgColor={bgColor}
              onClick={() => setMessages([])}
            >
              Clear log
            </Button>
          </Flex>
          <chakra.pre
            display="flex"
            w="100%"
            flexDir="column"
            borderRadius="lg"
            p={3}
            h="60%"
            boxShadow={boxShadowXsInset}
            bgColor={outputBgColor}
          >
            {messages?.map((message: string) => (
              <Text
                key={message}
                color={colorMode === 'light' ? 'gray.900' : 'white'}
                fontSize="xs"
                mt={2}
                fontFamily="mono"
              >
                {message}
              </Text>
            ))}
          </chakra.pre>
        </Stack>
      </Grid>
    </chakra.form>
  );

  const renderLoading = () => (
    <Flex
      w="100%"
      flexDir="column"
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="lg" />
    </Flex>
  );

  return (
    <Flex w="100%" flexDir="column" mt={{ base: 5, lg: 0 }} flexGrow={1}>
      <Head>
        <title>Create | Allegra</title>
      </Head>
      <HStack>
        <Icon as={BiPencil} w={7} h={7} />
        <Heading size="lg">Create transaction</Heading>
      </HStack>
      {isFetching ? renderLoading() : render()}
      {/* <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent pb={5} bgColor={bgColor} minW="52vw">
          <ModalHeader>Raw preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="100%">
            <Flex
              w="100%"
              flexDir="column"
              boxShadow={boxShadowXsInset}
              bgColor={outputBgColor}
              borderRadius="lg"
              p={4}
            >
              <chakra.pre
                color={colorMode === 'light' ? 'gray.900' : 'white'}
                fontSize="sm"
                wordWrap="break-word"
              >
                {JSON.stringify(formData, null, 2)}
              </chakra.pre>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </Flex>
  );
}

export default Home;
