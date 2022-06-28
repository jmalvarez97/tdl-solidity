// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Word = await hre.ethers.getContractFactory("Word");
  const word = await Word.deploy("arbolada");

  await word.deployed();

  const instancia = Word.attach(word.address);

  console.log("Word deployed to:", word.address);
  console.log("palabra sacada de contrato: ", await instancia.getStr());
  console.log("index sacado de contrato: ", await instancia.index("o") )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });