$(document).ready(function () {
  let fallos, aciertos, palabra_secreta, letras_probadas, letras_fallidas;
  let costoJuego = 0.00006;
  Front = {
    
    _cadenaPermitida:  function(cadena) {
      let expresion = '';
  
      cadena = cadena.toLowerCase();
      expresion = /^[a-zñ ]+$/;
  
      if (expresion.test(cadena)) {
        return true;
      } else {
        return false;
      }
    },
    
    _verificarLetraProbada: function(letra) {
      letra = letra.toLowerCase();

      if (letras_probadas.indexOf(letra) != -1) {
        return true;
      } else {
        return false;
      }
    },

    _verificarLetra: function(letra) {
      letra = letra.toLowerCase();

      if (palabra_secreta.indexOf(letra) != -1) {
        return true;
      } else {
        return false;
      }
    },

    _establecerEspacios: function() {
      let html = '';
  
      for (let i = 0; i < palabra_secreta.length; i++) {
        if (palabra_secreta.charAt(i) == ' ') {
          html += `
                  <span class='espacio'></span>
                  `;
        } else {
          html += `
                  <span class='letra'></span>
                  `;
        }
      }
  
      $('#palabra').html(html);
    },
  
    _escribirSpan: function(indice, letra) {
      let lista_span = $('span');
  
      for (let i = 0; i < lista_span.length; i++) {
        if (i == indice) {
          lista_span[i].innerHTML = letra;
        }
      }
    },

    _mostrarPalabra: function(opcion) {
      let html = '';
  
      for (let i = 0; i < palabra_secreta.length; i++) {
  
        if (palabra_secreta.charAt(i) == ' ') {
          html += `
                      <span class='espacio'>${palabra_secreta.charAt(i)}</span>
                  `;
        } else {
          html += `
                      <span class='letra letra-${opcion}'>${palabra_secreta.charAt(i)}</span>
                  `;
        }
      }
  
      $('#palabra').html(html);
    },
  
    _incluirLetra: function(mascara) {
      let numero_span = 0;
      console.log(mascara)
  
      mascaraW = mascara.toLowerCase();
      for(let i=0; i< mascaraW.length; i++){
      if(mascaraW[i] != "-"){
        for (let i = 0; i < palabra_secreta.length; i++) {
          if (palabra_secreta.charAt(i) == mascaraW[i]) {
            aciertos++;
            Front._escribirSpan(i, mascaraW[i]);
            letras_probadas += mascaraW[i];
          }
      }
      }
    }
      if (aciertos == palabra_secreta.replace(new RegExp(' ', 'g'), '').length) {
        Front._gane();
      }
    },

    _incluirFallo: function(letra) {
      let div_letras_fallidas = $('#letras_fallidas'),
          html = div_letras_fallidas.html();
  
      letra = letra.toLowerCase();
  
      fallos++;
  
      letras_fallidas += letra;
      letras_probadas += letra;
  
      $('#imagen_ahorcado').attr('src', '/img/' + fallos + 'error.png');
  
      if (html == '') {
        html = letra;
      } else {
        html += '-' + letra;
      }
  
      div_letras_fallidas.html(html);
  
      if (fallos == 6) {
        Front._perdida();
      }
    },

    _gane: function() {
      $('#probar_letra').attr('disabled', true);
      $('#boton_probar').attr('disabled', true);
  
      $('#adivinar').attr('disabled', true);
      $('#boton_adivinar').attr('disabled', true);
  
      $('#imagen_ahorcado').attr('src', '/img/ganador.png');
  
      Front._mostrarPalabra('gane');
    },

    _perdida: function() {
      $('#probar_letra').attr('disabled', true);
      $('#boton_probar').attr('disabled', true);
  
      $('#adivinar').attr('disabled', true);
      $('#boton_adivinar').attr('disabled', true);
  
      $('#imagen_ahorcado').attr('src', '/img/6error.png');
      Front._mostrarPalabra('perdida');
    },

    _inicializar : function(word) {
      fallos = 0;
      aciertos = 0;
      palabra_secreta = word;
      letras_probadas = '';
      letras_fallidas = '';
      $('#imagen_ahorcado').attr('src', '/img/ahorcado.png');
      $('#palabra').html('');
      $('#letras_fallidas').html('');
  
      $('#probar_letra').val('');
      $('#adivinar').val('');
  
      $('#boton_iniciar').attr("disabled", false);
  
      $('#probar_letra').attr("disabled", true);
      $('#boton_probar').attr("disabled", true);
  
      $('#adivinar').attr("disabled", true);
      $('#boton_adivinar').attr("disabled", true);
  
      $('#boton_iniciar').focus();
    },

    _finalizar: function() {
      Front._inicializar();
    },

    _iniciar : function(word) {

      if (word.length > 0) {
        if (Front._cadenaPermitida(word)) {
          word = word.toLowerCase();
  
          $('#boton_iniciar').attr("disabled", true);
  
          $('#probar_letra').attr("disabled", false);
          $('#boton_probar').attr("disabled", false);
  
          $('#adivinar').attr("disabled", false);
          $('#boton_adivinar').attr("disabled", false);
  
          Front._establecerEspacios();
  
          $('#probar_letra').focus();
        } else {
          $('#etiqueta_mensaje').html('Datos Incorrectos');
          $('#cuerpo_mensaje').html('La palabra debe contener caracteres de la A a la Z únicamente.');
          $('#mensaje').modal('show')
  
          $('#mensaje').on('hidden.bs.modal', function () {
            $('#boton_iniciar').focus();
          })
        }
      } else {
        $('#etiqueta_mensaje').html('Datos Incorrectos');
        $('#cuerpo_mensaje').html('Debe escribir la palabra secreta.');
        $('#mensaje').modal('show')
  
        $('#mensaje').on('hidden.bs.modal', function () {
          $('#boton_iniciar').focus();
        })
      }
    },

    mostrarData: function(instance){
      instance.balanceOf.call(acc[0]).then((res, err) =>{
        document.getElementById('data').innerHTML = '<br> Cuenta: ' + acc[0]+ "<br> # NFT's : " + res;
      })
    },


  }


  App = {
    accJuego : '0x0566CD6CBb5589Ee638a6d183ac75B38e040C16F',
    addCreado : "0xb5Cef97dc045FAD4cE8D1f0fECbA4424f4bC1428",
    web3Provider: null,
    contracts: {},
    accounts: {},

    initWeb3: async function() {
      if (window.ethereum) {
        App.web3Provider = window.ethereum;
        try {
          await window.ethereum.enable();
        } catch (error) {
          console.error("User denied account access")
        }
      }
      else if (window.web3) {
        App.web3Provider = window.web3.currentProvider;
      }
      else {
        App.web3Provider = new Web3.providers
            .HttpProvider('https://rinkeby.infura.io/v3/4607a49ac0fd47dcb74f6282b60d18ff');
      }
      web3 = new Web3(App.web3Provider);
      accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    },

    initContract: function() {
      $.getJSON("Juego.json", function(data) {
        App.contracts.Juego = TruffleContract(data);
        App.contracts.Juego.setProvider(App.web3Provider);
        return App.init();
      });
    },

    init: async function() {
      App.contracts.Juego.deployed().then(function(instance) {
        hasbuInstance = instance;
        //console.log(instance)
        return hasbuInstance;
      }).then(function(result) { 
        const pong = result.ping().then((res) => {console.log(res)});
        //const palabra2 = result.crearJugador({from: accounts[0]}).then((id) => console.log(id));
      });
    },

    instanciaJuego: function(){
      return new Promise((resolve, reject) => {
        $.getJSON("Juego.json").success(function(data) {
          const web3 = new Web3(App.web3Provider);
          const acc = web3.eth.accounts;

          const juego = TruffleContract(data);
          juego.setProvider(App.web3Provider);
          var instance = juego.at(App.accJuego);

          resolve([acc, instance, web3]);
        })

      })


    } ,  

    instanciaPalabra: function(add){
      return new Promise((resolve, reject) => {
        $.getJSON("Word.json", function(data){
          const web3 = new Web3(App.web3Provider);  
          const acc = web3.eth.accounts; 
          
          const word = TruffleContract(data);
          word.setProvider(App.web3Provider);
          var instance = word.at(add);

          resolve( [acc, instance, web3] );

      });
    })

    },

    _probarLetra: function(addWord) {

      let input_probar_letra = $('#probar_letra');
      let letra = $('#probar_letra').val();
      console.log(letra)
      //console.log(input_probar_letra)

      const add = addWord.view.add
      if (letra != ' ') {
        if (letra.length > 0) {
          if (Front._cadenaPermitida(letra)) {
            if (!Front._verificarLetraProbada(letra)) {

                App.instanciaPalabra(add).then((res, err) => {

                  acc = res[0];
                  instance = res[1];              
                  instance.index(letra, {from: acc[0]}).then((res) => {
                    const mask = res.logs[0].args.mask
                    Front._incluirLetra(mask);
                    let aux = 0;
                    for(let i=0; i<mask.length; i++){
                      if(mask[i] != "-"){
                        aux++;
                      } 
                    }
                    if(aux == 0){
                      Front._incluirFallo(letra);
                    }
                });
              })
              
              
              input_probar_letra.val('');
              input_probar_letra.focus();
            } else {
              $('#etiqueta_mensaje').html('Datos Incorrectos');
              $('#cuerpo_mensaje').html('La letra ya ha sido probada.');
              $('#mensaje').modal('show')
  
              $('#mensaje').on('hidden.bs.modal', function () {
                input_probar_letra.val('');
                input_probar_letra.focus();
              })
            }
          } else {
            $('#etiqueta_mensaje').html('Datos Incorrectos');
            $('#cuerpo_mensaje').html('Sólo se permiten caracteres de la A a la Z únicamente.');
            $('#mensaje').modal('show')
  
            $('#mensaje').on('hidden.bs.modal', function () {
              input_probar_letra.val('');
              input_probar_letra.focus();
            })
          }
        } else {
          $('#etiqueta_mensaje').html('Datos Incorrectos');
          $('#cuerpo_mensaje').html('Debe escribir la letra a probar.');
          $('#mensaje').modal('show')
  
          $('#mensaje').on('hidden.bs.modal', function () {
            $('#boton_iniciar').focus();
          })
        }
      } else {
        input_probar_letra.val('');
        input_probar_letra.focus();
      }
    },

    _adivinar: function(addWord) {
      const add = addWord.view.add
      let input_adivinar = $('#adivinar');
      let palabra_adivinar = $('#adivinar').val()
  
      if (input_adivinar.val().length > 0) {
        if (Front._cadenaPermitida(input_adivinar.val())) {

            App.instanciaPalabra(add).then((res, err) => {

              acc = res[0];
              instance = res[1];
              instance.chequearPalabra(palabra_adivinar, {from : acc[0]}).then((res, err) => {
              if(res){
                Front._gane();
                App.minarNFT(palabra_adivinar);
              }
              else{
                Front._perdida();
              }
            })

          })

        } else {
          $('#etiqueta_mensaje').html('Datos Incorrectos');
          $('#cuerpo_mensaje').html('Sólo se permiten caracteres de la A a la Z únicamente.');
          $('#mensaje').modal('show')
  
          $('#mensaje').on('hidden.bs.modal', function () {
            input_adivinar.val('');
            input_adivinar.focus();
          })
        }
      } else {
        $('#etiqueta_mensaje').html('Datos Incorrectos');
        $('#cuerpo_mensaje').html('Debe escribir la palabra a adivinar.');
        $('#mensaje').modal('show')
  
        $('#mensaje').on('hidden.bs.modal', function () {
          input_adivinar.focus();
        })
      }
    },

    crearJugador: function(){

        App.instanciaJuego().then((res, err) => {

          acc = res[0];
          instance = res[1];
          Front.mostrarData(instance)
          instance.crearJugador({from: acc[0]})
          
      })
      
        
      },

 

    elegirPalabra: function(){

      return new Promise((resolve, reject) => {
        
        App.instanciaJuego().then((res, err) => {

          acc = res[0];
          instance = res[1];
          web3 = res[2];

          Front.mostrarData(instance);

          
          web3.eth.sendTransaction(
            { from: acc[0], to: App.addCreado, value: (costoJuego) *1e18}, 
              (err,res) =>{
                if(res){ 
                  instance.elegirPalabra({from: acc[0]}).then((address, errAdd) =>{
                  if(!errAdd){
                    add = address.logs[0].args.add
                    App.mostrarBlockPalabra(add).then((resWord, errWord) => {
                      if(!errWord){
                        Front._inicializar(resWord);
                        Front._iniciar(resWord);
                        resolve(add);
                      }

              });
            }
          })}
        });
          
      })
    })
  
    },

    mostrarBlockPalabra: function(add){
      return new Promise((resolve, reject) => {
        App.instanciaPalabra(add).then((res, err) => {
          
          acc = res[0];
          instance = res[1];


  
        instance.getStr.call({from: acc[0]}).then((res) => {
          resolve(res);
        });
      });
  });
  },

    minarNFT : function(word){
        
        App.instanciaJuego().then((res, err) => {

          acc = res[0];
          instance = res[1];

          instance.mint(acc[0], word, {from: acc[0]}).then((res, err) => {
            Front.mostrarData(instance);
            
        })
      })

    }
    
  };

  
  function main() {

    let juego = App.initWeb3();

  
    $('#boton_iniciar').click(App.elegirPalabra);
    $('#boton_probar').click(App._probarLetra);
    $('#boton_finalizar').click(Front._finalizar);
    $('#boton_adivinar').click(App._adivinar);
    $('#boton_crear').click(App.crearJugador);

    $('#boton_crear').on("keydown", function (event) {
      if (event.which == 13) {
        App.crearJugador();
      }
    });

    $('#boton_iniciar').on("keydown", function (event) {
      if (event.which == 13) {
        App.elegirPalabra().then((res, err) => {
          if(!err){
            $('#probar_letra').on("keydown", function (event) {
              if (event.which == 13) {
                App._probarLetra(res);
              }
            });
        
            $('#adivinar').on("keydown", function (event) {
              if (event.which == 13) {
                App._adivinar(event);
              }
            });
          }

        })
      }
    });

    
  }
  main();
});

