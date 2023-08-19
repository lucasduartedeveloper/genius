<!-- PHP: Script  -->
<?php
session_start();
$maxlifetime = ini_get("session.gc_maxlifetime");
echo "<!-- session.gc_maxlifetime: ".$maxlifetime ." -->";

$rnd = 
    str_pad(
    strval(rand(0,999999)), 
    6, "0", STR_PAD_LEFT);
$style = [
    0 => "minigame.css"
];
$lib = [
    /*0 => "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.145.0/three.min.js",*/
    /*1 => "https://cdn.jsdelivr.net/npm/three@0.145.0/examples/js/loaders/OBJLoader.min.js"*/
];
$script = [
    /*0 => "thirdpart/dat.gui.min.js",
    1 => "thirdpart/stats.min.js",
    2 => "thirdpart/three.min.js",
    3 => "thirdpart/ammo.js",
    4 => "thirdpart/OBJLoader.min.js",*/
    0 => "websocket.js",
    1 => "http-helper.js",
    2 => "heroku.js",
    3 => "gyro-helper.js",
    4 => "image-helper.js",
    5 => "camera-helper.js",
    6 => "physics-world.js",
    7 => "game-camera.js",
    8 => "game-logic.js",
    9 => "texture-helper.js",
    10 => "audio-helper.js",
    11 => "upgrade/minigame.js"
];
$module = [
    /*0 => "thirdpart/BufferGeometryUtils.js",
    1 => "thirdpart/SceneUtils.js"*/
];

/*header("Access-Control-Allow-Origin: *");
header("Referrer-Policy: no-referrer");*/
echo "<!-- ".$rnd." -->";
?>
<!-- PHP -->

<!DOCTYPE html>
<html>
<head>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">

<link rel="apple-touch-icon" sizes="76x76" href="webapp/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="webapp/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="webapp/favicon-16x16.png">
<link rel="manifest" href="webapp/site.webmanifest?v=0">
<link rel="mask-icon" href="webapp/safari-pinned-tab.svg" color="#2f2e40">
<meta name="msapplication-TileColor" content="#2f2e40">
<meta name="theme-color" content="#2f2e40">

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<!-- <link rel="stylesheet" href="css/normalizee.css"> -->

<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />

<!-- PHP: Inject style files -->
<?php
foreach ($style as $a) {
   echo 
   "<link rel=\"stylesheet\" href=\"css/".
   $a."?v=".$rnd."\">";
}
echo "\n";
?>
<!-- PHP -->

<title></title>
</head>
<body>

<input id="zoom" style="display:none"
min="0" max="1" step="0.01" value="0"
type="range" 
class="form-range">

<p id="version-info">
     3D-VIEWER
     <span id="heroku-version">v0</span>
     <!-- <br>
     <span id="server-info">
     CONNECTING...
     </span> -->
</p>
</div>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js"></script>

<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

<script src="https://momentjs.com/downloads/moment.min.js"></script>

<script src="https://kit.fontawesome.com/147bb12bad.js" crossorigin="anonymous"></script>

<script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>

<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<!-- PHP: Inject script files -->
<?php
foreach ($lib as $a) {
   echo 
   "<script src=\"".
   $a."?v=".$rnd."\"></script>";
}
foreach ($script as $a) {
   echo 
   "<script src=\"script/".
   $a."?v=".$rnd."\"></script>";
}
foreach ($module as $a) {
   echo 
   "<script type=\"module\" src=\"".
   $a."?v=".$rnd."\"></script>";
}
echo "\n";
?>
<!-- PHP -->

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>
    eruda.init();

    /*if (location.protocol !== "https:") {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }*/
</script>
</body>
</html> 