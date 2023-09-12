var beepDone = new Audio("audio/beep-done.wav");
var beepMilestone = new Audio("audio/beep-milestone.wav");

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
    $("html, body").css("overflow", "hidden");
    $("html, body").css("background", backgroundColor);
    $("#title").css("font-size", "15px");
    $("#title").css("color", "#fff");

    $("#title")[0].innerText = "";

    distanceView = document.createElement("span");
    distanceView.style.position = "absolute";
    distanceView.style.color = "#fff";
    distanceView.style.fontSize = "25px";
    distanceView.style.fontFamily = "Khand";
    distanceView.innerText = "0";
    distanceView.style.left = ((sw/2)-50)+"px";
    distanceView.style.top = (0)+"px";
    distanceView.style.width = (100)+"px";
    distanceView.style.height = (25)+"px";
    distanceView.style.zIndex = "10";
    //document.body.appendChild(distanceView);

    speedView = document.createElement("span");
    speedView.style.position = "absolute";
    speedView.style.color = "#fff";
    speedView.style.fontSize = "25px";
    speedView.style.fontFamily = "Khand";
    speedView.innerText = "0";
    speedView.style.left = ((sw/2)-50)+"px";
    speedView.style.top = (50)+"px";
    speedView.style.width = (100)+"px";
    speedView.style.height = (25)+"px";
    speedView.style.zIndex = "10";
    //document.body.appendChild(speedView);

    weightView = document.createElement("span");
    weightView.style.position = "absolute";
    weightView.style.color = "#fff";
    weightView.style.fontSize = "25px";
    weightView.style.fontFamily = "Khand";
    weightView.innerText = "0.000 kg";
    weightView.style.left = ((sw/2)-50)+"px";
    weightView.style.top = ((sh/2)-(150)-50)+"px";
    weightView.style.width = (100)+"px";
    weightView.style.height = (25)+"px";
    weightView.style.zIndex = "12";
    document.body.appendChild(weightView);

    weightView.onclick = function() {
        weightView.innerText = prompt()+" kg";
    };

    lineView = document.createElement("div");
    lineView.style.position = "absolute";
    lineView.style.background = "lightblue";
    lineView.style.left = ((sw/2)-50)+"px";
    lineView.style.top = ((sh/2)+250)+"px";
    lineView.style.width = (100)+"px";
    lineView.style.height = (1)+"px";
    lineView.style.zIndex = "12";
    document.body.appendChild(lineView);

    var paused = false;
    pauseView = document.createElement("span");
    pauseView.style.position = "absolute";
    pauseView.style.color = "#fff";
    pauseView.style.fontSize = "25px";
    pauseView.style.fontFamily = "Khand";
    pauseView.innerText = "PAUSE";
    pauseView.style.left = ((sw/2)-50)+"px";
    pauseView.style.top = ((sh/2)+(150)+25)+"px";
    pauseView.style.width = (100)+"px";
    pauseView.style.height = (25)+"px";
    pauseView.style.zIndex = "10";
    //document.body.appendChild(pauseView);

    pauseView.onclick = function() {
        paused = !paused;
        if (paused) {
            pauseView.innerText = "PLAY";
            stopCamera();
        }
        else {
            pauseView.innerText = "PAUSE";
            startCamera();
        }
    };

    deviceNo = 0;
    deviceView = document.createElement("div");
    deviceView.style.position = "absolute";
    deviceView.style.color = "#fff";
    deviceView.innerText = deviceNo;
    deviceView.style.lineHeight = "50px";
    deviceView.style.fontSize = "30px";
    deviceView.style.fontFamily = "Khand";
    deviceView.style.left = ((sw/2)+100)+"px";
    deviceView.style.top = ((sh/2)-150)+"px";
    deviceView.style.width = (50)+"px";
    deviceView.style.height = (50)+"px";
    deviceView.style.border = "1px solid #fff";
    deviceView.style.borderRadius = "50%";
    deviceView.style.scale = "0.9";
    deviceView.style.zIndex = "12";
    document.body.appendChild(deviceView);

    deviceView.onclick = function() {
        deviceNo = (deviceNo+1) < (videoDevices.length-1) ? 
        (deviceNo+1) : 0;
        deviceView.innerText = deviceNo;
        camera.style.transform = (deviceNo == 0) ? 
        "rotateY(-180deg)" : "initial";
    };

    combineView = document.createElement("i");
    combineView.style.position = "absolute";
    combineView.style.color = "#fff";
    combineView.className = "fa-solid fa-circle-nodes";
    combineView.style.lineHeight = "50px";
    combineView.style.fontSize = "30px";
    combineView.style.left = ((sw/2)+100)+"px";
    combineView.style.top = ((sh/2)-100)+"px";
    combineView.style.width = (50)+"px";
    combineView.style.height = (50)+"px";
    combineView.style.border = "1px solid #fff";
    combineView.style.borderRadius = "50%";
    combineView.style.scale = "0.9";
    combineView.style.zIndex = "12";
    document.body.appendChild(combineView);

    combineView.onclick = function() {
        pasteCamera = !pasteCamera;
        if (!pasteCamera)
        combineArray(frameView);
    };

    combineView_effect0 = document.createElement("i");
    combineView_effect0.style.position = "absolute";
    combineView_effect0.style.color = "#fff";
    combineView_effect0.className = "fa-solid fa-bars";
    combineView_effect0.style.lineHeight = "50px";
    combineView_effect0.style.fontSize = "30px";
    combineView_effect0.style.left = ((sw/2)+100)+"px";
    combineView_effect0.style.top = ((sh/2)-50)+"px";
    combineView_effect0.style.width = (50)+"px";
    combineView_effect0.style.height = (50)+"px";
    combineView_effect0.style.border = "1px solid #fff";
    combineView_effect0.style.borderRadius = "50%";
    combineView_effect0.style.scale = "0.9";
    combineView_effect0.style.zIndex = "12";
    document.body.appendChild(combineView_effect0);

    combineView_effect0.onclick = function() {
        pasteCamera = !pasteCamera;
        if (!pasteCamera)
        combineArray_effect0(frameView);
    };

    var delay = 10;
    timerView = document.createElement("div");
    timerView.style.position = "absolute";
    timerView.style.color = "#fff";
    timerView.innerText = delay;
    timerView.style.lineHeight = "50px";
    timerView.style.fontSize = "30px";
    timerView.style.fontFamily = "Khand";
    timerView.style.left = ((sw/2)-25)+"px";
    timerView.style.top = (50)+"px";
    timerView.style.width = (50)+"px";
    timerView.style.height = (50)+"px";
    timerView.style.border = "1px solid #fff";
    timerView.style.borderRadius = "50%";
    timerView.style.scale = "0.9";
    timerView.style.zIndex = "12";
    document.body.appendChild(timerView);

    var timerInterval;
    timerView.onclick = function() {
        colorTurn = 0;
        timerInterval = setInterval(function () {
            delay -= 1;
            timerView.innerText = delay;
            if (delay == 0) {
                drawImage(frameView);
                colorTurn = (colorTurn+1) < 3 ? (colorTurn+1) : 0;
                delay = 10;
                timerView.innerText = delay;
                beepMilestone.play();

                if (colorTurn == 0) {
                    pasteCamera = false;
                    combineArray(frameView);
                    clearInterval(timerInterval);
                    beepDone.play();
                }
                else {
                    beepMilestone.play();
                }
            }
        }, 1000);
    };

    downloadView = document.createElement("i");
    downloadView.style.position = "absolute";
    downloadView.style.color = "#fff";
    downloadView.className = "fa-solid fa-download";
    downloadView.style.lineHeight = "50px";
    downloadView.style.fontSize = "30px";
    downloadView.style.left = ((sw/2)+100)+"px";
    downloadView.style.top = ((sh/2)+100)+"px";
    downloadView.style.width = (50)+"px";
    downloadView.style.height = (50)+"px";
    downloadView.style.border = "1px solid #fff";
    downloadView.style.borderRadius = "50%";
    downloadView.style.scale = "0.9";
    downloadView.style.zIndex = "12";
    document.body.appendChild(downloadView);

    downloadView.onclick = function() {
        var dataURL = frameView.toDataURL();
        var hiddenElement = document.createElement('a');
        hiddenElement.href = dataURL;
        hiddenElement.target = "_blank";
        hiddenElement.download = "photo.png";
        hiddenElement.click();
    };

    placeholderImage = document.createElement("canvas");
    placeholderImage.style.position = "absolute";
    placeholderImage.style.objectFit = "cover";
    placeholderImage.width = sw;
    placeholderImage.height = sh;
    placeholderImage.style.left = ((sw/2)-(sw/2))+"px";
    placeholderImage.style.top = ((sh/2)-(sh/2))+"px";
    placeholderImage.style.width = (sw)+"px";
    placeholderImage.style.height = (sh)+"px"; 
    placeholderImage.style.border = "1px";
    placeholderImage.style.zIndex = "11";
    document.body.appendChild(placeholderImage);

    drawPlaceholderImage();

    camera = document.createElement("video");
    camera.style.position = "absolute";
    camera.style.objectFit = "cover";
    camera.width = sw;
    camera.height = sh;
    camera.autoplay = true;
    camera.style.left = ((sw/2)-(sw/2))+"px";
    camera.style.top = ((sh/2)-(sh/2))+"px";
    camera.style.width = (sw)+"px";
    camera.style.height = (sh)+"px"; 
    camera.style.transform = (deviceNo == 0) ? 
    "rotateY(-180deg)" : "initial";
    camera.style.border = "1px";
    camera.style.zIndex = "11";
    document.body.appendChild(camera);
    cameraElem = camera;

    aimView = document.createElement("canvas");
    aimView.style.position = "absolute";
    aimView.width = 25;
    aimView.height = 25;
    aimView.style.left = ((sw/2)-(12.5))+"px";
    aimView.style.top = ((sh/2)-(12.5))+"px";
    aimView.style.width = (25)+"px";
    aimView.style.height = (25)+"px"; 
    aimView.style.border = "1px";
    aimView.style.zIndex = "17";
    document.body.appendChild(aimView);

    drawAim(aimView);

    splitColorsView = document.createElement("span");
    splitColorsView.style.position = "absolute";
    splitColorsView.style.color = "#fff";
    splitColorsView.innerText = "SPLIT";
    splitColorsView.style.lineHeight = "25px";
    splitColorsView.style.fontSize = "15px";
    splitColorsView.style.fontFamily = "Khand";
    splitColorsView.style.left = ((sw/2)-150)+"px";
    splitColorsView.style.top = ((sh/2)-175)+"px";
    splitColorsView.style.width = (50)+"px";
    splitColorsView.style.height = (25)+"px";
    splitColorsView.style.scale = "0.9";
    splitColorsView.style.zIndex = "15";
    document.body.appendChild(splitColorsView);

    splitColorsView.onclick = function() {
        splitColors = !splitColors;
        if (splitColors) {
            splitColorsView.innerText = "SPLIT";
        }
        else {
            splitColorsView.innerText = "SPACED";
        }
    };

    frameView0 = document.createElement("canvas");
    frameView0.style.position = "absolute";
    frameView0.width = 150;
    frameView0.height = 300;
    frameView0.style.left = ((sw/2)-150)+"px";
    frameView0.style.top = ((sh/2)-150)+"px";
    frameView0.style.width = (50)+"px";
    frameView0.style.height = (100)+"px";
    frameView0.style.border = 
    redEnabled ? "2px solid lightblue" : "initial";
    frameView0.style.scale = "0.9";
    frameView0.style.zIndex = "11";
    document.body.appendChild(frameView0);

    frameView0.onclick = function() {
        redEnabled = !redEnabled;
        frameView0.style.border = 
        redEnabled ? "2px solid lightblue" : "initial";
    };

    frameView1 = document.createElement("canvas");
    frameView1.style.position = "absolute";
    frameView1.width = 150;
    frameView1.height = 300;
    frameView1.style.left = ((sw/2)-150)+"px";
    frameView1.style.top = ((sh/2)-50)+"px";
    frameView1.style.width = (50)+"px";
    frameView1.style.height = (100)+"px"; 
    frameView1.style.scale = "0.9";
    frameView1.style.border = 
    greenEnabled ? "2px solid lightblue" : "initial";
    frameView1.style.zIndex = "11";
    document.body.appendChild(frameView1);

    frameView1.onclick = function() {
        greenEnabled = !greenEnabled;
        frameView1.style.border = 
        greenEnabled ? "2px solid lightblue" : "initial";
    };

    frameView2 = document.createElement("canvas");
    frameView2.style.position = "absolute";
    frameView2.width = 150;
    frameView2.height = 300;
    frameView2.style.left = ((sw/2)-150)+"px";
    frameView2.style.top = ((sh/2)+50)+"px";
    frameView2.style.width = (50)+"px";
    frameView2.style.height = (100)+"px"; 
    frameView2.style.scale = "0.9";
    frameView2.style.border = 
    blueEnabled ? "2px solid lightblue" : "initial";
    frameView2.style.zIndex = "11";
    document.body.appendChild(frameView2);

    frameView2.onclick = function() {
        blueEnabled = !blueEnabled;
        frameView2.style.border = 
        blueEnabled ? "2px solid lightblue" : "initial";
    };

    frameView = document.createElement("canvas");
    frameView.style.position = "absolute";
    frameView.style.objectFit = "cover";
    frameView.width = 150;
    frameView.height = 300;
    frameView.style.left = ((sw/2)-75)+"px";
    frameView.style.top = ((sh/2)-150)+"px";
    frameView.style.width = (150)+"px";
    frameView.style.height = (300)+"px"; 
    frameView.style.outline = "10px solid #000";
    //frameView.style.borderRadius = "10px";
    //frameView.style.boxShadow = "0px 0px 10px #000";
    frameView.style.zIndex = "15";
    document.body.appendChild(frameView);

    phoneFrameView = document.createElement("img");
    phoneFrameView.style.position = "absolute";
    phoneFrameView.style.scale = "0.5";
    phoneFrameView.style.zIndex = "11";
    //document.body.appendChild(phoneFrameView);

    var rnd = Math.random();
    phoneFrameView.onload = function() {
        this.style.left = ((sw/2)-(this.width/2))+"px";
        this.style.top = ((sh/2)-(this.height/2))+"px";
        this.style.width = (this.width)+"px";
        this.style.height = (this.height)+"px";
    };
    phoneFrameView.src = "img/phone-frame-0.png?rnd="+rnd;

    var startTime = 0;
    var startX = 0;
    var startY = 0;

    var moveX = 0;
    var moveY = 0;

    camera.ontouchstart = function(e) {
        if (!cameraOn) 
        startCamera();

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        startTime = new Date().getTime();
    };
    camera.ontouchmove = function(e) {
        moveX = e.touches[0].clientX;
        moveY = e.touches[0].clientY;

        var offsetX = (moveX-startX);
        var offsetY = (moveY-startY);

        var accX = (1/(sw-50))*(moveX-startX);
        var accY = (1/(sw-50))*(moveY-startY);

        if (Math.abs(offsetX) > Math.abs(offsetY)) {
            if (moveY < ((sh/2)+250))
            rotationZ = (accX*360);
            else
            translation = (moveX-(sw/2));
        }
        else {
            flipY = accY < 0;
        }

        frameView.style.left = (((sw/2)-75)+(translation))+"px";
        frameView.style.transform = 
        "rotateZ("+rotationZ+"deg)";
    };
    camera.ontouchend = function(e) {
        if ((new Date().getTime() - startTime) < 3000) {
            translation = 0;
            flipY = false;
            rotationZ = 0;

            frameView.style.left = ((sw/2)-75)+"px";
            frameView.style.transform = "initial";
            phoneFrameView.style.transform = "initial";

            if (!splitColors)
            colorTurn = (colorTurn+1) < 3 ? (colorTurn+1) : 0;
        }
        else {
            navigator.vibrate(500);
        }
    };

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "image-data") {
            var img = document.createElement("img");
            img.onload = function() {
                pasteCamera = false;
                var ctx = frameView.getContext("2d");
                ctx.drawImage(img, 0, 0, 150, 300);
                ws.send("PAPER|"+playerId+"|remote-downloaded");
            };
            img.src = msg[3];
        }
        else if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-downloaded") {
            remoteDownloaded = true;
        }
    };

    pasteCamera = true;
    animate();
});

