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

    audioElem = document.createElement("canvas");
    audioElem.style.position = "absolute";
    audioElem.className = "animate__animated";
    audioElem.width = (300);
    audioElem.height = (50);
    //canvasElem.style.background = "#fff";
    audioElem.style.color = "#000";
    audioElem.style.left = ((sw/2)-150)+"px";
    audioElem.style.top = ((sh/2)-225)+"px";
    audioElem.style.width = (300)+"px";
    audioElem.style.height = (50)+"px";
    audioElem.style.overflowY = "auto";
    audioElem.style.zIndex = "3";
    audioElem.onclick = function() {
        if (mic.closed)
        mic.open(true, 250);
    };
    document.body.appendChild(audioElem);

    canvasElem = document.createElement("canvas");
    canvasElem.style.position = "absolute";
    canvasElem.className = "animate__animated";
    canvasElem.width = (300);
    canvasElem.height = (300);
    //canvasElem.style.background = "#fff";
    canvasElem.style.color = "#000";
    canvasElem.style.left = ((sw/2)-150)+"px";
    canvasElem.style.top = ((sh/2)-150)+"px";
    canvasElem.style.width = (300)+"px";
    canvasElem.style.height = (300)+"px";
    canvasElem.style.overflowY = "auto";
    canvasElem.style.zIndex = "3";
    document.body.appendChild(canvasElem);

    canvasElem.addEventListener("animationend", function() {
        draw();
        canvasElem.classList.remove("animate__backOutLeft");
        canvasElem.classList.add("animate__backInLeft");
    });

    bubblesElem = document.createElement("canvas");
    bubblesElem.style.position = "absolute";
    bubblesElem.className = "animate__animated";
    bubblesElem.width = (300);
    bubblesElem.height = (300);
    //bubblesElem.style.background = "#fff";
    bubblesElem.style.color = "#000";
    bubblesElem.style.left = ((sw/2)-150)+"px";
    bubblesElem.style.top = ((sh/2)-150)+"px";
    bubblesElem.style.width = (300)+"px";
    bubblesElem.style.height = (300)+"px";
    bubblesElem.style.overflowY = "auto";
    bubblesElem.style.zIndex = "3";
    document.body.appendChild(bubblesElem);

    bubblesElem.addEventListener("animationend", function() {
        animateBubbles();
        bubblesElem.classList.remove("animate__backOutLeft");
        bubblesElem.classList.add("animate__backInLeft");
    });

    positionElem = document.createElement("canvas");
    positionElem.style.position = "absolute";
    positionElem.className = "animate__animated";
    positionElem.width = (300);
    positionElem.height = (300);
    //bubblesElem.style.background = "#fff";
    positionElem.style.color = "#000";
    positionElem.style.left = ((sw/2)-150)+"px";
    positionElem.style.top = ((sh/2)-150)+"px";
    positionElem.style.width = (300)+"px";
    positionElem.style.height = (300)+"px";
    positionElem.style.overflowY = "auto";
    positionElem.style.zIndex = "3";
    document.body.appendChild(positionElem);

    positionElem.addEventListener("animationend", function() {
        animateBubbles();
        positionElem.classList.remove("animate__backOutLeft");
        positionElem.classList.add("animate__backInLeft");
    });

    target = 0;
    previousTargetBtn = document.createElement("button");
    previousTargetBtn.style.position = "absolute";
    previousTargetBtn.className = "animate__animated";
    previousTargetBtn.style.color = "#000";
    previousTargetBtn.style.fontSize = "10px";
    previousTargetBtn.style.left = ((sw/2)+150)+"px";
    previousTargetBtn.style.top = ((sh/2)+125)+"px";
    previousTargetBtn.style.width = (20)+"px";
    previousTargetBtn.style.height = (20)+"px";
    previousTargetBtn.style.overflowY = "auto";
    previousTargetBtn.style.border = "1px solid white";
    previousTargetBtn.style.borderRadius = "50%";
    previousTargetBtn.style.zIndex = "3";
    previousTargetBtn.onclick = function() {
        var lastTarget = target;
        target -= 1;
        target = target < 0 ? 3 : target;
        for (var n = 0; n < buttons.length; n++) {
            buttons[n].className = "";
        }
        buttons[target].className = "fa-regular fa-circle";

        if (target != lastTarget) {
            end_angle += 90;
        }

        if (!unlockedAngles) unlockedAngles = true;
    };
    document.body.appendChild(previousTargetBtn);

    nextTargetBtn = document.createElement("button");
    nextTargetBtn.style.position = "absolute";
    nextTargetBtn.className = "animate__animated";
    nextTargetBtn.style.color = "#000";
    nextTargetBtn.style.fontSize = "10px";
    nextTargetBtn.style.left = ((sw/2)+150)+"px";
    nextTargetBtn.style.top = ((sh/2)+150)+"px";
    nextTargetBtn.style.width = (20)+"px";
    nextTargetBtn.style.height = (20)+"px";
    nextTargetBtn.style.overflowY = "auto";
    nextTargetBtn.style.border = "1px solid white";
    nextTargetBtn.style.borderRadius = "50%";
    nextTargetBtn.style.zIndex = "3";
    nextTargetBtn.onclick = function() {
        var lastTarget = target;
        target += 1;
        target = target > 3 ? 0 : target;
        for (var n = 0; n < buttons.length; n++) {
            buttons[n].className = "";
        }
        buttons[target].className = "fa-regular fa-circle";

        if (target != lastTarget) {
            end_angle -= 90;
        }

        if (!unlockedAngles) unlockedAngles = true;
    };
    document.body.appendChild(nextTargetBtn);

    pushTargetBtn = document.createElement("button");
    pushTargetBtn.style.position = "absolute";
    pushTargetBtn.className = "animate__animated";
    pushTargetBtn.style.color = "#000";
    pushTargetBtn.style.left = ((sw/2)+150)+"px";
    pushTargetBtn.style.top = ((sh/2)+175)+"px";
    pushTargetBtn.style.width = (20)+"px";
    pushTargetBtn.style.height = (20)+"px";
    pushTargetBtn.style.overflowY = "auto";
    pushTargetBtn.style.border = "1px solid white";
    pushTargetBtn.style.borderRadius = "50%";
    pushTargetBtn.style.zIndex = "3";
    pushTargetBtn.onclick = function() {
        buttons[target].click();
    };
    document.body.appendChild(pushTargetBtn);

    lockRotation = false;
    lockRotationBtn = document.createElement("i");
    lockRotationBtn.style.position = "absolute";
    lockRotationBtn.className = "fa-solid fa-xmark";
    lockRotationBtn.style.color = "#fff";
    lockRotationBtn.style.fontSize = "20px";
    lockRotationBtn.style.left = ((sw/2)+150)+"px";
    lockRotationBtn.style.top = ((sh/2)-125)+"px";
    lockRotationBtn.style.width = (20)+"px";
    lockRotationBtn.style.height = (20)+"px";
    lockRotationBtn.style.overflowY = "auto";
    //lockRotationBtn.style.border = "1px solid white";
    //lockRotationBtn.style.borderRadius = "50%";
    lockRotationBtn.style.zIndex = "3";
    lockRotationBtn.onclick = function() {
        lockRotation = !lockRotation;
        if (lockRotation) {
            if (rotation > 0)
            lockRotationBtn.className = "fa-solid fa-arrow-right";
            else if (rotation < 0)
            lockRotationBtn.className = "fa-solid fa-arrow-left";
        }
        else {
            lockRotationBtn.className = "fa-solid fa-xmark";
            animateBubbles();
        }
    };
    document.body.appendChild(lockRotationBtn);

    colorHistory = document.createElement("span");
    colorHistory.style.position = "absolute";
    colorHistory.innerHTML = "";
    colorHistory.style.fontSize = "18px";
    colorHistory.style.lineHeight = "25px";
    colorHistory.style.textAlign = "center";
    colorHistory.style.color = "#fff";
    colorHistory.style.left = ((sw/2)-(sw/2))+"px";
    colorHistory.style.top = ((sh/2)+200)+"px";
    colorHistory.style.width = (sw)+"px";
    colorHistory.style.height = (25)+"px";
    colorHistory.style.overflow = "hidden";
    colorHistory.style.zIndex = "3";
    document.body.appendChild(colorHistory);

    timeLabel = document.createElement("span");
    timeLabel.style.position = "absolute";
    timeLabel.innerText = "";
    timeLabel.style.fontSize = "25px";
    timeLabel.style.lineHeight = "25px";
    timeLabel.style.color = "#fff";
    timeLabel.style.left = ((sw/2)-150)+"px";
    timeLabel.style.top = ((sh/2)-250)+"px";
    timeLabel.style.width = (300)+"px";
    timeLabel.style.height = (25)+"px";
    timeLabel.style.zIndex = "3";
    document.body.appendChild(timeLabel);

    running = false;
    label = document.createElement("span");
    label.style.position = "absolute";
    label.innerHTML = "PLAY";
    label.style.fontSize = "25px";
    label.style.lineHeight = "25px";
    label.style.color = "#fff";
    label.style.left = ((sw/2)-150)+"px";
    label.style.top = ((sh/2)+250)+"px";
    label.style.width = (300)+"px";
    label.style.height = (25)+"px";
    label.style.zIndex = "3";
    label.onclick = function() {
        if (running) return;
        running = !running;
        debug = false;
        if (running) {
            init();
            showPath();
        }
    };
    label.ondblclick = function() {
        debug = !debug;
        if (debug) {
            label.innerHTML = "AUTOPILOT ON";
        }
        else {
            label.innerHTML = "AUTOPILOT OFF";
        }
    };
    document.body.appendChild(label);

    distance = document.createElement("span");
    distance.style.position = "absolute";
    distance.innerText = "0";
    distance.style.fontSize = "25px";
    distance.style.lineHeight = "50px";
    distance.style.color = "#fff";
    distance.style.textAlign = "center";
    distance.style.left = ((sw/2)-25)+"px";
    distance.style.top = ((sh/2)-25)+"px";
    distance.style.width = (50)+"px";
    distance.style.height = (50)+"px";
    distance.style.zIndex = "3";
    document.body.appendChild(distance);

    memorySizeLabel = document.createElement("span");
    memorySizeLabel.style.position = "absolute";
    memorySizeLabel.innerText = "0 colors";
    memorySizeLabel.style.fontSize = "15px";
    memorySizeLabel.style.lineHeight = "50px";
    memorySizeLabel.style.color = "#fff";
    memorySizeLabel.style.textAlign = "center";
    memorySizeLabel.style.left = ((sw/2)-150)+"px";
    memorySizeLabel.style.top = ((sh/2)-175)+"px";
    memorySizeLabel.style.width = (100)+"px";
    memorySizeLabel.style.height = (50)+"px";
    memorySizeLabel.style.zIndex = "3";
    document.body.appendChild(memorySizeLabel);

    draw();

    $("*").not("i").css("font-family", "Khand");

    $(".result-icon").css({
        "display": "inline-block",
        "width": "25px",
        "height": "25px"
    });

    var rested = false;
    mic = new EasyMicrophone();
    mic.onsuccess = function() { };
    mic.onupdate = function(freqArray, reachedFreq, avgValue) {
        volumeInfo.innerText = avgValue.toFixed(2);
        if (avgValue > 0.3)
        solve();

        if (avgValue <= 0.1)
        rested = true;

        var resumedWave = resumeWave(freqArray);
        analyseWave(resumedWave);
        drawAB(resumedWave, avgValue);
    };
    mic.onclose = function() { };
    var ab = new Array(50);
    for (var n = 0; n < 50; n++) {
        ab[n] = 0;
    }
    drawAB(ab);

    buttons = [];
    for (var n = 0; n < 4; n++) {
        var line = Math.floor((n/2));
        var col = (n%2);

        col = line == 1 ? 
        (col == 0 ? 1 : 0) : col;

        var btn = document.createElement("i");
        btn.id = "option-"+n+"-"+line+"-"+col;
        //btn.innerText = n;
        btn.style.position = "absolute";
        btn.style.lineHeight = "125px";
        //btn.style.opacity = "0";
        btn.style.color = "#000";
        btn.x = 
        ((sw/2)-(50+62.5))+(col*(50+62.5))-(col*(125-(50+62.5)))+62.5;
        btn.y = 
        ((sh/2)-(50+62.5))+(line*(50+62.5))-(line*(125-(50+62.5)))+62.5;
        btn.style.left = 
        ((sw/2)-(50+62.5))+(col*(50+62.5))-(col*(125-(50+62.5)))+"px";
        btn.style.top = 
        ((sh/2)-(50+62.5))+(line*(50+62.5))-(line*(125-(50+62.5)))+"px";
        btn.style.width = (125)+"px";
        btn.style.height = (125)+"px";
        //btn.style.border = "1px solid #fff";
        btn.style.borderRadius = "50%";
        btn.style.zIndex = "3";
        btn.option = options[n];
        btn.onclick = function() {
            if (locked) return;
            if (validate(this.option)) {
                oto_path = [];
                showPath();
            }
        };
        document.body.appendChild(btn);

        buttons.push(btn);
    }

    isMobile = isMobile();
    if (isMobile)
    monitorMovement();
    else
    getBubbles();

    setupKeys();
    monitorWebsocket();

    buildInfo = document.createElement("span");
    buildInfo.style.position = "absolute";
    buildInfo.innerText = "";
    buildInfo.style.fontSize = "10px";
    buildInfo.style.lineHeight = "25px";
    buildInfo.style.color = "#8f8";
    buildInfo.style.left = (0)+"px";
    buildInfo.style.top = (0)+"px";
    buildInfo.style.width = (50)+"px";
    buildInfo.style.height = (25)+"px";
    buildInfo.style.zIndex = "3";
    document.body.appendChild(buildInfo);

    getBuildNo();

    volumeInfo = document.createElement("span");
    volumeInfo.style.position = "absolute";
    volumeInfo.innerText = "0.00";
    volumeInfo.style.fontSize = "10px";
    volumeInfo.style.lineHeight = "25px";
    volumeInfo.style.color = "#f80";
    volumeInfo.style.right = (0)+"px";
    volumeInfo.style.top = (0)+"px";
    volumeInfo.style.width = (50)+"px";
    volumeInfo.style.height = (25)+"px";
    volumeInfo.style.zIndex = "3";
    document.body.appendChild(volumeInfo);

    remoteAudioBtn = document.createElement("i");
    remoteAudioBtn.style.position = "absolute";
    remoteAudioBtn.className = "fa-solid fa-envelope";
    remoteAudioBtn.style.color = "#fff";
    remoteAudioBtn.style.fontSize = "20px";
    remoteAudioBtn.style.left = (10)+"px";
    remoteAudioBtn.style.bottom = (10)+"px";
    remoteAudioBtn.style.width = (20)+"px";
    remoteAudioBtn.style.height = (20)+"px";
    remoteAudioBtn.style.overflowY = "auto";
    remoteAudioBtn.style.zIndex = "3";
    remoteAudioBtn.onclick = function() {
        window.open("remote-audio/", "_blank");
    };
    document.body.appendChild(remoteAudioBtn);

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-audio-attached") {
            remote = true;
        }
        else if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-audio-ended") {
            if (afterAudio_callback)
            afterAudio_callback();
            afterAudio_callback = false;
        }
        else if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-gamepad-attached") {
            remoteGamepad = true;
        }
        else if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-gamepad") {
            buttonSet = JSON.parse(msg[3]);
        }
    }

    ws.send("PAPER|"+playerId+"|remote-audio-attach");
    ws.send("PAPER|"+playerId+"|remote-gamepad-attach");
});

