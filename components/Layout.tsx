import { Flex, Heading, Text, useColorMode } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { useBoxShadow } from '../hooks/useBoxShadow';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  const { colorMode } = useColorMode();

  const bgColor = colorMode === 'light' ? 'gray.100' : 'gray.800';

  const { boxShadowSmInset } = useBoxShadow();
  return (
    <Flex
      flexDir="column"
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      w="100%"
    >
      <Flex flexDir="column" display={{ base: 'none', lg: 'flex' }} w="100%">
        <Flex
          py={1}
          alignItems="center"
          justifyContent="center"
          bgColor="gray.500"
        >
          <Text fontSize="xs" color="white" fontWeight="semibold">
            Allegra is currently in beta. Use at your own risk.
          </Text>
        </Flex>
        <Flex w="100%" minH="100vh">
          <Head>
            <link
              rel="preload"
              href="/MonoLisa-Regular.otf"
              as="font"
              crossOrigin=""
            />
          </Head>
          <Sidebar />
          <Flex w="100%" bgColor={bgColor} boxShadow={boxShadowSmInset}>
            <Flex flexDir="column" mx="auto" w="95%">
              <Header />
              <Flex flexGrow={1} w="100%">
                {children}
              </Flex>
              <Footer />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        minH="100vh"
        bgColor={bgColor}
        w="100%"
      >
        <Heading>Allegra</Heading>
        <Text mt={3}>Please view on desktop.</Text>
      </Flex>
    </Flex>
  );
}

export default Layout;
