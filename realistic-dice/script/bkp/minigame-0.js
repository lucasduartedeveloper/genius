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
var dir = Math.floor(Math.random()*2);

var stack = [];
var pointer = 0;

$(document).ready(function() {
    /*startClick = 0;*/

    $("html, body").css("overflow-x", "hidden");
    $("html, body").css("overscroll-behavior", "none");

    変数 = sw/1.2;

    nextObj = next(false);

    triangle = document.createElement("span");
    triangle.style.position = "absolute";
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
        document.body.appendChild(triangle);
        document.body.appendChild(elem5);
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

    elem2 = document.createElement("span");
    elem2.style.position = "absolute";
    elem2.innerHTML = "A&nbsp;<i class=\"fa-solid "+
    (dir == 0 ? "fa-arrow-right" : "fa-arrow-down")+"\"></i>";
    elem2.style.color = "#fff";
    elem2.style.fontSize = (sw/18)+"px";
    elem2.style.textAlign = "left";
    elem2.style.left = ((sw/2)-(変数/2))+"px";
    elem2.style.top = ((sh/2)-(変数/2)-(sw/9))+"px";
    elem2.style.width = (変数/2)+"px";
    elem2.style.height = (sw/9)+"px";
    //elem2.style.border = "2px solid #fff";
    //elem2.style.borderRadius = (sw/18)+"px";
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
    elem4.style.textAlign = "center";
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
        elem3.classList.remove("animate__animated", "animate__tada")
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
        if (nextObj.dirRound) {
            console.log("repeat: "+
                dir_name[nextObj.direction][language_no == 0 ? 1 : 0]);
            say(dir_name[nextObj.direction][language_no == 0 ? 1 : 0]);
        }
        else if (nextObj.colorRound) {
            console.log("repeat: "+
                colors[color_no][language_no == 0 ? 1 : 0]);
            say(colors[color_no][language_no == 0 ? 1 : 0]);
        }
        else {
            console.log("repeat: "+
                (dir==0?letters[nextObj.px]+(nextObj.py+1):
                letters[nextObj.py]+(nextObj.px+1)));
            if (dir == 0) say(letters[nextObj.px]+
            splitNo((nextObj.py+1)));
            else say(letters[nextObj.py]+
            splitNo((nextObj.px+1)));
        }
    };
    document.body.appendChild(elem8);

    elem9 = document.createElement("img");
    elem9.style.position = "absolute";
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
    document.body.appendChild(elem9);

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
    return draw(x, y, -1, -1, true);
}

var draw = function(x=-1, y=-1, ex=-1, ey=-1, muted=false) {
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

    if (x > 0 && y > 0) {
        ctx.fillStyle = "gray";
        if (muted) ctx.fillStyle = "#222"; //"#111";
        ctx.beginPath();
        ctx.arc(cx, cy, 変数/20, 0, 2*Math.PI);
        ctx.fill();
        //ctx.fillRect(cx - (変数/16), cy - (変数/16), 変数/8, 変数/8);
    }
    if (nextObj.dirRound) {
        var arrow = drawArrow(nextObj.direction);
        ctx.drawImage(arrow, 
        cx-(変数/25), cy-(変数/25), (変数/12.5), (変数/12.5));
    }

    var px = Math.floor(cx / (変数/8));
    var py = Math.floor(cy / (変数/8));

    // px py
    // color
    // 

    if (nextObj.dirRound && checkDirection(px, py)) {
        nextObj = next(false);
        stack.push(nextObj);
    }
    else if (nextObj.colorRound && !nextObj.dirRound && 
        colors[color_no][0] == colorArr[px][py][0]) {
        nextObj = next(false);
        stack.push(nextObj);
    }
    else if (px == ex && py == ey) {
        nextObj = next();
        stack.push(nextObj);
    }
    else {
        stack = [];
    }

    var url = "url('"+canvas.toDataURL()+"')";
    if (nextObj.dirRound) {
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
    else if (nextObj.colorRound && !nextObj.dirRound) {
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

var letters = [
  "A", "B ", "C", "DADO ", "E", "F", "G", "H"
];

var dir_name = [
    [ "go left", "esquerda" ],
    [ "go in front", "para frente" ],
    [ "go right", "direita" ],
    [ "go back", "para trás" ]
];

var next = function(cancolor=true) {
    var obj = {
        dirRound: cancolor && Math.floor(Math.random()*3) == 0,
        colorRound: cancolor && Math.floor(Math.random()*3) == 0,
        direction: Math.floor(Math.random()*4),
        px: Math.floor(Math.random()*8),
        py: Math.floor(Math.random()*8)
    };
    obj.cx = (obj.px*(変数/8))+(変数/16);
    obj.cy = (obj.py*(変数/8))+(変数/16);
    speaking = false;
    if (obj.dirRound) { 
        say(dir_name[obj.direction][language_no == 0 ? 1 : 0]);
    }
    else if (obj.colorRound) { 
        sortColors();
        say(colors[color_no][language_no == 0 ? 1 : 0]);
    }
    else {
        if (dir == 0) say(letters[obj.px]+(obj.py+1));
        else say(letters[obj.py]+(obj.px+1));
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