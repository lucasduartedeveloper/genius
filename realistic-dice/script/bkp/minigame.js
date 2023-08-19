var sw = window.innerWidth;
var sh = window.innerHeight;
var landscape = sw>sh;

var $;

var tmp = { x: 0, y: 0, z: 0 };
var playerId = new Date().getTime();
var isTouchEnabled = false;

var language_id = [
    "pt-BR", "en-US", "ja-JP", "ko-KR", "cmn-CN"
];
var language_no = 0;
var language = language_id[language_no];
//var language = "pt-BR"; //"en-US";

var hs = 0;
var direction = Math.floor(Math.random()*2);

var stack = [];
var pointer = 0;

$(document).ready(function() {
    /*startClick = 0;*/
    $("html, body").css("overflow-x", "hidden");
    $("html, body").css("overscroll-behavior", "none");

    変数 = sw/1.2;

    nextObj = next(false, true);

    triangle = document.createElement("span");
    triangle.style.position = "absolute";
    triangle.className = "animate__animated";
    triangle.style.backgroundImage = draw_(nextObj.cx, nextObj.cy);
    triangle.style.backgroundSize = "cover";
    triangle.style.color = "#fff";
    triangle.style.fontSize = (sw/9)+"px";
    triangle.style.textAlign = "center";
    triangle.style.left = ((sw/2)-(変数/2))+"px";
    triangle.style.top = ((sh/2)-(変数/2))+"px";
    triangle.style.width = (変数)+"px";
    triangle.style.height = (変数)+"px";
    triangle.style.border = "2px solid #fff";
    triangle.style.animationDuration = "1s";
    triangle.ontouchstart = function(e) {
        //console.log(e);
        if (e.touches) {
            startX = e.touches[0].clientX-((sw-変数)/2);
            startY = e.touches[0].clientY-((sh-変数)/2);
        }
        else if(e.originalEvent) {
            startX = e.originalEvent.clientX-((sw-変数)/2);
            startY = e.originalEvent.clientY-((sh-変数)/2);
        }
        triangle.style.backgroundImage = 
        draw(startX, startY, nextObj.px, nextObj.py);
        elem3.innerText = "x"+stack.length;
        elem3.classList.add("animate__animated", "animate__tada");
        elem10.classList.add("animate__animated",
            "animate__rotateOut");
        if (stack.length > hs) {
            hs = stack.length;
            elem4.innerText = "HIGHSCORE: x"+hs;
            saveHs();
        }
    };
    triangle.ontouchmove = function(e) {
        //console.log(e);
        if (e.touches) {
            startX = e.touches[0].clientX-((sw-変数)/2);
            startY = e.touches[0].clientY-((sh-変数)/2);
        }
        else if(e.originalEvent) {
            startX = e.originalEvent.clientX-((sw-変数)/2);
            startY = e.originalEvent.clientY-((sh-変数)/2);
        }
    };
    triangle.ontouchend = function(e) {
        //console.log(e);
        if (!nextObj.connectRound) return;
        triangle.style.backgroundImage = 
        draw_connection(startX, startY, nextObj.px, nextObj.py);
        elem3.innerText = "x"+stack.length;
        elem3.classList.add("animate__animated", "animate__tada");
        elem10.classList.add("animate__animated",
            "animate__rotateOut");
        if (stack.length > hs) {
            hs = stack.length;
            elem4.innerText = "HIGHSCORE: x"+hs;
            saveHs();
        }
    };
    //document.body.appendChild(triangle);

    elem = document.createElement("span");
    elem.style.position = "absolute";
    elem.innerText = "Começar";
    elem.style.color = "#fff";
    elem.style.fontSize = (sw/18)+"px";
    elem.style.textAlign = "center";
    elem.style.left = ((sw/2)-(変数/2))+"px";
    elem.style.top = ((sh/2)-(sw/18))+"px";
    elem.style.width = (変数)+"px";
    elem.style.height = (sw/9)+"px";
    elem.style.border = "2px solid #fff";
    elem.style.borderRadius = (sw/18)+"px";
    elem.onclick = function() {
        elem.remove();
        elem1.remove();
        elem7.remove();
        elem11.remove();
        document.body.appendChild(triangle);
        document.body.appendChild(elem5);
        //document.body.appendChild(elem10);
    };
    document.body.appendChild(elem);

    elem1 = document.createElement("span");
    elem1.style.position = "absolute";
    elem1.style.color = "#fff";
    elem1.style.fontSize = (sw/9)+"px";
    elem1.style.textAlign = "center";
    elem1.innerText = language; //next(0);
    //triangle.style.background = "#fff";
    elem1.style.left = ((sw/2)-(sw/3))+"px";
    elem1.style.top = ((sh/2)+(sw/3))+"px";
    elem1.style.width = (sw/1.5)+"px";
    elem1.style.height = (sw/9)+"px";
    elem1.onclick = function() {
        language_no++;
        language_no = language_no > 4 ? 0: language_no;
        language = language_id[language_no];
        elem1.innerText = language;
    };
    document.body.appendChild(elem1);

    invert = false;
    elem2 = document.createElement("span");
    elem2.style.position = "absolute";
    elem2.innerHTML = "A&nbsp;<i class=\"fa-solid "+
    (direction == 0 ? "fa-arrow-right" : "fa-arrow-down")+"\"></i>";
    elem2.style.color = "#fff";
    elem2.style.fontSize = (sw/18)+"px";
    elem2.style.textAlign = "left";
    elem2.style.left = ((sw/2)-(変数/2))+"px";
    elem2.style.top = ((sh/2)-(変数/2)-(sw/9))+"px";
    elem2.style.width = (変数/2)+"px";
    elem2.style.height = (sw/9)+"px";
    //elem2.style.border = "2px solid #fff";
    //elem2.style.borderRadius = (sw/18)+"px";
    elem2.onclick = function() {
        direction = direction == 0 ? 1 : 0;
        elem2.innerHTML = "A&nbsp;<i class=\"fa-solid "+
        (direction == 0 ? "fa-arrow-right" : "fa-arrow-down")+"\"></i>";
        if (document.body.style.filter == "invert(1)") {
            document.body.style.filter = "invert(0)";
            elem9.style.border = "2px solid #fff";
            elem9.style.filter = "invert(0)";
        }
        else {
            document.body.style.filter = "invert(1)";
            elem9.style.border = "2px solid #000";
            elem9.style.filter = "invert(1)";
        }
    };
    document.body.appendChild(elem2);

    elem3 = document.createElement("span");
    elem3.style.position = "absolute";
    elem3.innerText = "x0";
    elem3.style.color = "#fff";
    elem3.style.fontSize = (sw/18)+"px";
    elem3.style.textAlign = "right";
    elem3.style.left = (sw/2)+"px";
    elem3.style.top = ((sh/2)-(変数/2)-(sw/9))+"px";
    elem3.style.width = (変数/2)+"px";
    elem3.style.height = (sw/9)+"px";
    //elem2.style.border = "2px solid #fff";
    //elem2.style.borderRadius = (sw/18)+"px";
    document.body.appendChild(elem3);

    elem4 = document.createElement("span");
    elem4.style.position = "absolute";
    elem4.innerHTML = "HIGHSCORE: "+
       "<i class=\"fa-solid fa-spinner fa-spin\"></i>";
    elem4.style.color = "#fff";
    elem4.style.fontSize = (sw/18)+"px";
    elem4.style.textAlign = "right";
    elem4.style.left = ((sw/2)-(変数/2))+"px";
    elem4.style.top = ((sh/2)-(変数/2)-(sw/4.5))+"px";
    elem4.style.width = (変数)+"px";
    elem4.style.height = (sw/9)+"px";
    //elem2.style.border = "2px solid #fff";
    //elem2.style.borderRadius = (sw/18)+"px";
    document.body.appendChild(elem4);

    elem5 = document.createElement("span");
    elem5.style.position = "absolute";
    elem5.innerText = "Sair";
    elem5.style.color = "#fff";
    elem5.style.fontSize = (sw/18)+"px";
    elem5.style.textAlign = "center";
    elem5.style.left = ((sw/2)-(変数/2))+"px";
    elem5.style.top = ((sh/2)+(変数/2)+(sw/9))+"px";
    elem5.style.width = (変数)+"px";
    elem5.style.height = (sw/9)+"px";
    elem5.style.border = "2px solid #fff";
    elem5.style.borderRadius = (sw/18)+"px";
    elem5.onclick = function() {
        location.reload();
    };

    elem3.addEventListener("animationend", function() {
        elem3.classList.remove("animate__animated", "animate__tada");
    });

    elem7 = document.createElement("span");
    elem7.style.position = "absolute";
    elem7.innerText = "Créditos";
    elem7.style.color = "#fff";
    elem7.style.fontSize = (sw/18)+"px";
    elem7.style.textAlign = "center";
    elem7.style.left = ((sw/2)-(変数/2))+"px";
    elem7.style.top = ((sh/2)+(sw/18)+10)+"px";
    elem7.style.width = (変数)+"px";
    elem7.style.height = (sw/9)+"px";
    elem7.style.border = "2px solid #fff";
    elem7.style.borderRadius = (sw/18)+"px";
    elem7.onclick = function() {
        Swal.fire(
           "Créditos",
           "JAGBLN"+
           "LDOWGLTTHMBWTRMZ"
        );
    };
    document.body.appendChild(elem7);

    elem8 = document.createElement("span");
    elem8.style.position = "absolute";
    elem8.innerHTML = drawLives();
    elem8.style.color = "#f00";
    elem8.style.fontSize = (sw/18)+"px";
    elem8.style.textAlign = "center";
    elem8.style.left = ((sw/2)-(変数/2))+"px";
    elem8.style.top = (((sw-変数)/2)+(sh/2)-(sh/2))+"px";
    elem8.style.width = (変数)+"px";
    elem8.style.height = (sw/9)+"px";
    //elem8.style.border = "2px solid #fff";
    //elem8.style.borderRadius = (sw/18)+"px";
    elem8.onclick = function() {
        if (lives <= 0) return;
        lives -= 1;
        elem8.innerHTML = drawLives();
        speaking = false;
        if (nextObj.countRound) {
            var text = language_no == 0 ? 
            "conte "+nextObj.count+" quadrados do " :
            "count "+nextObj.count+" squares from ";
            switch(nextObj.direction) {
                case 0:
                    if (direction == 0) 
                    text += letters[language_no == 0 ? 1 : 0][0]+"1";
                    else 
                    text += letters[language_no == 0 ? 1 : 0][0]+"1";
                    break;
                case 1:
                    if (direction == 0) 
                    text += letters[language_no == 0 ? 1 : 0][0]+"8";
                    else 
                    text += letters[language_no == 0 ? 1 : 0][7]+"1";
                    break;
                case 2:
                    if (direction == 0) 
                    text += letters[language_no == 0 ? 1 : 0][7]+"8";
                    else 
                    text += letters[language_no == 0 ? 1 : 0][7]+"8";
                    break;
                case 3:
                    if (direction == 0) 
                    text += letters[language_no == 0 ? 1 : 0][7]+"1";
                    else 
                    text += letters[language_no == 0 ? 1 : 0][0]+"8";
                    break;
            }
            console.log("repeat: "+text);
            say(text);
        }
        else if (nextObj.botRound) {
            say(language_no == 0 ? "acerte a linha ou a coluna" :
            "disable line or column");
        }
        else if (nextObj.connectRound) {
            var text = op2_name[0][language_no == 0 ? 1 : 0] + " ";
            if (direction == 0) 
            text += letters[language_no == 0 ? 1 : 0]
            [nextObj.px]+(nextObj.py+1);
            else 
            text += letters[language_no == 0 ? 1 : 0]
            [nextObj.py]+(nextObj.px+1);
            text += " " + op2_name[1][language_no == 0 ? 1 : 0] + " ";
            if (direction == 0) 
            text += letters[language_no == 0 ? 1 : 0]
            [nextObj.px2]+(nextObj.py2+1);
            else 
            text += letters[language_no == 0 ? 1 : 0]
            [nextObj.py2]+(nextObj.px2+1);
            console.log("repeat: "+text);
            say(text);
        }
        else if (nextObj.dirRound) {
            console.log("repeat: "+
                dir_name[nextObj.direction][language_no == 0 ? 1 : 0]);
            say(dir_name[nextObj.direction][language_no == 0 ? 1 : 0]);
        }
        else if (nextObj.colorRound) {
            if (!invert)
            console.log("repeat: "+
                colors[color_no][language_no == 0 ? 1 : 0]);
            else
            console.log("repeat: "+
                colors[color_no == 0 ? 1 : 0][language_no == 0 ? 1 : 0]);
            if (!invert)
            say(colors[color_no][language_no == 0 ? 1 : 0]);
            else
            say(colors[color_no == 0 ? 1 : 0][language_no == 0 ? 1 : 0]);
        }
        else {
            console.log("repeat: "+
                (direction==0?letters[language_no == 0 ? 1 : 0]
                [nextObj.px]+(nextObj.py+1):
                letters[language_no == 0 ? 1 : 0]
                [nextObj.py]+(nextObj.px+1)));
            if (direction == 0) say(letters[language_no == 0 ? 1 : 0]
            [nextObj.px]+splitNo((nextObj.py+1)));
            else say(letters[language_no == 0 ? 1 : 0]
            [nextObj.py]+splitNo((nextObj.px+1)));
        }
    };
    document.body.appendChild(elem8);

    elem9 = document.createElement("img");
    elem9.style.position = "absolute";
    elem9.className = "animate__animated";
    elem9.src = "img/rukia.png";
    elem9.style.objectFit = "contain";
    elem9.style.color = "#f00";
    elem9.style.textAlign = "center";
    elem9.style.left = (((sw-変数)/2)+(sw/2)-(sw/2))+"px";
    elem9.style.top = (((sw-変数)/2)+(sh/2)-(sh/2))+"px";
    elem9.style.width = (変数/4)+"px";
    elem9.style.height = (変数/4)+"px";
    elem9.style.border = "2px solid #fff";
    elem9.style.borderRadius = (変数/32)+"px";
    elem9.onclick = function() {
        elem9.style.objectFit = "cover";
        elem9.onload = function() {
            elem9.classList.remove("animate__rotateOut");
            elem9.classList.add("animate__rotateIn");
        };
        elem9.classList.add("animate__rotateOut");
        //elem9.src = getCbjpeg("vandjuani");
        elem9.src = getCbjpeg("emilygrey_");
        //elem9.src = getCbjpeg("bettybarnett");
    };
    document.body.appendChild(elem9);

    elem10 = document.createElement("img");
    elem10.style.position = "absolute";
    elem10.src = getHollow();
    elem10.style.objectFit = "cover";
    elem10.style.color = "#f00";
    elem10.style.textAlign = "center";
    elem10.style.right = (((sw-変数)/2)+(sw/2)-(sw/2))+"px";
    elem10.style.top = (((sw-変数)/2)+(sh/2)-(sh/2))+"px";
    elem10.style.width = (変数/4)+"px";
    elem10.style.height = (変数/4)+"px";
    elem10.style.border = "2px solid #fff";
    elem10.style.borderRadius = (変数/32)+"px";

    elem10.addEventListener("animationend", function() {
        elem10.classList.remove("animate__animated",
        "animate__rotateOut");
        elem10.src = getHollow();
    });

    elem11 = document.createElement("span");
    elem11.style.position = "absolute";
    elem11.style.color = "#fff";
    elem11.style.fontSize = (sw/18)+"px";
    elem11.style.textAlign = "center";
    elem11.innerText = "more...";
    //elem11.innerHTML = 
    //"<i class=\"fa-solid fa-spinner fa-spin\"></i>"; //next(0);
    elem11.style.left = ((sw/2)-(sw/3))+"px";
    elem11.style.top = ((sh/2)+(sw/3)+(sw/4.5))+"px";
    elem11.style.width = (sw/1.5)+"px";
    elem11.style.height = (sw/9)+"px";
    elem11.onclick = function() {
        if (voiceList.length == 0) {
            loadVoices(function(list) {
                elem1.innerText = voiceList[voice_no].lang;
                //elem1.style.textDecoration = "line-through";
                elem11.innerText = voiceList[voice_no].name;
            });
            return;
        }
        voice_no++;
        voice_no = voice_no > voiceList.length-1 ? 0 : voice_no;
        elem1.innerText = voiceList[voice_no].lang;
        elem11.innerText = voiceList[voice_no].name;
    };
    document.body.appendChild(elem11);

    elem12 = document.createElement("span");
    elem12.style.position = "absolute";
    elem12.innerHTML = drawJumps();
    elem12.style.color = "lightblue";
    elem12.style.fontSize = (sw/18)+"px";
    elem12.style.textAlign = "center";
    elem12.style.left = ((sw/2)-(変数/2))+"px";
    elem12.style.top = (((sw-変数)/2)+(sh/2)-(sh/2)+(sw/9))+"px";
    elem12.style.width = (変数)+"px";
    elem12.style.height = (sw/9)+"px";
    //elem8.style.border = "2px solid #fff";
    //elem8.style.borderRadius = (sw/18)+"px";
    elem12.onclick = function() {
        if (jumps == 0) return;
        jumps--;
        elem12.innerHTML = drawJumps();
        //triangle.classList.remove("animate__flipInY");
        //triangle.classList.add("animate__flipOutY");
        triangle.style.filter = "invert(60%) sepia(94%) saturate(7098%) "+
        "hue-rotate(235deg) brightness(105%) contrast(101%);";
        skip();
    };
    document.body.appendChild(elem12);

    triangle.addEventListener("animationend", function() {
        //triangle.classList.remove("animate__flipOutY");
        //triangle.classList.add("animate__flipInY");
        triangle.style.filter = "initial";
    });

    loadHs();
});

