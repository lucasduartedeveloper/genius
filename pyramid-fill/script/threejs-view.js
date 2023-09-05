var cameraParams = {
   fov: 75, aspectRatio: 1, near: 0.1, far: 50
};
var lightParams = {
   color: 0xffffff, intensity: 1, distance: 100, decay: 3
};
var $;
var renderer, scene, light, camera, box, eye;

/*import { StereoscopicEffects } from 'threejs-StereoscopicEffects';*/
//import { Interaction } from 'three.interaction';

var load3D = function() {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    // default THREE.PCFShadowMap
    renderer.setSize(500, 500);
    document.body.appendChild( renderer.domElement ); 

    eyePosition = {
        x: 0,
        y: 0,
        offsetX: 0,
        offsetY: 0
    };
    var cooldown = 0;
    var startTime = 0;
    var mode = -1;
    var startX = 0;
    var startY = 0;
    renderer.enable3d = 1;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.left = ((sw/2)-50)+"px";
    renderer.domElement.style.top = ((sh/2)-225)+"px";
    renderer.domElement.style.width = (100)+"px";
    renderer.domElement.style.height = (100)+"px";
    //renderer.domElement.style.border = "1px solid #fff";
    renderer.domElement.style.borderRadius = "50%";
    renderer.domElement.style.border = "2px solid #ccc";
    renderer.domElement.style.zIndex = "5";
    renderer.domElement.ontouchstart = function(e) {
        if (mode == 0) {
            var left = renderer.domElement.style.left;
            left = parseInt(left.replace("px",""));
            var top = renderer.domElement.style.top;
            top = parseInt(top.replace("px",""));

            eyePosition.x = e.touches[0].clientX;
            eyePosition.y = e.touches[0].clientY;

            eyePosition.offsetX = e.touches[0].clientX - left;
            eyePosition.offsetY = e.touches[0].clientY - top;
        }
        else if (mode == 1) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
        else if (mode == 2) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
        startTime = new Date().getTime();
    };
    renderer.domElement.ontouchmove = function(e) {
        cooldownReset = false;
        if (mode == 0) {
            eyePosition.x = e.touches[0].clientX;
            eyePosition.y = e.touches[0].clientY;

            renderer.domElement.style.left = 
            (eyePosition.x-eyePosition.offsetX)+"px";
            renderer.domElement.style.top = 
            (eyePosition.y-eyePosition.offsetY)+"px";
        }
        else if (mode == 1) {
            var moveX = e.touches[0].clientX - startX;
            var moveY = e.touches[0].clientY - startY;
            group.rotateZ(-((1/300)*moveX)*(Math.PI/45));
            group.rotateX(((1/300)*moveY)*(Math.PI/45));
        }
        else if (mode == 2) {
            var moveX = e.touches[0].clientX - startX;
            var moveY = e.touches[0].clientY - startY;
            var hyp = Math.sqrt(
            Math.pow(Math.abs(moveX),2)+
            Math.pow(Math.abs(moveY),2));

            var scale = ((1/150)*hyp);
            virtualCamera.position.y = 5+(scale*5);
        }
    };
    renderer.domElement.ontouchend = function(e) {
        cooldown = setTimeout(function() {
            if (cooldownReset) return;
            mode = -1;
            renderer.domElement.style.border = "2px solid #ccc";
        }, 3000);
    };

    var cooldownReset = false;
    renderer.domElement.ondblclick = function(e) {
        cooldownReset = true;
        mode = (mode+1) < 3 ? (mode+1) : 0;
        if (mode == 0) {
            renderer.domElement.style.border = "2px solid limegreen";
        }
        else if (mode == 1) {
            renderer.domElement.style.border = "2px solid yellow";
        }
        else if (mode == 2) {
            renderer.domElement.style.border = "2px solid orange";
        }
    };

    scene = new THREE.Scene();
    scene.background = null;
    //scene.background = new THREE.Color("#000"); 

    light = new THREE.PointLight(
        lightParams.color,
        lightParams.intensity,
        lightParams.distance,
        lightParams.decay
    );

    light.position.set(-2, 5, -2);
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

    scene.add(lightObj);
    scene.add(virtualCamera);

    group = new THREE.Group();
    //group.rotation.x = -(Math.PI/2);
    scene.add(group);

    geometry = new THREE.SphereGeometry(2, 64); 
    var material = 
        new THREE.MeshStandardMaterial( { 
            color: 0xFFFFFF,
            //side: THREE.DoubleSide,
            opacity: 1,
            transparent: true
    } );
    eye = new THREE.Mesh( geometry, material );
    //group.add(eye);
    eye.position.x = 0;
    eye.position.y = 0;
    eye.position.z = 0;

    eye.rotation.z = -Math.PI*1.5;

    var texture = drawTexture0();
    //eye.loadTexture(texture);
    var map = drawOpacityMap();
    //eye.loadTexture(map, "O");
    //eye.loadTexture("img/eye-normal-map-0.png", "N");

    var meshA = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2));
    var meshB = new THREE.Mesh(geometry)

    meshA.position.y = 2.82;
    meshA.updateMatrix();

    //group.add(meshA);

    var box = CSG.fromMesh(meshA);
    var sphere = CSG.fromMesh(meshB);
    //console.log(box);

    var result = sphere.subtract(box)

    var mesh = CSG.toMesh(result, meshA.matrix, material);
    group.add(mesh);

    loadedObj = null;
    loadOBJ("img/sphere-0.obj",
    function ( object ) {
        object = object;
        loadedObj = object;

        object.scale.x = 5;
        object.scale.y = 5;
        object.scale.z = 5;

        object.rotation.x = -(Math.PI/2);

        var material = 
        new THREE.MeshStandardMaterial( { 
            color: 0x00FF00,
            side: THREE.DoubleSide,
            opacity: 1,
            transparent: true
        } );
        object.children[0].material = material;

        var texture = drawTexture0();
        object.loadTexture(texture);
        var map = drawOpacityMap();
        object.loadTexture(map, "O");

        //group.add( object );
   });

    geometry = new THREE.CircleGeometry(0.85, 32); 
    var material = 
        new THREE.MeshStandardMaterial( { 
            color: 0xFFFFFF,
            opacity: 1,
            transparent: true,
            //wireframe: true
    } );
    plane = new THREE.Mesh( geometry, material );
    group.add(plane);
    plane.position.x = 0;
    plane.position.y = 1.85;
    plane.position.z = 0;

    plane.rotation.x = -(Math.PI/2);

    var texture = drawTexture1(calibration);
    plane.loadTexture(texture);
    //eye.loadTexture("img/eye-normal-map-0.png", "N");

    virtualCamera.position.set(0, 5, 0);
    virtualCamera.lookAt(0, 0, 0);

   render = true;
   iterations = 9999999999;
   animate = function() {
        iterations -= 1;
        if (iterations > 0)
        req = requestAnimationFrame( animate );

        //if (!motionSensorAvailable)
        //group.rotation.z += 0.01;

        if (render) {
            renderer.render( scene, virtualCamera );
        }
    };
   animate();
}

