var audio = new Audio("audio/phone-lock.wav");
var alarm = new Audio("audio/battleship-alarm.wav");
var coin = new Audio("audio/coin.wav");

var sw = window.innerWidth;
var sh = window.innerHeight;

var audioBot = false;
var playerId = new Date().getTime();

var canvasBackgroundColor = "rgba(255,255,255,1)";
var backgroundColor = "rgba(50,50,65,1)";
var buttonColor = "rgba(75,75,90,1)";

// Botão de gravação
$(document).ready(function() {
    $("html, body").css("overscroll-behavior", "none");
    $("html, body").css("background", backgroundColor);
    $("#title").css("font-size", "15px");
    $("#title").css("color", "#fff");

    $("#title")[0].innerText = "OPEN IMAGE EDITOR v0.1";

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
    canvas.style.background = canvasBackgroundColor;
    canvas.width = 300;
    canvas.height = 300;
    canvas.style.left = ((sw/2)-150)+"px";
    canvas.style.top = ((sh/2)-150)+"px";
    canvas.style.width = (300)+"px";
    canvas.style.height = (300)+"px";
    canvas.style.transform = "scale(0.8)";
    canvas.style.boxShadow = "0px 0px 25px #000";
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

    canvasEffect = document.createElement("canvas");
    canvasEffect.style.position = "absolute";
    canvasEffect.width = 300;
    canvasEffect.height = 300;
    canvasEffect.style.left = ((sw/2)-150)+"px";
    canvasEffect.style.top = ((sh/2)-150)+"px";
    canvasEffect.style.width = (300)+"px";
    canvasEffect.style.height = (300)+"px";
    canvasEffect.style.transform = "scale(0.8)";
    canvasEffect.style.zIndex = "5";
    canvasEffect.ontouchstart = paintPixel;
    canvasEffect.ontouchmove = paintPixel;
    document.body.appendChild(canvasEffect);

    canvasEffect.getContext("2d").imageSmoothingEnabled = false;

    canvasGrid = document.createElement("canvas");
    canvasGrid.style.position = "absolute";
    canvasGrid.width = 300;
    canvasGrid.height = 300;
    canvasGrid.style.left = ((sw/2)-150)+"px";
    canvasGrid.style.top = ((sh/2)-150)+"px";
    canvasGrid.style.width = (300)+"px";
    canvasGrid.style.height = (300)+"px";
    canvasGrid.style.transform = "scale(0.8)";
    canvasGrid.style.zIndex = "5";
    document.body.appendChild(canvasGrid);

    canvasGrid.getContext("2d").imageSmoothingEnabled = false;

    canvasTool = document.createElement("canvas");
    canvasTool.style.position = "absolute";
    canvasTool.width = 300;
    canvasTool.height = 300;
    canvasTool.style.left = ((sw/2)-150)+"px";
    canvasTool.style.top = ((sh/2)-150)+"px";
    canvasTool.style.width = (300)+"px";
    canvasTool.style.height = (300)+"px";
    canvasTool.style.transform = "scale(0.8)";
    canvasTool.style.zIndex = "5";
    canvasTool.ontouchstart = paintPixel;
    canvasTool.ontouchmove = paintPixel;
    document.body.appendChild(canvasTool);

    canvasTool.getContext("2d").imageSmoothingEnabled = false;

    /*canvas.style.outlineOffset = 
    (5)+"px";
    canvas.style.outline = 
    (5)+"px solid red";*/

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
    fileName.style.color = "#fff";
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
    inputDevice.style.background = buttonColor;
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
        if (cameraOn) {
            deviceNo = (deviceNo+1) < (videoDevices.length-1) ? 
            (deviceNo+1) : 0;
        }

        startCamera();

        inputDevice.innerText = "device: "+deviceNo;
        camera.style.transform = deviceNo == 0 ? 
        "rotateY(-180deg)" : "rotateY(0deg)";
    };

    layerNo = 0;
    layerTile = document.createElement("span");
    layerTile.style.position = "absolute";
    layerTile.style.background = buttonColor;
    layerTile.style.fontSize = (15)+"px";
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
        layerNo = (layerNo+1) < (5) ? 
        (layerNo+1) : 0;

        if (layerNo < 2)
        layerTile.innerText = "layer no: "+layerNo;
        else if (layerNo == 2)
        layerTile.innerText = "3D";
        else if (layerNo == 3)
        layerTile.innerText = "Interleaved";
        else if (layerNo == 4)
        layerTile.innerText = "Interleaved XY";

        if (layerNo == 0) {
            canvas.style.display = "initial";
            canvasPortal.style.display = "initial";
            canvas1.style.display = "none";
            canvasEffect.style.display = "none";
        }
        else if (layerNo == 1) {
            canvas.style.display = "initial";
            canvasPortal.style.display = "none";
            canvas1.style.display = "initial";
            canvasEffect.style.display = "none";
        }
        else if (layerNo == 2) {
            canvas.style.display = "none";
            canvasPortal.style.display = "none";
            canvas1.style.display = "none";
            canvasEffect.style.display = "initial";
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
    author.innerText = "GITHUB";
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

    author.onclick = function() {
        window.open(
        "https://github.com/lucasduartedeveloper/genius/tree/main/pyramid-fill", "_blank");
    };

    githubIcon = document.createElement("img");
    githubIcon.style.position = "absolute";
    githubIcon.style.background = "#fff";
    githubIcon.src = "https://icons.veryicon.com/png/o/miscellaneous/mirror-icon/github-65.png";
    githubIcon.width = resolution;
    githubIcon.height = resolution;
    githubIcon.style.left = ((sw/2)+135)+"px";
    githubIcon.style.top = ((sh/2)+50)+"px";
    githubIcon.style.width = (25)+"px";
    githubIcon.style.height = (25)+"px";
    githubIcon.style.borderRadius = "50%";
    githubIcon.style.transform = "rotateZ(-90deg)";
    githubIcon.style.zIndex = "5";
    document.body.appendChild(githubIcon);

    baseTile = document.createElement("span");
    baseTile.innerText = resolution+"x";
    baseTile.style.lineHeight = (100)+"px";
    baseTile.style.position = "absolute";
    baseTile.style.background = buttonColor;
    baseTile.style.color = "#fff";
    baseTile.style.left = (0)+"px";
    baseTile.style.top = (0)+"px";
    baseTile.style.width = (100)+"px";
    baseTile.style.height = (100)+"px";
    //baseTile.style.transform = "scale(0.8)";
    baseTile.style.zIndex = "5";
    document.body.appendChild(baseTile);

    baseTile.onclick= function(e) {
        /*canvas.style.outlineOffset = 
        (5)+"px";
        canvas.style.outline = 
        (5)+"px solid yellow";*/

        timeStarted = new Date().getTime();
        stopwatch.innerText = "00:00";

        updateGrid();
        drawSquare();
    };

    loadImages(function() {
        console.log("images loaded");
    });

    preloaded = location.href.includes("192");
    switchBackground = document.createElement("span");
    switchBackground.style.position = "absolute";
    switchBackground.style.background = buttonColor;
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

    var setResolution = function(n) {
        resolution = n < 0 ? 
        ((resolution/5)-1)*5 :
        ((resolution/5)+1)*5;
        resolution = resolution < 5 ? 5 : resolution;
        updateGrid();
        updatePixel();
        baseTile.innerText = resolution+"x";
        baseCanvas.width = resolution;
        baseCanvas.height = resolution;
        camera.width = resolution;
        camera.height = resolution;
        fileName.innerText = resolution+"x_zoom.png";
    };

    leftArrow.onclick = function() {
        setResolution(-1);
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
        setResolution(1);
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

    auxName = document.createElement("span");
    auxName.style.position = "absolute";
    auxName.innerText = "DIGITE";
    auxName.style.textAlign = "left";
    auxName.style.fontSize = "20px";
    auxName.style.color = "#fff";
    auxName.style.left = ((sw/2)-((300*0.8)/2))+"px";
    auxName.style.top = ((sh/2)-((300*0.8)/2)-35)+"px";
    auxName.style.width = (100)+"px";
    auxName.style.height = (25)+"px";
    auxName.style.zIndex = "5";
    document.body.appendChild(auxName);

    auxName.onclick = function() {
        auxName.innerText = prompt();
    };

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
    targetPixel.innerText = "0";
    targetPixel.style.color = "#000";
    targetPixel.style.fontSize = ((300/resolution)*0.8)+"px";
    targetPixel.style.lineHeight = ((300/resolution)*0.8)+"px";
    targetPixel.style.left = ((sw/2)-((300*0.8)/2))+
    (pixelPosition.x*((300/resolution)*0.8))+"px";
    targetPixel.style.top = (((sh/2)-((300*0.8)/2)))+
    (pixelPosition.y*((300/resolution)*0.8))+"px";
    targetPixel.style.width = ((300/resolution)*0.8)+"px";
    targetPixel.style.height = ((300/resolution)*0.8)+"px";
    targetPixel.style.outline = "1px solid lightblue";
    targetPixel.style.zIndex = "5";
    document.body.appendChild(targetPixel);

    leftMenuOpen = false;
    leftMenu = document.createElement("div");
    leftMenu.style.position = "absolute";
    leftMenu.style.background = buttonColor;
    leftMenu.style.left = -((112.5-(112.5*0.8))/2)+"px";
    leftMenu.style.top = ((sh/2)-150)+"px";
    leftMenu.style.width = (112.5)+"px";
    leftMenu.style.height = (300)+"px";
    leftMenu.style.transform = "scale(0.8)";
    leftMenu.style.borderRadius = "0px 25px 25px 0px";
    leftMenu.style.zIndex = "10";
    document.body.appendChild(leftMenu);

    closeButton = document.createElement("i");
    closeButton.style.position = "absolute";
    closeButton.className = "fa-solid fa-close";
    closeButton.style.color = "#fff";
    closeButton.style.left = 75+"px";
    closeButton.style.top = 12.5+"px";
    closeButton.style.width = (25)+"px";
    closeButton.style.height = (25)+"px";
    closeButton.style.zIndex = "5";
    leftMenu.appendChild(closeButton);

    closeButton.onclick = function() {
        leftMenuOpen = false;
        leftMenu.style.display = "none";
    };

    undoButton = document.createElement("i");
    undoButton.style.position = "absolute";
    undoButton.className = "fa-solid fa-trash";
    undoButton.style.color = "#fff";
    undoButton.style.left = 12.5+"px";
    undoButton.style.top = 162.5+"px";
    undoButton.style.width = (25)+"px";
    undoButton.style.height = (25)+"px";
    undoButton.style.zIndex = "5";
    leftMenu.appendChild(undoButton);

    undoButton.onclick = function() {
        restoreCanvas();
    };

    clipButton = document.createElement("i");
    clipButton.style.position = "absolute";
    clipButton.className = "fa-solid fa-share";
    clipButton.style.color = "#fff";
    clipButton.style.left = 12.5+"px";
    clipButton.style.top = 125+"px";
    clipButton.style.width = (25)+"px";
    clipButton.style.height = (25)+"px";
    clipButton.style.zIndex = "5";
    leftMenu.appendChild(clipButton);

    clipButton.onclick = function() {
        ws.send("PAPER|"+playerId+"|image-data|"+clipLayers());
    };

    locked = true;
    offsetZ = 0;
    ropeButton = document.createElement("i");
    ropeButton.style.position = "absolute";
    ropeButton.className = "fa-solid fa-lock";
    ropeButton.style.color = "#fff";
    ropeButton.style.left = 12.5+"px";
    ropeButton.style.top = 200+"px";
    ropeButton.style.width = (25)+"px";
    ropeButton.style.height = (25)+"px";
    ropeButton.style.zIndex = "5";
    leftMenu.appendChild(ropeButton);

    ropeButton.onclick = function() {
        locked = !locked;
        if (locked) {
            offsetZ = gyro.accZ;
            ropeButton.className = "fa-solid fa-lock";
        }
        else {
            offsetZ = 0;
            ropeButton.className = "fa-solid fa-unlock";
        }
    };

    polygonMode = 0;
    polygonButton = document.createElement("i");
    polygonButton.style.position = "absolute";
    polygonButton.className = "fa-solid fa-draw-polygon";
    polygonButton.style.color = "#333";
    polygonButton.style.left = 12.5+"px";
    polygonButton.style.top = 87.5+"px";
    polygonButton.style.width = (25)+"px";
    polygonButton.style.height = (25)+"px";
    polygonButton.style.zIndex = "5";
    leftMenu.appendChild(polygonButton);

    polygonButton.onclick = function() {
        polygonMode = (polygonMode+1) < 3 ? 
        (polygonMode+1) : 0;
        if (polygonMode == 1) {
            polygonButton.style.color = "#fff";
        }
        else if (polygonMode == 2) {
            polygonButton.style.color = "blue";
        }
        else {
            polygonButton.style.color = "#333";
            polygon = [];
            polygonConnectButton.style.display = "none";
            var ctxTool = canvasTool.getContext("2d");
            ctxTool.clearRect(0, 0, 300, 300);
        }
    };

    polygonConnectButton = document.createElement("i");
    polygonConnectButton.style.position = "absolute";
    polygonConnectButton.style.display = "none";
    polygonConnectButton.className = 
    "fa-solid fa-circle-nodes";
    polygonConnectButton.style.color = "#fff";
    polygonConnectButton.style.left = 12.5+"px";
    polygonConnectButton.style.top = 50+"px";
    polygonConnectButton.style.width = (25)+"px";
    polygonConnectButton.style.height = (25)+"px";
    polygonConnectButton.style.zIndex = "5";
    leftMenu.appendChild(polygonConnectButton);

    polygonConnectButton.onclick = function() {
        polygon.push(polygon[0]);
        pixelPosition.x = polygon[0].x;
        pixelPosition.y = polygon[0].y;
        paintPixel();
        updatePixel();
    };

    gridButton = document.createElement("i");
    gridButton.style.position = "absolute";
    gridButton.className = 
    "fa-solid fa-border-all";
    gridButton.style.color = "#333";
    gridButton.style.left = 12.5+"px";
    gridButton.style.top = 12.5+"px";
    gridButton.style.width = (25)+"px";
    gridButton.style.height = (25)+"px";
    gridButton.style.zIndex = "5";
    leftMenu.appendChild(gridButton);

    gridButton.onclick = function() {
        showGrid = !showGrid;
        if (showGrid)
        gridButton.style.color = "#fff";
        else
        gridButton.style.color = "#333";
        updateGrid();
    };

    menuButton = document.createElement("i");
    menuButton.style.position = "absolute";
    menuButton.className = "fa-solid fa-bars";
    menuButton.style.color = "#fff";
    menuButton.style.left = 12.5+"px";
    menuButton.style.top = (sh/2)+(((300/2)*0.8)-37.5)+"px";
    menuButton.style.width = (25)+"px";
    menuButton.style.height = (25)+"px";
    menuButton.style.zIndex = "5";
    document.body.appendChild(menuButton);

    menuButton.onclick = function() {
        leftMenuOpen = true;
        leftMenu.style.display = "initial";
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
    color.style.background = pixelColor;
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

        if (((gyro.accZ+offsetZ) < 0) && !locked) {
            var accZ = Math.abs(gyro.accZ+offsetZ);
            resolution = Math.floor((1+accZ)*10);
            baseTile.innerText = resolution+"x";
            baseCanvas.width = resolution;
            baseCanvas.height = resolution;
            drawSquare();
        }
    };
    moveLoop();

    redSwitch = 2;
    createSwitch("#f00", (sw/2)-37.5, (sh-50), redSwitch,
    function(active) {
        redSwitch = active;
        drawSquare();
    });
    greenSwitch = 1;
    createSwitch("#0f0", (sw/2), (sh-50), greenSwitch,
    function(active) {
        greenSwitch = active;
        drawSquare();
    });
    blueSwitch = 2;
    createSwitch("#00f", (sw/2)+37.5, (sh-50), blueSwitch,
    function(active) {
        blueSwitch = active;
        drawSquare();
    });

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
    "img/human-icon-4.png",
    //"img/human-icon-0.png",
    //"img/human-product-0.png",
    //"img/15x15.png",
    //"img/75x_zoom.png",
    //"img/human-icon-3.png",
    //"img/human-icon-1.png",
    //"img/human-icon-2.png",
];

var createSwitch = function(background, x, y, value, callback) {
    var switchBackground = document.createElement("span");
    switchBackground.style.position = "absolute";
    switchBackground.style.boxShadow = 
    "inset 0px 0px 5px black";
    switchBackground.style.background = background;
    switchBackground.style.color = "#fff";
    switchBackground.style.left = (x-12.5)+"px";
    switchBackground.style.top = (y-25)+"px";
    switchBackground.style.width = (25)+"px";
    switchBackground.style.height = (75)+"px";
    switchBackground.style.transform = "scale(0.8)";
    switchBackground.style.zIndex = "5";
    document.body.appendChild(switchBackground);

    var switchButton = document.createElement("span");
    switchButton.style.position = "absolute";
    switchButton.style.boxShadow = 
    "0px 0px 5px black";
    switchButton.style.background = "#fff";
    switchButton.style.fontSize = "20px";
    switchButton.style.lineHeight = "20px";
    switchButton.style.color = "#000";
    switchButton.innerText = value;
    switchButton.style.left = (2.5)+"px";
    if (value == 2)
    switchButton.style.top = (2.5)+"px";
    else if (value == 1)
    switchButton.style.top = (27.5)+"px";
    else if (value == 0)
    switchButton.style.top = (52.5)+"px";
    switchButton.style.width = (20)+"px";
    switchButton.style.height = (20)+"px";
    switchButton.style.zIndex = "5";
    switchBackground.appendChild(switchButton);

    switchBackground.button = switchButton;
    switchButton.active = 2;
    switchButton.lastActive = 2;

    switchBackground.onclick = function() {
        this.button.active = 
        (this.button.active == 2) || (this.button.active == 0) ? 
        1 : ((this.button.lastActive == 0) ? 2 : 0) ;

        if (this.button.active == 2)
        switchButton.style.top = (2.5)+"px";
        else if (this.button.active == 1)
        switchButton.style.top = (27.5)+"px";
        else if (this.button.active == 0)
        switchButton.style.top = (52.5)+"px";

        if (this.button.active != 1)
        switchButton.lastActive = this.button.active;

        this.button.innerText = this.button.active;
        callback(this.button.active);
    };
};

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

var polygon = [];
var pixelColor = "rgba(255, 0, 0, 0.5)";
var paintPixel = function(e=false) {
    if (e) {
        var clientX = e.touches[0].clientX;
        var clientY = e.touches[0].clientY;

        pixelPosition.x = Math.floor((clientX-((sw/2)-(300/2)*0.8))/
        ((300/resolution)*0.8));
        pixelPosition.y = Math.floor((clientY-((sh/2)-(300/2)*0.8))/
        ((300/resolution)*0.8));
       updatePixel();
    }

    var x = pixelPosition.x;
    var y = pixelPosition.y;
    if (landscape) {
        x = (resolution-1)-pixelPosition.y;
        y = pixelPosition.x;
    }

    if (polygonMode > 0) {
        polygon.push({ x: x, y: y });

        var ctxTool = canvasTool.getContext("2d");
        ctxTool.clearRect(0, 0, 300, 300);
        ctxTool.strokeStyle = "orange";
        ctxTool.lineWidth = 1;
        ctxTool.lineCap = "butt";
        ctxTool.lineJoin = "mitter";

        if (polygon.length > 1)
        polygonConnectButton.style.display = "initial";

        ctxTool.beginPath();
        if (polygon.length > 1)
        for (var n = 1; n < polygon.length; n++) {;
            ctxTool.moveTo(
            Math.round((polygon[n-1].x*(300/resolution))+
            ((300/resolution)/2)), 
            Math.round((polygon[n-1].y*(300/resolution))+
            ((300/resolution)/2)));
            ctxTool.lineTo(
            Math.round((polygon[n].x*(300/resolution))+
            ((300/resolution)/2)), 
            Math.round((polygon[n].y*(300/resolution))+
            ((300/resolution)/2)));
        }
        ctxTool.stroke();

        ctxTool.fillStyle = "orange";
        for (var n = 0; n < polygon.length; n++) {;
            ctxTool.beginPath();
            ctxTool.arc(
            Math.round((polygon[n].x*(300/resolution))+
            ((300/resolution)/2)), 
            Math.round((polygon[n].y*(300/resolution))+
            ((300/resolution)/2)), 5, 
            0, Math.PI*2);
            ctxTool.fill();
        }

        if (polygon[0].x == polygon[polygon.length-1].x && 
        polygon[0].y == polygon[polygon.length-1].y &&
        polygon.length > 1) {
            console.log("polygon closed");
            var ctxTool = canvasTool.getContext("2d");
            if (polygonMode == 1) {
                ctxTool.clearRect(0, 0, 300, 300);
            }

            var resolutionCanvas = document.
            createElement("canvas");
            resolutionCanvas.imageSmoothingEnabled = false;
            resolutionCanvas.width = resolution;
            resolutionCanvas.height = resolution;

            var ctxResolution = resolutionCanvas.getContext("2d");
            if (polygonMode == 1) {
                ctxResolution.lineWidth = 1;
                ctxResolution.strokeStyle = pixelColor;
                ctxResolution.fillStyle = pixelColor;
            }
            else if (polygonMode == 2) {
                ctxResolution.lineWidth = 1;
                ctxResolution.strokeStyle = "yellow";
                ctxResolution.fillStyle = "yellow";
            }
            ctxResolution.beginPath();
            ctxResolution.moveTo(
            Math.round(polygon[0].x+0.5), 
            Math.round(polygon[0].y+0.5));
            for (var n = 1; n < polygon.length; n++) {
                ctxResolution.lineTo(
                Math.round(polygon[n].x+0.5), 
                Math.round(polygon[n].y+0.5));
            }
            ctxResolution.closePath();
            ctxResolution.stroke();
            ctxResolution.fill();

            polygon = [];
            polygonConnectButton.style.display = "none";

            removeBlur(resolutionCanvas);

            var ctxPortal = canvasPortal.getContext("2d");
            ctxPortal.clearRect(0, 0, 300, 300);
            ctxPortal.drawImage(resolutionCanvas, 0, 0, 300, 300);

            listPixels(canvasPortal);
            applyMask(canvas1, canvasPortal);
        }
        else {
            navigator.vibrate(500);
        }
        return;
    }

    var ctx = canvas1.getContext("2d");
    var ctxPortal = canvasPortal.getContext("2d");

    ctx.clearRect(Math.round(x*(300/resolution)), 
    Math.round(y*(300/resolution)), 
    Math.round(300/resolution), Math.round(300/resolution));

    ctxPortal.fillStyle = pixelColor;
    ctxPortal.clearRect(Math.round(x*(300/resolution)), 
    Math.round(y*(300/resolution)), 
    Math.round(300/resolution), Math.round(300/resolution));
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

    var n = (y*resolution)+(x);

    targetPixel.innerText = n;
    targetPixel.style.fontSize = ((300/resolution)*0.8)+"px";
    targetPixel.style.lineHeight = ((300/resolution)*0.8)+"px";

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
    if (layerNo >= 2) {
        applyEffect(layerNo-2);
        return;
    }

    var ctx = layerNo == 0 ? 
    canvas.getContext("2d") : 
    canvas1.getContext("2d");

    var resolutionCanvas = document.createElement("canvas");
    resolutionCanvas.imageSmoothingEnabled = false;
    resolutionCanvas.width = resolution;
    resolutionCanvas.height = resolution;

    var resolutionCtx = resolutionCanvas.getContext("2d");
    if (!preloaded && deviceNo == 0) {
        var image = { width: vw, height: vh };
        var format = fitImageCover(image, resolutionCanvas);
        //console.log(format);
        resolutionCtx.save();
        resolutionCtx.translate(format.width, 0);
        resolutionCtx.scale(-1, 1);
    }
    if (preloaded) {
        var image = { 
            width: img_list[0].width, 
            height: img_list[0].height
        };
        var format = fitImageCover(img_list[0], resolutionCanvas);
        //console.log(format);
        resolutionCtx.drawImage(img_list[0], format.left, format.top, format.width, format.height);
    }
    else {
        var image = { width: vw, height: vh };
        var format = fitImageCover(image, resolutionCanvas);
        //console.log(format);
        resolutionCtx.drawImage(camera, format.left, format.top, format.width, format.height);
        resolutionCtx.restore();
    }

    ctx.clearRect(0, 0, 300, 300);
    ctx.drawImage(resolutionCanvas, 0, 0, 300, 300);

    navigator.vibrate(500);

    /*canvas.style.outlineOffset = 
    (5)+"px";
    canvas.style.outline = 
    (5)+"px solid limegreen";*/
    //_say("image created");
};

var applyEffect = function(n) {
    var ctx = canvasEffect.getContext("2d");

    var effect;
    if (n == 0)
    effect = anaglyph(canvas, canvas1);
    else if (n == 1)
    effect = interleaved(canvas, canvas1);
    else if (n == 2)
    effect = interleavedBothAxis(canvas, canvas1);

    ctx.drawImage(effect, 0, 0, 300, 300);
};

var showGrid = false;
var updateGrid = function() {
    var ctxGrid = canvasGrid.getContext("2d");
    ctxGrid.clearRect(0, 0, 300, 300);
    if (!showGrid) return;
    ctxGrid.lineWidth = 1;
    ctxGrid.strokeStyle = "#555";
    for (var n = 0; n < (resolution+1); n++) {
        ctxGrid.beginPath();
        ctxGrid.moveTo(0, (n*(300/resolution)));
        ctxGrid.lineTo(300, (n*(300/resolution)));
        ctxGrid.stroke();

        ctxGrid.beginPath();
        ctxGrid.moveTo((n*(300/resolution)), 0);
        ctxGrid.lineTo((n*(300/resolution)), 300);
        ctxGrid.stroke();
    }
};

var clipLayers = function() {
    var finalCanvas = document.createElement("canvas");
    finalCanvas.imageSmoothingEnabled = false;
    finalCanvas.width = 300;
    finalCanvas.height = 300;

    var finalCtx = finalCanvas.getContext("2d");
    finalCtx.drawImage(canvas, 0, 0, 300, 300);
    finalCtx.drawImage(canvas1, 0, 0, 300, 300);
    finalCtx.drawImage(canvasEffect, 0, 0, 300, 300);

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

    ctx.fillStyle = layerNo == 0 ? "#000" : "#fff";
    ctx.fillRect(0, 0, 300, 300);

    return;
    if (layerNo == 1) {
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
    }
};

var applyMask = function(destinationCanvas, maskCanvas) {
    var maskCtx = maskCanvas.getContext("2d");
    var maskImageData = 
    maskCtx.getImageData(0, 0, 300, 300);
    var maskArray = maskImageData.data;

    var destinationCtx = destinationCanvas.getContext("2d");
    var destinationImageData = 
    destinationCtx.getImageData(0, 0, 300, 300);
    var destinationArray = destinationImageData.data;

    var preserveCount = 0;
    var newArray = new Uint8ClampedArray(maskArray.length);

    for (var n = 0; n < newArray.length; n += 4) {
        if (!(maskArray[n] == 255 &&
        maskArray[n+1] == 0 &&
        maskArray[n+2] == 0 &&
        maskArray[n+3] == 128)) {
            newArray[n + 0] = destinationArray[n + 0]; // red
            newArray[n + 1] = destinationArray[n + 1]; // green
            newArray[n + 2] = destinationArray[n + 2]; // blue
            newArray[n + 3] = destinationArray[n + 3]; // alpha
            preserveCount += 1;
        }
    };

    //destinationCtx.clearRect(0, 0, 300, 300);

    var newImageData = new ImageData(newArray, 
    destinationImageData.width, destinationImageData.height);

    destinationCtx.putImageData(newImageData, 0, 0);
    console.log("preserved "+preserveCount+" pixels");
};

var listPixels = function(canvas) {
    var ctx = canvas.getContext("2d");
    var imageData = 
    ctx.getImageData(0, 0, 300, 300);
    var imageArray = imageData.data;

    var visibleCount = 0;
    var newArray = new Uint8ClampedArray(imageArray);
    for (var n = 0; n < imageArray.length; n += 4) {
        if (!(newArray[n] == 0 &&
        newArray[n+1] == 0 &&
        newArray[n+2] == 0 &&
        newArray[n+3] == 0)) {
            /*console.log("pixel "+n+":", 
            newArray[n],
            newArray[n+1],
            newArray[n+2],
            newArray[n+3]);*/
            visibleCount += 1;
        }
    };

    console.log("selected "+visibleCount+" pixels");
}

var removeBlur = function(destinationCanvas) {
    var destinationCtx = destinationCanvas.getContext("2d");
    var destinationImageData = 
    destinationCtx.getImageData(0, 0, 300, 300);
    var destinationArray = destinationImageData.data;

    var newArray = new Uint8ClampedArray(destinationArray);
    for (var n = 0; n < destinationArray.length; n += 4) {
        if ((destinationArray[n] == 255 &&
        destinationArray[n+1] == 0 &&
        destinationArray[n+2] == 0 &&
        destinationArray[n+3] == 128)) {
            newArray[n + 0] = destinationArray[n + 0]; // red
            newArray[n + 1] = destinationArray[n + 1]; // green
            newArray[n + 2] = destinationArray[n + 2]; // blue
            newArray[n + 3] = destinationArray[n + 3]; // alpha
        }
        else if ((destinationArray[n] == 255 &&
        destinationArray[n+1] == 255 &&
        destinationArray[n+2] == 0 &&
        destinationArray[n+3] == 255)) {
            newArray[n + 0] = 0; // red
            newArray[n + 1] = 0; // green
            newArray[n + 2] = 0 // blue
            newArray[n + 3] = 0; // alpha
        }
        else if (destinationArray[n+3] > 128) {
            newArray[n + 0] = 255; // red
            newArray[n + 1] = 0; // green
            newArray[n + 2] = 0 // blue
            newArray[n + 3] = 128; // alpha
        }
        else {
            newArray[n + 0] = 0; // red
            newArray[n + 1] = 0; // green
            newArray[n + 2] = 0; // blue
            newArray[n + 3] = 0; // alpha
        }
    };

    var newImageData = new ImageData(newArray, 
    destinationImageData.width, destinationImageData.height);

    destinationCtx.putImageData(newImageData, 0, 0);
};

var anaglyph = function(centeredCanvas, destinationCanvas) {
    var result = document.createElement("canvas");
    result.width = 300;
    result.height = 300;

    var resultCtx = result.getContext("2d");

    var centeredCtx = centeredCanvas.getContext("2d");
    var centeredImageData = 
    centeredCtx.getImageData(0, 0, 300, 300);
    var centeredArray = centeredImageData.data;

    var destinationCtx = destinationCanvas.getContext("2d");
    var destinationImageData = 
    destinationCtx.getImageData(0, 0, 300, 300);
    var destinationArray = destinationImageData.data;

    var newArray = new Uint8ClampedArray(centeredArray);
    for (var n = 0; n < centeredArray.length; n += 4) {
        newArray[n + 0] = 
        getValue(redSwitch, [1.0, 0.0, 0.0])* centeredArray[n + 0] + 
        getValue(redSwitch, [0.0, 0.0, 1.0])* destinationArray[n + 0]; // red
        newArray[n + 1] = 
        getValue(greenSwitch, [0.0, 0.5, 0.0])* centeredArray[n + 1] + 
        getValue(greenSwitch, [0.0, 0.5, 0.0])* destinationArray[n + 1]; // green
        newArray[n + 2] = 
        getValue(blueSwitch, [0.0, 0.0, 1.0])* centeredArray[n + 2] + 
        getValue(blueSwitch, [1.0, 0.0, 0.0])* destinationArray[n + 2]; // blue
        newArray[n + 3] = centeredArray[n + 3]; // alpha
    };

    var newImageData = new ImageData(newArray, 
    centeredImageData.width, centeredImageData.height);

    resultCtx.putImageData(newImageData, 0, 0);
    return result;
};

var interleaved = function(centeredCanvas, destinationCanvas) {
    var result = document.createElement("canvas");
    result.width = 300;
    result.height = 300;

    var resultCtx = result.getContext("2d");

    for (var n = 0; n < resolution; n++) {
        var odd = (n % 2) == 1;
        var y = n*(300/resolution);

        if (odd) {
            resultCtx.drawImage(destinationCanvas, 0, y, 
            300, (300/resolution), 0, y, 
            300, (300/resolution));
        }
        else {
            resultCtx.drawImage(centeredCanvas, 0, y, 
            300, (300/resolution), 0, y, 
            300, (300/resolution));
        }
    }

    return result;
}

var interleavedBothAxis = function(centeredCanvas, destinationCanvas) {
    var result = document.createElement("canvas");
    result.width = 300;
    result.height = 300;

    var resultCtx = result.getContext("2d");

    resultCtx.drawImage(centeredCanvas, 0, 0, 
    300, 300);

    resultCtx.fillStyle = "rgba(100, 100, 100, 0.5)";

    var region = new Path2D();
    for (var n = 0; n < resolution; n++) {
        var oddLine = (n % 2) == 1;
        var y = n*(300/resolution);

        for (var k = 0; k < resolution; k++) {
            var oddColumn = (k % 2) == 1;
            var x = k*(300/resolution);

            if (oddColumn) continue;
            if (oddLine) {
                region.rect(x, y, (300/resolution), (300/resolution));
            }
            else {
                x += (300/resolution);

                region.rect(x, y, (300/resolution), (300/resolution));
            }
        }
    }
    resultCtx.clip(region);

    resultCtx.drawImage(destinationCanvas, 0, 0, 
    300, 300);

    return result;
}

var getValue = function(n, options) {
    return options[n];
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