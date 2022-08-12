module.exports = async function(callback) {
    if (process.argv[4] === 'custom') {
      let tokenStaking = await TokenStaking.deployed();
      await tokenStaking.customRewards();
      console.log('✅ Daily [custom] rewards have been redistributed');
      callback();
    } else if (!process.argv[4]) {
      let tokenStaking = await TokenStaking.deployed();
      await tokenStaking.redistributeRewards();
      console.log('✅ Daily rewards have been redistributed');
      callback();
    } else {
      console.log(
        'Error: Invalid argument provided, for custom reward redistribution use: truffle exec scripts/redistribute.js custom'
      );
    }
};

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  
  