var unlockedAngles = false;

var angle = 315;
var loose_angle = 315;
var end_angle = 315;

var setButtonsPositionFromAngle = function() {
    for (var n = 0; n < 4; n++) {
        var c = {
            x: (sw/2),
            y: (sh/2)
        };
        var p = {
            x: buttons[n].x,
            y: buttons[n].y
        };
        var result = _rotate2d(c, p, -angle);

        buttons[n].style.left = (result.x-62.5)+"px";
        buttons[n].style.top = (result.y-62.5)+"px";
    }
}
var rotateAll = function(angleDiff=0) {
    if (angleDiff == 0 && end_angle != loose_angle) {
        angleDiff = (45/3);
        if (end_angle < loose_angle) angleDiff *= -1;
    }

    angle = convertAngle(angle + angleDiff);
    loose_angle = (loose_angle + angleDiff);

    if ((angleDiff > 0 && loose_angle > end_angle) ||
    (angleDiff < 0 &&  loose_angle < end_angle))
    loose_angle = end_angle;

    setButtonsPositionFromAngle();

    draw(last_option, last_index);
    drawBubbles();

    setTargetFromAngle();
};
var setTargetFromAngle = function() {
    var targetAngle = 360-convertAngle(angle-90);
    target = Math.floor(targetAngle/90);

    /*console.log(
    "angle: "+angle+"°", 
    "linked angle:"+targetAngle+"°", 
    "target: "+target);*/

    for (var n = 0; n < buttons.length; n++) {
        buttons[n].className = "";
    }
    buttons[target].className = "fa-regular fa-circle";
};
var convertAngle = function(lostAngle) {
    var result = lostAngle;
    if (result > 360) result = result-360;
    if (result < 1) result = 360-(result*-1);
    return result;
};