var lives = 3;
var drawLives = function() {
    var html = "";
    for (var n = 0; n < lives; n++) {
        html += n > 0 ? "&nbsp;" : "";
        html += "<i class=\"fa-solid fa-heart\"></i>";
        //console.log(html);
    }
    return html;
};

var jumpRate = 5;
var jumps = 0;
var drawJumps = function() {
    var html = "";
    if (jumps <= 3) {
        for (var n = 0; n < jumps; n++) {
            html += n > 0 ? "&nbsp;" : "";
            html += "<i class=\"fa-solid fa-bolt\"></i>"; //ghost\"></i>";
            //console.log(html);
        }
    }
    else {
        html = "<i class=\"fa-solid fa-bolt\"></i>&nbsp;x"+jumps;
        //html = "<i class=\"fa-solid fa-ghost\"></i>&nbsp;x"+jumps;
    }
    return html;
};

var loadHs = function() {
    $.getJSON("ajax/param.php", function(data) {
          console.log(data);
          hs = parseInt(data[0].value);
          elem4.innerText = "HIGHSCORE: x"+hs;
     });
};

var saveHs = function() {
    $.post("ajax/param.php", {
          temp: hs,
          }).done(function(data) {
              console.log(data);
     });
};

/*var colors = [
    [ "limegreen", "verde limão" ],
    [ "yellow", "amarelo" ],
    [ "darkred", "vinho" ],
    [ "white", "branco" ],
    [ "black", "preto" ],
    [ "lightblue", "azul piscina" ],
    [ "orange", "alaranjado" ],
    [ "gray", "cinza" ],
    [ "purple", "roxo" ],
    [ "pink", "rosa choque" ]
];*/

