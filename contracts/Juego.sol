import "./Word.sol";
import "./Ownable.sol";
import "./HasbuToken.sol";

// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0  <0.9.0;

// solo lo puede llamar jugador


contract Juego is Ownable{
    mapping(address => uint) idByAddress;
    mapping(address => address) wordOwner;
    uint256 randNonce = 0;

    HasbuToken NFT;
    address[] private words;
    uint256 private idCount = 1; // ID 1 sera el id del juego, para las palabras creadas por el mismo juego
    
     modifier onlyJugador(){
        require(idByAddress[msg.sender] != 0, "aca maestro");
        _;
    }

    event AddressWord(address add);
    event NFTMinted(address from, address to, uint256 id);


    constructor() {
        NFT = new HasbuToken();
        idByAddress[msg.sender] = 1;
    }

    function mint(address to, string memory word) public onlyJugador{
        uint256 id = NFT.mint(to, word);
        emit NFTMinted(address(0), to, id);
    }

   function crearJugador() public{
       idCount++;
       idByAddress[msg.sender] = idCount;
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
        uint indice = uint(keccak256(abi.encodePacked(randNonce, block.timestamp, sender))) %  words.length ;
        randNonce++;
        address addWord = words[indice];
        require(wordOwner[addWord] != sender); // me fijo que la palabra asignada no sea creada por el jugador
        emit AddressWord(addWord);
        return addWord;
    }

    function elegirPalabra() public onlyJugador returns(address){
        return _elegirPalabra(msg.sender);
    }

    function ping() public pure returns (string memory){
        return "pong";
    }

    fallback() external payable{}
    receive() external payable{}
    
}