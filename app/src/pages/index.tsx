import {
  Error,
  LoadingPage,
  NoMetaMaskFound,
  NoUserFound,
  UserLoggedIn,
} from '@App/components/pages/Home';
import { useApp } from '@App/core/hooks/useApp';
import { styled } from '@nextui-org/react';
import Head from 'next/head';

type appOptionsProps = {
  [key: string]: JSX.Element;
};

const MainContainer = styled('main', {
  width: '80%',
});

export default function Home(): JSX.Element {
  const { appStatus } = useApp();

  const app: appOptionsProps = {
    connected: <UserLoggedIn />,
    notConnected: <NoUserFound />,
    noMetaMask: <NoMetaMaskFound />,
    error: <Error />,
    loading: <LoadingPage />,
  };

  return (
    <>
      <Head>
        <title>Home | Digs</title>
      </Head>
      <MainContainer>{app[appStatus]}</MainContainer>
    </>
  );
}