var remoteDownloaded = true;

var animate = function() {
    if (!backgroundMode) {
        if (pasteCamera) {
            drawImage(frameView);
        }
        if (remoteDownloaded) {
            var dataURL = frameView.toDataURL();
            ws.send("PAPER|"+playerId+"|image-data|"+dataURL);
        }
    }
    requestAnimationFrame(animate);
};

var translation = 0;
var flipY = false;
var rotationZ = 0;

var closeImage = function(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 150, 300);
};

var polygon = [
    { x: 75, y: -150 },
    { x: -75, y: -150 },
    { x: -75, y: 150 },
    { x: 75, y: 150 }
];

var getPolygon = function() {
    var rPolygon = [];
    var c = { x: (sw/2), y: (sh/2) };
    for (var n = 0; n < polygon.length; n++) {
        var p = { x: c.x+polygon[n].x, y: c.y+polygon[n].y };
        p = _rotate2d(c, p, rotation);
        rPolygon.push(p);
    }
    return rPolygon;
};

var colorTurn = 0;

var splitColors = true;

var redEnabled = true;
var redArray = null;

var greenEnabled = true;
var greenArray = null;

var blueEnabled = true;
var blueArray = null;

var drawPlaceholderImage = function() {
    var ctx = placeholderImage.getContext("2d");

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, sw, sh);

    var stripeHeight = 10;
    ctx.lineWidth = stripeHeight;

    ctx.strokeStyle = "rgba(30, 30, 45, 1)";
    for (var n = 0; n < (sh/stripeHeight); n++) {
        var odd = n % 2 != 0;
        if (odd) {
            for (var k = 0; k < (sw/stripeHeight); k+=2) {
                ctx.beginPath();
                ctx.moveTo((k*stripeHeight), (n*stripeHeight));
                ctx.lineTo(((k+1)*stripeHeight), (n*stripeHeight));
                ctx.stroke();
            }
        }
        else {
            for (var k = 0; k < (sw/stripeHeight); k+=2) {
                ctx.beginPath();
                ctx.moveTo(((k+1)*stripeHeight), (n*stripeHeight));
                ctx.lineTo(((k+2)*stripeHeight), (n*stripeHeight));
                ctx.stroke();
            }
        }
    }

    ctx.fillStyle = "#fff";
    ctx.font = "75px sans serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("1", (sw/2), (sh/2));
}

