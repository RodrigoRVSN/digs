import { useApp } from '@App/core/context/AppContext';

export const NoUserFound = (): JSX.Element => {
  const { connectToWallet } = useApp();

  return (
    <>
      <h1>Usuario nao encontrado!!!!!</h1>
      <button type="button" onClick={() => connectToWallet()}>
        conectar
      </button>
    </>
  );
};
