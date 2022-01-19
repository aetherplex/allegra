import {
  Button,
  chakra,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Select,
  Spinner,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiSearch } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import AccountInfo from '../../components/AccountInfo';
import ApplicationInfo from '../../components/ApplicationInfo';
import AssetInfo from '../../components/AssetInfo';
import BlockInfo from '../../components/BlockInfo';
import TransactionInfo from '../../components/TransactionInfo';
import { searchTypes } from '../../data/searchTypes';
import { useBoxShadow } from '../../hooks/useBoxShadow';
import { selectNetwork } from '../../store/networkSlice/selectors';

function Search() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { colorMode } = useColorMode();
  const buttonBgColor = colorMode === 'light' ? 'gray.100' : 'gray.800';
  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';

  const [searchData, setSearchData] = useState<any>();

  const network = useSelector(selectNetwork);

  const { boxShadowXsInset, boxShadowSm } = useBoxShadow();

  const type = watch('type', 'Asset');

  const toast = useToast();

  useEffect(() => {
    setSearchData(null);
  }, [type]);

  const search = async ({
    type,
    searchValue,
  }: {
    type: string;
    searchValue: string;
  }) => {
    setIsLoading(true);
    try {
      const headers =
        typeof network.indexerNetwork.token === 'object'
          ? { ...network.indexerNetwork.token }
          : '';
      const data = await axios.get(
        `${
          network.name === 'sandbox'
            ? network.indexerNetwork.fullServer
            : network.indexerNetwork.server
        }/v2/${type.toLowerCase()}s/${searchValue}`,
        {
          headers: {
            ...headers,
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

  const renderInfo = () => {
    switch (type) {
      case 'asset':
        return (
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
      case 'application':
        return (
          <ApplicationInfo
            id={searchData?.data?.application?.id}
            deleted={searchData?.data?.application?.deleted}
            createdAtRound={searchData?.data?.application?.['created-at-round']}
            creator={searchData?.data?.application?.params?.creator}
            globalState={
              searchData?.data?.application?.params?.['global-state']
            }
            globalStateSchema={
              searchData?.data?.application?.params?.['global-state-schema']
            }
            localStateSchema={
              searchData?.data?.application?.params?.['local-state-schema']
            }
          />
        );
      case 'account':
        return (
          <AccountInfo
            address={searchData?.data?.account?.address}
            amount={searchData?.data?.account?.amount}
            amountWithoutPendingRewards={
              searchData?.data?.account?.['amount-without-pending-rewards']
            }
            assets={searchData?.data?.account?.assets}
            createdAssets={searchData?.data?.account?.['created-assets']}
            createdAtRound={searchData?.data?.account?.['created-at-round']}
            deleted={searchData?.data?.account?.deleted}
            pendingRewards={searchData?.data?.account?.['pending-rewards']}
            rewardBase={searchData?.data?.account?.['reward-base']}
            rewards={searchData?.data?.account?.['rewards']}
            sigType={searchData?.data?.account?.['sig-type']}
            status={searchData?.data?.account?.status}
            apps={searchData?.data?.account?.['apps-local-state']}
          />
        );
      case 'transaction':
        return (
          <TransactionInfo
            id={searchData?.data?.transaction?.id}
            confirmedRound={searchData?.data?.transaction?.['confirmed-round']}
            paymentTransaction={
              searchData?.data?.transaction?.['payment-transaction']
            }
            applicationTransaction={
              searchData?.data?.transaction?.['application-transaction']
            }
            sender={searchData?.data?.transaction?.['sender']}
            transactionType={searchData?.data?.transaction?.['tx-type']}
            fee={searchData?.data?.transaction?.['fee']}
            note={searchData?.data?.transaction?.['note']}
            assetTransferTransaction={
              searchData?.data?.transaction?.['asset-transfer-transaction']
            }
            assetConfigTransaction={
              searchData?.data?.transaction?.['asset-config-transaction']
            }
            roundTime={searchData?.data?.transaction?.['round-time']}
            createdAssetIndex={
              searchData?.data?.transaction?.['created-asset-index']
            }
            assetFreezeTransaction={
              searchData?.data?.transaction?.['asset-freeze-transaction']
            }
          />
        );
      case 'block':
        return (
          <BlockInfo
            round={searchData?.data?.round}
            genesisHash={searchData?.data?.['genesis-hash']}
            genesisId={searchData?.data?.['genesis-id']}
            previousBlockHash={searchData?.data?.['previous-block-hash']}
            rewards={searchData?.data?.rewards}
            seed={searchData?.data?.seed}
            timestamp={searchData?.data?.timestamp}
            transactions={searchData?.data?.transactions}
            transactionsRoot={searchData?.data?.['transactions-root']}
            transactionCounter={searchData?.data?.['txn-counter']}
            upgradeState={searchData?.data?.['upgrade-state']}
            upgradeVote={searchData?.data?.['upgrade-vote']}
          />
        );
    }
  };

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
    <Flex w="100%" flexDir="column" mt={{ base: 5, lg: 0 }}>
      <Head>
        <title>Search | Allegra</title>
      </Head>
      <HStack>
        <Icon as={BiSearch} w={7} h={7} />
        <Heading size="lg">Search blockchain</Heading>
      </HStack>
      <Text mt={4} fontSize="lg">
        {/* @ts-ignore */}
        {`Search by ${type} ${searchTypes[type] || 'ID'}.`}
      </Text>
      <chakra.form
        onSubmit={handleSubmit(search)}
        display="flex"
        flexGrow={1}
        flexDir="column"
        w="100%"
      >
        <Flex w="100%" mt={3}>
          <HStack w={{ base: '100%', lg: '60%' }}>
            <Input
              w="100%"
              type={type}
              {...register('searchValue', { required: true })}
              boxShadow={boxShadowXsInset}
              border="none"
              bgColor={bgColor}
              fontFamily="mono"
            />
            <Select
              fontFamily="mono"
              boxShadow={boxShadowSm}
              border="none"
              w="30%"
              cursor="pointer"
              {...register('type', { required: true })}
            >
              <option value="asset">Asset</option>
              <option value="account">Account</option>
              <option value="application">Application</option>
              <option value="transaction">Transaction</option>
              <option value="block">Block</option>
            </Select>
            <Button
              w="20%"
              type="submit"
              colorScheme="green"
              boxShadow={boxShadowSm}
            >
              Search
            </Button>
          </HStack>
        </Flex>
        <Flex mt={16} flexGrow={1} w="100%">
          {isLoading ? renderLoading() : renderInfo()}
        </Flex>
      </chakra.form>
    </Flex>
  );
}

export default Search;
