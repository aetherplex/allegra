import {
  Button,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { SuggestedParams } from 'algosdk';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Field from '../components/Field';
import { commonFields } from '../data/commonFields';
import { transactionTypes } from '../data/transactionTypes';
import { useAlgod } from '../hooks/useAlgod';
import { selectActiveAddress } from '../store/authSlice/selectors';
import { IField, IFormValues, TransactionType } from '../types';

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

  const toast = useToast();

  const { client, forwardTransaction, messages } = useAlgod();

  const fetchParams = async () => {
    const params = await client?.getTransactionParams().do();
    setSuggestedParams(params);
    setValue('fee', params?.fee);
    setValue('firstRound', params?.firstRound);
    setValue('lastRound', params?.lastRound);
    setValue('genesisHash', params?.genesisHash);
    setValue('genesisID', params?.genesisID);
    setValue('sender', address);
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
    if (client) {
      fetchParams();
    }
  }, [client]);

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

  return (
    <Flex w="100%" flexDir="column">
      {/* Type */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={6} w="100%">
          <Stack spacing={6} w="100%">
            <Heading size="lg">Create transaction</Heading>
            <Stack mt={6}>
              <Text fontSize="xs">Transaction type</Text>
              <Select cursor="pointer" {...register('type')}>
                {transactionTypes.map((type) => (
                  <option key={type.type + '_' + type.name} value={type.name}>
                    {type.name}
                  </option>
                ))}
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
                {commonFields.map((field) => (
                  <Field
                    key={field.name}
                    {...field}
                    suggestedParams={suggestedParams}
                    useSuggestedParams={useSuggestedParams}
                    register={register}
                    setValue={setValue}
                  />
                ))}
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
            {/* <Flex
              w="100%"
              flexDir="column"
              bgColor="gray.900"
              minH="40%"
              borderRadius="lg"
              p={4}
            >
              <chakra.pre color="white" fontSize="sm" wordWrap="break-word">
                {JSON.stringify(suggestedParams, null, 2)}
              </chakra.pre>
            </Flex> */}
            <Button
              type="submit"
              isLoading={isLoading}
              colorScheme="green"
            >{`Send ${transactionType} transaction`}</Button>
            <Heading fontSize="xl" pt={4}>
              Ouput log
            </Heading>
            <Flex
              w="100%"
              flexDir="column"
              minH="30%"
              bgColor="gray.900"
              borderRadius="lg"
              p={4}
            >
              {messages?.map((message: string) => (
                <Text key={message} color="white" fontSize="sm" mt={2}>
                  {message}
                </Text>
              ))}
            </Flex>
          </Stack>
        </Grid>
      </form>
    </Flex>
  );
}

export default Home;
