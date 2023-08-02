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

    canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.width = 300;
    canvas.height = 200;
    canvas.style.left = ((sw/2)-150)+"px";
    canvas.style.top = ((sh/2)-50)+"px";
    canvas.style.width = (300)+"px";
    canvas.style.height = (200)+"px";
    canvas.style.zIndex = "3";
    document.body.appendChild(canvas);

    canvasOut = document.createElement("canvas");
    canvasOut.style.position = "absolute";
    canvasOut.width = 150;
    canvasOut.height = 50;
    canvasOut.style.left = ((sw/2)-50)+"px";
    canvasOut.style.top = ((sh/2)+150)+"px";
    canvasOut.style.width = (150)+"px";
    canvasOut.style.height = (50)+"px";
    canvasOut.style.zIndex = "3";
    canvasOut.onclick = function() {
        grayscaleScenario = !grayscaleScenario;
    };
    document.body.appendChild(canvasOut);

    gamepad = document.createElement("canvas");
    gamepad.style.position = "absolute";
    gamepad.width = 300;
    gamepad.height = 200;
    gamepad.style.left = ((sw/2)-150)+"px";
    gamepad.style.top = ((sh/2)-250)+"px";
    gamepad.style.width = (300)+"px";
    gamepad.style.height = (200)+"px";
    gamepad.style.zIndex = "3";
    document.body.appendChild(gamepad);

    canvasSetup = document.createElement("canvas");
    canvasSetup.style.position = "absolute";
    canvasSetup.width = 28;
    canvasSetup.height = 200;
    canvasSetup.style.left = (0)+"px";
    canvasSetup.style.top = ((sh/2)-50)+"px";
    canvasSetup.style.width = (28)+"px";
    canvasSetup.style.height = (200)+"px";
    canvasSetup.style.zIndex = "3";
    document.body.appendChild(canvasSetup);

    pausedLabel = document.createElement("span");
    pausedLabel.style.position = "absolute";
    pausedLabel.style.display = "none";
    pausedLabel.innerText = "PAUSED";
    pausedLabel.style.color = "#fff";
    pausedLabel.style.fontSize = "25px";
    pausedLabel.style.left = ((sw/2)-100)+"px";
    pausedLabel.style.top = ((sh/2)-50)+"px";
    pausedLabel.style.width = (200)+"px";
    pausedLabel.style.height = (100)+"px";
    pausedLabel.style.zIndex = "5";
    document.body.appendChild(pausedLabel);

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
            say("Gamepad attached.");
        }
        else if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-gamepad-seq") {
            var identifier = msg[3];
            endButtonRequest(identifier);
            buttonSet = JSON.parse(msg[4]);
            gamepadState();
        }
    };

    ws.send("PAPER|"+playerId+"|remote-gamepad-attach");
    throwCircles();
    loadImages(function() {
        gameLoop();
    });
});

var remoteGamepad = false;
var buttonSet = [];
var logInputs = false;

var sprite_idle = [
    "img/boat-sprite-0.png",
    "img/island-sprite.png",
    "img/gamepad-description.png"
];

var last_position = {
    x: 12.5, y: 175
};
var position = {
    x: 12.5, y: 175
};

var direction = 0;
var speed = { x: 0, y: 0, mono: 0 };

var targetNo = 0;
var targets = [
   { x: 0, y: 0, color: "orange" }
];
var target = targets[targetNo];

var loadImages = function(callback) {
    var count = 0;
    for (var n = 0; n < sprite_idle.length; n++) {
        var img = document.createElement("img");
        img.n = n;
        img.onload = function() {
            count += 1;
            sprite_idle[this.n] = this;
            if (count == sprite_idle.length)
            callback();
        };
        var rnd = Math.random();
        img.src = sprite_idle[n]+"?f="+rnd;
    }
};

var weight = 0;
var throwCircles = function() {
    targets = [];
    var qt = 1+Math.floor(Math.random()*5);

    targetNo = Math.floor(Math.random()*qt);

    for (var n = 0; n < qt; n++) {
        var rnd = 100+Math.floor(Math.random()*300);
        var c = { x: 150, y: 100 };
        var p = { x: c.x, y: c.y-rnd };
        var a = Math.floor(Math.random()*360);
        var v = _rotate2d(c, p, a);
        var obj = { x: v.x, y: v.y, color: "rgba(255, 255, 255, 0.5)" };
        targets.push(obj);
    }
    target = targets[targetNo];
};

