import { Loading, styled } from '@nextui-org/react';

const LoadingContainer = styled(Loading, {
  display: 'flex',
  alignItems: 'center',
  direction: 'column',
  justify: 'center',
  width: '100vw',
  margin: 'auto',
});

export const LoadingPage = (): JSX.Element => {
  return (
    <LoadingContainer color="white" textColor="white">
      Loading...
    </LoadingContainer>
  );
};
