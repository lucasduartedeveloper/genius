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

var playingTime = 0;

var isServer = false;
var isShared = false;
var version = "0.1";

$(document).ready(function() {
    $("html, body").css("overflow-x", "hidden");
    $("html, body").css("overscroll-behavior", "none");
    $("*").css("font-family", "Khand");

    変数 = sw/1.2;

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "remote-roll") {
            var from = parseInt(msg[3]);
            dices[0].beginRoll(from);
        }
        else if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "server-search-"+(version)) {
            if (isServer)
            ws.send("PAPER|"+playerId+"|client-accepted");
        }
        else if (msg[0] == "PAPER" &&
            msg[1] != playerId &&
            msg[2] == "client-accepted") {
            isShared = true;
        }
    };

    loadImages(function() {
        load3D();
    });
});

var sprite_idle = [
    "img/wood-box-2.png"
];

var loadImages = function(callback) {
    var count = 0;
    for (var n = 0; n < sprite_idle.length; n++) {
        var img = document.createElement("img");
        img.n = n;
        img.onload = function() {
            count += 1;
            sprite_idle[this.n] = this;
            if (count == sprite_idle.length)
            callback();
        };
        var rnd = Math.random();
        img.src = sprite_idle[n]+"?f="+rnd;
    }
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
    a = co < 0 && ca > 0 ? -(1.5707963267948966 * 2 + a) : a;

    return isNaN(a) ? 0 : a;
};

var getHeight = function(h) {
    var co = Math.sqrt(Math.pow(h, 2) - Math.pow(h/2, 2));
    return co;
};

