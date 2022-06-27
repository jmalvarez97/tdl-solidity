// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0  <0.9.0;
// Nexo ente juego y palabra
// ownable
import "./Juego.sol";
import "./Ownable.sol";
import "./Word.sol";


contract Jugador is Ownable{

    uint id;
    Juego juego;
    Word actual;

    constructor(address _cont) public{
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
        // se supone que si el jugador elige una letra, el jugador ya puesta, aca iria
        // una linea donde le pasa unos tokens al juego
        actual = word;
        return word;

    }

    function apostarLetra(string memory l) public view onlyOwner returns(uint[] memory){
        require(actual.getLen() != 0);
        // me fijo que no haya seleccionado una letra
        return actual.index(l);
    }




}