<!doctype html>
<html lang="en">
<head>
	<title>Anaglyph (Three.js)</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
	<link rel=stylesheet href="css/base.css"/>
</head>
<body>

<!-- <script src="js/three.min.js"></script> -->
<script src="js/Three.js"></script>
<script src="js/OBJLoader.min.js"></script>
<script src="js/Detector.js"></script>
<script src="js/Stats.js"></script>
<script src="js/OrbitControls.js"></script>
<script src="js/THREEx.KeyboardState.js"></script>
<script src="js/THREEx.FullScreen.js"></script>
<script src="js/THREEx.WindowResize.js"></script>

<script src="//cdn.jsdelivr.net/npm/eruda"></script>

<script src="js/effects/AnaglyphEffect.js?v=5"></script>

<!-- jQuery code to display an information button and box when clicked. -->
<script src="js/jquery-1.9.1.js"></script>
<script src="js/jquery-ui.js"></script>
<link rel=stylesheet href="css/jquery-ui.css" />
<link rel=stylesheet href="css/info.css"/>
<script src="js/info.js"></script>
<div id="infoButton"></div>
<div id="infoBox" title="Demo Information">
Requires red-blue 3D glasses.<br/>
This three.js demo is part of a collection at
<a href="http://stemkoski.github.io/Three.js/">http://stemkoski.github.io/Three.js/</a>
</div>
<!-- ------------------------------------------------------------ -->

<div id="ThreeJS" style="position: absolute; left:0px; top:0px"></div>
<script>
eruda.init();
/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/

// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
// custom global variables
var cube;

/*THREE.Math = {
    degToRad: function(deg) {
        return deg * (Math.PI/180);
    }
};*/

init();
animate();

// FUNCTIONS 		
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);	
	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(-100,200,100);
	scene.add(light);
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
	// SKYBOX
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	
	////////////
	// CUSTOM //
	////////////
	var cubeGeometry = new THREE.CubeGeometry( 50, 50, 50 );
	var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x888888 } );
	cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	cube.position.set(0,26,0);
	scene.add(cube);
	
	cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	cube.position.set(-40,26,70);
	scene.add(cube);
	
	var width = window.innerWidth || 2;
	var height = window.innerHeight || 2;

	this.effect = new THREE.AnaglyphEffect( renderer );
	effect.setSize( width, height );

              //brainObj = new THREE.3DObject();
              //scene.add( brainObj );

              camera.lookAt(cube.position);

                                // instantiate a loader
/*var loader = new THREE.OBJLoader();
// load a resource
loader.load(
    // resource URL
    "images/brain.obj",
    // called when resource is loaded
    function ( object ) {
        scene.add( object );

        var material = 
        new THREE.MeshStandardMaterial( { 
            color: 0xFF9999,
            opacity: 0.8,
            transparent: true
        } );

        object.castShadow = true;
        for (var k in object.children) {
            object.children[k].material = material;
            object.children[k].castShadow = true;
        }

        object.position.x = 0;
        object.position.y = 0;
        object.position.z = 0.7;

        object.scale.x = 3;
        object.scale.y = 3;
        object.scale.z = 3;

        object.rotation.y = Math.PI;
    },
    // called when loading is in progresses
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
        console.log( 'An error happened' );
    }
);*/
}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	if ( keyboard.pressed("z") ) 
	{ 
		// do something
	}
	
	controls.update();
	stats.update();
}

function render() 
{
               cube.rotation.y += Math.PI/60;
	//renderer.render( scene, camera );
	effect.render( scene, camera );
}

</script>

</body>
</html>