THREE.Object3D.prototype.loadTexture = 
function(url, type="D") {
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

var drawTexture0 = function() {
    var canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;

    var ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "source-out";
    ctx.fillStyle = "#fff";

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#f00";

    var c = { x: 256, y: 256 };
    var p = { x: 256, y: 256-40 };

    ctx.beginPath();
    ctx.moveTo(256, 0);
    //ctx.moveTo(256, p.y);

    for (var n = 0; n <= 100; n++) {
        var a = ((Math.PI*2)/100)*n;
        var v = _rotate2d(c, p, a, false);
        ctx.lineTo(v.x, v.y);
    }

    ctx.lineTo(256, 0);
    ctx.lineTo(512, 0);
    ctx.lineTo(512, 512);
    ctx.lineTo(0, 512);
    ctx.lineTo(0, 0);
    ctx.lineTo(256, 0);
    ctx.closePath();
    ctx.fill();

    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    //drawToSquare(canvas);

    var result = document.createElement("canvas");
    result.width = 512;
    result.height = 512;

    var resultCtx = result.getContext("2d");

    resultCtx.drawImage(
        canvas, 0, (result.height/4), result.width, (result.height/2),
        0, 0, result.width, result.height
    );

    return result.toDataURL();
};

var drawOpacityMap = function() {
    var canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#f00";

    var c = { x: 256, y: 256 };
    var p = { x: 256, y: 256-40 };

    ctx.beginPath();
    ctx.moveTo(256, 0);
    //ctx.moveTo(256, p.y);

    for (var n = 0; n <= 100; n++) {
        var a = ((Math.PI*2)/100)*n;
        var v = _rotate2d(c, p, a, false);
        ctx.lineTo(v.x, v.y);
    }

    ctx.lineTo(256, 0);
    ctx.lineTo(512, 0);
    ctx.lineTo(512, 512);
    ctx.lineTo(0, 512);
    ctx.lineTo(0, 0);
    ctx.lineTo(256, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(256, 256, 40, 0, Math.PI*2);
    ctx.fill();

    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    //drawToSquare(canvas);

    var result = document.createElement("canvas");
    result.width = 512;
    result.height = 512;

    var resultCtx = result.getContext("2d");

    resultCtx.drawImage(
        canvas, 0, (result.height/4), result.width, (result.height/2),
        0, 0, result.width, result.height
    );

    return result.toDataURL();
};

var drawTexture1 = function(sensor=0.5) {
    var canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;

    var ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    //ctx.strokeRect(256-50, 256-50, 100, 100);

    var gradient = 
    ctx.createRadialGradient(256, 256, 256, 256, 256, 50);

    // Add three color stops
    gradient.addColorStop(0, "#000");
    gradient.addColorStop(1, "rgba(255, 0, 0, 0.5)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 256, 0, Math.PI*2);
    ctx.fill();

    var radius = 128*sensor;
    var c = { x: 256, y: 256 };
    var p0 = { x: 256, y: 256-256 };
    var p1 = { x: 256, y: 256-radius };

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#fff"; //"rgba(0,0,0,0.5)";
    for (var n = 0; n < 30; n++) {
        var a = ((-Math.PI*2)/30)*n;
        var v0 = _rotate2d(c, p0, a, false);
        var v1 = _rotate2d(c, p1, a, false);
        ctx.beginPath();
        ctx.moveTo(v0.x, v0.y);
        ctx.lineTo(v1.x, v1.y);
        ctx.stroke();
    }

    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, radius, 0, Math.PI*2);
    ctx.fill();

    ctx.save();
    //ctx.translate((canvas.width/2), (canvas.height/2));
    //ctx.rotate(Math.PI/2);
    //ctx.translate(-(canvas.width/2), -(canvas.height/2));
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    /*ctx.drawImage(clipLayers(true),
         canvas.width/2-(radius), 
         canvas.height/2-(radius), radius*2, radius*2);*/
    ctx.restore();

    //drawToSquare(canvas);

    return canvas.toDataURL();
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

var positionArr = [];
var sequence = 0;
var position = { x: 0, y: 0 };
var rotation = 0;
var drawTree = function(ctx, p, angle, len, w, from=0) {
    if(len < 10) {
        console.log("done");
        ctx.restore();
        return;
    }

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
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.arc(p0.x, p0.y, 2, 0, Math.PI*2);
        ctx.fill();

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