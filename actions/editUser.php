<?php
$screenSize    = isset($_REQUEST['screenSize']) ? $_REQUEST['screenSize'] : FALSE;

$userId = $curUser['user_id'];
$answer = array();

editUser($userId, array('user_setScreen' => $screenSize));

echo json_encode($answer);
die;
