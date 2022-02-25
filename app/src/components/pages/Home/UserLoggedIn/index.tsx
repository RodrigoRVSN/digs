import ProfileImageMinter from '@App/components/elements/MintingModal';
import { useApp } from '@App/core/context/AppContext';
import { client } from '@Lib/client';
import Head from 'next/head';
import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

export const UserLoggedIn = (): JSX.Element => {
  const { currentUser, digs, currentAccount, fetchDigs } = useApp();
  const [openModal, setOpenModal] = useState(false);
  const [digsMesssage, setDigsMessage] = useState('');

  const postDigs = async (ev: FormEvent): Promise<void> => {
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

  return (
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
      {digs.map((item: any) => (
        <h2>
          {item.author.name} - {item.digs}
        </h2>
      ))}
    </>
  );
};
