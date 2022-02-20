import { useApp } from '@App/core/context/AppContext';
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
