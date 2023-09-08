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

var load3D = function() {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    // default THREE.PCFShadowMap
    renderer.setSize(500, 1000);
    document.body.appendChild( renderer.domElement ); 

    renderer.enable3d = 1;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.display = "none";
    renderer.domElement.style.left = ((sw/2)-150)+"px";
    renderer.domElement.style.top = ((sh/2)-300)+"px";
    renderer.domElement.style.width = (300)+"px";
    renderer.domElement.style.height = (600)+"px";
    //renderer.domElement.style.border = "1px solid #fff";
    //renderer.domElement.style.borderRadius = "50%";
    renderer.domElement.style.scale = "0.8";
    renderer.domElement.style.border = "2px solid #ccc";
    renderer.domElement.style.zIndex = "5";

    scene = new THREE.Scene();
    //scene.background = null;
    scene.background = new THREE.Color("#000"); 

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

    var controls = new THREE.OrbitControls(virtualCamera,
    renderer.domElement);
    controls.update();

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
    center.position.y = -0.5;
    center.position.z = 4;
    center.rotation.x = -(Math.PI/2);
    center.rotation.z = -(Math.PI/2);

    loadOBJ("img/skelet.obj", function(object) {
        object.position.z = 1.5;
        object.rotation.x = -(Math.PI/2);
        object.rotation.y = -(Math.PI);

        //object.scale.set(0.5, 0.5, 0.5);

        group.add(object);
    });

    var geometry = new THREE.CylinderGeometry( 0.05, 0.05, 5 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555
    } );
    axisX = new THREE.Mesh(geometry, material ); 
    group.add( axisX );

    axisX.position.x = -1.5;
    axisX.position.y = -0.5;
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
    axisXend.position.y = -0.5;
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
    axisY.position.y = -0.5;
    axisY.position.z = 1.5;
    axisY.rotation.x = -(Math.PI/2);

    var geometry = new THREE.ConeGeometry( 0.15, 0.5, 32 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555,
    } );
    var axisYend = new THREE.Mesh(geometry, material ); 
    group.add( axisYend );

    axisYend.position.x = -4;
    axisYend.position.y = -0.5;
    axisYend.position.z = -1;
    axisYend.rotation.x = -(Math.PI/2);

    var geometry = new THREE.CylinderGeometry( 0.05, 0.05, 5 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555 
    } );
    axisZ = new THREE.Mesh(geometry, material ); 
    group.add( axisZ );

    axisZ.position.x = -4;
    axisZ.position.y = -3;
    axisZ.position.z = 4;
    //axisZ.rotation.x = -(Math.PI/2);

    var geometry = new THREE.ConeGeometry( 0.15, 0.5, 32 ); 
    var material = new THREE.MeshBasicMaterial( {
        color: 0x555555,
    } );
    var axisZend = new THREE.Mesh(geometry, material ); 
    group.add( axisZend );

    axisZend.position.x = -4;
    axisZend.position.y = -5.5;
    axisZend.position.z = 4;
    axisZend.rotation.x = -(Math.PI);

    var geometry = new THREE.PlaneGeometry( 5*1.41, 5*1.41 ); 
    var material = new THREE.MeshStandardMaterial( {
        //side: THREE.DoubleSide,
        color: 0xffffff
    } );
    plane = new THREE.Mesh(geometry, material ); 
    //group.add( plane );

    plane.position.y = -2.5;
    plane.rotation.x = -(Math.PI/2);

    var geometry = new THREE.PlaneGeometry( 5*1.41, 5*1.41 ); 
    var material = new THREE.MeshStandardMaterial( {
        //side: THREE.DoubleSide,
        color: 0xffffff
    } );
    plane1 = new THREE.Mesh(geometry, material ); 
    //group.add( plane1 );

    plane1.position.y = -2;
    plane1.rotation.x = -(Math.PI/2);

    var geometry = new THREE.PlaneGeometry( 5*1.41, 5*1.41 ); 
    var material = new THREE.MeshStandardMaterial( {
        //side: THREE.DoubleSide,
        color: 0xffffff
    } );
    plane2 = new THREE.Mesh(geometry, material ); 
    //group.add( plane2 );

    plane2.position.y = -1.5;
    plane2.rotation.x = -(Math.PI/2);

    var geometry = new THREE.PlaneGeometry( 5*1.41, 5*1.41 ); 
    var material = new THREE.MeshStandardMaterial( {
        //color: 0xffff00 
    } );
    planeMask = new THREE.Mesh(geometry, material ); 
    //group.add( planeMask );

    planeMask.position.y = -1;
    planeMask.rotation.x = -(Math.PI/2);

    virtualCamera.position.set(0, 2.5, 0);
    virtualCamera.lookAt(0, 0, 0);

    render = true;
    iterations = 9999999999;
    animate = function() {
        iterations -= 1;
        if (iterations > 0 && render)
        req = requestAnimationFrame( animate );

        //if (!motionSensorAvailable)
        //group.rotation.z += 0.01;

        //group.rotation.x -= 0.01;

        controls.update();
        renderer.render( scene, virtualCamera );
    };
    //animate();
}

var startAnimation = function() {
    render = true;
    animate();
};

var pauseAnimation = function() {
    render = false;
};

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