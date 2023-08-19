<?php include ('config/db.php')?>
<?php
$sql ="";
try {
/*
  if (isset($_POST["url"])) {
    $url = $_POST["url"];
    if (isset($_POST["proxy"]) && $_POST["proxy"] != "none") {
        $proxy = $_POST["proxy"];
        $aContext = array(
            "http" => array(
                "proxy" => $proxy,
             ),
        );
        echo file_get_contents($url, false, $aContext);
    }
    else {
        echo file_get_contents($url);
    }
  }
  else */
   if (isset($_POST["url"])) {
       $url = $_POST["url"];
       if (defined("CURL_VERSION_HTTP2") &&
       (curl_version()["features"] & CURL_VERSION_HTTP2) !== 0) {
           $headers = array(
               "cache-control: max-age=0",
               "device-memory: 2",
               "sec-ch-device-memory: 2",
               "dpr: 2",
               "sec-ch-dpr: 2",
               "viewport-width: 980",
               "sec-ch-viewport-width: 980",
               "rtt: 250",
               "downlink: 0.85",
               "ect: 4g",
               "sec-ch-ua: \"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
               "sec-ch-ua-mobile: ?1",
               "sec-ch-ua-platform: \"Android\"",
               "upgrade-insecure-requests: 1",
               "user-agent: Mozilla/5.0 (Linux; Android 6.0.1; Redmi 3S) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Mobile Safari/537.36",
               "accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
               "service-worker-navigation-preload: true",
               "sec-fetch-site: none",
               "sec-fetch-mode: navigate",
               "sec-fetch-user: ?1",
               "sec-fetch-dest: document",
               "accept-encoding: gzip, deflate, br",
               "accept-language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
               "cookie: csm-hit=20YRMRT66CBX8GSMA88N+b-20YRMRT66CBX8GSMA88N|1660925654464",
           );

           $ch = curl_init();
           curl_setopt_array($ch, [
               CURLOPT_URL                  =>$url,
               CURLOPT_HEADER         =>true,
               CURLOPT_NOBODY         =>true,
               CURLOPT_RETURNTRANSFER => true,
               CURLOPT_HTTPHEADER => $headers,
               CURLOPT_HTTP_VERSION =>
               CURL_HTTP_VERSION_2_0,
          ]);
          $response = curl_exec($ch);
      if ($response !== false && strpos($response, "HTTP/2") === 0) {
         //echo "HTTP/2 support!\n";
         echo $response;
      } elseif ($response !== false) {
         echo "No HTTP/2 support on server.";
      } else {
         echo curl_error($ch);
      }
      curl_close($ch);
      } else {
         echo "No HTTP/2 support on client.";
      }
  }
  else if (isset($_GET["url"])) {
    $url = $_GET["url"];
    $contents = file_get_contents($url);

    echo $contents;
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