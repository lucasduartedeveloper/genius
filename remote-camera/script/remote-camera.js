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

    var names = [
        "gorila",
        "giraffe",
        "panda",
        "praying mantis",
        "bee",
        "hipopotammus",
        "wolf",
        "naja"
    ];

    iconNo = 0;
    icons = [];
    for (var n = 0; n < 8; n++) {
        var rnd = Math.random();
        icon = document.createElement("img");
        icon.no = n;
        icon.name = names[n];
        var c = {
            x: (sw/2),
            y: (sh/2)
        };
        var p = {
            x: (sw/2),
            y: (sh/2)-((sw/2)-50)
        };
        var a = n*(360/8);
        icon.position = _rotate2d(c, p, -a);
        icon.style.position = "fixed";
        icon.src = "img/icon_0"+n+".png?f="+rnd;
        icon.style.display = "initial";
        icon.style.background = "orange";
        icon.style.left = ((icon.position.x-25).toFixed(2))+"px";
        icon.style.top = ((icon.position.y-25).toFixed(2))+"px";
        icon.style.width = (50)+"px";
        icon.style.height = (50)+"px";
        icon.style.overflowX = "hidden";
        icon.style.overflowY = "auto";
        //icon.style.border = "1px solid #fff";
        icon.style.borderRadius = "50%";
        icon.style.outline = "none";
        //image.style.transform = "rotateZ(-90deg)";
        //image.style.animationDuration = "1s";
        icon.style.zIndex = "3";
        document.body.appendChild(icon);

        icons.push(icon);
    }

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

var startTime = 0;
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

        icons[iconNo].position.x += speedX;
        icons[iconNo].position.y += speedY;

        /*
        console.log(speedX);
        console.log(speedY);

        console.log(icon.x);
        console.log(icon.y);
        */

        icons[iconNo].style.left = 
        ((icons[iconNo].position.x-25).toFixed(2))+"px";
        icons[iconNo].style.top = 
        ((icons[iconNo].position.y-25).toFixed(2))+"px";
    }

    if (rescueButtonFromSet(buttonSet, 14).value != 0) {
        iconNo -= 1;
        iconNo = iconNo < 0 ? 7 : iconNo;
        for (var n = 0; n < 8; n++) {
            icons[n].style.border = "0px solid #fff";
            icons[n].style.zIndex = "3";
        }
        icons[iconNo].style.border = "2px solid #fff";
        icons[iconNo].style.zIndex = "5";
    }
    if (rescueButtonFromSet(buttonSet, 15).value != 0) {
        iconNo += 1;
        iconNo = iconNo > 7 ? 0 : iconNo;
        for (var n = 0; n < 8; n++) {
            icons[n].style.border = "0px solid #fff";
            icons[n].style.zIndex = "3";
        }
        icons[iconNo].style.border = "2px solid #fff";
        icons[iconNo].style.zIndex = "5";
    }
    if (rescueButtonFromSet(buttonSet, 12).value != 0) {
        var closest = getClosestCircle();
        iconNo = closest.no;
        for (var n = 0; n < 8; n++) {
            icons[n].style.border = "0px solid #fff";
            icons[n].style.zIndex = "3";
        }
        icons[iconNo].style.border = "2px solid #fff";
        icons[iconNo].style.zIndex = "5";
    }
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

var getClosestCircle = function() {
    var currentCircle = icons[iconNo];
    var otherCircles = 
    icons.filter((o) => { return o.no != iconNo });

    var closestCircle = otherCircles[0];

    var co = Math.abs(currentCircle.position.x-
    closestCircle.position.x);
    var ca = Math.abs(currentCircle.position.y-
    closestCircle.position.y);
    var distance = Math.sqrt(
    Math.pow(co, 2) + Math.pow(ca, 2));

    /*
    console.log(currentCircle.name + " to " + 
    closestCircle.name + ": " + 
    co + " " + ca + " " + distance);
    */
    
    for (var n = 1; n < otherCircles.length; n++) {
        var co = Math.abs(currentCircle.position.x-
        otherCircles[n].position.x);
        var ca = Math.abs(currentCircle.position.y-
        otherCircles[n].position.y);
        var currentDistance = Math.sqrt(
        Math.pow(co, 2) + Math.pow(ca, 2));

        /*
        console.log(currentCircle.name + " to " + 
        otherCircles[n].name + ": " + 
        co + " " + ca + " " + currentDistance);
        */

        if (currentDistance < distance) {
            closestCircle = otherCircles[n];
            distance = currentDistance;

            /*
            console.log(currentCircle.name + " to " + 
            otherCircles[n].name + ": " + 
            co + " " + ca + " " + currentDistance);
            */
        }
    };

    return closestCircle;
};

var parseFloatEx = function(num, decimalPlaces) {
    return parseFloat(num.toFixed(decimalPlaces));
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
    msg.lang = "en-US";
    //msg.lang = "ru-RU";
    //msg.lang = "pt-BR";
    msg.text = text;
    msg.onend = function(event) {
         if (afterAudio) afterAudio();
    };
    window.speechSynthesis.speak(msg);
}