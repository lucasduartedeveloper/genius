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
    canvas.id = "output";
    canvas.style.position = "absolute";
    canvas.width = 300;
    canvas.height = 200;
    canvas.style.left = ((sw/2)-150)+"px";
    canvas.style.top = ((sh/2)-100)+"px";
    canvas.style.width = (300)+"px";
    canvas.style.height = (200)+"px";
    canvas.style.zIndex = "3";
    document.body.appendChild(canvas);

    gamepad = document.createElement("canvas");
    gamepad.style.position = "absolute";
    gamepad.width = 250;
    gamepad.height = 150;
    gamepad.style.left = ((sw/2)-150)+"px";
    gamepad.style.top = ((sh/2)-250)+"px";
    gamepad.style.width = (250)+"px";
    gamepad.style.height = (150)+"px";
    gamepad.style.zIndex = "3";
    document.body.appendChild(gamepad);

    fileButton = document.createElement("button");
    fileButton.style.position = "absolute";
    fileButton.innerText = "ROM";
    fileButton.style.fontSize = "20px";
    fileButton.style.lineHeight = "20px";
    fileButton.style.left = ((sw/2)+100)+"px";
    fileButton.style.top = ((sh/2)-125)+"px";
    fileButton.style.width = (50)+"px";
    fileButton.style.height = (25)+"px";
    fileButton.style.zIndex = "3";
    fileButton.onclick = function() {
        nes_load_url("rom/Gauntlet (U).nes");
        //fileInput.click();
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
            //label.innerText = "RECEIVING INPUT";
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

    loadImages(function() {
        nes_init();
        gameLoop();
        ws.send("PAPER|"+playerId+"|remote-gamepad-attach");
    });
});

var remoteGamepad = false;
var buttonSet = [];
var logInputs = false;

var renderTime = 0;
var logicTime = 0;
var inputTime = 0;

var avgRenderTime = 1000/60;
var avgLogicTime = 1000/30;
var avgInputTime = 1000/30;

var pausePressed = false;
var gamePaused = false;

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

var gameLoop = function() {
    createButtonRequest();

    image.data.set(framebuffer_u8);

    var ctx = canvas.getContext("2d");
    ctx.putImageData(image, 0, 0);

    requestAnimationFrame(gameLoop);
};

var gamepadState = function() {
    var ctx = gamepad.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 250, 150);
    ctx.drawImage(sprite_idle[2], 25, 12.5, 200, 125);

    var h_line = [ 10, 20, 47, 58, 70, 62, 44, 59, 73, 76, 89 ];
    var v_line = [ 55, 65, 75, 107, 142, 126, 170, 184, 199, 96, 154 ];

    for (var n = 0; n < h_line.length; n++) {
         ctx.beginPath();
         ctx.strokeStyle = "gray";
         ctx.lineWidth = 1;
         ctx.moveTo(0, h_line[n]);
         ctx.lineTo(250, h_line[n]);
         //ctx.stroke();
    }

    for (var n = 0; n < v_line.length; n++) {
         ctx.beginPath();
         ctx.strokeStyle = "darkgray";
         ctx.lineWidth = 1;
         ctx.moveTo(v_line[n], 0);
         ctx.lineTo(v_line[n], 150);
         //ctx.stroke();
    }

    var colors = [
         "blue", "darkorange", "gold", "purple", "limegreen"
    ];

    var ctxSignal = gamepad.getContext("2d");
    ctxSignal.fillStyle = "#000";
    ctxSignal.fillRect(112.5, 0, 25, 30);
    avgInputTime += (new Date().getTime() - inputTime);
    avgInputTime /= 2;
    var ips = (1000/(avgInputTime)).toFixed(0);
    ctxSignal.beginPath();
    ctxSignal.strokeStyle = "purple";
    ctxSignal.lineWidth = 2;
    for (var n = 0; n < ips; n++) {
        ctxSignal.moveTo(114.5, 28-(n*4));
        ctxSignal.lineTo(135.5, 28-(n*4));
        ctxSignal.stroke();
    }

    var player = 1;
    var objs = readButtons();

    for (var n = 0; n < objs.length; n++) {
    var button = { x: v_line[9], y: h_line[10] };
    switch (objs[n].index) {
         case 8:
              button = { x: v_line[3], y: h_line[5] };
              nes.buttonDown(1, jsnes.Controller.BUTTON_SELECT);
              break;
         case 9:
              button = { x: v_line[4], y: h_line[5] };
              nes.buttonDown(1, jsnes.Controller.BUTTON_START);
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
              nes.buttonDown(1, jsnes.Controller.BUTTON_LEFT);
              break;
         case 12:
              button = { x: v_line[1], y: h_line[2] };
              nes.buttonDown(1, jsnes.Controller.BUTTON_UP);
              break;
         case 15:
              button = { x: v_line[2], y: h_line[3] };
              nes.buttonDown(1, jsnes.Controller.BUTTON_RIGHT);
              break;
         case 13:
              button = { x: v_line[1], y: h_line[4] };
              nes.buttonDown(1, jsnes.Controller.BUTTON_DOWN);
              break;
         case 2:
              button = { x: v_line[6], y: h_line[7] };
              nes.buttonDown(1, jsnes.Controller.BUTTON_A);
              break;
         case 3:
              button = { x: v_line[7], y: h_line[6] };
              break;
         case 1:
              button = { x: v_line[8], y: h_line[7] };
              break;
         case 0:
              button = { x: v_line[7], y: h_line[8] };
              nes.buttonDown(1, jsnes.Controller.BUTTON_B);
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

    inputTime = new Date().getTime();
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
    }
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