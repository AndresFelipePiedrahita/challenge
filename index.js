var originalContent = document.getElementById('miAside').innerHTML;

function autoSize() {
    this.style.height = '';
    this.style.height = this.scrollHeight + 'px';
}

function createContent() {
    var div = document.createElement("div");
    div.className = "contenedor_aside_resultado";

    var textArea = document.createElement("textarea");
    textArea.className = "texto_resultado";
    textArea.oninput = autoSize;
    div.appendChild(textArea);

    var copyButton = document.createElement("button");
    copyButton.className = "copiar";
    copyButton.textContent = "Copiar";
    copyButton.onclick = copyText;
    div.appendChild(copyButton);

    return div;
}

var newContent = createContent();

function encryptText() {
    var myAside = document.getElementById('miAside');
    myAside.innerHTML = ''; 
    myAside.appendChild(newContent); 

    var text = document.getElementById("texto").value;

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

function decryptText() {
    var myAside = document.getElementById('miAside');
    myAside.innerHTML = ''; 
    myAside.appendChild(newContent); 

    var text = document.getElementById("texto").value;

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

function copyText() {
    var resultTextArea = newContent.querySelector('.texto_resultado');
    resultTextArea.select();
    document.execCommand("copy");
    alert("Texto copiado: " + resultTextArea.value);
    document.getElementById('miAside').innerHTML = originalContent;
}