// 315 -> 45
var getAngleDiff = function() {
    return (loose_angle-end_angle);
};

var memorySize_name = [
    "to do"
];
var memorySize = 0;

var getBuildNo = function() {
    $.ajax({
        url: "ajax/http-get.php?url="+
        "https://genius-wm1f.onrender.com/version.txt",
        method: "GET"
    }).done(function(data, status, xhr) {
        buildInfo.innerText = "build no. "+data;
    });
};

var wave = [];
var analyseWave = function(freqArray) {
     wave = [ ...wave, ...freqArray ];
};

var resumeWave = function(freqArray) {
    var blocks = 50;
    var blockSize = Math.floor(freqArray.length / blocks);

    var resumedArray = [];
    var sum = 0;
    for (var n = 0; n < blocks; n++) {
        sum = 0;
        for (var k = 0; k < blockSize; k++) {
            var m = (n * blockSize) + k;
             if ((m+1) <= freqArray.length) {
                 sum += freqArray[m];
             }
        }

        resumedArray.push(sum/blockSize);
    }
    //console.log(blockSize);
    //console.log(resumedArray);

    return resumedArray;
};

var drawAB = 
function(freqArray=false, avgValue=0) {

    var canvas = audioElem;
    var ctx = canvas.getContext("2d");

    var offset = 0;
    var polygon = [];

    // create waveform A
    if (freqArray) 
    offset = (canvas.width/freqArray.length)/2;
    if (freqArray) 
    for (var n = 0; n < freqArray.length; n++) {
        var obj = {
            x: offset+(n*(canvas.width/freqArray.length)),
            y0: (25)+
            (-freqArray[n]*25),
            y1: (25)+
            (freqArray[n]*25)
        };
        polygon.push(obj);
    }

    // draw waveform A
    ctx.strokeStyle = "#fff";

    if (freqArray) {
        ctx.lineWidth = (canvas.width/freqArray.length)-2;
        ctx.clearRect(0, 0, canvas.width, 100);
    }
    if (freqArray)
    for (var n = 0; n < polygon.length; n++) {
        ctx.beginPath();
        ctx.moveTo(polygon[n].x, polygon[n].y0-1);
        ctx.lineTo(polygon[n].x, polygon[n].y1+1);
        ctx.stroke();
    }
};