var frameLine = 0;
var follow = true;

var renderTime = 0;
var logicTime = 0;
var inputTime = 0;

var avgRenderTime = 1000/60;
var avgLogicTime = 1000/30;
var avgInputTime = 1000/30;

var pausePressed = false;
var gamePaused = false;
var grayscaleScenario = false;

var gameLoop = function() {
    if (gamePaused) {
        createButtonRequest();
        requestAnimationFrame(gameLoop);
        return;
    }
    updateRules();

    var co = target.x-position.x;
    var ca = target.y-position.y;
    var angle = _angle2d(co, ca)-((Math.PI*2)/4);

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#16324a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (follow) {
        ctx.translate(-position.x, -position.y);
        ctx.translate(150, 100);
    }
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 3;
    ctx.drawImage(sprite_idle[1], 150-75, 100-68, 150, 138);
    ctx.stroke();

    var imgData = ctx.getImageData(0, 0, 300, 200);
    var pixels = imgData.data;
    for (var n = 0; n < pixels.length; n += 4) {
        var lightness = 
        parseInt((pixels[n] + pixels[n + 1] + pixels[n + 2]) / 3);

        pixels[n] = lightness;
        pixels[n + 1] = lightness;
        pixels[n + 2] = lightness;
    }
    if (grayscaleScenario)
    ctx.putImageData(imgData, 0, 0);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.moveTo(pathL[0].x, pathL[0].y);
    for (var n = 0; n < pathL.length; n++) {
        ctx.lineTo(pathL[n].x, pathL[n].y);
        ctx.moveTo(pathL[n].x, pathL[n].y);
    }
    ctx.stroke();
    ctx.moveTo(pathR[0].x, pathR[0].y);
    for (var n = 0; n < pathR.length; n++) {
        ctx.lineTo(pathR[n].x, pathR[n].y);
        ctx.moveTo(pathR[n].x, pathR[n].y);
    }
    ctx.stroke();

    if (follow) {
        ctx.translate(-150, -100);
        ctx.translate(position.x, position.y);
    }
    ctx.save();
    if (follow) {
        ctx.translate(150, 100);
    }
    else {
        ctx.translate(position.x, position.y);
    }
    ctx.rotate((Math.PI/180)*direction);
    if (follow) {
        ctx.translate(-150, -100);
        ctx.translate(-position.x, -position.y);
        ctx.translate(150, 100);
    }
    else {
        ctx.translate(-position.x, -position.y);
    }

    ctx.drawImage(sprite_idle[0], 
    position.x-12.5, position.y-25, 25, 50);
    ctx.restore();

    if (follow) {
        ctx.translate(-position.x, -position.y);
        ctx.translate(150, 100);
    }
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 3;
    ctx.arc(position.x, position.y, 25, 
    angle-((2*Math.PI)/10), angle+((2*Math.PI)/10));
    ctx.stroke();
    if (follow) {
        ctx.translate(-150, -100);
        ctx.translate(position.x, position.y);
    }

    for (var n = 0; n < targets.length; n++) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 2;
    if (follow) {
        ctx.translate(-150, -100);
        ctx.translate(targets[n].x-position.x, targets[n].y-position.y);
        ctx.translate(150, 100);

        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 128, 0, 0.5)";
        ctx.lineWidth = 3;
        ctx.arc(150, 100, 25, 0, (2*Math.PI));
        ctx.stroke();

        ctx.translate(-150, -100);
        ctx.translate(-(targets[n].x-position.x), -(targets[n].y-position.y));
        ctx.translate(150, 100);
    }
    else {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 128, 0, 0.5)";
        ctx.lineWidth = 3;
        ctx.arc(targets[n].x, targets[n].y, 25, 0, (2*Math.PI));
        ctx.stroke();
    }
    }

    var ctxOut = canvasOut.getContext("2d");
    ctxOut.fillStyle = "#000";
    ctxOut.fillRect(0, 0, 150, 50);
    ctxOut.drawImage(sprite_idle[0], 102.5, 0, 25, 50);

    ctxOut.beginPath();
    ctxOut.strokeStyle = "rgba(255, 255, 0, 0.5)";
    ctxOut.lineWidth = 5;
    var startAngle = -(((Math.PI*2)/3)+((Math.PI*2)/12));
    var endAngle = 
    -(((Math.PI*2)/3)+((Math.PI*2)/12))+(acc*((Math.PI*2)/3))
    ctxOut.arc(25, 25, 15, startAngle, endAngle);
    ctxOut.stroke();
    ctxOut.textAlign = "center";
    ctxOut.fillStyle = "#fff";
    ctxOut.fillText(((100/1)*acc).toFixed(2)+" %", 25, 35);

    ctxOut.beginPath();
    ctxOut.strokeStyle = "rgba(255, 255, 0, 0.5)";
    ctxOut.lineWidth = 5;
    var startAngle = -((Math.PI*2)/12);
    var endAngle = -((Math.PI*2)/12)-(brake*((Math.PI*2)/3));
    ctxOut.arc(75, 25, 15, startAngle, endAngle, true);
    ctxOut.stroke();
    ctxOut.textAlign = "center";
    ctxOut.fillStyle = "#fff";
    ctxOut.fillText(((100/1)*brake).toFixed(2)+" %", 75, 35);

    // draw FPS
    ctx.fillStyle = "#fff";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(fps, 15, 15);

    var relative_position = { ...position };
    relative_position.x -= 150;
    relative_position.y -= 100;
    ctx.fillStyle = "#fff";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText("x: "+relative_position.x.toFixed(2)+" "+
    "y: "+relative_position.y.toFixed(2), 285, 15);
    document.body.appendChild(canvas);

    // actual distance - previous distance
    var relative_speed = 0;
    var last_relative_position = { ...last_position };
    last_relative_position.x -= 150;
    last_relative_position.y -= 100;

    var last_distance = 
    Math.hyp2(last_relative_position.x, last_relative_position.y);
    var distance = 
    Math.hyp2(relative_position.x, relative_position.y);

    relative_speed = (distance - last_distance).toFixed(2);
    ctx.fillStyle = "#fff";
    ctx.font = "15px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(relative_speed+" px/s", 15, 185);
    document.body.appendChild(canvas);

    ctxOut.beginPath();
    ctxOut.fillStyle = "#fff";
    ctxOut.lineWidth = 2;
    var startAngle = 0;
    var endAngle = (Math.PI*2);
    ctxOut.arc(115, 25, 2, startAngle, endAngle);
    ctxOut.fill();
    var dn = Math.normalize(relative_position, -15);
    ctxOut.beginPath();
    ctxOut.strokeStyle = "#fff";
    ctxOut.moveTo(115, 25);
    ctxOut.lineTo(115+dn.x, 25+dn.y);
    ctxOut.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(weight.toFixed(3)+" kg", 15, 155);

    frameLine += (300+200+300+200)/60;
    frameLine = frameLine > (300+200+300+200) ? 0 : frameLine;

    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 5;
    ctx.moveTo(0, 0);
    var topLine = Math.clip((1/300)*frameLine, 1)*300;
    ctx.lineTo(topLine, 0);
    var rightLine = Math.clip((1/200)*(frameLine-300), 1)*200;
    if (rightLine > 0)
    ctx.lineTo(300, rightLine);
    var bottomLine = Math.clip((1/300)*(frameLine-500), 1)*300;
    if (bottomLine > 0)
    ctx.lineTo(300-bottomLine, 200);
    var leftLine = Math.clip((1/200)*(frameLine-800), 1)*200;
    if (leftLine > 0)
    ctx.lineTo(0, 200-leftLine);
    ctx.stroke();

    drawSetup("render");
    requestAnimationFrame(gameLoop);
};