var getWidth = function(h) {
    var co = (1/Math.sin((Math.PI*2)/3))*h;
    return co;
};

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

    renderer.enable3d = 1;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.left = ((sw/2)-(変数/2))+"px";
    renderer.domElement.style.top = ((sh/2)-(変数/2))+"px";
    renderer.domElement.style.width = (変数)+"px";
    renderer.domElement.style.height = (変数)+"px";
    renderer.domElement.style.border = "2px solid #fff";
    renderer.domElement.style.borderRadius = (変数/32)+"px";
    renderer.domElement.style.zIndex = "999";
    renderer.domElement.onpointerdown = function(e) {
        var c = { x: (sw/2), y: (sh/2) };
        var p = { x: e.clientX, y: e.clientY };
        var pc = { x: p.x-c.x, y: p.y-c.y };
        var a = (180/Math.PI)*angle2d(pc.x, pc.y);

        a = a > 0 ? (180 - a)+180 : a*-1;

        var hyp = Math.sqrt(
            Math.pow(Math.abs(pc.x), 2)+
            Math.pow(Math.abs(pc.y), 2)
        );

        var from = 0;
        if (a < 135 && a > 45) from = 0;
        else if (a < 45 || a > 315) from = 1;
        else if (a > 225 && a < 315) from = 2;
        else if (a > 135 && a < 225) from = 3;

        if (hyp < 50) return;

        if (!controls.enabled) {
            ws.send("PAPER|"+playerId+"|remote-roll|"+from);
            dices[0].beginRoll(from);
        }
    };
    renderer.domElement.ondblclick = function(e) {
        controls.enabled = !controls.enabled;
    };

    diceList = document.createElement("div");
    diceList.style.position = "absolute";
    diceList.style.background = "#fff";
    diceList.style.left = (((sw-変数)/2)+(sw/2)-(sw/2))+"px";
    diceList.style.top = ((sh/2)+(変数/2)+10)+"px";
    diceList.style.width = (変数)+"px";
    diceList.style.height = (変数/2.5)+"px";
    diceList.style.zIndex = "2";
    diceList.style.borderRadius = (変数/32)+"px";
    diceList.style.padding = "10px";
    diceList.style.overflowY = "auto";
    document.body.appendChild(diceList);

    scene = new THREE.Scene();
    //scene.background = null;
    scene.background = new THREE.Color("#000");

    light = new THREE.PointLight(
        lightParams.color,
        lightParams.intensity,
        lightParams.distance,
        lightParams.decay
    );

    light.position.set(5, 2.5, 5);
    light.castShadow = true;

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default

    lightObj = new THREE.Group();
    lightObj.add(light);

    geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1); 
    var material = 
        new THREE.MeshStandardMaterial( { 
            color: 0xFFFFFF,
            opacity: 1,
            transparent: true,
            wireframe: false
    } );
    lightSource = new THREE.Mesh( geometry, material );
    lightObj.add( lightSource );

    camera = new THREE.PerspectiveCamera( 
        cameraParams.fov, 
        cameraParams.aspectRatio, 
        cameraParams.near, 
        cameraParams.far 
    );

    camera.add( lightObj );
    scene.add(camera);

    camera.position.set(0, 5, 0);
    camera.lookAt(0, 0, 0);

    brainObj = new THREE.Group();
    //scene.add( brainObj );
    brainObj.position.x = 0;
    brainObj.position.y = -2.45;
    brainObj.position.z = 0;

    geometry = new THREE.BoxGeometry(1, 1, 1); 
    var material = 
        new THREE.MeshStandardMaterial( { 
            color: 0xFCA903,
            opacity: 0.8,
            transparent: true,
            wireframe: true
    } );
    collisionBox = new THREE.Mesh( geometry, material );
    //sphere.scale.set(7.5, 0.1, 7.5);
    collisionBox.scale.set(1.1, 1.1, 1.1);
    brainObj.add( collisionBox );
    collisionBox.position.x = 0;
    collisionBox.position.y = 0;
    collisionBox.position.z = 0;

    collisionBox.visible = false;

    //geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5); 
    geometry = new THREE.SphereGeometry(0.2, 32); 
    var material = 
        new THREE.MeshStandardMaterial( { 
            color: 0x99FF99,
            opacity: 0.8,
            transparent: true
    } );
    sphere = new THREE.Mesh( geometry, material );
    //sphere.scale.set(7.5, 0.1, 7.5);
    brainObj.add( sphere );
    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = 0;

    geometry = new THREE.SphereGeometry(0.1, 32); 
    var material = 
        new THREE.MeshStandardMaterial( { 
            color: 0xFFFFFF,
            opacity: 0.8,
            transparent: true
    } );
    eye = new THREE.Mesh( geometry, material );
    //sphere.scale.set(7.5, 0.1, 7.5);
    scene.add(eye);
    eye.position.x = 0;
    eye.position.y = -5;
    eye.position.z = 0;

    locationArr = [];
    geometry = new THREE.SphereGeometry(0.1, 32); 
    var material = 
        new THREE.MeshStandardMaterial( { 
            color: 0xFCA903,
            opacity: 0.8,
            transparent: true
    } );
    sphere0 = new THREE.Mesh( geometry, material );
    sphere0.value = 5;
    locationArr.push(sphere0);
    //sphere.scale.set(7.5, 0.1, 7.5);
    brainObj.add( sphere0 );
    sphere0.position.x = 0;
    sphere0.position.y = 2;
    sphere0.position.z = 0;
    sphere0.visible = false;

    sphere1 = new THREE.Mesh( geometry, material );
    sphere1.value = 1;
    locationArr.push(sphere1);
    //sphere.scale.set(7.5, 0.1, 7.5);
    brainObj.add( sphere1 );
    sphere1.position.x = -2;
    sphere1.position.y = 0;
    sphere1.position.z = 0;
    sphere1.visible = false;

    sphere2 = new THREE.Mesh( geometry, material );
    sphere2.value = 6;
    locationArr.push(sphere2);
    //sphere.scale.set(7.5, 0.1, 7.5);
    brainObj.add( sphere2 );
    sphere2.position.x = 2;
    sphere2.position.y = 0;
    sphere2.position.z = 0;
    sphere2.visible = false;

    sphere3 = new THREE.Mesh( geometry, material );
    sphere3.value = 2;
    locationArr.push(sphere3);
    //sphere.scale.set(7.5, 0.1, 7.5);
    brainObj.add( sphere3 );
    sphere3.position.x = 0;
    sphere3.position.y = -2;
    sphere3.position.z = 0;
    sphere3.visible = false;

    sphere4 = new THREE.Mesh( geometry, material );
    sphere4.value = 4;
    locationArr.push(sphere4);
    //sphere.scale.set(7.5, 0.1, 7.5);
    brainObj.add( sphere4 );
    sphere4.position.x = 0;
    sphere4.position.y = 0;
    sphere4.position.z = -2;
    sphere4.visible = false;

    sphere5 = new THREE.Mesh( geometry, material );
    sphere5.value = 3;
    locationArr.push(sphere5);
    //sphere.scale.set(7.5, 0.1, 7.5);
    brainObj.add( sphere5 );
    sphere5.position.x = 0;
    sphere5.position.y = 0;
    sphere5.position.z = 2;
    sphere5.visible = false;

    faceArr = [];
    geometry = new THREE.PlaneGeometry(1.1, 1.1, 8, 8); 
    var material = 
        new THREE.MeshStandardMaterial( { 
            //side: THREE.DoubleSide,
            //color: 0xFFFF55,
            opacity: 1,
            transparent: true,
            wireframe: false
    } );
    face0 = new THREE.Mesh( geometry, material.clone() );
    face0.value = 5;
    faceArr.push(face0);
    face0.receiveShadow = true;
    face0.castShadow = true;
    face0.position.x = 0;
    face0.position.y = 0.55;
    face0.position.z = 0;
    face0.visible = false;

    face0.rotation.x = -Math.PI/2;
    face0.loadTexture(drawFace(5, diceType, 0));
    face0.loadTextureNormal("img/wood-box-2_n.png");

    face1 = new THREE.Mesh( geometry, material.clone() );
    face1.value = 1;
    faceArr.push(face1);
    face1.receiveShadow = true;
    face1.castShadow = true;
    face1.position.x = -0.55;
    face1.position.y = 0;
    face1.position.z = 0;
    face1.visible = false;

    face1.rotation.y = -Math.PI/2;
    face1.loadTexture(drawFace(1, diceType, 0));
    face1.loadTextureNormal("img/wood-box-2_n.png");

    face2 = new THREE.Mesh( geometry, material.clone() );
    face2.value = 6;
    faceArr.push(face2);
    face2.receiveShadow = true;
    face2.castShadow = true;
    face2.position.x = 0.55;
    face2.position.y = 0;
    face2.position.z = 0;
    face2.visible = false;

    face2.rotation.y = Math.PI/2;
    face2.rotateZ(Math.PI/2);
    face2.loadTexture(drawFace(6, diceType, 0));
    face2.loadTextureNormal("img/wood-box-2_n.png");

    face3 = new THREE.Mesh( geometry, material.clone() );
    face3.value = 2;
    faceArr.push(face3);
    face3.receiveShadow = true;
    face3.castShadow = true;
    face3.position.x = 0;
    face3.position.y = -0.55
    face3.position.z = 0;
    face3.visible = false;

    face3.rotation.x = Math.PI/2;
    //face3.rotateZ(-(Math.PI/2));
    face3.loadTexture(drawFace(2, diceType, 0));
    face3.loadTextureNormal("img/wood-box-2_n.png");

    face4 = new THREE.Mesh( geometry, material.clone() );
    face4.value = 4;
    faceArr.push(face4);
    face4.receiveShadow = true;
    face4.castShadow = true;
    face4.position.x = 0;
    face4.position.y = 0;
    face4.position.z = -0.55;
    face4.visible = false;

    face4.rotation.x = -Math.PI;
    face4.rotateZ(Math.PI/2);
    face4.loadTexture(drawFace(4, diceType, 0));
    face4.loadTextureNormal("img/wood-box-2_n.png");

    face5 = new THREE.Mesh( geometry, material.clone() );
    face5.value = 3;
    faceArr.push(face5);
    face5.receiveShadow = true;
    face5.castShadow = true;
    face5.position.x = 0;
    face5.position.y = 0;
    face5.position.z = 0.55;
    face5.visible = false;

    face5.rotation.z = -Math.PI/2;
    face5.loadTexture(drawFace(3, diceType, 0));
    face5.loadTextureNormal("img/wood-box-2_n.png");

    for (var n = 0; n < 6; n++) {
        faceArr[n].visible = true;
    }

    geometry = new THREE.PlaneGeometry(1.1, 1.1, 8, 8); 
    var material = 
        new THREE.MeshStandardMaterial( { 
            //side: THREE.DoubleSide,
            color: 0xFF9955,
            opacity: 1,
            transparent: true,
            wireframe: false
    } );
    rotationTarget = new THREE.Mesh( geometry, material.clone() );
    scene.add(rotationTarget);
    rotationTarget.value = 5;
    rotationTarget.receiveShadow = true;
    rotationTarget.position.x = 4*1.1;
    rotationTarget.position.y = -2.9;
    rotationTarget.position.z = -4*1.1;

    rotationTarget.rotation.x = -(Math.PI/2);
    rotationTarget.loadTexture(drawFace("A", "text"));

    geometry = new THREE.PlaneGeometry(1.1*7, 1.1*7, 5, 5); 
    var material = 
        new THREE.MeshStandardMaterial( { 
            side: THREE.DoubleSide,
            color: 0x99FF99,
            opacity: 0.8,
            transparent: true,
            wireframe: false
    } );
    plane = new THREE.Mesh( geometry, material );
    //plane.scale.set(10, 10, 1);
    scene.add( plane );
    plane.receiveShadow = true;
    plane.position.x = 0;
    plane.position.y = -3;
    plane.position.z = 0;

    plane.rotation.x = Math.PI/2;
    plane.loadTexture("img/grass-texture-1.png");

    geometry = new THREE.BoxGeometry(0.275, 7*1.1, 1.1); 
    var material = 
        new THREE.MeshStandardMaterial( { 
            //color: 0x555599,
            //opacity: 0.8,
            transparent: true,
            wireframe: false
    } );
    leftRamp = new THREE.Mesh( geometry, material );
    scene.add( leftRamp );
    leftRamp.position.x = -3*1.1;
    leftRamp.position.y = -3.5+(0.5*1.1);
    leftRamp.position.z = 0;
    leftRamp.rotation.x = -(Math.PI/2);
    leftRamp.rotation.y = -(Math.PI/2);

    leftRamp.loadTextureEx("img/stone-tile-0.png", 0, 7);

    topRamp = new THREE.Mesh( geometry, material );
    scene.add( topRamp );
    topRamp.position.x = 0;
    topRamp.position.y = -3.5+(0.5*1.1);
    topRamp.position.z = -3*1.1;
    topRamp.rotation.z = -(Math.PI/2);

    rightRamp = new THREE.Mesh( geometry, material );
    scene.add( rightRamp );
    rightRamp.position.x = 3*1.1;
    rightRamp.position.y = -3.5+(0.5*1.1);
    rightRamp.position.z = 0;
    rightRamp.rotation.x = -(Math.PI/2);
    rightRamp.rotation.y = -(Math.PI/2);

    bottomRamp = new THREE.Mesh( geometry, material );
    scene.add( bottomRamp );
    bottomRamp.position.x = 0;
    bottomRamp.position.y = -3.5+(0.5*1.1);
    bottomRamp.position.z = 3*1.1;
    bottomRamp.rotation.z = -(Math.PI/2);

    // wireframe
    var geo = new THREE.EdgesGeometry( plane.geometry ); 
    // or WireframeGeometry
    var mat = new THREE.LineBasicMaterial( { color: 0xFFFFFF } );
    var wireframe = new THREE.LineSegments( geo, mat );
    plane.add( wireframe );

    const defaultEffect = 0; // Single view left
    //const defaultEffect = 21; // Anaglyph RC half-colors

    stereofx = new StereoscopicEffects(renderer, defaultEffect);
    stereofx.setSize(変数, 変数);

    modes = StereoscopicEffects.effectsListForm();
    modes.value = defaultEffect;
    modes.style.position = 'absolute';
    modes.style.textAlign = "center";
    modes.style.background = "#fff";
    modes.style.left = (((sw-変数)/2)+(sw/2)-(sw/2))+"px";
    modes.style.top = ((sw/9))+"px";
    modes.style.width = (変数)+"px";
    modes.style.height = (sw/9)+"px";
    modes.addEventListener('change', () => {
        stereofx.setEffect(modes.value);
    });
    document.body.appendChild(modes);

    serverButton = document.createElement("button");
    serverButton.innerText = "Create Server";
    serverButton.style.position = 'absolute';
    serverButton.style.background = "#fff";
    serverButton.style.left = (((sw-変数)/2)+(sw/2)-(sw/2))+"px";
    serverButton.style.top = (0)+"px";
    serverButton.style.width = (変数)+"px";
    serverButton.style.height = (sw/9)+"px";
    serverButton.onclick = function() {
        isServer = true;
        serverButton.innerText = "Connected: 0";
    };
    document.body.appendChild(serverButton);

    eyeSep = document.createElement("input");
    eyeSep.type = "range";
    eyeSep.min = -0.05;
    eyeSep.step = 0.05;
    eyeSep.max = 1;
    eyeSep.value = 0;
    eyeSep.style.position = 'absolute';
    eyeSep.style.background = "#fff";
    eyeSep.style.left = (((sw-変数)/2)+(sw/2)-(sw/2))+"px";
    eyeSep.style.top = ((sw/9)*3)+"px";
    eyeSep.style.width = (変数)+"px";
    eyeSep.style.height = (sw/9)+"px"
    eyeSep.addEventListener('change', () => {
        stereofx.setEyeSeparation(eyeSep.value);
    });
    stereofx.setEyeSeparation(eyeSep.value);
    document.body.appendChild(eyeSep);

    pauseButton = document.createElement("button");
    pauseButton.innerText = "Pause Physics";
    pauseButton.style.position = 'absolute';
    pauseButton.style.background = "#fff";
    pauseButton.style.left = (((sw-変数)/2)+(sw/2)-(sw/2))+"px";
    pauseButton.style.top = ((sw/9)*2)+"px";
    pauseButton.style.width = (変数)+"px";
    pauseButton.style.height = (sw/9)+"px";
    pauseButton.onclick = function() {
        pausePhysics = !pausePhysics;
        if (pausePhysics) {
            clock.stop();
            pauseButton.innerText = "Play Physics";
        }
        else {
            clock.start();
            pauseButton.innerText = "Pause Physics";
        }
    };
    document.body.appendChild(pauseButton);

    // instantiate a loader
    loadOBJ("img/dice_color.obj",
    function ( object ) {
        brainObj.add( object );
        object.castShadow = true;

        var material = 
        new THREE.MeshStandardMaterial( { 
            color: 0xFFFFFF,
            opacity: 1,
            //metalness: 1,
            transparent: true
        } );
        object.children[0].material = material;
        object.children[0].castShadow = true;

        var material = 
        new THREE.MeshStandardMaterial( { 
            color: 0x000000,
            opacity: 1,
            transparent: true
        } );
        object.castShadow = true;
        for (var n = 1; n < object.children.length; n++) {
            object.children[n].material = material;
            object.children[n].castShadow = true;
        }

        object.position.x = 0;
        object.position.y = 0;
        object.position.z = 0;

        object.scale.x = 0.5;
        object.scale.y = 0.5;
        object.scale.z = 0.5;

        //object.rotation.x = Math.PI/2;
        //object.rotation.y = Math.PI;
        //object.rotation.z = Math.PI;

        Ammo().then(setup);
   });

   controls = new THREE.OrbitControls( camera, renderer.domElement );
   controls.enabled = false;

   render = true;
   iterations = 9999999999;
   animate = function() {
        iterations -= 1;
        if (iterations > 0)
        req = requestAnimationFrame( animate );
        if (render) {
            if (cameraFollowing) {
                if (cameraObj.hasCamera == 1) {
                    camera.position.x = cameraObj.position.x;
                    camera.position.y = cameraObj.position.y;
                    camera.position.z = cameraObj.position.z;
                    camera.rotation.x = cameraObj.rotation.x;
                    camera.rotation.y = cameraObj.rotation.y;
                    camera.rotation.z = cameraObj.rotation.z;
                }
                else if (cameraObj.hasCamera == 2) {
                    camera.position.x = cameraObj.position.x;
                    camera.position.y = cameraObj.position.y + 3.5;
                    camera.position.z = cameraObj.position.z;
                    camera.lookAt(cameraObj.position.x, 0, cameraObj.position.z);
                }
            }
            else {
                var c = { x: 0, y: 0 };
                var px = { x: eye.position.x, y: 5 };
                var pz = { x: eye.position.z, y: 5 };
                var rx = angle2d(px.x, px.y);
                var rz = angle2d(pz.x, pz.y);
                //camera.lookAt(0, 0, 0);
                camera.rotation.set(-(Math.PI/2), 0, 0);
                camera.rotateY(rx-(Math.PI));
                camera.rotateX(rz-(Math.PI));
            }

            controls.update();
            if (renderer.enable3d == 0) {
                renderer.render( scene, camera );
            }
            else if (renderer.enable3d == 1) {
                if (eyeSep.value < 0) renderer.render( scene, camera );
                else stereofx.render( scene, camera );
            }
        }
    };
   animate();
   //Ammo().then(setup);
}

