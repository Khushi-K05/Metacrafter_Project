
const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
  const Bank = await ethers.getContractFactory("Bank");
  const bank = await Bank.deploy();
  await bank.deployed();

  console.log("Bank contract deployed to:", bank.address);

  // Fetch ABI
  const abi = Bank.interface.format('json');

  // Save ABI to a file (optional)
  try {
    fs.writeFileSync('BankABI.json', JSON.stringify(abi, null, 2));
    console.log("ABI saved to BankABI.json file");
  } catch (error) {
    console.error("Error saving ABI:", error);
  }

  return {
    address: bank.address,
    abi: abi
  };
}

main()
  .then((contractInfo) => {
    console.log("Contract deployment successful!");
    console.log("Contract Address:", contractInfo.address);
    console.log("ABI:");
    console.log(contractInfo.abi); // Ensure ABI is logged correctly
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
