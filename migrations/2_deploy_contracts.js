const HasbuCoin = artifacts.require("./contracts/HasbuCoin.sol");
const ERC20 = artifacts.require("./contracts/ERC20.sol");
const Juego = artifacts.require("./contracts/Juego.sol")
const Word = artifacts.require("./contracts/Word.sol")
const palabras = ["mandato", "quizas", "ayer", "mientras", "soleado", "maravilla", "astuto", "raton", "mudanza", "llegando" ];

module.exports = async function(deployer) {
  //deployer.deploy(HasbuCoin);
  //deployer.deploy(ERC20);
  const a = []
  for(let i = 0; i<10; i++){
    await deployer.deploy(Word, palabras[i]).then(() => {
      console.log(Word.address);
      a[i] = Word.address;
    })
  }
  await deployer.deploy(Juego).then(() => {
    Juego.deployed().then((ins) => {
      for(let i=0; i<10; i++){
        ins._crearPalabra(a[i])
      }
    })
  })




};
