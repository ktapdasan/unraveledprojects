<?php
require_once('../connect.php');
require_once('../../CLASSES/Users.php');
// print_r($_POST);
$data=array();
foreach($_POST as $k=>$v){
	$data[$k] = $v;
}

$class = new Users(
						null
	);

$filter = array(
				"name" => $_POST['name'],
				"date_from" => $_POST['date_from'],
				"date_to" => $_POST['date_to'],
	);

$class = new Users();
$data = $class->get_reports($filter);

header("HTTP/1.0 400 No User Found");
if($data['status']==true){
	header("HTTP/1.0 200 OK");
}

header('Content-Type: application/json');
print(json_encode($data));
?>