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
    miAside.innerHTML = ''; // Limpia el contenido del aside
    miAside.appendChild(contenidoNuevo); // Agrega el nuevo contenido

    var texto = document.getElementById("texto").value;

    // Mapa de encriptación
    var mapaEncriptacion = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };

    // Realiza las sustituciones
    var textoEncriptado = texto.split('').map(function(char) {
        return mapaEncriptacion[char] || char;
    }).join('');

    var textareaResultado = contenidoNuevo.querySelector('.texto_resultado');
    textareaResultado.value = textoEncriptado; // Establece el texto encriptado en el textarea
    autoSize.call(textareaResultado); // Ajusta la altura después de establecer el texto
}

function desencriptarTexto() {
    var miAside = document.getElementById('miAside');
    miAside.innerHTML = ''; // Limpia el contenido del aside
    miAside.appendChild(contenidoNuevo); // Agrega el nuevo contenido

    var texto = document.getElementById("texto").value;

    // Orden inverso de desencriptación
    var mapaDesencriptacion = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };

    // Realiza las sustituciones
    var textoDesencriptado = texto;
    for (var key in mapaDesencriptacion) {
        var regex = new RegExp(key, 'g');
        textoDesencriptado = textoDesencriptado.replace(regex, mapaDesencriptacion[key]);
    }

    var textareaResultado = contenidoNuevo.querySelector('.texto_resultado');
    textareaResultado.value = textoDesencriptado; // Establece el texto desencriptado en el textarea
    autoSize.call(textareaResultado); // Ajusta la altura después de establecer el texto
}

function copiarTexto() {
    var textareaResultado = contenidoNuevo.querySelector('.texto_resultado');
    textareaResultado.select();
    document.execCommand("copy");
    alert("Texto copiado: " + textareaResultado.value);
    document.getElementById('miAside').innerHTML = contenidoOriginal;
}