var dices = [];
var diceNo = -1; //0;
var createDice = function(pos = { x: 0, y: -2.5, z: 0 }) {
    if (dices.length > 9) return;
    diceNo += 1;

    var obj = new THREE.Group();
    obj.castShadow = true;
    obj.userData.no = diceNo;
    obj.position.set(pos.x, pos.y, pos.z);
    obj.add(sphere.clone());
    for (var n = 1; n < 7; n++) {
        obj.add(locationArr[n-1].clone());
        obj.children[n].value = 
        locationArr[n-1].value;
    }
    obj.add(collisionBox.clone());
    obj.add(brainObj.children[8].clone());

    if (dices.length > 2) {
        var rnd = (Math.random()*1)+0.5; //3;

        obj.children[7].scale.x = rnd;
        obj.children[7].scale.y = rnd;
        obj.children[7].scale.z = rnd;

        obj.children[8].scale.x = rnd * obj.children[8].scale.x;
        obj.children[8].scale.y = rnd * obj.children[8].scale.y;
        obj.children[8].scale.z = rnd * obj.children[8].scale.z;
    }

    var gridX = 
    Math.round((pos.x+(2*1.1))/1.1);
    var gridY = 
    Math.round((pos.z+(2*1.1))/1.1);

    var dice = {
        no: diceNo,
        trail: [],
        faceArr: [],
        collided: false,
        material: 0,
        hasCamera: false,
        paintLock: false,
        object: obj,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        grid: { x: gridX, y: gridY },
        movedTime: 0,
        restingTime: 0,
        jumped: false,
        update: function() {
            // compare position and rotation 
            // update time
            // save position and rotation
            if (isEqual(this.position, this.object.position).result  && 
                isEqual(this.rotation, this.object.rotation).result) {
                this.restingTime = new Date().getTime() - this.movedTime;
                this.jumped = false;
                this.paint(0xFFFFFF);
            }
            else {
                this.restingTime = 0;
                this.movedTime = new Date().getTime();
                this.paint(0x99FF99);
            }
            this.position = toFixed(this.object.position, 2);
            this.rotation = toFixed(this.object.rotation, 2);
        },
        jump: function() {
            if (this.jumped) return;
            jump(this.object);
            this.jumped = true;
        },
        spin: function() {
            if (this.jumped) return;
            spin(this.object);
            this.jumped = true;
        },
        push: function(from) {
            push(this.object, from);
        },
        setValue: function(value) {
            setDiceValue(this, value);
        },
        getValue: function() {
            return getDiceValue(this.object);
        },
        remove: function() {
            scene.remove(this.object);
            physicsWorld.removeRigidBody(this.physicsBody);

            dices = dices.filter((o) => o.no != this.no);
            rigidBodies = rigidBodies.filter((o) => o.userData.no != this.no);
            this.clearTrail();
        },
        paint: function(color, lock=false) {
            if (lock) this.paintLock = !this.paintLock ;
            else if (this.paintLock) return;
            var material = 
                new THREE.MeshStandardMaterial( { 
                    color: color
                } );
            this.object.children[8].children[0].material = material;
        }
    };
    obj.dice = dice;
    scene.add(dice.object);
    dice.collisionBox = obj.children[7];

    for (var n = 1; n < 7; n++) {
        var face = faceArr[n-1].clone();
        face.value = faceArr[n-1].value;
        dice.faceArr.push(face);
        obj.add(face);
    }

    dice.rollFrame = 0;
    dice.isRolling = false;
    dice.rollPoint = new THREE.Group();
    dice.rollingFrom = 0;

    dice.beginRoll = function(from) {
        if (from == 0 && dice.grid.x == 4) return;
        if (from == 1 && dice.grid.y == 4) return;
        if (from == 2 && dice.grid.x == 0) return;
        if (from == 3 && dice.grid.y == 0) return;
        if (dice.isRolling) return;
        this.rollPoint.rotation.set(0, 0, 0);
        beginRoll(this, from);
    };

    dice.clearTrail = function() {
        for (var n = 0; n < this.trail.length; n++) {
            scene.remove(dice.trail[n]);
        }
    };

    addCube(dice.object);
    dice.physicsBody = obj.userData.physicsBody;

    dices.push(dice);
    return dice;
};

