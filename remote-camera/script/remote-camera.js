var audio = new Audio("audio/phone-lock.wav");
var alarm = new Audio("audio/battleship-alarm.wav");
var coin = new Audio("audio/coin.wav");

var sw = window.innerWidth;
var sh = window.innerHeight;

var playerId = new Date().getTime();

// Botão de gravação
$(document).ready(function() {
    $("html, body").css("overscroll-behavior", "none");
    //$("html, body").css("background", "#fff");
    $("#title").css("font-size", "30px");
    $("#title").css("color", "#fff");

    $("#title")[0].innerText = "GENIUS-111";

    camera = document.createElement("video");
    camera.style.position = "fixed";
    camera.style.display = "initial";
    camera.style.objectFit = "cover";
    camera.autoplay = true;
    camera.width = (150);
    camera.height = (150);
    camera.style.background = "#000";
    camera.style.fontFamily = "Khand";
    //camera.style.display = "flex";
    camera.style.flexDirection = "column";
    camera.style.textAlign = "center";
    camera.style.color = "#fff";
    camera.style.fontSize = "20px";
    camera.style.lineHeight = "50px";
    camera.style.left = ((sw/2))+"px";
    camera.style.top = ((sh/2)-150)+"px";
    camera.style.width = (150)+"px";
    camera.style.height = (150)+"px";
    camera.style.overflowX = "hidden";
    camera.style.overflowY = "auto";
    camera.style.border = "1px solid #fff";
    camera.style.borderRadius = "0%";
    camera.style.outline = "none";
    //camera.style.transform = "rotateZ(-90deg)";
    //camera.style.animationDuration = "1s";
    camera.style.zIndex = "3";
    document.body.appendChild(camera);

    image = document.createElement("img");
    image.style.position = "fixed";
    image.style.display = "initial";
    image.style.background = "#000";
    image.style.left = ((sw/2)-150)+"px";
    image.style.top = ((sh/2)-150)+"px";
    image.style.width = (150)+"px";
    image.style.height = (150)+"px";
    image.style.overflowX = "hidden";
    image.style.overflowY = "auto";
    image.style.border = "1px solid #fff";
    image.style.borderRadius = "0%";
    image.style.outline = "none";
    //image.style.transform = "rotateZ(-90deg)";
    //image.style.animationDuration = "1s";
    image.style.zIndex = "3";
    document.body.appendChild(image);

    position = {
        x: ((sw/2)),
        y: ((sh/2)+125)
    };
    ouija = document.createElement("span");
    ouija.style.position = "absolute";
    ouija.innerText = "";
    ouija.style.fontSize = "50px";
    ouija.style.lineHeight = "50px";
    ouija.style.color = "limegreen";
    ouija.style.left = ((sw/2)-150)+"px";
    ouija.style.top = ((sh/2)+100)+"px";
    ouija.style.width = (300)+"px";
    ouija.style.height = (50)+"px";
    ouija.style.zIndex = "3";
    document.body.appendChild(ouija);

    label = document.createElement("span");
    label.style.position = "absolute";
    label.innerText = "START";
    label.style.fontSize = "25px";
    label.style.lineHeight = "25px";
    label.style.color = "#fff";
    label.style.left = ((sw/2)-100)+"px";
    label.style.top = ((sh/2)+150)+"px";
    label.style.width = (200)+"px";
    label.style.height = (25)+"px";
    label.style.zIndex = "3";
    label.onclick = function() {
        if (!camera.srcObject) {
            startCamera();
            camera.onplay = function() {
                label.innerText = "READY";
                say("Camera loaded.");
            }
        }
        else {
            stopCamera();
            say("Camera unloaded.");
        }
    };
    document.body.appendChild(label);

    $("*").not("i").css("font-family", "Khand");

    $(".result-icon").css({
        "display": "inline-block",
        "width": "25px",
        "height": "25px"
    });

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-gamepad-attached") {
            remoteGamepad = true;
            label.innerText = "RECEIVING INPUT";
            say("Gamepad attached.");
        }
        else if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-gamepad") {
            buttonSet = JSON.parse(msg[3]);
        }
    }

    ws.send("PAPER|"+playerId+"|remote-gamepad-attach");

    canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.width = 50;
    canvas.height = 50;
    canvas.style.left = "0px";
    canvas.style.top = "0px";

    gameLoop();
});

