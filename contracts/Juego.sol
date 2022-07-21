import "./Word.sol";
import "./Ownable.sol";
import "./HasbuToken.sol";

// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0  <0.9.0;

// solo lo puede llamar jugador


contract Juego is Ownable{

    mapping(address => uint) idByAddress;
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

     /**
     * funcion que hace un nft con la palabra adivinada
     * Solo los que se registren como jugadores pueden llamar
     */
    function mint(address to, string memory word) public onlyJugador{
        uint256 id = NFT.mint(to, word);
        emit NFTMinted(address(0), to, id);
    }

    
     /**
     * funcion para crear un jugador, cualquiera puede llamarla
     */
    function crearJugador() public{
        require(idByAddress[msg.sender] == 0, "este usuario ya existe!");
        idCount++;
        idByAddress[msg.sender] = idCount;
}


    /**
    * funcion auxiliar para agregar palabras, solo puede usarla el dueño del contrato
    */
    function _crearPalabra(address add, string memory word, string memory uri) public onlyOwner{
        words.push(add);
        NFT.addWord(word, uri);
    }

    /**
    * funcion para elegir una palabra al azar
    */
    function _elegirPalabra(address sender) private returns(address){
        require(words.length > 0); // Nos fijamos que haya alguna palabra antes
        uint indice = uint(keccak256(abi.encodePacked(randNonce, block.timestamp, sender))) %  words.length ;
        randNonce++;
        address addWord = words[indice];
        emit AddressWord(addWord);
        return addWord;
    }

    /**
    * wrapper de la funcion anterior, con el modificador que solo jugadores pueda llamar a esto
    */
    function elegirPalabra() public onlyJugador returns(address){
        return _elegirPalabra(msg.sender);
    }

    /**
    * funcion para ver la cantidad de nft tiene el usuario que juega
    */
    function balanceOf(address add) public view returns(uint256){
        return NFT.balanceOf(add);
    }

    fallback() external payable{}
    receive() external payable{}
    
}