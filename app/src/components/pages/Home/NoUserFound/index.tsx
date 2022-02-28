import { useApp } from '@App/core/hooks/useApp';
import { Button, Container, Text } from '@nextui-org/react';

export const NoUserFound = (): JSX.Element => {
  const { connectToWallet } = useApp();

  return (
    <Container
      display="flex"
      alignItems="center"
      direction="column"
      justify="center"
      style={{ width: '100vw', margin: 'auto' }}
    >
      <Text size={30}>You are not connected in Metamask</Text>
      <Button
        shadow
        type="button"
        onClick={() => connectToWallet()}
        style={{ marginTop: '64px' }}
      >
        Connect Metamask
      </Button>
    </Container>
  );
};
