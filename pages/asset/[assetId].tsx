import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import Search from '../../components/Search';
import { useAlgod } from '../../hooks/useAlgod';
import AssetInfo from '../../components/AssetInfo';

function AssetPage() {
  const router = useRouter();
  const { assetId } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [assetData, setAssetData] = useState<any>();
  const { indexerClient } = useAlgod();

  async function fetchAssetDetails(assetId: string) {
    setIsLoading(true);
    const assetDetails = await indexerClient
      ?.lookupAssetByID(parseInt(assetId))
      .do();
    console.log('ASSET DETAILS: ', assetDetails);
    setIsLoading(false);
    setAssetData(assetDetails);
    return assetDetails;
  }

  const renderAssetDetails = () => (
    <AssetInfo
      unitName={assetData?.asset?.params?.['unit-name']}
      assetName={assetData?.asset?.params?.['name']}
      assetID={assetData?.asset?.index}
      total={assetData?.asset?.params?.total}
      decimals={assetData?.asset?.params?.decimals}
      defaultFrozen={assetData?.asset?.params?.['default-frozen'].toString()}
      url={assetData?.asset?.params?.url}
      metaDataHash={assetData?.asset?.params?.['metadata-hash']}
      managerAddr={assetData?.asset?.params?.manager}
      reserveAddr={assetData?.asset?.params?.reserve}
      freezeAddr={assetData?.asset?.params?.freeze}
      clawbackAddr={assetData?.asset?.params?.clawback}
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

  useEffect(() => {
    fetchAssetDetails(assetId as string);
  }, [assetId]);

  return (
    <Search activeSelection="asset">
      {isLoading ? renderLoading() : renderAssetDetails()}
    </Search>
  );
}

export default AssetPage;
