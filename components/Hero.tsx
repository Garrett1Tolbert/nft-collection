import { Flex, Heading, Text } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';

export const Hero = ({ title }: { title: string }) => {
	const { account } = useAuth();

	return (
		<Flex
			justifyContent="center"
			alignItems="center"
			height="100vh"
			flexDir="column"
		>
			<Heading
				bgGradient="linear(to-l, #7928CA, #FF0080)"
				bgClip="text"
				fontSize="10vw"
			>
				{title}
			</Heading>
			<Text fontWeight="medium" w="full" textAlign="center">
				Uniquely{' '}
				<Text as="span" fontWeight="medium" fontStyle="italic">
					{account
						? `${account.slice(0, 4)}...${account.slice(-4)}`
						: 'yours'}
				</Text>
				. Each beautiful. Discover your NFT today ⚡️
			</Text>
		</Flex>
	);
};
