# Floor Packs - Artist Contract

This project uses Hardhat for building and deployment.

## Setup

Once you have checked-out the repo, do a `yarn install` to install required dependencies.

You will also be required to create a `.env` file with API keys for Etherscan (or Polygonscan), your RPC provider (usually Alchemy), and the private key for your deploying wallet. You can find a sample file `.env.sample`.

## Deployment

The contract can be deployed from the CLI by running the following command:

```
npx hardhat run --network NETWORK scripts/deploy.js
```

Supported networks are `mainnet`, `goerli` (ETH Testnet), `matic` and `mumbai` (MATIC Testnet).

The script will walk you through setting of deployment parameters:

- Contract Name & Symbol
  - These are used to identify the contract when viewed on Etherscan. While there are no strict standards, its good to keep these internally consistent and to treat the symbol like a stock ticker - under 10 characters, alpha-only.
- Metadata Base URI
  - This is the location the metadata is stored and is an output of the setup step. It should include the substitution token `{id}`.
- Contract Metadata URI
  - This describes the contract and is an output of the setup step.

Once confirmed, the contract will be deployed and we will attempt to verify it. This process will take approx. 60 seconds.

The contract address will be displayed in the output. This should be saved for future reference.

## Post Deployment

- [ ] Call `grantRole` and ensure that the minting wallet used by the Web3 Transaction Microservice has the `OPERATOR_ROLE` for the contract (you can grab the value from the deployed contract)
- [ ] Add the contract address and `airdropSingle`/`airdropBatch` ABIs to the Web3 Transaction Microservice.
