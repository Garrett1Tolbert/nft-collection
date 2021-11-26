import { Flex, Heading, Text } from '@chakra-ui/react';

export const Hero = ({ title }: { title: string }) => (
	<Flex
		justifyContent="center"
		alignItems="center"
		height="100vh"
		flexDir="column"
		bgGradient="linear(to-l, #7928CA, #FF0080)"
		bgClip="text"
	>
		<Heading fontSize="10vw">{title}</Heading>
		<Text fontWeight="medium" color="white">
			Uniquely yours. Each beautiful. Discover your NFT today ⚡️
		</Text>
	</Flex>
);
