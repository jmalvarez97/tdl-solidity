import "./ERC20.sol";
import "./Word.sol";
import "./Ownable.sol";

// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0  <0.9.0;

// solo lo puede llamar jugador


contract Juego is Ownable{
    mapping(address => uint) idByAddress;
    mapping(address => address) wordOwner;
    HasbuCoins balances;
    uint256 randNonce = 0;
    uint initBalance  = 5; 

    address[] private words;
    uint256 private idCount = 2; // ID 1 sera el id del juego, para las palabras creadas por el mismo juego
    
     modifier onlyJugador(){
        require(idByAddress[msg.sender] != 0, "aca maestro");
        _;
    }

    constructor(){
        idByAddress[msg.sender] = 1;
        balances = new HasbuCoins();
    }


 
   function crearJugador() public{
       idCount++;
       idByAddress[msg.sender] = idCount;
       balances.addMinter(msg.sender);
       balances.transferFrom(address(this), msg.sender, 50);
   }

   function getID() public view onlyJugador returns(uint){
        return idByAddress[msg.sender];
   }
   function _crearPalabra(address add) public onlyOwner{
    wordOwner[add] = msg.sender;
    words.push(add);
   }

    function crearPalabra(string memory str) public onlyJugador{
        // Modificador: solo id jugador puede llamar a esto
        Word word = new Word(str);
        wordOwner[address(word)] = msg.sender;
        words.push(address(word));
    }


    function _elegirPalabra(address sender) private returns(address){
        require(words.length > 0); // Nos fijamos que haya alguna palabra antes
        require(balances.balanceOf(sender) >= 5); // nos fijamos que tenga al menos 5 monedas para ejecutar la transaccion
        balances.transferFrom(sender, address(this), 5);
        uint indice = uint(keccak256(abi.encodePacked(randNonce, block.timestamp, sender))) %  words.length ;
        randNonce++;
        address addWord = words[indice];
        require(wordOwner[addWord] != sender); // me fijo que la palabra asignada no sea creada por el jugador
        return addWord;
    }

    function elegirPalabra() public onlyJugador returns(address){
        return _elegirPalabra(msg.sender);
    }
 
    function hasbuBalance(uint id) public view onlyJugador returns(uint){
        return balances.balanceOf(msg.sender);
    }

    function ping() public view returns (string memory){
        return "pong";
    }

    function getfirst() public view returns(string memory ){
        return Word(words[0]).getStr();
    }

    fallback() external payable{}
    receive() external payable{}
    
}