var colors = [
    [ "white", "branco" ],
    [ "black", "preto" ]
];

var color_no = 0;
var colorArr = [];

var sortColors = function() {
    var cn = Math.floor(Math.random()*2);
    color_no = cn;
    colorArr = [];
    for (var n = 0; n < 8; n++) {
        colorArr[n] = [];
        for (var k = 0; k < 8; k++) {
            var cn = ((((n % 2 != 1) ? 0 : 1)+k) % 2 != 0) ? 0 : 1;
            //var cn = Math.floor(Math.random()*10);
            colorArr[n][k] = colors[cn];
        }
    }
};

var draw_ = function(x, y) {
    return draw(-1, -1, x, y, true);
}

var draw_connection = function(x, y) {
    return draw(x, y, -1, -1, false, true);
}

var draw = 
    function(x=-1, y=-1, ex=-1, ey=-1, muted=false, connect=false) {
    var canvas = document.createElement("canvas");
    canvas.width = 変数;
    canvas.height = 変数;
    var ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;

    for (var n = 1; n < 8; n++) {
        ctx.beginPath();
        ctx.moveTo(n*(変数/8), 0);
        ctx.lineTo(n*(変数/8), 変数);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, n*(変数/8));
        ctx.lineTo(変数, n*(変数/8));
        ctx.stroke();
    }

    var cx = (x - (x % (変数/8)))+(変数/16);
    var cy = (y - (y % (変数/8)))+(変数/16);

    var canclean = true;

    if (nextObj.connectRound) {
        if (!connect) {
            nextObj.connect = {
                cx: cx, cy: cy
            };
        }
        if (!nextObj.connect) return;
        //console.log(connect, nextObj.connect);
        var r = angle2d(nextObj.connect.cx - cx, nextObj.connect.cy - cy);
        //r += cx > nextObj.connect.cx ? Math.PI/2 : -Math.P/2I;
        r += Math.PI;
        canclean = !isNaN(r);

        if (!isNaN(r)) {
            ctx.fillStyle = "gray";
            ctx.beginPath();
            ctx.arc(nextObj.connect.cx, 
            nextObj.connect.cy, 変数/20, r, r+Math.PI);
            ctx.fill();
        }
        else {
            ctx.fillStyle = "gray";
            ctx.beginPath();
            ctx.arc(cx, cy, 変数/20, 0, 2*Math.PI);
            ctx.fill();
        }
    }
    else if (x > 0 && y > 0) {
        ctx.fillStyle = "gray";
        if (muted) ctx.fillStyle = "#222"; //"#111";
        ctx.beginPath();
        ctx.arc(cx, cy, 変数/20, 0, 2*Math.PI);
        ctx.fill();
        //ctx.fillRect(cx - (変数/16), cy - (変数/16), 変数/8, 変数/8);
    }
    else if (ex > 0 && ey > 0) {
        ctx.fillStyle = "#222"; //"#111";
        if (muted) ctx.fillStyle = "#222"; //"#111";
        ctx.beginPath();
        ctx.arc(ex, ey, 変数/20, 0, 2*Math.PI);
        ctx.fill();
        //ctx.fillRect(cx - (変数/16), cy - (変数/16), 変数/8, 変数/8);
    }

    if (nextObj.dirRound && !nextObj.botRound && 
        !nextObj.countRound && !nextObj.connectRound) {
        var arrow = drawArrow(nextObj.direction);
        ctx.drawImage(arrow, 
        cx-(変数/25), cy-(変数/25), (変数/12.5), (変数/12.5));
    }

    var px = Math.floor(cx / (変数/8));
    var py = Math.floor(cy / (変数/8));

    var count = 0;
    if (nextObj.countRound) {
        switch(nextObj.direction) {
            case 0:
                if (direction == 0)
                count = (px+1)*(py+1);
                else
                count = (px+1)*(py+1);
                break;
            case 1:
                if (direction == 0)
                count = (px+1)*(8-py);
                else
                count = (8-px)*(py+1);
                break;
            case 2:
                if (direction == 0)
                count = (8-px)*(8-py);
                else
                count = (8-px)*(8-py);
                break;
            case 3:
                if (direction == 0)
                count = (8-px)*(py+1);
                else
                count = (px+1)*(8-py);
                break;
        }
        console.log(count, nextObj.count);

        ctx.fillStyle = "#fff";
        ctx.font = (変数/16)+"px sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(count, cx, cy);
    }
    else if (nextObj.connectRound && !connect) {
        nextObj.connect.px = px;
        nextObj.connect.py = py;
    }

    if (nextObj.connectRound && connect) {
        ctx.strokeStyle = "gray";
        ctx.beginPath();
        ctx.moveTo(nextObj.connect.cx, nextObj.connect.cy);
        ctx.lineTo(cx, cy);
        ctx.stroke();

        var r = angle2d(nextObj.connect.cx - cx, nextObj.connect.cy - cy);
        //r += cx > nextObj.connect.cx ? -Math.PI/2 : Math.PI/2;
        canclean = !isNaN(r);

        if (!isNaN(r)) {
            ctx.fillStyle = "gray";
            ctx.beginPath();
            ctx.arc(cx, cy, 変数/20, r, r+Math.PI);
            ctx.fill();
        }
    }

    // px py
    // color
    // 

    if (nextObj.countRound && count ==  nextObj.count) {
        nextObj = next(false);
        stack.push(nextObj);
    }
    else if (nextObj.botRound && !nextObj.countRound &&
        !(px == nextObj.bot.px && py == nextObj.bot.py) &&
        (px == nextObj.bot.px || py == nextObj.bot.py)) {
        killBot();
        nextObj = next(false);
        stack.push(nextObj);
    }
    else if (nextObj.connectRound && connect &&
        (nextObj.connect.px == nextObj.px && 
         nextObj.connect.py == nextObj.py && 
         px == nextObj.px2 && py == nextObj.py2)) {
        nextObj = next(false);
        stack.push(nextObj);
    }
    else if (nextObj.dirRound && !nextObj.countRound &&
        !nextObj.connectRound && checkDirection(px, py)) {
        nextObj = next(false);
        stack.push(nextObj);
    }
    else if (nextObj.colorRound && !nextObj.countRound &&
        !nextObj.connectRound && !nextObj.dirRound && 
        colors[color_no][0] == colorArr[px][py][0]) {
        nextObj = next(false);
        stack.push(nextObj);
    }
    else if (px == ex && py == ey && !nextObj.connectRound) {
        nextObj = next();
        stack.push(nextObj);
    }
    else if (canclean) {
        jumpRate = 5;
        stack = [];
    }

    var url = "url('"+canvas.toDataURL()+"')";
    if (nextObj.botRound && !nextObj.countRound && 
        !nextObj.bot.running) {
        nextObj.prevPx = px;
        nextObj.prevPy = py;
        startBot();
    }
    if (nextObj.dirRound && !nextObj.countRound && 
        !nextObj.botRound && !nextObj.connectRound) {
        ctx.strokeStyle = "orange";

        ctx.beginPath();
        ctx.moveTo(4*(変数/8), 0);
        ctx.lineTo(4*(変数/8), 変数);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 4*(変数/8));
        ctx.lineTo(変数, 4*(変数/8));
        ctx.stroke();

        ctx.fillStyle = "black";
        if (muted) ctx.fillStyle = "#222"; //"#111";
        ctx.beginPath();
        ctx.arc(cx, cy, 変数/20, 0, 2*Math.PI);
        ctx.fill();

        ctx.fillStyle = "gray";
        if (muted) ctx.fillStyle = "#222"; //"#111";
        ctx.beginPath();
        ctx.arc(変数/2, 変数/2, 変数/20, 0, 2*Math.PI);
        ctx.fill();
    }
    else if (nextObj.colorRound && !nextObj.countRound &&
        !nextObj.botRound && !nextObj.connectRound && 
        !nextObj.dirRound) {
        for (var n = 0; n < 8; n++) {
            for (var k = 0; k < 8; k++) {
                ctx.fillStyle = colorArr[n][k][0];
                ctx.fillRect(n * (変数/8), k * (変数/8), 変数/8, 変数/8);
            }
        }
        ctx.fillStyle = "yellow"; //"black";
        ctx.beginPath();
        ctx.arc(cx, cy, 変数/20, 0, 2*Math.PI);
        ctx.fill();
    }
    return "url('"+canvas.toDataURL()+"')";
};

