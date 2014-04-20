<?php

require_once 'inc.php';

$action = 'main';
$page = '';

if (!isset($_SESSION['user']) || !isset($_SESSION['user']['user_id'])) {
  $action = 'loading';
  $page = 'loading';
  $_SESSION['user'] = array();
} else {
  $_SESSION['user'] = getUser($_SESSION['user']['user_id']);
}
$curUser = $_SESSION['user'];
/*$action = 'game';
$_REQUEST['mapId'] = 1;
$_REQUEST['gameId'] = 1;*/

if (isset($_REQUEST['a'])) {
  $action = $_REQUEST['a'];
}

if (isset($_REQUEST['p'])) {
  $page = $_REQUEST['p'];
} elseif (!$page) {
  $page = $action;
}

require_once ROOT_DIR . '/actions/' . $action . '.php';

if ($action != 'loading') require_once ROOT_DIR . '/template/header.php';
require_once ROOT_DIR . '/pages/' . $page . '.php';
if ($action != 'loading') require_once ROOT_DIR . '/template/footer.php';
