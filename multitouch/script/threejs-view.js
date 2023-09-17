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

    light.position.set(0, 2.5, 2.5);
    light.castShadow = true;

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default

    lightObj = new THREE.Group();
    //lightObj.add(light);

    virtualCamera = new THREE.PerspectiveCamera( 
        cameraParams.fov, 
        cameraParams.aspectRatio, 
        cameraParams.near, 
        cameraParams.far 
    );
    virtualCamera.add(light);

    scene.add(lightObj);
    scene.add(virtualCamera);

    group = new THREE.Group();
    //group.rotation.x = -(Math.PI/2);
    scene.add(group);

    var geometry = new THREE.ConeGeometry( 5, 5, 4 ); 
    var material = new THREE.MeshStandardMaterial( {
        color: 0xffff00,
        opacity: 0.5,
        transparent: true
    } );
    var cone = new THREE.Mesh(geometry, material ); 
    //group.add( cone );

    cone.rotation.y = -(Math.PI/4);

    var geometry = new THREE.SphereGeometry( 0.2, 32 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555
    } );
    center = new THREE.Mesh(geometry, material ); 
    group.add( center );

    center.position.x = -4;
    center.position.y = 0;
    center.position.z = 4;
    center.rotation.x = -(Math.PI/2);
    center.rotation.z = -(Math.PI/2);

    var geometry = new THREE.CylinderGeometry( 0.05, 0.05, 5 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555
    } );
    axisX = new THREE.Mesh(geometry, material ); 
    group.add( axisX );

    axisX.position.x = -1.5;
    axisX.position.y = 0;
    axisX.position.z = 4;
    axisX.rotation.x = -(Math.PI/2);
    axisX.rotation.z = -(Math.PI/2);

    var geometry = new THREE.ConeGeometry( 0.15, 0.5, 32 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555,
    } );
    var axisXend = new THREE.Mesh(geometry, material ); 
    group.add( axisXend );

    axisXend.position.x = 1;
    axisXend.position.y = 0;
    axisXend.position.z = 4;
    axisXend.rotation.x = -(Math.PI/2);
    axisXend.rotation.z = -(Math.PI/2);

    var geometry = new THREE.CylinderGeometry( 0.05, 0.05, 5 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555 
    } );
    axisY = new THREE.Mesh(geometry, material ); 
    group.add( axisY );

    axisY.position.x = -4;
    axisY.position.y = 2.5;
    axisY.position.z = 4;
    //axisY.rotation.x = -(Math.PI/2);

    var geometry = new THREE.ConeGeometry( 0.15, 0.5, 32 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555,
    } );
    var axisYend = new THREE.Mesh(geometry, material ); 
    group.add( axisYend );

    axisYend.position.x = -4;
    axisYend.position.y = 5;
    axisYend.position.z = 4;
    //axisYend.rotation.x = -(Math.PI);

    var geometry = new THREE.CylinderGeometry( 0.05, 0.05, 5 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555
    } );
    axisZ = new THREE.Mesh(geometry, material ); 
    group.add( axisZ );

    axisZ.position.x = -4;
    axisZ.position.y = 0;
    axisZ.position.z = 1.5;
    axisZ.rotation.x = -(Math.PI/2);

    var geometry = new THREE.ConeGeometry( 0.15, 0.5, 32 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555,
    } );
    var axisZend = new THREE.Mesh(geometry, material ); 
    group.add( axisZend );

    axisZend.position.x = -4;
    axisZend.position.y = 0;
    axisZend.position.z = -1;
    axisZend.rotation.x = -(Math.PI/2);

    /*var pos = new THREE.Vector3();
    createPackaging(
    "nicolediretora", "img/rect/texture-1.png", 1, pos);
    pos.x = 5.5;
    createPackaging(
    "jinjinn00_", "img/rect/texture-2.png", 2, pos);*/

    var geometry = new THREE.PlaneGeometry( 15, 15 ); 
    var material = new THREE.MeshStandardMaterial( {
        //color: 0xffff00 
    } );
    plane = new THREE.Mesh(geometry, material ); 
    group.add( plane );
    plane.receiveShadows = true;

    plane.position.y = 0;
    plane.rotation.x = -(Math.PI/2);

    var geometry = new THREE.PlaneGeometry( 15, 7.5 ); 
    var material = new THREE.MeshStandardMaterial( {
        //color: 0xffff00 
    } );
    planeBackground = new THREE.Mesh(geometry, material ); 
    group.add( planeBackground );
    planeBackground.receiveShadows = true;

    planeBackground.position.y = 3.75;
    planeBackground.position.z = -7.5;
    planeBackground.loadTexture("img/background-0.png");

    var rnd = Math.random();
    plane.loadTextureEx(
    "img/interleaved-texture-0.png?rnd="+rnd, 7, 7);

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
    group.add( framePlane );

    framePlane.position.y = 2.5;
    //framePlane.rotation.x = -(Math.PI/2);

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
    animateThreejs();
}