var scale = function(arr, value, borderOut, borderIn) {
    for (var n = 0; n < arr.length; n++) {
        arr[n] -= borderOut;
        arr[n] *= value;
        arr[n] += borderIn;
    };
    return arr;
};

var gamepadState = function() {
    var ctx = gamepad.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 300, 200);
    ctx.drawImage(sprite_idle[2], 25, 21.8, 250, 156.25);

    var r = 250/200;
    var h_line = scale(
       [ 10, 20, 47, 58, 70, 62, 44, 59, 73, 76, 89 ], r, 12.5, 21.8);
    var v_line = scale(
       [ 55, 65, 75, 107, 142, 126, 170, 184, 199, 96, 154 ], r, 25, 25);

    for (var n = 0; n < h_line.length; n++) {
         ctx.beginPath();
         ctx.strokeStyle = "gray";
         ctx.lineWidth = 1;
         ctx.moveTo(0, h_line[n]);
         ctx.lineTo(300, h_line[n]);
         //ctx.stroke();
    }

    for (var n = 0; n < v_line.length; n++) {
         ctx.beginPath();
         ctx.strokeStyle = "darkgray";
         ctx.lineWidth = 1;
         ctx.moveTo(v_line[n], 0);
         ctx.lineTo(v_line[n], 200);
         //ctx.stroke();
    }

    var colors = [
         "blue", "darkorange", "gold", "purple", "limegreen"
    ];

    var ctxSignal = gamepad.getContext("2d");
    ctxSignal.fillStyle = "#000";
    ctxSignal.fillRect(137.5, 0, 25, 45);
    ctxSignal.beginPath();
    ctxSignal.strokeStyle = "purple";
    ctxSignal.lineWidth = 2;
    for (var n = 0; n < ips; n++) {
        ctxSignal.moveTo(139.5, 43-(n*4));
        ctxSignal.lineTo(160.5, 43-(n*4));
        ctxSignal.stroke();
    }

    var objs = readButtons();
    if (objs.length == 0 || objs[0].index != 9) {
        pausePressed = false;
    }

    for (var n = 0; n < objs.length; n++) {
    var button = { x: v_line[9], y: h_line[10] };
    switch (objs[n].index) {
         case 8:
              button = { x: v_line[3], y: h_line[5] };
              break;
         case 9:
              button = { x: v_line[4], y: h_line[5] };
              if (!pausePressed) {
                  pausePressed = true;
                  gamePaused = !gamePaused;
                  if (gamePaused) {
                      pausedLabel.style.display = "initial";
                  }
                  else {
                      pausedLabel.style.display = "none";
                  }
              }
              break;
         case 7:
              button = { x: v_line[7], y: h_line[0] };
              break;
         case 6:
              button = { x: v_line[1], y: h_line[0] };
              break;
         case 4:
              button = { x: v_line[1], y: h_line[1] };
              break;
         case 5:
              button = { x: v_line[7], y: h_line[1] };
              break;
         case 14:
              button = { x: v_line[0], y: h_line[3] };
              break;
         case 12:
              button = { x: v_line[1], y: h_line[2] };
              break;
         case 15:
              button = { x: v_line[2], y: h_line[3] };
              break;
         case 13:
              button = { x: v_line[1], y: h_line[4] };
              break;
         case 2:
              button = { x: v_line[6], y: h_line[7] };
              break;
         case 3:
              button = { x: v_line[7], y: h_line[6] };
              break;
         case 1:
              button = { x: v_line[8], y: h_line[7] };
              break;
         case 0:
              button = { x: v_line[7], y: h_line[8] };
              break;
         case 99:
              button = { x: v_line[9], y: h_line[10] };
              button.x += objs[n].value[0]*5;
              button.y += objs[n].value[1]*5;
              break;
         case 98:
              button = { x: v_line[10], y: h_line[10] };
              button.x += objs[n].value[0]*5;
              button.y += objs[n].value[1]*5;
              break;
    }

    ctx.beginPath();
    ctx.strokeStyle = colors[n];
    ctx.lineWidth = 2;
    ctx.arc(button.x, button.y, 5, 0, (Math.PI*2));
    ctx.stroke();
    }

    drawSetup("input");
};

