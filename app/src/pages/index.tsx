import {
  Error,
  Loading,
  NoMetaMaskFound,
  NoUserFound,
  UserLoggedIn,
} from '@App/components/pages/Home';
import { useApp } from '../core/context/AppContext';

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
    default: <Loading />,
  };

  return <div>{app[appStatus]}</div>;
}