var speed = 1;
var path = [];
var oto_path = [];

var init = function() {
    distance.innerText = "0";
    speed = 1;
    oto_path = [];
    path = [];
    increase();
}; 

var increase = function() {
    //speed += 1;
    var rnd = Math.floor(Math.random()*4);
    path.push(rnd);
};

var locked = false;
var showInterval = false;
var showPath = function() {
    locked = true;
    last_option = -1;
    colorHistory.innerHTML = "";
    label.innerHTML = "CPU";

    var n = 0;
    var show = function() {
        setLoop("cpu", n);
        setRotation("cpu", n);

        draw(path[n], n);
        distance.innerText = (n+1);

        if (n == (path.length-1)) {
            locked = false;
            label.innerHTML = "";
            beepPool.play("audio/game-notification.wav");

            clearInterval(showInterval);
            last_option = -1;

            say("", function() {
                if (debug) startBot();
                else {
                    if (!unlockedAngles)
                    wait(0, 2000, 4000);
                }
            });
        }
        else {
           n += 1;
           beepPool.play("audio/slot-in.wav");
           //navigator.vibrate(200);
        }
    }

    say("", function() {
        showInterval = setInterval(show, 5000/speed);
    });
    //show();
};

var validate = function(option) {
    adjustSpeed();
    var n = oto_path.length;
    if (!running) {
        oto_path.push(option);
        setLoop("user", (oto_path.length-1));
        setRotation("user", n);
        beepPool.play("audio/slot-in.wav");

        //navigator.vibrate(200);

        draw(option, (oto_path.length-1));
        distance.innerText = (oto_path.length);
        return;
    }

    if (path[n] == option) {
        oto_path.push(option);

        setLoop("user", (oto_path.length-1));
        setRotation("user", n);

        beepPool.play("audio/slot-in.wav");
        distance.innerText = (path.length - oto_path.length);

        //navigator.vibrate(200);
        if (oto_path.length == path.length) {
            if (!unlockedAngles)
            skip();

            if (oto_path.length % 5 == 0)
            say("You accumulated "+oto_path.length+" colors.");

            draw(option, (oto_path.length-1));
            increase();
            return true;
        }

        if (!unlockedAngles)
        skip();

        if (oto_path.length % 5 == 0)
        say("You accumulated "+oto_path.length+" colors.");

        draw(option);
        drawHistory();

        if (!unlockedAngles)
        wait(n+1);
    }
    else {
        // save memory size
        memorySize = oto_path.length;
        /*oto_path.length > memorySize ?
        oto_path.length : memorySize;*/

        memorySizeLabel.innerText = 
        memorySize+" color";
        memorySizeLabel.innerText += 
        memorySize > 1 || memorySize == 0 ? 
        "s" : "";

        /*if (memorySize > 0)
        memorySizeLabel.innerText = 
        memorySize_name[memorySize-1];*/

        skip();
        beepPool.play("audio/mario-die_cut.wav");
        say("No! You misclicked "+colors[option].name+" for "+
        colors[path[n]].name+".");
        //say("No! It was "+colors[path[n]].name+".");
        //say("You forgot "+colors[path[n]].name+"!");
        sortColors();
        init();
        stopAnimation = true;
        canvasElem.classList.add("animate__backOutLeft");
        bubblesElem.classList.add("animate__backOutLeft");
        return true;
    }

    return false;
};

