const { ethers, upgrades } = require("hardhat");
const fs = require("fs");
const bcrypt = require("bcryptjs");

async function main() {
  const FloorStore = await ethers.getContractFactory("FloorStore");

  let contractName, contractSymbol, contractBaseURI, contractURI;

  const deploy = async () => {
    console.log("Deploying FloorStore...");
    const contract = await FloorStore.deploy();
    await contract.deployed();

    // Wait 30 seconds for the contract to be mined
    await new Promise((r) => setTimeout(r, 30000));

    console.log("FloorStore deployed to:", contract.address);

    try {
      await run("verify:verify", {
        address: contract.address,
        name: "FloorStore",
        constructorArguments: [],
      });
      return;
    } catch (e) {
      console.log(e);
      console.log("Unable to Verify Contract");
      process.exit(1);
    }
  };

  deploy();
}

main();
