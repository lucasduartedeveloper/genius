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
    $("#title").css("font-size", "15px");
    $("#title").css("color", "#fff");

    $("#title")[0].innerText = "VERY SLOW MOTION PRINTER";

    icon = document.createElement("i");
    icon.style.position = "absolute";
    icon.className = "fa-solid fa-print";
    icon.style.color = "#fff";
    icon.style.fontSize = "50px";
    icon.style.left = ((sw/2)-25)+"px";
    icon.style.top = ((sh/2)-225)+"px";
    icon.style.width = (50)+"px";
    icon.style.height = (50)+"px";
    icon.style.transform = "scale(0.8)";
    icon.style.zIndex = "5";
    document.body.appendChild(icon);

    camera = document.createElement("video");
    camera.style.position = "absolute";
    camera.style.objectFit = "cover";
    camera.width = resolution;
    camera.height = resolution;
    camera.autoplay = true;
    camera.style.left = ((sw/2)-25)+"px";
    camera.style.top = ((sh/2)-275)+"px";
    camera.style.width = (50)+"px";
    camera.style.height = (50)+"px";
    camera.style.transform = "rotateY(-180deg)";
    camera.style.zIndex = "5";
    document.body.appendChild(camera);

    canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.width = 300;
    canvas.height = 300;
    canvas.style.left = ((sw/2)-150)+"px";
    canvas.style.top = ((sh/2)-150)+"px";
    canvas.style.width = (300)+"px";
    canvas.style.height = (300)+"px";
    canvas.style.transform = "scale(0.8)";
    canvas.style.zIndex = "5";
    canvas.ontouchstart = paintPixel;
    canvas.ontouchmove = paintPixel;
    document.body.appendChild(canvas);

    canvas.getContext("2d").imageSmoothingEnabled = false;

    canvasPortal = document.createElement("canvas");
    canvasPortal.style.position = "absolute";
    canvasPortal.width = 300;
    canvasPortal.height = 300;
    canvasPortal.style.left = ((sw/2)-150)+"px";
    canvasPortal.style.top = ((sh/2)-150)+"px";
    canvasPortal.style.width = (300)+"px";
    canvasPortal.style.height = (300)+"px";
    canvasPortal.style.transform = "scale(0.8)";
    canvasPortal.style.zIndex = "5";
    canvasPortal.ontouchstart = paintPixel;
    canvasPortal.ontouchmove = paintPixel;
    document.body.appendChild(canvasPortal);

    canvasPortal.getContext("2d").imageSmoothingEnabled = false;

    canvas1 = document.createElement("canvas");
    canvas1.style.position = "absolute";
    canvas1.width = 300;
    canvas1.height = 300;
    canvas1.style.left = ((sw/2)-150)+"px";
    canvas1.style.top = ((sh/2)-150)+"px";
    canvas1.style.width = (300)+"px";
    canvas1.style.height = (300)+"px";
    canvas1.style.transform = "scale(0.8)";
    canvas1.style.zIndex = "5";
    canvas1.ontouchstart = paintPixel;
    canvas1.ontouchmove = paintPixel;
    document.body.appendChild(canvas1);

    canvas1.getContext("2d").imageSmoothingEnabled = false;

    canvas.style.outlineOffset = 
    (5)+"px";
    canvas.style.outline = 
    (5)+"px solid red";

    saveContainer = document.createElement("span");
    saveContainer.style.position = "absolute";
    saveContainer.style.background = "#446";
    saveContainer.style.left = ((sw/2)-150)+"px";
    saveContainer.style.top = ((sh/2)+150)+"px";
    saveContainer.style.width = (300)+"px";
    saveContainer.style.height = (50)+"px";
    saveContainer.style.zIndex = "5";
    document.body.appendChild(saveContainer);

    fileName = document.createElement("span");
    fileName.style.position = "absolute";
    fileName.innerText = resolution+"x_zoom.png";
    fileName.style.fontSize = "20px";
    fileName.style.textAlign = "left";
    fileName.style.color = "#888";
    fileName.style.left = (12.5)+"px";
    fileName.style.top = (12.5)+"px";
    fileName.style.width = (300)+"px";
    fileName.style.height = (25)+"px";
    fileName.style.zIndex = "5";
    saveContainer.appendChild(fileName);

    share = document.createElement("i");
    share.style.position = "absolute";
    share.className = "fa-solid fa-download";
    share.style.color = "#fff";
    share.style.left = (300-37.5)+"px";
    share.style.top = (12.5)+"px";
    share.style.width = (25)+"px";
    share.style.height = (50)+"px";
    share.style.zIndex = "5";
    saveContainer.appendChild(share);

    saveContainer.onclick = function() {
        var dataURL = canvas.toDataURL();
        var hiddenElement = document.createElement('a');
        hiddenElement.href = clipLayers();
        hiddenElement.target = "_blank";
        hiddenElement.download = 
        resolution+"x_zoom.png";
        hiddenElement.click();
    };

    inputDevice = document.createElement("span");
    inputDevice.style.position = "absolute";
    inputDevice.style.background = "rgba(50, 50, 65, 1)";
    inputDevice.style.lineHeight = (100)+"px";
    inputDevice.style.color = "#fff";
    inputDevice.innerText = "device: "+deviceNo;
    inputDevice.style.right = (0)+"px";
    inputDevice.style.top = (0)+"px";
    inputDevice.style.width = (100)+"px";
    inputDevice.style.height = (100)+"px";
    inputDevice.style.transform = "scale(0.8)";
    inputDevice.style.zIndex = "5";
    document.body.appendChild(inputDevice);

    inputDevice.onclick = function() {
        deviceNo = (deviceNo+1) < (videoDevices.length-1) ? 
        (deviceNo+1) : 0;
        inputDevice.innerText = "device: "+deviceNo;
        camera.style.transform = deviceNo == 0 ? 
        "rotateY(-180deg)" : "rotateY(0deg)";
    };

    layerNo = 0;
    layerTile = document.createElement("span");
    layerTile.style.position = "absolute";
    layerTile.style.background = "rgba(50, 50, 65, 1)";
    layerTile.style.lineHeight = (100)+"px";
    layerTile.style.color = "#fff";
    layerTile.innerText = "layer no: "+layerNo;
    layerTile.style.right = (0)+"px";
    layerTile.style.top = (100)+"px";
    layerTile.style.width = (100)+"px";
    layerTile.style.height = (100)+"px";
    layerTile.style.transform = "scale(0.8)";
    layerTile.style.zIndex = "5";
    document.body.appendChild(layerTile);

    layerTile.onclick = function() {
        layerNo = (layerNo+1) < (3) ? 
        (layerNo+1) : 0;
        layerTile.innerText = "layer no: "+layerNo;
        if (layerNo == 0) {
            canvas.style.display = "initial";
            canvasPortal.style.display = "initial";
            canvas1.style.display = "none";
        }
        else {
            canvas.style.display = "initial";
            canvasPortal.style.display = "none";
            canvas1.style.display = "initial";
        }
    };

    baseCanvas = document.createElement("canvas");
    baseCanvas.style.position = "absolute";
    baseCanvas.width = resolution;
    baseCanvas.height = resolution;
    baseCanvas.style.left = (0)+"px";
    baseCanvas.style.top = (0)+"px";
    baseCanvas.style.width = (50)+"px";
    baseCanvas.style.height = (50)+"px";
    //baseCanvas.style.transform = "scale(0.8)";
    baseCanvas.style.zIndex = "5";
    document.body.appendChild(baseCanvas);

    author = document.createElement("span");
    author.style.position = "absolute";
    author.innerText = "LUCAS DUARTE DE OLIVEIRA";
    author.fontSize = "15px";
    author.textAlign = "center";
    author.style.color = "#fff";
    author.width = resolution;
    author.height = resolution;
    author.style.left = ((sw/2)+25)+"px";
    author.style.top = ((sh/2)-10)+"px";
    author.style.width = (300*0.8)+"px";
    author.style.height = (25)+"px";
    author.style.transform = "rotateZ(-90deg)";
    author.style.zIndex = "5";
    document.body.appendChild(author);

    slideCount = 0;
    startX = 0;
    startY = 0;
    author.ontouchstart = function(e) {
        startY = e.clientY;
    };
    author.ontouchmove = function(e) {
        var offsetY = Math.abs(e.clientY - startY);
        console.log(offsetY);
    };

    baseTile = document.createElement("span");
    baseTile.innerText = resolution+"x";
    baseTile.style.lineHeight = (100)+"px";
    baseTile.style.position = "absolute";
    baseTile.style.background = "rgba(50, 50, 65, 1)";
    baseTile.style.color = "#fff";
    baseTile.style.left = (0)+"px";
    baseTile.style.top = (0)+"px";
    baseTile.style.width = (100)+"px";
    baseTile.style.height = (100)+"px";
    //baseTile.style.transform = "scale(0.8)";
    baseTile.style.zIndex = "5";
    document.body.appendChild(baseTile);

    baseTile.onclick= function(e) {
        var ctxVideoCanvas = canvas.getContext("2d");
        ctxVideoCanvas.clearRect(0, 0, 300, 300);

        canvas.style.outlineOffset = 
        (5)+"px";
        canvas.style.outline = 
        (5)+"px solid yellow";

        timeStarted = new Date().getTime();
        stopwatch.innerText = "00:00";

        if (preloaded)
        drawSquare();
        else
        startCamera();
    };

    loadImages(function() {
        console.log("images loaded");
    });

    preloaded = location.href.includes("192");
    switchBackground = document.createElement("span");
    switchBackground.style.position = "absolute";
    switchBackground.style.background = "rgba(50, 50, 65, 1)";
    switchBackground.style.color = "#fff";
    switchBackground.style.left = (0)+"px";
    switchBackground.style.top = (125)+"px";
    switchBackground.style.width = (100)+"px";
    switchBackground.style.height = (50)+"px";
    switchBackground.style.transform = "scale(0.8)";
    switchBackground.style.zIndex = "5";
    document.body.appendChild(switchBackground);

    switchButton = document.createElement("span");
    switchButton.style.position = "absolute";
    switchButton.style.background = "#fff";
    if (preloaded)
    switchButton.style.left = (60)+"px";
    else
    switchButton.style.left = (10)+"px";
    switchButton.style.top = (10)+"px";
    switchButton.style.width = (30)+"px";
    switchButton.style.height = (30)+"px";
    switchButton.style.zIndex = "5";
    switchBackground.appendChild(switchButton);

    switchBackground.onclick = function() {
        preloaded = !preloaded;
        if (preloaded)
        switchButton.style.left = (60)+"px";
        else
        switchButton.style.left = (10)+"px";
    };

    leftArrow = document.createElement("i");
    leftArrow.style.position = "absolute";
    leftArrow.className = "fa-solid fa-arrow-left";
    leftArrow.style.color = "#fff";
    leftArrow.style.left = (0)+"px";
    leftArrow.style.top = (100)+"px";
    leftArrow.style.width = (25)+"px";
    leftArrow.style.height = (25)+"px";
    //baseTile.style.transform = "scale(0.8)";
    leftArrow.style.zIndex = "5";
    document.body.appendChild(leftArrow);

    leftArrow.onclick = function() {
        resolution = ((resolution/5)-1)*5;
        updatePixel();
        baseTile.innerText = resolution+"x";
        baseCanvas.width = resolution;
        baseCanvas.height = resolution;
        camera.width = resolution;
        camera.height = resolution;
        fileName.innerText = resolution+"x_zoom.png";
    };

    rightArrow = document.createElement("i");
    rightArrow.style.position = "absolute";
    rightArrow.className = "fa-solid fa-arrow-right";
    rightArrow.style.color = "#fff";
    rightArrow.style.left = (75)+"px";
    rightArrow.style.top = (100)+"px";
    rightArrow.style.width = (25)+"px";
    rightArrow.style.height = (25)+"px";
    //baseTile.style.transform = "scale(0.8)";
    rightArrow.style.zIndex = "5";
    document.body.appendChild(rightArrow);

    rightArrow.onclick = function() {
        resolution = ((resolution/5)+1)*5;
        updatePixel();
        baseTile.innerText = resolution+"x";
        baseCanvas.width = resolution;
        baseCanvas.height = resolution;
        camera.width = resolution;
        camera.height = resolution;
        fileName.innerText = resolution+"x_zoom.png";
    };

    stopwatch = document.createElement("span");
    stopwatch.style.position = "absolute";
    stopwatch.innerText = "00:00";
    stopwatch.style.color = "#fff";
    stopwatch.style.left = ((sw/2)-50)+"px";
    stopwatch.style.top = ((sh/2)+225)+"px";
    stopwatch.style.width = (100)+"px";
    stopwatch.style.height = (25)+"px";
    stopwatch.style.zIndex = "5";
    document.body.appendChild(stopwatch);

    $("*").not("i").css("font-family", "Khand");

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "image-data") {
            var img = document.createElement("img");
            img.onload = function() {
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, 300, 300);
            };
            img.src = msg[3];
        }
    };

    pixelPosition = { x: 0, y: 0 };
    targetPixel = document.createElement("div");
    targetPixel.style.position = "absolute";
    targetPixel.style.left = ((sw/2)-((300*0.8)/2))+
    (pixelPosition.x*((300/resolution)*0.8))+"px";
    targetPixel.style.top = (((sh/2)-((300*0.8)/2)))+
    (pixelPosition.y*((300/resolution)*0.8))+"px";
    targetPixel.style.width = ((300/resolution)*0.8)+"px";
    targetPixel.style.height = ((300/resolution)*0.8)+"px";
    targetPixel.style.outline = "1px solid lightblue";
    targetPixel.style.zIndex = "5";
    document.body.appendChild(targetPixel);

    undoButton = document.createElement("i");
    undoButton.style.position = "absolute";
    undoButton.className = "fa-solid fa-trash";
    undoButton.style.color = "#fff";
    undoButton.style.left = ((sw/2)-162.5)+"px";
    undoButton.style.top = ((sh/2)+(((300/2)*0.8)-62.5))+"px";
    undoButton.style.width = (25)+"px";
    undoButton.style.height = (25)+"px";
    undoButton.style.zIndex = "5";
    document.body.appendChild(undoButton);

    undoButton.onclick = function() {
        restoreCanvas();
    };

    clipButton = document.createElement("i");
    clipButton.style.position = "absolute";
    clipButton.className = "fa-solid fa-share";
    clipButton.style.color = "#fff";
    clipButton.style.left = ((sw/2)-162.5)+"px";
    clipButton.style.top = ((sh/2)+(((300/2)*0.8)-25))+"px";
    clipButton.style.width = (25)+"px";
    clipButton.style.height = (25)+"px";
    clipButton.style.zIndex = "5";
    document.body.appendChild(clipButton);

    clipButton.onclick = function() {
        ws.send("PAPER|"+playerId+"|image-data|"+clipLayers());
    };

    moveContainer = document.createElement("i");
    moveContainer.style.position = "absolute";
    moveContainer.style.left = ((sw/2)-150)+"px";
    moveContainer.style.top = ((sh/2)+225)+"px";
    moveContainer.style.width = (75)+"px";
    moveContainer.style.height = (75)+"px";
    //moveContainer.style.borderRadius = "50%";
    //moveContainer.style.outline = "2px solid #fff";
    moveContainer.style.zIndex = "5";
    document.body.appendChild(moveContainer);

    leftMove = document.createElement("i");
    leftMove.style.position = "absolute";
    leftMove.className = "fa-solid fa-arrow-left";
    leftMove.style.color = "#fff";
    leftMove.style.left = (0)+"px";
    leftMove.style.top = (25)+"px";
    leftMove.style.width = (25)+"px";
    leftMove.style.height = (25)+"px";
    leftMove.style.zIndex = "5";
    moveContainer.appendChild(leftMove);

    leftMove.onclick = function() {
        pixelPosition.x -= 1;
        updatePixel();
    };

    upMove = document.createElement("i");
    upMove.style.position = "absolute";
    upMove.className = "fa-solid fa-arrow-up";
    upMove.style.color = "#fff";
    upMove.style.left = (25)+"px";
    upMove.style.top = (0)+"px";
    upMove.style.width = (25)+"px";
    upMove.style.height = (25)+"px";
    upMove.style.zIndex = "5";
    moveContainer.appendChild(upMove);

    upMove.onclick = function() {
        pixelPosition.y -= 1;
        updatePixel();
    };

    rightMove = document.createElement("i");
    rightMove.style.position = "absolute";
    rightMove.className = "fa-solid fa-arrow-right";
    rightMove.style.color = "#fff";
    rightMove.style.left = (50)+"px";
    rightMove.style.top = (25)+"px";
    rightMove.style.width = (25)+"px";
    rightMove.style.height = (25)+"px";
    rightMove.style.zIndex = "5";
    moveContainer.appendChild(rightMove);

    rightMove.onclick = function() {
        pixelPosition.x += 1;
        updatePixel();
    };

    downMove = document.createElement("i");
    downMove.style.position = "absolute";
    downMove.className = "fa-solid fa-arrow-down";
    downMove.style.color = "#fff";
    downMove.style.left = (25)+"px";
    downMove.style.top = (50)+"px";
    downMove.style.width = (25)+"px";
    downMove.style.height = (25)+"px";
    downMove.style.zIndex = "5";
    moveContainer.appendChild(downMove);

    downMove.onclick = function() {
        pixelPosition.y += 1;
        updatePixel();
    };

    buttonOpen = document.createElement("i");
    buttonOpen.style.position = "absolute";
    buttonOpen.className = "";
    buttonOpen.style.color = "#fff";
    buttonOpen.style.left = ((sw/2)+75)+"px";
    buttonOpen.style.top = ((sh/2)+225)+"px";
    buttonOpen.style.width = (75)+"px";
    buttonOpen.style.height = (75)+"px";
    buttonOpen.style.borderRadius = "50%";
    buttonOpen.style.outline = "2px solid #fff";
    buttonOpen.style.zIndex = "5";
    document.body.appendChild(buttonOpen);

    buttonOpen.onclick = function() {
        paintPixel();
    };

    color = document.createElement("div");
    color.style.position = "absolute";
    color.style.background = "yellow";
    color.style.left = ((sw/2)-162.5)+"px";
    color.style.top = (((sh/2)-((300*0.8)/2)))+"px";
    color.style.width = (25)+"px";
    color.style.height = (25)+"px";
    color.style.zIndex = "5";
    color.onclick = function() {
        Coloris({
            el: "#color-picker",
            alpha: true,
            onChange: (color, input) => {
                pixelColor = color;
                input.elem.style.background = color;
            }
        });
        colorInput.dispatchEvent(
        new Event('open', { bubbles: true }));
    };
    document.body.appendChild(color);

    colorInput = document.createElement("input");
    colorInput.style.position = "absolute";
    colorInput.style.display = "none";
    colorInput.id = "color-picker";
    colorInput.elem = color;
    colorInput.style.background = "#ccc";
    colorInput.style.left = ((sw/2)-162.5)+"px";
    colorInput.style.top = (((sh/2)-((300*0.8)/2))+(35))+"px";
    colorInput.style.width = (25)+"px";
    colorInput.style.height = (25)+"px";
    colorInput.style.zIndex = "5";
    document.body.appendChild(colorInput);

    landscape = false;
    motion = true;
    gyroUpdated = function(gyro) {
        landscape = (gyro.accX > 5);
        if (landscape)
        moveContainer.style.transform = "rotateZ(90deg)";
        else
        moveContainer.style.transform = "rotateZ(0deg)";
        updatePixel();

        if (gyro.accZ < 0) {
            var accZ = Math.abs(gyro.accZ);
            resolution = Math.floor((1+accZ)*10);
            baseTile.innerText = resolution+"x";
            baseCanvas.width = resolution;
            baseCanvas.height = resolution;
            drawSquare();
        }
    };
    moveLoop();

    camera.onplay = function() {
        console.log("onplay");
        var frame = { width: 50, height: 50 };
        var content = { width: vw, height: vh };
        frame = resizeFrame(frame, content);

        console.log(frame);
        camera.style.left = ((sw/2)-(frame.width/2))+"px";
        camera.style.top = ((sh/2)-(262.5+(frame.height/2)))+"px";
        camera.style.width = frame.width+"px";
        camera.style.height = frame.height+"px";

        timeStarted = new Date().getTime();
        stopwatch.innerText = "00:00";
        _say("camera connected");
        drawSquare();
    };
});

