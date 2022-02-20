import ProfileImageMinter from '@App/components/elements/MintingModal';
import { client } from 'lib/client';
import Head from 'next/head';
import { ReactNode, useState } from 'react';
import Modal from 'react-modal';
import { useApp } from '../core/context/AppContext';

export default function Home(): JSX.Element {
  const {
    appStatus,
    connectToWallet,
    currentAccount,
    currentUser,
    digs,
    fetchDigs,
  } = useApp();
  const [digsMesssage, setDigsMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const postDigs = async ev => {
    ev.preventDefault();
    if (!digsMesssage) return;

    const digsId = `${currentAccount}_${Date.now()}`;

    const digsDoc = {
      _type: 'digs',
      _id: digsId,
      digs: digsMesssage,
      timestamp: new Date(Date.now()).toISOString(),
      author: {
        _key: digsId,
        _type: 'reference',
        _ref: currentAccount,
      },
    };

    await client.createIfNotExists(digsDoc);

    await client
      .patch(currentAccount)
      .setIfMissing({ digs: [] })
      .insert('after', 'digs[-1]', [
        {
          _key: digsId,
          _type: 'reference',
          _ref: digsId,
        },
      ])
      .commit();
    setDigsMessage('');
    fetchDigs();
  };

  const userLoggedIn = (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>oi {currentUser.name}</h1>
      <img src={currentUser.coverImage} alt={currentUser.name} />
      <form onSubmit={postDigs}>
        <textarea
          placeholder="fala galera"
          value={digsMesssage}
          onChange={ev => setDigsMessage(ev.target.value)}
        />
        <button type="submit">enviar</button>
      </form>

      <button type="button" onClick={() => setOpenModal(true)}>
        abrir modal
      </button>
      <Modal isOpen={openModal} onRequestClose={() => setOpenModal(false)}>
        <ProfileImageMinter />
      </Modal>
      {digs.map(item => (
        <h2>
          {item.author.name} - {item.digs}
        </h2>
      ))}
    </>
  );

  const noMetaMaskFound = (
    <>
      <h1>instale o amigo metamask raposo!!!!!</h1>
    </>
  );

  const noUserFound = (
    <>
      <h1>Usuario nao encontrado!!!!!</h1>
      <button type="button" onClick={() => connectToWallet()}>
        conectar
      </button>
    </>
  );

  const error = (
    <>
      <h1>errou!!!!!!!!!</h1>
    </>
  );

  const loading = (
    <>
      <h1>...............!!!!!!!!!</h1>
    </>
  );

  const app = (status = appStatus): ReactNode => {
    switch (status) {
      case 'connected':
        return userLoggedIn;

      case 'notConnected':
        return noUserFound;

      case 'noMetaMask':
        return noMetaMaskFound;

      case 'error':
        return error;

      default:
        return loading;
    }
  };

  return <div>{app(appStatus)}</div>;
}
