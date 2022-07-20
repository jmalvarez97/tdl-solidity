const HasbuToken = artifacts.require("./contracts/HasbuToken.sol");
const ERC721 = artifacts.require("./contracts/ERC721.sol");
const Juego = artifacts.require("./contracts/Juego.sol")
const Word = artifacts.require("./contracts/Word.sol");

const palabras = ["mandato", "quizas" , "ayer" , "maravilla", "luchador", "fortuna"];

module.exports = async function(deployer) {
  deployer.deploy(HasbuToken);
  const a = []
  for(let i = 0; i<palabras.length; i++){
    await deployer.deploy(Word, palabras[i]).then(() => {
      console.log(Word.address);
      a[i] = Word.address;
    })
  }
  await deployer.deploy(Juego).then(() => {
    Juego.deployed().then((ins) => {
      for(let i=0; i<palabras.length; i++){
        ins._crearPalabra(a[i])
      }
    })
  })




};