//"img/island-0.png",
var img_list = [
    "img/human-icon-0.png",
    //"img/human-icon-1.png",
    //"img/human-icon-0.png"
];

var imagesLoaded = false;
var loadImages = function(callback) {
    var count = 0;
    for (var n = 0; n < img_list.length; n++) {
        var img = document.createElement("img");
        img.n = n;
        img.onload = function() {
            count += 1;
            img_list[this.n] = this;
            if (count == img_list.length) {
                imagesLoaded = true;
                callback();
            }
        };
        var rnd = Math.random();
        img.src = img_list[n]+"?f="+rnd;
    }
};

var buttonsPreviousStates = [];
var buttons = [];
var moveLoop = function() {
    var gamepad = navigator.getGamepads()[0];
    buttons = gamepad ? gamepad.buttons : [];

    mapButton(14, "down", function() {
        pixelPosition.x -= 1;
        updatePixel();
    });

    mapButton(12, "down", function() {
        pixelPosition.y -= 1;
        updatePixel();
    });

    mapButton(15, "down", function() {
        pixelPosition.x += 1;
        updatePixel();
    });

    mapButton(13, "down", function() {
        pixelPosition.y += 1;
        updatePixel();
    });

    mapButton(2, "down", function() {
        paintPixel();
        updatePixel();
    });

    saveButtons();
    requestAnimationFrame(moveLoop);
};

