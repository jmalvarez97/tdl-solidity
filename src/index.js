App = {
  web3Provider: null,
  contracts: {},
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
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("HasbuCoin.json", function(data) {
      App.contracts.HasbuContract = TruffleContract(data);
      App.contracts.HasbuContract.setProvider(App.web3Provider);
      return App.init();
    });
  },

  init: async function() {
    App.contracts.HasbuContract.deployed().then(function(instance) {
      hasbuInstance = instance;
      return hasbuInstance;
    }).then(function(result) {
      console.log(result);
    });
  }
};

$(document).ready(function () {
  console.log(App.initWeb3());

  const palabras = ["solidity", "programacion", "fideos", "fiuba", "diseño", "lenguaje"];
  let fallos, aciertos, palabra_secreta, letras_probadas, letras_fallidas;

  function inicializar() {
    fallos = 0;
    aciertos = 0;
    palabra_secreta = palabras[Math.floor(Math.random() * (palabras.length - 1))];
    console.log(palabra_secreta);
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

  }

  function cadenaPermitida(cadena) {
    let expresion = '';

    cadena = cadena.toLowerCase();
    expresion = /^[a-zñ ]+$/;

    if (expresion.test(cadena)) {
      return true;
    } else {
      return false;
    }
  }

  function verificarLetraProbada(letra) {
    letra = letra.toLowerCase();

    if (letras_probadas.indexOf(letra) != -1) {
      return true;
    } else {
      return false;
    }
  }

  function verificarLetra(letra) {
    letra = letra.toLowerCase();

    if (palabra_secreta.indexOf(letra) != -1) {
      return true;
    } else {
      return false;
    }
  }

  function establecerEspacios() {
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
  }

  function escribirSpan(indice, letra) {
    let lista_span = $('span');

    for (let i = 0; i < lista_span.length; i++) {
      if (i == indice) {
        lista_span[i].innerHTML = letra;
      }
    }
  }

  function mostrarPalabra(opcion) {
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
  }

  function incluirLetra(letra) {
    let numero_span = 0;

    letra = letra.toLowerCase();

    for (let i = 0; i < palabra_secreta.length; i++) {
      if (palabra_secreta.charAt(i) == letra) {
        aciertos++;
        escribirSpan(i, letra);
        letras_probadas += letra;
      }
    }

    if (aciertos == palabra_secreta.replace(new RegExp(' ', 'g'), '').length) {
      gane();
    }
  }

  function incluirFallo(letra) {
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
      perdida();
    }
  }

  function gane() {
    $('#probar_letra').attr('disabled', true);
    $('#boton_probar').attr('disabled', true);

    $('#adivinar').attr('disabled', true);
    $('#boton_adivinar').attr('disabled', true);

    $('#imagen_ahorcado').attr('src', '/img/ganador.png');

    mostrarPalabra('gane');
  }

  function perdida() {
    $('#probar_letra').attr('disabled', true);
    $('#boton_probar').attr('disabled', true);

    $('#adivinar').attr('disabled', true);
    $('#boton_adivinar').attr('disabled', true);

    $('#imagen_ahorcado').attr('src', '/img/6error.png');
    mostrarPalabra('perdida');
  }

  function iniciar() {

    if (palabra_secreta.length > 0) {
      if (cadenaPermitida(palabra_secreta)) {
        palabra_secreta = palabra_secreta.toLowerCase();

        $('#boton_iniciar').attr("disabled", true);

        $('#probar_letra').attr("disabled", false);
        $('#boton_probar').attr("disabled", false);

        $('#adivinar').attr("disabled", false);
        $('#boton_adivinar').attr("disabled", false);

        establecerEspacios();

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
  }

  function probarLetra() {
    let input_probar_letra = $('#probar_letra');

    if (input_probar_letra.val() != ' ') {
      if (input_probar_letra.val().length > 0) {
        if (cadenaPermitida(input_probar_letra.val())) {
          if (!verificarLetraProbada(input_probar_letra.val())) {
            if (verificarLetra(input_probar_letra.val())) {
              incluirLetra(input_probar_letra.val());
            } else {
              incluirFallo(input_probar_letra.val())
            }

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
  }

  function adivinar() {
    let input_adivinar = $('#adivinar');

    if (input_adivinar.val().length > 0) {
      if (cadenaPermitida(input_adivinar.val())) {
        if (input_adivinar.val().toLowerCase() == palabra_secreta) {
          gane();
        } else {
          perdida();
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
  }

  function finalizar() {
    inicializar();
  }

  function main() {
    inicializar();
    $('#boton_iniciar').click(iniciar);
    $('#boton_probar').click(probarLetra);
    $('#boton_finalizar').click(finalizar);
    $('#boton_adivinar').click(adivinar);

    $('#boton_iniciar').on("keydown", function (event) {
      if (event.which == 13) {
        iniciar();
      }
    });

    $('#probar_letra').on("keydown", function (event) {
      if (event.which == 13) {
        probarLetra();
      }
    });

    $('#adivinar').on("keydown", function (event) {
      if (event.which == 13) {
        adivinar();
      }
    });
  }
  main();
});

