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
    canvas.width = 256;
    canvas.height = 240;
    canvas.style.left = ((sw/2)-150)+"px";
    canvas.style.top = ((sh/2)-50)+"px";
    canvas.style.width = (300)+"px";
    canvas.style.height = (200)+"px";
    canvas.style.zIndex = "3";
    document.body.appendChild(canvas);

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
    fileButton.innerText = romList[romNo].name;
    fileButton.style.fontSize = "20px";
    fileButton.style.lineHeight = "20px";
    fileButton.style.left = ((sw/2)-50)+"px";
    fileButton.style.top = ((sh/2)-100)+"px";
    fileButton.style.width = (100)+"px";
    fileButton.style.height = (25)+"px";
    fileButton.style.zIndex = "3";
    fileButton.pointerDownTime = 0;
    fileButton.onpointerdown = function() {
        this.pointerDownTime = new Date().getTime();
    };
    fileButton.onpointerup = function() {
        if (new Date().getTime() - this.pointerDownTime < 3000) {
            romNo = (romNo+1) < romList.length ? (romNo+1) : 0;
            fileButton.innerText = romList[romNo].name;
            //fileInput.click();
        }
        else {
            nes_load_url(romList[romNo].address);
        }
    };
    document.body.appendChild(fileButton);

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
    };

    initScreenModes(canvas);
    loadImages(function() {
        nes_init();
        gameLoop();
        ws.send("PAPER|"+playerId+"|remote-gamepad-attach");
    });
});

var romNo = 0;
var romList = [
    { name: "3D Block",
      address: "rom/3D Block [p2].nes" },
    { name: "Mega Man",
      address: "rom/Mega Man (USA).nes" },
    { name: "Pin Ball",
      address: "rom/Pinball (World).nes" },
    { name: "Ice Climber",
      address: "rom/Ice Climber (USA, Europe).nes" },
    { name: "Porter", 
      address: "rom/Porter (Asia) (Unl).nes" },
    { name: "Bomberman 2", 
      address: "rom/Bomberman 2 (J) [hM02].nes" },
    { name: "Super Mario Bros", 
      address: "rom/Super Mario Bros (E).nes" },
    { name: "Pac-Man", 
      address: "rom/Pac-Man (USA) (Namco).nes" },
    { name: "Super Mario Bros. 3", 
      address: "rom/Super Mario Bros. 3 (USA) (Rev 1).nes" },
    { name: "Tetris", 
      address: "rom/Tetris (U) [!].nes" },
    { name: "Battle City", 
      address: "rom/BattleCity (Japan).nes" },
    { name: "Excite Bike",
      address: "rom/Excitebike (Japan, USA).nes" }
];

var remoteGamepad = false;
var buttonSet = [];
var logInputs = false;

