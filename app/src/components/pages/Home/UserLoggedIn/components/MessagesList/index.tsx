import { useApp } from '@App/core/hooks/useApp';
import { Avatar, Grid, Text } from '@nextui-org/react';
import { Iconly } from 'react-iconly';
import * as S from './styles';

export const MessagesList = (): JSX.Element => {
  const { digs } = useApp();

  return (
    <S.DigsContainer>
      {digs.map(dig => {
        const username = dig.author.walletAddress;

        return (
          <S.DigContainer>
            <Avatar
              bordered
              size="lg"
              src={dig.author.profileImage}
              squared={dig.author.isProfileImageNft}
            />
            <Grid>
              <S.UserName>
                <Text size={24}>{dig.author.name}</Text>
                <Text size={20} color="$gray_2">
                  @{username.substring(1, 5)}...
                  {username.substring(username.length - 5)}
                </Text>
              </S.UserName>
              <Text color="$terciary">
                {new Intl.DateTimeFormat('default', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: false,
                }).format(new Date(dig.timestamp))}
              </Text>
              <Text size={20}>{dig.digs}</Text>
              <S.Actions>
                <Iconly name="Heart" style={{ color: '#EB2F93' }} />
                <Iconly name="Chat" style={{ color: '#EB2F93' }} />
                <Iconly name="Send" style={{ color: '#EB2F93' }} />
              </S.Actions>
            </Grid>
          </S.DigContainer>
        );
      })}
    </S.DigsContainer>
  );
};
