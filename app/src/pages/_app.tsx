import { AppProps } from 'next/app';
import { AppProvider } from '../core/context/AppContext';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
