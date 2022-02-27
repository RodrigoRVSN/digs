import { useApp } from '@App/core/hooks/useApp';
import { client } from '@Lib/client';
import { FormEvent, useState } from 'react';

export const UserLoggedIn = (): JSX.Element => {
  const { currentUser, currentAccount, fetchDigs } = useApp();
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
      <h1 style={{ color: '$terciary' }}>oi {currentUser.name}</h1>
      <img src={currentUser.coverImage} alt={currentUser.name} />
      <form onSubmit={postDigs}>
        <textarea
          placeholder="fala galera"
          value={digsMesssage}
          onChange={ev => setDigsMessage(ev.target.value)}
        />
        <button type="submit">enviar</button>
      </form>
    </>
  );
};
