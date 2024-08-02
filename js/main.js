function validation(text) {
    const pattern = new RegExp("^[a-z0-9 ]+$");

    const warningText = document.getElementById('warningText');

    if(text == "") {
        warningText.style.color="#495057";
        return false
    }
    else if (!pattern.test(text)) {
        console.log('No se permiten letras mayusculas')
        warningText.style.color="red";
        return false
    }
    else{
        warningText.style.color="#495057";
        return true
    }
}

function encryptWarning() {
    let messageWarning = document.getElementById("message");
    messageWarning.className = "main__message";
    messageWarning.innerHTML = `
    <img
    src="./assets/muñecoMensaje.png"
    alt="muñeco buscando el texto"
    class="message__img"
    />
    
    <p class="message__warning">Ningún mensaje fue encontrado</p>
    
    <p class="message__info">Ingrese el texto que desees encriptar o desencriptar</p>
    `;
}

function replaceLetters(textToEncrypt, letter, replacement) {
    if (textToEncrypt.includes(letter)) {
        return textToEncrypt.replaceAll(letter, replacement);
    } else {
        return textToEncrypt;
    }
}

function encryptSuccess(textToEncrypt) {
    textToEncrypt = replaceLetters(textToEncrypt, "i", "imes");
    textToEncrypt = replaceLetters(textToEncrypt, "e", "enter");
    textToEncrypt = replaceLetters(textToEncrypt, "a", "ai");
    textToEncrypt = replaceLetters(textToEncrypt, "o", "ober");
    textToEncrypt = replaceLetters(textToEncrypt, "u", "ufat");

    let messageEncrypted = document.getElementById("message");

    messageEncrypted.className = "main__message main__message-encrypted";
    messageEncrypted.innerHTML = `<textarea class="message__textEncrypted" id="messageEncrypted" readonly>${textToEncrypt}</textarea>
    
    <button class="button" onclick='copyText()'>Copiar texto</button>
    `;
}

function encrypt() {
    let textToEncrypt = document.getElementById("messageToEncrypt").value;

    const isValid = validation(textToEncrypt);

    if (isValid == false) {
        encryptWarning();
    } else {
        encryptSuccess(textToEncrypt);
    }
}

function decryptSuccess(textToDecrypt) {
    while (
        textToDecrypt.includes("imes") ||
        textToDecrypt.includes("enter") ||
        textToDecrypt.includes("ai") ||
        textToDecrypt.includes("ober") ||
        textToDecrypt.includes("ufat")
    ) {
        textToDecrypt = replaceLetters(textToDecrypt, "imes", "i");

        textToDecrypt = replaceLetters(textToDecrypt, "enter", "e");

        textToDecrypt = replaceLetters(textToDecrypt, "ai", "a");

        textToDecrypt = replaceLetters(textToDecrypt, "ober", "o");

        textToDecrypt = replaceLetters(textToDecrypt, "ufat", "u");
    }

    let messageEncrypted = document.getElementById("message");

    messageEncrypted.className = "main__message main__message-encrypted";
    messageEncrypted.innerHTML = `<p class="message__textEncrypted" id="messageEncrypted">${textToDecrypt}</p>
    
    <button class="button" onclick='copyText()'>Copiar texto</button>
    `;
}

function decrypt() {
    let textToDecrypt = document.getElementById("messageToEncrypt").value;

    if (textToDecrypt == "") {
        encryptWarning();
    } else {
        decryptSuccess(textToDecrypt);
    }
}

function copyText() {
    let copy = document.getElementById("messageEncrypted").textContent;

    navigator.clipboard
        .writeText(copy)
        .then(() => {
            alert("Texto copiado al portapapeles");
        })
        .catch((err) => {
            console.error("Error al copiar al portapapeles:", err);
        });
}
