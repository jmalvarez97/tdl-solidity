const HasbuToken = artifacts.require("./contracts/HasbuToken.sol");
const ERC721 = artifacts.require("./contracts/ERC721.sol");
const Juego = artifacts.require("./contracts/Juego.sol")
const Word = artifacts.require("./contracts/Word.sol");

const palabras = ["mandato", "quizas" , "ayer" , "maravilla", "luchador", "fortuna", "camioneta", "comodo", "fuerza", "argentina"];
const uris = {
  	"mandato": "https://bafkreiaawnjlbot5s3jivmlyhppxjeefllt4fv5acclsknklnmxaz7ilsq.ipfs.nftstorage.link/",
	  "quizas" : "https://bafkreif2boyhlmi52qjfifktjvst2zfcdso52t7t24idygki4fz2twjxiq.ipfs.nftstorage.link/",
	  "ayer" : "https://bafkreiarw4mom62of6jydvabch34cgvu65p5lb4sktfrnr7dty55h5q3ne.ipfs.nftstorage.link/",
	  "maravilla": "https://bafkreietnt364rkvlbq3rddnre25hzhzlmpceoiu6k63zujnq6vmyxlds4.ipfs.nftstorage.link/",
	  "luchador": "https://bafkreieehhvhuvklukffyhyhrsy752gxvkxuhvckrtjuuw7jih2up357ni.ipfs.nftstorage.link/",
	  "fortuna" : "https://bafkreig4n5sr7plgif4racoasn33j7hgojhd74a3bm6ckoco2xlkmcipaa.ipfs.nftstorage.link/",
	  "camioneta" : "https://bafkreie426fikitaxbwnoinxltgmj7g5kshj6le6cmpivwb4ivucbhwjim.ipfs.nftstorage.link/",
	  "comodo" : "https://bafkreieoxqfwl3tcnlv4zaqleb3dewqjhjptdi4swzurqkotman3m5eal4.ipfs.nftstorage.link/",
	  "fuerza": "https://bafkreidh2yz4scpuww5cz6fbxvo22ppiugt5gxx35oywl7onzhpile2yi4.ipfs.nftstorage.link/",
	  "argentina" : "https://bafkreiegivllnqv6ryndbh634ojiifxrinpc64qxvy3mbpdf5ahw4lz3l4.ipfs.nftstorage.link/",
};

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
        ins._crearPalabra(a[i],palabras[i], uris[palabras[i]])
      }
    })
  })




};
