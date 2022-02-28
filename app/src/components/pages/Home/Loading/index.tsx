import { Loading, styled } from '@nextui-org/react';

const LoadingContainer = styled(Loading, {
  margin: 'auto',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const LoadingPage = (): JSX.Element => {
  return (
    <LoadingContainer color="white" textColor="white">
      Loading...
    </LoadingContainer>
  );
};
