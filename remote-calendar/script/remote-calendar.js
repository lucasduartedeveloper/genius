var audio = new Audio("audio/phone-lock.wav");
var alarm = new Audio("audio/battleship-alarm.wav");
var coin = new Audio("audio/coin.wav");

var sw = window.innerWidth;
var sh = window.innerHeight;

var audioBot = false;
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
    canvas.height = 300;
    canvas.style.left = ((sw/2)-150)+"px";
    canvas.style.top = ((sh/2)-70)+"px";
    canvas.style.width = (300)+"px";
    canvas.style.height = (300)+"px";
    canvas.style.transform = "scale(0.8)";
    canvas.style.zIndex = "5";
    document.body.appendChild(canvas);

    iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.left = ((sw/2)-150)+"px";
    iframe.style.top = ((sh/2)-50)+"px";
    iframe.style.width = (300)+"px";
    iframe.style.height = (200)+"px";
    iframe.style.zIndex = "3";
    iframe.src = "html5/geomdash/";
    //document.body.appendChild(iframe);

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

    frameSkipLabel = document.createElement("span");
    frameSkipLabel.style.position = "absolute";
    frameSkipLabel.innerText = "frameskip: 0x";
    frameSkipLabel.style.color = "#fff";
    frameSkipLabel.style.fontSize = "20px";
    frameSkipLabel.style.lineHeight = "20px";
    frameSkipLabel.style.left = ((sw/2)-50)+"px";
    frameSkipLabel.style.top = ((sh/2)+150)+"px";
    frameSkipLabel.style.width = (100)+"px";
    frameSkipLabel.style.height = (25)+"px";
    frameSkipLabel.style.zIndex = "3";
    frameSkipLabel.onclick = function() {
        frameSkip = (frameSkip+1) < 10 ? (frameSkip+1) : 0;
        frameSkipLabel.innerText = "frameskip: "+frameSkip+"x";
    };
    document.body.appendChild(frameSkipLabel);

    fileButton = document.createElement("span");
    fileButton.style.position = "absolute";
    fileButton.style.color = "#fff";
    fileButton.innerText = "";
    fileButton.style.fontSize = "20px";
    fileButton.style.lineHeight = "20px";
    fileButton.style.left = ((sw/2)-50)+"px";
    fileButton.style.top = ((sh/2)-100)+"px";
    fileButton.style.width = (100)+"px";
    fileButton.style.height = (25)+"px";
    fileButton.style.zIndex = "3";
    fileButton.pointerDownTime = 0;
    document.body.appendChild(fileButton);

    topLayer = document.createElement("div");
    topLayer.style.position = "absolute";
    topLayer.style.backgroundColor = "black";
    topLayer.style.left = (0)+"px";
    topLayer.style.top = (0)+"px";
    topLayer.style.width = (sw)+"px";
    topLayer.style.height = (sh)+"px";
    topLayer.style.zIndex = "3";
    document.body.appendChild(topLayer);

    batteryContainer = document.createElement("div");
    batteryContainer.style.position = "absolute";
    batteryContainer.style.left = ((sw/2)-30)+"px";
    batteryContainer.style.top = (((sh/2)+200))+"px";
    batteryContainer.style.width = (60)+"px";
    batteryContainer.style.height = (110)+"px";
    batteryContainer.style.zIndex = "3";
    batteryContainer.style.transform = 
    "rotateZ(-90deg) scale(0.5)";
    document.body.appendChild(batteryContainer);

    text = [];
    batteryCap = document.createElement("span");
    batteryCap.style.position = "absolute";
    batteryCap.style.backgroundColor = "#fff";
    batteryCap.style.left = (20)+"px";
    batteryCap.style.top = (0)+"px";
    batteryCap.style.width = (20)+"px";
    batteryCap.style.height = (10)+"px";
    batteryCap.style.borderRadius = "5px 5px 0px 0px";
    batteryCap.style.border = "2px solid #fff";
    batteryCap.style.zIndex = "3";
    batteryContainer.appendChild(batteryCap);

    battery = document.createElement("div");
    battery.style.position = "absolute";
    battery.style.display = "flex";
    battery.style.flexDirection = "column";
    battery.style.flexWrap = "row";
    battery.style.justifyContent = "flex-end";
    battery.style.alignContent = "stretch";
    battery.style.alignItems = "stretch";
    battery.style.padding = "2px";
    battery.style.left = (0)+"px";
    battery.style.top = (10)+"px";
    battery.style.width = (60)+"px";
    battery.style.height = (100)+"px";
    battery.style.borderRadius = "5px";
    battery.style.border = "2px solid #fff";
    battery.style.zIndex = "3";
    batteryContainer.appendChild(battery);

    gamepad = document.createElement("canvas");
    gamepad.style.position = "absolute";
    gamepad.width = 300;
    gamepad.height = 200;
    gamepad.style.left = ((sw/2)-150)+"px";
    gamepad.style.top = ((sh/2)-250)+"px";
    gamepad.style.width = (300)+"px";
    gamepad.style.height = (200)+"px";
    //gamepad.style.filter = "invert(100%)";
    gamepad.style.zIndex = "3";
    document.body.appendChild(gamepad);

    fileInput = document.createElement("input");
    fileInput.style.display = "none";
    fileInput.type = "file";
    fileInput.onchange = function() {
        nes_load_data();
    };
    document.body.appendChild(fileInput);

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
        else if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-gamepad-battery") {
            batteryLevel = parseInt(msg[3]);
        }
    };

    loadImages(function() {
        loadMaze();
        gameLoop();
        ws.send("PAPER|"+playerId+"|remote-gamepad-attach");
    });
});

