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
    canvas.style.top = ((sh/2)-100)+"px";
    canvas.style.width = (300)+"px";
    canvas.style.height = (200)+"px";
    canvas.style.zIndex = "3";
    document.body.appendChild(canvas);

    canvasOut = document.createElement("canvas");
    canvasOut.style.position = "absolute";
    canvasOut.width = 100;
    canvasOut.height = 50;
    canvasOut.style.left = ((sw/2)-50)+"px";
    canvasOut.style.top = ((sh/2)+100)+"px";
    canvasOut.style.width = (100)+"px";
    canvasOut.style.height = (50)+"px";
    canvasOut.style.zIndex = "3";
    canvasOut.onclick = function() {
        grayscaleScenario = !grayscaleScenario;
    };
    document.body.appendChild(canvasOut);

    canvasSignal = document.createElement("canvas");
    canvasSignal.style.position = "absolute";
    canvasSignal.width = 50;
    canvasSignal.height = 150;
    canvasSignal.style.left = ((sw/2)-150)+"px";
    canvasSignal.style.top = ((sh/2)-250)+"px";
    canvasSignal.style.width = (50)+"px";
    canvasSignal.style.height = (150)+"px";
    canvasSignal.style.zIndex = "3";
    document.body.appendChild(canvasSignal);

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
            //label.innerText = "RECEIVING INPUT";
            say("Gamepad attached.");
        }
        else if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-gamepad-seq") {
            var identifier = msg[3];
            endButtonRequest(identifier);
            buttonSet = JSON.parse(msg[4]);
            //if (buttonSet.length > 0)
            //console.log("gamepad: "+buttonSet[0].value);
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
    "img/island-sprite.png"
];

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

var throwCircles = function() {
    targets = [];
    var rnd = 1+Math.floor(Math.random()*10);

    targetNo = Math.floor(Math.random()*rnd);

    for (var n = 0; n < rnd; n++) {
        var rndX = 25+Math.floor(Math.random()*250);
        var rndY = 25+Math.floor(Math.random()*100);
        var obj = { x: rndX, y: rndY };
        targets.push(obj);
    }
    target = targets[targetNo];
};

var frameLine = 0;
var follow = true;
var renderTime = 0;
var logicTime = 0;

var avgRenderTime = 1000/60;
var avgLogicTime = 1000/30;

var grayscaleScenario = true;

var gameLoop = function() {
    updateRules();

    var co = target.x-position.x;
    var ca = target.y-position.y;
    var angle = _angle2d(co, ca)-((Math.PI*2)/4);

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "darkblue";
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

    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 2;
    if (follow) {
        var c = { x: 150, y: 100 };
        var p = { x: c.x, y:c.y-25 };
        var v0 = _rotate2d(c, p, -direction);
        ctx.moveTo(v0.x, v0.y);

        ctx.translate(-(target.x-150)-position.x, 
        -(target.y-100)-position.y);

        var v1 = { x: target.x-v0.x, y: target.y-v0.y };
        var co = Math.abs(v1.x);
        var ca = Math.abs(v1.y);
        var hyp = Math.hyp(co, ca);
        var r = (1/hyp)*(hyp-25);
        r = r < 0 ? 0 : r;
        ctx.lineTo(v0.x+(v1.x*r), v0.y+(v1.y*r));
        //ctx.stroke();
    }
    else {
        var c = { x: position.x, y: position.y };
        var p = { x: c.x, y: c.y-25 };
        var v0 = _rotate2d(c, p, -direction);
        ctx.moveTo(v0.x, v0.y);

        var v1 = { x: target.x-v0.x, y: target.y-v0.y };
        var co = Math.abs(v1.x);
        var ca = Math.abs(v1.y);
        var hyp = Math.hyp(co, ca);
        var r = (1/hyp)*(hyp-25);
        r = r < 0 ? 0 : r;
        ctx.lineTo(v0.x+(v1.x*r), v0.y+(v1.y*r));
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 128, 0, 0.5)";
    ctx.lineWidth = 3;
    ctx.arc(target.x, target.y, 25, 0, (2*Math.PI));
    ctx.stroke();

    if (follow) {
        ctx.translate(-(-(target.x-150)-position.x), 
        -(-(target.y-100)-position.y));
    }

    var ctxOut = canvasOut.getContext("2d");
    ctxOut.fillStyle = "#000";
    ctxOut.fillRect(0, 0, 100, 50);
    ctxOut.drawImage(sprite_idle[0], 62.5, 0, 25, 50);
    ctxOut.beginPath();
    ctxOut.strokeStyle = "rgba(255, 255, 0, 0.5)";
    ctxOut.lineWidth = 5;
    ctxOut.arc(25, 25, 15, -((Math.PI*2)/3)-((Math.PI*2)/6), 
    -((Math.PI*2)/3)+(beschleuniger*((Math.PI*2)/3)));
    ctxOut.stroke();
    ctxOut.textAlign = "center";
    ctxOut.fillStyle = "#fff";
    ctxOut.fillText(((100/1)*beschleuniger).toFixed(2)+" %", 25, 35);

    // limit fps
    avgRenderTime += (new Date().getTime() - renderTime);
    avgRenderTime /= 2;
    var fps = (1000/(avgRenderTime)).toFixed(0);
    ctx.fillStyle = "#fff";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(fps, 15, 15);

    avgLogicTime += (new Date().getTime() - logicTime);
    avgLogicTime /= 2;
    var lps = (1000/(avgLogicTime)).toFixed(0);
    ctx.fillStyle = "#fff";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(lps, 50, 15);

    var ctxSignal = canvasSignal.getContext("2d");
    ctxSignal.fillStyle = "#000";
    ctxSignal.fillRect(0, 0, 50, 150);
    ctxSignal.beginPath();
    ctxSignal.strokeStyle = "lightblue";
    ctxSignal.lineWidth = 2;
    for (var n = 0; n < fps; n++) {
        ctxSignal.moveTo(2, 148-(n*4));
        ctxSignal.lineTo(24, 148-(n*4));
        ctxSignal.stroke();
    }
    ctxSignal.beginPath();
    ctxSignal.strokeStyle = "purple";
    for (var n = 0; n < lps; n++) {
        ctxSignal.moveTo(27, 148-(n*4));
        ctxSignal.lineTo(48, 148-(n*4));
        ctxSignal.stroke();
    }

    ctx.fillStyle = "#fff";
    ctx.font = "15px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(speed.x.toFixed(2)+" "+
    speed.y.toFixed(2)+
    " px/s", 15, 185);
    document.body.appendChild(canvas);

    var weight = 10;
    ctx.fillStyle = "#fff";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(weight+" kg", 15, 155);

    ctx.fillStyle = "#fff";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(((180/Math.PI)*angle).toFixed(2)+" °", 285, 185);
    document.body.appendChild(canvas);

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
    //console.log(topLine, rightLine, bottomLine, leftLine);
    ctx.stroke();

    buttonSet = [];
    renderTime = new Date().getTime();
    requestAnimationFrame(gameLoop);
};