var multiplier = 2;
var averageTime = 0;
var lastTime = 0;
var adjustSpeed = function() {
    if (lastTime > 0) {
        averageTime += new Date().getTime() - lastTime;
        averageTime /= 2;
        timeLabel.innerText = 
        (averageTime/(1000*multiplier)).toFixed(3)+" s";
    }
    if (averageTime > 0) {
        speed = (5000/averageTime)*multiplier;
    }
    lastTime = new Date().getTime();
};

var drawHistory = function() {
    var html = "";
    var limit = oto_path.length-5;
    limit = limit >= 0 ? limit : 0;

    for (var n = oto_path.length-1; n >= limit; n--) {
        var k = oto_path[n];
        html += "<i style=\"color:"+colors[k].code+"\" "+
        "class=\"fa-solid fa-circle\" />";
        if (n > limit)
        html += "&nbsp;";
    }
    colorHistory.innerHTML = html;
};

var color_list = [
    { name: "red", code: "#f00" }, 
    { name: "yellow", code: "#ff0" }, 
    { name: "green", code: "#0f0" }, 
    { name: "blue", code: "#00f" },
    { name: "purple", code: "#80f" }, 
    { name: "orange", code: "#f80" }, 
    { name: "gray", code: "#888" }, 
    { name: "pink", code: "#f08" }
];
var colors = [ color_list[0], color_list[1], color_list[2], color_list[3] ];

var options = [ 0, 1, 2, 3 ];

var sortColors = function() {
    colors = [];
    var list = [ ... color_list ];
    for (var n = 0; n < 4; n++) {
        var rnd = Math.floor(Math.random()*list.length);
        colors.push(list.splice(rnd, 1)[0]);
    }
};

var loop = 0;
var last_index = -1;
var last_option = -1;

