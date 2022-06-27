import "./Word.sol";
import "./Jugador.sol";
import "./ERC20.sol";

// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0  <0.9.0;

// solo lo puede llamar jugador


contract Juego{
    mapping(address => uint) idByAddress;
    mapping(Word => address) wordOwner;
    HasbuCoin balances;
    uint256 randNonce = 0;
    uint initBalance  = 5; 

    Word[] private words;
    uint256 private idCount = 1; // ID 0 sera el id del juego, para las palabras creadas por el mismo juego
    
     modifier onlyJugador(uint id){
        require(idByAddress[msg.sender] == id);
        _;
    }

    constructor(){
        string[10] memory inits = ["mandato", "quizas", "ayer", "mientras", "soleado", "maravilla", "astuto", "raton", "mudanza", "llegando" ];
        for(uint i=0; i<inits.length; i++){
            _crearPalabra(inits[i], 0);
        }
        idByAddress[address(this)] = 0;
        balances = new HasbuCoin();
    }


 
   function crearJugador() public returns (uint){
       idCount++;
       idByAddress[msg.sender] = idCount;
       balances.addMinter(msg.sender);
       balances.transferFrom(address(this), msg.sender, 50);
       return idCount;
   }

    function _crearPalabra(string memory str, uint id) public onlyJugador(id) returns(uint){
        // Modificador: solo id jugador puede llamar a esto
        Word word = new Word(str);
        wordOwner[word] = msg.sender;
        words.push(word);
        return words.length;
    }


    function _elegirPalabra(address sender) private returns(Word){
        require(words.length > 0); // Nos fijamos que haya alguna palabra antes
        require(balances.balanceOf(sender) >= 5); // nos fijamos que tenga al menos 5 monedas para ejecutar la transaccion
        balances.transferFrom(sender, address(this), 5);
        uint indice = uint(keccak256(abi.encodePacked(randNonce, block.timestamp, sender))) %  words.length ;
        randNonce++;
        Word word = words[indice];
        require(wordOwner[word] != sender); // me fijo que la palabra asignada no sea creada por el jugador
        return word;
    }

    function elegirPalabra(uint id) public onlyJugador(id) returns(Word){
        return _elegirPalabra(msg.sender);
    }
 
    function hasbuBalance(uint id) public view onlyJugador(id) returns(uint){
        return balances.balanceOf(msg.sender);
    }

    fallback() external payable{}
    receive() external payable{}
    
}