var getCollisionBoxes = function() {
    var arr = [];
    for (var n = 0; n < dices.length; n++) {
        arr.push(dices[n].collisionBox);
        arr[n].dice = dices[n];
    }
    return arr;
};

var toFixed = function(vector, n) {
    //console.log("fixed "+n);
    vector = { ...vector };
    if (vector.isEuler) 
    vector = new THREE.Vector3().setFromEuler(vector);

    vector.x = parseFloat(vector.x.toFixed(n));
    vector.y = parseFloat(vector.y.toFixed(n));
    vector.z = parseFloat(vector.z.toFixed(n));

    //console.log(vector);
    return vector;
};

var isEqual = function(vector0, vector1, tollerance=0.25) {
    vector1 = toFixed(vector1, 2);
    //console.log("saved", vector0, "new", vector1);
    var diff = {
        x: vector1.x - vector0.x,
        y: vector1.y - vector0.y,
        z: vector1.z - vector0.z
    };
    diff.result = 
        diff.x < tollerance && 
        diff.y < tollerance && 
        diff.z < tollerance;
    return diff;
};

var valueRotation = [
   { x: 0, y: -270*(Math.PI/180), z: -90*(Math.PI/180) },
   { x: 0, y: -180*(Math.PI/180), z: -180*(Math.PI/180) },
   { x: -90*(Math.PI/180), y: 0, z: -270*(Math.PI/180) },
   { x: 90*(Math.PI/180), y: 0, z: 90*(Math.PI/180) },
   { x: 0, y: 0, z: 0 },
   { x: 0, y: -180*(Math.PI/180), z: 90*(Math.PI/180) }
];

