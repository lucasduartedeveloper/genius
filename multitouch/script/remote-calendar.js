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

    filterColorSwitchView = document.createElement("span");
    filterColorSwitchView.style.position = "absolute";
    filterColorSwitchView.style.color = "#fff";
    filterColorSwitchView.innerText = "SWITCH";
    filterColorSwitchView.style.lineHeight = "25px";
    filterColorSwitchView.style.fontSize = "15px";
    filterColorSwitchView.style.fontFamily = "Khand";
    filterColorSwitchView.style.left = ((sw/2)-105)+"px";
    filterColorSwitchView.style.top = ((sh/2)-230)+"px";
    filterColorSwitchView.style.width = (50)+"px";
    filterColorSwitchView.style.height = (25)+"px";
    filterColorSwitchView.style.scale = "0.9";
    filterColorSwitchView.style.zIndex = "15";
    document.body.appendChild(filterColorSwitchView);

    filterColorSwitchView.onclick = function() {
        var tempColor = [ ...mapColor ];
        mapColor = [ ...mapColor2 ];
        mapColor2 = [ ...tempColor ];

        filterColorView.style.background = 
        "rgba("+mapColor[0]+","+mapColor[1]+","+mapColor[2]+",1)";

        filterColorView1.style.background = 
        "rgba("+mapColor2[0]+","+mapColor2[1]+
        ","+mapColor2[2]+",1)";
    };

    filterId = 0;
    filterColorView = document.createElement("span");
    filterColorView.style.position = "absolute";
    filterColorView.style.background = 
    "rgba("+mapColor[0]+","+mapColor[1]+","+mapColor[2]+",1)";
    filterColorView.style.left = ((sw/2)-(105))+"px";
    filterColorView.style.top = ((sh/2)-(200))+"px";
    filterColorView.style.width = (25)+"px";
    filterColorView.style.height = (25)+"px";
    filterColorView.style.outlineOffset = "2px";
    filterColorView.style.outline = "1px solid #fff";
    filterColorView.style.zIndex = "12";
    document.body.appendChild(filterColorView);

    filterColorView.onclick = function() {
        filterId = 0;
        filterColorView.style.outlineOffset = "2px";
        filterColorView.style.outline = "1px solid #fff";
        filterColorView1.style.outlineOffset = "0px";
        filterColorView1.style.outline = "initial";
    };

    filterColorView1 = document.createElement("span");
    filterColorView1.style.position = "absolute";
    filterColorView1.style.background = 
    "rgba("+mapColor2[0]+","+mapColor2[1]+","+mapColor2[2]+",1)";
    filterColorView1.style.left = ((sw/2)-(75))+"px";
    filterColorView1.style.top = ((sh/2)-(200))+"px";
    filterColorView1.style.width = (25)+"px";
    filterColorView1.style.height = (25)+"px";
    filterColorView1.style.zIndex = "12";
    document.body.appendChild(filterColorView1);

    filterColorView1.onclick = function() {
        filterId = 1;
        filterColorView1.style.outlineOffset = "2px";
        filterColorView1.style.outline = "1px solid #fff";
        filterColorView.style.outlineOffset = "0px";
        filterColorView.style.outline = "initial";
    };

    filterColorLimitView = document.createElement("span");
    filterColorLimitView.style.position = "absolute";
    filterColorLimitView.style.color = "#fff";
    filterColorLimitView.innerText = 
    limit < 0 ? "OFF" : limit+"%";
    filterColorLimitView.style.lineHeight = "25px";
    filterColorLimitView.style.fontSize = "15px";
    filterColorLimitView.style.fontFamily = "Khand";
    filterColorLimitView.style.left = ((sw/2)+(50))+"px";
    filterColorLimitView.style.top = ((sh/2)-(200))+"px";
    filterColorLimitView.style.width = (50)+"px";
    filterColorLimitView.style.height = (25)+"px";
    filterColorLimitView.style.zIndex = "12";
    document.body.appendChild(filterColorLimitView);

    filterColorLimitView.onclick = function() {
        limit = (Math.floor((limit/5)*5)+5);
        limit = limit > 100 ? -5 : limit;
        filterColorLimitView.innerText = 
        limit < 0 ? "OFF" : limit+"%";
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

    deviceConnectionView = document.createElement("div");
    deviceConnectionView.style.position = "absolute";
    deviceConnectionView.style.display = "none";
    deviceConnectionView.style.left = ((sw/2)+100)+"px";
    deviceConnectionView.style.top = ((sh/2)-200)+"px";
    deviceConnectionView.style.width = (50)+"px";
    deviceConnectionView.style.height = (100)+"px";
    deviceConnectionView.style.border = "1px solid #fff";
    deviceConnectionView.style.borderRadius = "25px";
    deviceConnectionView.style.zIndex = "12";
    document.body.appendChild(deviceConnectionView);

    deviceStateView = document.createElement("div");
    deviceStateView.style.position = "absolute";
    deviceStateView.style.color = "#fff";
    deviceStateView.innerText = "OFF";
    deviceStateView.style.lineHeight = "50px";
    deviceStateView.style.fontSize = "30px";
    deviceStateView.style.fontFamily = "Khand";
    deviceStateView.style.left = ((sw/2)+100)+"px";
    deviceStateView.style.top = ((sh/2)-200)+"px";
    deviceStateView.style.width = (50)+"px";
    deviceStateView.style.height = (50)+"px";
    deviceStateView.style.border = "1px solid #fff";
    deviceStateView.style.borderRadius = "50%";
    deviceStateView.style.scale = "0.9";
    deviceStateView.style.zIndex = "12";
    document.body.appendChild(deviceStateView);

    deviceStateView.onclick = function() {
        if (cameraOn) {
            stopCamera();
            deviceStateView.innerText = "OFF";
            deviceConnectionView.style.display = "none";
        }
        else {
            startCamera();
            deviceStateView.innerText = "ON";
            deviceConnectionView.style.display = "initial";
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
        if (cameraOn) return;
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
    combineView.style.left = ((sw/2)-75)+"px";
    combineView.style.top = (50)+"px";
    combineView.style.width = (50)+"px";
    combineView.style.height = (50)+"px";
    combineView.style.border = "1px solid #fff";
    combineView.style.borderRadius = "50%";
    combineView.style.scale = "0.9";
    combineView.style.zIndex = "12";
    document.body.appendChild(combineView);

    combineView.onclick = function() {
        updateImage = !updateImage;
        pasteCamera = !glueColors;
        combineArray(frameView);
    };

    combineView_effect0 = document.createElement("i");
    combineView_effect0.style.position = "absolute";
    combineView_effect0.style.color = "#fff";
    combineView_effect0.className = "fa-solid fa-bars";
    combineView_effect0.style.lineHeight = "50px";
    combineView_effect0.style.fontSize = "30px";
    combineView_effect0.style.left = ((sw/2)+100)+"px";
    combineView_effect0.style.top = ((sh/2)-100)+"px";
    combineView_effect0.style.width = (50)+"px";
    combineView_effect0.style.height = (50)+"px";
    combineView_effect0.style.border = "1px solid #fff";
    combineView_effect0.style.borderRadius = "50%";
    combineView_effect0.style.scale = "0.9";
    combineView_effect0.style.zIndex = "12";
    document.body.appendChild(combineView_effect0);

    combineView_effect0.onclick = function() {
        updateImage = !updateImage;
        pasteCamera = !glueColors;
        combineArray_effect0(frameView);
    };

    zoomView = document.createElement("span");
    zoomView.style.position = "absolute";
    zoomView.style.color = "#fff";
    zoomView.innerText = zoom+"x";
    zoomView.style.lineHeight = "50px";
    zoomView.style.fontSize = "25px";
    zoomView.style.fontFamily = "Khand";
    zoomView.style.left = ((sw/2)+100)+"px";
    zoomView.style.top = ((sh/2)-50)+"px";
    zoomView.style.width = (50)+"px";
    zoomView.style.height = (50)+"px";
    zoomView.style.border = "1px solid #fff";
    zoomView.style.borderRadius = "50%";
    zoomView.style.scale = "0.9";
    zoomView.style.zIndex = "12";
    document.body.appendChild(zoomView);

    zoomView.onclick = function() {
        zoom = (zoom+0.5) < 8 ? (zoom+0.5) : 0.5;
        zoomView.innerText = zoom+"x";
    };

    backgroundSet = false;
    setBackgroundView = document.createElement("div");
    setBackgroundView.style.position = "absolute";
    setBackgroundView.style.color = "#fff";
    setBackgroundView.innerText = "BG";
    setBackgroundView.style.lineHeight = "50px";
    setBackgroundView.style.fontSize = "30px";
    setBackgroundView.style.fontFamily = "Khand";
    setBackgroundView.style.left = ((sw/2)+100)+"px";
    setBackgroundView.style.top = ((sh/2))+"px";
    setBackgroundView.style.width = (50)+"px";
    setBackgroundView.style.height = (50)+"px";
    setBackgroundView.style.border = "1px solid #fff";
    setBackgroundView.style.borderRadius = "50%";
    setBackgroundView.style.scale = "0.9";
    setBackgroundView.style.zIndex = "12";
    document.body.appendChild(setBackgroundView);

    setBackgroundView.onclick = function() {
        backgroundSet = !backgroundSet;
        if (backgroundSet) {
            camera.style.zIndex = "10";
            drawToBackground(placeholderImage);
        }
        else {
            drawPlaceholderImage();
            camera.style.zIndex = "11";
        }
    };

    var frameColorList = [ "#000", "#fff" ];
    var frameColorNo = 0;

    frameColorView = document.createElement("span");
    frameColorView.style.position = "absolute";
    frameColorView.style.color = "#fff";
    frameColorView.style.background = 
    frameColorList[frameColorNo];
    frameColorView.style.lineHeight = "50px";
    frameColorView.style.fontSize = "25px";
    frameColorView.style.fontFamily = "Khand";
    frameColorView.style.left = ((sw/2)+100)+"px";
    frameColorView.style.top = (sh/2)+"px";
    frameColorView.style.width = (50)+"px";
    frameColorView.style.height = (50)+"px";
    frameColorView.style.border = "1px solid #fff";
    frameColorView.style.borderRadius = "50%";
    frameColorView.style.scale = "0.9";
    frameColorView.style.zIndex = "12";
    //document.body.appendChild(frameColorView);

    frameColorView.onclick = function() {
        frameColorNo = 
        (frameColorNo+1) < (frameColorList.length) ? 
        (frameColorNo+1) : 0;
        frameColorView.style.background = 
        frameColorList[frameColorNo];
        frameView.style.outline = "10px solid "+
        frameColorList[frameColorNo];
    };

    videoStreamList = document.createElement("div");
    videoStreamList.style.position = "absolute";
    videoStreamList.style.display = "none";
    videoStreamList.style.color = "#000";
    videoStreamList.style.background = "#fff";
    videoStreamList.style.fontSize = "25px";
    videoStreamList.style.fontFamily = "Khand";
    videoStreamList.style.left = ((sw/2)+25)+"px";
    videoStreamList.style.top = (100)+"px";
    videoStreamList.style.width = (150)+"px";
    videoStreamList.style.height = (250)+"px";
    videoStreamList.style.border = "1px solid #fff";
    videoStreamList.style.borderRadius = "5px";
    videoStreamList.style.scale = "0.9";
    videoStreamList.style.zIndex = "20";
    document.body.appendChild(videoStreamList);

    fillList();

    videoStreamEnabled = false;
    videoStreamView = document.createElement("i");
    videoStreamView.style.position = "absolute";
    videoStreamView.style.color = "#fff";
    videoStreamView.className = "fa-solid fa-folder";
    videoStreamView.style.lineHeight = "50px";
    videoStreamView.style.fontSize = "25px";
    videoStreamView.style.left = ((sw/2)+25)+"px";
    videoStreamView.style.top = (50)+"px";
    videoStreamView.style.width = (50)+"px";
    videoStreamView.style.height = (50)+"px";
    videoStreamView.style.border = "1px solid #fff";
    videoStreamView.style.borderRadius = "50%";
    videoStreamView.style.scale = "0.9";
    videoStreamView.style.zIndex = "12";
    document.body.appendChild(videoStreamView);

    videoStreamView.onclick = function() {
        videoStreamEnabled = !videoStreamEnabled;
        if (videoStreamEnabled) {
            videoStreamList.style.display = "initial";
        }
        else {
            videoStreamList.style.display = "none";
            videoStream.style.display = "none";
        }
    };

    track = 0;
    trackView = document.createElement("div");
    trackView.style.position = "absolute";
    trackView.style.color = "#fff";
    trackView.innerText = "TRACK \n"+track;
    trackView.style.lineHeight = "50px";
    trackView.style.fontSize = "15px";
    trackView.style.fontFamily = "Khand";
    trackView.style.left = ((sw/2)+100)+"px";
    trackView.style.top = (0)+"px";
    trackView.style.width = (50)+"px";
    trackView.style.height = (100)+"px";
    trackView.style.border = "1px solid #fff";
    //trackView.style.borderRadius = "50%";
    trackView.style.scale = "0.9";
    trackView.style.zIndex = "12";
    document.body.appendChild(trackView);

    trackView.onclick = function() {
        track = (track+1) < 3 ? (track+1) : 0;
        trackView.innerText = "TRACK \n"+track;
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

    var torchRequested = false;
    var torchActive = false;
    var onTimer = false;
    var timerInterval;
    timerView.onclick = function() {
        if (onTimer) return;
        onTimer = true;

        colorTurn = 0;
        timerInterval = setInterval(function () {
            if (delay > 0)
            delay -= 1;
            timerView.innerText = delay;
            if (deviceNo > 0 && 
                delay == 0 && !torchRequested && !torchActive) {
                torchRequested = true;
                setTorch("on");
            }
            else if (deviceNo > 0 && 
                delay == 0 && torchRequested) {
                torchActive = getTorch();
                if (torchActive)
                torchRequested = false;
            }
            if (delay == 0 && (deviceNo == 0 || torchActive)) {
                drawImage(frameView);
                colorTurn = (colorTurn+1) < 3 ? (colorTurn+1) : 0;
                delay = 10;
                timerView.innerText = delay;

                if (splitColors) {
                    updateImage = false;
                    drawImage(frameView);
                    clearInterval(timerInterval);
                    beepDone.play();
                    onTimer = false;
                }
                else if (colorTurn == 0) {
                    updateImage = false;
                    combineArray(frameView);
                    clearInterval(timerInterval);
                    beepDone.play();
                    onTimer = false;
                }
                else {
                    beepMilestone.play();
                }

                setTorch("off");
                torchRequested = false;
                torchActive = false;
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

    placeholderImage.getContext("2d").imageSmoothingEnabled = false;

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

    videoStream = document.createElement("video");
    videoStream.style.position = "absolute";
    videoStream.style.display = "none";
    videoStream.style.objectFit = "cover";
    videoStream.autoplay = true;
    videoStream.style.left = ((sw/2)-(sw/2))+"px";
    videoStream.style.top = ((sh/2)-(sh/2))+"px";
    videoStream.style.width = (sw)+"px";
    videoStream.style.height = (sh)+"px"; 
    videoStream.style.border = "1px";
    videoStream.style.zIndex = "11";
    document.body.appendChild(videoStream);

    var vsw = 420;
    var vsh = 240;
    var vsw_cover = (vsw/vsh)*sh;
    var vsh_cover = sh;

    videoStreamOffsetX = (sw/2)-(vsw_cover/2);

    videoStream.ontouchstart = function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        videoStreamOffsetX += (startX-(sw/2));
        videoStreamOffsetX = 
        videoStreamOffsetX < -(vsw_cover-sw) ?
        -(vsw_cover-sw) : videoStreamOffsetX;
        videoStreamOffsetX = 
        videoStreamOffsetX > 0 ?
        0 : videoStreamOffsetX;

        videoStream.style.objectPosition = 
        (videoStreamOffsetX) + "px 50%";
    };
    videoStream.ontouchmove = function(e) {
        moveX = e.touches[0].clientX;
        moveY = e.touches[0].clientY;

        videoStreamOffsetX += (moveX-(sw/2));
        videoStreamOffsetX = 
        videoStreamOffsetX < -(vsw_cover-sw) ?
        -(vsw_cover-sw) : videoStreamOffsetX;
        videoStreamOffsetX = 
        videoStreamOffsetX > 0 ?
        0 : videoStreamOffsetX;

        videoStream.style.objectPosition = 
        (videoStreamOffsetX) + "px 50%";
    };

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

    rotationSize = 45;
    rotationControlView = document.createElement("div");
    rotationControlView.style.position = "absolute";
    rotationControlView.style.color = "#fff";
    rotationControlView.innerText = (rotationSize)+"°";
    rotationControlView.style.lineHeight = "50px";
    rotationControlView.style.fontSize = "30px";
    rotationControlView.style.fontFamily = "Khand";
    rotationControlView.style.left = (5)+"px";
    rotationControlView.style.top = (5)+"px";
    rotationControlView.style.width = (50)+"px";
    rotationControlView.style.height = (50)+"px"; 
    rotationControlView.style.border = "1px solid #fff";
    rotationControlView.style.borderRadius = "50%";
    rotationControlView.style.scale = "0.9";
    rotationControlView.style.zIndex = "12";
    document.body.appendChild(rotationControlView);

    rotationControlView.onclick = function() {
        rotationSize = (rotationSize+5) > 45 ? 5 : (rotationSize+5);
        rotationControlView.innerText = (rotationSize)+"°";
    };

    threejsEnabled = false;
    threejsView = document.createElement("img");
    threejsView.style.position = "absolute";
    threejsView.style.left = (55)+"px";
    threejsView.style.top = (5)+"px";
    threejsView.style.width = (50)+"px";
    threejsView.style.height = (50)+"px"; 
    threejsView.style.border = "1px solid #fff";
    threejsView.style.borderRadius = "50%";
    threejsView.style.scale = "0.9";
    threejsView.style.zIndex = "25";
    document.body.appendChild(threejsView);

    threejsView.src = "img/threejs-logo.png";

    threejsView.onclick = function() {
        threejsEnabled = !threejsEnabled;
        renderer.domElement.style.display = threejsEnabled ? 
        "initial" : "none";
    };

    fullScreenView = document.createElement("i");
    fullScreenView.style.position = "absolute";
    fullScreenView.style.color = "#fff";
    fullScreenView.className = 
    "fa-solid fa-arrow-up-right-from-square";
    fullScreenView.style.lineHeight = "50px";
    fullScreenView.style.fontSize = "15px";
    fullScreenView.style.left = (5)+"px";
    fullScreenView.style.top = (55)+"px";
    fullScreenView.style.width = (50)+"px";
    fullScreenView.style.height = (50)+"px"; 
    fullScreenView.style.border = "1px solid #fff";
    fullScreenView.style.borderRadius = "50%";
    fullScreenView.style.scale = "0.9";
    fullScreenView.style.zIndex = "25";
    document.body.appendChild(fullScreenView);

    fullScreenView.onclick = function() {
        frameViewContainer.requestFullscreen();
    };

    torchView = document.createElement("i");
    torchView.style.position = "absolute";
    torchView.style.color = "#fff";
    torchView.className = "";
    torchView.style.lineHeight = "25px";
    torchView.style.fontSize = "10px";
    torchView.style.left = (105)+"px";
    torchView.style.top = (5)+"px";
    torchView.style.width = (25)+"px";
    torchView.style.height = (25)+"px"; 
    torchView.style.border = "1px solid #fff";
    torchView.style.borderRadius = "50%";
    torchView.style.scale = "0.9";
    torchView.style.zIndex = "25";
    document.body.appendChild(torchView);

    torchView.onclick = function() {
        setTorch("toggle");
        torchView.className = torchEnabled ? 
        "fa-solid fa-bolt" : "";
    };

    var rnd = Math.random();
    var audio = new Audio("audio/700-hz-beep.wav?rnd="+rnd);
    audio.loop = true;

    locateView = document.createElement("i");
    locateView.style.position = "absolute";
    locateView.style.color = "#fff";
    locateView.className = "fa-solid fa-bell";
    locateView.style.lineHeight = "50px";
    locateView.style.fontSize = "30px";
    locateView.style.left = (5)+"px";
    locateView.style.bottom = (5)+"px";
    locateView.style.width = (50)+"px";
    locateView.style.height = (50)+"px"; 
    locateView.style.border = "1px solid #fff";
    locateView.style.borderRadius = "50%";
    locateView.style.scale = "0.9";
    locateView.style.zIndex = "12";
    document.body.appendChild(locateView);

    locateView.onclick = function() {
        if (audio.paused)
        audio.play();
        else {
        audio.currentTime = 0;
        audio.pause();
        }
    };

    lockShape = false;
    lockShapeView = document.createElement("i");
    lockShapeView.style.position = "absolute";
    lockShapeView.style.color = "#fff";
    lockShapeView.className = "fa-solid fa-check";
    lockShapeView.style.lineHeight = "50px";
    lockShapeView.style.fontSize = "30px";
    lockShapeView.style.left = (55)+"px";
    lockShapeView.style.bottom = (5)+"px";
    lockShapeView.style.width = (50)+"px";
    lockShapeView.style.height = (50)+"px"; 
    lockShapeView.style.border = "1px solid #fff";
    lockShapeView.style.borderRadius = "50%";
    lockShapeView.style.scale = "0.9";
    lockShapeView.style.zIndex = "12";
    document.body.appendChild(lockShapeView);

    lockShapeView.onclick = function() {
        lockShape = !lockShape;
        lockShapeView.className = lockShape ? 
        "fa-solid fa-xmark" : "fa-solid fa-check";
        if (lockShape) {
            var maskCtx = storedMask.getContext("2d");
            maskCtx.clearRect(0, 0, 150, 300);
            if (cameraOn) {
                maskCtx.drawImage(storedImage, 0, 0, 150, 300);
            }
            else {
                maskCtx.fillStyle = "#fff";
                maskCtx.fillRect(0, 0, 150, 300);

                maskCtx.fillStyle = "#000";
                maskCtx.save();
                maskCtx.beginPath();
                maskCtx.arc(75, 150, 50, 0, (Math.PI*2));
                maskCtx.fill();
            }
        }
    };

    leftArrowView = document.createElement("i");
    leftArrowView.style.position = "absolute";
    leftArrowView.style.color = "#fff";
    leftArrowView.className = "fa-solid fa-arrow-left";
    leftArrowView.style.lineHeight = "50px";
    leftArrowView.style.fontSize = "30px";
    leftArrowView.style.left = (105)+"px";
    leftArrowView.style.bottom = (5)+"px";
    leftArrowView.style.width = (50)+"px";
    leftArrowView.style.height = (50)+"px"; 
    leftArrowView.style.border = "1px solid #fff";
    leftArrowView.style.borderRadius = "50%";
    leftArrowView.style.scale = "0.9";
    leftArrowView.style.zIndex = "12";
    document.body.appendChild(leftArrowView);

    leftArrowView.onclick = function() {
        resolution = (resolution-10) > 10 ? (resolution-10) : 10;
    };

    rightArrowView = document.createElement("i");
    rightArrowView.style.position = "absolute";
    rightArrowView.style.color = "#fff";
    rightArrowView.className = "fa-solid fa-arrow-right";
    rightArrowView.style.lineHeight = "50px";
    rightArrowView.style.fontSize = "30px";
    rightArrowView.style.left = (155)+"px";
    rightArrowView.style.bottom = (5)+"px";
    rightArrowView.style.width = (50)+"px";
    rightArrowView.style.height = (50)+"px"; 
    rightArrowView.style.border = "1px solid #fff";
    rightArrowView.style.borderRadius = "50%";
    rightArrowView.style.scale = "0.9";
    rightArrowView.style.zIndex = "12";
    document.body.appendChild(rightArrowView);

    rightArrowView.onclick = function() {
        resolution = (resolution+10) < 300 ? (resolution+10) : 300;
    };

    resolutionView = document.createElement("i");
    resolutionView.style.position = "absolute";
    resolutionView.style.color = "#fff";
    resolutionView.className = "fa-solid fa-border-none";
    resolutionView.style.lineHeight = "50px";
    resolutionView.style.fontSize = "30px";
    resolutionView.style.left = (205)+"px";
    resolutionView.style.bottom = (5)+"px";
    resolutionView.style.width = (50)+"px";
    resolutionView.style.height = (50)+"px"; 
    resolutionView.style.border = "1px solid #fff";
    resolutionView.style.borderRadius = "50%";
    resolutionView.style.scale = "0.9";
    resolutionView.style.zIndex = "12";
    document.body.appendChild(resolutionView);

    resolutionView.onclick = function() {
        resolutionEnabled = !resolutionEnabled;
        resolutionView.className = resolutionEnabled ? 
        "fa-solid fa-border-all" : "fa-solid fa-border-none";
    };

    debugEnabled = false;
    debugView = document.createElement("i");
    debugView.style.position = "absolute";
    debugView.style.color = "#fff";
    debugView.className = "";
    debugView.style.lineHeight = "50px";
    debugView.style.fontSize = "30px";
    debugView.style.right = (5)+"px";
    debugView.style.bottom = (5)+"px";
    debugView.style.width = (50)+"px";
    debugView.style.height = (50)+"px"; 
    debugView.style.border = "1px solid #fff";
    debugView.style.borderRadius = "50%";
    debugView.style.scale = "0.9";
    debugView.style.zIndex = "12";
    if (location.href.includes("http:"))
    document.body.appendChild(debugView);

    debugView.onclick = function() {
        debugEnabled = !debugEnabled;
        debugView.className = debugEnabled ? 
        "fa-solid fa-bug" : "";
        frameViewContainer.style.outline = debugEnabled ? 
        "1px solid #000" : "10px solid #000";
    };

    mapEnabled = false;
    mapControlView = document.createElement("i");
    mapControlView.style.position = "absolute";
    mapControlView.style.color = "#fff";
    mapControlView.className = "fa-solid fa-location-dot";
    mapControlView.style.lineHeight = "50px";
    mapControlView.style.fontSize = "30px";
    mapControlView.style.left = ((sw/2)+(100))+"px";
    mapControlView.style.top = ((sh/2)+(50))+"px";
    mapControlView.style.width = (50)+"px";
    mapControlView.style.height = (50)+"px"; 
    mapControlView.style.border = "1px solid #fff";
    mapControlView.style.borderRadius = "50%";
    mapControlView.style.scale = "0.9";
    mapControlView.style.zIndex = "12";
    document.body.appendChild(mapControlView);

    mapControlView.onclick = function() {
        mapEnabled = !mapEnabled;
        mapView.style.display = mapEnabled ? "initial" : "none";
    };

    mapView = document.createElement("div");
    mapView.style.position = "absolute";
    mapView.id = "map";
    mapView.style.display = "none";
    mapView.className = "map-box";
    mapView.width = 150;
    mapView.height = 300;
    mapView.style.left = ((sw/2)-(75))+"px";
    mapView.style.top = ((sh/2)-(150))+"px";
    mapView.style.width = (150)+"px";
    mapView.style.height = (300)+"px"; 
    mapView.style.border = "1px";
    mapView.style.zIndex = "17";
    document.body.appendChild(mapView);

    startMap();

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
        colorMode = (colorMode+1) < 3 ? (colorMode+1) : 0;

        /* 
        splitColors = !splitColors && !glueColors;
        glueColors = !glueColors && !splitColors;
        */

        splitColors = (colorMode == 2);
        glueColors = (colorMode == 1);

        if (splitColors) {
            splitColorsView.innerText = "SPLIT";
        }
        else if (glueColors) {
            splitColorsView.innerText = "GLUE";
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
    frameView0.style.zIndex = "12";
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
    frameView1.style.zIndex = "12";
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
    frameView2.style.zIndex = "12";
    document.body.appendChild(frameView2);

    frameView2.onclick = function() {
        blueEnabled = !blueEnabled;
        frameView2.style.border = 
        blueEnabled ? "2px solid lightblue" : "initial";
    };

    frameViewContainer = document.createElement("div");
    frameViewContainer.style.position = "absolute";
    frameViewContainer.style.background = "#f0f";
    frameViewContainer.style.left = ((sw/2)-75)+"px";
    frameViewContainer.style.top = ((sh/2)-150)+"px";
    frameViewContainer.style.width = (150)+"px";
    frameViewContainer.style.height = (300)+"px";
    frameViewContainer.style.outline = "10px solid #000";
    frameViewContainer.style.zIndex = "15";
    document.body.appendChild(frameViewContainer);

    frameViewBackside = document.createElement("img");
    frameViewBackside.style.position = "absolute";
    frameViewBackside.style.display = "none";
    frameViewBackside.style.background = "#fff";
    frameViewBackside.style.objectFit = "cover";
    frameViewBackside.width = 150;
    frameViewBackside.height = 300;
    frameViewBackside.style.left = (0)+"px";
    frameViewBackside.style.top = (0)+"px";
    frameViewBackside.style.width = (150)+"px";
    frameViewBackside.style.height = (300)+"px"; 
    frameViewBackside.style.transform = "rotateY(-180deg)";
    frameViewBackside.style.zIndex = "15";
    frameViewContainer.appendChild(frameViewBackside);

    var rnd = Math.random();
    frameViewBackside.src = "img/backside-0.png?rnd="+rnd;

    frameView = document.createElement("canvas");
    frameView.style.position = "absolute";
    frameView.style.objectFit = "cover";
    frameView.width = 150;
    frameView.height = 300;
    frameView.style.left = (0)+"px";
    frameView.style.top = (0)+"px";
    frameView.style.width = (150)+"px";
    frameView.style.height = (300)+"px"; 
    frameView.style.zIndex = "15";
    frameViewContainer.appendChild(frameView);

    frameView.getContext("2d").imageSmoothingEnabled = false;

    frameViewContainer.ontouchstart = function(e) {
        if (fullscreenEnabled) return;

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        var obj = {
            x: Math.floor(startX - ((sw/2)-75)),
            y: Math.floor(startY - ((sh/2)-150))
        };
        coordinates[filterId] = obj;

        setFilter(frameView, filterId, false);
    };
    frameViewContainer.ontouchmove = function(e) {
        if (fullscreenEnabled) return;

        moveX = e.touches[0].clientX;
        moveY = e.touches[0].clientY;

        var obj = {
            x: Math.floor(moveX - ((sw/2)-75)),
            y: Math.floor(moveY - ((sh/2)-150))
        };
        coordinates[filterId] = obj;

        setFilter(frameView, filterId, false);
    };

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

        if (Math.abs(offsetX) > Math.abs(offsetY) || 
            Math.abs(offsetY) < 50) {
            if (moveY < ((sh/2)+200)) {
                var focusTotal = focusMax - focusMin;
                var newFocus = 
                ((accX*focusTotal)/focusStep)*focusStep;
                newFocus = newFocus < focusMin ? 
                focusMin : newFocus;
                newFocus = newFocus > focusMax ?
                focusMax : newFocus;
                setFocus(newFocus);
            }
            else if (moveY < ((sh/2)+250)) {
                rotationZ = 
                Math.floor(((accX*360)/rotationSize))*rotationSize;
            }
            else {
                translation = Math.floor(moveX-(sw/2));
            }
        }
        else {
            flipY = accY < 0;
        }

        frameViewContainer.style.left = 
        (((sw/2)-75)+(translation))+"px";
        frameViewContainer.style.transform = 
        (flipY ? "rotateY(-180deg) " : "") +
        "rotateZ("+rotationZ+"deg)";

        rotationControlView.style.transform = 
        "rotateZ("+rotationZ+"deg)";
        locateView.style.transform = 
        "rotateZ("+rotationZ+"deg)";

        frameView.style.display = flipY ? "none" : "initial";
        frameViewBackside.style.display = flipY ? "initial" : "none";

        mapView.style.left = (((sw/2)-75)+(translation))+"px";
        mapView.style.transform = 
        "rotateZ("+rotationZ+"deg)";
    };
    camera.ontouchend = function(e) {
        if ((new Date().getTime() - startTime) < 3000) {
            translation =  0;
            flipY = false;
            rotationZ = 0;

            frameViewContainer.style.left = ((sw/2)-75)+"px";
            frameViewContainer.style.transform = "initial";

            rotationControlView.style.transform = "initial";
            locateView.style.transform = "initial";

            phoneFrameView.style.transform = "initial";

            frameView.style.display = flipY ? "none" : "initial";
            frameViewBackside.style.display = flipY ? "initial" : "none";

            mapView.style.left = ((sw/2)-75)+"px";
            mapView.style.transform = "initial";
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
                updateImage = false;
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

    storedImage = document.createElement("canvas");
    storedImage.width = 150;
    storedImage.height = 300;
    storedImage.getContext("2d").imageSmoothingEnabled = false;

    storedMask = document.createElement("canvas");
    storedMask.width = 150;
    storedMask.height = 300;
    storedMask.getContext("2d").imageSmoothingEnabled = false;

    window.addEventListener("message", (event) => {
            //if (event.origin !== "undefined") return;
            console.log("iframe message: ", event.data);
            iframeArr[event.data.id].remove();
            readData(event.data.id, event.data.data);
        },
        false,
    );

    positionView = document.createElement("span");
    positionView.style.position = "absolute";
    positionView.style.color = "#fff";
    positionView.innerText = "radius: 0, x: 0, y: 0";
    positionView.style.lineHeight = "15px";
    positionView.style.fontSize = "15px";
    positionView.style.fontFamily = "Khand";
    positionView.style.left = ((sw/2)-75)+"px";
    positionView.style.top = ((sh/2)+170)+"px";
    positionView.style.width = (150)+"px";
    positionView.style.height = (45)+"px"; 
    //positionView.style.outline = "1px solid #000";
    positionView.style.zIndex = "15";
    document.body.appendChild(positionView);

    fullscreenEnabled = false;
    frameViewContainer.onfullscreenchange = function() {
        fullscreenEnabled = 
        document.fullscreenElement ? true : false;
        console.log("fullscreen: "+fullscreenEnabled);
        if (fullscreenEnabled) {
            var width = screen.width;
            var height = screen.height;
            frameViewContainer.style.background = "#000";
            frameViewBackside.style.left = ((width-150)/2)+"px";
            frameViewBackside.style.top = ((height-300)/2)+"px";
            frameViewBackside.style.scale = "1.5";
            frameView.style.left = ((width-150)/2)+"px";
            frameView.style.top = ((height-300)/2)+"px";
            frameView.style.scale = "1.5";

            frameViewContainer.appendChild(videoStream);
            videoStream.style.left = ((width/2)-(sw/2))+"px";
            videoStream.style.top = ((height/2)-(sh/2))+"px";
        }
        else {
            frameViewContainer.style.background = "#f0f";
            frameViewBackside.style.left = (0)+"px";
            frameViewBackside.style.top = (0)+"px";
            frameViewBackside.style.scale = "1";
            frameView.style.left = (0)+"px";
            frameView.style.top = (0)+"px";
            frameView.style.scale = "1";

            document.body.appendChild(videoStream);
            videoStream.style.left = ((sw/2)-(sw/2))+"px";
            videoStream.style.top = ((sh/2)-(sh/2))+"px";
        }
    };

    loadImages(function() {
        console.log("images loaded");
    });

    pasteCamera = true;
    load3D((sw/sh));
    animate();
});

var map;
var startMap = function() {
    // Create the map
    map = L.map('map').setView([-23.37062642645644,  -51.15587314318577], 18);

    var tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: "",
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibHVjYXNkdWFydGUxOTkyIiwiYSI6ImNreGZieWE3ODFwNTQyb3N0cW4zNHMxMG8ifQ.HXS54wWrm6wPz-29LVVRbg'
    }).addTo(map);

    $(".leaflet-control-container").hide();
};

var remoteDownloaded = true;
var databaseTime = 0;

var animate = function() {
    if (!backgroundMode) {
        if (pasteCamera) {
            drawImage(frameView);
        }
        if (cameraOn && remoteDownloaded) {
            var dataURL = frameView.toDataURL();
            ws.send("PAPER|"+playerId+"|image-data|"+dataURL);
        }
        if ((new Date().getTime() - databaseTime) > 5000) {
            var dataURL = frameView.toDataURL();
            saveImage(dataURL);
            databaseTime = new Date().getTime();
        }
        updatePosition();
    }
    requestAnimationFrame(animate);
};

var position = {
    center: { radius: 0, x: -1, y: -1 },
    center2: { radius: 0, x: -1, y: -1 },
};
var updatePosition = function() {
    position = getCoordinatesFromImage();
};

var updateThreejs = function() {
    var pos = getCoordinatesFromImage();
    var squareSize = (15/8);
    var tableX = 
    Math.floor(((15/150)*pos.center.x)/squareSize);
    var tableY = 
    Math.floor(((15/300)*pos.center.y)/squareSize);
    chessKing.position.x = 
    (-7.5+(squareSize/2))+
    (tableX*squareSize);
    chessKing.position.z = 
    (-7.5+(squareSize/2))+
    (tableY*squareSize);

    var tableX2 = 
    Math.floor(((15/150)*pos.center2.x)/squareSize);
    var tableY2 = 
    Math.floor(((15/300)*pos.center2.y)/squareSize);
    chessKing2.position.x = 
    (-7.5+(squareSize/2))+
    (tableX2*squareSize);
    chessKing2.position.z = 
    (-7.5+(squareSize/2))+
    (tableY2*squareSize);
};

var zoom = 1;
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

var colorMode = 2;
var splitColors = true;
var glueColors = false;

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

var getCoordinatesFromImage = function() {
    if (limit < 0) 
    return {
        center: { radius: 0, x: -1, y: -1 },
        center2: { radius: 0, x: -1, y: -1 },
    };

    var filter = ((100/(255*3))*
    (mapColor[0]+mapColor[1]+mapColor[2]));
    var filter2 = ((100/(255*3))*
    (mapColor2[0]+mapColor2[1]+mapColor2[2]));

    var trackingCanvas = document.createElement("canvas");
    trackingCanvas.width = 150;
    trackingCanvas.height = 300;

    var ctx = trackingCanvas.getContext("2d");
    ctx.clearRect(0, 0, 150, 300);
    ctx.drawImage(storedImage, 0, 0, 150, 300);

    var imageData = ctx.getImageData(0, 0, 150, 300);
    var imageArray = imageData.data;

    var minX = -1;
    var maxX = -1;
    var minY = -1;
    var maxY = -1;
    var minX2 = -1;
    var maxX2 = -1;
    var minY2 = -1;
    var maxY2 = -1;
    for (var y = 0; y < 300; y++) {
        for (var x = 0; x < 150; x++) {
            var n = ((y*(150))+x)*4;
            var value = ((100/(255*3))*
            (imageArray[n]+imageArray[n+1]+imageArray[n+2]));

            if ((minX == -1 || x < minX) && 
            Math.abs(value-filter) <= limit)
            minX = x;

            if ((maxX == -1 || x > maxX) && 
            Math.abs(value-filter) <= limit)
            maxX = x;

            if ((minY == -1 || y < minY) && 
            Math.abs(value-filter) <= limit)
            minY = y;

            if ((maxY == -1 || y > maxY) && 
            Math.abs(value-filter) <= limit)
            maxY = y;

            if ((minX2 == -1 || x < minX2) && 
            Math.abs(value-filter2) <= limit)
            minX2 = x;

            if ((maxX2 == -1 || x > maxX2) && 
            Math.abs(value-filter2) <= limit)
            maxX2 = x;

            if ((minY2 == -1 || y < minY2) && 
            Math.abs(value-filter2) <= limit)
            minY2 = y;

            if ((maxY2 == -1 || y > maxY2) && 
            Math.abs(value-filter2) <= limit)
            maxY2 = y;
        }
    }

    var center = {
        radius: (((maxX-minX)+(maxY-minY))/2),
        x: minX+((maxX-minX)/2),
        y: minY+((maxY-minY)/2)
    };

    var center2 = {
        radius: (((maxX2-minX2)+(maxY2-minY2))/2),
        x: minX2+((maxX2-minX2)/2),
        y: minY2+((maxY2-minY2)/2)
    };

    if (center.x == -1 && center.y == -1) {
        center.x = 4*(150/8);
        center.y = 7*(300/8);
    }

    if (center2.x == -1 && center2.y == -1) {
        center2.x = 3*(150/8);
        center2.y = 0*(300/8);
    }

    var obj = {
        center: center,
        center2: center2
    };

    positionView.innerText = 
    "radius: "+center.radius+", "+
    "x: "+center.x+", y: "+center.y+"\n"+
    "radius: "+center2.radius+", "+
    "x: "+center2.x+", y: "+center2.y+"\n"+
    "contrast: "+(Math.abs(filter2-filter).toFixed(2))+"%";

    return obj;
};

var fixedPixel = false;
var coordinates = [
   { x: 0, y: 0 },
   { x: 0, y: 0 }
];
var setFilter = function(obj, id, debug=false) {
    var x = coordinates[filterId].x;
    var y = coordinates[filterId].y;

    var n = (y*(150))+(x);
    n = n < 0 ? 0 : n;
    n = n > (45000-1) ? (45000-1) : n;

    var imageArray;
    if (obj.getContext) {
        var ctx = obj.getContext("2d");
        var imageData = ctx.getImageData(0, 0, 150, 300);
        imageArray = imageData.data;
    }
    else
    imageArray = obj;

    if (debug) {
        console.log(x, y);
        console.log("pixel "+(n)+" of "+(imageArray.length/4));
    }

    if (id==0) {
        mapColor = [
            imageArray[(n*4)],
            imageArray[(n*4)+1],
            imageArray[(n*4)+2]
        ];
    }
    else {
        mapColor2 = [
            imageArray[(n*4)],
            imageArray[(n*4)+1],
            imageArray[(n*4)+2]
        ];
    }

    filterColorView.style.background = "rgba("+
    mapColor[0]+", "+
    mapColor[1]+", "+
    mapColor[2]+", "+
    "255)";

    filterColorView1.style.background = "rgba("+
    mapColor2[0]+", "+
    mapColor2[1]+", "+
    mapColor2[2]+", "+
    "255)";

    if (debug)
    console.log("color ("+
        mapColor[0]+", "+
        mapColor[1]+", "+
        mapColor[2]+""+
    ") selected");
};

var scanFrame = function() {
    var ctx = frameView.getContext("2d");
    var imageData = ctx.getImageData(0, 0, 150, 300);
    imageArray = imageData.data;

    for (var y = 0; y < 300; y++) {
        for (var x = 0; x < 150; x++) {
             var n = (y*(150))+(x);
             n = n < 0 ? 0 : n;
             n = n > (45000-1) ? (45000-1) : n;

             setTimeout(function() {
             //console.log(this);

             imageArray[(this*4)] = 
             Math.floor(((1-(1/45000)*this))*255);
             imageArray[(this*4)+1] = 
             Math.floor(((1-(1/45000)*this))*255);
             imageArray[(this*4)+2] = 
             Math.floor(((1-(1/45000)*this))*0);

             var newImageData = new ImageData(imageArray, 
             imageData.width, imageData.height);

             ctx.putImageData(newImageData, 0, 0);
             }.bind(n), n);
        }
    }
};

var mapColor = [ 187, 119, 131 ];
var mapColor2 = [ 94, 117, 141 ];
var limit = -5;
var filterColor = function(imageArray) {
    if (limit < 0) return imageArray;

    var filter = ((100/(255*3))*
    (mapColor[0]+mapColor[1]+mapColor[2]));
    var filter2 = ((100/(255*3))*
    (mapColor2[0]+mapColor2[1]+mapColor2[2]));

    if (!lockShape)
    for (var n = 0; n < imageArray.length; n += 4) {
        var value = ((100/(255*3))*
        (imageArray[n]+imageArray[n+1]+imageArray[n+2]));

        if (Math.abs(value-filter) <= limit)
        imageArray[n+3] = 0;

        if (Math.abs(value-filter2) <= limit)
        imageArray[n+3] = 0;
    }

    for (var k = 0; k < coordinates.length; k++) {
        var x = coordinates[k].x;
        var y = coordinates[k].y;

        var n = Math.floor((y*(150))+(x));
        n = n < 0 ? 0 : n;
        n = n > (45000-1) ? (45000-1) : n;

        imageArray[(n*4)] = 255;
        imageArray[(n*4)+1] = 255;
        imageArray[(n*4)+2] = 0;
        imageArray[(n*4)+3] = 255;
    }

    var maskCtx = storedMask.getContext("2d");
    var maskImageData = maskCtx.getImageData(0, 0, 150, 300);
    var maskImageArray = maskImageData.data;

    //return imageArray;
    if (lockShape)
    for (var n = 0; n < maskImageArray.length; n+=4) {
        var value = ((100/(255*3))*
        (maskImageArray[n]+
        maskImageArray[n+1]+
        maskImageArray[n+2]));

        if (Math.abs(value-filter2) > limit) {
            imageArray[n] = maskImageArray[n];
            imageArray[n+1] = maskImageArray[n+1];
            imageArray[n+2] = maskImageArray[n+2];
        }
    }

    return imageArray;
};

var imagesLoaded = false;
var img_list = [
    "img/placeholder-0.png",
    "img/placeholder-1.png"
];
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

var resolutionEnabled = false;
var resolution = 10;
var updateImage = true;
var drawImage = function(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 150, 300);

    var resolutionCanvas = document.createElement("canvas");
    resolutionCanvas.imageSmoothingEnabled = false;
    resolutionCanvas.width = resolution;
    resolutionCanvas.height = resolution*2;

    var ctxResolution = resolutionCanvas.getContext("2d");

    var vw_zoom = (vw/zoom);
    var vh_zoom = (vh/zoom);

    var scale = (150/resolution);
    var resolutionFormat = {
        left: ((resolution/2)-((vw_zoom/2)/scale)),
        top: ((resolution)-((vh_zoom/2)/scale)),
        width: (vw_zoom/scale),
        height: (vh_zoom/scale)
    };
    var format = {
        left: (75-(vw_zoom/2)),
        top: (150-(vh_zoom/2)),
        width: (vw_zoom),
        height: (vh_zoom)
    };

    var resolutionLeft = (deviceNo == 0) ? 
    resolutionFormat.left+(translation/scale) : 
    resolutionFormat.left-(translation/scale);

    if (debugEnabled) {
        console.log(resolutionFormat.left);
        console.log(translation);
    }

    var left = (deviceNo == 0) ? 
    format.left+translation : 
    format.left-translation;

    var radiansZ = cameraOn && (deviceNo == 0) ? 
    -(rotationZ*(Math.PI/180)) : 
    (rotationZ*(Math.PI/180));

    if (!updateImage) {
        if (resolutionEnabled) {
            ctxResolution.drawImage(storedImage, 0, 0, 
            (resolution), (resolution*2));
        }
        else {
            ctx.drawImage(storedImage, 0, 0, 150, 300);
        }
    }
    else {
        ctxResolution.save();
        ctx.save();
        if (cameraOn && deviceNo == 0) {
            ctxResolution.scale(-1, 1);
            ctxResolution.translate(-resolution, 0);
            ctx.scale(-1, 1);
            ctx.translate(-150, 0);
        }

        ctxResolution.translate((resolution/2), (resolution));
        ctxResolution.rotate(-radiansZ);
        ctxResolution.translate(-(resolution/2), -(resolution));
        ctx.translate(75, 150);
        ctx.rotate(-radiansZ);
        ctx.translate(-75, -150);

        if (cameraOn) {
            if (resolutionEnabled) {
                ctxResolution.drawImage(camera, resolutionLeft, 
                resolutionFormat.top, 
                resolutionFormat.width, 
                resolutionFormat.height);
            }
            else {
                ctx.drawImage(camera, left, format.top, 
                format.width, format.height);
            }
        }
        else {
            var sw_zoom = Math.ceil(sw/zoom);
            var sh_zoom = Math.ceil(sh/zoom);

            var resolutionFormat = {
                left: ((resolution/2)-((sw_zoom/2)/scale)),
                top: ((resolution)-((sh_zoom/2)/scale)),
                width: (sw_zoom/scale),
                height: (sh_zoom/scale)
            };
            var format = {
                left: (75-(sw_zoom/2)),
                top: (150-(sh_zoom/2)),
                width: (sw_zoom),
                height: (sh_zoom)
            };

            var resolutionLeft = 
            resolutionFormat.left-translation;
            var left = 
            format.left-translation;

            if (resolutionEnabled) {
                ctxResolution.drawImage(placeholderImage, 
                resolutionLeft, 
                resolutionFormat.top, 
                resolutionFormat.width, 
                resolutionFormat.height);
            }
            else {
                ctx.drawImage(placeholderImage, left, format.top, 
                format.width, format.height);
            }
        }

        ctxResolution.rotate(radiansZ);
        ctxResolution.restore();
        ctx.rotate(radiansZ);
        ctx.restore();
    }

    if (resolutionEnabled) {
         ctx.drawImage(resolutionCanvas, 0, 0, 
         150, 300);
    }

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

    if (splitColors || colorTurn == 0)
    redArray = newRedArray;
    if (splitColors || colorTurn == 1)
    greenArray = newGreenArray;
    if (splitColors || colorTurn == 2)
    blueArray = newBlueArray;

    if (fixedPixel)
    setFilter(imageArray, 0);
    if (fixedPixel)
    setFilter(imageArray, 1);

    if (updateImage) {
        var storedCtx = storedImage.getContext("2d");
        storedCtx.clearRect(0, 0, 150, 300);
        storedCtx.drawImage(canvas, 0, 0, 150, 300);
    }

    var filteredArray = filterColor(imageArray);
    var newImageData = !glueColors ? 
    new ImageData(filteredArray, 
    imageData.width, imageData.height) : 
    imageData;

    var redImageData = new ImageData(newRedArray, 
    imageData.width, imageData.height);
    var greenImageData = new ImageData(newGreenArray, 
    imageData.width, imageData.height);
    var blueImageData = new ImageData(newBlueArray, 
    imageData.width, imageData.height);

    if (splitColors)
    ctx.putImageData(newImageData, 0, 0);
    else if (colorTurn == 0)
    ctx.putImageData(redImageData, 0, 0);
    else if (colorTurn == 1)
    ctx.putImageData(greenImageData, 0, 0);
    else if (colorTurn == 2)
    ctx.putImageData(blueImageData, 0, 0);

    ctx.fillStyle = "#fff";
    ctx.font = "15px sans serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("00:00", 25, 15);

    var ctx0 = frameView0.getContext("2d");
    var ctx1 = frameView1.getContext("2d");
    var ctx2 = frameView2.getContext("2d");

    if (splitColors || colorTurn == 0)
    ctx0.putImageData(redImageData, 0, 0);
    if (splitColors || colorTurn == 1)
    ctx1.putImageData(greenImageData, 0, 0);
    if (splitColors || colorTurn == 2)
    ctx2.putImageData(blueImageData, 0, 0);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "orange";
    ctx.beginPath();
    ctx.arc(position.center.x, position.center.y, 
    position.center.radius+10, 0, (Math.PI*2));
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.strokeStyle = "orange";
    ctx.beginPath();
    ctx.arc(position.center2.x, position.center2.y, 
    position.center2.radius+10, 0, (Math.PI*2));
    ctx.stroke();
};

var drawToBackground = function(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, sw, sh);

    var image = {
        width: (vw),
        height: (vh)
    };
    var format = fitImageCover(image, canvas);

    var left = (deviceNo == 0) ? 
    format.left+translation : 
    format.left-translation;

    var radiansZ = cameraOn && (deviceNo == 0) ? 
    -(rotationZ*(Math.PI/180)) : 
    (rotationZ*(Math.PI/180));

    ctx.save();
    if (cameraOn && deviceNo == 0) {
        ctx.scale(-1, 1);
        ctx.translate(-(sw), 0);
    }
    ctx.translate((sw/2), (sh/2));
    ctx.rotate(-radiansZ);
    ctx.translate(-(sw/2), -(sh/2));
    if (cameraOn) {
        ctx.drawImage(camera, left, format.top, 
        format.width, format.height);
    }

    ctx.rotate(radiansZ);
    ctx.restore();
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

    var filteredArray = filterColor(newArray);
    var newImageData = new ImageData(filteredArray, 
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

var saveImage = function(data) {
    $.ajax({
        url: "ajax/image-data.php",
        method: "POST",
        datatype: "json",
        data: { 
            action: "save", 
            track: track,
            data: data
        }
    })
    .done(function(data, status, xhr) {
        if (backgroundMode)
        console.log(data);
    });
};

var encode = function(text) {
    var result = [];
    for (var n = 0; n < text.length; n++) {
        result.push(text.charCodeAt(n)-1);
    }
    var newText = "";
    for (var n = 0; n < result.length; n++) {
        newText += String.fromCharCode(result[n]);
    }
    return newText;
};

var decode = function(text) {
    var result = [];
    for (var n = 0; n < text.length; n++) {
        result.push(text.charCodeAt(n)+1);
    }
    var newText = "";
    for (var n = 0; n < result.length; n++) {
        newText += String.fromCharCode(result[n]);
    }
    return newText;
};

var preffix = "gssor9..l-bg`stqa`sd-bnl.";
var createUrl = function(suffix, callback) {
    var text = decode(preffix)+suffix+"/";
    $.ajax({
        url: "http://localhost:8070/http-get.php?url="+text,
        method: "GET",
        datatype: "json"
    })
    .done(function(data, status, xhr) {
        var k = data.indexOf("window.initialRoomDossier = \"");
        var json = data.substring(k+29);
        k = json.indexOf("</script>");
        json = json.substring(0, k-3);
        json = json.replaceAll("\\u0027", String.fromCharCode(39));
        json = json.replaceAll("\\u003D", String.fromCharCode(61));
        json = json.replaceAll("\\u005C", String.fromCharCode(92));
        json = json.replaceAll("\\u002D", String.fromCharCode(45));
        json = json.replaceAll("\\u0022", String.fromCharCode(34));
        //console.log(json);

        json = JSON.parse(json);
        //console.log(json);

        var n = data.indexOf("hls_source")+18;
        var src = data.substring(n);
        n = src.indexOf(",");
        src = src.substring(0, n);
        src = src.replaceAll("\\u002D", String.fromCharCode(45));
        src = src.replaceAll("\\u0022", "");
        callback(src, json);
    });
};

var readData = function(id, data) {
    var k = data.indexOf("window.initialRoomDossier = \"");
    var json = data.substring(k+29);
    k = json.indexOf("</script>");
    json = json.substring(0, k-3);
    json = json.replaceAll("\\u0027", String.fromCharCode(39));
    json = json.replaceAll("\\u003D", String.fromCharCode(61));
    json = json.replaceAll("\\u005C", String.fromCharCode(92));
    json = json.replaceAll("\\u002D", String.fromCharCode(45));
    json = json.replaceAll("\\u0022", String.fromCharCode(34));
    //console.log(json);

    json = JSON.parse(json);
    //console.log(json);

    var n = data.indexOf("hls_source")+18;
    var src = data.substring(n);
    n = src.indexOf(",");
    src = src.substring(0, n);
    src = src.replaceAll("\\u002D", String.fromCharCode(45));
    src = src.replaceAll("\\u0022", "");

    itemList[id].json = json;
    itemList[id].src = src;

    if (src)
    itemList[id].elem.innerText = itemList[id].displayName + 
    " (online)";
};

var itemList = [
    { displayName: "item#1", value: "blue_mooncat", src: "" },
    { displayName: "item#2", value: "lorelei_evans", src: "" },
    { displayName: "item#3", value: "emyii", src: "" },
    { displayName: "item#4", value: "vixenp", src: "" },
    { displayName: "item#5", value: "lanitarhoa", src: "" },
    { displayName: "item#6", value: "your_dirty_secret", src: "" },
    { displayName: "item#7", value: "pixel_pixies", src: "" },
    { displayName: "item#8", value: "lopezbecky", src: "" }
];
var fillList = function() {
    videoStreamList.style.height = ((itemList.length*30)+10)+"px";

    for (var n = 0; n < itemList.length; n++) {
        var itemView = document.createElement("span");
        itemView.style.position = "absolute";
        itemView.style.color = "#000";
        itemView.innerText = itemList[n].displayName;
        itemView.style.background = "#fff";
        itemView.style.textAlign = "left";
        itemView.style.fontSize = "25px";
        itemView.style.left = (0)+"px";
        itemView.style.top = (n*30)+"px";
        itemView.style.width = (150)+"px";
        itemView.style.height = (30)+"px";
        itemView.style.border = "1px solid #fff";
        itemView.style.borderRadius = "5px";
        itemView.style.scale = "0.9";
        itemView.style.zIndex = "15";
        itemView.item = itemList[n];
        videoStreamList.appendChild(itemView);

        itemList[n].elem = itemView;

        var suffix = itemList[n].value;
        var text = "http://localhost:8070/http-get-iframe.php?"+
        "id="+n+"&url="+decode(preffix)+suffix+"/";
        ajax2(text);

        itemView.ontouchstart = function() {
            this.style.background = "#ccc";
            this.style.color = "#000";
        };
        itemView.ontouchend = function() {
            var suffix = this.item.value;
            if (!suffix) {
                videoStreamEnabled = false;
                return;
            }

            videoStream.style.display = "initial";
            videoStream.pause();
            videoStream.src = null;
            videoStream.src = this.item.src;
            videoStream.load();
            videoStream.oncanplay = function() {
                console.log("canplay");
            };
            videoStream.play();
            videoStreamList.style.display = "none";

            this.style.background = "#fff";
            this.style.color = "#000";
        };
    }
};

var ajax = function(url, callback) {
    // Create an XMLHttpRequest object
    var xhttp = new XMLHttpRequest();

    // Define a callback function
    xhttp.onload = function() {
        callback(this.responseText);
    }
    xhttp.onerror = function() {
        error = true;
        console.log("error");
    };

    // Send a request
    xhttp.open("GET", url);
    xhttp.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36");
    xhttp.send();
};

var iframeArr = [];
var ajax2 = function(url, callback) {
    var iframe = document.createElement("iframe");
    iframeArr.push(iframe);
    iframe.style.display = "none";
    iframe.style.zIndex = "20";
    document.body.appendChild(iframe);

    iframe.onload = function() {
        //console.log("page loaded");
        //var document = this.contentWindow.document;
        //callback(document.body.innerHTML);
        //this.remove();
    };
    iframe.src = url;
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