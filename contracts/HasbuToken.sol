// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0  <0.9.0;

import "./ERC721.sol";
import "./Ownable.sol";

contract HasbuToken is ERC721, Ownable{
    uint256 token_count=0;

    // La palabra, donde va?? es unico de cada token

    mapping(address => uint256) private balances;
    mapping(uint256 => address) private owners;

    mapping(uint256 => address) private approvals; // mapping que dado un tokenID te da la address aprobada 

    constructor() ERC721("HasbuNFT", "HAS") {
    }

    modifier onlyOwnerOf(uint256 tokenID){
        require(owners[tokenID] == msg.sender);
        _;
    }

    function _mint(address to) public onlyOwner returns(uint256){
        require( to != address(0), "Address 0");
        token_count++;
        balances[to] ++;
        owners[token_count] = to;

        emit Transfer(address(0), to, token_count);
        return token_count;
    }
    
    function balanceOf(address _owner) external view override returns (uint256){
        require(_owner != address(0), "Address 0");
        return balances[_owner];
    }

    function ownerOf(uint256 _tokenId) external view override returns (address){
        address owner = owners[_tokenId];
        require(owner != address(0), "Address 0");
        return owner;
    }

    function approve(address to, uint256 _tokenId)  external override{
        address owner = owners[_tokenId];

        require(owner != to , "No se puede transferir a si mismo");
        require(owner == msg.sender, "Solo el dueno puede llamar esta funcion");

        _approve(to, _tokenId);
    }

    function _approve(address to, uint256 _tokenId) internal {
        approvals[_tokenId] = to;
        emit Approval(owners[_tokenId], to, _tokenId);
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        balances[_to]++;
        balances[_from]--;
        owners[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
  }

    function transfer(address _to, uint256 _tokenId) external onlyOwnerOf(_tokenId) override{
        _transfer(owners[_tokenId], _to, _tokenId);
    }

    
    function takeOwnership(uint256 _tokenId)  external override{
        require(approvals[_tokenId] == msg.sender);
        address owner = owners[_tokenId];
        _transfer(owner, msg.sender, _tokenId);
    }

}