var setDiceValue = function(dice, value) {
    //if (dice.grid.x != 2 || dice.grid.y != 2) return;
    var dot = locationArr.filter((o) => { return o.value == value; })[0];
    var rx = valueRotation[value-1].x;
    var ry = valueRotation[value-1].y;
    var rz = valueRotation[value-1].z;

    dice.object.rotation.set(rx, ry, rz);
    dice.object.userData.physicsBody.pausePhysics = false;
    updateBody(dice.object);
};

var beginRoll = function(dice, from) {
    var offsetX = 0;
    var offsetY = 0.55;
    var offsetZ = 0;

    if (from == 0) { offsetX = -0.55; offsetZ = 0; }
    else if (from == 1) { offsetX = 0; offsetZ = -0.55; }
    else if (from == 2) { offsetX = 0.55; offsetZ = 0; }
    else if (from == 3) { offsetX = 0; offsetZ = 0.55; }

    var point = dice.rollPoint;
    point.position.x = dice.object.position.x - offsetX;
    point.position.y = dice.object.position.y - offsetY;
    point.position.z = dice.object.position.z - offsetZ;

    scene.add(point);

    dice.object.userData.pausePhysics = true;
    point.add(dice.object);

    dice.object.position.x = offsetX;
    dice.object.position.y = offsetY;
    dice.object.position.z = offsetZ;

    dice.rollingFrom = from;
    dice.isRolling = true;
};

var updateRoll = function(dice) {
    var a = ((Math.PI/2)/15);

    if (dice.rollingFrom == 0) dice.rollPoint.rotateZ(-a);
    else if (dice.rollingFrom == 1) dice.rollPoint.rotateX(a);
    else if (dice.rollingFrom == 2) dice.rollPoint.rotateZ(a);
    else if (dice.rollingFrom == 3) dice.rollPoint.rotateX(-a);

    updateBody(dice.object);

    dice.rollFrame += 1;
    if (dice.rollFrame == 15) endRoll(dice);
};

