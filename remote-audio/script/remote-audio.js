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

    label = document.createElement("span");
    label.style.position = "absolute";
    label.innerText = "READY";
    label.style.fontSize = "25px";
    label.style.lineHeight = "25px";
    label.style.color = "#fff";
    label.style.left = ((sw/2)-100)+"px";
    label.style.top = ((sh/2)-12.5)+"px";
    label.style.width = (200)+"px";
    label.style.height = (25)+"px";
    label.style.zIndex = "3";
    document.body.appendChild(label);

    voice_no = 0;
    labelLang = document.createElement("span");
    labelLang.style.position = "absolute";
    labelLang.innerText = "LOAD VOICES";
    labelLang.style.fontSize = "15px";
    labelLang.style.lineHeight = "25px";
    labelLang.style.color = "#fff";
    labelLang.style.left = ((sw/2)-100)+"px";
    labelLang.style.top = ((sh/2)+12.5)+"px";
    labelLang.style.width = (200)+"px";
    labelLang.style.height = (25)+"px";
    labelLang.style.zIndex = "3";
    labelLang.onclick = function() {
        if (voiceList.length == 0) {
            loadVoices(function(list) {
                labelLang.innerText = 
                voiceList[voice_no].lang + " - " + voiceList[voice_no].name;
            });
            return;
        }
        voice_no++;
        voice_no = voice_no > voiceList.length-1 ? 0 : voice_no;
        labelLang.innerText = 
        voiceList[voice_no].lang + " - " + voiceList[voice_no].name;
    };
    document.body.appendChild(labelLang);

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-audio-attach") {
            ws.send("PAPER|"+playerId+"|remote-audio-attached");
            label.innerText = "LISTENING";
        }
        else if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-audio") {
            say(msg[3]);
        }
    };

    $("*").not("i").css("font-family", "Khand");

    $(".result-icon").css({
        "display": "inline-block",
        "width": "25px",
        "height": "25px"
    });
});

var speaking = false;
var lastText = "";
var say = function(text, lang) {
    console.log("say: "+text);

    lastText = text;
    var msg = new SpeechSynthesisUtterance();
    if (voiceList.length == 0) {
         msg.lang = lang;
         msg.lang = "en-US";
         //msg.lang = "ru-RU";
         //msg.lang = "pt-BR";
    }
    else {
         msg.lang = voiceList[voice_no].lang;
         msg.voice = voiceList[voice_no];
    }
    msg.text = text;
    msg.onend = function(event) {
         if (afterAudio) afterAudio();
         ws.send("PAPER|"+playerId+"|remote-audio-ended");
    };
    window.speechSynthesis.speak(msg);
}