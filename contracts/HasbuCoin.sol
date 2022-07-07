pragma solidity ^0.8.0;

contract HasbuCoin {
    mapping (address => uint) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() public {
        balances[tx.origin] = 1500000;
    }

    function sendHasbuCoinByAssert(address receiver, uint amount) public returns(bool sufficient){
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Transfer(msg.sender, receiver, amount);
        return true;
    }

    function quitHasbuCoinByFail(address receiver, uint amount) public returns(bool sufficient){
        if (balances[receiver] == 0) return false;
        balances[receiver] -= amount;
        balances[msg.sender] += amount;
        emit Transfer(msg.sender, receiver, amount);
        return true;
    }

    function getBalance(address addr) public view returns(uint) {
        return balances[addr];
    }

    function test() public view returns(string memory){
        return "HOLA ANDO";
    }
}
