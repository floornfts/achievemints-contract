var { expect } = require("chai");

const FLOOR_PACK_PARAMS = [
  "FloorPack",
  "FPCK",
  "https://floor-pack-test.s3.us-east-1.amazonaws.com/tokens/{id}.json",
  "https://floor-pack-test.s3.us-east-1.amazonaws.com/contract.json",
];

describe("FloorPack", function () {
  let contractAddress;

  this.beforeEach(async function () {
    Factory = await ethers.getContractFactory("FloorPackFactory");

    [owner, addr1, addr2, addr3, addr4, ...addrs] = await ethers.getSigners();

    const CONTRACT_PARAMS = [];

    factory = await Factory.deploy(...CONTRACT_PARAMS);
    contractAddress = factory.address;
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await factory.owner()).to.equal(owner.address);
    });
  });

  describe("Roles", function () {
    this.beforeEach(async function () {
      operator_role = await factory.OPERATOR_ROLE();
    });

    it("Should allow the owner to add an operator", async function () {
      await factory.grantRole(operator_role, addr1.address);

      expect(await factory.hasRole(operator_role, addr1.address)).to.equal(
        true
      );
    });

    it("Does not allow non-owners to add an operator", async function () {
      await expect(
        factory.connect(addr1).grantRole(operator_role, addr1.address)
      ).to.be.reverted;
    });

    it("Correctly reports role of non-operators", async function () {
      expect(await factory.hasRole(operator_role, addr1.address)).to.equal(
        false
      );
    });
  });

  describe("createFloorPack", function () {
    it("Should create a new FloorPack", async function () {
      await expect(factory.createFloorPack(...FLOOR_PACK_PARAMS)).to.not.be
        .reverted;
    });
  });
});
