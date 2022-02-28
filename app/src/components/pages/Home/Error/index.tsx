import { Container } from '@nextui-org/react';

export const Error = (): JSX.Element => {
  return (
    <Container
      display="flex"
      alignItems="center"
      direction="column"
      justify="center"
      style={{ width: '100vw', margin: 'auto' }}
    >
      <h1>Oh no! A error...</h1>
    </Container>
  );
};
