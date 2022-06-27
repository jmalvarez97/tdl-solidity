// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0  <0.9.0;
// Nexo ente juego y palabra
// ownable
import "./Juego.sol";
import "./Ownable.sol";
import "./Palabra.sol";




contract Jugador is Ownable {

    uint id;
    Juego juego;
    Word actual;
    address payable contJuego;
    
    constructor(address payable _cont){
        contJuego = _cont;
        juego = Juego(_cont);
        id = juego.crearJugador();
        actual = new Word("");
    }

    function getID() public view  returns (uint){
        return id;
    }

    function crearPalabra(string memory _str) public onlyOwner{
        uint idW;
        idW = juego._crearPalabra(_str, id);
    }

    function elegirPalabra() public onlyOwner returns (Word){
        Word word  = juego.elegirPalabra(id);
        actual = word;
        return word;

    }

    function apostarLetra(string memory l) public view onlyOwner returns(uint[] memory){
        require(actual.getLen() != 0);
        // me fijo que no haya seleccionado una letra
        return actual.index(l);
    }


    // balance de hasbuCoins
    function hasbuBalance() public view onlyOwner returns (uint){
        return juego.hasbuBalance(id);
    }

    function r() public payable onlyOwner{
        contJuego.transfer(msg.value);
    }

    function balanceC() public view onlyOwner returns (uint){
        return address(this).balance;
    }

   

}