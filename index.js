var contenidoOriginal = document.getElementById('miAside').innerHTML;

function autoSize() {
    this.style.height = '';
    this.style.height = this.scrollHeight + 'px';
}

function creaContenido() {
    var div = document.createElement("div");
    div.className = "contenedor_aside_resultado";

    var textarea = document.createElement("textarea");
    textarea.className = "texto_resultado";
    textarea.oninput = autoSize;
    div.appendChild(textarea);

    var botonCopiar = document.createElement("button");
    botonCopiar.className = "copiar";
    botonCopiar.textContent = "Copiar";
    botonCopiar.onclick = copiarTexto;
    div.appendChild(botonCopiar);

    return div;
}

var contenidoNuevo = creaContenido();

function encriptarTexto() {
    var miAside = document.getElementById('miAside');
    miAside.innerHTML = ''; 
    miAside.appendChild(contenidoNuevo); 

    var texto = document.getElementById("texto").value;

    
    var mapaEncriptacion = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };

    
    var textoEncriptado = texto.split('').map(function(char) {
        return mapaEncriptacion[char] || char;
    }).join('');

    var textareaResultado = contenidoNuevo.querySelector('.texto_resultado');
    textareaResultado.value = textoEncriptado; 
    autoSize.call(textareaResultado); 
}

function desencriptarTexto() {
    var miAside = document.getElementById('miAside');
    miAside.innerHTML = ''; 
    miAside.appendChild(contenidoNuevo); 

    var texto = document.getElementById("texto").value;


    var mapaDesencriptacion = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };


    var textoDesencriptado = texto;
    for (var key in mapaDesencriptacion) {
        var regex = new RegExp(key, 'g');
        textoDesencriptado = textoDesencriptado.replace(regex, mapaDesencriptacion[key]);
    }

    var textareaResultado = contenidoNuevo.querySelector('.texto_resultado');
    textareaResultado.value = textoDesencriptado; 
    autoSize.call(textareaResultado); 
}

function copiarTexto() {
    var textareaResultado = contenidoNuevo.querySelector('.texto_resultado');
    textareaResultado.select();
    document.execCommand("copy");
    alert("Texto copiado: " + textareaResultado.value);
    document.getElementById('miAside').innerHTML = contenidoOriginal;
}

