import {
  Flex,
  Text,
  Heading,
  Input,
  Button,
  HStack,
  Select,
  useToast,
  chakra,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import AssetInfo from '../components/AssetInfo';
import { useAlgod } from '../hooks/useAlgod';
import useSearch from '../hooks/useSearch';
import { selectNetwork } from '../store/networkSlice/selectors';

function Search() {
  const { register, handleSubmit, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const [searchData, setSearchData] = useState<any>();

  const network = useSelector(selectNetwork);

  const type = watch('type', 'Asset');

  const { client } = useAlgod();

  const toast = useToast();

  const search = async ({
    type,
    searchValue,
  }: {
    type: string;
    searchValue: string;
  }) => {
    setIsLoading(true);
    try {
      const data = await axios.get(
        `${
          network.name === 'sandbox'
            ? network.indexerNetwork.fullServer
            : network.indexerNetwork.server
        }/v2/${type.toLowerCase()}s/${searchValue.toLowerCase()}`,
        {
          headers: {
            ...network.indexerNetwork.token,
          },
        }
      );
      setIsLoading(false);
      console.log('DATA: ', data);
      setSearchData(data as any);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Not found',
        description: `No ${type} found with that ID.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const renderInfo = () => (
    <AssetInfo
      unitName={searchData?.data?.asset?.params?.['unit-name']}
      assetName={searchData?.data?.asset?.params?.['name']}
      assetID={searchData?.data?.asset?.index}
      total={searchData?.data?.asset?.params?.total}
      decimals={searchData?.data?.asset?.params?.decimals}
      defaultFrozen={searchData?.data?.asset?.params?.[
        'default-frozen'
      ].toString()}
      url={searchData?.data?.asset?.params?.url}
      metaDataHash={searchData?.data?.asset?.params?.['metadata-hash']}
      managerAddr={searchData?.data?.asset?.params?.manager}
      reserveAddr={searchData?.data?.asset?.params?.reserve}
      freezeAddr={searchData?.data?.asset?.params?.freeze}
      clawbackAddr={searchData?.data?.asset?.params?.clawback}
    />
  );

  const renderLoading = () => {
    return (
      <Flex
        w="100%"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <Spinner size="xl" />
      </Flex>
    );
  };

  return (
    <Flex w="100%" flexDir="column">
      <Head>
        <title>Allegory | Search</title>
      </Head>
      <Heading>Search blockchain</Heading>
      <Text mt={4} fontSize="lg">
        Search by ID.
      </Text>
      <chakra.form
        onSubmit={handleSubmit(search)}
        display="flex"
        flexGrow={1}
        flexDir="column"
      >
        <Flex w="50%" mt={3}>
          <HStack w="100%">
            <Input
              w="100%"
              type={type}
              {...register('searchValue', { required: true })}
            />
            <Select
              w="40%"
              cursor="pointer"
              {...register('type', { required: true })}
            >
              <option value="asset">Asset</option>
              <option value="account">Account</option>
              <option value="application">Application</option>
              <option value="transaction">Transaction</option>
              <option value="block">Block</option>
            </Select>
            <Button w="20%" type="submit">
              Search
            </Button>
          </HStack>
        </Flex>
        <Flex mt={16} flexGrow={1} w="50%">
          {isLoading ? renderLoading() : renderInfo()}
        </Flex>
      </chakra.form>
    </Flex>
  );
}

export default Search;