var botInterval = false;

var startBot = function() {
    nextObj.bot.running = true;
    nextObj.bot.pmoves = [];
    nextObj.bot.moves = [];
    nextObj.bot.px = nextObj.prevPx; //Math.floor(Math.random()*8);
    nextObj.bot.py = nextObj.prevPy //Math.floor(Math.random()*8);
    botInterval = setInterval(function() {
        updateBot();
    },500);
};

var updateBot = function() {
    var rnd = Math.floor(Math.random()*2);
    nextObj.bot.mov = rnd == 0 ? 
    Math.floor(Math.random()*4) : nextObj.bot.mov;

    nextObj.bot.pmoves.splice(0, 0, 
    { px: nextObj.bot.px, py: nextObj.bot.py });

    var prevx = nextObj.bot.px * (変数/8);
    var prevy = nextObj.bot.py * (変数/8);

    nextObj.bot.moves.splice(0, 0, 
    { cx: prevx+(変数/16), cy: prevy+(変数/16) });

    moveBot();
    var nextMove = moveBot(false);

    var x = nextObj.bot.px * (変数/8);
    var y = nextObj.bot.py * (変数/8);

    var img = drawBot(nextObj.bot.mov);

    var canvas = document.createElement("canvas");
    canvas.width = 変数;
    canvas.height = 変数;
    var ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;

    for (var n = 1; n < 8; n++) {
        ctx.beginPath();
        ctx.moveTo(n*(変数/8), 0);
        ctx.lineTo(n*(変数/8), 変数);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, n*(変数/8));
        ctx.lineTo(変数, n*(変数/8));
        ctx.stroke();
    }

    ctx.lineCap = "round";
    ctx.strokeStyle = "#ccc";
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 10;

    ctx.drawImage(img, x, y, (変数/8), (変数/8));

    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(nextMove.px*(変数/8)+(変数/16),
    nextMove.py*(変数/8)+(変数/16), 変数/40, 0, 2*Math.PI);
    ctx.fill();

    //ctx.drawImage(img, x, y, (変数/8), (変数/8));

    triangle.style.backgroundImage = "url('"+canvas.toDataURL()+"')";
};

