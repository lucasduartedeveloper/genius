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

    label = document.createElement("span");
    label.style.position = "absolute";
    label.innerText = "READY";
    label.style.fontSize = "25px";
    label.style.lineHeight = "25px";
    label.style.color = "#fff";
    label.style.left = ((sw/2)-100)+"px";
    label.style.top = ((sh/2)-12.5)+"px";
    label.style.width = (200)+"px";
    label.style.height = (25)+"px";
    label.style.zIndex = "3";
    document.body.appendChild(label);

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-gamepad-attach") {
            ws.send("PAPER|"+playerId+"|remote-gamepad-attached");
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
});

var logInputs = false;
var gameLoop = function() {
    var buttonSet = listGamepadButtons();

    if (buttonSet.length > 0) {
        if (logInputs) {
            console.clear();
            for (var n = 0; n < buttonSet.length; n++) {
                console.log("button "+buttonSet[n].index+" pressed");
            }
        }

        ws.send("PAPER|"+playerId+"|remote-gamepad|"+
        JSON.stringify(buttonSet));
    }

    requestAnimationFrame(gameLoop);
};