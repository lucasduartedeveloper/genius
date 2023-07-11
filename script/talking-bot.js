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

    $("#title")[0].innerText = "111";

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
        target -= 1;
        target = target < 0 ? 3 : target;
        for (var n = 0; n < buttons.length; n++) {
            buttons[n].className = "";
        }
        buttons[target].className = "fa-regular fa-circle";
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
        target += 1;
        target = target > 3 ? 0 : target;
        for (var n = 0; n < buttons.length; n++) {
            buttons[n].className = "";
        }
        buttons[target].className = "fa-regular fa-circle";
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

    canvasElem.addEventListener("animationend", function() {
        draw();
        canvasElem.classList.remove("animate__backOutLeft");
        canvasElem.classList.add("animate__backInLeft");
    });

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

    label = document.createElement("span");
    label.style.position = "absolute";
    label.innerHTML = "";
    label.style.fontSize = "25px";
    label.style.lineHeight = "25px";
    label.style.color = "#fff";
    label.style.left = ((sw/2)-150)+"px";
    label.style.top = ((sh/2)+250)+"px";
    label.style.width = (300)+"px";
    label.style.height = (25)+"px";
    label.style.zIndex = "3";
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

    draw();
    init();
    showPath();

    $("*").not("i").css("font-family", "Khand");

    $(".result-icon").css({
        "display": "inline-block",
        "width": "25px",
        "height": "25px"
    });

    mic = new EasyMicrophone();
    mic.onsuccess = function() { };
    mic.onupdate = function(freqArray, reachedFreq, avgValue) {
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

    setupKeys();
    monitorWebsocket();
});

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
var showPath = function() {
    locked = true;
    last_option = -1;
    colorHistory.innerHTML = "";
    label.innerHTML = "CPU";

    var n = 0;
    var show = function() {
        draw(path[n], n);
        distance.innerText = (n+1);

        if (n == (path.length-1)) {
            locked = false;
            label.innerHTML = "";
            beepPool.play("audio/game-notification.wav");

            clearInterval(showInterval);
            last_option = -1;

            if (debug) startBot();
        }
        else {
           n += 1;
           beepPool.play("audio/slot-in.wav");
        }
    }
    var showInterval = setInterval(show, 5000/speed);
    //show();
};

var validate = function(option) {
    adjustSpeed();
    var n = oto_path.length;

    if (path[n] == option) {
        oto_path.push(option);
        beepPool.play("audio/slot-in.wav");
        distance.innerText = (path.length - oto_path.length);

        if (oto_path.length == path.length) {
            draw(option, (oto_path.length-1));
            increase();
            return true;
        }
        draw(option);
        drawHistory();
    }
    else {
        beepPool.play("audio/mario-die_cut.wav");
        sortColors();
        init();
        canvasElem.classList.add("animate__backOutLeft");
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
        html += "<i style=\"color:"+colors[k]+"\" "+
        "class=\"fa-solid fa-circle\" />";
        if (n > limit)
        html += "&nbsp;";
    }
    colorHistory.innerHTML = html;
};

var color_list = [
    "#f00", "#ff0", "#0f0", "#00f",
    "#80f", "#f80", "#888", "#f08"
];
var colors = [ "#f00", "#ff0", "#0f0", "#00f" ];
var options = [ 2, 3, 0, 1 ];

var sortColors = function() {
    colors = [];
    var list = [ ... color_list ];
    for (var n = 0; n < 4; n++) {
        var rnd = Math.floor(Math.random()*list.length);
        colors.push(list.splice(rnd, 1)[0]);
    }
};

var loop = 0;
var last_option = -1;
var buttons = [];

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

    for (var n = 0; n < 4; n++) {
        ctx.beginPath();
        ctx.arc(x, y, (diam/2)+25, (n*((Math.PI*2)/4))+padding, 
        ((n+1)*((Math.PI*2)/4))-padding);

        ctx.arc(x, y, (diam/2)-25, ((n+1)*((Math.PI*2)/4))-(padding*2), 
        (n*((Math.PI*2)/4))+(padding*2), true);

        ctx.closePath();

        var grd = ctx.createRadialGradient(x, y, 25, x, y, 100);
        grd.addColorStop(0, "#fff");
        grd.addColorStop(1, colors[n]);

        ctx.lineWidth = 1;
        ctx.fillStyle = grd;
        ctx.strokeStyle = colors[n];

        ctx.fill();
        ctx.stroke();

        if (option == n) {
            if (last_option == n) loop += 1;
            else loop = 0;

            for (var k = 0; k <= loop; k++) {
                ctx.beginPath();
                ctx.arc(x, y, (diam/2)+45+(k*10), (n*((Math.PI*2)/4)), 
                ((n+1)*((Math.PI*2)/4)));
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

    getRandom();
    last_option = option;
};

var drawBubbles = function(amt) {
    var ctx = canvasElem.getContext("2d");
    var width = canvasElem.width;
    var height = canvasElem.height;

    var diam = width/2;
    var points = [];

    var x = 150;
    var y = 150;

    var padding = (Math.PI*2)/200;

    var region = new Path2D();
    ctx.save();
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

    for (var n = 0; n < amt; n++) {
        var x = 25+Math.floor(Math.random()*250);
        var y = 25+Math.floor(Math.random()*250);

        var diam = Math.floor(Math.random()*25)+5;

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

var speaking = false;
var lastText = "";
var say = function(text, lang) {
    lastText = text;
    var msg = new SpeechSynthesisUtterance();
    msg.lang = lang;
    //msg.lang = "ru-RU";
    msg.lang = "pt-BR";
    //msg.lang = "en-US";
    msg.text = text;
    msg.onend = function(event) {
         if (afterAudio) afterAudio();
    };
    window.speechSynthesis.speak(msg);
}

var cancelText = function() {
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

var getRandom2 = function(callback) {
    $.ajax({
        url: "ajax/get-random-docker.php",
        method: "GET"
    }).done(function(data, status, xhr) {
        //var obj = JSON.parse(data);
        //var arr = Object.entries(obj);
        //var amt = Math.floor(arr[2][1]/10);
        //drawBubbles(amt);
        console.log(data);
    });
};