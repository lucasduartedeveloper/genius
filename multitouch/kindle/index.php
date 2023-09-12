<!DOCTYPE html>
<html>
     <head>
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
     <title>v0</title>
     <style>
         html, body {
                font-size: 30px;
                text-align: center;
                width: 100%;
                height: 100%;
         }
         img {
               width: 150px;
               height: 300px;
               filter: grayscale(100%);
         }
     </style>
     <script>
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
                    document
                    .getElementById("frame-view")
                    .src = data[0].data;

                     document
                    .getElementById("server-info")
                    .innerText = "CONNECTED";
               }

                // Send a request
                xhttp.open("GET", 
               "/genius/multitouch/ajax/image-data.php?count=1");
                xhttp.send();
          }, 500);
     </script>
     <!-- <script src="websocket.js?v=2"></script> -->
     </head>
     <body>
         <p id="update-test">0</p>

         <img width=150 height=300 id="frame-view" />

         <p id="server-info">CONNECTING...</p>
   
         <script src="//cdn.jsdelivr.net/npm/eruda"></script>
         <script>eruda.init();</script>
     </body>
</html>