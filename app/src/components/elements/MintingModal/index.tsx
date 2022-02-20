import { useApp } from '@App/core/context/AppContext';
import { client } from '@Lib/client';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '@Lib/constants';
import { pinFileToIPFS, pinJSONToIPFS } from '@Lib/pinata';
import FinishedState from './FinishedState';
import InitialState from './InitialState';
import LoadingState from './LoadingState';

let metamask: any;

if (typeof window !== 'undefined') {
  metamask = (window as any).ethereum;
}

interface Metadata {
  name: string;
  description: string;
  image: string;
}

const getEthereumContract = async (): Promise<ethers.Contract | undefined> => {
  if (!metamask) return undefined;
  const provider = new ethers.providers.Web3Provider(metamask);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
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

    const contract = await getEthereumContract();

    const transactionParameters = {
      to: contractAddress,
      from: currentAccount,
      data: await contract?.mint(currentAccount, `ipfs://${ipfsJsonHash}`),
    };

    try {
      await metamask.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      setStatus('finished');
    } catch (error: any) {
      console.log(error);
      setStatus('finished');
    }
  };

  const renderLogic = (modalStatus = status): ReactNode => {
    switch (modalStatus) {
      case 'initial':
        return (
          <InitialState
            profileImage={profileImage!}
            setProfileImage={setProfileImage}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            mint={mint}
          />
        );

      case 'loading':
        return <LoadingState />;

      case 'finished':
        return <FinishedState />;

      default:
        router.push('/');
        setAppStatus('error');
        return <></>;
    }
  };

  return <>{renderLogic()}</>;
};

export default ProfileImageMinter;
