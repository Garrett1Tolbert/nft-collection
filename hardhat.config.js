require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
	solidity: '0.8.0',
	networks: {
		rinkeby: {
			url: process.env.ALCHEMY_API_KEY,
			accounts: [process.env.RINKEBY_ACCOUNT_KEY],
		},
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
};
