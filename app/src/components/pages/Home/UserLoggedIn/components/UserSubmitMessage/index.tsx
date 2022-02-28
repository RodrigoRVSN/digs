import { useApp } from '@App/core/hooks/useApp';
import { client } from '@Lib/client';
import {
  Avatar,
  Button,
  Grid,
  Spacer,
  Text,
  Textarea,
} from '@nextui-org/react';
import { FormEvent, useState } from 'react';
import { FormMessage, MessageContainer } from './styles';

export const UserSubmitMessage = (): JSX.Element => {
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
    <MessageContainer>
      <Text h1 size={34}>
        Home
      </Text>
      <Grid.Container gap={2} justify="center" style={{ marginTop: '8px' }}>
        <Grid>
          <Avatar
            size="lg"
            color="gradient"
            bordered
            squared={currentUser.isProfileImageNft}
            src={currentUser.profileImage}
            alt={currentUser.name}
          />
        </Grid>
        <Grid>
          <FormMessage onSubmit={postDigs}>
            <Textarea
              fullWidth
              bordered
              color="secondary"
              labelPlaceholder="Write your message here"
              value={digsMesssage}
              onChange={ev => setDigsMessage(ev.target.value)}
            />
            <Spacer y={0.5} />
            <Button
              disabled={!digsMesssage}
              ghost
              auto
              type="submit"
              color="gradient"
            >
              Dig
            </Button>
          </FormMessage>
        </Grid>
      </Grid.Container>
    </MessageContainer>
  );
};
