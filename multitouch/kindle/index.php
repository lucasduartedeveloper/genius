<!DOCTYPE html>
<html>
     <head>
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
     <title>v0</title>
     <style>
         html, body {
                font-family: Arial;
                font-size: 30px;
                text-align: center;
                width: 100%;
                height: 100%;
                overflow: hidden;
         }
         img {
                width: 150px;
                height: 300px;
                filter: grayscale(100%);
                position: absolute;
         }
     </style>
     <script>
          window.onload = function() {
          var sw = window.innerWidth;
          var sh = window.innerHeight;

          var updateTest = 
          document.getElementById("update-test");
          updateTest.style.position = "absolute";
          updateTest.style.left = ((sw/2)-(sw/4))+"px";
          updateTest.style.width = (sw/2)+"px";
          updateTest.style.top = "25px";

          var frameView1 = 
          document.getElementById("frame-view-1");
          var frameView0 = 
          document.getElementById("frame-view-0");
          var frameView2 = 
          document.getElementById("frame-view-2");

          var scale = [
              0.3, 0.4, 0.3
          ];

          var wr = ((sw/2)/150);
          var width = sw;
          var height = (2*sw);

          frameView1.style.left = 
          ((sw/2)-((width/2)*scale[1])-(width*scale[0]))+"px";
          frameView1.style.top = 
          ((sh/2)-((height/2)*scale[0])-50)+"px";
          frameView1.style.width = ((width)*scale[0])+"px";
          frameView1.style.height = ((height)*scale[0])+"px";
          //frameView1.style.transform = "scale(0.8)";

          frameView0.style.left = ((sw/2)-((width/2)*scale[1]))+"px";
          frameView0.style.top = 
          ((sh/2)-((height/2)*scale[1])-50)+"px";
          frameView0.style.width = ((width)*scale[1])+"px";
          frameView0.style.height = ((height)*scale[1])+"px";
          frameView0.style.zIndex = "1";

          frameView2.style.left = ((sw/2)+((width/2)*scale[1]))+"px";
          frameView2.style.top = 
          ((sh/2)-((height/2)*scale[2])-50)+"px";
          frameView2.style.width = ((width)*scale[2])+"px";
          frameView2.style.height = ((height)*scale[2])+"px";
          //frameView2.style.transform = "scale(0.8)";

          var serverInfo = 
          document.getElementById("server-info");
          serverInfo.style.position = "absolute";
          serverInfo.style.left = ((sw/2)-(sw/4))+"px";
          serverInfo.style.width = (sw/2)+"px";
          serverInfo.style.bottom = "50px";
          };

          var error = false;
          var updated = 0;
          setInterval(function() {
                updated += 1;
                document
                .getElementById("update-test")
                .innerText = updated;

               // Create an XMLHttpRequest object
               var xhttp = new XMLHttpRequest();

               // Define a callback function
               xhttp.onload = function() {
                    var data = JSON.parse(this.responseText);
                    for (var n = 0; n < data.length; n++) {
                        document
                        .getElementById("frame-view-"+data[n].track)
                        .src = data[n].data;
                    }

                    document
                    .getElementById("server-info")
                    .innerText = "CONNECTED";
               }
               xhttp.onerror = function() {
                    error = true;
                    console.log("error");
               };

                // Send a request
                xhttp.open("GET", 
               "/multitouch/ajax/image-data.php?count=3");
                xhttp.send();
          }, 500);
     </script>
     <!-- <script src="websocket.js?v=2"></script> -->
     </head>
     <body>
         <p id="update-test">0</p>

         <img width=150 height=300 id="frame-view-1" />
         <img width=150 height=300 id="frame-view-0" />
         <img width=150 height=300 id="frame-view-2" />

         <p id="server-info">CONNECTING...</p>
   
         <script src="//cdn.jsdelivr.net/npm/eruda"></script>
         <script>eruda.init();</script>
     </body>
</html>