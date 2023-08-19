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
    $("#title").css("font-size", "30px");
    $("#title").css("color", "#fff");

    $("#title")[0].innerText = "";

    pressedLeft = false;
    pressedRight = false;
    rotation = 0;
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
    canvas.onpointerdown = function(e) {
         //console.log(e.clientX);
         if (e.clientX < (sw/2))
         pressedLeft = true;
         else if (e.clientX > (sw/2))
         pressedRight = true;
    };
    canvas.onpointerup = function() {
         navigator.vibrate(1000);
         pressedLeft = false;
         pressedRight = false;
    };
    document.body.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(150, 0);
    ctx.lineTo(100, 50);
    ctx.lineTo(125, 50);
    ctx.lineTo(125, 300);
    ctx.lineTo(175, 300);
    ctx.lineTo(175, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(150, 0);
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.save();
    ctx.font = "36px sans-serif";
    ctx.translate(150, 150);
    ctx.rotate(-(Math.PI/2));
    ctx.translate(-150, -150);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("", 150, 150);

    $("*").not("i").css("font-family", "Khand");

    $(".result-icon").css({
        "display": "inline-block",
        "width": "25px",
        "height": "25px"
    });

    gameLoop();
});

var muted = false;
var remote = false;

var speaking = false;
var lastText = "";
var afterAudio_callback = false;

var gameLoop = function() {
    if (pressedLeft)
    rotation -= 360/180;
    else if (pressedRight)
    rotation += 360/180;
    rotation = rotation < 0 ? 360 : rotation;
    rotation = rotation > 360 ? 0 : rotation;
    canvas.style.transform = "scale(0.8) "+
    "rotateZ("+rotation+"deg)";
    requestAnimationFrame(gameLoop);
};

var say = function(text, afterAudio) {;
    if (muted) return;
    if (remote) {
        ws.send("PAPER|"+playerId+"|remote-audio|"+text);
        afterAudio_callback = afterAudio;
        return;
    }
    //console.log("say: ", text);
    lastText = text;
    var msg = new SpeechSynthesisUtterance();
    msg.lang = "pt-BR";
    //msg.lang = "en-US";
    //msg.lang = "ru-RU";
    msg.text = text;
    msg.onend = function(event) {
         if (afterAudio) afterAudio();
    };
    window.speechSynthesis.speak(msg);
};