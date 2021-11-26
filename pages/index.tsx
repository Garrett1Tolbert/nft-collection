import { Box } from '@chakra-ui/react';
import { Hero } from '../components/Hero';
import { Container } from '../components/Container';
import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import useAuth from '../hooks/useAuth';

const Index = () => {
	const { account, connectWallet } = useAuth();
	const label = account ? 'Mint your NFT' : 'Connect Wallet';

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
					onClick={!account ? connectWallet : null}
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
