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
    document.body.appendChild(canvas);

    baseCanvas = document.createElement("canvas");
    baseCanvas.style.position = "absolute";
    baseCanvas.width = resolution;
    baseCanvas.height = resolution;
    baseCanvas.style.left = (50)+"px";
    baseCanvas.style.top = (0)+"px";
    baseCanvas.style.width = (50)+"px";
    baseCanvas.style.height = (50)+"px";
    //baseCanvas.style.transform = "scale(0.8)";
    baseCanvas.style.zIndex = "5";
    document.body.appendChild(baseCanvas);

    baseCanvasClear = document.createElement("canvas");
    baseCanvasClear.style.position = "absolute";
    baseCanvasClear.width = 50;
    baseCanvasClear.height = 50;
    baseCanvasClear.style.left = (50)+"px";
    baseCanvasClear.style.top = (50)+"px";
    baseCanvasClear.style.width = (50)+"px";
    baseCanvasClear.style.height = (50)+"px";
    //baseCanvas.style.transform = "scale(0.8)";
    baseCanvasClear.style.zIndex = "5";
    document.body.appendChild(baseCanvasClear);

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
        baseTile.innerText = resolution+"x";
        baseCanvas.width = resolution;
        baseCanvas.height = resolution;
        camera.width = resolution;
        camera.height = resolution;
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
        baseTile.innerText = resolution+"x";
        baseCanvas.width = resolution;
        baseCanvas.height = resolution;
        camera.width = resolution;
        camera.height = resolution;
    };

    baseTile.onclick= function(e) {
        var ctxVideoCanvas = canvas.getContext("2d");
        ctxVideoCanvas.clearRect(0, 0, 300, 300);

        canvas.style.outlineOffset = 
        ((300/resolution)/2)+"px";
        canvas.style.outline = 
        ((300/resolution)/2)+"px solid yellow";
        _say("image created");

        if (location.href.includes("192")) {
            if (!imagesLoaded)
            loadImages(function() {
                gameLoop();
            });
            else
            gameLoop();
        }
        else
        startCamera();
    };

    $("*").not("i").css("font-family", "Khand");

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "image-data") {
            var img = document.createdElement("img");
            img.onload = function() {
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, 300, 300);
            };
            img.src = msg[3];
        }
    };

    camera.onplay = function() {
        console.log("onplay");
        _say("camera connected");
        gameLoop();
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

var layer = 0;
var resolution = 50;
var pixelNo = 0;
var gameLoop = function() {
    var pixelCount = resolution*resolution;
    var x = (pixelNo % resolution);
    var y = Math.floor(pixelNo / resolution);

    var ctx = canvas.getContext("2d");
    if (layer == 0) {
    var n = pixelNo * 4;

    var videoCanvas = document.createElement("canvas");
    videoCanvas.width = 300;
    videoCanvas.height = 300;

    var ctxVideoCanvas = videoCanvas.getContext("2d");
    var format = fitImageCover(camera, baseCanvas);
    if (!location.href.includes("192")) {
        ctxVideoCanvas.save();
        ctxVideoCanvas.translate(format.width, 0);
        ctxVideoCanvas.scale(-1, 1);
    }
    if (location.href.includes("192"))
    ctxVideoCanvas.drawImage(img_list[0], format.left, format.top, format.width, format.height);
    else
    ctxVideoCanvas.drawImage(camera, format.left, format.top, format.width, format.height);
    ctxVideoCanvas.restore();

    var cameraImageData = 
    ctxVideoCanvas.getImageData(0, 0, resolution, resolution);

    var fillStyle = 
    "rgba("+cameraImageData.data[n]+", "+
    cameraImageData.data[n+1]+", "+
    cameraImageData.data[n+2]+", 1)";
    /*var fillStyle = 
    "rgba("+imgData.data[n]+", "+imgData.data[n+1]+", "+
    imgData.data[n+2]+", 1)";*/
    ctx.fillStyle = fillStyle;
    //console.log(fillStyle);
    //ctx.fillRect(x*(300/50), y*(300/50), 300/50, 300/50);

    var r = Math.floor(Math.random()*(255/2));
    var g = Math.floor(Math.random()*(255/2));
    var b = Math.floor(Math.random()*(255/2));
    //ctx.fillStyle = "rgba("+r+", "+g+", "+b+", 0.5)";
    ctx.fillRect(x*(300/resolution), y*(300/resolution), 300/resolution, 300/resolution);
    }

    //ctx.putImageData(imgData, 0, 0);
    navigator.vibrate(100);

    pixelNo += 1;
    if (pixelNo == resolution*resolution) {
        //layer += 1;
        pixelNo = 0;

        canvas.style.outlineOffset = 
        ((300/resolution)/2)+"px";
        canvas.style.outline = 
        ((300/resolution)/2)+"px solid limegreen";
        _say("image created");
        ws.send("PAPER|"+playerId+"|image-data|"+canvas.toDataURL());
        return;
    }

    requestAnimationFrame(gameLoop);
};

var language = "en-US";
var _say = function(text) {
     var msg = new SpeechSynthesisUtterance();
     msg.lang = language;
     msg.text = text;
     window.speechSynthesis.speak(msg);
};