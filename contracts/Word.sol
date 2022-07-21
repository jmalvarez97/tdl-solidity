// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0  <0.9.0;

contract Word {

    string str;
    uint len;


    constructor(string memory s){
        str = s;
        len = bytes(str).length;
    }

    event stringEmitted(string mask); 


    /**
     * funcion para obtener un slice de un string
     */
    function getSlice(uint256 begin, uint256 end, string memory text) private pure returns (string memory) {
        bytes memory a = new bytes(end-begin+1);
        for(uint i=0;i<=end-begin;i++){
            a[i] = bytes(text)[i+begin-1];
        }
        return string(a);    
    }

    /**
     * funcion que dada una letra devuelve una mascara con la letra si esta en esa posicion
     * caso contrario devuelve -
     */
    function index(string memory l) public returns(string memory){

        string memory s;
        uint k=0;
        bytes memory ind = new bytes(len);

        for(uint i = 1; i <= len; i++) {
            s = getSlice(i,i,str);
            if(keccak256(bytes(s)) == keccak256(bytes(l)))
                ind[k] = bytes(s)[0];
            else
                ind[k] = bytes("-")[0];
            k++;
        }
        string memory mask = string(ind);
        emit stringEmitted(mask);
        return mask;
        
    }

    /**
     * retorna un booleano al ver si coinciden los strings
     */

    function chequearPalabra(string memory p) public view returns (bool){
        return (keccak256(bytes(p)) == keccak256(bytes(str)));
    }



    
      function getStr() public view returns (string memory){
        return str;
    }
}