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

    monitorWebsocket();
});

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

var averageTime = 0;
var lastTime = 0;
var adjustSpeed = function() {
    if (lastTime > 0) {
        averageTime += new Date().getTime() - lastTime;
        averageTime /= 2;
        timeLabel.innerText = (averageTime/1000).toFixed(3)+" s";
    }
    if (averageTime > 0) {
        speed = 5000 / averageTime;
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
var options = [ 2, 3, 1, 0 ];

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
    for (var n = 0; n < buttons.length; n++) {
        buttons[n].remove();
    }

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

        var btn = document.createElement("button");
        btn.id = "option-"+n;
        btn.style.position = "absolute";
        btn.style.opacity = "0";
        btn.style.left = ((sw/2)-125)+((n%2)*125)+"px";
        btn.style.top = ((sh/2)-125)+(Math.floor((n/2))*125)+"px";
        btn.style.width = (125)+"px";
        btn.style.height = (125)+"px";
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
    last_option = option;
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

var getRandom = function(callback) {
    $.ajax({
        url: "ajax/get-random.php",
        method: "GET"
    }).done(function(data, status, xhr) {
        var pos = JSON.parse(data);
        pos.x = (1/1000)*pos.x;
        pos.y = (1/1000)*pos.y;
        callback(pos);
    });
};