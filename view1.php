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
  <script type="text/javascript" src="/st/js/jquerymx-3.2.custom.min.js"></script>
  <script type="text/javascript" src="/st/js/modernizr.custom.animation.js"></script>
  <script type="text/javascript" src="/st/js/store.min.js"></script>
  <!--<script type="text/javascript" src="http://vk.com/js/api/xd_connection.js"></script>-->
  <script>
    /*VK.init(function() {
     var screenSize = 870;
     if(screenSize > 0) {
     VK.callMethod("resizeWindow", screenSize, screenSize);
     }
     }, function() {
     alert('VK API ERROR!!!');
     });*/
    var VK = {
      api: function () {
      }
    };
    $.Class('DGame', {
      // Static methods
      I: {},
      ready: function () {
      },
      vkuid: 36011203,
      VKAppId: 0
    }, {
      // Prototype methods
    });
  </script>
  <script type="text/javascript" src="/st/js/helpers.js"></script>
</head>
<body>

<script type="text/javascript" src="/st/js/game.js"></script>
<script type="text/javascript">
  DGame.Connection.start = function () {
  };

  function putUnitFake(x, y) {
    $('#game').d_game_map_unit('put', 5, x, y, 'my');
  }
  function putShipFake(x, y) {
    $('#map').d_game_map('shipTo', x, y, true, '');
  }
  function openFieldFake(x, y) {
    $('#map').d_game_map('openField', x, y);
  }
  function getUnitFake() {
    return $('.pirateUnit').first();
  }
  function rightUnitFake(unit) {
    return $('#game').d_game_map_unit('moveRight', unit);
  }
  function downUnitFake(unit) {
    return $('#game').d_game_map_unit('moveDown', unit);
  }
  function upUnitFake(unit) {
    return $('#game').d_game_map_unit('moveUp', unit);
  }
  function leftUnitFake(unit) {
    return $('#game').d_game_map_unit('moveLeft', unit);
  }
  function downFlyFake(unit) {
    return $('#game').d_game_map_unit('flyDown', unit);
  }
  function upFlyFake(unit) {
    return $('#game').d_game_map_unit('flyUp', unit);
  }
  function rightFlyFake(unit) {
    return $('#game').d_game_map_unit('flyRight', unit);
  }
  function leftFlyFake(unit) {
    return $('#game').d_game_map_unit('flyLeft', unit);
  }
  function sinkFake(unit) {
    return $('#game').d_game_map_unit('sinkDown', unit, function () {
      $('#game').d_game_map_unit('remove', unit);
    });
  }
  $(function () {

    if (Modernizr.cssanimations) {
      new DGame.Controllers.Map($('#map'), {
        mapInfo: {"1": {"1": {"field_id": "1", "field_type": "EMPTY", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043f\u0443\u0441\u0442\u043e", "direction": "0"}, "2": {"field_id": "26", "field_type": "TRANSPORTER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "1", "field_name": "\u0432\u0445\u043e\u0434 \u0432 \u043f\u043e\u0434\u0437\u0435\u043c\u0435\u043b\u044c\u0435", "direction": "0"}, "3": {"field_id": "21", "field_type": "COMPLEXITY", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u0443\u0440\u0430\u0433\u0430\u043d", "direction": "0"}, "4": {"field_id": "27", "field_type": "TRANSPORTER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "1", "field_name": "\u0432\u044b\u0445\u043e\u0434 \u0438\u0437 \u043f\u043e\u0434\u0437\u0435\u043c\u0435\u043b\u044c\u044f", "direction": "4"}, "5": {"field_id": "29", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "1", "field_name": "\u0434\u0436\u0438\u043d\u043d", "direction": "0"}, "6": {"field_id": "1", "field_type": "EMPTY", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043f\u0443\u0441\u0442\u043e", "direction": "0"}, "7": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "8": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "9": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "10": {"field_id": "24", "field_type": "COMPLEXITY", "field_number": "2", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043b\u0438\u0430\u043d\u044b", "direction": "0"}}, "2": {"1": {"field_id": "12", "field_type": "GOLD", "field_number": "4", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "1", "field_name": "4 \u043c\u043e\u043d\u0435\u0442\u044b", "direction": "0"}, "2": {"field_id": "24", "field_type": "COMPLEXITY", "field_number": "2", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043b\u0438\u0430\u043d\u044b", "direction": "0"}, "3": {"field_id": "25", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "1", "field_name": "\u043d\u0430\u0441\u0442\u043e\u0439\u043a\u0430 \u043a\u043e\u0440\u043d\u044f \u043c\u0430\u043d\u0434\u0440\u0430\u0433\u043e\u0440\u044b", "direction": "0"}, "4": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "5": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "6": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "4"}, "7": {"field_id": "17", "field_type": "HELPER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "1", "field_name": "\u0441\u043b\u043e\u043d", "direction": "0"}, "8": {"field_id": "20", "field_type": "HELPER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "1", "field_name": "\u043f\u0435\u0449\u0435\u0440\u0430", "direction": "0"}, "9": {"field_id": "2", "field_type": "COMPLEXITY", "field_number": "0", "field_intervalRandomS": "1", "field_intervalRandomE": "3", "field_direction": "0", "field_isUnique": "0", "field_name": "\u0431\u043e\u043b\u043e\u0442\u043e", "direction": "0"}, "10": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "1"}}, "3": {"1": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "2": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "3": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "2"}, "4": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "2"}, "5": {"field_id": "15", "field_type": "COSTLY", "field_number": "0", "field_intervalRandomS": "1", "field_intervalRandomE": "2", "field_direction": "0", "field_isUnique": "1", "field_name": "\u0441\u0443\u043d\u0434\u0443\u043a \u043f\u0438\u0440\u0430\u0442\u0430", "direction": "0"}, "6": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "2"}, "7": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "8": {"field_id": "2", "field_type": "COMPLEXITY", "field_number": "0", "field_intervalRandomS": "1", "field_intervalRandomE": "3", "field_direction": "0", "field_isUnique": "0", "field_name": "\u0431\u043e\u043b\u043e\u0442\u043e", "direction": "0"}, "9": {"field_id": "11", "field_type": "GOLD", "field_number": "3", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "3 \u043c\u043e\u043d\u0435\u0442\u044b", "direction": "0"}, "10": {"field_id": "7", "field_type": "ALLY", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "1", "field_name": "\u043f\u044f\u0442\u043d\u0438\u0446\u0430", "direction": "0"}}, "4": {"1": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "4"}, "2": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "4"}, "3": {"field_id": "4", "field_type": "DIE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "1", "field_name": "\u0447\u0451\u0440\u043d\u0430\u044f \u043c\u0435\u0442\u043a\u0430", "direction": "0"}, "4": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "5": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "1"}, "6": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "4"}, "7": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "2"}, "8": {"field_id": "16", "field_type": "COSTLY", "field_number": "0", "field_intervalRandomS": "2", "field_intervalRandomE": "3", "field_direction": "0", "field_isUnique": "1", "field_name": "\u043a\u043b\u0430\u0434", "direction": "0"}, "9": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "4"}, "10": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}}, "5": {"1": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "2": {"field_id": "6", "field_type": "ALLY", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u0430\u0431\u043e\u0440\u0438\u0433\u0435\u043d", "direction": "0"}, "3": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "4"}, "4": {"field_id": "28", "field_type": "TRANSPORTER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0435\u0440\u0435\u0445\u043e\u0434", "direction": "4"}, "5": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "1"}, "6": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "4"}, "7": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "1"}, "8": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "9": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "4"}, "10": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "2"}}, "6": {"1": {"field_id": "24", "field_type": "COMPLEXITY", "field_number": "2", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043b\u0438\u0430\u043d\u044b", "direction": "0"}, "2": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "1"}, "3": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "4": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "5": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "4"}, "6": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "7": {"field_id": "24", "field_type": "COMPLEXITY", "field_number": "2", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043b\u0438\u0430\u043d\u044b", "direction": "0"}, "8": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "3"}, "9": {"field_id": "2", "field_type": "COMPLEXITY", "field_number": "0", "field_intervalRandomS": "1", "field_intervalRandomE": "3", "field_direction": "0", "field_isUnique": "0", "field_name": "\u0431\u043e\u043b\u043e\u0442\u043e", "direction": "0"}, "10": {"field_id": "28", "field_type": "TRANSPORTER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0435\u0440\u0435\u0445\u043e\u0434", "direction": "1"}}, "7": {"1": {"field_id": "28", "field_type": "TRANSPORTER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0435\u0440\u0435\u0445\u043e\u0434", "direction": "1"}, "2": {"field_id": "23", "field_type": "COMPLEXITY", "field_number": "1", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u0434\u0438\u043a\u0430\u044f \u043a\u043e\u043d\u043e\u043f\u043b\u044f", "direction": "0"}, "3": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "4"}, "4": {"field_id": "24", "field_type": "COMPLEXITY", "field_number": "2", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043b\u0438\u0430\u043d\u044b", "direction": "0"}, "5": {"field_id": "28", "field_type": "TRANSPORTER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0435\u0440\u0435\u0445\u043e\u0434", "direction": "1"}, "6": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "2"}, "7": {"field_id": "24", "field_type": "COMPLEXITY", "field_number": "2", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043b\u0438\u0430\u043d\u044b", "direction": "0"}, "8": {"field_id": "21", "field_type": "COMPLEXITY", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u0443\u0440\u0430\u0433\u0430\u043d", "direction": "0"}, "9": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "10": {"field_id": "24", "field_type": "COMPLEXITY", "field_number": "2", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043b\u0438\u0430\u043d\u044b", "direction": "0"}}, "8": {"1": {"field_id": "9", "field_type": "GOLD", "field_number": "1", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043c\u043e\u043d\u0435\u0442\u0430", "direction": "0"}, "2": {"field_id": "22", "field_type": "COMPLEXITY", "field_number": "0", "field_intervalRandomS": "1", "field_intervalRandomE": "2", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043b\u044c\u0432\u0438\u043d\u044b\u0439 \u043f\u0440\u0430\u0439\u0434", "direction": "0"}, "3": {"field_id": "9", "field_type": "GOLD", "field_number": "1", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043c\u043e\u043d\u0435\u0442\u0430", "direction": "0"}, "4": {"field_id": "2", "field_type": "COMPLEXITY", "field_number": "0", "field_intervalRandomS": "1", "field_intervalRandomE": "3", "field_direction": "0", "field_isUnique": "0", "field_name": "\u0431\u043e\u043b\u043e\u0442\u043e", "direction": "0"}, "5": {"field_id": "24", "field_type": "COMPLEXITY", "field_number": "2", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043b\u0438\u0430\u043d\u044b", "direction": "0"}, "6": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "3"}, "7": {"field_id": "21", "field_type": "COMPLEXITY", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u0443\u0440\u0430\u0433\u0430\u043d", "direction": "0"}, "8": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "9": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "10": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "3"}}, "9": {"1": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "2": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "4"}, "3": {"field_id": "5", "field_type": "DANGER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043a\u0430\u043f\u043a\u0430\u043d", "direction": "0"}, "4": {"field_id": "14", "field_type": "COSTLY", "field_number": "6", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "1", "field_name": "\u0441\u043e\u043a\u0440\u043e\u0432\u0438\u0449\u043d\u0438\u0446\u0430", "direction": "0"}, "5": {"field_id": "9", "field_type": "GOLD", "field_number": "1", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043c\u043e\u043d\u0435\u0442\u0430", "direction": "0"}, "6": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "1"}, "7": {"field_id": "3", "field_type": "DIE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "1", "field_name": "\u043a\u0440\u043e\u043a\u043e\u0434\u0438\u043b", "direction": "0"}, "8": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "4"}, "9": {"field_id": "21", "field_type": "COMPLEXITY", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u0443\u0440\u0430\u0433\u0430\u043d", "direction": "0"}, "10": {"field_id": "2", "field_type": "COMPLEXITY", "field_number": "0", "field_intervalRandomS": "1", "field_intervalRandomE": "3", "field_direction": "0", "field_isUnique": "0", "field_name": "\u0431\u043e\u043b\u043e\u0442\u043e", "direction": "0"}}, "10": {"1": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "1"}, "2": {"field_id": "2", "field_type": "COMPLEXITY", "field_number": "0", "field_intervalRandomS": "1", "field_intervalRandomE": "3", "field_direction": "0", "field_isUnique": "0", "field_name": "\u0431\u043e\u043b\u043e\u0442\u043e", "direction": "0"}, "3": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "3"}, "4": {"field_id": "18", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u043e\u0434\u0437\u043e\u0440\u043d\u0430\u044f \u0442\u0440\u0443\u0431\u0430", "direction": "1"}, "5": {"field_id": "21", "field_type": "COMPLEXITY", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u0443\u0440\u0430\u0433\u0430\u043d", "direction": "0"}, "6": {"field_id": "8", "field_type": "FEATURE", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0443\u0448\u043a\u0430", "direction": "3"}, "7": {"field_id": "13", "field_type": "GOLD", "field_number": "5", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "1", "field_name": "5 \u043c\u043e\u043d\u0435\u0442", "direction": "0"}, "8": {"field_id": "1", "field_type": "EMPTY", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043f\u0443\u0441\u0442\u043e", "direction": "0"}, "9": {"field_id": "28", "field_type": "TRANSPORTER", "field_number": "0", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "1", "field_isUnique": "0", "field_name": "\u043f\u0435\u0440\u0435\u0445\u043e\u0434", "direction": "1"}, "10": {"field_id": "24", "field_type": "COMPLEXITY", "field_number": "2", "field_intervalRandomS": "0", "field_intervalRandomE": "0", "field_direction": "0", "field_isUnique": "0", "field_name": "\u043b\u0438\u0430\u043d\u044b", "direction": "0"}}},
        model: new DGame.Models.Map({id: 1, gameId: 1}),
        thisPlayerId: 1,
        players: DGame.Models.List.Player.build([
          {"uid": "36011203", "id": "1", "name": "\u0410\u0440\u0442\u0451\u043c \u0417\u0430\u0432\u044c\u044f\u043b\u043e\u0432", "isOnline": "0", "isAdmin": "0", "sex": "m", "birthday": "1950-01-01", "country": "1", "city": "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a", "balance": "0", "exp": "0", "dtreg": "2013-04-04 09:25:27", "isBan": "0", "level": "1", "permanent": "1", "setScreen": "870", "gameId": "1", "gameCreator": "1"},
          {"uid": "207894585", "id": "2", "name": "Patricia Bernard", "isOnline": "0", "isAdmin": "0", "sex": "f", "birthday": "1989-06-11", "country": "0", "city": "", "balance": "0", "exp": "0", "dtreg": "2013-04-09 14:40:46", "isBan": "0", "level": "1", "permanent": "1", "setScreen": "890", "gameId": "2", "gameCreator": "0"}
        ], DGame.Models.Player),
        units: [
          {"id": "1", "childs": [
            {"id": "5", "name": "\u041e\u043b\u0438\u0432\u044c\u0435 \u043b\u0435 \u0412\u0430\u0441\u0441\u0435\u0440", "description": "\u0424\u0440\u0430\u043d\u0446\u0443\u0437 \u043f\u043e \u043f\u0440\u043e\u0438\u0441\u0445\u043e\u0436\u0434\u0435\u043d\u0438\u044e. \u0421\u043e\u0432\u0435\u0440\u0448\u0430\u043b \u0440\u0435\u0439\u0434\u044b \u043f\u043e \u0410\u0442\u043b\u0430\u043d\u0442\u0438\u0447\u0435\u0441\u043a\u043e\u043c\u0443 \u043e\u043a\u0435\u0430\u043d\u0443, \u043f\u043e\u0442\u043e\u043c \u043f\u0435\u0440\u0435\u0448\u0451\u043b \u0432 \u0418\u043d\u0434\u0438\u0439\u0441\u043a\u0438\u0439. \u041f\u043e \u043b\u0435\u0433\u0435\u043d\u0434\u0435 \u0437\u0430\u0440\u044b\u043b \u043a\u0440\u0443\u043f\u043d\u044b\u0439 \u043a\u043b\u0430\u0434 \u043d\u0430 \u0421\u0435\u0439\u0448\u0435\u043b\u044c\u0441\u043a\u0438\u0445 \u043e\u0441\u0442\u0440\u043e\u0432\u0430\u0445.", "captain": "1"},
            {"id": "11", "name": "\u0442\u043e\u0449\u0438\u0439 \u0414\u0436\u0435\u043a", "description": "\u041e\u0442\u043f\u0435\u0442\u044b\u0439 \u0443\u0433\u043e\u043b\u043e\u0432\u043d\u0438\u043a. \u041d\u0430 \u0435\u0433\u043e \u0441\u0447\u0435\u0442\u0443 \u0434\u0435\u0441\u044f\u0442\u043a\u0438 \u0437\u0430\u0433\u0443\u0431\u043b\u0435\u043d\u043d\u044b\u0445 \u0436\u0438\u0437\u043d\u0435\u0439.", "captain": "0"},
            {"id": "19", "name": "\u041c\u043e\u043a\u0440\u044b\u0439 \u042d\u0434\u0434", "description": "\u0414\u0430\u0436\u0435 \u0441\u0440\u0435\u0434\u0438 \u043f\u0438\u0440\u0430\u0442\u043e\u0432 \u0432\u044b\u0434\u0435\u043b\u044f\u0435\u0442\u0441\u044f \u0441\u0432\u043e\u0438\u043c \u043f\u044c\u044f\u043d\u0441\u0442\u0432\u043e\u043c.", "captain": "0"}
          ]},
          {"id": "2", "childs": [
            {"id": "2", "name": "\u0424\u0440\u0435\u043d\u0441\u0438\u0441 \u0414\u0440\u0435\u0439\u043a", "description": "\u0421 18-\u0442\u0438 \u043b\u0435\u0442 \u0431\u044b\u043b \u043a\u0430\u043f\u0438\u0442\u0430\u043d\u043e\u043c. \u0417\u0430\u0445\u0432\u0430\u0442\u0438\u043b \u0438\u0441\u043f\u0430\u043d\u0441\u043a\u0438\u0439 \"\u0421\u0435\u0440\u0435\u0431\u0440\u044f\u043d\u044b\u0439 \u043a\u0430\u0440\u0430\u0432\u0430\u043d\"(\u0431\u043e\u043b\u0435\u0435 30-\u0442\u0438 \u0442\u043e\u043d\u043d \u0441\u0435\u0440\u0435\u0431\u0440\u0430). \u0421\u043e\u0432\u0435\u0440\u0448\u0438\u043b \u043a\u0440\u0443\u0433\u043e\u0441\u0432\u0435\u0442\u043d\u043e\u0435 \u043f\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u0435 \u0438 \u0443\u0447\u0430\u0441\u0442\u0432\u043e\u0432\u0430\u043b \u0432 \u0440\u0430\u0437\u0433\u0440\u043e\u043c\u0435 \"\u041d\u0435\u043f\u043e\u0431\u0435\u0434\u0438\u043c\u043e\u0439 \u0430\u0440\u043c\u0430\u0434\u044b\".", "captain": "1"},
            {"id": "14", "name": "\u0410\u043d\u0430\u043a\u0432\u0430\u0434", "description": "\u0420\u043e\u0434\u0438\u043b\u0441\u044f \u0432 \u0438\u043d\u0434\u0435\u0439\u0441\u043a\u043e\u043c \u043f\u043b\u0435\u043c\u0435\u043d\u0438. \u0411\u044b\u043b \u0438\u0437\u0433\u043d\u0430\u043d \u0437\u0430 \u0443\u0431\u0438\u0439\u0441\u0442\u0432\u043e.", "captain": "0"},
            {"id": "15", "name": "\u041c\u044f\u0441\u043d\u0438\u043a", "description": "\u041d\u0438\u043a\u0442\u043e \u043d\u0435 \u0437\u043d\u0430\u0435\u0442 \u0435\u0433\u043e \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u0433\u043e \u0438\u043c\u0435\u043d\u0438. \u041c\u0430\u0441\u0442\u0435\u0440\u0441\u043a\u0438 \u0432\u043b\u0430\u0434\u0435\u0435\u0442 \u043c\u044f\u0441\u043d\u0438\u0446\u043a\u0438\u043c \u0442\u0435\u0441\u0430\u043a\u043e\u043c.", "captain": "0"}
          ]}
        ]            });
    } else {
      alert('Sorry, your browser doesn\'t support CSS3 animation.');
    }

  });