var endRoll = function(dice) {
    var worldPosition = new THREE.Vector3();
    dice.object.getWorldPosition(worldPosition);

    var worldQuaternion = new THREE.Quaternion();
    dice.object.getWorldQuaternion(worldQuaternion);

    var worldRotation = new THREE.Euler();
    worldRotation.setFromQuaternion(
    worldQuaternion, "XYZ");

    scene.add(dice.object);
    dice.object.position.set(
        worldPosition.x,
        worldPosition.y,
        worldPosition.z
    );
    dice.object.rotation.set(
        worldRotation.x,
        worldRotation.y,
        worldRotation.z
    );
    scene.remove(dice.rollPoint);

    var gridX = 
    Math.round((dice.object.position.x+(2*1.1))/1.1);
    var gridY = 
    Math.round((dice.object.position.z+(2*1.1))/1.1);

    dice.grid.x = gridX;
    dice.grid.y = gridY;

    dice.object.position.x = (gridX*1.1)-(2*1.1);
    dice.object.position.z = (gridY*1.1)-(2*1.1);

    updateBody(dice.object);
    dice.object.userData.pausePhysics = false;
    dice.rollFrame = 0;
    dice.isRolling = false;

    console.log(dice.object.rotation);
    var rotX = Math.round(dice.object.rotation.x/(Math.PI/2));
    var rotY = Math.round(dice.object.rotation.y/(Math.PI/2));
    var rotZ = Math.round(dice.object.rotation.z/(Math.PI/2));
    console.log(rotX, rotY, rotZ);

    dice.object.rotation.x = rotX * (Math.PI/2);
    dice.object.rotation.y = rotY * (Math.PI/2);
    dice.object.rotation.z = rotZ * (Math.PI/2);

    var topCover = getTopCover(dice);
    var worldPosition = new THREE.Vector3();
    topCover.getWorldPosition(worldPosition);
    var worldQuaternion = new THREE.Quaternion();
    topCover.getWorldQuaternion(worldQuaternion);
    var worldRotation = new THREE.Euler();
    worldRotation.setFromQuaternion(worldQuaternion, "XYZ");

    for (var n = 0; n < checkpoints.length; n++) {
        var checkpoint = checkpoints[n];
        var value = getDiceValue(dice.object);
        if (dice.grid.x == checkpoint.position.x &&
             dice.grid.y == checkpoint.position.y) {
             //console.log(checkpoint.object.rotation);
             //console.log(worldRotation);

             rotationTarget.rotation.set(
                 worldRotation.x,
                 worldRotation.y,
                 worldRotation.z
             );

             if (value == checkpoint.number &&
                 validateRotation(checkpoint.object.rotation, 
                 worldRotation)) {
                 var color = new THREE.Color( 0xFFFF55 );
                 checkpoint.object.material.color = color;
                 checkpoint.done = true;
             }
             else {
                 for (var k = 0; k < checkpoints.length; k++) {
                     var checkpoint = checkpoints[k];
                     var color = new THREE.Color( 0x55FFFF );
                     checkpoint.object.material.color = color;
                     checkpoint.done = false;
                 }
                 break;
             }
        }
    }

    var number = getDiceValue(dice.object, true);
    //dropCover(dice, number);

    if (dice.object.position.x == 0 &&
         dice.object.position.z == 0) {
        _say(getDiceValue(dice.object));
    }
};

var validateRotation = function(euler0, euler1) {
    var result = false;
    console.log(" --- validate rotation --- ");
    console.log(euler0.x.toFixed(5), euler1.x.toFixed(5));
    console.log(euler0.y.toFixed(5), euler1.y.toFixed(5));
    console.log(euler0.z.toFixed(5), euler1.z.toFixed(5));

    var euler0x = parseFloat(euler0.x.toFixed(3));
    var euler0y = parseFloat(euler0.y.toFixed(3));
    var euler0z = parseFloat(euler0.z.toFixed(3));

    var euler1x = parseFloat(euler1.x.toFixed(3));
    var euler1y = parseFloat(euler1.y.toFixed(3));
    var euler1z = parseFloat(euler1.z.toFixed(3));

    result = euler0x == euler1x;
    result = result && euler0y == euler1y;
    result = result && euler0z == euler1z;
    return result;
};

var dropCover = function(dice, number) {
    face = 
    dice.faceArr.filter((o) => { return o.value == number; })[0];
    var clone = face.clone();
    var worldPosition = new THREE.Vector3();
    face.getWorldPosition(worldPosition);
    var worldQuaternion = new THREE.Quaternion();
    face.getWorldQuaternion(worldQuaternion);
    var worldRotation = new THREE.Euler();
    worldRotation.setFromQuaternion(worldQuaternion, "XYZ");
    clone.position.set(
        worldPosition.x,
        worldPosition.y+0.1,
        worldPosition.z
    );
    clone.rotation.set(
        worldRotation.x,
        worldRotation.y,
        worldRotation.z
    );
    clone.visible = true;
    dice.trail.push(clone);
    scene.add(clone);
};

var getTopCover = function(dice) {
    var pos = new THREE.Vector3();
    var tn = 0;
    dice.faceArr[tn].getWorldPosition(pos);
    var lastY = pos.y;

    for (var n = 1; n < 6; n++) {
        dice.faceArr[n].getWorldPosition(pos);
        if (pos.y > lastY) {
            tn = n;
            lastY = pos.y;
        }
    }
    return dice.faceArr[tn];
};

var checkpoints = [];
var createCheckpoint = function(x, y, number) {
    var checkpoint = {
        number: number,
        position: { x: x, y: y },
        done: false
    };

    geometry = new THREE.PlaneGeometry(1, 1, 8, 8); 
    var material = 
        new THREE.MeshStandardMaterial( { 
            //side: THREE.DoubleSide,
            color: 0x55FFFF,
            opacity: 0.8,
            transparent: true,
            wireframe: false
    } );
    var obj = new THREE.Mesh( geometry, material.clone() );
    obj.value = 5;
    obj.receiveShadow = true;
    obj.position.x = (x*1.1)-(2*1.1);
    obj.position.y = -2.9;
    obj.position.z = (y*1.1)-(2*1.1);

    obj.rotation.x = -(Math.PI/2);
    obj.loadTexture(drawFace(number));

    scene.add(obj);
    checkpoint.object = obj;
    checkpoints.push(checkpoint);
}

var language = "en-US";
var _say = function(text) {
     var msg = new SpeechSynthesisUtterance();
     msg.lang = language;
     msg.text = text;
     window.speechSynthesis.speak(msg);
};

