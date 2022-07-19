// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

abstract contract ERC721 {

    string private _name;
    string private _symbol;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);

    function balanceOf(address _owner) virtual external view returns (uint256);
    function ownerOf(uint256 _tokenId) virtual external view returns (address);
    function transfer(address _to, uint256 _tokenId) virtual external;
    function approve(address _to, uint256 _tokenId) virtual external;
    function takeOwnership(uint256 _tokenId) virtual external;

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }
}

