import { useApp } from '@App/core/hooks/useApp';
import { useEffect } from 'react';

const FinishedState = (): JSX.Element => {
  const { getCurrentUserDetails } = useApp();

  useEffect(() => {
    getCurrentUserDetails();
  }, [getCurrentUserDetails]);

  return (
    <>
      <p>fim...</p>
    </>
  );
};

export default FinishedState;
