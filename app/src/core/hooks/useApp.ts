import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { IAppContextProps } from '../types/IAppContextProps';

export const useApp = (): IAppContextProps => {
  const hook = useContext(AppContext);
  return hook;
};
