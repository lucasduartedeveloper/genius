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
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, preserveDrawingBuffer: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    // default THREE.PCFShadowMap
    renderer.setSize(500, 1000);

    sceneBackground = document.createElement("video");
    sceneBackground.style.position = "absolute";
    sceneBackground.autoplay = true;
    sceneBackground.style.objectFit = "cover";
    sceneBackground.style.display = "none";
    sceneBackground.style.background = "#000";
    sceneBackground.width = (300);
    sceneBackground.height = (600);
    sceneBackground.style.left = ((sw/2)-150)+"px";
    sceneBackground.style.top = ((sh/2)-300)+"px";
    sceneBackground.style.width = (300)+"px";
    sceneBackground.style.height = (600)+"px";
    sceneBackground.style.scale = "0.8";
    sceneBackground.style.border = "2px solid #ccc";
    sceneBackground.style.zIndex = "5";
    document.body.appendChild(sceneBackground);

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
    document.body.appendChild( renderer.domElement ); 

    scene = new THREE.Scene();
    scene.background = null;
    //scene.background = new THREE.Color("#000"); 

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

    loadOBJ("img/dracovenator.obj", function(object) {
        object.position.z = 1.5;
        object.rotation.x = -(Math.PI/2);
        object.rotation.z = -(Math.PI);

        //object.scale.set(0.5, 0.5, 0.5);

        //group.add(object)
    });

    loadOBJ("img/frame-0.obj", function(object) {
        object.position.z = 1.5;
        //object.rotation.x = -(Math.PI/2);
        //object.rotation.y = -(Math.PI/2);

        //object.scale.set(0.5, 0.5, 0.5);

        //group.add(object)
    });

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

    var geometry = new THREE.PlaneGeometry( 5, 5 ); 
    var material = new THREE.MeshStandardMaterial( {
        //color: 0xffff00 
    } );
    plane = new THREE.Mesh(geometry, material ); 
    group.add( plane );

    plane.position.y = 0;
    plane.rotation.x = -(Math.PI/2);

    loadRectangle("img/texture-1.png");

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
    ///planeLeft.rotation.x = -(Math.PI/2);
    planeLeft.rotation.y = -(Math.PI/2);

   var geometry = new THREE.PlaneGeometry( 5, 15 ); 
    var material = new THREE.MeshStandardMaterial( {
        side: THREE.DoubleSide,
        color: 0xffffff,
        opacity: 0.3,
        transparent: true
    } );
    planeRight = new THREE.Mesh(geometry, material ); 
    group.add( planeRight );

    planeRight.position.y = 7.5;
    planeRight.position.x = +2.5;
    //planeRight.rotation.x = -(Math.PI/2);
    planeRight.rotation.y = -(Math.PI/2);

    var geometry = new THREE.PlaneGeometry( 5, 15 ); 
    var material = new THREE.MeshStandardMaterial( {
        side: THREE.DoubleSide,
        color: 0xffffff,
        opacity: 0.3,
        transparent: true
    } );
    planeBack = new THREE.Mesh(geometry, material ); 
    group.add( planeBack );

    planeBack.position.y = 7.5;
    planeBack.position.z = -2.5;
    //planeBack.rotation.x = -(Math.PI/2);

    var geometry = new THREE.PlaneGeometry( 5, 15 ); 
    var material = new THREE.MeshStandardMaterial( {
        side: THREE.DoubleSide,
        color: 0xffffff,
        opacity: 0.3,
        transparent: true
    } );
    planeFront = new THREE.Mesh(geometry, material ); 
    group.add( planeFront );

    planeFront.position.y = 7.5;
    planeFront.position.z = 2.5;
    //planeFront.rotation.x = -(Math.PI/2);

    var geometry = new THREE.PlaneGeometry( 5, 1 ); 
    var material = new THREE.MeshStandardMaterial( {
        //side: THREE.DoubleSide,
        color: 0xffffff,
        opacity: 1,
        transparent: true
    } );
    label = new THREE.Mesh(geometry, material ); 
    group.add( label );

    label.position.x = 0;
    label.position.y = 14.5;
    label.position.z = 2.55;
    //planeFront.rotation.x = -(Math.PI/2);

    drawLabel("nicolediretora", function(url) {
        label.loadTexture(url);
    });

    rec = new CanvasRecorder(renderer.domElement);

    virtualCamera.position.set(0, 7.5, 17.5);
    virtualCamera.lookAt(0, 7.5, 0);

    controls = new THREE.OrbitControls(virtualCamera,
    renderer.domElement);
    controls.target = new THREE.Vector3(0, 7.5, 0);
    controls.update();

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

