import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("FundRaising contract", function () {

  let FundRaise;
  let hardhatFundRaising: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;


  beforeEach(async function () {
    FundRaise = await ethers.getContractFactory("FundRaise");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    hardhatFundRaising = await FundRaise.deploy();
  });

  describe("Transactions", function () {

    it("Transfer donation to contract", async function () {
      await hardhatFundRaising.connect(addr1).donateEther({ value: 50 });
      expect(await hardhatFundRaising.viewContractBalance()).to.equal(50);
    });


    it("Transfer donations to any address", async function () {
      const addr2StartBalance = (await ethers.provider.getBalance(addr2.address));
      await hardhatFundRaising.connect(addr1).donateEther({ value: 50 });
      await hardhatFundRaising.connect(owner).transferDonates(50, addr2.address);
      expect(await hardhatFundRaising.viewContractBalance()).to.equal(0);
      expect((await ethers.provider.getBalance(addr2.address)).eq((addr2StartBalance.add(50))));
    });
  });

  describe("View functions", function () {

    it("View donations of user", async function () {
      await hardhatFundRaising.connect(addr1).donateEther({ value: 50 });
      await hardhatFundRaising.connect(addr1).donateEther({ value: 100 });
      await hardhatFundRaising.connect(addr1).donateEther({ value: 200 });
      expect(await hardhatFundRaising.checkDonations(addr1.address)).to.equal(350);
    });

    it("View donators of contract", async function () {
      await hardhatFundRaising.connect(addr1).donateEther({ value: 50 });
      await hardhatFundRaising.connect(addr2).donateEther({ value: 50 });
      await hardhatFundRaising.connect(addr3).donateEther({ value: 50 });
      await hardhatFundRaising.connect(addr2).donateEther({ value: 50 });
      expect(assert.deepEqual((await hardhatFundRaising.viewDonators()), [addr1.address, addr2.address, addr3.address]));
    });
  });

  describe("Owner's fails", function () {

    it("Should fail if contract's balance less than user try to transfer", async function () {
      await hardhatFundRaising.connect(addr1).donateEther({ value: 50 });
      await expect(hardhatFundRaising.connect(owner).transferDonates(80, addr2.address)).to.be.revertedWith('Not enough ether');
    });
  });

  describe("Donator's fails", function () {

    it("Should fail if donation's value is 0", async function () {
      await expect(hardhatFundRaising.connect(addr1).donateEther({ value: 0 })).to.be.revertedWith("Amount can't be equal 0");
    });
  });
});
