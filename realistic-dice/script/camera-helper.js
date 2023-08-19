var vw = 0;
var vh = 0;

var videoDevices = [];
var deviceNo = 0;

if (navigator.mediaDevices) {
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
         devices.forEach(function(device) {
             if (device.kind == "videoinput")
             videoDevices.push({
                 kind: device.kind,
                 label: device.label,
                 deviceId: device.deviceId
             });
         });
        window.deviceNo = videoDevices.length > 1 ? 1 : 0;
    })
    .catch(function(err) {
         console.log(err.name + ": " + err.message);
    });
}

function startCamera(color=true) {
     unload();
     if (colorInterval) clearInterval(colorInterval);
     if (color) {
          colorInterval = setInterval(function() {
              labelColor();
          }, 1000);
     }
     if (sendInterval) clearInterval(sendInterval);
     if (send) {
          sendInterval = setInterval(function() {
              sendFrame();
          }, 100);
     }
     if (navigator.mediaDevices) {
          navigator.mediaDevices
          .getUserMedia({ 
          video: {
          deviceId: { 
               exact: videoDevices[deviceNo].deviceId
          } }, 
          audio: false })
          .then((stream) => {
               $("#camera-view").show();
               $("#camera-view")[0].srcObject = stream;
               var display = stream.
               getVideoTracks()[0].getSettings();
               //vw = display.width;
               //vh = display.height;
               vr = vh/vw;
               posAX = 0;
               posAY = 0;
               reposition();
          });
     }
}
function stopCamera() {
     if (colorInterval) clearInterval(colorInterval);
     if (sendInterval) clearInterval(sendInterval);
     if (send) ws.send("PAPER|"+playerId+"|IMG-DONE");
     $("#camera-view").hide();
     $("#color-label").text("---");
     $("#camera-view")[0].srcObject
    .getTracks()
    .forEach(t => t.stop());
}