var backgroundNo = 0;
var background_colors = [
    "black", "white", "green", "yellow", "orange", "red", "purple", "blue"
];

var remoteGamepad = false;
var buttonSet = [];
var logInputs = false;

var sprite_idle = [
    "img/gamepad-hd.png",
    "img/star-icon.png",
    "img/bluetooth-icon.png"
    //"img/gamepad-description.png",
    //"img/stand-position-0.png"
];

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

var renderTime = 0;
var logicTime = 0;
var inputTime = 0;

var avgRenderTime = 1000/60;
var avgLogicTime = 1000/30;
var avgInputTime = 1000/30;

var pausePressed = false;
var gamePaused = false;
var grayscaleScenario = false;

var viewAngle = 0;
var position = { x: 10, y: 20 };
var gameLoop = function() {
     createButtonRequest();
     var blockSize = (300/21);
     var ctx = canvas.getContext("2d");
     ctx.fillStyle = "#000";
     ctx.clearRect(0, 0, 300, 300);
     ctx.fillRect((blockSize/3), (blockSize/3), 
     300-((blockSize/3)*2), 300-((blockSize/3)*2));

     for (var y = 0; y < 21; y++) {
          for (var x = 0; x < 21; x++) {
               ctx.fillStyle = "rgba(255,255,255,0.3)";
               var n = (y*21)+x;
               if (maze[n] == 1) {
                    var shadowForm = []; //getShadowForm(x, y);
                    for (var k = 0; k < shadowForm.length; k++) {
                    switch (shadowForm[k]) {
                         case 1:
                         ctx.fillRect((x+(1/2))*blockSize, y*blockSize,
                         blockSize/2, blockSize/2);
                         break;
                         case 2:
                         ctx.fillRect(x*blockSize, (y+(1/2))*blockSize,
                         blockSize/2, blockSize/2);
                         break;
                         case 4:
                         ctx.fillRect((x+(1/2))*blockSize, 
                         (y+(1/2))*blockSize,
                         blockSize/2, blockSize/2);
                         break;
                    }
                    }
                    ctx.fillStyle = "#fff";
                    var blockForm = getBlockForm(x, y);
                    ctx.beginPath();
                    ctx.arc((x+(1/2))*blockSize, (y+(1/2))*blockSize,
                    blockSize/6, 0, (Math.PI*2));
                    ctx.fill();
                    for (var k = 0; k < blockForm.length; k++) {
                    switch (blockForm[k]) {
                         case 1:
                         ctx.fillRect(x*blockSize, (y+(1/3))*blockSize,
                         blockSize/2, blockSize/3);
                         break;
                         case 2:
                         ctx.fillRect((x+(1/3))*blockSize, y*blockSize,
                         blockSize/3, blockSize/2);
                         break;
                         case 4:
                         ctx.fillRect((x+(1/2))*blockSize, 
                         (y+(1/3))*blockSize,
                         blockSize/2, blockSize/3);
                         break;
                         case 8:
                         ctx.fillRect((x+(1/3))*blockSize, 
                         (y+(1/2))*blockSize,
                         blockSize/3, blockSize/2);
                         break;
                    }
                    }
               }
               else if (maze[n]==2) {
                    ctx.drawImage(sprite_idle[1], 
                    x*blockSize, y*blockSize,
                    blockSize, blockSize);
               }
               else if (maze[n]==3) {
                    ctx.fillStyle = "limegreen";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.font = "8px sans-serif";
                    ctx.fillText("EXIT", 
                    (x+(1/2))*blockSize, (y+(1/2))*blockSize);
               }
               else if (maze[n]==4) {
                    ctx.fillStyle = "pink";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.font = "8px sans-serif";
                    ctx.fillText("BACK", 
                    (x+(1/2))*blockSize, (y+(1/2))*blockSize);
               }
          };
     };

     ctx.fillStyle = "#000";
     ctx.drawImage(sprite_idle[2],
          position.x*blockSize, position.y*blockSize,
          blockSize, blockSize);

     drawSetup("logic");
     drawSetup("render");
     requestAnimationFrame(gameLoop);
};

