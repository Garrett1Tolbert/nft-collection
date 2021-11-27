declare let window: any;
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../constants';
import myEpicNft from '../constants/MyEpicNFT.json';
import useAuth from './useAuth';

export default function useContract() {
	const { account } = useAuth();

	const getContract = () => {
		if (!account) return null;
		const { ethereum } = window;
		const provider = new ethers.providers.Web3Provider(ethereum);

		const signer = provider.getSigner();
		const _contract = new ethers.Contract(
			CONTRACT_ADDRESS,
			myEpicNft.abi,
			signer
		);

		return _contract;
	};

	return { getContract };
}
