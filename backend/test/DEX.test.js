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

  // Checking TokenStaking total banalce
  it('checking total staked before any stakes', async () => {
    result = await tokenStaking.totalStaked();
    assert.equal(
      result.toString(),
      tokenCorvert('0'),
      'total staked should be 0'
    );
  });

  // Testing stakeTokens function
  it('approving tokens, staking tokens, checking balance', async () => {
    // First approve tokens to be staked
    await testToken.approve(tokenStaking.address, tokenCorvert('1000'), {
      from: user,
    });
    // stake tokens
    await tokenStaking.stakeTokens(tokenCorvert('1000'), { from: user });

    // Check balance of user if they have 0 after staking
    result = await testToken.balanceOf(user);
    assert.equal(
      result.toString(),
      tokenCorvert('1234'),
      'User balance after staking 1234'
    );
  });

  // Checking balance of TokenStaking contract should be 500k +1000
  it('checking contract balance after staking', async () => {
    result = await testToken.balanceOf(tokenStaking.address);
    assert.equal(
      result.toString(),
      tokenCorvert('501000'),
      'Smart contract total balance after staking 1000'
    );
  });

  // Checking TokenStaking contract users balance
  it('checking user balance inside contract', async () => {
    result = await tokenStaking.stakingBalance(user);
    assert.equal(
      result.toString(),
      tokenCorvert('1000'),
      'Smart contract balance for user'
    );
  });

  // Checking TokenStaking totalstaked balance
  it('checking total staked', async () => {
    result = await tokenStaking.totalStaked();
    assert.equal(
      result.toString(),
      tokenCorvert('1000'),
      'total staked should be 1000'
    );
  });

  // Checking isStaking function to see if user is staking
  it('testing if user is staking at the moment', async () => {
    result = await tokenStaking.isStakingAtm(user);
    assert.equal(result.toString(), 'true', 'user is currently staking');
  });

  // Checking hasStaked function to see if user ever staked
  it('testing if user has staked', async () => {
    result = await tokenStaking.hasStaked(user);
    assert.equal(result.toString(), 'true', 'user has staked');
  });

  // Checking balance of TokenStaking contract after redistribution
  it('checking TokenStaking balance', async () => {
    result = await testToken.balanceOf(tokenStaking.address);
    assert.equal(
      result.toString(),
      tokenCorvert('500999'),
      'Smart contract total balance after staking 1000'
    );
  });

  // Check balance of user after redistribution should be X / 1000
  it('checking user balance', async () => {
    result = await testToken.balanceOf(user);
    assert.equal(
      result.toString(),
      tokenCorvert('1235'),
      'User total balance after redistribution 1 + 1234'
    );
  });

  // Testing unstaking function
  it('unstaking and checking users balance after unstake', async () => {
    await tokenStaking.unstakeTokens({ from: user });
    result = await testToken.balanceOf(user);
    assert.equal(
      result.toString(),
      tokenCorvert('2235'),
      'User balance after unstaking 1000 + 1235'
    );
  });

  // Checking TokenStaking total staked balance
  it('checking total staked', async () => {
    result = await tokenStaking.totalStaked();
    assert.equal(
      result.toString(),
      tokenCorvert('0'),
      'total staked should be 0'
    );
  });

  // Checking TokenStaking total custom staking banalce
  it('checking total custom staked before any stakes', async () => {
    result = await tokenStaking.customTotalStaked();
    assert.equal(
      result.toString(),
      tokenCorvert('0'),
      'total staked should be 0'
    );
  });

  // Checking Users Balance before staking
  it('checking users balance before staking', async () => {
    result = await testToken.balanceOf(user);
    assert.equal(
      result.toString(),
      tokenCorvert('2235'),
      'User balance after staking 2235'
    );
  });

  // Testing if user able to stake in custom staking
  it('approving tokens, staking tokens, checking balance', async () => {
    // first approve tokens to be staked
    await testToken.approve(tokenStaking.address, tokenCorvert('1234'), {
      from: user,
    });
    // stake tokens
    await tokenStaking.customStaking(tokenCorvert('1234'), { from: user });

    // check balance of user if they have 1001 after staking
    result = await testToken.balanceOf(user);
    assert.equal(
      result.toString(),
      tokenCorvert('1001'),
      'User balance after staking 1001'
    );
  });

  // Check custom total staking balance
  it('checking custom total staked', async () => {
    result = await tokenStaking.customTotalStaked();
    assert.equal(
      result.toString(),
      tokenCorvert('1234'),
      'total staked should be 1234'
    );
  });

  // Checking customIsStakingAtm function to see if user is staking
  it('testing if user is staking at custom staking at the moment', async () => {
    result = await tokenStaking.customIsStakingAtm(user);
    assert.equal(result.toString(), 'true', 'user is currently staking');
  });

  // Checking customHasStaked function to see if user ever staked
  it('testing if user has staked at custom staking', async () => {
    result = await tokenStaking.customHasStaked(user);
    assert.equal(result.toString(), 'true', 'user has staked');
  });

  // Unstaking from custom staking and checking balance
  it('unstaking from custom staking and checking users balance ', async () => {
    await tokenStaking.customUnstake({ from: user });
    result = await testToken.balanceOf(user);
    assert.equal(
      result.toString(),
      tokenCorvert('2235'),
      'User balance after unstaking 1000 + 1235'
    );
  });

})