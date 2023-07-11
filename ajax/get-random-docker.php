<?php
$x =  rand(0, 1000);
$y =  rand(0, 1000);
$z =  rand(0, 1000);
$time = time();

$array = array(
   “x” => $x,
   “y” => $y,
   “z” => $z,
);
echo json_encode($array);
?>