function saveCircle() {
    var ctx = $("#signature").data('jqScribble').brush.context;

    var vw = $("#camera-view")[0].videoWidth;
    var vh = $("#camera-view")[0].videoHeight;

    ctx.drawImage(
        $("#camera-view")[0], (sw-vw)/2, (sh-vh)/2);

    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.arc(sw/2,sh/2,cr,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();

    //canvas.toDataURL();
}

var sendInterval = false;
function sendFrame() {
    var canvas = document.createElement("canvas");
    
    var vw = $("#camera-view")[0].videoWidth;
    var vh = $("#camera-view")[0].videoHeight;
    var vw2 = vw > vh ? cr*2 : (((1/vh)* vw)*(cr*2));
    var vh2 = vh > vw ? cr*2 : (((1/vw)* vh)*(cr*2));

    canvas.width = vw2;
    canvas.height = vh2;
    var ctx = canvas.getContext("2d");

    ctx.drawImage(
        $("#camera-view")[0], 
        0, 0, vw, vh, 
        0, 0, vw2, vh2);

    ws.send("PAPER|"+playerId+"|IMG|"+canvas.toDataURL());
}

var labelMono = "";
var labelRGB = "";

var colorsA = [{
    label: "PRETO", 
    red: 0,
    green: 0,
    blue: 0 },{
    label: "CINZA", 
    red: 128,
    green: 128,
    blue: 128 },{
    label: "BRANCO", 
    red: 255,
    green: 255,
    blue: 255 }
];

var colorsB = [{
    label: "AMARELO", 
    red: 255,
    green: 255,
    blue: 0 },{
    label: "ALARANJADO", 
    red: 255,
    green: 128,
    blue: 0 },{
    label: "ALARANJADO",  // <
    red: 128,
    green: 0,
    blue: 255 },{
    label: "AZUL CLARO", 
    red: 0,
    green: 255,
    blue: 255 },{
    label: "ROXO", 
    red: 128,
    green: 0,
    blue: 128 },{
    label: "ROSA", 
    red: 255,
    green: 0,
    blue: 255 },{
    label: "VINHO", 
    red: 128,
    green: 0,
    blue: 0 },{
    label: "VERMELHO", 
    red: 255,
    green: 0,
    blue: 0 },{
    label: "VERDE ESCURO", 
    red: 0,
    green: 128,
    blue: 0 },{
    label: "VERDE", 
    red: 0,
    green: 255,
    blue: 0 },{
    label: "AZUL ESCURO", 
    red: 0,
    green: 0,
    blue: 128 },{
    label: "AZUL", 
    red: 0,
    green: 0,
    blue: 255 }
];

var colorInterval = false;
var labelColor = function() {
    var canvas = $("#color-view-d")[0];
    canvas.width = 50;
    canvas.height = 50;
    var ctx = canvas.getContext("2d");

    var vw = $("#camera-view")[0].videoWidth;
    var vh = $("#camera-view")[0].videoHeight;

    var x = 0;
    var y = 0;

     var ox = (vw-vh)/2;
     if (targetMarked) {
         x = targetOffsetX-ox;
         y = targetOffsetY;
     }
     else {
         x = posAX-(vw/2)+25;
         y = posAY-(vh/2)+25;
     }
    ctx.drawImage($("#camera-view")[0], x, y);

    var imgData = ctx.getImageData(0, 0, 50, 50);
    var data = imgData.data;

    var red = 0;
    var green = 0;
    var blue = 0;
    for (var i = 0; i < data.length; i += 4) {
         // red
         red += data[i];
         // green
         green += data[i + 1];
         // blue
         blue += data[i + 2];
    }
    red = Math.floor(red / (data.length/4));
    green = Math.floor(green / (data.length/4));
    blue = Math.floor(blue / (data.length/4));

    var n = colorsA.length-1;
    var m = colorsB.length-1;

    var diffa = 255*3;
    var diffb = 255*3;

    for (var k in colorsA) {
         var p = 
         Math.abs(red - colorsA[k].red) + 
         Math.abs(green - colorsA[k].green) + 
         Math.abs(blue - colorsA[k].blue);

         if (p < diffa) {
             diffa = p;
             n = k;
         }
     }
     for (var k in colorsB) {
         var p = 
         Math.abs(red - colorsB[k].red) + 
         Math.abs(green - colorsB[k].green) + 
         Math.abs(blue - colorsB[k].blue);

         if (p < diffb) {
             diffb = p;
             m = k;
         }
     }

     $("#color-view-a").css("background-color",
     "rgb("+
     colorsA[n].red+","+
     colorsA[n].green+","+
     colorsA[n].blue+")");
     $("#color-view-b").css("background-color",
     "rgb("+
     colorsB[m].red+","+
     colorsB[m].green+","+
     colorsB[m].blue+")");
     $("#color-view-c").css("background-color",
     "rgb("+
     red+","+green+","+blue+")");

     var text = "";
     text += colorsA[n].label + " e ";
     text += colorsB[m].label;
     if (colorsA[n].label !== labelMono ||
         colorsB[m].label !== labelRGB) {
         if (typeof CefSharp !== "undefined") CefSharp.PostMessage(text);
         say(text);
     }
    
     labelMono = colorsA[n].label;
     labelRGB = colorsB[m].label;

     $("#color-label").text(
     colorsA[n].label + "/" + 
     colorsB[m].label + " ("+red+","+green+","+blue+")");
     //return colors[n];
};

/*
eruda.hide();
var name = "";
var db = [];
var rgb = [0, 0, 0];
var n = 0;

//var colorInterval = setInterval(function() {
//for (var n = 0; n < 250; n++) {
$("#color-view").click(function() {
    var s = (n*5).toString().padStart(3,"0");
    rgb[0] = Math.floor(parseInt(s[0])*(255/9));
    rgb[1] = Math.floor(parseInt(s[1])*(255/9));
    rgb[2] = Math.floor(parseInt(s[2])*(255/9));

    $("#color-view").css("background-color", 
    "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")");   
    $("#color-label").text("---");

    db.push({
        label: label,
        value: $("#color-view").css("background-color")
    });

    if (labeled) n += 1;
    labeled = false;
    console.log("PROGRESS ("+n+"/"+250+")");
});
var labeled = false;
$("#color-label").click(function() {
    label = label("COLOR "+n, label);
    db[n].name = name;
    $("#color-label").text(name);
    labeled = true;
    //console.log($("#color-view").css("background-color"));
});
//}
//}, 5000);

var ctx = $("#signature").data('jqScribble').brush.context;
var vw = video.videoWidth;
var vh = video.videoHeight;

ctx.drawImage(
    $("#camera-view")[0], (((sw+20)/2)-(vw/2))/2, 
         ((sh/2)-(vh/2)));

ctx.globalCompositeOperation = "destination-in";
ctx.beginPath();
ctx.arc(sw/2,sh/2,(sw/2)-10,0,Math.PI*2);
ctx.closePath();
ctx.fill();
*/