var invertX = false;
var invertY = false;

var mode = 0;

var _nextMode = function(arr) {
    var text = "";
    mode = (mode+1) < 4 ? (mode+1) : 0;
    switch (mode) {
        case 0:
            invertX = false;
            invertY = false;
            text = arr[0];
            break;
        case 1:
            invertX = true;
            invertY = false;
            text = arr[1];
            break;
        case 2:
            invertX = false;
            invertY = true;
            text = arr[2];
            break;
        case 3:
            invertX = true;
            invertY = true;
            text = arr[3];
            break;
    }
    return text;
};

var _sumText = function(arr) {
    var text = 
        (invertX ? arr[0] : "") +
        (invertY ? arr[1] : "");
    return text;
};

var selectX = function(arr) {
    var value = invertX ? arr[0] : arr[1];
    return value;
};

var selectY = function(arr) {
    var value = invertY ? arr[0] : arr[1];
    return value;
};

var initScreenModes = function(canvas) {
    modeLabel = document.createElement("span");
    modeLabel.style.position = "absolute";
    modeLabel.innerText = "normal";
    modeLabel.style.color = "#fff";
    modeLabel.style.fontSize = "20px";
    modeLabel.style.lineHeight = "20px";
    modeLabel.style.left = ((sw/2)-50)+"px";
    modeLabel.style.top = ((sh/2)+200)+"px";
    modeLabel.style.width = (100)+"px";
    modeLabel.style.height = (25)+"px";
    modeLabel.style.zIndex = "3";
    modeLabel.onclick = function() {
        modeLabel.innerText = _nextMode([
            "normal", "invert x", "invert y", "invert xy"
        ]);
        canvas.style.transform = _sumText([
            "rotateY(180deg) ", "rotateX(180deg) "
        ]);
    };
    document.body.appendChild(modeLabel);
};