var draw = function(option=-1, index=-1) {
    var ctx = canvasElem.getContext("2d");
    var width = canvasElem.width;
    var height = canvasElem.height;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgba(150, 255, 150, 255)";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;

    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    var diam = width/2;
    var points = [];

    var x = 150;
    var y = 150;

    var padding = (Math.PI*2)/200;

    if (unlockedAngles) {
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(x-15, 0);
        ctx.lineTo(x+15, 0);
        //ctx.moveTo(x+15, 0);
        ctx.lineTo(x, 25);
        //ctx.moveTo(x, 25);
        ctx.lineTo(x-15, 0);
        ctx.closePath();
        ctx.fill();
        //ctx.stroke();
    }
    
    ctx.save();
    ctx.translate(150, 150);
    if (unlockedAngles)
    ctx.rotate((Math.PI/180)*angle);
    ctx.translate(-150, -150);

    for (var n = 0; n < 4; n++) {
        ctx.beginPath();
        ctx.arc(x, y, (diam/2)+25, 
        ((n*((Math.PI*2)/4))+padding)-((Math.PI*2)/2), 
        (((n+1)*((Math.PI*2)/4))-padding)-((Math.PI*2)/2));

        ctx.arc(x, y, (diam/2)-25, 
        (((n+1)*((Math.PI*2)/4))-(padding*2))-((Math.PI*2)/2), 
        ((n*((Math.PI*2)/4))+(padding*2))-((Math.PI*2)/2), true);

        ctx.closePath();

        var grd = ctx.createRadialGradient(x, y, 25, x, y, 100);
        grd.addColorStop(0, "#fff");
        grd.addColorStop(1, colors[n].code);

        ctx.lineWidth = 1;
        ctx.fillStyle = grd;
        ctx.strokeStyle = colors[n].code;

        ctx.fill();
        ctx.stroke();

        if (option == n) {
            for (var k = 0; k <= loop; k++) {
                ctx.beginPath();
                ctx.arc(x, y, (diam/2)+45+(k*10), 
                ((n*((Math.PI*2)/4)))-((Math.PI*2)/2), 
                (((n+1)*((Math.PI*2)/4)))-((Math.PI*2)/2));
                //ctx.fill();

                ctx.lineWidth = 1.5;
                ctx.strokeStyle = "#fff";
                ctx.stroke();
            }
        }

        if (index == path.length-1) {
            ctx.beginPath();
            ctx.arc(x, y, (diam/2)+35, 0, (Math.PI*2));
            //ctx.fill();

            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
        }
    }

    // light filter
    ctx.arc(x, y, (diam/2)+25, 0, (Math.PI*2));
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fill();

    ctx.restore();
    last_option = option;
    last_index = index;
};

var setLoop = function(from, n) {
    loop = 0;
    var last_option = from == "cpu" ?
    path[0] : oto_path[0];
    var moves = n+1;

    for (var n = 1; n < moves; n++) {
        var option = from == "cpu" ?
        path[n] : oto_path[n];
        if (option == last_option) loop += 1;
        else loop = 0;
        last_option = option;
    }
};

var bubbles = [];
var drawBubbles = function() {
    var ctx = bubblesElem.getContext("2d");
    var width = bubblesElem.width;
    var height = bubblesElem.height;

    ctx.clearRect(0, 0, 300, 300);

    var diam = width/2;
    var points = [];

    var x = 150;
    var y = 150;

    var padding = (Math.PI*2)/200;

    ctx.save();
    ctx.translate(150, 150);
    if (unlockedAngles)
    ctx.rotate((Math.PI/180)*angle);
    ctx.translate(-150, -150);

    var region = new Path2D();
    //ctx.save();
    /// change composite mode to use that shape
    //ctx.globalCompositeOperation = "source-in";

    for (var n = 0; n < 4; n++) {
        ctx.beginPath();
        ctx.arc(x, y, (diam/2)+25, (n*((Math.PI*2)/4))+padding, 
        ((n+1)*((Math.PI*2)/4))-padding);

        ctx.arc(x, y, (diam/2)-25, ((n+1)*((Math.PI*2)/4))-(padding*2), 
        (n*((Math.PI*2)/4))+(padding*2), true);

        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = "#ccc";
        //ctx.fill();
        //ctx.clip();
    }

    region.arc(x, y, (diam/2)+25, 0, (Math.PI*2));
    region.arc(x, y, (diam/2)-25, 0, (Math.PI*2));
    region.rect(x-((diam/2)+25), y-3, (50), 6);
    region.rect(x+((diam/2)-25), y-3, (50), 6);
    region.rect(x-3, y-((diam/2)+25), 6, (50));
    region.rect(x-3, y+((diam/2)-25), 6, (50));
    //region.closePath();

    ctx.fillStyle = "#ccc";
    //ctx.fill(region, "evenodd");
    ctx.clip(region, "evenodd");

    for (var n = 0; n < bubbles.length; n++) {
        var x = bubbles[n].x; //25+Math.floor(Math.random()*250);
        var y = bubbles[n].y; //25+Math.floor(Math.random()*250);

        var diam = bubbles[n].diam; //Math.floor(Math.random()*25)+5;

        ctx.beginPath();
        ctx.arc(x, y, (diam/2), 0, (Math.PI*2));

        var grd = 
        ctx.createRadialGradient(x+2, y+2, (diam/2), 
        x+2, y+2, (diam/4));
        grd.addColorStop(0, "rgba(255,255,255,0.3)");
        grd.addColorStop(1, "rgba(255,255,255,0)");

        ctx.lineWidth = 1;
        ctx.fillStyle = grd;
        ctx.strokeStyle = "rgba(255,255,255,0.3)";

        ctx.fill();
        ctx.stroke();
    }

    ctx.restore();
};

