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
    image.style.transform = "rotateZ(-90deg)";
    //image.style.animationDuration = "1s";
    image.style.zIndex = "3";
    document.body.appendChild(image);

    aimBox = document.createElement("div");
    aimBox.style.position = "fixed";
    aimBox.style.display = "initial";
    aimBox.style.background = "#000";
    aimBox.style.left = ((sw/2)-210)+"px";
    aimBox.style.top = ((sh/2)-150)+"px";
    aimBox.style.width = (50)+"px";
    aimBox.style.height = (50)+"px";
    aimBox.style.overflowX = "hidden";
    aimBox.style.overflowY = "auto";
    aimBox.style.border = "1px solid #fff";
    aimBox.style.overflow = "hidden";
    aimBox.style.borderRadius = "50%";
    aimBox.style.outline = "none";
    aimBox.style.transform = "rotateZ(-90deg)";
    //image.style.animationDuration = "1s";
    aimBox.style.zIndex = "3";
    document.body.appendChild(aimBox);

    aim = document.createElement("i");
    aim.x = (sw/2)-185;
    aim.y = (sh/2)-125;
    aim.style.position = "absolute";
    aim.style.opacity = "0.5";
    aim.className = "fa-solid fa-crosshairs";
    aim.style.fontSize = "20px";
    aim.style.lineHeight = "20px";
    aim.style.color = "#fff";
    aim.style.left = ((sw/2)-195)+"px";
    aim.style.top = ((sh/2)-135)+"px";
    aim.style.width = (20)+"px";
    aim.style.height = (20)+"px";
    aim.style.zIndex = "3";
    document.body.appendChild(aim);

    label = document.createElement("span");
    label.style.position = "absolute";
    label.innerText = "READY";
    label.style.fontSize = "25px";
    label.style.lineHeight = "25px";
    label.style.color = "#fff";
    label.style.left = ((sw/2)-100)+"px";
    label.style.top = ((sh/2)+175)+"px";
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
        else if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-camera-data") {
            image.src = msg[3]
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

var buttonTime = 0
var buttonCount = 0;

var logInputs = false;
var gameLoop = function() {
    var buttonSet = listGamepadButtons();

    if (buttonSet.length > 0) {
        var button = rescueButtonFromSet(buttonSet, 99);
        aim.x += button.value[0]*3;
        aim.y += button.value[1]*3;

        var button = rescueButtonFromSet(buttonSet, 4);
        if (button.value != 0) {
            aim.x = (sw/2)-185;
            aim.y = (sh/2)-125;
        }
        
        var button = rescueButtonFromSet(buttonSet, 2);
        if (button.value != 0 && gamepadList[1]) {
            buttonCount += 1;
            if (buttonCount % 2 == 1) {
                buttonTime = new Date().getTime();
            }
            else {
                var time = new Date().getTime() - buttonTime;
                gamepadList[1].vibrationActuator.playEffect("dual-rumble", {
                    startDelay: 0,
                    duration: time,
                    weakMagnitude: 1.0,
                    strongMagnitude: 1.0,
                });
            }
        }
        
        aim.style.left = ((aim.x)-10)+"px";
        aim.style.top = ((aim.y)-10)+"px";

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