var gridSize = 32;

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

var $;
var renderer, scene, light, camera, box, eye;

var startRenderer = function() {
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    // default THREE.PCFShadowMap
    renderer.setSize(250, 250);
    document.body.appendChild( renderer.domElement ); 

    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.left = window.innerWidth/2-125+"px";
    renderer.domElement.style.top = 20+"px";
    renderer.domElement.style.border = "1px solid #ccc";
    //renderer.domElement.style.borderRadius = "50%";
    renderer.domElement.style.zIndex = "999";

    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000");

    light = new THREE.PointLight(
        lightParams.color,
        lightParams.intensity,
        lightParams.distance,
        lightParams.decay
    );

    light.position.set(0, 5, 0);
    light.castShadow = true;
    scene.add(light);

    camera = new THREE.PerspectiveCamera( 
        cameraParams.fov, 
        cameraParams.aspectRatio, 
        cameraParams.near, 
        cameraParams.far 
    );

    camera.position.set(0, 5, 3.75);
    camera.lookAt(0, 0, 0);

    geometry = new THREE.SphereGeometry(1, 32); 
    material = 
    new THREE.MeshStandardMaterial( { 
        color: 0x777777,
        opacity: 0.5,
        transparent: true
    } );
    sphere = new THREE.Mesh( geometry, material );
    //sphere.scale.set(7.5, 0.1, 7.5);
    scene.add( sphere );
    sphere.position.x = 0;
    sphere.position.y = 1.95;
    sphere.position.z = 0;

    sphere.loadTexture("img/sphere-texture.jpeg");

    geometry = new THREE.BoxGeometry(1, 1, 1); 
    material = 
    new THREE.MeshStandardMaterial( { 
        color: 0x777777,
        opacity: 0.5,
        transparent: true
    } );
    ground = new THREE.Mesh( geometry, material );
    ground.scale.set(2.5, 0.1, 75);
    scene.add( ground );
    ground.position.x = 0;
    ground.position.y = -0.95;
    ground.position.z = 0;
    //THREE.loadObj("test-21.obj");
    //THREE.createPlane2();
    //THREE.createPlane4();
    //createTexture2();

    ground.loadTextureEx("img/texture.png", 0, 10);

    clock = new THREE.Clock();
    clock.sum = 0;

    render = true;
    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.dom.style.position = "fixed";
    stats.dom.style.left = "21px";
    stats.dom.style.top = "21px";
    document.body.appendChild( stats.dom );

    Ammo().then(setup);
};

var run = function() {
    clock = new THREE.Clock();
    clock.sum = 0;
    startAmmojs();
    ammoInterval = setInterval(function() {
        updateAmmojs();
    }, 1000/30);

    render = true;
    animate = function() {
        req = requestAnimationFrame( animate );
        if (render) {
            renderer.render( scene, camera );
        }
    };
    animate();
};

var checkPrize = function() {
    if (numSlot0 == numSlot1 && numSlot1 == numSlot2) {
        prizeLabel.style.display = "initial";
        prizeLabel.innerText = "You won "+unexist[numSlot0].name;
    }
};

var getRandomFromElsewhere = function(callback) {
    $.ajax({
        url: "ajax/get-random.php",
        method: "GET"
    }).done(function(data, status, xhr) {
        callback(data);
    });
    /*$.ajax({
        url: "http://cpu-test.epizy.com/get-random.php",
        method: "GET"
    }).done(function(data, status, xhr) {
        callback(data);
    });*/
    //herokuGET("http://cpu-test.epizy.com/get-random.php", callback);
};

var herokuGET = function(url, callback) {
    $.ajax({
        url: "ajax/http-get.php?url="+url,
        method: "GET"
    }).done(function(data, status, xhr) {
        callback(data);
    });
};

/*
slot0.rotation.x = 0;
slot1.rotation.x = 0;
slot2.rotation.x = 0;
var diff = ((180 / Math.PI) * slot0.rotation.x) % 36;
diff = diff > 18 ? 36-diff  : -diff;
var value = (180 / Math.PI) * slot0.rotation.x;
slot0.rotation.x = (value + diff * (Math.PI/180));
*/

//THREE.Object3D.prototype.rotationDeg = { x: 0, y: 0, z: 0 };
Object.defineProperty(THREE.Object3D.prototype, 'rotationDeg', {
    get: function() { 
       return {
           x: (180 / Math.PI) * this.rotation.x,
           y: (180 / Math.PI) * this.rotation.y,
           z: (180 / Math.PI) * this.rotation.z
       };
    }
});