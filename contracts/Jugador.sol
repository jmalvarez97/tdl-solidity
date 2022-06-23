// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0  <0.9.0;
// Nexo ente juego y palabra
// ownable
import "./Juego.sol";
import "./Ownable.sol";
import "./Palabra.sol";


contract Jugador is Ownable{

    uint id;
    Juego juego;
    
    constructor(address _cont){
        juego = Juego(_cont);
        id = juego.crearJugador();
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
        return word;

    }




}