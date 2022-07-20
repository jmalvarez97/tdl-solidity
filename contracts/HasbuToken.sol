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
    }

    function mint(address to, string memory palabra) public onlyOwner returns(uint256){
        token_count++;
        _mint(to, token_count);
        str = palabra;

        emit Transfer(address(0), to, token_count);
        return token_count;
    }

      function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return ipfs[str];
    }

      function addWord(string memory word, string memory url) public onlyOwner{
        ipfs[word] = url;
    }


}