var readButtons = function() {
    var activeButtons = buttonSet.filter((o) => { 
        return o.pressed;
    });
    var index = activeButtons.length > 0 ?
    activeButtons[0].index : 99;
    var obj = activeButtons.length > 0 ?
    activeButtons[0] : false;
    //rescueButtonFromSet(99);
    return activeButtons;
};

var controlModes = [
    "basic",
    "advanced"
];
var controlMode = "basic";
var frameCount = 0;

var viewToggled = false;

var acc = 0;
var brake = 0;

var pathL = [];
var pathR = [];
var updateRules = function() {
    // 0123456789
    // 9876543210

    var button = rescueButtonFromSet(buttonSet, 98);
    if (button.value != 0) {
        direction += -button.value[0]*5;
        direction = direction < -180 ? 180 : direction;
        direction = direction > 180 ? -180 : direction;
    }

    var button = rescueButtonFromSet(buttonSet, 7);
    acc = button.value;

    var button = rescueButtonFromSet(buttonSet, 6);
    brake = button.value;

    if (controlMode == "basic") {
        speed.mono += (acc/3);
        speed.mono -= (brake/3);
        speed.mono = speed.mono < 0 ? 0 : speed.mono;
        speed.mono = speed.mono > 25 ? 25 : speed.mono;
    }
    else {;
        var hyp = Math.hyp2(update.x, update.y);
        if (hyp > 25) return;

        var hyp = Math.hyp2(speed.x, speed.y);
        var c = { x: 0, y: 0 };
        var p = { x: 0, y: -((acc/5)-(hyp/10)) };
        var v = _rotate2d(c, p, -direction);
        var update = { x: speed.x + v.x, y: speed.y + v.y };
        //var speed = _rotate2d(c, speed, direction);
        speed.mono = 0; //Math.hyp(speed90.x, speed90.y);
    }

    var button = rescueButtonFromSet(buttonSet, 4);
    if (button.value != 0 && !viewToggled) {
        follow = !follow;
        viewToggled = true;
    }
    else if (button.value == 0) {
        viewToggled = false;
    }

    if (controlMode == "basic") {
        var c = position;
        var p = { x: c.x, y: c.y-speed.mono };
        update = _rotate2d(c, p, -direction);
    }
    else {
        update = { x: position.x+speed.x, y: position.y+speed.y };
    }

    var hyp = Math.hyp2(150-update.x, 100-update.y);
    if (hyp < 50) {
        update = position;
        speed.mono = 0;
    }
    else {
        last_position = position;
        position = update;
    }

    var updateL = { x: position.x-5, y: position.y+15 };
    var updateR = { x: position.x+5, y: position.y+15 };
    updateL = _rotate2d(position, updateL, -direction);
    updateR = _rotate2d(position, updateR, -direction);

    updateL.c = { ...update };
    updateR.c = { ...update };
    pathL.push(updateL); //.splice(0, 0, updateL);
    pathR.push(updateR); //.splice(0, 0, updateR);
    //pathL[0].center = update;
    //pathR[0].center = update;

    if (pathL.length > 20) pathL.splice(0, (pathL.length-20));
    //pathL.splice(120, (pathL.length-120));
    if (pathR.length > 20) pathR.splice(0, (pathR.length-20));
    //pathR.splice(120, (pathR.length-120));

    for (var n = ((pathL.length+pathR.length)/2)-1; n >= 0; n--) {
        var aL = -curve(frameCount+(20-n), 8);
        var pL = _rotate2d(pathL[n].c, pathL[n], aL);
        pathL[n].x = pL.x;
        pathL[n].y = pL.y;

        var aR = curve(frameCount+(20-n), 8);
        var pR = _rotate2d(pathR[n].c, pathR[n], aR);
        pathR[n].x = pR.x;
        pathR[n].y = pR.y;
    }
    frameCount += 1;

    var co = target.x-position.x;
    var ca = target.y-position.y;
    var hyp = Math.sqrt(Math.pow(co, 2)+Math.pow(ca,2));

    if (hyp < 10) {
        var rnd = Math.random()*5;
        weight += rnd;
        throwCircles();
    }

    createButtonRequest();
    /*console.log("logic updated: "+
    ((new Date().getTime() - logicTime).toFixed(0))+" ms");*/

    drawSetup("logic");
};

