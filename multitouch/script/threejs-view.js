var cameraParams = {
   fov: 75, aspectRatio: 0.5, near: 0.1, far: 50
};
var lightParams = {
   color: 0xffffff, intensity: 1, distance: 100, decay: 3
};
var $;
var renderer, scene, light, camera, box, eye;

/*import { StereoscopicEffects } from 'threejs-StereoscopicEffects';*/
//import { Interaction } from 'three.interaction';

var load3D = function(ar) {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, preserveDrawingBuffer: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    // default THREE.PCFShadowMap
    renderer.setSize(500, 1000);

    cameraParams.aspectRatio = ar;

    renderer.enable3d = 1;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.display = "none";
    renderer.domElement.style.left = (0)+"px";
    renderer.domElement.style.top = (0)+"px";
    renderer.domElement.style.width = (sw)+"px";
    renderer.domElement.style.height = (sh)+"px";
    //renderer.domElement.style.border = "1px solid #fff";
    //renderer.domElement.style.borderRadius = "50%";
    //renderer.domElement.style.scale = "0.8";
    //renderer.domElement.style.border = "2px solid #ccc";
    renderer.domElement.style.zIndex = "20";
    document.body.appendChild( renderer.domElement ); 

    scene = new THREE.Scene();
    //scene.background = null;
    scene.background = new THREE.Color("#000"); 

    light = new THREE.PointLight(
        lightParams.color,
        lightParams.intensity,
        lightParams.distance,
        lightParams.decay
    );

    light.position.set(5, 5, 5);
    light.lookAt(0, 0, 0);
    light.castShadow = true;

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default

    lightObj = new THREE.Group();
    lightObj.add(light);

    virtualCamera = new THREE.PerspectiveCamera( 
        cameraParams.fov, 
        cameraParams.aspectRatio, 
        cameraParams.near, 
        cameraParams.far 
    );
    //virtualCamera.add(light);

    scene.add(lightObj);
    scene.add(virtualCamera);

    group = new THREE.Group();
    scene.add(group);

    rotationView = new THREE.Group();
    rotationView.position.x = -7.5;
    rotationView.position.z = 7.5;
    scene.add(rotationView);

    var geometry = new THREE.SphereGeometry( 0.2, 32 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555
    } );
    center = new THREE.Mesh(geometry, material ); 
    rotationView.add( center );

    center.position.x = 0;
    center.position.y = 0;
    center.position.z = 0;
    center.rotation.x = -(Math.PI/2);
    center.rotation.z = -(Math.PI/2);

    var geometry = new THREE.CylinderGeometry( 0.05, 0.05, 5 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555
    } );
    axisX = new THREE.Mesh(geometry, material ); 
    rotationView.add( axisX );

    axisX.position.x = 2.5;
    axisX.position.y = 0;
    axisX.position.z = 0;
    axisX.rotation.x = -(Math.PI/2);
    axisX.rotation.z = -(Math.PI/2);

    var geometry = new THREE.ConeGeometry( 0.15, 0.5, 32 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555,
    } );
    var axisXend = new THREE.Mesh(geometry, material ); 
    rotationView.add( axisXend );

    axisXend.position.x = 5;
    axisXend.position.y = 0;
    axisXend.position.z = 0;
    axisXend.rotation.x = -(Math.PI/2);
    axisXend.rotation.z = -(Math.PI/2);

    var geometry = new THREE.CylinderGeometry( 0.05, 0.05, 5 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555 
    } );
    axisY = new THREE.Mesh(geometry, material ); 
    rotationView.add( axisY );

    axisY.position.x = 0;
    axisY.position.y = 2.5;
    axisY.position.z = 0;
    //axisY.rotation.x = -(Math.PI/2);

    var geometry = new THREE.ConeGeometry( 0.15, 0.5, 32 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555,
    } );
    var axisYend = new THREE.Mesh(geometry, material ); 
    rotationView.add( axisYend );

    axisYend.position.x = 0;
    axisYend.position.y = 5;
    axisYend.position.z = 0;
    //axisYend.rotation.x = -(Math.PI);

    var geometry = new THREE.CylinderGeometry( 0.05, 0.05, 5 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555
    } );
    axisZ = new THREE.Mesh(geometry, material ); 
    rotationView.add( axisZ );

    axisZ.position.x = 0;
    axisZ.position.y = 0;
    axisZ.position.z = -2.5;
    axisZ.rotation.x = -(Math.PI/2);

    var geometry = new THREE.ConeGeometry( 0.15, 0.5, 32 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555,
    } );
    var axisZend = new THREE.Mesh(geometry, material ); 
    rotationView.add( axisZend );

    axisZend.position.x = 0;
    axisZend.position.y = 0;
    axisZend.position.z = -5;
    axisZend.rotation.x = -(Math.PI/2);

    var geometry = new THREE.PlaneGeometry( 15, 15 ); 
    var material = new THREE.MeshStandardMaterial( {
        //color: 0xffff00 
    } );
    plane = new THREE.Mesh(geometry, material ); 
    scene.add( plane );
    plane.receiveShadow = true;

    plane.position.y = 0;
    plane.rotation.x = -(Math.PI/2);

    var rnd = Math.random();
    plane.loadTextureEx(
    "img/interleaved-texture-0.png?rnd="+rnd, 4, 4);

    var geometry = new THREE.PlaneGeometry( 15, 7.5 ); 
    var material = new THREE.MeshStandardMaterial( {
        //color: 0xffff00 
    } );
    planeBackground = new THREE.Mesh(geometry, material ); 
    //scene.add( planeBackground );
    planeBackground.receiveShadow = true;

    planeBackground.position.y = 3.75;
    planeBackground.position.z = -7.5;
    planeBackground.loadTexture("img/background-0.png");

    var geometry = new THREE.BoxGeometry( 2.5, 2.5, 2.5 ); 
    var material = new THREE.MeshStandardMaterial( {
        //color: 0xffff00 
    } );
    box = new THREE.Mesh(geometry, material ); 
    //scene.add( box );
    box.castShadow = true;

    box.position.y = 1.25;
    box.position.z = 2;
    //box.rotation.x = -(Math.PI/2);

    box.loadTexture("img/wood-box-2.png");
    box.loadTextureNormal("img/wood-box-2_n.png");

    var geometry = new THREE.PlaneGeometry( 2.5, 5 ); 
    var material = new THREE.MeshBasicMaterial( {
        //color: 0xffff00 
    } );
    framePlane = new THREE.Mesh(geometry, material ); 
    //scene.add( framePlane );
    framePlane.castShadow = true;

    framePlane.position.y = 2.5;
    //framePlane.rotation.x = -(Math.PI/2);

    chessKing = new THREE.Group();
    chessKing.castShadow = true;
    chessKing.scale.set(0.35, 0.35, 0.35);
    scene.add(chessKing);

    chessKing2 = new THREE.Group();
    chessKing2.castShadow = true;
    chessKing2.scale.set(0.35, 0.35, 0.35);
    scene.add(chessKing2);

    loadOBJ("img/chess-king.obj", function(object) {
        object.position.x = -2;
        object.position.y = 0;
        object.position.z = 16;
        object.rotation.x = -(Math.PI/2);

        object.castShadow = true;
        object.children[0].castShadow = true;

        var material = new THREE.MeshStandardMaterial( {
            color: 0xffffff
        } );

        var white = object.clone();
        white.children[0].material = material;

         var material = new THREE.MeshStandardMaterial( {
            color: 0x000000,
        } );

        var black = object.clone();
        black.children[0].material = material;

        chessKing.add(white)
        chessKing2.add(black)
    });

    virtualCamera.position.set(0, 7.5, 17.5);
    virtualCamera.lookAt(0, 7.5, 0);

    controls = new THREE.OrbitControls(virtualCamera,
    renderer.domElement);
    controls.target = new THREE.Vector3(0, 7.5, 0);
    controls.update();

    render = true;
    iterations = 9999999999;
    animateThreejs = function() {
        iterations -= 1;
        if (iterations > 0 && render)
        req = requestAnimationFrame( animateThreejs );

        //if (!motionSensorAvailable)
        //group.rotation.z += 0.01;

        if (canTexture) {
            canTexture = false;
            framePlane.loadTexture(frameView.toDataURL(),
            function() {
                canTexture = true;
            });
        }

        controls.update();
        renderer.render( scene, virtualCamera );
    };
    //animateThreejs();
}