var dicesToTable = function() {
    var html = "<table>";

    for (var n = 0; n < dices.length; n++) {
        var type = dices[n].physicsBody.getCollisionFlags();
        var typeName = type == 0 ? "dynamic" : "kinematic";
        type = type == 0 ? 2 : 0;

        var nextValue = dices[n].getValue()+1;
        nextValue = nextValue > 6 ? 1 : nextValue;

        html += "<tr" + (dices[n].collided ?
        " style=\"background:rgba(204,85,0,0.3);\">" : ">") +
        "<td onclick=\"dices["+n+"].remove();\">dice no: "+dices[n].no+
        "</td>" +
        //"<td>body no: "+rigidBodies[n].userData.physicsBody.no
        "<td onclick=\"putCamera(dices["+n+"])\">"+
        (dices[n].hasCamera > 0 ? "camera #" + dices[n].hasCamera : "")+
        "</td>" +
        "<td onclick=\"dices["+n+"].setValue("+nextValue+");\">value: "+
        dices[n].getValue()+"</td>" +
        "<td "+
        "onclick=\"dices["+n+"].physicsBody.setCollisionFlags("+type+");\">"+typeName+
        "</td>" +
        "</tr>";
    }
    html += "<tr>" +
    "<td colspan=\"4\" " + 
    "style=\"text-align:center;\" onclick=\"createDice();\">New Dice"+
    "</td>" + "</tr>";
    html += "<tr>" +
    "<td colspan=\"4\" " + 
    "style=\"text-align:center;\" onclick=\"startBot();\">"+
    (bot.isSolving ? "Stop Bot" : "Start Bot")+
    "</td>" + "</tr>";

    diceList.innerHTML = html + "</table>";

    $("table").css({
        "width": "100%",
        "font-size": "15px"
    });
    $("tr").css({ 
        "width": "100%",
        "border": "1px solid gray"
    });
    $("td").css({ 
        "width": "25%",
        "borderRight": "1px solid gray",
        "padding": "0px 2px"
    });
};

var cameraObj = false;
var cameraPosition = false;
var cameraRotation = false;
var cameraFollowing = false;
var putCamera = function(obj) {
    var no = obj.hasCamera + 1;
    no = no > 2 ? 0 : no;
    for (var n = 0; n < dices[n].length; n++) {
        dices[n].hasCamera = 0;
    }
    cameraFollowing = no > 0;
    obj.hasCamera = no;
    if (!cameraFollowing) {
        camera.position.set(
           cameraPosition.x,
           cameraPosition.y,
           cameraPosition.z
        );
        camera.lookAt(0, 0, 0);
    }
    else {
        cameraPosition = { 
           x: 0, //camera.position.x,
           y: 5, //3.5, //camera.position.y,
           z: 0, //camera.position.z
       };
       cameraRotation = { 
           x: camera.rotation.x,
           y: camera.rotation.y,
           z: camera.rotation.z
       };
       cameraObj = obj;
    }
};

var audioBot = true;
var pausePhysics = false;
var run = function() {
    clock = new THREE.Clock();
    clock.sum = 0;
    startAmmojs();

    lastText = "";
    physicsIterations = 0;

    ammoInterval = setInterval(function() {
        if (!pausePhysics) updateAmmojs();
        detectCollision();

        gamepad = navigator.getGamepads()[0];

        for (var n = 0; n < dices.length; n++) {
            if (dices[n].isRolling)
            updateRoll(dices[n]);

            if (gamepad) {
                var from = -1;
                var axes = gamepad.axes;
                if (Math.abs(axes[2]) > 0.5 || 
                    Math.abs(axes[3]) > 0.5) {
                    //language = "pt-BR";
                    axes[0] = axes[2];
                    axes[1] = axes[3];
                }
                else {
                    language = "en-US";
                }

                var buttons = gamepad.buttons;
                for (var k = 0; k < buttons.length; k++) {
                    var index = gamepadButtons.indexOf(k);
                    if (k == 3 && buttons[k].pressed && index == -1) {
                         traceBack();
                         buttons = buttons.splice(index, 1);
                    }
                    if (buttons[k].pressed && index == -1)
                    gamepadButtons.push(k);
                }

                if (axes[0] > 0.5) from = 0;
                else if (axes[1] > 0.5) from = 1;
                else if (axes[0] < -0.5) from = 2;
                else if (axes[1] < -0.5) from = 3;

                if (from > -1) {
                    ws.send("PAPER|"+playerId+"|remote-roll|"+from);
                    dices[n].beginRoll(from);
                }
            }
        }

        dicesToTable();
    }, 1000/30);

    createDice();
    createCheckpoint(0, 0, 1);
    createCheckpoint(0, 2, 2);
    createCheckpoint(0, 4, 3);
    createCheckpoint(4, 0, 4);
    createCheckpoint(4, 2, 5);
    createCheckpoint(4, 4, 6);

    ammoInterval_test = setInterval(function() {
        //jump();
    }, 5000);
};

var gamepadButtons = [];

var getDiceValue = function(obj, under=false) {
    var brainObj = obj;
    var rotation = brainObj.rotation;

    var pos = new THREE.Vector3();
    var tn = 1;
    //locationArr[0].getWorldPosition(pos);
    brainObj.children[1].getWorldPosition(pos);
    var lastY = pos.y;

    for (var n = 1; n < 7; n++) {
        //locationArr[n].getWorldPosition(pos);
        brainObj.children[n].getWorldPosition(pos);
        if (under && pos.y < lastY) {
            tn = n;
            lastY = pos.y;
        }
        else if (!under && pos.y > lastY) {
            tn = n;
            lastY = pos.y;
        }
    }
    //return locationArr[tn].value;
    return brainObj.children[tn].value;
};

