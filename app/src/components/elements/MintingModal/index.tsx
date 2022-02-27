import { client } from '@Lib/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress } from '@Lib/constants';
import { pinFileToIPFS, pinJSONToIPFS } from '@Lib/pinata';
import { useApp } from '@App/core/hooks/useApp';
import FinishedState from './FinishedState';
import InitialState from './InitialState';
import LoadingState from './LoadingState';
import { getEthereumContract } from './utils/getEthereumContract';

let metamask: ethers.providers.ExternalProvider;

if (typeof window !== 'undefined') {
  metamask = window.ethereum;
}

export interface Metadata {
  name: string;
  description: string;
  image: string;
}

type mintOptionsProps = {
  [key: string]: JSX.Element | (() => void);
};

const ProfileImageMinter = (): JSX.Element => {
  const { currentAccount, setAppStatus } = useApp();
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('initial');
  const [profileImage, setProfileImage] = useState<File>();

  const mint = async (): Promise<void> => {
    if (!name || !description || !profileImage) return;
    setStatus('loading');

    const pinataMetaData = {
      name: `${name} - ${description}`,
    };

    const ipfsImageHash = await pinFileToIPFS(profileImage, pinataMetaData);

    await client
      .patch(currentAccount)
      .set({ profileImage: ipfsImageHash })
      .set({ isProfileImageNft: true })
      .commit();

    const imageMetaData: Metadata = {
      name,
      description,
      image: `ipfs://${ipfsImageHash}`,
    };

    const ipfsJsonHash = await pinJSONToIPFS(imageMetaData);

    const contract = await getEthereumContract(metamask);

    const transactionParameters = {
      to: contractAddress,
      from: currentAccount,
      data: await contract?.mint(currentAccount, `ipfs://${ipfsJsonHash}`),
    };

    try {
      if (!metamask.request) return;
      await metamask.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      setStatus('finished');
    } catch {
      setStatus('error');
    }
  };

  const renderLogic: mintOptionsProps = {
    initial: (
      <InitialState
        profileImage={profileImage!}
        setProfileImage={setProfileImage}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        mint={mint}
      />
    ),
    loading: <LoadingState />,
    finished: <FinishedState />,
    error: () => {
      router.push('/');
      setAppStatus('error');
      return <></>;
    },
  };

  return <>{renderLogic[status]}</>;
};

export default ProfileImageMinter;
