// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./OpenZeppelin ERC721/ERC721/ERC721.sol";
import "./Ownable.sol";

contract HasbuToken is ERC721, Ownable{

    uint256 token_count=0;

    constructor() ERC721("HasbuNFT", "HAS") {}

    function mint(address to) public onlyOwner returns(uint256){
        token_count++;
        _mint(to, token_count);

        emit Transfer(address(0), to, token_count);
        return token_count;
    }

      function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return "https://bafkreiagx4rtbkmus3zlqjj4w53nfla6ehfp47sty7gk2ht3ukriqdu3v4.ipfs.nftstorage.link/";
    }


}