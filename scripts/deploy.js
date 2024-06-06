const { ethers, upgrades } = require('hardhat');
const fs = require('fs');

async function main() {
  const FloorPack = await ethers.getContractFactory('FloorPack');

  console.log(process.env);

  console.log(
    'Preparing to deploy FloorPack Artist Contract. Please enter the following questions.'
  );

  let contractName, contractSymbol, contractBaseURI, contractURI;


  contractName = 'XXX';
  contractSymbol = 'XXX';
  contractBaseURI =
    'XXX';
  contractURI =
    'XXX';

  const deploy = async () => {
    console.log('Deploying FloorPack...');
    const contract = await FloorPack.deploy(
      contractName,
      contractSymbol,
      contractBaseURI,
      contractURI
    );
    await contract.deployed();

    // Wait 30 seconds for the contract to be mined
    await new Promise((r) => setTimeout(r, 30000));

    console.log('FloorPack deployed to:', contract.address);

    try {
      await run('verify:verify', {
        address: contract.address,
        name: 'FloorPack',
        constructorArguments: [
          contractName,
          contractSymbol,
          contractBaseURI,
          contractURI,
        ],
      });
      return;
    } catch (e) {
      console.log(e);
      console.log('Unable to Verify Contract');
      process.exit(1);
    }
  };

  deploy();
}

main();
