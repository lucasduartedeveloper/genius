var audio = new Audio("audio/phone-lock.wav");
var alarm = new Audio("audio/battleship-alarm.wav");
var coin = new Audio("audio/coin.wav");

var sw = window.innerWidth;
var sh = window.innerHeight;

var audioBot = false;
var playerId = new Date().getTime();

var canvasBackgroundColor = "rgba(255,255,255,1)";
var backgroundColor = "rgba(50,50,65,1)";
var buttonColor = "rgba(75,75,90,1)";

// Botão de gravação
$(document).ready(function() {
    $("html, body").css("overscroll-behavior", "none");
    $("html, body").css("overflow", "hidden");
    $("html, body").css("background", backgroundColor);
    $("#title").css("font-size", "15px");
    $("#title").css("color", "#fff");

    $("#title")[0].innerText = "";

    listLimitView = document.createElement("div");
    listLimitView.style.position = "absolute";
    listLimitView.style.background = "yellow";
    listLimitView.style.left = ((sw/2)-3)+"px";
    listLimitView.style.top = (0)+"px";
    listLimitView.style.width = (1)+"px";
    listLimitView.style.height = (sh)+"px";
    listLimitView.style.zIndex = "5";
    document.body.appendChild(listLimitView);

    circleView = document.createElement("div");
    circleView.style.position = "absolute";
    circleView.style.background = "yellow";
    circleView.style.color = "#000";
    circleView.innerText = "START";
    circleView.style.fontSize = "20px";
    circleView.style.lineHeight = "80px";
    circleView.style.left = ((sw/2)-(37.5)-3)+"px";
    circleView.style.top = (2.5)+"px";
    circleView.style.width = (75)+"px";
    circleView.style.height = (75)+"px";
    circleView.style.borderRadius = "50%";
    circleView.style.zIndex = "5";
    document.body.appendChild(circleView);

    undoView = document.createElement("div");
    undoView.style.position = "absolute";
    undoView.style.background = "yellow";
    undoView.style.color = "#000";
    undoView.innerText = "UNDO";
    undoView.style.fontSize = "20px";
    undoView.style.lineHeight = "80px";
    undoView.style.left = ((sw/2)-(37.5)-3)+"px";
    undoView.style.top = ((sh-75)-2.5)+"px";
    undoView.style.width = (75)+"px";
    undoView.style.height = (75)+"px";
    undoView.style.borderRadius = "50%";
    undoView.style.zIndex = "5";
    document.body.appendChild(undoView);

    $("*").css("font-family", "Khand");

    leftColumn = document.createElement("div");
    leftColumn.style.position = "absolute";
    leftColumn.style.color = "#fff";
    leftColumn.style.fontSize = "75px";
    leftColumn.style.left = (0)+"px";
    leftColumn.style.top = ((sh-(15*25))/2)+"px";
    leftColumn.style.width = (sw/2)+"px";
    leftColumn.style.height = (15*25)+"px";
    leftColumn.style.zIndex = "5";
    document.body.appendChild(leftColumn);

    rightColumn = document.createElement("div");
    rightColumn.style.position = "absolute";
    rightColumn.style.color = "#fff";
    rightColumn.style.fontSize = "75px";
    rightColumn.style.left = (sw/2)+"px";
    rightColumn.style.top = ((sh-(15*25))/2)+"px";
    rightColumn.style.width = (sw/2)+"px";
    rightColumn.style.height = (15*25)+"px";
    rightColumn.style.zIndex = "5";
    document.body.appendChild(rightColumn);

    currentLineView = document.createElement("div");
    currentLineView.style.position = "absolute";
    currentLineView.style.background = "yellow";
    currentLineView.style.left = (0)+"px";
    currentLineView.style.top = ((((sh-(15*25))/2)+25)+3)+"px";
    currentLineView.style.width = (sw)+"px";
    currentLineView.style.height = (1)+"px";
    currentLineView.style.zIndex = "5";
    document.body.appendChild(currentLineView);

    fillListBin();

    circleView.onclick = function() {
        solve();
    };

    undoView.onclick = function() {
        console.log("undoView");
        undo();
    };
    console.log("loaded");
});

var currentLine = 0;
var solve = function() {
    currentLine = 0;
    solveInterval = setInterval(function() {
        leftColumn.children[currentLine].innerText = "";
        currentLineView.style.top = 
        ((((sh-(15*25))/2)+25)+((currentLine+1)*25)+3)+"px";

        var obj = leftList[currentLine];
        rightColumn.children[currentLine].innerText = 
        toBinary(obj);

        navigator.vibrate(500);
        currentLine +=1;
        if (currentLine > (leftList.length-1))
        clearInterval(solveInterval);
    }, 500);
};

var undo = function() {
    console.log("undo()");

    currentLine = (leftList.length-1);
    undoInterval = setInterval(function() {
        console.log("undo", currentLine);

        var obj = leftList[currentLine];
        leftColumn.children[currentLine].innerText = obj;
        rightColumn.children[currentLine].innerText = "";

        currentLineView.style.top = 
        (((sh-(15*25))/2)+((currentLine+1)*25)+3)+"px";

        navigator.vibrate(500);
        currentLine -=1;
        if (currentLine < 0)
        clearInterval(undoInterval);
    }, 500);
};

var operators = [
    "+", "-", "÷", "×"
];

var leftList = [];
var rightList = [];

var toBinary = function(n) {
    var result = n.toString(2);
    result = result.padStart(8, "0");
    return result;
};

var fillListBin = function() {
    for (var n = 0; n < 15; n++) {
        var a = Math.floor(Math.random()*255);

        leftList.push(a);

        var span = document.createElement("span");
        span.style.position = "absolute";
        span.style.color = "#fff";
        span.style.fontSize = "25px";
        span.style.textAlign = "left";
        span.style.fontFamily = "Khand";
        span.style.left = (0)+"px";
        span.style.top = (n*25)+"px";
        span.style.width = (sw/2)+"px";
        span.style.height = (25)+"px";
        span.style.zIndex = "5";
        leftColumn.appendChild(span);

        span.innerText = a;

        var span = document.createElement("span");
        span.style.position = "absolute";
        span.style.color = "limegreen";
        span.style.fontSize = "25px";
        span.style.textAlign = "left";
        span.style.fontFamily = "'VT323', monospace !important";
        span.style.left = (0)+"px";
        span.style.top = (n*25)+"px";
        span.style.width = (sw/2)+"px";
        span.style.height = (25)+"px";
        span.style.zIndex = "5";
        rightColumn.appendChild(span);
    }
};