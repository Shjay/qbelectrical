<?php
	
	$config = array(
		'host' => 'ssl://smtp.gmail.com',
		'smtp_id' => 'd.code0107@gmail.com',
		'smtp_pw' => 'hellodcode',
		'debug' => 1,
		'charset' => 'utf-8',
		'ctype' => 'text/plain'
	);

	echo $_POST['f_name'];
	echo $_POST['f_email'];
	echo $_POST['msg'];

?>