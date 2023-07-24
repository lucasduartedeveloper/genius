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

    var icons = [
        { name: "", color: "",
        children: [
            { name: "", color: "",
            children: [
                { name: "", color: "",
                children: [
                    { name: "", color: "",
                    children: [
                        
                    ]},
                    { name: "", color: "",
                    children: [
                        
                    ]}
                 ]}
            ]},
            { name: "", color: "",
            children: [
                { name: "", color: "",
                children: [
                    { name: "", color: "",
                    children: [
                        
                    ]},
                    { name: "", color: "",
                    children: [
                        
                    ]}
                 ]}
            ]}
        ]},
    ];

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

var startTime = 0;
var gameLoop = function() {

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

var render = function(mode="camera") {
    var canvas = document.createElement("canvas");
    canvas.width = (camera.width*2);
    canvas.height = (camera.height*2);

    var ctx = canvas.getContext("2d");

    image.src = canvas.toDataURL();

    ws.send("PAPER|"+playerId+"|remote-camera-data|"+
    canvas.toDataURL());
};

var say = function(text, afterAudio) {;
    console.log("debug: "+text);

    lastText = text;
    var msg = new SpeechSynthesisUtterance();
    msg.lang = "en-US";
    //msg.lang = "ru-RU";
    //msg.lang = "pt-BR";
    msg.text = text;
    msg.onend = function(event) {
         if (afterAudio) afterAudio();
    };
    window.speechSynthesis.speak(msg);
}