var getBlockForm = function(x, y) {
     var n = [
         (y*21)+(x-1), ((y-1)*21)+x, (y*21)+(x+1), ((y+1)*21)+x
     ];

     var left = (x > 0) && maze[n[0]] == 1 ? 1 : 0;
     var top = (y > 0) && maze[n[1]] == 1 ? 2 : 0;
     var right = (x < 20) && maze[n[2]] == 1 ? 4 : 0;
     var bottom = (y < 20) && maze[n[3]] == 1 ? 8 : 0;

     return [ left, top, right, bottom ];
};

var getShadowForm = function(x, y) {
     var n = [
         (y*21)+(x-1), ((y-1)*21)+x, (y*21)+(x+1), ((y+1)*21)+x
     ];

     var topRight = (x < 20) && maze[n[1]] == 1? 1 : 0;
     var left = (x > 0) && maze[n[0]] == 1 ? 2 : 0;
     var right = (x < 20) && maze[n[2]] == 1 ? 4 : 0;

     return [ topRight, left, 4 ];
};

var direction = { x: 0, y: 0 };
var move = function(x, y) {
     direction = { x: x, y: y };
     var p = { x: position.x+x, y: position.y+y };
     var n = (p.y*21)+p.x;
     var notBlocked = n > 0 && n < (21*21) && maze[n] != 1;
     if (maze[n] == 2) maze[n] = 0;
     if (maze[n] == 3) { 
         mazeNo += 1;
         var back = mapReturn(loadMaze("wait"), "back");
         p.x = back.x;
         p.y = back.y;
         loadMaze();
     }
     if (maze[n] == 4) { 
         mazeNo -= 1;
         var exit = mapReturn(loadMaze("wait"), "exit");
         p.x = exit.x;
         p.y = exit.y;
         loadMaze();
     }
     if (notBlocked) {
         position.x = p.x;
         position.y = p.y;
     }
}

// 25 

var mapReturn = function(data, type) {
     var result = { ...position };
     for (var n = 0; n < data.length; n++) {
          var x = (n % 21);
          var y = Math.floor((n / 21));
          if (type == "back" && data[n] == 4) {
               result.x = x;
               result.y = y;
          }
          else if (type == "exit" && data[n] == 3) {
               result.x = x;
               result.y = y;
          }
     }
     console.log(result);
     return result;
};

var build = function(item=1) {
     var p = { x: position.x+direction.x, y: position.y+direction.y };
     var n = (p.y*21)+p.x;
     var notOutside = n > 0 && n < (21*21);
     if (notOutside) {
          if (mazeNo == 0 && item == 4) return;
          maze[n] = maze[n] == 0 ? item : 0;
     }
    saveMaze();
};

