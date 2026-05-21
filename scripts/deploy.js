import hre from "hardhat";

async function main() {
  const CryptoAdvisor = await hre.ethers.getContractFactory("CryptoAdvisor");
  const cryptoAdvisor = await CryptoAdvisor.deploy();

  await cryptoAdvisor.waitForDeployment();

  console.log("CryptoAdvisor deployed to:", await cryptoAdvisor.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});