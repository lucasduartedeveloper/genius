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
        y: 0
    };
    renderer.enable3d = 1;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.left = ((sw/2)-50)+"px";
    renderer.domElement.style.top = ((sh/2)-225)+"px";
    renderer.domElement.style.width = (100)+"px";
    renderer.domElement.style.height = (100)+"px";
    //renderer.domElement.style.border = "1px solid #fff";
    renderer.domElement.style.zIndex = "999";
    renderer.domElement.ontouchstart = function(e) {
        eyePosition.x = e.touches[0].clientX - 50;
        eyePosition.y = e.touches[0].clientY - 50;
        renderer.domElement.style.left = (eyePosition.x-50)+"px";
        renderer.domElement.style.top = (eyePosition.y-50)+"px";
    };
    renderer.domElement.ontouchmove = function(e) {
        eyePosition.x = e.touches[0].clientX - 50;
        eyePosition.y = e.touches[0].clientY - 50;
        renderer.domElement.style.left = (eyePosition.x-50)+"px";
        renderer.domElement.style.top = (eyePosition.y-50)+"px";
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
            side: THREE.DoubleSide,
            opacity: 1,
            transparent: true
    } );
    eye = new THREE.Mesh( geometry, material );
    group.add(eye);
    eye.position.x = 0;
    eye.position.y = 0;
    eye.position.z = 0;

    eye.rotation.z = -Math.PI*1.5;

    var texture = drawTexture0();
    eye.loadTexture(texture);
    //eye.loadTexture("img/eye-normal-map-0.png", "N");

    geometry = new THREE.PlaneGeometry(12, 12); 
    var material = 
        new THREE.MeshStandardMaterial( { 
            color: 0xFFFFFF,
            opacity: 1,
            transparent: true
    } );
    plane = new THREE.Mesh( geometry, material );
    group.add(plane);
    plane.position.x = 0;
    plane.position.y = 2
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
        if (type == "D" && this.material && 
            typeof this.material.length == "undefined") {
            this.material.transparent = true;
            this.material.map = texture;
            this.material.needsUpdate = true;
        }
        else if (type == "N") {
            this.material.transparent = true;
            this.material.normalMap = texture;
            this.material.needsUpdate = true;
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

var drawTexture1 = function(sensor=0.5) {
    var canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;

    var ctx = canvas.getContext("2d");

    var gradient = 
    ctx.createRadialGradient(256, 256, 40, 256, 256, 15);

    // Add three color stops
    gradient.addColorStop(0, "#000");
    gradient.addColorStop(1, "rgba(255, 0, 0, 0.5)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 40, 0, Math.PI*2);
    ctx.fill();

    var radius = 30*sensor;
    var c = { x: 256, y: 256 };
    var p0 = { x: 256, y: 256-40 };
    var p1 = { x: 256, y: 256-radius };

    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    for (var n = 0; n < 50; n++) {
        var a = ((-Math.PI*2)/50)*n;
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
    ctx.drawImage(clipLayers(true),
         canvas.width/2-(radius), 
         canvas.height/2-(radius), radius*2, radius*2);
    ctx.restore();

    //drawToSquare(canvas);

    return canvas.toDataURL();
};

var drawToSquare = function(data) {
    var ctx = canvas.getContext("2d");
    ctx.drawImage(data, 0, 0, 300, 300);
}