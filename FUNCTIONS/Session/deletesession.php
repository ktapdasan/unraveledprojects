<?php
$_id = md5('pk');

header("HTTP/1.0 200 OK");
setcookie ($_id, "", time() - 3600, '/');

header('Content-Type: application/json');
print(json_encode(array('status'=>true)));
?>