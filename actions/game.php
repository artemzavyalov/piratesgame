<?php

if(!isset($curUser) || empty($curUser)) die('NOT AUTH');

$players =      isset($_REQUEST['players'])         ? $_REQUEST['players']          : array();
$mapId =        isset($_REQUEST['mapId'])           ? $_REQUEST['mapId']            : 0;
$gameId =       isset($_REQUEST['gameId'])          ? $_REQUEST['gameId']           : 0;
$comp =         isset($_REQUEST['comp'])            ? $_REQUEST['comp']             : false;

$userId = $curUser['user_id'];

$map = array();
$fields = $dbRead->query("SELECT * FROM `fields`")->assoc();
$params = $config['buildMap'];
$sizes = $params['sizes'];
$counts = $params['counts'];
$contWidth = $sizes['vertical'] * 120;
$contHeight = $sizes['horizontal'] * 120;

if($comp) {// Играем с компом

    $fields = array2dConvertKeys($fields, 'field_type');
    $builded = array_merge($params['percents'], $params['counts']);
    foreach($builded as $k => $v){ $builded[$k] = 0; }

    for($i = 1; $i <= $sizes['vertical'] * $sizes['horizontal']; $i++) {
        if(count($counts) > 0) {
            $type = each($counts);
            if($type['value'] > 0) {
                $map[$i] = $type['key'];
                $counts[$type['key']]--;
                if($counts[$type['key']] == 0) {
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

    $res = @fillMapFields($fields, $map);
    $map = $res['map'];

    $mapId = addMap($userId, '', $sizes['vertical'], $sizes['horizontal'], $map);
    if($mapId) {
        foreach($players as $k => $uid) {
            $players[$k] = checkUserLink(1, $uid);
        }
        $players[] = '0';// добавляем бота
        addGame($userId, $mapId, $players);
        $gameId = getGameId($userId, $mapId);

        addPiratesToGames($mapId);

        $players = getPlayersFromGame($mapId);

        $units = cropKeys(mysqlTwoDimensional(getPiratesFromGame($mapId), 'game_id', 'game_'));
    }

} else {// Играем с человеком

    if($mapId) {// Подключаемся к игре
        $fields = array2dConvertKeys($fields, 'field_id');
        $fullMap = getMap($mapId);
        $mapOneDimensional = $fullMap['childs'];
        $mapTwoDimensional = array();
        foreach($mapOneDimensional as $element) {
            $x = $element['maps_field_positionX'];
            $y = $element['maps_field_positionY'];
            $mapTwoDimensional[$x][$y] = array_merge(
                $fields[$element['maps_field_type']][0],
                array('direction' => $element['maps_field_direction'])
            );
        }
        $map = $mapTwoDimensional;

        editGame(array('game_status' => 'CONNECT'), $gameId);

        $players = getPlayersFromGame($mapId);

        $units = cropKeys(mysqlTwoDimensional(getPiratesFromGame($mapId), 'game_id', 'game_'));

    } else {// Создаём игру
        $fields = array2dConvertKeys($fields, 'field_type');
        $builded = array_merge($params['percents'], $params['counts']);
        foreach($builded as $k => $v){ $builded[$k] = 0; }

        for($i = 1; $i <= $sizes['vertical'] * $sizes['horizontal']; $i++) {
            if(count($counts) > 0) {
                $type = each($counts);
                if($type['value'] > 0) {
                    $map[$i] = $type['key'];
                    $counts[$type['key']]--;
                    if($counts[$type['key']] == 0) {
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

        $res = @fillMapFields($fields, $map);
        $map = $res['map'];

        $mapId = addMap($userId, '', $sizes['vertical'], $sizes['horizontal'], $map);
        if($mapId) {
            foreach($players as $k => $uid) {
                $players[$k] = checkUserLink(1, $uid);
            }
            addGame($userId, $mapId, $players);
            $gameId = getGameId($userId, $mapId);

            addPiratesToGames($mapId);

            $players = getPlayersFromGame($mapId);

            $units = cropKeys(mysqlTwoDimensional(getPiratesFromGame($mapId), 'game_id', 'game_'));
        }
    }

}
