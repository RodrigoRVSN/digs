import { ethers } from "hardhat";

async function main() {
  const profileImageMinterFactory = await ethers.getContractFactory(
    "ProfileImageNfts"
  );
  const ProfileImageContract = await profileImageMinterFactory.deploy();

  await ProfileImageContract.deployed();

  console.log(
    "Profile Image Minter Contract deployed to: ",
    ProfileImageContract.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
