var unexist = [
    { url: "img/item/607.png", name: "Yggdrasil Berry" },
    { url: "img/item/5094.png", name: "Orc Hero Helm" },
    { url: "img/item/5394.png", name: "Bubble Gum" },
    { url: "img/item/969.png", name: "Gold" },
    { url: "img/item/4402.png", name: "Random Card" },
    { url: "img/item/617.png", name: "Old Purple Box" },
    { url: "img/item/984.png", name: "Oridecon" },
    { url: "img/item/985.png", name: "Elunium" },
    { url: "img/item/513.png", name: "Banana" },
    { url: "img/item/6498.png", name: "Jellopy" }
];

var unexist_animals = [
    { url: "img/animals/dolphin.jpg", name: "Dolphin" },
    { url: "img/animals/elephant.jpg", name: "Elephant" },
    { url: "img/animals/flamingo.jpg", name: "Flamingo" },
    { url: "img/animals/giraffe.jpg", name: "Giraffe" },
    { url: "img/animals/gorilla.jpg", name: "Gorilla" },
    { url: "img/animals/koala.jpg", name: "Koala" },
    { url: "img/animals/lion.jpg", name: "Lion" },
    { url: "img/animals/rhinoceront.jpg", name: "Rhinoceront" },
    { url: "img/animals/seahorse.jpg", name: "Seahorse" },
    { url: "img/animals/shark.jpg", name: "Shark" }
];

var createTexture = function() {
    var canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 64;
    var ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.font = ctx.font.replace(/\d+px/, (canvas.height/1.5)+"px");
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    
    for (var k = 0; k < 10; k++) {
        ctx.translate((k*canvas.height)+
            (canvas.height/2), (canvas.height/2));
        ctx.rotate(-Math.PI/2);
        ctx.fillStyle = "#000";
        ctx.strokeRect(-((canvas.height/2)-2), 
            -((canvas.height/2)-2), canvas.height-4, canvas.height-4);
        ctx.fillStyle = "#fff";
        ctx.fillText(k, 0, 0);
        ctx.rotate(Math.PI/2);
        ctx.translate(-((k*canvas.height)+
            (canvas.height/2)), -(canvas.height/2));
    }

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#f00";
    ctx.beginPath();
    ctx.moveTo(1,0);
    ctx.lineTo(1,canvas.height);
    ctx.stroke();

    var dataURL = canvas.toDataURL();
    //downloadCanvas("canvas.png", dataURL);

    slot0.loadTexture(canvas.toDataURL());
    return dataURL;

    slot0.loadTexture("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG321raFHl9klohbAmkABWzNRpR5cqO2pFUw&usqp=CAU");
    console.log(canvas.toDataURL());
    window.open(canvas.toDataURL(), "_blank");
    window.location.href = canvas.toDataURL();
    return canvas.toDataURL();
};

var createTexture2 = function() {
    loadImages(function() {
    //console.log("imgs loaded");
    var canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 64;
    var ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.font = ctx.font.replace(/\d+px/, (canvas.height/1.5)+"px");
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";

    for (var k = 0; k < 10; k++) {
        ctx.translate((k*canvas.height)+
            (canvas.height/2), (canvas.height/2));
        ctx.rotate(-Math.PI/2);
        ctx.fillStyle = "#000";
        ctx.fillRect(-((canvas.height/2)-2), 
            -((canvas.height/2)-2), canvas.height-4, canvas.height-4);
        ctx.fillStyle = "#fff";
        //ctx.fillText(k, 0, 0);
        ctx.drawImage(imgList[k], 
            -((canvas.height/2)-16),
            -((canvas.height/2)-16),
            canvas.height-32, 
            canvas.height-32
        );
        ctx.rotate(Math.PI/2);
        ctx.translate(-((k*canvas.height)+
            (canvas.height/2)), -(canvas.height/2));
    }

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#f00";
    ctx.beginPath();
    ctx.moveTo(1,0);
    ctx.lineTo(1,canvas.height);
    ctx.stroke();

    var dataURL = canvas.toDataURL();
    //downloadCanvas("canvas.png", dataURL);

    slot0.loadTexture(canvas.toDataURL());
    });
};

var imgList = new Array(10);
var loadImages = function(callback) {
    var imgsLoaded = 0;
    for (var k = 0; k < 10; k++) {
        var img = document.createElement("img");
        //img.crossOrigin = "anonymous";
        img.n = k;
        img.onload = function() {
            var n = this.n;
            imgList[n] = this;
            imgsLoaded += 1;
            console.log("loaded img "+n);
            if (callback && imgsLoaded == 10) {
                callback();
            }
        };
        img.src = unexist[k].url;
        //downloadCanvas(unexist[k]);
        console.log("loading img "+k);
    }
};

