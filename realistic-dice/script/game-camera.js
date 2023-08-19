startX = 0;
startY = 0;
rotationX = 0;
rotationY = 0;
rotateCamera = false;

var startCamera = function() {
    camera = new THREE.PerspectiveCamera( 
        cameraParams.fov, 
        cameraParams.aspectRatio, 
        cameraParams.near, 
        cameraParams.far 
    );

    cameraCenter = new THREE.Group();
    cameraCenter.add(camera);
    scene.add( cameraCenter );

    camera.position.set(0, 1, 3.75);
    camera.lookAt(0, 0, 0);

    startCameraControls();
}

var startCameraControls = function() {
    var zoomControl = $("#zoom")[0];
    $("#zoom").css("transform", "rotateZ(90deg)");
    
    zoomControl.style.display = "block";
    zoomControl.style.position = "fixed";
    zoomControl.style.right = 10+"px";
    zoomControl.style.top = (sh/3)*2+"px";

    $("#zoom").on("change", function() {
        var zoom = parseFloat($("#zoom").val());
        var pos = { x: 0, y: 1, z: 3.75 };
        camera.position.x = pos.x * (1-zoom);
        camera.position.y = pos.y * (1-zoom);
        camera.position.z = pos.z * (1-zoom);
    });

    $(renderer.domElement).off("touchstart");
    $(renderer.domElement).on("touchstart", function(e) {
        //console.log(e);
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        if (e.touches.length == 1) {
            var raycaster = new THREE.Raycaster();
            var mouse = new THREE.Vector3(
                (startX / (sw-40))*2-1, -(startY / (sw-40))*2+1, 0.5
            );
            //console.log(mouse.x, mouse.y);

            raycaster.setFromCamera( mouse, camera );
            var intersects = raycaster.intersectObjects( scene.children );

            if ( intersects.length > 0 ) {
                //console.log(intersects[ 0 ].point);
                var pos = positionToGrid(intersects[ 0 ].point);

                selection.position.set(
                    pos.x, pos.y, pos.z, 
                );
            }
        }
    });
    $(renderer.domElement).off("touchmove");
    $(renderer.domElement).on("touchmove", function(e) {
        //console.log(e);
        positionZ = cameraCenter.position.z + (1/sw)*(e.touches[0].clientY - startY);

        rotationY = cameraCenter.rotation.y + 
            ((1/sw)*(e.touches[0].clientX - startX));
        //rotationY = (rotationY*Math.PI)/16;
        rotationY = rotationY > Math.PI ? -Math.PI : rotationY;
        rotationY = rotationY < -Math.PI ? Math.PI : rotationY;
        //console.log(rotationX);

        if (e.touches.length > 1) {
            rotateCamera = true;
        }
    });
    $(renderer.domElement).off("touchend");
    $(renderer.domElement).on("touchend", function(e) {
         rotateCamera = false;
    });
}

var positionCamera = function() {
    cameraCenter.position.set(
        sprite.position.x,
        sprite.position.y,
        sprite.position.z
    );
};