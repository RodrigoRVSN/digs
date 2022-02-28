import { Dispatch, SetStateAction } from 'react';

export interface IAuthor {
  coverImage?: string;
  isProfileImageNft: boolean;
  name: string;
  profileImage: string;
  walletAddress: string;
}

export interface IDigs {
  digs: string;
  timestamp: Date;
  author: IAuthor;
}

export interface ICurrentUser extends IAuthor {
  digs: IDigs;
}

export interface IAppContextProps {
  appStatus: string;
  currentAccount: string;
  connectToWallet: () => void;
  setAppStatus: Dispatch<SetStateAction<string>>;
  digs: IDigs[];
  fetchDigs: () => void;
  getNftProfileImage: (imageUri: string, isNft: boolean) => void;
  currentUser: ICurrentUser;
  getCurrentUserDetails: () => void;
}
