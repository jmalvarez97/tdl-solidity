// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./OpenZeppelin/ERC721/ERC721.sol";
import "./Ownable.sol";

contract HasbuToken is ERC721, Ownable{

    uint256 token_count=0;
    string str;
    mapping(string => string) ipfs; 

    constructor() ERC721("HasbuNFT", "HAS") {
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