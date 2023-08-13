var gamepadList = [];

window.addEventListener("gamepadconnected", (e) => {
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index,
    e.gamepad.id,
    e.gamepad.buttons.length,
    e.gamepad.axes.length,
  );

  gamepadList = navigator.getGamepads();
});

window.addEventListener("gamepaddisconnected", (e) => {
  console.log(
    "Gamepad disconnected from index %d: %s",
    e.gamepad.index,
    e.gamepad.id,
  );
});

var buttonsPreviousStates = [];
var listGamepadButtons = function(index=0, changes=true) {
     gamepadList = navigator.getGamepads();
     if (gamepadList[1]) index = 1;

     if (!gamepadList[index]) return [];
     var buttonSet = [];

     try {
     for (var n = 0; n < gamepadList[index].axes.length/2; n++) {
          var value = [ 
              gamepadList[index].axes[(n*2)],
              gamepadList[index].axes[(n*2)+1]
          ];
          var obj = {
              index: 99-n,
              value: value,
              pressed: Math.abs(value[0]) > 0.1 || Math.abs(value[1]) > 0.1
          };

          if (obj.pressed)
          buttonSet.push(obj);
     }

     for (var n = 0; n < gamepadList[index].buttons.length; n++) {
          var button = gamepadList[index].buttons[n];
          if (button.value != 0 || (!changes ||
              (buttonsPreviousStates.length == 0 || 
              (buttonsPreviousStates.length > 0 && 
              button.value != buttonsPreviousStates[n].value)))) {
              //console.log("Button "+n+" pressed");
              var obj = {
                   index: n,
                   value: button.value,
                   pressed: button.pressed
              };
              buttonSet.push(obj);
          }
          var obj = {
              value: button.value,
              pressed: button.pressed
          };
          buttonsPreviousStates[n] = obj;
     }
    } catch(ex) { console.log(ex); }

     if (index == 1) buttonSet = convertButtons(buttonSet);
     return buttonSet;
};

var convertButtons = function(buttonSet) {
     for (var n = 0; n < buttonSet.length; n++) {
          switch (buttonSet[n].index) {
               // 0 <-> 0
          }
     }
     return buttonSet;
};

var rescueButtonFromSet = function(buttonSet, index) {
     var button = buttonSet.filter((b) => { return b.index == index; })[0];
     if (button) return button;
     else return (index < 90) ? { value: 0 } : 
     { index: index, value: [ 0, 0 ], pressed: false };
};

var isMobile = function() {
     var result;
     if (navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)) {
         result = true;
     } else {
         result = false;
     }
     return result;
};

/*
USB indexes
4 = L1
5 = R1
1 = square
0 = x
3 = triangle
2 = circle
8 = select
9 = start

BLUETOOTH indexes
4 = L1
5 = R1
2 = square
0 = x
3 = triangle
1 = circle
8 = select
9 = start
*/