var toggleLocation = function() {
    for (var n = 0; n < 6; n++) {
        locationArr[n].visible = !locationArr[n].visible;
    }
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

var routes = [
    { from: 1, to: 2, moves: [ 1, 2, 3, 0 ] },
    { from: 1, to: 3, moves: [ 3, 0, 1, 2, 3, 0, 1, 2 ] },
    { from: 1, to: 5, moves: [ 3, 0, 1, 2 ] },
    { from: 2, to: 3, moves: [ 3, 0, 1, 2 ] },
    { from: 2, to: 5, moves: [ 3, 0, 1, 2, 2, 3, 0, 1 ] },
    { from: 3, to: 5, moves: [ 2, 3, 0, 1 ] },
    { from: 4, to: 6, moves: [ 1, 2, 3, 0 ] }
];

var getRoute = function(from, to) {
    var route = [];
    var fromRoutes = routes.filter((o) => o.from == from);
    var toRoutes = routes.filter((o) => o.to == to);
    for (var n = 0; n < fromRoutes.length; n++) {
        if (fromRoutes[n].to == to)
        route = [ ...fromRoutes[n].moves ];
    }
    for (var n = 0; n < toRoutes.length; n++) {
        if (toRoutes[n].to == to) {
            route = [ ...toRoutes[n].moves ];
            route.reverse();
        }
    }
    return route;
};

var bot = {
    isSolving: false,
    destination: { x: 2, y: 2 },
    number: 6
};
var botInterval = 0;
var startBot = function() {
    if (bot.isSolving) { 
        stopBot();
        return;
    }
    bot.route = 
    getRoute(getDiceValue(dices[0].object), bot.route);

    bot.isSolving = true;
    botInterval = setInterval(function() {
        var gridX = dices[0].grid.x;
        var gridY = dices[0].grid.y;

        var hor = gridX-bot.destination.x;
        var ver = gridY-bot.destination.y;

        var from = -1;
        if (gridX != bot.destination.x &&
            Math.abs(hor) <= Math.abs(ver) || 
            Math.abs(ver) == 0) {
            if (hor < 0) from = 0;
            else from = 2;
        }
        else if (gridY != bot.destination.y) {
            if (ver < 0) from = 1;
            else from = 3;
        }

        dices[0].beginRoll(from);

        if (gridX == bot.destination.x &&
        gridY == bot.destination.y &&
        getDiceValue(dices[0].object) == bot.number) {
            stopBot();
        }
    }, 1000);
};

var stopBot = function() {
    bot.isSolving = false;
    clearInterval(botInterval);
};

var diceType = "numbers";
var drawFace = function(number, type=diceType, texture=-1) {
    var canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 300, 300);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
    ctx.strokeRect(1, 1, 298, 298);

    ctx.font = "250px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#000";
    if (texture > -1) {
        ctx.fillStyle = "#fff";
        ctx.drawImage(sprite_idle[texture], 0, 0, 300, 300);
    }

    if (type == "text") {
        ctx.font = "200px sans-serif";
        ctx.fillText(number, 150, 165);
        return canvas.toDataURL();
    }
    if (type == "numbers") {
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(150, 150, 125, 0, (Math.PI*2));
        //ctx.fill();
        //ctx.fillStyle = "#fff";
        ctx.font = "250px sans-serif";
        ctx.fillText(number, 150, 165);
        return canvas.toDataURL();
    }

    if (number == 1 || number == 3 || number == 5) {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 30, 0, Math.PI*2);
        ctx.fill();
    }
    if (number == 2 || number == 3 ||
        number == 4 || number == 5 ||
        number == 6) {
        ctx.beginPath();
        ctx.moveTo(70, 70);
        ctx.arc(70, 70, 30, 0, Math.PI*2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(230, 230);
        ctx.arc(230, 230, 30, 0, Math.PI*2);
        ctx.fill();
    }
    if (number == 4 || number == 5 || number == 6) {
        ctx.beginPath();
        ctx.moveTo(230, 70);
        ctx.arc(230, 70, 30, 0, Math.PI*2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(70, 230);
        ctx.arc(70, 230, 30, 0, Math.PI*2);
        ctx.fill();
    }
    if (number == 6) {
        ctx.beginPath();
        ctx.moveTo(70, 150);
        ctx.arc(70, 150, 30, 0, Math.PI*2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(230, 150);
        ctx.arc(230, 150, 30, 0, Math.PI*2);
        ctx.fill();
    }

    return canvas.toDataURL();
};

var traceBack = function() {
    var gridX = dices[0].grid.x;
    var gridY = dices[0].grid.y;

    var hor = 2-gridX;
    var ver = 2-gridY;

    var text = "";
    if (Math.abs(hor) <= Math.abs(ver)) {
        var amt = Math.abs(hor);
        var mov = amt > 1 ? "rolls" : "roll";
        if (hor < 0) 
        text += amt + " " + mov + " to the left";
        else if (hor > 0) 
        text += amt + " " + mov + " to the right";

        var amt = Math.abs(ver);
        if (amt > 0) text += " and ";
        var mov = amt > 1 ? "rolls" : "roll";
        if (ver < 0) 
        text += amt + " " + mov + " to the front";
        else if (ver > 0) 
        text += amt + " " + mov + " to the back";
    }
    else {
        var amt = Math.abs(ver);
        var mov = amt > 1 ? "rolls" : "roll";
        if (ver < 0) 
        text += amt + " " + mov + " to the front";
        else if (ver > 0) 
        text += amt + " " + mov + " to the back";

        var amt = Math.abs(hor);
        if (amt > 0) text += " and ";
        var mov = amt > 1 ? "rolls" : "roll";
        if (hor < 0) 
        text += amt + " " + mov + " to the left";
        else if (hor > 0) 
        text += amt + " " + mov + " to the right";
    }

    say(text);
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

document.body.addEventListener("keydown", function(e) {
    switch(e.keyCode) {
        case 37:
            dices[0].beginRoll(2);
            break;
        case 38:
            dices[0].beginRoll(3);
            break;
        case 39:
            dices[0].beginRoll(0);
            break;
        case 40:
            dices[0].beginRoll(1);
            break;
    }
});