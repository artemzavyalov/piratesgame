<?php

?>
<!doctype html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>DGame</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/st/css/styles.css">
  <link rel="stylesheet" href="/st/jquery-ui/smoothness/jquery-ui-1.10.2.custom.css">
  <script type="text/javascript" src="/st/js/jquery-1.9.0.min.js"></script>
  <script type="text/javascript" src="/st/js/jquery-ui-1.10.2.custom.min.js"></script>
  <script type="text/javascript" src="/st/js/preloading.js"></script>
  <script type="text/javascript" src="/st/js/can-custom.js"></script>
  <script type="text/javascript" src="/st/js/modernizr.custom.animation.js"></script>
  <script type="text/javascript" src="/st/js/store.min.js"></script>
  <script type="text/javascript" src="http://vk.com/js/api/xd_connection.js"></script>
  <script>
    VK.init(function () {
      var screenSize = <?=$curUser['user_setScreen']?>;
      if (screenSize > 0) {
        VK.callMethod("resizeWindow", screenSize, screenSize);
      }
    }, function () {
      alert('VK API ERROR!!!');
    });
    var DGame = {
      Models: {},
      MAP: {},
      I: {},
      ready: function () {
      },
      vkuid:                  <?=isset($_SESSION['userVkUid']) ? $_SESSION['userVkUid'] : 0?>,
      VKAppId: 0
    };
    <? if($_SERVER['HTTP_HOST'] == 'dgame'): ?>
    $(document).ajaxError(function (event, jqxhr, settings, exception) {
      console.log('AJAX ERROR: ', exception.type, jqxhr);
    });
    <? endif; ?>
  </script>
  <script type="text/javascript" src="/st/js/helpers.js"></script>
</head>
<body>

