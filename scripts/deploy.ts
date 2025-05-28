import { ethers } from "hardhat";

async function main() {
  console.log("Deploying VotingSystem contract...");

  const VotingSystem = await ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.deploy();

  await votingSystem.waitForDeployment();

  console.log(
    `VotingSystem deployed to ${await votingSystem.getAddress()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 