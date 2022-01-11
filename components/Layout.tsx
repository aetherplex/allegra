import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
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
      <Flex w="100%">
        <Flex flexDir="column" mx="auto" w="95%">
          <Header />
          <Flex flexGrow={1} w="100%">
            {children}
          </Flex>
          <Footer />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Layout;