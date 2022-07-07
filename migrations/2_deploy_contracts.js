const HasbuCoin = artifacts.require("./contracts/HasbuCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(HasbuCoin);
};
