import {
  Error,
  Loading,
  NoMetaMaskFound,
  NoUserFound,
  UserLoggedIn,
} from '@App/components/pages/Home';
import { useApp } from '@App/core/hooks/useApp';
import Head from 'next/head';

type appOptionsProps = {
  [key: string]: JSX.Element;
};

export default function Home(): JSX.Element {
  const { appStatus } = useApp();

  const app: appOptionsProps = {
    connected: <UserLoggedIn />,
    notConnected: <NoUserFound />,
    noMetaMask: <NoMetaMaskFound />,
    error: <Error />,
    loading: <Loading />,
  };

  return (
    <div>
      <Head>
        <title>Home | Digs</title>
      </Head>
      {app[appStatus]}
    </div>
  );
}
