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
				"wildcard" => $_POST['wildcard']
	);

$class = new Users($data);
$data = $class->get_product_data_search($filter);

header("HTTP/1.0 400 Not Pictures Found");
if($data['status']==true){
	header("HTTP/1.0 200 OK");
}

header('Content-Type: application/json');
print(json_encode($data));
?>