const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DEX", function () {
//================================== 👨🏻‍💻 TEST 1 -> Correct compile and deploy ==========================================
  it("Should to compile and deploy correctly the smart contract", async () => {
    console.log("📝 Compiling the smart contract...");
    const DEX = await ethers.getContractFactory("DEX");
    console.log("🚀 Deploying the smart contract...");
    const dex = await DEX.deploy();
    await dex.deployed();
    console.log("🎉 Smart contract deployed to: ", dex.address);
  })

  // TEST 
  // Checking if Token contract has a same name as expected
  it('staking contract deployed and has a name', async () => {
    const name = await tokenStaking.name();
    assert.equal(name, 'Yield Farming');
  });

  // Checking default apy value
  it('checking default APY value', async () => {
    const value = await tokenStaking.defaultAPY();
    assert.equal(value, '100', 'default APY set to 100');
  });

  // Checking custom apy value
  it('checking custom APY value', async () => {
    const value = await tokenStaking.customAPY();
    assert.equal(value, '137', 'custom APY set to 137');
  });

  // Checking if TokenStaking contract has 500k of TestTokens
  it('staking contract has 500k TestTokens tokens inside', async () => {
    let balance = await testToken.balanceOf(tokenStaking.address);
    assert.equal(balance.toString(), tokenCorvert('500000'));
  });

  
})