</script>
<div id="container">
  <div id="putShip" style="display: none;">
    <div class="card ship"></div>
  </div>
  <div id="confirmAction" style="display: none;"></div>

  <div id="blockDisplay" style="width: 1400px; height: 1400px;"></div>
  <div id="statusBar" style="height: 10px;">
    <div class="info"></div>
    <div class="showhide">
      <div class="arrows show">
        <p class="arrow"></p>

        <p class="arrow"></p>
      </div>
    </div>
  </div>
  <div id="controlBar" style="top: 820px; display: block;">
    <div class="finishStep"></div>
  </div>
  <div id="game" style="width: 1400px; height: 1400px; margin-top: 0px; margin-left: 0px;">
    <div class="card sea" data-posX="0" data-posY="0" style="left: 0px; top: 0px;"></div>
    <div class="card sea" data-posX="0" data-posY="1" style="left: 0px; top: 120px;"></div>
    <div class="card sea" data-posX="0" data-posY="2" style="left: 0px; top: 240px;"></div>
    <div class="card sea" data-posX="0" data-posY="3" style="left: 0px; top: 360px;"></div>
    <div class="card sea" data-posX="0" data-posY="4" style="left: 0px; top: 480px;"></div>
    <div class="card sea" data-posX="0" data-posY="5" style="left: 0px; top: 600px;"></div>
    <div class="card sea" data-posX="0" data-posY="6" style="left: 0px; top: 720px;"></div>
    <div class="card sea" data-posX="0" data-posY="7" style="left: 0px; top: 840px;"></div>
    <div class="card sea" data-posX="0" data-posY="8" style="left: 0px; top: 960px;"></div>
    <div class="card sea" data-posX="0" data-posY="9" style="left: 0px; top: 1080px;"></div>
    <div class="card sea" data-posX="0" data-posY="10" style="left: 0px; top: 1200px;"></div>
    <div class="card sea" data-posX="0" data-posY="11" style="left: 0px; top: 1320px;"></div>
    <div class="card sea" data-posX="1" data-posY="0" style="left: 120px; top: 0px;"></div>
    <div class="card sea" data-posX="1" data-posY="11" style="left: 120px; top: 1320px;"></div>
    <div class="card sea" data-posX="2" data-posY="0" style="left: 240px; top: 0px;"></div>
    <div class="card sea" data-posX="2" data-posY="11" style="left: 240px; top: 1320px;"></div>
    <div class="card sea" data-posX="3" data-posY="0" style="left: 360px; top: 0px;"></div>
    <div class="card sea" data-posX="3" data-posY="11" style="left: 360px; top: 1320px;"></div>
    <div class="card sea" data-posX="4" data-posY="0" style="left: 480px; top: 0px;"></div>
    <div class="card sea" data-posX="4" data-posY="11" style="left: 480px; top: 1320px;"></div>
    <div class="card sea" data-posX="5" data-posY="0" style="left: 600px; top: 0px;"></div>
    <div class="card sea" data-posX="5" data-posY="11" style="left: 600px; top: 1320px;"></div>
    <div class="card sea" data-posX="6" data-posY="0" style="left: 720px; top: 0px;"></div>
    <div class="card sea" data-posX="6" data-posY="11" style="left: 720px; top: 1320px;"></div>
    <div class="card sea" data-posX="7" data-posY="0" style="left: 840px; top: 0px;"></div>
    <div class="card sea" data-posX="7" data-posY="11" style="left: 840px; top: 1320px;"></div>
    <div class="card sea" data-posX="8" data-posY="0" style="left: 960px; top: 0px;"></div>
    <div class="card sea" data-posX="8" data-posY="11" style="left: 960px; top: 1320px;"></div>
    <div class="card sea" data-posX="9" data-posY="0" style="left: 1080px; top: 0px;"></div>
    <div class="card sea" data-posX="9" data-posY="11" style="left: 1080px; top: 1320px;"></div>
    <div class="card sea" data-posX="10" data-posY="0" style="left: 1200px; top: 0px;"></div>
    <div class="card sea" data-posX="10" data-posY="11" style="left: 1200px; top: 1320px;"></div>
    <div class="card sea" data-posX="11" data-posY="0" style="left: 1320px; top: 0px;"></div>
    <div class="card sea" data-posX="11" data-posY="1" style="left: 1320px; top: 120px;"></div>
    <div class="card sea" data-posX="11" data-posY="2" style="left: 1320px; top: 240px;"></div>
    <div class="card sea" data-posX="11" data-posY="3" style="left: 1320px; top: 360px;"></div>
    <div class="card sea" data-posX="11" data-posY="4" style="left: 1320px; top: 480px;"></div>
    <div class="card sea" data-posX="11" data-posY="5" style="left: 1320px; top: 600px;"></div>
    <div class="card sea" data-posX="11" data-posY="6" style="left: 1320px; top: 720px;"></div>
    <div class="card sea" data-posX="11" data-posY="7" style="left: 1320px; top: 840px;"></div>
    <div class="card sea" data-posX="11" data-posY="8" style="left: 1320px; top: 960px;"></div>
    <div class="card sea" data-posX="11" data-posY="9" style="left: 1320px; top: 1080px;"></div>
    <div class="card sea" data-posX="11" data-posY="10" style="left: 1320px; top: 1200px;"></div>
    <div class="card sea" data-posX="11" data-posY="11" style="left: 1320px; top: 1320px;"></div>
    <div id="map" style="width: 1200px; height: 1200px;"></div>
  </div>