var startAnimation = function() {
    render = true;
    animateThreejs();
};

var pauseAnimation = function() {
    render = false;
};

var drawLabel = function(nick, callback) {
    var canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 100;

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 500, 100);

    ctx.fillStyle = "#000";
    ctx.font = "50px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(nick, 300, 50);

    var img = document.createElement("img");
    img.canvas = canvas;
    img.ctx = ctx;
    img.onload = function() {
        this.ctx.drawImage(this, 0, 0, 100, 100);
        callback(this.canvas.toDataURL());
    };
    img.src = "img/ig-logo.png";
};

var createPackaging = function(nick, url, size, offset) {
    var pos = offset.clone();

    var group = new THREE.Group();
    group.position.x = pos.x;
    group.position.y = pos.y;
    group.position.z = pos.z;

    var geometry = new THREE.PlaneGeometry( 5, 5 ); 
    var material = new THREE.MeshStandardMaterial( {
        //color: 0xffff00 
    } );
    plane = new THREE.Mesh(geometry, material ); 
    group.add( plane );

    plane.position.y = 0;
    plane.rotation.x = -(Math.PI/2);

    var geometry = new THREE.PlaneGeometry( 5, 5 ); 
    var material = new THREE.MeshStandardMaterial( {
        side: THREE.DoubleSide,
        color: 0xffffff,
        opacity: 0.3,
        transparent: true
    } );
    planeTop = new THREE.Mesh(geometry, material ); 
    group.add( planeTop );

    planeTop.position.y = 15;
    planeTop.rotation.x = -(Math.PI/2);

    var geometry = new THREE.PlaneGeometry( 5, 15 ); 
    var material = new THREE.MeshStandardMaterial( {
        side: THREE.DoubleSide,
        color: 0xffffff,
        opacity: 0.3,
        transparent: true
    } );
    planeLeft = new THREE.Mesh(geometry, material ); 
    group.add( planeLeft );

    planeLeft.position.y = 7.5;
    planeLeft.position.x = -2.5;
    planeLeft.rotation.y = -(Math.PI/2);

    planeRight = new THREE.Mesh(geometry, material ); 
    group.add( planeRight );

    planeRight.position.y = 7.5;
    planeRight.position.x = +2.5;
    planeRight.rotation.y = -(Math.PI/2);

    planeBack = new THREE.Mesh(geometry, material ); 
    group.add( planeBack );

    planeBack.position.y = 7.5;
    planeBack.position.z = -2.5;

    planeFront = new THREE.Mesh(geometry, material ); 
    group.add( planeFront );

    planeFront.position.y = 7.5;
    planeFront.position.z = 2.5;

    loadRectangle(url, size, group);

    drawLabel(nick, function(url) {
        var geometry = new THREE.PlaneGeometry( 5, 1 ); 
        var material = new THREE.MeshStandardMaterial( {
            color: 0xffffff,
            opacity: 1,
            transparent: true
         } );
         label = new THREE.Mesh(geometry, material ); 
         group.add( label );

         label.position.x = 0;
         label.position.y = 14.5;
         label.position.z = 2.55;

         label.loadTexture(url);
    });

    scene.add(group);
};

var loadRectangle = function(url, size, group) {
    var img = document.createElement("img");
    img.onload = function() {
        var width = (5/size);
        var height = (5*(this.height/this.width))/size;
        var geometry = new THREE.PlaneGeometry( width, height ); 
        var material = new THREE.MeshBasicMaterial( {
            side: THREE.DoubleSide,
            color: 0xffffff
        } );
       rectangle = new THREE.Mesh(geometry, material ); 
       group.add(rectangle);

       rectangle.position.y = (height/2)+(Math.abs(1-size)*height);
       rectangle.position.x = 0;
       rectangle.loadTexture(url);

       if (size > 1) {
           var geometry = 
           new THREE.CylinderGeometry( 0.1, 0.1, 5, 32 );
           var material = new THREE.MeshBasicMaterial( {
                side: THREE.DoubleSide,
                color: 0xffffff
           } );
           left = new THREE.Mesh(geometry, material ); 
           group.add(left);
           left.position.x = -0.5;
           left.position.y = 2.5;

           var geometry = 
           new THREE.CylinderGeometry( 0.1, 0.1, 5, 32 );
           var material = new THREE.MeshBasicMaterial( {
                side: THREE.DoubleSide,
                color: 0xffffff
           } );
           right = new THREE.Mesh(geometry, material ); 
           group.add(right);
           right.position.x = 0.5;
           right.position.y = 2.5;
       }
    };
    img.src = url;
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