var drawAim = function(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 25, 25);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "lightblue";

    ctx.beginPath();
    ctx.moveTo(5, 12.5);
    ctx.lineTo(20, 12.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(12.5, 5);
    ctx.lineTo(12.5, 20);
    ctx.stroke();
}

var drawImage = function(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 150, 300);

    var format = {
        left: (75-(vw/2)),
        top: (150-(vh/2)),
        width: (vw),
        height: (vh)
    };

    var left = (deviceNo == 0) ? 
    format.left+translation : 
    format.left-translation;

    var radiansZ = cameraOn && (deviceNo == 0) ? 
    -(rotationZ*(Math.PI/180)) : 
    (rotationZ*(Math.PI/180));

    ctx.save();
    if (cameraOn && deviceNo == 0) {
        ctx.scale(-1, 1);
        ctx.translate(-150, 0);
    }
    if (flipY) {
        ctx.scale(-1, 1);
        ctx.translate(-150, 0);
    }

    ctx.translate(75, 150);
    ctx.rotate(-radiansZ);
    ctx.translate(-75, -150);

    if (cameraOn) {
        ctx.drawImage(camera, left, format.top, 
        format.width, format.height);
    }
    else {
        var format = {
            left: (75-(sw/2)),
            top: (150-(sh/2)),
            width: (sw),
            height: (sh)
        };

        var left = 
        format.left-translation;

        ctx.drawImage(placeholderImage, left, format.top, 
        format.width, format.height);
    }

    ctx.rotate(radiansZ);
    ctx.restore();

    var imageData = ctx.getImageData(0, 0, 150, 300);
    var imageArray = imageData.data;

    var newRedArray = new Uint8ClampedArray(imageArray);
    var newGreenArray = new Uint8ClampedArray(imageArray);
    var newBlueArray = new Uint8ClampedArray(imageArray);
    for (var n = 0; n < imageArray.length; n += 4) {
        newRedArray[n] = imageArray[n];
        newGreenArray[n] = 0;
        newBlueArray[n] = 0;

        newRedArray[n+1] = 0;
        newGreenArray[n+1] = imageArray[n+1];
        newBlueArray[n+1] = 0;

        newRedArray[n+2] = 0;
        newGreenArray[n+2] = 0;
        newBlueArray[n+2] = imageArray[n+2];

        newRedArray[n+3] = 255;
        newGreenArray[n+3] = 255;
        newBlueArray[n+3] = 255;
    }

    if (colorTurn == 0)
    redArray = newRedArray;
    if (colorTurn == 1)
    greenArray = newGreenArray;
    if (colorTurn == 2)
    blueArray = newBlueArray;

    var redImageData = new ImageData(newRedArray, 
    imageData.width, imageData.height);
    var greenImageData = new ImageData(newGreenArray, 
    imageData.width, imageData.height);
    var blueImageData = new ImageData(newBlueArray, 
    imageData.width, imageData.height);

    if (splitColors)
    ctx.putImageData(imageData, 0, 0);
    else if (colorTurn == 0)
    ctx.putImageData(redImageData, 0, 0);
    else if (colorTurn == 1)
    ctx.putImageData(greenImageData, 0, 0);
    else if (colorTurn == 2)
    ctx.putImageData(blueImageData, 0, 0);

    var ctx0 = frameView0.getContext("2d");
    var ctx1 = frameView1.getContext("2d");
    var ctx2 = frameView2.getContext("2d");

    if (splitColors || colorTurn == 0)
    ctx0.putImageData(redImageData, 0, 0);
    if (splitColors || colorTurn == 1)
    ctx1.putImageData(greenImageData, 0, 0);
    if (splitColors || colorTurn == 2)
    ctx2.putImageData(blueImageData, 0, 0);
};

