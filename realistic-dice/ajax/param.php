<?php include ('config/db_mysql.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["temp"])) {

    $temp = htmlspecialchars($_POST["temp"]);

    $sql = "UPDATE param SET `value`='".$temp."' WHERE `name`='temp';";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else {
    $sql = "SELECT * FROM param WHERE `name`='temp' ORDER BY id;";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    $details = $stmt->fetchAll(); 

    echo json_encode($details);
  }
}
catch (PDOException $e) {
   echo 'Connection failed: ' . $e->getMessage();
   echo $sql;
}
catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
    echo $sql;
}
?>