var pixelColor = "yellow";
var paintPixel = function(e=false) {
    if (e) {
        var clientX = e.touches[0].clientX;
        var clientY = e.touches[0].clientY;

        pixelPosition.x = Math.floor((clientX-((sw/2)-150))/
        (300/resolution));
        pixelPosition.y = Math.floor((clientY-((sh/2)-150))/
        (300/resolution));
       updatePixel();
    }

    var x = pixelPosition.x;
    var y = pixelPosition.y;
    if (landscape) {
        x = (resolution-1)-pixelPosition.y;
        y = pixelPosition.x;
    }

    var ctx = canvas1.getContext("2d");
    var ctxPortal = canvasPortal.getContext("2d");

    ctx.clearRect(Math.round(x*(300/resolution)), 
    Math.round(y*(300/resolution)), 
    Math.round(300/resolution), Math.round(300/resolution));

    ctxPortal.fillStyle = pixelColor;
    ctxPortal.fillRect(Math.round(x*(300/resolution)), 
    Math.round(y*(300/resolution)), 
    Math.round(300/resolution), Math.round(300/resolution));
};

var updatePixel = function() {
    pixelPosition.x = Math.clip(pixelPosition.x, (resolution-1));
    pixelPosition.y = Math.clip(pixelPosition.y, (resolution-1));

    var x = pixelPosition.x;
    var y = pixelPosition.y;
    if (landscape) {
        x = (resolution-1)-pixelPosition.y;
        y = pixelPosition.x;
    }

    targetPixel.style.left = ((sw/2)-((300*0.8)/2))+
    (x*((300/resolution)*0.8))+"px";
    targetPixel.style.top = (((sh/2)-((300*0.8)/2)))+
    (y*((300/resolution)*0.8))+"px";
    targetPixel.style.width = ((300/resolution)*0.8)+"px";
    targetPixel.style.height = ((300/resolution)*0.8)+"px";
};