</div>
<script type="text/x-jquery-tmpl" id="TMPL_StatusBarPirateInfo">
    <img class="piratesImg" src="/st/img/pirates/${id}.png">
    <div class="piratesDesc" style="width: 720px;">
        {{if my == 1}}
        <div class="piratesProp">очки перемещения: ${steps}</div>
        <div style="clear: right;"></div>
        <div class="unchange"><p>&plus;</p></div>
        <p style="margin-top: -7px;">${name}</p>
        {{else}}
        <p>${name}</p>
        {{/if}}
        <p>${description}</p>
    </div>
    {{if captain == 1}}<img class="piratesCap" src="/st/img/captain.png">{{/if}}

</script>
<script type="text/x-jquery-tmpl" id="TMPL_StatusBarEnemyShipInfo">
    <img class="piratesImg" src="${photo_medium}" />
    <p class="piratesDesc" style="width: 720px;">Корабль игрока ${name}</p>

</script>
<script type="text/x-jquery-tmpl" id="TMPL_StatusBarMyShipInfo">
    <img class="piratesImg" src="/st/img/ship.png">
    {{if steps == 0}}
    <p class="piratesDesc" style="width: 720px;">У вашего корабля кончились ходы.</p>
    {{else}}
    <p class="piratesDesc" style="width: 720px;">Ваш корабль. Можете перемещать его вдоль острова.</p>
    {{/if}}
    <div class="unchange" style="margin-top: -31px;"><p>&plus;</p></div>

</script>
<script type="text/x-jquery-tmpl" id="TMPL_StatusBarErrors">
    {{if error == 'MOVING_ERROR'}}
    <img class="piratesImg" src="/st/img/pirates/${id}.png">
    <div class="piratesDesc" style="width: 720px;"><p>${name}</p>Не может туда переместиться.</div>
    {{if captain == 1}}<img class="piratesCap" src="/st/img/captain.png">{{/if}}
    <div class="unchange" style="margin-top: -31px;"><p>&plus;</p></div>
    {{else error == 'SHIP_MOVING_LAND_ERROR'}}
    <img class="piratesImg" src="/st/img/ship.png">
    <div class="piratesDesc" style="margin-top: 15px; width: 720px;">Корабль не может вылезти на сушу.</div>
    <div class="unchange" style="margin-top: -31px;"><p>&plus;</p></div>
    {{else error == 'SHIP_MOVING_ERROR'}}
    <img class="piratesImg" src="/st/img/ship.png">
    <div class="piratesDesc" style="margin-top: 15px; width: 720px;">Корабль не может туда переместиться.</div>
    <div class="unchange" style="margin-top: -31px;"><p>&plus;</p></div>
    {{/if}}

</script>

</body>
</html>