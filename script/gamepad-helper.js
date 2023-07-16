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
     if (!gamepadList[index]) return;

     for (var n = 0; n < gamepadList[index].buttons.length; n++) {
          var button = gamepadList[index].buttons[n];
          if (button.pressed && 
              (buttonsPreviousStates.length > 0 && 
              !buttonsPreviousStates[n].pressed)) {
              console.log("Button "+n+" pressed");
          }
          var obj = {
              pressed: button.pressed
          };
          buttonsPreviousStates[n] = obj;
     }
};