var mapButton = function(n, action, callback) {
    if (buttons.length == 0) return;
    if (action == "down" && 
    buttons[n].pressed && 
    (buttonsPreviousStates.length == 0 || 
    !buttonsPreviousStates[n].pressed)) {
        callback();
    }
    if (action == "up" && 
    !buttons[n].pressed && 
    (buttonsPreviousStates.length == 0 || 
    buttonsPreviousStates[n].pressed)) {
        callback();
    }
};

var saveButtons = function() {
    buttonsPreviousStates = [];
    for (var n = 0; n < buttons.length; n++) {
        var obj = {
            pressed: buttons[n].pressed,
            value: buttons[n].value
        };
        buttonsPreviousStates.push(obj);
    }
};

var resolution = 10;
var drawSquare = function() {
    var ctx = layerNo == 0 ? 
    canvas.getContext("2d") : 
    canvas1.getContext("2d");

    var resolutionCanvas = document.createElement("canvas");
    resolutionCanvas.imageSmoothingEnabled = false;
    resolutionCanvas.width = resolution;
    resolutionCanvas.height = resolution;

    var resolutionCtx = resolutionCanvas.getContext("2d");
    var format = fitImageCover(camera, resolutionCanvas);
    if (!preloaded && deviceNo == 0) {
        resolutionCtx.save();
        resolutionCtx.translate(format.width, 0);
        resolutionCtx.scale(-1, 1);
    }
    if (preloaded)
    resolutionCtx.drawImage(img_list[0], format.left, format.top, format.width, format.height);
    else
    resolutionCtx.drawImage(camera, format.left, format.top, format.width, format.height);
    resolutionCtx.restore();

    ctx.clearRect(0, 0, 300, 300);
    if (layerNo < 2) {
        ctx.drawImage(resolutionCanvas, 0, 0, 300, 300);
    }
    else {
        var centeredCanvas = document.createElement("canvas");
        centeredCanvas.imageSmoothingEnabled = false;
        centeredCanvas.width = resolution;
        centeredCanvas.height = resolution;

        var centeredCtx = centeredCanvas.getContext("2d");
        var format = fitImageCover(centeredCanvas, canvas);
        if (!preloaded && deviceNo == 0) {
            centeredCtx.save();
            centeredCtx.translate(format.width, 0);
            centeredCtx.scale(-1, 1);
        }
        if (preloaded)
        centeredCtx.drawImage(img_list[0], format.left, format.top, format.width, format.height);
        else
        centeredCtx.drawImage(canvas, format.left, format.top, format.width, format.height);
        centeredCtx.restore();

        anaglyph(centeredCanvas, resolutionCanvas);
        ctx.drawImage(resolutionCanvas, 0, 0, 300, 300);
    }

    navigator.vibrate(500);

    canvas.style.outlineOffset = 
    (5)+"px";
    canvas.style.outline = 
    (5)+"px solid limegreen";
    //_say("image created");
};