var fps = 60;
var lps = 60;
var ips = 60;

var renderStack = 0;
var logicStack = 0;
var inputStack = 0;

var drawSetup = function(type) {
    var ctxSetup = canvasSetup.getContext("2d");
    ctxSetup.fillStyle = "#000";

    var height = renderStack;

    ctxSetup.beginPath();
    ctxSetup.lineWidth = 2;
    switch (type) {
        case "render":
            renderStack += 1;
            ctxSetup.strokeStyle = "limegreen";
            ctxSetup.moveTo(2, 198-(((renderStack*2)-1)*4));
            ctxSetup.lineTo(23, 198-(((renderStack*2)-1)*4));

            avgRenderTime += (new Date().getTime() - renderTime);
            avgRenderTime /= 2;
            fps = (1000/(avgRenderTime)).toFixed(0);
            renderTime = new Date().getTime();
            break;
        case "logic":
            logicStack += 1;
            ctxSetup.strokeStyle = "blue";
            ctxSetup.moveTo(2, 198-((height*2)*4));
            ctxSetup.lineTo(12, 198-((height*2)*4));

            avgLogicTime += (new Date().getTime() - logicTime);
            avgLogicTime /= 2;
            lps = (1000/(avgLogicTime)).toFixed(0);
            logicTime = new Date().getTime();
            break;
        case "input":
            inputStack += 1;
            ctxSetup.strokeStyle = "red";
            ctxSetup.moveTo(13, 198-((height*2)*4));
            ctxSetup.lineTo(23, 198-((height*2)*4));

            avgInputTime += (new Date().getTime() - inputTime);
            avgInputTime /= 2;
            ips = (1000/(avgInputTime)).toFixed(0);
            inputTime = new Date().getTime();
            break;
    }
    ctxSetup.stroke();

    if (renderStack > 25) { // ((200-4)/4)/2
        ctxSetup.fillStyle = "#000";
        ctxSetup.fillRect(0, 0, 28, 200);
        renderStack = 0;
        logicStack = 0;
        inputStack = 0;
    }

    ctxSetup.fillStyle = "#000";
    ctxSetup.fillRect(23, 0, 25, 200);
    for (var n = 0; n < 50; n++) {
        ctxSetup.beginPath();
        ctxSetup.fillStyle = "#fff";
        ctxSetup.arc(25, 198-(n*4), 1, 0, (Math.PI*2));
        ctxSetup.fill();
    }
};