var scale = function(arr, value, borderOut, borderIn) {
    for (var n = 0; n < arr.length; n++) {
        arr[n] -= borderOut;
        arr[n] *= value;
        arr[n] += borderIn;
    };
    return arr;
};

last_batteryLevel = 5;
batteryLevel = 5;
var gamepadState = function() {
    var ctx = gamepad.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.clearRect(0, 0, 300, 200);
    //ctx.drawImage(sprite_idle[0], 25, 21.8, 250, 156.25);
    ctx.drawImage(sprite_idle[0], 25, 22.5, 250, 155);

    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(avgInputTime.toFixed(0)+" ms", 150, 175);

    var colors = [
         "white", "darkorange", "gold", "purple", "limegreen"
    ];

    var ctxSignal = gamepad.getContext("2d");
    ctxSignal.fillStyle = "#000";
    ctxSignal.clearRect(137.5, 0, 25, 45);
    ctxSignal.beginPath();
    ctxSignal.strokeStyle = "purple";
    ctxSignal.lineWidth = 2;
    for (var n = 0; n < ips; n++) {
        ctxSignal.moveTo(139.5, 43-(n*4));
        ctxSignal.lineTo(160.5, 43-(n*4));
        ctxSignal.stroke();
    }

    var player = 1;
    var activeButtons = readButtons();

    // buttonDown
    for (var n = 0; n < activeButtons.length; n++) {
        var continued = false;
        for (var k = 0; k < last_activeButtons.length; k++) {
             if (last_activeButtons[k].index == 
                  activeButtons[n].index)
                  continued = true;
        }
        var action = continued ? "none" : "down";
        var button = 
        gamepadButton(1, activeButtons, n, action);
        ctx.beginPath();
        ctx.strokeStyle = colors[n];
        ctx.lineWidth = 2;
        ctx.arc(button.x, button.y, 5, 0, (Math.PI*2));
        ctx.stroke();
    }

    // buttonUp
    for (var m = 0; m < last_activeButtons.length; m++) {
        var released = true;
        for (var k = 0; k < activeButtons.length; k++) {
             if (last_activeButtons[m].index == 
             activeButtons[k].index)
             released = false;
        }
        if (released)
        gamepadButton(1, last_activeButtons, m, "up");
    }
    last_activeButtons = activeButtons;

    var transform = [
        "", "rotateY(180deg)", "rotateX(180deg)", 
        "rotateY(180deg) rotateX(180deg)"
    ];
    last_batteryLevel = battery.children.length;
    for (var n = 0; n < last_batteryLevel; n++) {
        battery.children[0].remove();
    }
    for (var n = 0; n < batteryLevel; n++) {
        var span = document.createElement("div");
        span.style.flex = 1;
        span.style.backgroundColor = "#fff";
        span.style.color = "#000";
        //span.style.fontWeight = "900";
        //span.innerText = "ENERGY";
        span.style.fontSize = "15px";
        span.style.lineHeight = "17px";
        span.style.maxHeight = ((100-8)/5)+"px";
        span.style.transform = transform[n];
        span.style.borderRadius = "3px";
        span.style.border = "2px solid #000";
        span.style.zIndex = "3";
        span.onclick = function() {
            this.remove();
        };
        battery.appendChild(span);
    }
    drawSetup("input");
};

var language = 0;
var gamepad_info = [
    [ "você apertou ", "you pressed " ],
    [ "select", "select" ],
    [ "start", "start" ],
    [ "para esquerda", "left arrow" ],
    [ "para cima", "up arrow" ],
    [ "para direita", "right arrow" ],
    [ "para baixo", "down arrow" ],
    [ "gatilho esquerdo", "left trigger" ],
    [ "gatilho direito", "right trigger" ],
    [ "L1", "L1" ],
    [ "R1", "R1" ],
    [ "quadrado", "square" ],
    [ "triângulo", "triangle" ],
    [ "bolinha", "circle" ],
    [ "xis", "x" ],
    [ "analógico esquerdo ", "left analogic" ],
    [ "analógico direito ", "right analogic" ],
    [ "para esquerda", "to left" ],
    [ "para frente", "to front" ],
    [ "para direita", "to right" ],
    [ "para trás", "to back" ]
];