var clipLayers = function() {
    var finalCanvas = document.createElement("canvas");
    finalCanvas.imageSmoothingEnabled = false;
    finalCanvas.width = 300;
    finalCanvas.height = 300;

    var finalCtx = finalCanvas.getContext("2d");
    finalCtx.drawImage(canvas, 0, 0, 300, 300);
    finalCtx.drawImage(canvas1, 0, 0, 300, 300);

    return finalCanvas.toDataURL();
};

var restoreCanvas = function() {
    var pixelCount = resolution*resolution;
    if (layerNo == 0) {
        var ctxPortal = canvasPortal.getContext("2d");
        ctxPortal.clearRect(0, 0, 300, 300);
    }

    var ctx = layerNo == 0 ? 
    canvas.getContext("2d") : 
    canvas1.getContext("2d");

    ctx.clearRect(0, 0, 300, 300);

    for (var n = 0; n < pixelCount; n++) {
        var x = n % resolution;
        var y = Math.floor(n / resolution);

        var r = Math.floor(Math.random()*255);
        var g = Math.floor(Math.random()*255);
        var b = Math.floor(Math.random()*255);
        var fillStyle = "rgba("+r+","+g+","+b+",0.5)";
        ctx.fillStyle = fillStyle;
        ctx.fillRect(
        Math.round(x*(300/resolution)),
        Math.round(y*(300/resolution)),
        Math.round((300/resolution)),
        Math.round((300/resolution)));
    }
};

