declare let window: any;
import { useToast, Link, Box } from '@chakra-ui/react';
import { Hero } from '../components/Hero';
import { Container } from '../components/Container';
import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import { CONTRACT_ADDRESS } from '../constants';
import useContract from '../hooks/useContract';

const Index = () => {
	const { getContract } = useContract();
	const { account, connectWallet } = useAuth();
	const label = account ? 'Mint your NFT' : 'Connect Wallet';
	const contract = getContract();
	const toast = useToast();

	const mintNft = async () => {
		const { ethereum } = window;
		let chainId = await ethereum.request({ method: 'eth_chainId' });

		// Rinkby chainId
		if (chainId !== '0x4') {
			toast({
				position: 'top',
				description:
					'You are not connected to the Rinkeby Test Network!',
				duration: 5000,
				status: 'error',
				isClosable: true,
			});
			return;
		}
		try {
			const contract = getContract();
			console.log('Going to pop wallet now to pay gas...');
			let nftTxn = await contract.makeAnEpicNFT();

			console.log(
				`Minting, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
			);
			await nftTxn.wait();

			console.log(
				`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
			);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		contract?.on('NewEpicNFTMinted', (from, tokenId) => {
			const id = 'os-toast';
			if (!toast.isActive(id)) {
				toast({
					id,
					position: 'top',
					duration: 3000,
					render: () => (
						<Link
							isExternal
							mt="3"
							href={`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`}
							color="white"
							p={3}
							rounded="md"
							bg="blue.500"
						>
							⚡️ Click to view your new NFT on OpenSea
						</Link>
					),
				});
			}
		});
		return () => {
			contract?.off('NewEpicNFTMinted', () => {});
		};
	}, [contract]);

	return (
		<Container height="100vh">
			<Hero title="NFTsAreUs" />
			<Main>
				<Box
					as="button"
					p={4}
					w="65%"
					color="white"
					fontWeight="bold"
					borderRadius="md"
					onClick={!account ? connectWallet : mintNft}
					bgGradient="linear(to-r, teal.500, green.500)"
				>
					{label}
				</Box>
			</Main>
			<DarkModeSwitch />
		</Container>
	);
};

export default Index;