var remoteGamepad = false;
var buttonSet = [];
var logInputs = false;

var bgmNo = 0;
var antVoice = false;

var UrlExists = function(url) {
    try {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
    }
    catch (ex) {
        return false;
    }
}

/*
    var leftStick = rescueButtonFromSet(buttonSet, 99);

    icon.style.left = ((sw/2)-25)+"px";
    icon.style.top = ((sh/2)-25)+"px";
*/

var speakMode = 0;
var alphabet = "-abcdefghijklmnopqrstuvwxyz? ";
var numbers = "0123456789";

var getSpelling = function() {
    var text = currentText.join(", ");
    text = text.replace(", ,", ",space,");
    return text;
};

var controlMode = 0;
var currentIndex = 0;
var cursorPosition = 0;
var currentText = [ "-" ];

var startTime = 0;
var buttonTime = 0;
var buttonTimeout = 0;
var buttonSequence = [];

var gameLoop = function() {
    for (var n = 0; n < buttonSet.length; n++) {
        //console.log("debug: "+buttonSet[n].index+" pressed");
    }

    var fps = (1000/(new Date().getTime() - startTime)).toFixed(0);
    startTime = new Date().getTime();

    var rightStick = rescueButtonFromSet(buttonSet, 98);
    if (rightStick.pressed) {
        var speedX = (parseFloatEx(rightStick.value[0], 2)*5);
        var speedY = (parseFloatEx(rightStick.value[1], 2)*5);

        position.x += speedX;
        position.y += speedY;

        ouija.style.left = ((position.x-150).toFixed(2))+"px";
        ouija.style.top = ((position.y-25).toFixed(2))+"px";
    }

    if (rescueButtonFromSet(buttonSet, 8).value != 0) {
        controlMode += 1;
        controlMode = controlMode > 1 ? 0 : controlMode;
        say(controlMode == 0 ? "text mode" : "image mode");
    }
    if (controlMode == 0) textInputControl();
    else cameraControl();

    // limit fps
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(fps, 25, 25);
    document.body.appendChild(canvas);

    buttonSet = [];
    requestAnimationFrame(gameLoop);
};

var parseFloatEx = function(num, decimalPlaces) {
    return parseFloat(num.toFixed(decimalPlaces));
};

