import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import Layout from '../components/Layout';
import { Context, initialState } from '../context';
import { store } from '../store';
import '../styles/globals.css';
import { theme } from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <Context.Provider value={initialState}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </QueryClientProvider>
      </Context.Provider>
    </Provider>
  );
}

export default MyApp;
