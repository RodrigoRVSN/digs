import { Container, Link } from '@nextui-org/react';

export const NoMetaMaskFound = (): JSX.Element => {
  return (
    <Container
      display="flex"
      alignItems="center"
      direction="column"
      justify="center"
      style={{ width: '100vw', margin: 'auto' }}
    >
      <h1>The metamask is not installed!</h1>
      <Link color="warning" target="_blank" href="https://metamask.io/">
        Take a look!
      </Link>
    </Container>
  );
};