var startAnimation = function() {
    render = true;
    animateThreejs();
};

var pauseAnimation = function() {
    render = false;
};

var canTexture = true;

THREE.Object3D.prototype.loadTexture = 
function(url, callback, type="D") {
var rnd = Math.random();
new THREE.TextureLoader().load(url, 
    texture => {
        //Update Texture
        if (this.material) {
        if (type == "D") {
            //console.log("loaded texture");
            this.material.transparent = true;
            this.material.map = texture;
            this.material.needsUpdate = true;
            if (callback)
            callback();
        }
        else if (type == "N") {
            this.material.transparent = true;
            this.material.normalMap = texture;
            this.material.needsUpdate = true;
        }
        else if (type == "O") {
            this.material.transparent = true;
            this.material.alphaMap = texture;
            this.material.needsUpdate = true;
        }
        }
        else {
        if (type == "D") {
            //console.log("loaded texture obj");
            this.children[0].material.transparent = true;
            this.children[0].material.map = texture;
            this.children[0].material.needsUpdate = true;
        }
        else if (type == "N") {
            this.children[0].material.transparent = true;
            this.children[0].material.normalMap = texture;
            this.children[0].material.needsUpdate = true;
        }
        else if (type == "O") {
            this.children[0].material.transparent = true;
            this.children[0].material.alphaMap = texture;
            this.children[0].material.needsUpdate = true;
        }
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

THREE.Object3D.prototype.loadTextureNormal = 
function(url, n=0, type="D") {
var rnd = Math.random();
new THREE.TextureLoader().load(url+"?v="+rnd, 
    texture => {
        //Update Texture
        if (this.material && 
            typeof this.material.length == "undefined") {
            this.material.transparent = true;
            this.material.normalMap = texture;
            this.material.needsUpdate = true;
        }
        else if (this.material) {
            this.material[n].transparent = true;
            this.material[n].map = texture;
            this.material[n].needsUpdate = true;
        }
        else {
            if (type == "D") {
                this.children[n].material.transparent = true;
                this.children[n].material.map = texture;
                this.children[n].material.needsUpdate = true;
            }
            else {
                this.children[n].material.transparent = true;
                this.children[n].material.normalMap = texture;
                this.children[n].material.needsUpdate = true;
            }
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

var drawToSquare = function(data) {
    var ctx = canvas.getContext("2d");
    ctx.drawImage(data, 0, 0, 300, 300);
}

var animateTree = function() {
    var ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";

    var max = 15;
    var p = { x: 150, y: 300 };

    ctx.save();
    ctx.translate(p.x, p.y);
    drawTree(ctx, { x: 0, y: 0 }, 0, 50, 0);
};

var findDistance = function(len) {
    var startLen = 50;
    var result = 1;
    while (startLen != len) {
        startLen *= 0.8;
        result += 1;
    }
    return result;
};

var endTimeout = 0;

var positionArr = [];
var sequence = 0;
var position = { x: 0, y: 0 };
var rotation = 0;
var drawTree = function(ctx, p, angle, len, w, from=0) {
    if(len < 10) {
        //console.log(from, "done");
        clearTimeout(endTimeout);
        endTimeout = setTimeout(function() {
            ctx.restore();
            console.log("context restored");
        }, 1000);
        return;
    }

    var distance = findDistance(len);

    setTimeout(function() {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";

        position.x += p.x;
        position.y += p.y;
        rotation += angle;

        var c = from ? positionArr[from-1] : { x: 0, y: 0 };
        var p0 = from ? 
        { x: positionArr[from-1].x, y: positionArr[from-1].y-len } : 
        { x: 0, y: -len };
        p0 = _rotate2d(c, p0, angle);
        //console.log(sequence + " < " + (from-1));

        var rc = { x: 150+c.x, y: 300+c.y };
        //console.log("x: "+rc.x.toFixed(2)+", y: "+rc.y.toFixed(2), angle);

        positionArr[sequence] = { x: p0.x, y: p0.y };

        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(p0.x, p0.y);
        ctx.stroke();

        var fillStyle = [ "purple", "orange", "yellow" ][w];
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(p0.x, p0.y, 7, 0, Math.PI*2);
        //ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "10px sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        //ctx.fillText(distance, p0.x, p0.y);

        var amt = 1+Math.floor(Math.random()*3);
        var v = { x: p0.x-c.x, y: p0.y-c.y };

        drawTree(ctx, v, angle-25, len*0.8, 1-0, sequence+1);
        drawTree(ctx, v, angle+25, len*0.8, 1-1, sequence+1);

        for (var n = 0; n < amt; n++) {
             var offset = -50+Math.floor(Math.random()*100);
             //drawTree(ctx, v, angle+offset, len*0.8, n, sequence+1);
        }

        sequence += 1;
    }, (1000/60));
};

var loadOBJ = function(path, callback) {
    var loader = new THREE.OBJLoader();
    // load a resource
    // resource URL
    // called when resource is loaded
    loader.load(path, callback,
    // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
    // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    );
};

var charList = "abcd";
var rnd = charList[Math.floor(Math.random()*4)];
var code = 
"var _"+rnd+" = function(side) {\n"+
    "var result = Math.sqrt(\n"+
        "Math.pow(side, 2)+\n"+
        "Math.pow((side/2), 2)\n"+
    ");\n"+
    "return result;\n"+
"};";

eval(code);