var sprite_idle = [
    "img/boat-sprite-0.png",
    "img/island-sprite.png",
    "img/gamepad-description.png"
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

var frameCount = 0;
var frameSkip = 0;
var gameLoop = function() {
    createButtonRequest();

    if (frameCount % 2 == 0) {
         image.data.set(framebuffer_u8);
         var ctx = canvas.getContext("2d");
         ctx.putImageData(image, 0, 0);
    }
    else {
         if (nes.fpsFrameCount > 0)
         for (var n = 0; n < frameSkip; n++) {
              nes.frame();
         }
    }
    frameCount += 1;

    drawSetup("logic");
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

    var player = 1;
    var activeButtons = readButtons();

    // buttonDown
    for (var n = 0; n < activeButtons.length; n++) {
    var button = { x: v_line[9], y: h_line[10] };
    switch (activeButtons[n].index) {
         case 8:
              button = { x: v_line[3], y: h_line[5] };
              nesButton(1, activeButtons[n], "down");
              break;
         case 9:
              button = { x: v_line[4], y: h_line[5] };
              nesButton(1, activeButtons[n], "down");
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
              nesButton(1, activeButtons[n], "down");
              break;
         case 12:
              button = { x: v_line[1], y: h_line[2] };
              nesButton(1, activeButtons[n], "down");
              break;
         case 15:
              button = { x: v_line[2], y: h_line[3] };
              nesButton(1, activeButtons[n], "down");
              break;
         case 13:
              button = { x: v_line[1], y: h_line[4] };
              nesButton(1, activeButtons[n], "down");
              break;
         case 2:
              button = { x: v_line[6], y: h_line[7] };
              nesButton(1, activeButtons[n], "down");
              break;
         case 3:
              button = { x: v_line[7], y: h_line[6] };
              break;
         case 1:
              button = { x: v_line[8], y: h_line[7] };
              break;
         case 0:
              button = { x: v_line[7], y: h_line[8] };
              nesButton(1, activeButtons[n], "down");
              break;
         case 99:
              var button = { x: v_line[9], y: h_line[10] };
              var button_position = { 
                  x: activeButtons[n].value[0],
                  y: activeButtons[n].value[1]
              };
              button_position = Math.normalize(button_position);
              button.x += button_position.x*10;
              button.y += button_position.y*10;
              nesButton(1, activeButtons[n], "down");
              break;
         case 98:
              button = { x: v_line[10], y: h_line[10] };
              var button_position = { 
                  x: activeButtons[n].value[0],
                  y: activeButtons[n].value[1]
              };
              button_position = Math.normalize(button_position);
              button.x += button_position.x*10;
              button.y += button_position.y*10;
              nesButton(1, activeButtons[n], "down");
              break;
    }

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
        nesButton(1, last_activeButtons[m], "up");
    }
    last_activeButtons = activeButtons;

    drawSetup("input");
};

var nesButton = function(player, button, action) {
    var nesIndex = 0;
    switch (button.index) {
        case 8:
              nesIndex = jsnes.Controller.BUTTON_SELECT;
              break;
         case 9:
              if (nes.fpsFrameCount > 0)
              nesIndex = jsnes.Controller.BUTTON_START;
              else if (action == "up")
              nes_load_url(romList[romNo].address);
              break;
         case 7:
              if (action == "up")
              canvas.requestFullscreen();
              else
              document.exitFullscreen();
              break;
         case 6:
              // not available
              break;
         case 4:
              // not available
              break;
         case 5:
              // not available
              break;
         case 14:
              nesIndex = selectX([
                   jsnes.Controller.BUTTON_RIGHT,
                   jsnes.Controller.BUTTON_LEFT
              ]);
              break;
         case 12:
              if (nes.fpsFrameCount > 0) {
                   nesIndex = selectY([
                       jsnes.Controller.BUTTON_DOWN,
                       jsnes.Controller.BUTTON_UP
                   ]);
              }
              else if (action == "up") {
                   romNo = (romNo-1) < 0 ? 0 : (romNo-1);
                   fileButton.innerText = romList[romNo].name;
              }
              break;
         case 15:
              nesIndex = selectX([
                   jsnes.Controller.BUTTON_LEFT,
                   jsnes.Controller.BUTTON_RIGHT
              ]);
              break;
         case 13:
              if (nes.fpsFrameCount > 0) {
                   nesIndex = selectY([
                       jsnes.Controller.BUTTON_UP,
                       jsnes.Controller.BUTTON_DOWN
                   ]);
              }
              else if (action == "up") {
                   romNo = (romNo+1) < romList.length ? (romNo+1) : 0;
                   fileButton.innerText = romList[romNo].name;
              }
              break;
         case 2:
              nesIndex = jsnes.Controller.BUTTON_A;
              break;
         case 3:
              // not available
              break;
         case 1:
              // not available
              break;
         case 0:
              nesIndex = jsnes.Controller.BUTTON_B;
              break;
         case 99:
              if (button.value[0] < -0.3)
              nesIndex = selectX([
                   jsnes.Controller.BUTTON_RIGHT,
                   jsnes.Controller.BUTTON_LEFT
              ]);
              else 
              nes.buttonUp(player, jsnes.Controller.BUTTON_RIGHT);

              if (button.value[0] > 0.3)
              nesIndex = selectX([
                   jsnes.Controller.BUTTON_LEFT,
                   jsnes.Controller.BUTTON_RIGHT
              ]);
              else 
              nes.buttonUp(player, jsnes.Controller.BUTTON_LEFT);

              if (button.value[1] < -0.3)
              nesIndex = selectY([
                   jsnes.Controller.BUTTON_DOWN,
                   jsnes.Controller.BUTTON_UP
              ]);
              else 
              nes.buttonUp(player, jsnes.Controller.BUTTON_DOWN);

              if (button.value[1] > 0.3)
              nesIndex = selectY([
                   jsnes.Controller.BUTTON_UP,
                   jsnes.Controller.BUTTON_DOWN
              ]);
              else 
              nes.buttonUp(player, jsnes.Controller.BUTTON_UP);
              break;
         case 98:
              if (button.value[0] < -0.3)
              nesIndex = selectX([
                   jsnes.Controller.BUTTON_RIGHT,
                   jsnes.Controller.BUTTON_LEFT
              ]);
              else 
              nes.buttonUp(player, jsnes.Controller.BUTTON_RIGHT);

              if (button.value[0] > 0.3)
              nesIndex = selectX([
                   jsnes.Controller.BUTTON_LEFT,
                   jsnes.Controller.BUTTON_RIGHT
              ]);
              else 
              nes.buttonUp(player, jsnes.Controller.BUTTON_LEFT);

              if (button.value[1] < -0.3)
              nesIndex = selectY([
                   jsnes.Controller.BUTTON_DOWN,
                   jsnes.Controller.BUTTON_UP
              ]);
              else 
              nes.buttonUp(player, jsnes.Controller.BUTTON_DOWN);

              if (button.value[1] > 0.3)
              nesIndex = selectY([
                   jsnes.Controller.BUTTON_UP,
                   jsnes.Controller.BUTTON_DOWN
              ]);
              else 
              nes.buttonUp(player, jsnes.Controller.BUTTON_UP);
              break;
    }
    //console.log("button "+button+" "+action);
    if (action == "down")
    nes.buttonDown(player, nesIndex);
    else
    nes.buttonUp(player, nesIndex);
};

var last_activeButtons = [];
var readButtons = function() {
    var activeButtons = buttonSet.filter((o) => { 
        return o.pressed;
    });
    return activeButtons;
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

var SCREEN_WIDTH = 256;
var SCREEN_HEIGHT = 240;
var FRAMEBUFFER_SIZE = SCREEN_WIDTH*SCREEN_HEIGHT;

var canvas_ctx, image;
var framebuffer_u8, framebuffer_u32;

var AUDIO_BUFFERING = 512;
var SAMPLE_COUNT = 4*1024;
var SAMPLE_MASK = SAMPLE_COUNT - 1;
var audio_samples_L = new Float32Array(SAMPLE_COUNT);
var audio_samples_R = new Float32Array(SAMPLE_COUNT);
var audio_write_cursor = 0, audio_read_cursor = 0;

var nes = new jsnes.NES({
    onFrame: function(framebuffer_24) {
        for(var i = 0; i < FRAMEBUFFER_SIZE; i++) framebuffer_u32[i] = 0xFF000000 | framebuffer_24[i];
    },
    onAudioSample: function(l, r) {
        audio_samples_L[audio_write_cursor] = l;
        audio_samples_R[audio_write_cursor] = r;
        audio_write_cursor = (audio_write_cursor + 1) & SAMPLE_MASK;
    },
    emulateSound: true
});

var audio_remain = function() {
    return (audio_write_cursor - audio_read_cursor) & SAMPLE_MASK;
};

var audio_callback = function(event) {
    var dst = event.outputBuffer;
    var len = dst.length;
    
    // Attempt to avoid buffer underruns.
    if(audio_remain() < AUDIO_BUFFERING) nes.frame();
    
    var dst_l = dst.getChannelData(0);
    var dst_r = dst.getChannelData(1);
    for(var i = 0; i < len; i++){
        var src_idx = (audio_read_cursor + i) & SAMPLE_MASK;
        dst_l[i] = audio_samples_L[src_idx];
        dst_r[i] = audio_samples_R[src_idx];
    }
    
    audio_read_cursor = (audio_read_cursor + len) & SAMPLE_MASK;
};

var nes_init = function() {
    canvas_ctx = canvas.getContext("2d");
    image = canvas_ctx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    
    canvas_ctx.fillStyle = "black";
    canvas_ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    
    // Allocate framebuffer array.
    var buffer = new ArrayBuffer(image.data.length);
    framebuffer_u8 = new Uint8ClampedArray(buffer);
    framebuffer_u32 = new Uint32Array(buffer);
    
    // Setup audio.
    var audio_ctx = new window.AudioContext();
    var script_processor = audio_ctx.createScriptProcessor(AUDIO_BUFFERING, 0, 2);
    script_processor.onaudioprocess = audio_callback;
    script_processor.connect(audio_ctx.destination);
}

var nes_boot = function(rom_data) {
    nes.loadROM(rom_data);
};

var nes_load_data = function(rom_data) {
    nes_init();
    nes_boot(rom_data);
};

var nes_load_url = function(path) {
    nes_init();
    
    var req = new XMLHttpRequest();
    req.open("GET", path);
    req.overrideMimeType("text/plain; charset=x-user-defined");
    req.onerror = () => console.log(`Error loading ${path}: ${req.statusText}`);
    
    req.onload = function() {
        if (this.status === 200) {
        nes_boot(this.responseText);
        } else if (this.status === 0) {
            // Aborted, so ignore error
        } else {
            req.onerror();
        }
    };
    
    req.send();
};