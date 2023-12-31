require('@nomicfoundation/hardhat-toolbox');
require('solidity-coverage');

require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'sepolia',
  networks: {
    hardhat: {},
    sepolia: {
      url: 'https://sepolia.infura.io/v3/77ef266e244b47779bd0361a1dcab124',
      accounts: [
        '3c3545cee9332dd2be1ff2d014eb188d84d8023564225bf3add050af4efcf04b',
      ],
    },
    scrollTestnet: {
      url: process.env.SCROLL_TESTNET_URL || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    localhost: {
      url: 'http://localhost:8545',
      timeout: 20_000,
    },
  },
  solidity: {
    version: '0.8.20',
    settings: {
      evmVersion: 'paris',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20_000,
  },
};
