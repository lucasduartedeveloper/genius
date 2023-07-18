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
var listGamepadButtons = function(index=0) {
     gamepadList = navigator.getGamepads();

     if (!gamepadList[index]) return [];
     var buttonSet = [];

     for (var n = 0; n < gamepadList[index].buttons.length; n++) {
          var button = gamepadList[index].buttons[n];
          if (button.value != 0 && 
              (buttonsPreviousStates.length == 0 || 
              (buttonsPreviousStates.length > 0 && 
              button.value != buttonsPreviousStates[n].value))) {
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

     return buttonSet;
};

var rescueButtonFromSet = function(buttonSet, index) {
     var button = buttonSet.filter((b) => { return b.index == index; })[0];
     if (button) return button;
     else return { value: 0 };
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