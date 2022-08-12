const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Litio", function () {
//================================== 👨🏻‍💻 TEST 1 -> Correct compile and deploy ==========================================
  it("Should to compile and deploy correctly the smart contract", async () => {
    console.log("📝 Compiling the smart contract...");
    const Litio = await ethers.getContractFactory("Litio");
    console.log("🚀 Deploying the smart contract...");
    const litio = await Litio.deploy();
    await litio.deployed();
    console.log("🎉 Smart contract deployed to: ", litio.address);
  })

//================================== 🚀 TEST 2 -> Correct mint to owner ==========================================
  it("Shuold to mint the Total Supply to the owner(msg.sender)", async () => {
    const [owner] = await ethers.getSigners();
    console.log("📝 Compiling the smart contract...");
    const Litio = await ethers.getContractFactory("Litio");
    console.log("🚀 Deploying the smart contract...");
    const litio = await Litio.deploy();
    
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});