var monitorWebsocket = function() {
    setInterval(function() {
        ws.send("PAPER|"+playerId+"|call-devices");
        //showConnections();
    }, 10000);
};

var escapeHtml = function(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
};

var remote = false;
var speaking = false;
var lastText = "";
var afterAudio_callback = false;

var say = function(text, afterAudio) {;
    if (remote) {
        ws.send("PAPER|"+playerId+"|remote-audio|"+text);
        afterAudio_callback = afterAudio;
        return;
    }
    //console.log("say: ", text);
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

var cancelText = function() {
    //console.log("window.speechSynthesis.cancel()");
    window.speechSynthesis.cancel();
}

var debug = false;
var startBot = function() {
    label.innerHTML = "AUTOPILOT";

    var rnd = Math.floor(Math.random()*111)+1;
    var option_list = [ ...options ];

    var n = 0;
    var botInterval = setInterval(function() {
        var option = path[n];
        var k = options.indexOf(option);
        option_list = option_list.splice(k, 1);

        if (rnd == 111) k = option_list[0];
        buttons[k].click();

        if (n == path.length-1) {
            clearInterval(botInterval);
        }
        else n += 1;
    }, 1000);
};

var solve = function() {
    var n = oto_path.length;
    var option = path[n];
    var k = options.indexOf(option);
    buttons[k].click();
};

var setupKeys = function() {
    window.addEventListener("keyup", (event) => {
        if (event.isComposing || event.keyCode === 229) {
            return;
        }
        // do something
        switch (event.keyCode) {
        case 65:
            previousTargetBtn.click();
            break;
        case 68:
            nextTargetBtn.click();
            break;
        case 87:
            pushTargetBtn.click();
            break;
        }
    });
};

var getRandom = function(callback) {
    $.ajax({
        url: "ajax/get-random.php",
        method: "GET"
    }).done(function(data, status, xhr) {
        var obj = JSON.parse(data);
        var arr = Object.entries(obj);
        var amt = Math.floor(arr[2][1]/10);
        drawBubbles(amt);
    });
};

var getBubbles = function(callback) {
    $.ajax({
        url: "ajax/get-random-docker.php",
        method: "GET"
    }).done(function(data, status, xhr) {
        var obj = JSON.parse(data);
        //var arr = Object.entries(obj);
        var amt = Math.floor(obj.z/10);
        for (var n = 0; n < amt; n++) {
            var bubble = {
                x: 25+Math.floor(Math.random()*250),
                y: 25+Math.floor(Math.random()*250),
                diam: Math.floor(Math.random()*25)+5
            };
            bubbles.push(bubble);
        }
        //drawBubbles(amt);
        animateBubbles();
    });
};

var remoteGamepad = false;
var buttonSet = [];

var stopAnimation = false;
var rotation = 0;
var animateBubbles = function() {
    if (lockRotation) return;
    for (var n = 0; n < bubbles.length; n++) {
        var c = { x: 150, y: 150 };
        var p = { x: bubbles[n].x, y: bubbles[n].y };
        var r = _rotate2d(c, p, (1-((1/30)*bubbles[n].diam))*
        ((90/60)*rotation));
        bubbles[n].x = r.x;
        bubbles[n].y = r.y;
    }
    if (!unlockedAngles)
    drawBubbles();
    if (stopAnimation) {
        stopAnimation = false;
        return;
    }

    if (!remoteGamepad)
    buttonSet = listGamepadButtons();

    if (rescueButtonFromSet(buttonSet, 6).value == 1) {
        debug = !debug;
        var state = debug ? "ON" : "OFF";
        say("AUTOPILOT "+state);
        label.innerHTML = "AUTOPILOT "+state;
    }
    else if (locked && 
    rescueButtonFromSet(buttonSet, 6).value == 0 &&
    buttonSet.length > 0)
    say("CPU is in control!");
    else if (rescueButtonFromSet(buttonSet, 4).value != 0)
    previousTargetBtn.click();
    else if (rescueButtonFromSet(buttonSet, 5).value != 0)
    nextTargetBtn.click();
    else if (rescueButtonFromSet(buttonSet, 2).value != 0)
    pushTargetBtn.click();
    else if (rescueButtonFromSet(buttonSet, 1).value != 0)
    say("You forgot "+colors[path[oto_path.length]].name+"!");
    else if (rescueButtonFromSet(buttonSet, 3).value != 0)
    say("You should be looking at "+colors[target].name+".");
    else if (rescueButtonFromSet(buttonSet, 8).value != 0) {
        averageTime = 0;
        timeLabel.innerText = 
        (averageTime/(1000*multiplier)).toFixed(3)+" s";
        say("Restarted timer.");
    }
    else if (rescueButtonFromSet(buttonSet, 9).value != 0) {
        label.click();
        say("Game started.");
    }

    if (end_angle != loose_angle) {
        rotateAll();
    }

    buttonSet = [];

    requestAnimationFrame(animateBubbles);
};

var setRotation = function(from, n) {
    var result = 0;

    var last_option = from == "cpu" ?
    path[0] : oto_path[0];
    var moves = n+1;

    //console.log(" ----- setRotation("+from+") ");
    if (moves >= 2)
    for (var n = 0; n < moves; n++) {
        var option = from == "cpu" ?
        path[n] : oto_path[n];

        var force = 0;
        var flip = Math.abs(option-last_option) > 1;

        if (last_option == 3 && option == 0) 
        flip = false;
        if (last_option == 0 && option == 3) 
        flip = false;

        if (!flip && option > last_option)
        force = -1;
        else if (!flip && option < last_option)
        force = 1;

        if (last_option == 3 && option == 0) 
        force = -1;

        if (last_option == 0 && option == 3) 
        force = 1;

        result += force;

        /*console.log(
        last_option+" to "+option+" = "+result);*/

        last_option = from == "cpu" ?
        path[n] : oto_path[n];
    }

    rotation = result;
    //playMusic();
};

var leftAudio = new Audio("audio/left-audio.wav");
var rightAudio = new Audio("audio/right-audio.wav");

var playMusic = function() {
    leftAudio.loop = true;
    rightAudio.loop = true;

    if (leftAudio.paused)
    leftAudio.play();

    if (rightAudio.paused)
    rightAudio.play();

    var leftAudioSpeed =
    rotation < 0 ? (rotation*-1) : 0;

    var rightAudioSpeed =
    rotation > 0 ? (rotation) : 0;

    leftAudio.playbackRate = leftAudioSpeed;
    rightAudio.playbackRate = rightAudioSpeed;
};

var monitorMovement = function() {
    motion = true;
    var last_accX = 0;
    var last_accY = 0;
    var last_accZ = 0;

    gyroUpdated = function(ev) {
        var amt = (1-(bubbles.length/100))*
        Math.floor(Math.abs(ev.accY));

        for (var n = 0; n < amt; n++) {
            var bubble = {
                x: 25+Math.floor(Math.random()*250),
                y: 25+Math.floor(Math.random()*250),
                diam: Math.floor(Math.random()*25)+5
            };
            bubbles.push(bubble);
        }

        if (amt > 0)
        drawBubbles();

        if (bubbles.length == 100)
        motion = false;

        var angle = ((Math.PI*2)/4)+
        _angle2d(ev.accX, ev.accY)-
        (((Math.PI*2)/4)*3);

        //distance.innerText = ((180/Math.PI)*angle).toFixed(2)+"°";
        //drawPosition(angle);

        last_accX = ev.accX;
        last_accY = ev.accY;
        last_accZ = ev.accZ;
    };
    animateBubbles();
};

var waitTimeout = false;
var wait = function(index, fixedTime0=false, fixedTime1=false) {
    if (!hasMotionSensor) return;
    if (waitTimeout) clearTimeout(waitTimeout);
    //console.log("skipped");
    //console.log("waiting on "+colors[path[index]].name);

    var timeout0 = fixedTime0 ?
    fixedTime0 : averageTime*2;
    var timeout1 = fixedTime1 ?
    fixedTime1 : averageTime*3;

    waitTimeout = setTimeout(function() {
        navigator.vibrate(200);
        if (fixedTime0)
        say("It started with "+colors[path[index]].name+"!");
        else
        say("You forgot "+colors[path[index]].name+"!");
        //say("You didn't register "+colors[path[index]].name+"!");

        waitTimeout = setTimeout(function() {
            var text = "The colors you should be seeing are ";
            //var text = "The colors are ";
            for (var n = 0; n < colors.length/2; n++) {
                text += colors[n].name;
                if (n < colors.length-2)
                text += ", ";
                else if (n < colors.length-1)
                text += " and ";
            }
            for (var n = colors.length-1; n >= 2; n--) {
                text += colors[n].name;
                if (n > colors.length-2)
                text += " and ";
            }
            text += ". The next ";
            if ((index+1)<path.length) {
                text += "is "+colors[path[index]].name+
                " followed by "+colors[path[index+1]].name;
                //text += "is "+colors[path[index]].name+
                //" then "+colors[path[index+1]].name;
            }
            else {
                text += "is "+colors[path[index]].name;
            }
            text += ".";

            //text += ". The next is the "+
            //(path[index]+1)+suffix(path[index]+1)+".";
            say(text);
        }, timeout1);
    }, timeout0);
};

var suffix = function(pos) {
    var result = "";
    switch (pos) {
        case 1:
            result = "st";
            break;
        case 2:
            result = "nd";
            break;
        case 3:
            result = "rd";
            break;
        case 4:
            result = "th";
            break;
    }
    return result;
};

var skip = function() {
    if (waitTimeout) clearTimeout(waitTimeout);
    //console.log("skipped");
    cancelText();
};

var drawPosition = function(angle) {
    var ctx = positionElem.getContext("2d");
    var width = positionElem.width;
    var height = positionElem.height;

    ctx.clearRect(0, 0, 300, 300);

    var diam = width/2;
    var points = [];

    var x = 150;
    var y = 150;

    var padding = (Math.PI*2)/360;
    angle = angle-(((Math.PI*2)/8)*3);

    ctx.beginPath();
    ctx.arc(x, y, (diam/2)-30, angle-padding, angle+padding);

    ctx.closePath();

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
};

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