var buttonCount = 0;
var textInputControl = function() {
    if (rescueButtonFromSet(buttonSet, 14).value != 0) {
        cursorPosition -= 1;
        var erased = false;
        if (cursorPosition < 0) {
            currentText = [ "-" ];
            ouija.innerText = currentText.join("").toUpperCase();
            //say("");
            erased = true;
        }
        cursorPosition = cursorPosition < 0 ? 0 : cursorPosition;
        currentIndex = alphabet.indexOf(currentText[cursorPosition]);
    }
    if (rescueButtonFromSet(buttonSet, 15).value != 0) {
        cursorPosition += 1;
        cursorPosition = cursorPosition > (currentText.length) ?
        (currentText.length) : cursorPosition;
        if (cursorPosition > (currentText.length-1)) {
            currentText.push(alphabet[currentIndex]);
        }
        //currentIndex = alphabet.indexOf(currentText[cursorPosition]);
        ouija.innerText = currentText.join("").toUpperCase();
    }
    if (rescueButtonFromSet(buttonSet, 12).value != 0) {
        currentIndex += 1;
        currentIndex = currentIndex > (alphabet.length-1) ?
        (alphabet.length-1) : currentIndex;
        currentText[cursorPosition] = alphabet[currentIndex];
        ouija.innerText = currentText.join("").toUpperCase();
    }
    if (rescueButtonFromSet(buttonSet, 13).value != 0) {
        currentIndex -= 1;
        var removed = false;
        if (currentIndex < 0) {
            currentText.splice(cursorPosition, 1);
            removed = true;
        }
        currentIndex = currentIndex < 0 ? 0 : currentIndex;
        if (!removed)
        currentText[cursorPosition] = alphabet[currentIndex];
        ouija.innerText = currentText.join("").toUpperCase();
    }
    if (rescueButtonFromSet(buttonSet, 4).value != 0) {
        if (new Date().getTime() - buttonTime < 1000) {
            clearTimeout(buttonTimeout);

            if (speakMode == 0) say(ouija.innerText);
            else say(getSpelling());

            buttonTime = new Date().getTime();
        }
        else {
            buttonTimeout = setTimeout(function() {
                speakMode += 1;
                speakMode = speakMode > 1 ? 0 : speakMode;
                say(speakMode == 0 ? "normal mode" : "spelling mode");
            }, 1000);
            buttonTime = new Date().getTime();
        }
    }
    if (rescueButtonFromSet(buttonSet, 3).value != 0) {
        var vocals = "aeiou";
        var vocalIndex = 0;
        var resultIndex = currentIndex;
        for (var n = 0; n < vocals.length; n++) {
            vocalIndex = alphabet.indexOf(vocals[n]);
            if (currentIndex < vocalIndex) {
                resultIndex = vocalIndex;
                break;
            }
        }
        if (resultIndex <= currentIndex)
        resultIndex = 1;
        currentIndex = resultIndex;
        currentText[cursorPosition] = alphabet[currentIndex];
        ouija.innerText = currentText.join("").toUpperCase();
    }
    if (rescueButtonFromSet(buttonSet, 1).value != 0) {
        var vocals = "bgnt";
        var vocalIndex = 0;
        var resultIndex = currentIndex;
        for (var n = 0; n < vocals.length; n++) {
            vocalIndex = alphabet.indexOf(vocals[n]);
            if (currentIndex < vocalIndex) {
                resultIndex = vocalIndex;
                break;
            }
        }
        if (resultIndex <= currentIndex)
        resultIndex = 28;
        currentIndex = resultIndex;
        currentText[cursorPosition] = alphabet[currentIndex];
        ouija.innerText = currentText.join("").toUpperCase();
    }
    if (rescueButtonFromSet(buttonSet, 2).value != 0) {
        buttonCount += 1;
        if (buttonCount % 2 == 1) {
            buttonTime = new Date().getTime();
        }
        else {
            var time = new Date().getTime() - buttonTime;
            navigator.vibrate(time);
        }
    }
};

var cameraControl = function() {
    if (buttonSet.length > 0)
    buttonSequence.push(buttonSet[0]);

    if (rescueButtonFromSet(buttonSequence[0], 4).value =! 0)
    if (rescueButtonFromSet(buttonSequence[1], 4).value =! 0)
    deviceNo = deviceNo == 0 ? (deviceNo+1) : (deviceNo-1);
    else
    buttonSequence = [];

    if (rescueButtonFromSet(buttonSet, 5).value != 0) {
        say("Timer of 15 seconds set.", function() {
            setTimeout(function() {
                say("Picture selected.");
                render();
            }, 15000);
        });
    }
    if (rescueButtonFromSet(buttonSet, 3).value != 0) {
        say("Picture released.");
        render("black");
    }
    if (rescueButtonFromSet(buttonSet, 2).value != 0) {
        say("Picture selected.");
        render();
    }
    if (rescueButtonFromSet(buttonSet, 1).value != 0) {
        label.click();
    }
};

var render = function(mode="camera") {
    var canvas = document.createElement("canvas");
    canvas.width = (camera.width*2);
    canvas.height = (camera.height*2);

    var ctx = canvas.getContext("2d");
    var img = {
        width: vw,
        height: vh
    };
    var frame = {
        width: canvas.width,
        height: canvas.height
    };
    var format = fitImageCover(img, frame);
    //console.log(format);

    if (mode == "camera") {
        ctx.drawImage(camera, format.left, format.top, 
        format.width, format.height);
    }
    else {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    image.src = canvas.toDataURL();

    ws.send("PAPER|"+playerId+"|remote-camera-data|"+
    canvas.toDataURL());
};

var say = function(text, afterAudio) {;
    console.log("debug: "+text);

    lastText = text;
    var msg = new SpeechSynthesisUtterance();
    msg.pitch = 1;
    msg.lang = "en-US";
    //msg.lang = "ru-RU";
    //msg.lang = "pt-BR";
    msg.text = text;
    msg.onend = function(event) {
         if (afterAudio) afterAudio();
    };
    window.speechSynthesis.speak(msg);
}