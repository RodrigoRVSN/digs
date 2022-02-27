import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { client } from 'lib/client';
import { IAppContextProps, ICurrentUser } from '../types/IAppContextProps';

export const AppContext = createContext({} as IAppContextProps);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  const [appStatus, setAppStatus] = useState('');
  const [digs, setDigs] = useState([]);
  const [currentUser, setCurrentUser] = useState({} as ICurrentUser);
  const [currentAccount, setCurrentAccount] = useState('');

  const router = useRouter();

  const createUserAccount = useCallback(
    async (userWalletAddress = currentAccount): Promise<void> => {
      if (!window.ethereum) {
        setAppStatus('noMetaMask');
        return;
      }

      try {
        const userDoc = {
          _type: 'users',
          _id: userWalletAddress,
          name: 'Unnamed',
          isProfileImageNft: false,
          profileImage:
            'https://avatars.dicebear.com/api/pixel-art/rodrigo.svg',
          walletAddress: userWalletAddress,
        };

        await client.createIfNotExists(userDoc);

        setAppStatus('connected');
      } catch (error) {
        router.push('/');
        setAppStatus('error');
      }
    },
    [currentAccount, router]
  );

  const checkIfWalletIsConnected = useCallback(async (): Promise<void> => {
    if (!window.ethereum) {
      setAppStatus('noMetaMask');
      return;
    }

    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (addressArray.length > 0) {
        setAppStatus('connected');
        setCurrentAccount(addressArray[0]);
        createUserAccount(addressArray[0]);
      } else {
        router.push('/');
        setAppStatus('notConnected');
      }
    } catch (error) {
      router.push('/');
      setAppStatus('error');
    }
  }, [createUserAccount, router]);

  const connectToWallet = async (): Promise<void> => {
    if (!window.ethereum) {
      setAppStatus('noMetaMask');
      return;
    }

    try {
      setAppStatus('loading');

      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
      }
      setAppStatus('connected');
    } catch (error) {
      setAppStatus('error');
    }
  };

  const getNftProfileImage = async (
    imageUri: string,
    isNft: boolean
  ): Promise<string> => {
    if (isNft) {
      return `https://gateway.pinata.cloud/ipfs/${imageUri}`;
    }
    return imageUri;
  };

  const fetchDigs = useCallback(async (): Promise<void> => {
    const query = `
      *[_type == "digs"]{
        "author": author->{name, walletAddress, profileImage, isProfileImageNft},
        digs,
        timestamp
      }|order(timestamp desc)
    `;

    const sanityResponse = await client.fetch(query);

    setDigs([]);

    sanityResponse.forEach(async (item: any) => {
      const profileImageUrl = await getNftProfileImage(
        item.author.profileImage,
        item.author.isProfileImageNft
      );

      if (item.author.isProfileImageNft) {
        const newItem = {
          digs: item.digs,
          timestamp: item.timestamp,
          author: {
            name: item.author.name,
            walletAddress: item.author.walletAddress,
            profileImage: profileImageUrl,
            isProfileImageNft: item.author.isProfileImageNft,
          },
        };

        setDigs(prevState => [...prevState, newItem] as any);
      } else {
        setDigs(prevState => [...prevState, item] as any);
      }
    });
  }, []);

  const getCurrentUserDetails = useCallback(
    async (userAccount = currentAccount): Promise<void> => {
      if (appStatus !== 'connected') return;

      const query = `
      *[_type == "users" && _id == "${userAccount}"]{
        "digs": digs[]->{timestamp, digs}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }
    `;
      const response = await client.fetch(query);

      const profileImageUri = await getNftProfileImage(
        response[0]?.profileImage,
        response[0]?.isProfileImageNft
      );

      setCurrentUser({
        digs: response[0].digs,
        name: response[0].name,
        profileImage: profileImageUri,
        walletAddress: response[0].walletAddress,
        coverImage: response[0].coverImage,
        isProfileImageNft: response[0].isProfileImageNft,
      });
    },
    [appStatus, currentAccount]
  );

  useEffect(() => {
    checkIfWalletIsConnected();
    getCurrentUserDetails();
    fetchDigs();
  }, [checkIfWalletIsConnected, fetchDigs, getCurrentUserDetails]);

  return (
    <AppContext.Provider
      value={{
        currentAccount,
        appStatus,
        connectToWallet,
        setAppStatus,
        digs,
        fetchDigs,
        getNftProfileImage,
        currentUser,
        getCurrentUserDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
