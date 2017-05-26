<?php
require_once('../connect.php');
require_once('../../CLASSES/Users.php');
$class = new Users(
						NULL,
						NULL,
						NULL,
						NULL,
						NULL,
						NULL,
						NULL
					);

$data = $class->auth($_POST);

header("HTTP/1.0 404 User Not Found");
if($data['status']){
	// print_r($data);
	$user_random_key = md5('user_random_key'); 
	setcookie($user_random_key, md5($data['result'][0]['user_random_key']), time()+7200000, '/');
	header("HTTP/1.0 200 OK");
}

header('Content-Type: application/json');
print(json_encode($data));
?>