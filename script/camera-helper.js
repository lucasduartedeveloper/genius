var vw = 0;
var vh = 0;

var videoDevices = [];
var deviceNo = 1;

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
        window.deviceNo = videoDevices.length > 1 ? 
        deviceNo : 0;
    })
    .catch(function(err) {
         console.log(err.name + ": " + err.message);
    });
}

function startCamera(color=true) {
    if (navigator.mediaDevices) {
          navigator.mediaDevices
          .getUserMedia({ 
          video: videoDevices.length == 0 ? true : {
          deviceId: { 
               exact: videoDevices[deviceNo].deviceId
          } }, 
          audio: false })
          .then((stream) => {
               camera.srcObject = stream;
               var display = stream.
               getVideoTracks()[0].getSettings();
               vw = display.width;
               vh = display.height;
          });
    }
}
function stopCamera() {
    if (camera.srcObject) {
         camera.srcObject.getTracks().forEach(t => t.stop());
         camera.srcObject = null;
    }
}

// 640x480 => 240x180
/*
    240
    (480/640)*240
*/
// 480x640 => 240x180

var fitImageContain = function(img, frame) {
    var obj = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
    };

    var left, top, width, height;

    if (frame.width > img.width) {
        width = frame.width;
        height = (img.height/img.width)*frame.width;

        left = 0;
        top = -(height-frame.height)/2;
    }
    else {
        height = frame.height;
        width = (img.width/img.height)*frame.height;

        top = 0;
        left = -(width-frame.width)/2;
    }

    obj.left = left;
    obj.top = top;
    obj.width = width;
    obj.height = height;

    return obj;
};

var fitImageCover = function(img, frame) {
    var obj = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
    };

    var left, top, width, height;

    if (frame.width > frame.height) {
        width = frame.width;
        height = (img.height/img.width)*frame.width;

        left = 0;
        top = -(height-frame.height)/2;
    }
    else {
        height = frame.height;
        width = (img.width/img.height)*frame.height;

        top = 0;
        left = -(width-frame.width)/2;
    }

    obj.left = left;
    obj.top = top;
    obj.width = width;
    obj.height = height;

    return obj;
};

/*
    console.log(
        { width: vw, height: vh }, 
        { width: photo.width, height: photo.height }, 
    pos);

    var img = new Image();
    img.ctx = ctx;
    img.photo = photo;
    img.onload = function() {
        var pos = fitImageCover(this, this.photo);
        this.ctx.drawImage(this, pos.left, pos.top, pos.width, pos.height);
        //this.ctx.drawImage(this, 0, 0, 
        //this.photo.width, this.photo.height);
    }
    var rnd = Math.random();
    img.src = "img/tree.png?rnd="+rnd;
*/