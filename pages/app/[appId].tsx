import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import Search from '../../components/Search';
import { useAlgod } from '../../hooks/useAlgod';
import AssetInfo from '../../components/AssetInfo';
import ApplicationInfo from '../../components/ApplicationInfo';

function AppPage() {
  const router = useRouter();
  const { appId } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [appData, setAppData] = useState<any>();
  const { indexerClient } = useAlgod();

  async function fetchAppDetails(appId: string) {
    setIsLoading(true);
    const appDetails = await indexerClient
      ?.lookupApplications(parseInt(appId))
      .do();
    console.log('APP DETAILS: ', appDetails);
    setIsLoading(false);
    setAppData(appDetails);
    return appDetails;
  }

  const renderAppDetails = () => (
    <ApplicationInfo
      id={appData?.application?.id}
      deleted={appData?.application?.deleted}
      createdAtRound={appData?.application?.['created-at-round']}
      creator={appData?.application?.params?.creator}
      globalState={appData?.application?.params?.['global-state']}
      globalStateSchema={appData?.application?.params?.['global-state-schema']}
      localStateSchema={appData?.application?.params?.['local-state-schema']}
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
    fetchAppDetails(appId as string);
  }, [appId]);

  return (
    <Search activeSelection="app">
      {isLoading ? renderLoading() : renderAppDetails()}
    </Search>
  );
}

export default AppPage;