var get_polygon_centroid = function(pts) {
   var first = pts[0], last = pts[pts.length-1];
   if (first.x != last.x || first.y != last.y) pts.push(first);
   var twicearea=0,
   x=0, y=0,
   nPts = pts.length,
   p1, p2, f;
   for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
      p1 = pts[i]; p2 = pts[j];
      f = p1.x*p2.y - p2.x*p1.y;
      twicearea += f;          
      x += ( p1.x + p2.x ) * f;
      y += ( p1.y + p2.y ) * f;
   }
   f = twicearea * 3;
   return { x:x/f, y:y/f };
}

var readImage = function(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    var imageData = ctx.getImageData(0, 0, 
    canvas.width, canvas.height);
    var imageArray = imageData.data;

    var polygon = [];

    var currentY = 0;
    var leftOutline = [];
    for (var n = 0; n < imageArray.length; n+=4) {
        var k = n/4;
        var x = k % imageData.width;
        var y = Math.floor(k / imageData.width);

        var r = imageArray[n];
        var g = imageArray[n+1];
        var b = imageArray[n+2];
        var a = imageArray[n+3];

        if (a == 255 && currentY != y) {
            var p = { x: x, y: y };
            leftOutline.push(p);
            currentY = y;
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    var imageData = ctx.getImageData(0, 0, 
    canvas.width, canvas.height);
    var imageArray = imageData.data;

    var polygon = [];

    var currentY = 0;
    var rightOutline = [];
    for (var n = 0; n < imageArray.length; n+=4) {
        var k = n/4;
        var x = k % imageData.width;
        var y = Math.floor(k / imageData.width);

        var r = imageArray[n];
        var g = imageArray[n+1];
        var b = imageArray[n+2];
        var a = imageArray[n+3];

        if (a == 255 && currentY != y) {
            var p = { x: imageData.width-x, y: y };
            rightOutline.push(p);
            currentY = y;
        }
    }
    rightOutline = rightOutline.reverse();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    polygon = [ ...leftOutline ];
    polygon = [ ...polygon, ...rightOutline ];

    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx.beginPath();
    ctx.moveTo(polygon[0].x, polygon[0].y);
    for (var n = 1; n < polygon.length; n++) {
        ctx.lineTo(polygon[n].x, polygon[n].y);
    };
    ctx.closePath();
    ctx.fill();

    return get_polygon_centroid(polygon);
};

var loadRectangle = function(url) {
    var img = document.createElement("img");
    img.onload = function() {
        var height = 5*(this.height/this.width);
        var geometry = new THREE.PlaneGeometry( 5, height ); 
        var material = new THREE.MeshBasicMaterial( {
            side: THREE.DoubleSide,
            color: 0xffffff
        } );
       rectangle = new THREE.Mesh(geometry, material ); 
       group.add( rectangle );

       var centroid = readImage(this);
       console.log(centroid, this.width);

       var p = (1/this.width)*centroid.x;
       p = (5-(p*5))/2;
       console.log(p);

       rectangle.position.y = (height/2);
       rectangle.position.x = 0;
       //rectangle.rotation.x = -(Math.PI/2);
       rectangle.loadTexture(url);
    };
    img.src = url;
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