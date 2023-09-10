function Recorder(canvas, fps) {

  var fps = fps || 30;
  var ctx = canvas.getContext("2d");

  var videoStream = canvas.captureStream(fps);
  var mediaRecorder = new MediaRecorder(videoStream);

  var videoURL;

  var chunks = [];
  mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
  }

  function download(dataurl, filename) {
    const link = document.createElement("a");
    link.href = dataurl;
    link.download = filename;
    link.click();
  }

  mediaRecorder.onstop = function(e) {
    var blob = new Blob(chunks, {
      'type': 'video/mp4'
    });
    chunks = [];
    videoURL = URL.createObjectURL(blob);
    //console.log("mp4 video url:", videoURL);
    var myReader = new FileReader();
    myReader.readAsDataURL(blob);

    return;
    myReader.addEventListener("loadend", function(e) {
      document.getElementById('video').src = e.srcElement.result;
      document.getElementById('canvas').hidden = true;
      document.getElementById('video').hidden = false;
    });
  }

  mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
  }

  this.start = () => mediaRecorder.start();
  this.stop = () => mediaRecorder.stop();
  this.pause = () => mediaRecorder.pause();
  this.resume = () => mediaRecorder.resume();
  this.getUrl = () => videoURL;
  this.download = (fileName) => {
    if (videoURL != "")
      download(videoURL, fileName)
  }
}


/**
 * requestAnimationFrame
 */
window.requestAnimationFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();


// Configs

var Configs = {
  backgroundColor: '#eee9e9',
  particleNum: 1000,
  step: 5,
  base: 1000,
  zInc: 0.001
};


// Vars

var canvas,
  context,
  screenWidth,
  screenHeight,
  centerX,
  centerY,
  particles = [],
  hueBase = 0,
  simplexNoise,
  zoff = 0,
  gui;


// Initialize

function init() {
  canvas = document.getElementById('canvas');

  window.addEventListener('resize', onWindowResize, false);
  onWindowResize(null);

  for (var i = 0, len = Configs.particleNum; i < len; i++) {
    initParticle((particles[i] = new Particle()));
  }

  simplexNoise = new SimplexNoise();

  canvas.addEventListener('click', onCanvasClick, false);


  rec = new Recorder(canvas);
  setTimeout(rec.start, 100);
  setTimeout(rec.stop, 20000);
  update();
}


// Event listeners

function onWindowResize(e) {
  screenWidth = canvas.width = window.innerWidth;
  screenHeight = canvas.height = window.innerHeight;

  centerX = screenWidth / 2;
  centerY = screenHeight / 2;

  context = canvas.getContext('2d');
  context.lineWidth = 0.3;
  context.lineCap = context.lineJoin = 'round';
}

function onCanvasClick(e) {
  context.save();
  context.globalAlpha = 0.8;
  context.fillStyle = Configs.backgroundColor;
  context.fillRect(0, 0, screenWidth, screenHeight);
  context.restore();

  simplexNoise = new SimplexNoise();
}
