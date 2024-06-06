var { expect } = require("chai");

describe("FloorPack", function () {
  let contractAddress;

  this.beforeEach(async function () {
    Token = await ethers.getContractFactory("FloorPack");

    [owner, addr1, addr2, addr3, addr4, ...addrs] = await ethers.getSigners();

    const CONTRACT_PARAMS = [
      "FloorPack",
      "FPCK",
      "https://floor-pack-test.s3.us-east-1.amazonaws.com/tokens/{id}.json",
      "https://floor-pack-test.s3.us-east-1.amazonaws.com/contract.json",
    ];

    factory = await Token.deploy(...CONTRACT_PARAMS);
    contractAddress = factory.address;
  });

  describe("Deployment", function () {
    it("Should return the right name", async function () {
      expect(await factory.name()).to.equal("FloorPack");
    });

    it("Should return the right symbol", async function () {
      expect(await factory.symbol()).to.equal("FPCK");
    });

    it("Should set the right owner", async function () {
      expect(await factory.owner()).to.equal(owner.address);
    });

    describe("Royalties", function () {
      beforeEach(async function () {
        royalties = await factory.royaltyInfo(1, "10000000000");
      });

      it("Pays royalties to the contract owner", async function () {
        expect(royalties[0]).to.equal(owner.address);
      });

      it("Defaults to 5%", async function () {
        expect(royalties[1]).to.equal(500000000);
      });
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

  describe("airdropSingle", function () {
    describe("Unauthorized", function () {
      it("Does not allow non-owners to airdrop", async function () {
        await expect(factory.connect(addr1).airdropSingle(1, addr1.address)).to
          .be.reverted;
      });
    });

    describe("Authorized", function () {
      it("Allows the owner to airdrop", async function () {
        await factory.airdropSingle(1, addr1.address);

        expect(await factory.balanceOf(addr1.address, 1)).to.equal(1);
      });

      it("Reverts if the Token has been Disabled", async function () {
        await factory.setTokenConfig(1, [0, true]);

        await expect(factory.airdropSingle(1, addr1.address)).to.be.reverted;
      });

      it("Reverts if maximum supply has been reaced", async function () {
        await factory.setTokenConfig(1, [1, false]);

        await expect(factory.airdropSingle(1, addr1.address));
        await expect(factory.airdropSingle(1, addr1.address)).to.be.reverted;
      });
    });
  });

  describe("airdropBatch", function () {
    describe("Unauthorized", function () {
      it("Does not allow non-owners to airdrop", async function () {
        await expect(
          factory.connect(addr1).airdropBatch([1, 2, 3], addr1.address)
        ).to.be.reverted;
      });
    });

    describe("Authorized", function () {
      it("Allows the owner to airdrop", async function () {
        await factory.airdropBatch([1, 2, 3], addr1.address);

        expect(await factory.balanceOf(addr1.address, 1)).to.equal(1);
        expect(await factory.balanceOf(addr1.address, 2)).to.equal(1);
        expect(await factory.balanceOf(addr1.address, 3)).to.equal(1);
      });
    });

    it("Reverts if the Token has been Disabled", async function () {
      await factory.setTokenConfig(1, [0, true]);

      await expect(factory.airdropBatch([1, 2, 3], addr1.address)).to.be
        .reverted;
    });

    it("Reverts if maximum supply has been reaced", async function () {
      await factory.setTokenConfig(1, [1, false]);

      await expect(factory.airdropBatch([1, 2, 3], addr1.address));
      await expect(factory.airdropBatch([1, 2, 3], addr1.address)).to.be
        .reverted;
    });
  });

  describe("batchAirdrop", function () {
    describe("Unauthorized", function () {
      it("Does not allow non-owners to airdrop", async function () {
        await expect(factory.connect(addr1).batchAirdrop(1, [addr1.address])).to
          .be.reverted;
      });
    });

    describe("Authorized", function () {
      it("Allows the owner to airdrop", async function () {
        await factory.batchAirdrop(1, [
          addr1.address,
          addr2.address,
          addr3.address,
        ]);

        expect(await factory.balanceOf(addr1.address, 1)).to.equal(1);
        expect(await factory.balanceOf(addr2.address, 1)).to.equal(1);
        expect(await factory.balanceOf(addr3.address, 1)).to.equal(1);
      });
    });

    it("Reverts if the Token has been Disabled", async function () {
      await factory.setTokenConfig(1, [0, true]);

      await expect(factory.batchAirdrop(1, [addr1.address])).to.be.reverted;
    });

    it("Reverts if maximum supply has been reahced", async function () {
      await factory.setTokenConfig(1, [1, false]);

      await expect(factory.batchAirdrop(1, [addr1.address]));
      await expect(factory.batchAirdrop(1, [addr1.address])).to.be.reverted;
    });
  });
});