var controlModes = [
    "basic",
    "advanced"
];
var controlMode = "basic";

var beschleuniger = 0;
var vibrateTime = 0;
var pathL = [];
var pathR = [];
var updateRules = function() {
    if (buttonRequestBuffer.length > 0 ||
        (1000/(new Date().getTime() - logicTime)) > 30) {
        return;
    }
    // 0123456789
    // 9876543210

    var button = rescueButtonFromSet(buttonSet, 98);
    if (button.value != 0) {
        direction += -button.value[0]*5;
        direction = direction < -180 ? 180 : direction;
        direction = direction > 180 ? -180 : direction;
    }

    var button = rescueButtonFromSet(buttonSet, 7);
    beschleuniger = button.value;

    if (controlMode == "basic") {
        if (speed.mono > 25) return;
        speed.mono += (button.value/3);
    }
    else {;
        var hyp = Math.hyp2(update.x, update.y);
        if (hyp > 25) return;

        var hyp = Math.hyp2(speed.x, speed.y);
        var c = { x: 0, y: 0 };
        var p = { x: 0, y: -((beschleuniger/5)-(hyp/10)) };
        var v = _rotate2d(c, p, -direction);
        var update = { x: speed.x + v.x, y: speed.y + v.y };
        //var speed = _rotate2d(c, speed, direction);
        speed.mono = 0; //Math.hyp(speed90.x, speed90.y);
    }

    var button = rescueButtonFromSet(buttonSet, 4);
    if (button.value != 0) {
        follow = !follow;
    }

    if (controlMode == "basic") {
        var c = position;
        var p = { x: c.x, y: c.y-speed.mono };
        update = _rotate2d(c, p, -direction);
    }
    else {
        update = { x: position.x+speed.x, y: position.y+speed.y };
    }
    if (!follow) {
        if (update.x < 25) update.x = 25;
        if (update.y < 25) update.y = 25;
        if (update.x > 275) update.x = 275;
        if (update.y > 175) update.y = 175;
    }

    var hyp = Math.hyp2(150-update.x, 100-update.y);
    if (hyp < 50) {
        update = position;
    }
    else {
        position = update;
    }

    var updateL = { x: position.x-5, y: position.y+15 };
    var updateR = { x: position.x+5, y: position.y+15 };
    updateL = _rotate2d(position, updateL, -direction);
    updateR = _rotate2d(position, updateR, -direction);

    pathL.push(updateL); //.splice(0, 0, updateL);
    pathR.push(updateR); //.splice(0, 0, updateR);
    pathL[0].center = update;
    pathR[0].center = update;

    if (pathL.length > 120) pathL.splice(0, (pathL.length-120));
    //pathL.splice(120, (pathL.length-120));
    if (pathR.length > 120) pathR.splice(0, (pathR.length-120));
    //pathR.splice(120, (pathR.length-120));

    for (var n = ((pathL.length+pathR.length)/2)-1; n < 0; n++) {
        var aL = 90;
        var pL = _rotate2d(pathL[n].center, pathL[n], aL);
        pathL[n].x = pL.x;
        pathL[n].y = pL.y;

        var aR = -90;
        var pR = _rotate2d(pathR[n].center, pathR[n], aR);
        pathR[n].x = pR.x;
        pathR[n].y = pR.y;
    }

    var co = target.x-position.x;
    var ca = target.y-position.y;
    var hyp = Math.sqrt(Math.pow(co, 2)+Math.pow(ca,2));

    if (hyp < 10) throwCircles();
    buttonSet = [];

    createButtonRequest();
    logicTime = new Date().getTime();
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