const Jugador = artifacts.require("./contracts/Jugador.sol");
const Juego = artifacts.require("./contracts/Juego.sol");
const Palabra = artifacts.require("./contracts/Word.sol");
const Ownable = artifacts.require("./contracts/Ownable.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.deploy(Juego);
  deployer.deploy(Jugador);
  deployer.deploy(Palabra);
};
