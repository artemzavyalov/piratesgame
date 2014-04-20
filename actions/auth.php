<?php
$response = isset($_REQUEST['data']) ? $_REQUEST['data'] : FALSE;
$referrer = isset($_REQUEST['referrer']) ? $_REQUEST['referrer'] : FALSE;
$partner = isset($_REQUEST['partner']) ? $_REQUEST['partner'] : FALSE;
$serviceId = isset($_REQUEST['serviceId']) ? $_REQUEST['serviceId'] : FALSE;
$serviceName = isset($_REQUEST['serviceName']) ? $_REQUEST['serviceName'] : FALSE;

$closeWindow = FALSE;

if ($response && $serviceId && $serviceName) {
  require_once(ROOT_DIR . '/libs/services.php');
  $data = services::parse($serviceName, $response);
  if ($data['uid'] == 0) {
    exit;
  }
  $answer = array();
  $userAuthId = checkUserLink($serviceId, $data['uid']);
  $_SESSION['authId'] = $serviceId;
  $_SESSION['userVkUid'] = $data['uid'];
  if ($userAuthId) {
    $_SESSION['user'] = getUser($userAuthId);
    if ($_SESSION['user']['user_permanent'] == '0') {
      $_SESSION['loginCounter'] = 2;
      editUser($userAuthId, array('user_permanent' => 1));
    } else {
      $_SESSION['loginCounter'] = 3;
    }

    $answer['id'] = $_SESSION['user']['user_id'];
  } else {
    $userId = addUser($data['userData']);
    if ($userId) {
      $_SESSION['user'] = getUser($userId);
      $_SESSION['tmp']['afterReg'] = TRUE;
      $_SESSION['tmp']['afterAuth'] = TRUE;
      $_SESSION['loginCounter'] = 1;

      if (!addUserLink($serviceId, $data['uid'], $userId)) {
        $answer['error'][] = _('Ошибка при создании привязки.');
      }
      $answer['registration'] = TRUE;
      $answer['id'] = $userId;

    } else {
      $answer['error'][] = _('Ошибка при сохранении пользователя.');
    }
  }
  echo json_encode($answer);
}
exit;