var moveBot = function(commit=true) {
    var px = nextObj.bot.px;
    var py = nextObj.bot.py;
    switch (nextObj.bot.mov) {
        case 0:
            px--;
            nextObj.bot.mov = px < 0 ? 2 : 0;
            px = px < 0 ? 1 : px;
            break;
        case 1:
            py--;
            nextObj.bot.mov = py < 0 ? 3 : 1;
            py = py < 0 ? 1 : py;
            break;
        case 2:
            px++;
            nextObj.bot.mov = px > 7 ? 0 : 2;
            px = px > 7 ? 6 : px;
            break;
        case 3:
            py++;
            nextObj.bot.mov = py > 7 ? 1 : 3;
            py = py > 7 ? 6 : py;
            break;
    }
    if (commit) {
        nextObj.bot.px = px;
        nextObj.bot.py = py;
    }
    return { px: px, py: py };
};

var killBot = function() {
    if (botInterval) clearInterval(botInterval);
};

var drawArrow = function(d) {
    var canvas = document.createElement("canvas");
    canvas.width = 変数/8;
    canvas.height = 変数/8;
    var ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#fff";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;

    ctx.translate((変数/16), (変数/16));
    switch(d) {
        case 0:
           ctx.rotate(-90 * (Math.PI / 180));
           break;
        case 2:
           ctx.rotate(90 * (Math.PI / 180));
           break;
        case 3:
           ctx.rotate(-180 * (Math.PI / 180));
           break;
    }
    ctx.translate(-(変数/16), -(変数/16));

    ctx.beginPath();
    ctx.moveTo((変数/16), (変数/8)-3);
    ctx.lineTo((変数/16), 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(3, (変数/16));
    ctx.lineTo((変数/16), 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((変数/16)+(変数/16)-3, (変数/16));
    ctx.lineTo((変数/16), 3);
    ctx.stroke();

    return canvas;
};

var drawBot = function(d) {
    var canvas = document.createElement("canvas");
    canvas.width = 変数/8;
    canvas.height = 変数/8;
    var ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#fff";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;

    ctx.translate((変数/16), (変数/16));
    switch(d) {
        case 0:
           ctx.rotate(-90 * (Math.PI / 180));
           break;
        case 2:
           ctx.rotate(90 * (Math.PI / 180));
           break;
        case 3:
           ctx.rotate(-180 * (Math.PI / 180));
           break;
    }
    ctx.translate(-(変数/16), -(変数/16));

    var y = getHeight((変数/8));
    var diff = (変数/8)-y;

    // Create path
    var region = new Path2D();
    region.moveTo(3, (変数/8)-(diff/2)-3);
    region.lineTo((変数/16), (diff/2)+3);
    region.lineTo((変数/8)-3, (変数/8)-(diff/2)-3);
    region.closePath();
    ctx.fill(region);

    /*ctx.beginPath();
    ctx.moveTo(3, (変数/8)-3);
    ctx.lineTo((変数/8)-3, (変数/8)-3);

    ctx.moveTo((変数/8)-3, (変数/8)-3);
    ctx.lineTo((変数/16), 3);
    
    ctx.moveTo((変数/16), 3);
    ctx.lineTo(3, (変数/8)-3);

    ctx.fill();
    ctx.closePath();
    //ctx.stroke();*/

    return canvas;
};

var letters = [
    [ "A", "BALL ", "C", "DICE ", "E", "F", "G", "H" ],
    [ "A", "B ", "C", "DADO ", "E", "F", "G", "H" ]
];

var dir_name = [
    [ "go left", "esquerda" ],
    [ "go in front", "para frente" ],
    [ "go right", "direita" ],
    [ "go back", "para trás" ]
];

var op2_name = [
    [ "connect", "ligue" ],
    [ "to", "com" ],
];

var next = function(cancolor=true, nojump=false) {
    if (!nojump) {
        jumpRate--;
        if (jumpRate == 0) {
            jumps++;
            elem12.innerHTML = drawJumps();
            jumpRate = 5;
        }
    }

    var obj = {
        countRound: cancolor && Math.floor(Math.random()*5) == 0,
        botRound: cancolor && Math.floor(Math.random()*3) == 0,
        connectRound: cancolor && Math.floor(Math.random()*3) == 0,
        dirRound: cancolor && Math.floor(Math.random()*3) == 0,
        colorRound: cancolor && Math.floor(Math.random()*3) == 0,
        count: 
            (Math.floor(Math.random()*8)+1)*
            (Math.floor(Math.random()*8)+1),
        direction: Math.floor(Math.random()*4),
        px: Math.floor(Math.random()*8),
        py: Math.floor(Math.random()*8),
        px2: Math.floor(Math.random()*8),
        py2: Math.floor(Math.random()*8),
        bot: { running: false, mov: 1 }
    };
    obj.cx = (obj.px*(変数/8))+(変数/16);
    obj.cy = (obj.py*(変数/8))+(変数/16);
    obj.cx2 = (obj.px2*(変数/8))+(変数/16);
    obj.cy2 = (obj.py2*(変数/8))+(変数/16);

    speaking = false;
    if (obj.countRound) {
        var text = language_no == 0 ? 
        "conte "+obj.count+" quadrados do " :
        "count "+obj.count+" squares from ";
        switch(obj.direction) {
            case 0:
                if (direction == 0) 
                text += letters[language_no == 0 ? 1 : 0][0]+"1";
                else 
                text += letters[language_no == 0 ? 1 : 0][0]+"1";
                break;
            case 1:
                if (direction == 0) 
                text += letters[language_no == 0 ? 1 : 0][0]+"8";
                else 
                text += letters[language_no == 0 ? 1 : 0][7]+"1";
                break;
            case 2:
                if (direction == 0) 
                text += letters[language_no == 0 ? 1 : 0][7]+"8";
                else 
                text += letters[language_no == 0 ? 1 : 0][7]+"8";
                break;
            case 3:
                if (direction == 0) 
                text += letters[language_no == 0 ? 1 : 0][7]+"1";
                else 
                text += letters[language_no == 0 ? 1 : 0][0]+"8";
                break;
        }
        say(text);
    }
    else if (obj.botRound) {
        say(language_no == 0 ? "acerte a linha ou a coluna" :
        "disable line or column");
    }
    else if (obj.connectRound) {
        var text = op2_name[0][language_no == 0 ? 1 : 0] + " ";
        if (direction == 0) 
        text += letters[language_no == 0 ? 1 : 0][obj.px]+(obj.py+1);
        else 
        text += letters[language_no == 0 ? 1 : 0][obj.py]+(obj.px+1);
        text += " " + op2_name[1][language_no == 0 ? 1 : 0] + " ";
        if (direction == 0) 
        text += letters[language_no == 0 ? 1 : 0][obj.px2]+(obj.py2+1);
        else 
        text += letters[language_no == 0 ? 1 : 0][obj.py2]+(obj.px2+1);
        say(text);
    }
    else if (obj.dirRound) { 
        say(dir_name[obj.direction][language_no == 0 ? 1 : 0]);
    }
    else if (obj.colorRound) { 
        sortColors();
        if (!invert)
        say(colors[color_no][language_no == 0 ? 1 : 0]);
        else
        say(colors[color_no == 0 ? 1 : 0][language_no == 0 ? 1 : 0]);
    }
    else {
        if (direction == 0) 
        say(letters[language_no == 0 ? 1 : 0][obj.px]+(obj.py+1));
        else 
        say(letters[language_no == 0 ? 1 : 0][obj.py]+(obj.px+1));
    }
    return obj;
};

var checkDirection = function(px, py) {
    switch (nextObj.direction) {
        case 0:
            return px < 4;
            break;
        case 1:
            return py < 4;
            break;
        case 2:
            return px > 3;
            break;
        case 3:
            return py > 3;
            break;
    }
};

var op_name = [
    [ "plus", "mais" ],
    [ "minus", "menos" ]
];

var splitNo = function(n) {
    if (n < 3) return n;
    var x = Math.floor(Math.random()*(n-1))+1;
    var y = n-x;
    var op = Math.floor(Math.random()*2);
    return (op == 0 ? 
     x + " " + op_name[0][language_no == 0 ? 1 : 0] + " " + y : 
    (n+x) + " " + op_name[1][language_no == 0 ? 1 : 0] + " " + x);
};

var skip = function() {
    if (nextObj.countRound) {
        console.log("skip count round");
        var count = 0;
        var cx = 0;
        var cy = 0;
        var found = false;
        for (var px = 0; px < 8; px++) {
            for (var py = 0; py < 8; py++) {
                switch(nextObj.direction) {
                    case 0:
                        if (direction == 0)
                        count = (px+1)*(py+1);
                        else
                        count = (px+1)*(py+1);
                        break;
                    case 1:
                        if (direction == 0)
                        count = (px+1)*(8-py);
                        else
                        count = (8-px)*(py+1);
                        break;
                    case 2:
                        if (direction == 0)
                        count = (8-px)*(8-py);
                        else
                        count = (8-px)*(8-py);
                        break;
                    case 3:
                       if (direction == 0)
                       count = (8-px)*(py+1);
                       else
                       count = (px+1)*(8-py);
                       break;
                }
                if (count == nextObj.count) {
                    cx = px*(変数/8)+(変数/16);
                    cy = py*(変数/8)+(変数/16);
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
        triangle.style.backgroundImage = 
        draw(cx, cy);
    }
    else if (nextObj.botRound) {
        console.log("skip bot round");
        var rnd = Math.floor(Math.random()*2);
        var px = nextObj.bot.px;
        var py = nextObj.bot.py;
        if (nextObj.bot.px == 0 && nextObj.bot.py == 0) {
            if (rnd == 0) px = 7;
            else py = 7;
        }
        else if (nextObj.bot.px == 7 && nextObj.bot.py == 0) {
            if (rnd == 0) px = 0;
            else py = 7;
        }
        else if (nextObj.bot.px == 7 && nextObj.bot.py == 7) {
            if (rnd == 0) px = 0;
            else py = 0;
        }
        else if (nextObj.bot.px == 0 && nextObj.bot.py == 7) {
            if (rnd == 0) px = 7;
            else py = 0;
        }
        else if (nextObj.bot.px == 0) {
            px = 7;
        }
        else if (nextObj.bot.py == 0) {
            py = 7;
        }
        else if (nextObj.bot.px == 7) {
            px = 0;
        }
        else if (nextObj.bot.py == 7) {
            py = 0;
        }
        else {
            rnd = Math.floor(Math.random()*4);
            switch (rnd) {
                case 0:
                    px = 0;
                    break;
                case 1:
                    py = 0;
                    break;
                case 2:
                    px = 7;
                    break;
                case 3:
                    py = 7;
                    break;
            }
        }
        
        var cx = px*(変数/8)+(変数/16);
        var cy = py*(変数/8)+(変数/16);
        triangle.style.backgroundImage = 
        draw(cx, cy);
    }
    else if (nextObj.connectRound) {
        console.log("skip connect round");
        nextObj.connect = {
            cx: nextObj.cx,
            cy: nextObj.cy
        };
        var px = Math.floor(nextObj.connect.cx / (変数/8));
        var py = Math.floor(nextObj.connect.cy / (変数/8));
        nextObj.connect.px = px;
        nextObj.connect.py = py;
        triangle.style.backgroundImage = 
        draw_connection(nextObj.cx2, nextObj.cy2);
    }
    else if (nextObj.dirRound) {
        console.log("skip direction round");
        var cx = 0;
        var cy = 0;
        switch (nextObj.direction) {
            case 0:
                cx = 3*(変数/8)+(変数/16);
                cy = 3*(変数/8)+(変数/16);
                break;
            case 1:
                cx = 3*(変数/8)+(変数/16);
                cy = 3*(変数/8)+(変数/16);
                break;
            case 2:
                cx = 4*(変数/8)+(変数/16);
                cy = 3*(変数/8)+(変数/16);
                break;
            case 3:
                cx = 3*(変数/8)+(変数/16);
                cy = 4*(変数/8)+(変数/16);
                break;
        }
        triangle.style.backgroundImage = 
        draw(cx, cy);
    }
    else if (nextObj.colorRound) {
        console.log("skip color round");
        var rnd = Math.floor(Math.random()*2);
        var cx = 0;
        var cy = 0;
        if (color_no == 1) {
            cx = (rnd==0?0:7)*(変数/8)+(変数/16);
            cy = (rnd==0?0:7)*(変数/8)+(変数/16);
        }
        else {
            cx = (rnd==0?7:0)*(変数/8)+(変数/16);
            cy = (rnd==0?0:7)*(変数/8)+(変数/16);
        }
        triangle.style.backgroundImage = 
        draw(cx, cy);
    }
    else {
        console.log("skip round");
        triangle.style.backgroundImage = 
        draw(nextObj.cx, nextObj.cy, nextObj.px, nextObj.py);
    }
    elem3.innerText = "x"+stack.length;
    elem3.classList.add("animate__animated", "animate__tada");
    elem10.classList.add("animate__animated",
        "animate__rotateOut");
    if (stack.length > hs) {
        hs = stack.length;
        elem4.innerText = "HIGHSCORE: x"+hs;
        saveHs();
    }
};

var getHollow = function() {
    return "img/hollow.png";
};

var rotate2d = function(c, p, angle, deg=true) {
    var cx = c.x;
    var cy = c.y;
    var x = p.x;
    var y = p.y;
    var radians = deg ? (Math.PI / 180) * angle : angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return { x: nx, y: ny };
};

var angle2d = function(co, ca) {
    var h = Math.sqrt(
    Math.abs(Math.pow(co, 2)) + 
    Math.abs(Math.pow(ca, 2)));
    var senA = co/h;
    var a = Math.asin(senA);
    a = co == 0 && ca > 0 ? 1.5707963267948966 * 2 : a;
    a = co > 0 && ca > 0 ? 1.5707963267948966 * 2 - a : a;
    a = co < 0 && ca > 0 ? 1.5707963267948966 * 2 - a : a;

    /*console.log("/\/--- ");
    console.log("co: "+co);
    console.log("ca: "+ca);
    console.log("h: "+h);
    console.log("r: "+a);*/

    return a;
};

var getCbjpeg = function(n) {
    var rnd = Math.random();
    if ((typeof n) == "string") {
        return "https://cbjpeg.stream.highwebmedia.com/"+
        "/stream?room="+n+"&f="+rnd;
    }
    else if (contacts[n].json) {
         var imgUrl = 
         "https://cbjpeg.stream.highwebmedia.com/"+
         "/stream?room="+
         contacts[n].json.broadcaster_username+"&f="+rnd;
         return imgUrl;
    }
}

var getHeight = function(h) {
    var co = Math.sqrt(Math.pow(h, 2) - Math.pow(h/2, 2));
    return co;
};

var getWidth = function(h) {
    var co = (1/Math.sin((Math.PI*2)/3))*h;
    return co;
};

/*
   26.565°
   63.43°
*/

/*
class BeepPool {
    constructor() {
       this.stored = [];
       this.playing = [];
       this.used = 0;
    }
    play(url="audio/button-click-713.mp3") {
       var beep0 = this.stored.length > 0 ? 
       this.stored.pop() : new Audio(url);
       beep0.onended = function() {
           for (var k in this.pool.playing) {
               if (this.timestamp == this.pool.playing[k].timestamp) {
                   this.pool.stored.push(
                       this.pool.playing.splice(k, 1)[0]
                   );
                   this.pool.used += 1;
                   info.innerText = "mp3: "+this.pool.used+
                   (this.pool.playing.length > 0 ?
                   "/"+this.pool.playing.length : "");
               }
           }
       }
       this.playing.push(beep0);
       beep0.timestamp = new Date().getTime();
       beep0.pool = this;
       beep0.play();
       navigator.vibrate(200);
    }
    empty() {
       this.stored = [];
       this.used = 0;
    }
}
var beepPool = new BeepPool();*/

/*
3D
- 
- 
2D

*/