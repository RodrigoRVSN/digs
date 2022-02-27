import { AppProvider } from '@App/core/context/AppContext';
import { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { darkMode } from '@App/core/styles/theme';
import { globalStyles } from '@App/core/styles/global';
import { Sidebar } from '@App/components/layout/Sidebar';
import { Layout } from '@App/components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  globalStyles();

  return (
    <AppProvider>
      <NextUIProvider theme={darkMode}>
        <Layout>
          <Sidebar />
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </AppProvider>
  );
}

export default MyApp;
