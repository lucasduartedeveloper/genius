var worldToJSON = function() {
    var obj = [];
    for (var k in rigidBodies) {
       var objThree = rigidBodies[k];
       var objAmmo = objThree.userData.physicsBody;
       var ms = objAmmo.getMotionState();
       ms.getWorldTransform(tmpTrans);
       var p = tmpTrans.getOrigin();
       var q = tmpTrans.getRotation();
       obj.push({
           tag: objThree.userData.tag,
           position: { x: p.x(), y: p.y(), z: p.z() },
           rotation: { x: q.x(), y: q.y(), z: q.z(), w: q.w() }
       });
    }
    return JSON.stringify(obj);
};

var worldFromJSON = function(json) {
    var obj = JSON.parse(json);
    for (var k in obj) {
       var objThree = rigidBodies[k];
       var objAmmo = objThree.userData.physicsBody;
       var ms = objAmmo.getMotionState(); 

       ammoTmpPos.setValue(
           obj[k].position.x, 
           obj[k].position.y,
           obj[k].position.z
       );
       ammoTmpQuat.setValue(
          obj[k].rotation.x, 
          obj[k].rotation.y, 
          obj[k].rotation.z, 
          obj[k].rotation.w
       );

       tmpTrans.setIdentity();
       tmpTrans.setOrigin(ammoTmpPos); 
       tmpTrans.setRotation(ammoTmpQuat); 

       ms.setWorldTransform(tmpTrans);
    }
};