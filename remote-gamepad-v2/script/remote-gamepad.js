var audio = new Audio("audio/phone-lock.wav");
var alarm = new Audio("audio/battleship-alarm.wav");
var coin = new Audio("audio/coin.wav");

var sw = window.innerWidth;
var sh = window.innerHeight;

var playerId = new Date().getTime();
var local = false;

// Botão de gravação
$(document).ready(function() {
    $("html, body").css("overscroll-behavior", "none");
    //$("html, body").css("background", "#fff");
    $("#title").css("font-size", "30px");
    $("#title").css("color", "#fff");

    $("#title")[0].innerText = "GAMEPAD";

    image = document.createElement("img");
    image.style.position = "fixed";
    image.style.display = "initial";
    image.style.background = "#000";
    image.style.left = ((sw/2)-150)+"px";
    image.style.top = ((sh/2)-150)+"px";
    image.style.width = (300)+"px";
    image.style.height = (300)+"px";
    image.style.overflowX = "hidden";
    image.style.overflowY = "auto";
    image.style.border = "1px solid #fff";
    image.style.overflow = "hidden";
    image.style.borderRadius = "0%";
    image.style.outline = "none";
    //image.style.transform = "rotateZ(-90deg)";
    //image.style.animationDuration = "1s";
    image.style.zIndex = "3";
    image.src = "img/background.png";
    document.body.appendChild(image);

    label = document.createElement("span");
    label.style.position = "absolute";
    label.innerText = "READY";
    label.style.fontSize = "25px";
    label.style.lineHeight = "25px";
    label.style.color = "#fff";
    label.style.left = ((sw/2)-100)+"px";
    label.style.top = ((sh/2)+225)+"px";
    label.style.width = (200)+"px";
    label.style.height = (25)+"px";
    label.style.zIndex = "3";
    document.body.appendChild(label);

    leftIcon = document.createElement("i");
    leftIcon.style.position = "absolute";
    leftIcon.className = "fa-solid fa-arrow-right";
    leftIcon.style.fontSize = "25px";
    leftIcon.style.lineHeight = "25px";
    leftIcon.style.color = "#fff";
    leftIcon.style.left = ((sw/2)-50)+"px";
    leftIcon.style.top = ((sh/2)+175)+"px";
    leftIcon.style.width = (25)+"px";
    leftIcon.style.height = (25)+"px";
    leftIcon.style.zIndex = "3";
    document.body.appendChild(leftIcon);

    rightIcon = document.createElement("i");
    rightIcon.style.position = "absolute";
    rightIcon.style.display = "none";
    rightIcon.className = "fa-solid fa-arrow-left";
    rightIcon.style.fontSize = "25px";
    rightIcon.style.lineHeight = "25px";
    rightIcon.style.color = "#fff";
    rightIcon.style.left = ((sw/2)+25)+"px";
    rightIcon.style.top = ((sh/2)+175)+"px";
    rightIcon.style.width = (25)+"px";
    rightIcon.style.height = (25)+"px";
    rightIcon.style.zIndex = "3";
    document.body.appendChild(rightIcon);

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-gamepad-attach") {
            ws.send("PAPER|"+playerId+"|remote-gamepad-attached");
            rightIcon.style.display = "initial";
            label.innerText = "RECEIVING INPUT";
        }
    };

    $("*").not("i").css("font-family", "Khand");

    $(".result-icon").css({
        "display": "inline-block",
        "width": "25px",
        "height": "25px"
    });

    gameLoop();
    ws.send("PAPER|"+playerId+"|remote-gamepad-attached");
});

var currentNo = 0;
var last_json = "";
var buttonSet = [];

var gameLoop = function() {
    buttonSet = listGamepadButtons(0, false);
    var leftStick = rescueButtonFromSet(buttonSet, 99);
    var rightStick = rescueButtonFromSet(buttonSet, 98);

    if (leftStick.value[0] == 0 && leftStick.value[1] == 0)
    buttonSet.splice(0, 0, leftStick);
    if (rightStick.value[0] == 0 && rightStick.value[1] == 0)
    buttonSet.splice(1, 0, rightStick);

    var json = JSON.stringify(buttonSet);
    if (buttonSet.length > 0 && json != last_json) {
        ws.send("PAPER|"+playerId+"|remote-gamepad-data|"+currentNo+"|"+json);
        currentNo += 1;
        last_json = json;
    }

    requestAnimationFrame(gameLoop);
};