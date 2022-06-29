const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {

    const Juego = await hre.ethers.getContractFactory("Juego");
    const juego = await Juego.deploy();

    await juego.deployed();

    console.log("Juego deployed to:", juego.address)

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
