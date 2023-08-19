<?php

/*//old db
$host = "ec2-54-163-34-107.compute-1.amazonaws.com";
$user = "vlzqsguskwmlmm";
$password = "452734c83e2d543b75b02c141307da30712230a98df7b111e10fcd57d5ee4cbf";
$dbname = "d8o611bsfe4eqc";
$port = "5432";*/

/*// new db
$host = "sql313.epizy.com";
$user = "epiz_33068111";
$password = "RGc9HTlpPA2";
$dbname = "epiz_33068111_app_test";
$port = "3306";*/

$host = "sql101.epizy.com";
$user = "epiz_34032485";
$password = "XqAyg3RgOKBsdC";
$dbname = "epiz_34032485_app_test";
$port = "3306";

try{
  //Set DSN data source name
    $dsn = "mysql:host=" . $host . ";port=" . $port .";dbname=" . $dbname . ";user=" . $user . ";password=" . $password . ";";


  //create a pdo instance
  $pdo = new PDO($dsn, $user, $password);
  $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_OBJ);
  $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
echo 'Connection failed: ' . $e->getMessage();
}
  ?>
