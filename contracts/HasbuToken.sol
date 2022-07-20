// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./OpenZeppelin ERC721/ERC721/ERC721.sol";
import "./Ownable.sol";

contract HasbuToken is ERC721, Ownable{

    uint256 token_count=0;
    string str;
    mapping(string => string) ipfs; 

    constructor() ERC721("HasbuNFT", "HAS") {
        	ipfs["mandato"]   =  "https://bafkreiaawnjlbot5s3jivmlyhppxjeefllt4fv5acclsknklnmxaz7ilsq.ipfs.nftstorage.link/";
	        ipfs["quizas"]    =  "https://bafkreif2boyhlmi52qjfifktjvst2zfcdso52t7t24idygki4fz2twjxiq.ipfs.nftstorage.link/";
	        ipfs["ayer"]      =  "https://bafkreiarw4mom62of6jydvabch34cgvu65p5lb4sktfrnr7dty55h5q3ne.ipfs.nftstorage.link/";
	        ipfs["maravilla"] =  "https://bafkreietnt364rkvlbq3rddnre25hzhzlmpceoiu6k63zujnq6vmyxlds4.ipfs.nftstorage.link/";
	        ipfs["luchador"]  =  "https://bafkreieehhvhuvklukffyhyhrsy752gxvkxuhvckrtjuuw7jih2up357ni.ipfs.nftstorage.link/";
	        ipfs["fortuna"]   =  "https://bafkreig4n5sr7plgif4racoasn33j7hgojhd74a3bm6ckoco2xlkmcipaa.ipfs.nftstorage.link/";
          ipfs["camioneta"] =  "https://bafkreie426fikitaxbwnoinxltgmj7g5kshj6le6cmpivwb4ivucbhwjim.ipfs.nftstorage.link/";
	        ipfs["comodo"]    =  "https://bafkreieoxqfwl3tcnlv4zaqleb3dewqjhjptdi4swzurqkotman3m5eal4.ipfs.nftstorage.link/";
	        ipfs["fuerza"]    =  "https://bafkreidh2yz4scpuww5cz6fbxvo22ppiugt5gxx35oywl7onzhpile2yi4.ipfs.nftstorage.link/";
  	      ipfs["argentina"] =  "https://bafkreiegivllnqv6ryndbh634ojiifxrinpc64qxvy3mbpdf5ahw4lz3l4.ipfs.nftstorage.link/";
    }



  /**
    * Crea un numero NFT en la address dada, solo el dueño del contrato puede llamar a esto
    */
    function mint(address to, string memory palabra) public onlyOwner returns(uint256){
        token_count++;
        _mint(to, token_count);
        str = palabra;

        emit Transfer(address(0), to, token_count);
        return token_count;
    }


     /**
    * override para setear un propio URI
    */
      function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return ipfs[str];
    }


  /**
    * funcion para agregar el URI de una palabra nueva
    */
      function addWord(string memory word, string memory uri) public onlyOwner{
        ipfs[word] = uri;
    }


}