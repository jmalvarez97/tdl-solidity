$(document).ready(function () {
  App = {
    accJuego : '0x1849b4f6D3455f99b65F933e130591545D726826',
    web3Provider: null,
    contracts: {},
    accounts: {},
    word : null,

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
            .HttpProvider('http://localhost:8545');
      }
      web3 = new Web3(App.web3Provider);
      accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      //console.log(accounts)
      return App.initContract();
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
  
    _incluirLetra: function(letra) {
      let numero_span = 0;
  
      letra = letra.toLowerCase();
  
      for (let i = 0; i < palabra_secreta.length; i++) {
        if (palabra_secreta.charAt(i) == letra) {
          aciertos++;
          App._escribirSpan(i, letra);
          letras_probadas += letra;
        }
      }
  
      if (aciertos == palabra_secreta.replace(new RegExp(' ', 'g'), '').length) {
        App._gane();
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
        App._perdida();
      }
    },

    _gane: function() {
      $('#probar_letra').attr('disabled', true);
      $('#boton_probar').attr('disabled', true);
  
      $('#adivinar').attr('disabled', true);
      $('#boton_adivinar').attr('disabled', true);
  
      $('#imagen_ahorcado').attr('src', '/img/ganador.png');
  
      App._mostrarPalabra('gane');
    },

    _perdida: function() {
      $('#probar_letra').attr('disabled', true);
      $('#boton_probar').attr('disabled', true);
  
      $('#adivinar').attr('disabled', true);
      $('#boton_adivinar').attr('disabled', true);
  
      $('#imagen_ahorcado').attr('src', '/img/6error.png');
      App._mostrarPalabra('perdida');
    },

    _probarLetra: function(addWord) {

      let input_probar_letra = $('#probar_letra');


      if (input_probar_letra.val() != ' ') {
        if (input_probar_letra.val().length > 0) {
          if (App._cadenaPermitida(input_probar_letra.val())) {
            if (!App._verificarLetraProbada(input_probar_letra.val())) {

              $.getJSON("Word.json", function(data){
                const web3 = new Web3(App.web3Provider);  // metamask
                const acc = web3.eth.accounts; // array de accounts de metamask
                
                const word = TruffleContract(data);
                word.setProvider(App.web3Provider);
                console.log(addWord)
                var instance = word.at(addWord);
                
                instance.getStr({from: acc[0]}).then((res) => {
                  console.log(res);
                });
              })
              
              
              
              
              /*
              if (App._verificarLetra(input_probar_letra.val())) {
                App._incluirLetra(input_probar_letra.val());
              } else {
                App._incluirFallo(input_probar_letra.val())
              }
              */
  
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

    _adivinar: function() {
      let input_adivinar = $('#adivinar');
  
      if (input_adivinar.val().length > 0) {
        if (App._cadenaPermitida(input_adivinar.val())) {
          if (input_adivinar.val().toLowerCase() == palabra_secreta) {
            App._gane();
          } else {
            App._perdida();
          }
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

    _finalizar: function() {
      App._inicializar();
    },

    
    crearJugador: function(){
      $.getJSON("Juego.json", function(data){
        
        const web3 = new Web3(App.web3Provider);
        const acc = web3.eth.accounts;

        const juego = TruffleContract(data);
        juego.setProvider(App.web3Provider);

        const instance = juego.at(App.accJuego);

        console.log(instance);
        instance.crearJugador({from: acc[0]})
      })
        
      },
    
    elegirPalabra: function(){
      $.getJSON("Juego.json", function(data) {

        const acc = new Web3(App.web3Provider).eth.accounts;  // metamask

        const juego = TruffleContract(data);
        juego.setProvider(App.web3Provider);
        var instance = juego.at(App.accJuego);
        instance.elegirPalabra({from: acc[0]}).then((res, err) =>{
          if(!err){
            return App.mostrarBlockPalabra(res.logs[0].args.add);
          }
          else{
            console.log("AAAA")
          }
        })


      });
    },

    mostrarBlockPalabra: function(add){
        $.getJSON("Word.json", function(data){
        const web3 = new Web3(App.web3Provider);  // metamask
        const acc = web3.eth.accounts; // array de accounts de metamask
        
        const word = TruffleContract(data);
        word.setProvider(App.web3Provider);
        var instance = word.at(add);
        instance.getStr({from: acc[0]}).then((res) => {
          console.log(res);
          return App._inicializar(res,add);
        });


      })
    },

    _inicializar : function(word, wordAdd) {
      fallos = 0;
      aciertos = 0;
      palabra_secreta = word;
      //console.log(palabra_secreta);
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

      return App._iniciar(word, wordAdd)
  
    },
    
    _iniciar : function(word, wordAdd) {

      if (word.length > 0) {
        if (App._cadenaPermitida(word)) {
          word = word.toLowerCase();
  
          $('#boton_iniciar').attr("disabled", true);
  
          $('#probar_letra').attr("disabled", false);
          $('#boton_probar').attr("disabled", false);
  
          $('#adivinar').attr("disabled", false);
          $('#boton_adivinar').attr("disabled", false);
  
          App._establecerEspacios();
  
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
      addWord = wordAdd;
      return wordAdd;
    },
    
  };


  let juego = App.initWeb3();
  //let jugador = App.crearJugador()
  //let palabra = App.elegirPalabra();
  let addWord = null;

  let fallos, aciertos, palabra_secreta, letras_probadas, letras_fallidas;

  function main() {
    
    $('#boton_iniciar').click(App.elegirPalabra);
    $('#boton_probar').click(App._probarLetra);
    $('#boton_finalizar').click(App._finalizar);
    $('#boton_adivinar').click(App._adivinar);

    $('#boton_iniciar').on("keydown", function (event) {
      if (event.which == 13) {
        addWord = App.elegirPalabra()
      }
    });

    $('#probar_letra').on("keydown", function (event) {
      if (event.which == 13) {
        App._probarLetra(addWord);
      }
    });

    $('#adivinar').on("keydown", function (event) {
      if (event.which == 13) {
        App._adivinar();
      }
    });
  }
  main();
});

