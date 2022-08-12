const hre = require("hardhat");

async function main() {
  let yearly = process.argv[4] * 365;
  let APY = process.argv[4] * 1000;
  let tokenStaking = await DEX.deployed();
  await tokenStaking.changeAPY(APY);

  console.log(
  `✅ APY have been changed to ${process.argv[4]}% Daily.
    (${yearly}% Yearly)`
  )
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