var requestCount = 0;
var getUniqueIdentifier = function() {
    requestCount += 1;
    var requestIdentifier = 
    "RQ-"+requestCount.toString().padStart(8, "0")+
    "-"+new Date().getTime();
    return requestIdentifier;
};

var buttonRequestBuffer = [];
var createButtonRequest = function(index) {
    if (buttonRequestBuffer.length > 0) return;
    var obj = {
        identifier: getUniqueIdentifier(),
        index: index
    };
    buttonRequestBuffer.push(obj);
    ws.send("PAPER|"+playerId+"|remote-gamepad-get|"+obj.identifier);
};

var endButtonRequest = function(identifier) {
    buttonRequestBuffer =
    buttonRequestBuffer.filter((o) => {
       return o.identifier != identifier;
    });
};

var gps = function() {
    var co = 150-position.x;
    var ca = 100-position.y;
    var hyp = Math.sqrt(Math.pow(co, 2)+Math.pow(ca,2));
};

var say = function(text, afterAudio) {
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

var _angle2d = function(co, ca) {
    /*if (co > ca) {
       var tco = co;
       co = ca;
       ca = tco;
    }*/
    var h = Math.sqrt(
    Math.abs(Math.pow(co, 2)) + 
    Math.abs(Math.pow(ca, 2)));
    var senA = co/h;
    var a = Math.asin(senA);
    a = co == 0 && ca > 0 ? 1.5707963267948966 * 2 : a;
    a = co > 0 && ca > 0 ? 1.5707963267948966 * 2 - a : a;
    a = co < 0 && ca > 0 ? 1.5707963267948966 * 2 - a : a;

    /*console.log("/\/--- ");
    console.log("co: "+co);
    console.log("ca: "+ca);
    console.log("h: "+h);
    console.log("r: "+a);*/

    return isNaN(a) ? 0 : a;
};

var test_angle2d = function(count=8) {
    for (var n = 0; n < count; n++) {
        var c = { x: 0, y: 0 };
        var p = { x: 0, y: -10 };
        var v = _rotate2d(c, p, n*(360/count));

        var a = _angle2d(v.x, v.y);
        var deg = (180/Math.PI)*a;
        console.log(
        "x: "+v.x.toFixed(2)+
        ", y: "+v.y.toFixed(2)+
        ", "+deg.toFixed(2)+"°");
    }
};

Math.hyp = function(co, ca) {
    return Math.sqrt(Math.pow(co, 2)+Math.pow(ca, 2));
};

Math.hyp2 = function(co, ca) {
    co = Math.abs(co);
    ca = Math.abs(ca);
    return Math.sqrt(Math.pow(co, 2)+Math.pow(ca, 2));
};

Math.normalize = function(v, max) {
    var hyp = Math.hyp2(v.x, v.y);
    var r = (1/hyp)*max;
    var copy = { x: v.x, y: v.y };
    copy.x *= r;
    copy.y *= r;
    return copy;
};

Math.random2 = function(local=true) {
    if (local) {
        return Math.random();
    }
    else {
        var req = $.ajax({
            url: "ajax/math-random.php",
            method: "GET"
        });
        $.when(req(), function(req) {
            var data = req[0];
            var result = parseInt(data)/1000;
            return result;
        });
    }
};

Math.clip = function(value, max) {
    if (value > max) value = max;
    if (value < 0) value = 0;
    return value;
};