var anaglyph = function(centeredCanvas, destinationCanvas) {
    var centeredCtx = centeredCanvas.getContext("2d");
    var centeredImageData = 
    centeredCtx.getImageData(0, 0, resolution, resolution);
    var centeredArray = centeredImageData.data;

    var destinationCtx = destinationCanvas.getContext("2d");
    var destinationImageData = 
    destinationCtx.getImageData(0, 0, resolution, resolution);
    var destinationArray = destinationImageData.data;

    var newArray = new Uint8ClampedArray(centeredArray);
    for (var n = 0; n < centeredArray.length; n += 4) {
        newArray[n + 0] =  0.7* destinationArray[n + 1] + 
        0.3* centeredCanvas[n + 2]; // red
        newArray[n + 1] = 1.0* centeredArray[n + 1]  // green
        newArray[n + 2] = 1.0 * centeredArray[n + 2]; // blue
        newArray[n + 3] = centeredArray[n + 3] ; // alpha
    };

    var newImageData = new ImageData(newArray, 
    centeredArray.width, centeredArray.height);

    destinationCtx.putImageData(newImageData);
};

var formatTime = function() {
    var time = new Date().getTime() - timeStarted;
    var minutes = Math.floor((time/1000)/60);
    var seconds = Math.floor(time/1000)%60;
    stopwatch.innerText = 
    minutes.toString().padStart(2, "0")+":"+
    seconds.toString().padStart(2, "0");
};

var language = "en-US";
var _say = function(text) {
     var msg = new SpeechSynthesisUtterance();
     msg.lang = language;
     msg.text = text;
     window.speechSynthesis.speak(msg);
};