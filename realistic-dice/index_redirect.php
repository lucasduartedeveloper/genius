<!-- PHP: Script  -->
<?php
session_start();
$maxlifetime = ini_get("session.gc_maxlifetime");
echo "<!-- session.gc_maxlifetime: ".$maxlifetime ." -->";

$rnd = 
    str_pad(
    strval(rand(0,999999)), 
    6, "0", STR_PAD_LEFT);

echo "<!-- ".$rnd." -->";
?>
<!-- PHP -->

<!DOCTYPE html>
<html>
<head>
<title></title>
</head>
<body>
<script>
    location.href = "http://192.168.15.2:8080/";
</script>
</body>
</html> 