var gamepadInfo = function(n) {
    return gamepad_info[n][language];
};

var gamepadButton = 
    function(player, activeButtons, n, action) {
    var r = 250/200;
    var h_line = scale(
       [ 10, 20, 47, 58, 70, 62, 44, 59, 73, 76, 89 ], r, 12.5, 21.8);
    var v_line = scale(
       [ 55, 65, 75, 107, 142, 126, 170, 184, 199, 96, 154 ], r, 25, 25);

    var button = { x: v_line[9], y: h_line[10] };
    switch (activeButtons[n].index) {
         case 8:
              button = { x: v_line[3], y: h_line[5] };
              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(1));
              break;
         case 9:
              button = { x: v_line[4], y: h_line[5] };
              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(2));
              break;
         case 7:
              button = { x: v_line[7], y: h_line[0] };
              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(8));
              break;
         case 6:
              button = { x: v_line[1], y: h_line[0] };
              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(7));
              break;
         case 4:
              button = { x: v_line[1], y: h_line[1] };
              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(9));
              if (action == "up")
              build(3);
              break;
         case 5:
              button = { x: v_line[7], y: h_line[1] };
              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(10));
              if (action == "up")
              build(4);
              break;
         case 14:
              button = { x: v_line[0], y: h_line[3] };
              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(3));
              if (action == "up")
              move(-1, 0);
              break;
         case 12:
              button = { x: v_line[1], y: h_line[2] };
              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(4));
              if (action == "up")
              move(0, -1);
              break;
         case 15:
              button = { x: v_line[2], y: h_line[3] };
              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(5));
              if (action == "up")
              move(1, 0);
              break;
         case 13:
              button = { x: v_line[1], y: h_line[4] };
              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(6));
              if (action == "up")
              move(0, 1);
              break;
         case 2:
              button = { x: v_line[6], y: h_line[7] };
              /*if (action == "down") {
                   backgroundNo = (backgroundNo+1) < 
                   (background_colors.length-1) ? 
                   (backgroundNo+1) : 0;
                   topLayer.style.backgroundColor = 
                   background_colors[backgroundNo];

                   var nextColor = (backgroundNo+1) < 
                   (background_colors.length-1) ? 
                   (backgroundNo+1) : 0;
                   nextLayer.style.backgroundColor = 
                   background_colors[nextColor];
              }
              iframe.contentWindow.dash.touching = 
              action == "down";*/

              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(11));
              if (action == "up")
              build();
              break;
         case 3:
              button = { x: v_line[7], y: h_line[6] };
              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(12));
              if (action == "up")
              build(2);
              break;
         case 1:
              button = { x: v_line[8], y: h_line[7] };
              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(13));
              break;
         case 0:
              button = { x: v_line[7], y: h_line[8] };
              if (action == "up")
              say(gamepadInfo(0)+gamepadInfo(14));
              break;
         case 99:
              var text = gamepadInfo(0)+gamepadInfo(15);

              var button = { x: v_line[9], y: h_line[10] };
              var button_position = { 
                  x: activeButtons[n].value[0],
                  y: activeButtons[n].value[1]
              };
              button_position = Math.normalize(button_position);
              button.x += button_position.x*10;
              button.y += button_position.y*10;

              var pos_x = Math.abs(button_position.x);
              var pos_y = Math.abs(button_position.y);

              var abs_x = Math.abs(activeButtons[n].value[0]);
              var abs_y = Math.abs(activeButtons[n].value[1]);
              if (abs_x > abs_y && activeButtons[n].value[0] < 0)
              text += gamepadInfo(17);
              else if (abs_x > abs_y && activeButtons[n].value[0] > 0)
              text += gamepadInfo(19);
              if (abs_y > abs_x && activeButtons[n].value[1] < 0)
              text += gamepadInfo(18);
              else if (abs_y > abs_x && activeButtons[n].value[1] > 0)
              text += gamepadInfo(20);
              if (action == "up")
              say(text);

              if (abs_x > abs_y && activeButtons[n].value[0] < 0)
              move(-1, 0);
              else if (abs_x > abs_y && activeButtons[n].value[0] > 0)
              move(1, 0);
              if (abs_y > abs_x && activeButtons[n].value[1] < 0)
              move(0, -1);
              else if (abs_y > abs_x && activeButtons[n].value[1] > 0)
              move(0, 1);
              break;
         case 98:
              var text = gamepadInfo(0)+gamepadInfo(16);

              var button = { x: v_line[10], y: h_line[10] };
              var button_position = { 
                  x: activeButtons[n].value[0],
                  y: activeButtons[n].value[1]
              };
              button_position = Math.normalize(button_position);
              button.x += button_position.x*10;
              button.y += button_position.y*10;

              var pos_x = Math.abs(button_position.x);
              var pos_y = Math.abs(button_position.y);

              var abs_x = Math.abs(activeButtons[n].value[0]);
              var abs_y = Math.abs(activeButtons[n].value[1]);
              if (abs_x > abs_y && activeButtons[n].value[0] < 0)
              text += gamepadInfo(17);
              else if (abs_x > abs_y && activeButtons[n].value[0] > 0)
              text += gamepadInfo(19);
              if (abs_y > abs_x && activeButtons[n].value[1] < 0)
              text += gamepadInfo(18);
              else if (abs_y > abs_x && activeButtons[n].value[1] > 0)
              text += gamepadInfo(20);
              if (action == "up")
              say(text);
              break;
    }
    return button;
};

