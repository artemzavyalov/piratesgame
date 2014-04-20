<?php
error_reporting(0);

require_once 'inc.php';

$map = array();
$fields = $dbRead->query("SELECT * FROM `fields`")->assoc();
$fields = array2dConvertKeys($fields, 'field_type');

$params = $config['buildMap'];
$sizes = $params['sizes'];
$counts = $params['counts'];

$builded = array_merge($params['percents'], $params['counts']);
foreach ($builded as $k => $v) {
  $builded[$k] = 0;
}

for ($i = 1; $i <= $sizes['vertical'] * $sizes['horizontal']; $i++) {
  if (count($counts) > 0) {
    $type = each($counts);
    if ($type['value'] > 0) {
      $map[$i] = $type['key'];
      $counts[$type['key']]--;
      if ($counts[$type['key']] == 0) {
        unset($counts[$type['key']]);
      }
      reset($counts);
      $builded[$type['key']] += 1;
    }
  } else {
    $getKey = randomKeyByArray($params['percents'], $sizes['vertical']);
    $map[$i] = $getKey;
    $builded[$getKey] += 1;
  }
}

shuffle($map);
$map = arrayTo2dArray($map, $sizes['vertical'], $sizes['horizontal']);

$map = checkEmpties($map, $builded);

$res = fillMapFields($fields, $map);
$map = $res['map'];

$contWidth = $sizes['vertical'] * 120;
$contHeight = $sizes['horizontal'] * 120;

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
  <script type="text/javascript" src="/st/js/jquerymx-3.2.custom.min.js"></script>
  <script type="text/javascript" src="/st/js/modernizr.custom.animation.js"></script>
  <script type="text/javascript" src="http://vk.com/js/api/xd_connection.js"></script>
  <script>
    VK.init(function () {
    }, function () {
      alert('VK API ERROR!!!');
    });
    $.Class('DGame', {
      // Static methods
      I: {},
      ready: function () {
      },
      vkuid:                  <?=isset($_SESSION['userVkUid']) ? $_SESSION['userVkUid'] : 0?>,
      VKAppId: 0
    }, {
      // Prototype methods
    });
  </script>
  <script type="text/javascript" src="/st/js/helpers.js"></script>
  <script type="text/javascript" src="/st/js/map-demo.js"></script>
</head>
<body>
<script type="text/javascript">
  $(function () {

    if (Modernizr.cssanimations) {
      new DGame.Controllers.Map($('#map'), {mapInfo: <?=json_encode($map)?>, mapField: '.mapField'});
    } else {
      alert('Sorry, your browser doesn\'t support CSS3 animation.');
    }

  });
</script>
<div id="container">
  <div id="putShip" style="display: none;">
    <div class="card ship"></div>
  </div>
  <div id="game" style="width: <?= ($contWidth + 2 * 100) ?>px; height: <?= ($contHeight + 2 * 100) ?>px;">
    <? for ($x = 0; $x <= $sizes['horizontal'] + 1; $x++): ?>
      <? for ($y = 0; $y <= $sizes['vertical'] + 1; $y++): ?>
        <? if ($x == 0 || $y == 0 || $x == $sizes['horizontal'] + 1 || $y == $sizes['vertical'] + 1): ?>
          <div class="card sea" style="left: <?= ($x * 120) ?>px; top: <?= ($y * 120) ?>px;"></div>
        <? endif; ?>
      <? endfor; ?>
    <? endfor; ?>
    <div id="map" style="width: <?= $contWidth ?>px; height: <?= $contHeight ?>px;"></div>
  </div>
</div>
</body>
</html>