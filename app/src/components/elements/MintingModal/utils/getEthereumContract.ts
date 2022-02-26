import { contractABI, contractAddress } from '@Lib/constants';
import { ethers } from 'ethers';

const getEthereumContract = async (
  metamask: ethers.providers.ExternalProvider
): Promise<ethers.Contract | undefined> => {
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

export { getEthereumContract };
