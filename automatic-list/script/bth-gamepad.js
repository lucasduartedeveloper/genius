class BTHGamepad {

     batteryLevel = 0;
     buttonSet = [];
     lastState = {
         leftArrow: false,
         upArrow: false,
         rightArrow: false,
         downArrow: false,
         select: false,
         start: false,
         two: false,
         three: false,
         four: false,
         one: false,
         leftShoulder: false,
         leftTrigger: false,
         rightShoulder: false,
         rightTrigger: false
     };
     state = {
         leftArrow: false,
         upArrow: false,
         rightArrow: false,
         downArrow: false,
         select: false,
         start: false,
         two: false,
         three: false,
         four: false,
         one: false,
         leftShoulder: false,
         leftTrigger: false,
         rightShoulder: false,
         rightTrigger: false
     };

     constructor() {
         ws.onmessage = function(e) {
             var msg = e.data.split("|");
             if (msg[0] == "PAPER" &&
                 msg[1] != playerId &&
                 msg[2] == "remote-gamepad-attached") {
                 remoteGamepad = true;
                 say("Gamepad attached.");
             }
             else if (msg[0] == "PAPER" &&
                 msg[1] != playerId &&
                 msg[2] == "remote-gamepad-seq") {
                 var identifier = msg[3];
                 endButtonRequest(identifier);
                 buttonSet = JSON.parse(msg[4]);
                 gamepadState();
            }
            else if (msg[0] == "PAPER" &&
                 msg[1] != playerId &&
                 msg[2] == "remote-gamepad-battery") {
                 batteryLevel = parseInt(msg[3]);
            }
        };
    }

    requestCount = 0;
    getUniqueIdentifier() {
         requestCount += 1;
         var requestIdentifier = 
         "RQ-"+requestCount.toString().padStart(8, "0")+
         "-"+new Date().getTime();
         return requestIdentifier;
    };

    requestTimeout = 0;
    buttonRequestBuffer = [];
    createButtonRequest(index) {
        if (buttonRequestBuffer.length > 0) return;
        var obj = {
            identifier: getUniqueIdentifier(),
            index: index
        };
        buttonRequestBuffer.push(obj);
        ws.send("PAPER|"+playerId+"|remote-gamepad-get|"+
        obj.identifier);
        setTimeout(function() {
            requestTimeout += 1;
            buttonRequestBuffer = [];
        }, 1000);
    };

    

}