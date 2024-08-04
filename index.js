var originalContent = document.getElementById('miAside').innerHTML;

/*esta función se solicita en la función que genera el textarea en la función createContent y se encarga de 
ajustar sus dimensiones para que se ajusten a la longitud del texto ingresado.*/
function autoSize() {
    this.style.height = '';
    this.style.height = this.scrollHeight + 'px';
}

//esta función crea un nuevo contenido en el aside de la landingpage.
function createContent() {

    //se genera un contenedor div que contiene un textarea y un botón copiar 
    var div = document.createElement("div");
    div.className = "contenedor_aside_resultado";

    /*se crea un textarea donde se genera el resultado del texto a encriptar o desencriptar y se llama a la 
    función autoSize para hacer sus dimensiones auto-ajustables*/
    var textArea = document.createElement("textarea");
    textArea.className = "texto_resultado";
    textArea.oninput = autoSize;
    div.appendChild(textArea);

    /*se crea un botón copiar que llama a la función copyText para copiar el texto generado como resultado en
    el textarea.*/
    var copyButton = document.createElement("button");
    copyButton.className = "copiar";
    copyButton.textContent = "Copiar";
    copyButton.onclick = copyText;
    div.appendChild(copyButton);

    return div;
}

var newContent = createContent();

/*Esta función encripta el valor del texto proporcionado en el Id texto y lo almacena en la clase 
texto_resultado*/
function encryptText() {
    var myAside = document.getElementById('miAside');
    myAside.innerHTML = ''; 
    myAside.appendChild(newContent); 

    var text = document.getElementById("texto").value;

    //modelo de encriptado
    var encryptionMap = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };

    var encryptedText = text.split('').map(function(char) {
        return encryptionMap[char] || char;
    }).join('');

    var resultTextArea = newContent.querySelector('.texto_resultado');
    resultTextArea.value = encryptedText; 
    autoSize.call(resultTextArea); 
}

/*Esta función desencripta el valor del texto proporcionado en el Id texto y lo almacena en la clase 
texto_resultado*/
function decryptText() {
    var myAside = document.getElementById('miAside');
    myAside.innerHTML = ''; 
    myAside.appendChild(newContent); 

    var text = document.getElementById("texto").value;

    //modelo de desencriptado
    var decryptionMap = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };

    var decryptedText = text;
    for (var key in decryptionMap) {
        var regex = new RegExp(key, 'g');
        decryptedText = decryptedText.replace(regex, decryptionMap[key]);
    }

    var resultTextArea = newContent.querySelector('.texto_resultado');
    resultTextArea.value = decryptedText; 
    autoSize.call(resultTextArea); 
}

/*Esta función copia el valor de la clase texto_resultado al portapapeles y da un alert indicando cual fue 
el texto copiado*/
function copyText() {
    var resultTextArea = newContent.querySelector('.texto_resultado');
    resultTextArea.select();
    document.execCommand("copy");
    alert("Texto copiado: " + resultTextArea.value);
    document.getElementById('miAside').innerHTML = originalContent;
}