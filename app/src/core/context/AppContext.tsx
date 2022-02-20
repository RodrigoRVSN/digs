/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
} from 'react';
import { useRouter } from 'next/router';
import { client } from 'lib/client';

interface AppContextProps {
  appStatus: string;
  currentAccount: string;
  connectToWallet: () => void;
  setAppStatus: Dispatch<SetStateAction<string>>;
  digs: any;
  fetchDigs: () => void;
  getNftProfileImage: (imageUri: string, isNft: boolean) => void;
  currentUser: any;
  getCurrentUserDetails: () => void;
}

export const AppContext = createContext({} as AppContextProps);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [appStatus, setAppStatus] = useState('');
  const [digs, setDigs] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentAccount, setCurrentAccount] = useState('');

  const router = useRouter();

  /**
   * Creates an account in Sanity DB if the user does not already have one
   * @param {String} userAddress Wallet address of the currently logged in user
   */
  const createUserAccount = async (userWalletAddress = currentAccount) => {
    if (!(window as any).ethereum) return setAppStatus('noMetaMask');
    try {
      const userDoc = {
        _type: 'users',
        _id: userWalletAddress,
        name: 'Unnamed',
        isProfileImageNft: false,
        profileImage: 'https://github.com/randompersonnotexisting.png',
        walletAddress: userWalletAddress,
      };

      await client.createIfNotExists(userDoc);

      setAppStatus('connected');
    } catch (error) {
      router.push('/');
      setAppStatus('error');
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (!(window as any).ethereum) return setAppStatus('noMetaMask');
    try {
      const addressArray = await (window as any).ethereum.request({
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
  };

  const connectToWallet = async () => {
    if (!(window as any).ethereum) return setAppStatus('noMetaMask');
    try {
      setAppStatus('loading');

      const addressArray = await (window as any).ethereum.request({
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

  /**
   * Generates NFT profile picture URL or returns the image URL if it's not an NFT
   * @param {String} imageUri If the user has minted a profile picture, an IPFS hash; if not then the URL of their profile picture
   * @param {Boolean} isNft Indicates whether the user has minted a profile picture
   * @returns A full URL to the profile picture
   */
  const getNftProfileImage = async (imageUri: string, isNft: boolean) => {
    if (isNft) {
      return `https://gateway.pinata.cloud/ipfs/${imageUri}`;
    }
    if (!isNft) {
      return imageUri;
    }
  };

  const fetchDigs = async () => {
    const query = `
      *[_type == "digs"]{
        "author": author->{name, walletAddress, profileImage, isProfileImageNft},
        digs,
        timestamp
      }|order(timestamp desc)
    `;

    const sanityResponse = await client.fetch(query);

    setDigs([]);

    sanityResponse.forEach(async item => {
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
  };

  /**
   * Gets the current user details from Sanity DB.
   * @param {String} userAccount Wallet address of the currently logged in user
   * @returns null
   */
  const getCurrentUserDetails = async (userAccount = currentAccount) => {
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
      response[0].profileImage,
      response[0].isProfileImageNft
    );

    setCurrentUser({
      tweets: response[0].tweets,
      name: response[0].name,
      profileImage: profileImageUri,
      walletAddress: response[0].walletAddress,
      coverImage: response[0].coverImage,
      isProfileImageNft: response[0].isProfileImageNft,
    });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getCurrentUserDetails();
    fetchDigs();
  }, []);

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

export const useApp = () => {
  const hook = useContext(AppContext);
  return hook;
};