var last_activeButtons = [];
var readButtons = function() {
    var activeButtons = buttonSet.filter((o) => { 
        return o.pressed;
    });
    return activeButtons;
};

var mazeNo = 0;
var maze_base = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
var maze = maze_base;

var saveMaze = function() {
    localStorage.setItem("maze_"+mazeNo, maze.join(","));
};

var loadMaze = function(action="enter") {
    var result = [ ...maze ];
    if (localStorage.getItem("maze_"+mazeNo)) {
        var data = localStorage.getItem("maze_"+mazeNo).split(",");
        for (var n = 0; n < result.length; n++)
        result[n] = parseInt(data[n]);
    }
    else {
        result = maze_base;
    }
    if (action=="enter") maze = result;
    return result;
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

var requestTimeout = 0;
var buttonRequestBuffer = [];
var createButtonRequest = function(index) {
    if (buttonRequestBuffer.length > 0) return;
    var obj = {
        identifier: getUniqueIdentifier(),
        index: index
    };
    buttonRequestBuffer.push(obj);
    ws.send("PAPER|"+playerId+"|remote-gamepad-get|"+obj.identifier);
    setTimeout(function() {
        requestTimeout += 1;
        buttonRequestBuffer = [];
    }, 1000);
};

var endButtonRequest = function(identifier) {
    buttonRequestBuffer =
    buttonRequestBuffer.filter((o) => {
       return o.identifier != identifier;
    });
};

var muted = false;
var remote = false;

var speaking = false;
var lastText = "";
var afterAudio_callback = false;

var say = function(text, afterAudio) {;
    if (muted) return;
    if (remote) {
        ws.send("PAPER|"+playerId+"|remote-audio|"+text);
        afterAudio_callback = afterAudio;
        return;
    }
    //console.log("say: ", text);
    lastText = text;
    var msg = new SpeechSynthesisUtterance();
    msg.lang = "pt-BR";
    //msg.lang = "en-US";
    //msg.lang = "ru-RU";
    msg.text = text;
    msg.onend = function(event) {
         if (afterAudio) afterAudio();
    };
    window.speechSynthesis.speak(msg);
};

/*
    javascript: ( function() { alert("123"); var script=document.createElement("script"); document.body.appendChild(script);  script.onload=function(){ eruda.init(); }; script.src="//cdn.jsdelivr.net/npm/eruda"; } ) ();

    javascript: ( function() { alert("123"); } ) ();
*/