import {
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { SuggestedParams } from 'algosdk';
import React, { useEffect, useState } from 'react';
import Field from '../components/Field';
import { commonFields } from '../data/commonFields';
import { transactionTypes } from '../data/transactionTypes';
import { useAlgod } from '../hooks/useAlgod';

function Home() {
  const [transactionType, setTransactionType] = useState('Payment');
  const [suggestedParams, setSuggestedParams] = useState<SuggestedParams>();
  const [useSuggestedParams, setUseSuggestedParams] = useState<boolean>(true);

  const { client } = useAlgod();

  const fetchParams = async () => {
    const params = await client?.getTransactionParams().do();
    setSuggestedParams(params);
  };

  useEffect(() => {
    if (client) {
      fetchParams();
    }
  }, [client]);

  return (
    <Flex w="100%" flexDir="column">
      <Heading>Create transaction</Heading>
      <Text mt={4} fontSize="lg">
        Configure and send an Algorand transaction.
      </Text>
      {/* Type */}
      <Grid gridTemplateColumns="repeat(4, 1fr)" gap={6} w="100%">
        <Flex w="100%" flexDir="column" mt={4}>
          <Heading fontSize="2xl">Type</Heading>
          <Stack mt={6}>
            <Text fontSize="xs">Transaction type</Text>
            <Select
              cursor="pointer"
              onChange={(e) => setTransactionType(e.target.value)}
            >
              {transactionTypes.map((type) => (
                <option key={type.type + '_' + type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </Select>
          </Stack>
        </Flex>
        <Flex w="100%" flexDir="column" mt={4}>
          <Heading fontSize="2xl">Common transaction parameters</Heading>
          <Checkbox
            mt={3}
            defaultChecked={true}
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
              />
            ))}
          </Stack>
        </Flex>
        <Flex w="100%" flexDir="column" mt={4}>
          <Heading fontSize="2xl">
            {transactionType && `${transactionType} transaction parameters`}
          </Heading>
          <Stack mt={6}>
            {transactionTypes
              .find((type) => type.name === transactionType)
              ?.fields.map((field: any) =>
                field?.fields?.length ? (
                  field?.fields?.map((field: any) => (
                    <Field
                      key={field.type + '_' + field.name}
                      {...field}
                      suggestedParams={suggestedParams}
                      useSuggestedParams={useSuggestedParams}
                    />
                  ))
                ) : (
                  <Field
                    key={field.type + '_' + field.name}
                    {...field}
                    suggestedParams={suggestedParams}
                    useSuggestedParams={useSuggestedParams}
                  />
                )
              )}
          </Stack>
        </Flex>
      </Grid>
    </Flex>
  );
}

export default Home;
