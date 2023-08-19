<?php

/*//old db
$host = "ec2-54-163-34-107.compute-1.amazonaws.com";
$user = "vlzqsguskwmlmm";
$password = "452734c83e2d543b75b02c141307da30712230a98df7b111e10fcd57d5ee4cbf";
$dbname = "d8o611bsfe4eqc";
$port = "5432";*/

// new db
$host = "ec2-3-227-68-43.compute-1.amazonaws.com";
$user = "sibsxaczblskew";
$password = "53ce205f8ee3c5fd281fe7f6f6afac9f49d727dea61ed0c41b0325eca717f8eb";
$dbname = "dbt5rmphb2e2pu";
$port = "5432";

try{
  //Set DSN data source name
    $dsn = "pgsql:host=" . $host . ";port=" . $port .";dbname=" . $dbname . ";user=" . $user . ";password=" . $password . ";";


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
