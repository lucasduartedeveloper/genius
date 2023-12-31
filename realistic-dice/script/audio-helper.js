var slotInUrl = "audio/slot-in.wav";

class BeepPool {
    constructor() {
       this.stored = [];
       this.playing = [];
       this.used = 0;
    }
    play(url, callback=false) {
       //var stored = this.stored.filter((o) => { return o.id == url; })[0];
       //var beep0 = stored ? stored : new Audio(url);
       var beep0 = this.stored.length > 0 ?
       this.stored.pop() : new Audio(url);
       beep0.onended = function() {
           for (var k in this.pool.playing) {
               if (this.timestamp == this.pool.playing[k].timestamp) {
                   this.pool.stored.push(
                       this.pool.playing.splice(k, 1)[0]
                   );
                   this.pool.used += 1;
                   /*
                   info.innerText = "mp3: "+this.pool.used+
                   (this.pool.playing.length > 0 ?
                   "/"+this.pool.playing.length : "");*/
                   if (callback) callback();
               }
           }
       }
       this.playing.push(beep0);

       beep0.id = url;
       beep0.timestamp = new Date().getTime();
       beep0.pool = this;
       beep0.play();
       //navigator.vibrate(200);
    }
    empty() {
       this.stored = [];
       this.used = 0;
    }
}
var beepPool = new BeepPool();

var beforeAudio = false;
var afterAudio = false;

var speaking = false;
var lastText = "";
function say(text) {
    if (!audioBot) return;
    if (beforeAudio) beforeAudio(text);
    //if (text == lastText) return;
    lastText = text;
    if (!speaking) {
         speaking = true;
         var msg = new SpeechSynthesisUtterance();
         if (!voicesLoaded) msg.lang = language;
         else {
             msg.lang = voiceList[voice_no].lang;
             msg.voice = voiceList[voice_no];
         }
         msg.text = text;
         msg.onend = function(event) {
              speaking = false;
              if (afterAudio) afterAudio();
         };
         window.speechSynthesis.speak(msg);
         //console.log("0");
    }
}

var sayAny = function(text, obj, beforeAudio, afterAudio) {
    var msg = new SpeechSynthesisUtterance();
    if (!voicesLoaded) msg.lang = language;
    else {
         msg.lang = voiceList[voice_no].lang;
         msg.voice = voiceList[voice_no];
    }
    msg.text = text;
    msg.onstart = function(event) {
         if (beforeAudio) beforeAudio(obj);
    };
    msg.onend = function(event) {
         if (afterAudio) afterAudio(obj);
    };
    window.speechSynthesis.speak(msg);
};

var voice_no = 0;
var voiceList = [];
var voicesLoaded = false;
var voicesLoadedCallback = false;

var loadVoices = function(callback) {
    voicesLoadedCallback = callback;
    window.speechSynthesis.getVoices();
}

window.speechSynthesis.onvoiceschanged = function() {
    voiceList = window.speechSynthesis.getVoices();
    //voicesLoaded = true;
    if (voicesLoadedCallback) voicesLoadedCallback();
};

/*
    var msg = new SpeechSynthesisUtterance();
    msg.lang = "en-US";
    msg.text = "123";
    msg.onend = function(event) {
        speaking = false;
    };
    window.speechSynthesis.speak(msg);
*/