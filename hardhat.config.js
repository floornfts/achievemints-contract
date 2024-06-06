require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  networks: {
    base: {
      url: process.env.RPC_URL_BASE,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 8453,
      verify: {
        etherscan: {
          apiUrl: "https://api.basescan.org",
          apiKey: process.env.ETHERSCAN_API_KEY ?? "ETHERSCAN_API_KEY",
        },
      },
    },
    floorTestnet: {
      url: "https://geth.testnet.floor.lol/",
      chainId: 356671,
      accounts: [process.env.PRIVATE_KEY],
    },
    baseGoerli: {
      url: process.env.RPC_URL_BASE_GOERLI,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 84531,
      verify: {
        etherscan: {
          apiUrl: "https://api-goerli.basescan.org",
          apiKey: process.env.ETHERSCAN_API_KEY ?? "ETHERSCAN_API_KEY",
        },
      },
    },
    mumbai: {
      url: process.env.RPC_URL_MUMBAI,
      accounts: [process.env.PRIVATE_KEY],
    },
    arbitrum: {
      url: process.env.RPC_URL_ARBITRUM,
      accounts: [process.env.PRIVATE_KEY],
      verify: {
        etherscan: {
          apiUrl: "https://api.arbscan.io",
          apiKey: process.env.ETHERSCAN_API_KEY ?? "ETHERSCAN_API_KEY",
        },
      },
    },
    matic: {
      url: process.env.RPC_URL_MATIC,
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      url: process.env.RPC_URL_MAINNET,
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      url: process.env.RPC_URL_GOERLI,
      accounts: [process.env.PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org/",
        },
      },
      {
        network: "baseGoerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org/",
        },
      },
    ],
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
      viaIR: true,
    },
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 30,
    coinmarketcap: process.env.COINMARKETCAP_KEY,
  },
};