var combineArray = function(canvas) {
    var ctx = canvas.getContext("2d");

    var imageData = ctx.getImageData(0, 0, 150, 300);
    var imageArray = imageData.data;

    var newArray = new Uint8ClampedArray(imageArray);
    for (var n = 0; n < imageArray.length; n += 4) {
        newArray[n] = redArray[n];
        newArray[n+1] = greenEnabled ? greenArray[n+1] : 0;
        newArray[n+2] = blueEnabled ? blueArray[n+2] : 0;
        newArray[n+3] = 255;
    }

    var newImageData = new ImageData(newArray, 
    imageData.width, imageData.height);

    ctx.putImageData(newImageData, 0, 0);
};

var combineArray_effect0 = function(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 150, 300);

    var imageData = ctx.getImageData(0, 0, 150, 300);
    var imageArray = imageData.data;

    var newArray = new Uint8ClampedArray(imageArray);
    for (var n = 0; n < (imageArray.length/3); n += 4) {
        newArray[n] = redArray[n];
        newArray[n+3] = 255;
    }

    for (var n = (imageArray.length/3); 
        n < (imageArray.length/3)*2; n += 4) {
        newArray[n+1] = greenArray[n+1];
        newArray[n+3] = 255;
    }

    for (var n = (imageArray.length/3)*2; 
        n < imageArray.length; n += 4) {
        newArray[n+2] = blueArray[n+2];
        newArray[n+3] = 255;
    }

    var newImageData = new ImageData(newArray, 
    imageData.width, imageData.height);

    ctx.putImageData(newImageData, 0, 0);
};

var visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  visibilityChange = "webkitvisibilitychange";
}
//^different browsers^

var backgroundMode = false;
document.addEventListener(visibilityChange, function(){
    backgroundMode = !backgroundMode;
    if (backgroundMode) {
        console.log("backgroundMode: "+backgroundMode);
    }
    else {
        console.log("backgroundMode: "+backgroundMode);
    }
}, false);