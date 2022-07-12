const HasbuCoin = artifacts.require("./contracts/HasbuCoin.sol");
const ERC20 = artifacts.require("./contracts/ERC20.sol");
const Juego = artifacts.require("./contracts/Juego.sol")
module.exports = function(deployer) {
  deployer.deploy(HasbuCoin);
  deployer.deploy(ERC20);
  deployer.deploy(Juego);
};