var createTexture3 = function() {
    loadImages2(function() {
    //console.log("imgs loaded");
    var canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 64;
    var ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000";
    ctx.font = ctx.font.replace(/\d+px/, (canvas.height/1.5)+"px");
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";

    for (var k = 0; k < 10; k++) {
        ctx.translate((k*canvas.height)+
            (canvas.height/2), (canvas.height/2));
        ctx.rotate(-Math.PI/2);
        ctx.fillStyle = "#000";
        ctx.fillRect(-((canvas.height/2)-2), 
            -((canvas.height/2)-2), canvas.height-4, canvas.height-4);
        ctx.fillStyle = "#fff";
        //ctx.fillText(k, 0, 0);
        ctx.drawImage(imgList[k], 
            -((canvas.height/2)-8),
            -((canvas.height/2)-8),
            canvas.height-16, 
            canvas.height-16
        );
        ctx.rotate(Math.PI/2);
        ctx.translate(-((k*canvas.height)+
            (canvas.height/2)), -(canvas.height/2));
    }

    ctx.strokeStyle = "#f00";
    ctx.beginPath();
    ctx.moveTo(1,0);
    ctx.lineTo(1,canvas.height);
    ctx.stroke();

    var dataURL = canvas.toDataURL();
    //downloadCanvas("canvas.png", dataURL);

    slot0.loadTexture(canvas.toDataURL());
    });
};

var loadImages2 = function(callback) {
    var imgsLoaded = 0;
    for (var k = 0; k < 10; k++) {
        var img = document.createElement("img");
        //img.crossOrigin = "anonymous";
        img.n = k;
        img.onload = function() {
            var n = this.n;
            imgList[n] = this;
            imgsLoaded += 1;
            console.log("loaded img "+n);
            if (callback && imgsLoaded == 10) {
                callback();
            }
        };
        img.src = unexist_animals[k].url;
        //downloadCanvas(unexist[k]);
        console.log("loading img "+k);
    }
};

var downloadCanvas = function(dataURL, filename) {
    /*text = text.replace("</body>", 
    "<script src=\"//cdn.jsdelivr.net/npm/eruda\"></script>"+
    "<script>eruda.init();</script></body>")*/
    var element = document.createElement('a');
    element.setAttribute('href', dataURL);
    element.setAttribute('download', filename);
    element.click();
}

THREE.loadObj = 
function(objUrl) {
    // instantiate a loader
    var loader = new THREE.OBJLoader();
    // load a resource
    loader.load(
        // resource URL
        "models/"+objUrl,
       // called when resource is loaded
       function ( object ) {
           object.castShadow = true;
           object.receiveShadow = true;
           for (var k in object.children) {
               object.children[k].castShadow = true;
               object.receiveShadow = true;
           }
           scene.add(object);
       },
       // called when loading is in progresses
       function ( xhr ) {
           console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
       },
       // called when loading has errors
       function ( error ) {
           console.log( 'An error happened' );
       }
   );
}

THREE.Object3D.prototype.loadTexture = 
function(url) {
    new THREE.TextureLoader().load(url,
    texture => {
        //Update Texture
        if (typeof this.material.length == "undefined") {
            this.material.transparent = true;
            this.material.map = texture;
            this.material.needsUpdate = true;
        }
        else if (this.material) {
            this.material[0].transparent = true;
            this.material[0].map = texture;
            this.material[0].needsUpdate = true;
        }
        else {
            this.children[0].material.transparent = true;
            this.children[0].material.map = texture;
            this.children[0].material.needsUpdate = true;
        }
    },
    xhr => {
       //Download Progress
       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    error => {
       //Error CallBack
        console.log("An error happened", error);
    });
};

THREE.Object3D.prototype.loadTextureEx = 
function(url, repeatX=0, repeatY=0, type="UN") {
    new THREE.TextureLoader().load(url,
    texture => {
        if (repeatX > 0 && repeatY == 0) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.offset.set( 0, 0 );
            texture.repeat.set( repeatX, 1 );
        }
        else if (repeatX == 0 && repeatY > 0) {
            texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set( 0, 0 );
            texture.repeat.set( 1, repeatY );
        }
        else if (repeatX > 0 && repeatY > 0) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set( 0, 0 );
            texture.repeat.set( repeatX, repeatY );
        }

        //Update Texture
        if (typeof this.material.length == "undefined") {
            this.material.transparent = true;
            this.material.map = texture;
            this.material.needsUpdate = true;
        }
        else if (this.material) {
            this.material[0].transparent = true;
            this.material[0].map = texture;
            this.material[0].needsUpdate = true;
        }
        else {
            this.children[0].material.transparent = true;
            this.children[0].material.map = texture;
            this.children[0].material.needsUpdate = true;
        }
     },
     xhr => {
       //Download Progress
       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    error => {
       //Error CallBack
        console.log("An error happened", error);
    });
}

THREE.Object3D.prototype.removeTexture = 
function() {
    //Update Texture
    if (this.material) {
        this.material.map = null;
        this.material.needsUpdate = true;
    }
    else {
        this.children[0].material.map = null;
        this.children[0].material.needsUpdate = true;
    }
};

/*
    return dataURL;
    slot0.loadTexture("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG321raFHl9klohbAmkABWzNRpR5cqO2pFUw&usqp=CAU");
    console.log(canvas.toDataURL());
    window.open(canvas.toDataURL(), "_blank");
    window.location.href = canvas.toDataURL();
    return canvas.toDataURL();
*/
/*
*/