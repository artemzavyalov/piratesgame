<?php

function arrayTo2dArray($arr, $sizeX, $sizeY)
{
  $ret = array();
  for ($x = 1; $x <= $sizeX; $x++) {
    for ($y = 1; $y <= $sizeY; $y++) {
      $elem = each($arr);
      $ret[$x][$y] = $elem['value'];
    }
  }
  return $ret;
}

function randomKeyByArray($randomSplits, $splitNumber)
{
  $prev = 0;
  $splitParts = 100 / $splitNumber;
  $r = rand(0, 100);
  $r = $r / $splitParts;
  foreach ($randomSplits as $k => $v) {
    $v = $v / $splitParts;
    if ($r >= $prev && $r <= $prev + $v) {
      return $k;
    } else {
      $prev += $v;
    }
  }
}

function checkEmpties($map, $counts)
{
  $restructKeys = array();
  $max = 0;
  $maxKey = '';
  foreach ($counts as $k => $v) {
    if ($max < $v) {
      $max = $v;
      $maxKey = $k;
    }
    if ($v == 0) {
      $restructKeys[] = $k;
    }
  }
  foreach ($restructKeys as $key) {
    $rKeys = getRandomTwoDimensional($map, $maxKey);
    $map[$rKeys[0]][$rKeys[1]] = $key;
  }
  return $map;
}

function fillMapFields($fields, $map)
{
  $result = array('goldSumm' => 0);
  foreach ($map as $kl => $line) {
    foreach ($line as $k => $field) {
      $key = 0;
      switch ($field) {
        case'COSTLY':
        case'GOLD':
          $key = array_rand($fields[$field]);
          $map[$kl][$k] = $fields[$field][$key];
          $result['goldSumm'] += $fields[$field][$key]['field_number'];
          break;
        default:
          $key = array_rand($fields[$field]);
          if ($field == '') {

          }
          $map[$kl][$k] = $fields[$field][$key];
          break;
      }
      if ($fields[$field][$key]['field_isUnique'] == '1') {
        unset($fields[$field][$key]);
        $fields[$field] = array_values($fields[$field]);
      }
      if ($fields[$field][$key]['field_direction'] == '1') {
        $map[$kl][$k]['direction'] = rand(1, 4);
      }
    }
  }
  $result['map'] = $map;
  return $result;
}

function getRandomTwoDimensional($arr, $val = FALSE)
{
  $randArrKey = array_rand($arr);
  $ret = array();
  if ($val) {
    $f = FALSE;
    while (($f = array_search($val, $arr[$randArrKey])) === FALSE) {
      $randArrKey = array_rand($arr);
    }
    $ret = array($randArrKey, $f);
  }
  return $ret;
}

function array2dConvertKeys($arr, $keyToConvert)
{
  $res = array();
  foreach ($arr as $k => $v) {
    $res[$v[$keyToConvert]][] = $v;
  }
  return $res;
}

/**
 * Создать карту
 * @param $userId int
 *          ID создателя игры
 * @param $mapName string
 *          Имя карты
 * @param $sizeX int
 *          Размер по вертикали
 * @param $sizeY int
 *          Размер по горизонтали
 * @param $fields array
 *          Список полей
 *
 * @return int
 *          ID карты
 **/
function addMap($userId, $mapName, $sizeX, $sizeY, $fields)
{
  global $dbWrite;

  $insert = array(
    'map_name' => $mapName,
    'map_verticalFields' => $sizeX,
    'map_horizontalFields' => $sizeY,
    'map_userId' => $userId,
  );
  $sql = "INSERT INTO `maps` SET ?set";
  $mapId = $dbWrite->query($sql, array($insert), 'id');
  if ($mapId) {
    $inserts = array();
    $x = 0;
    $y = 0;
    $num = 0;
    foreach ($fields as $field) {
      $x++;
      $y = 0;
      foreach ($field as $element) {
        $num++;
        $y++;
        $insert = array($mapId, $num, $x, $y, $element['field_id']);
        if (isset($element['direction'])) {
          $insert[] = $element['direction'];
        } else {
          $insert[] = 0;
        }
        $inserts[] = $insert;
      }
    }
    $sql = "INSERT INTO `maps_fields` (`maps_field_mapId`,`maps_field_fieldId`,`maps_field_positionX`,
                `maps_field_positionY`,`maps_field_type`,`maps_field_direction`) VALUES ?values";
    $dbWrite->query($sql, array($inserts));
  }
  return $mapId;
}

/**
 * Список активных карт созданных пользователем
 * @param $userId int
 *          ID пользователя
 *
 * @return array
 *          список ожидающих игр
 **/
function getMaps($userId)
{
  global $dbRead;

  $sql = "SELECT * FROM `maps` WHERE `map_userId` = ?i";
  $maps = $dbRead->query($sql, array($userId), 'assoc');
  return $maps;
}

/**
 * Получить карту
 * @param $mapId int
 *          ID карты
 *
 * @return array
 *          карта
 **/
function getMap($mapId)
{
  global $dbRead;

  $sql = "SELECT * FROM `maps`
                INNER JOIN `maps_fields` ON `map_id` = `maps_field_mapId`
                WHERE `map_id` = ?i";
  $map = $dbRead->query($sql, array($mapId), 'assoc');
  $map = mysqlTwoDimensional($map, 'map_id', 'map_');
  return $map[0];
}

/**
 * Добавляет пиратов в игры
 * @param $mapId int
 *          ID карты
 *
 * @param $gameIds array
 *          ID игр
 *
 * @return bool
 **/
function addPiratesToGames($mapId, $gameIds = array())
{
  global $dbRead, $dbWrite, $config;

  if ($mapId) {
    $games = getGames($mapId);
    $gameIds = array();
    foreach ($games as $game) {
      $gameIds[] = $game['game_id'];
    }
  }

  $countGames = count($gameIds);
  $piratesWithoutCaps = $config['game']['COUNT_PIRATES'] - 1;

  $sql = "SELECT * FROM `pirates` WHERE `pirate_captain` = 1 ORDER BY RAND() LIMIT ?i";
  $captains = $dbRead->query($sql, array($countGames), 'assoc');

  $sql = "SELECT * FROM `pirates` WHERE `pirate_captain` = 0 ORDER BY RAND() LIMIT ?i";
  $units = $dbRead->query($sql, array($countGames * $piratesWithoutCaps), 'assoc');

  if (count($captains) == $countGames && count($units) == $countGames * $piratesWithoutCaps) {

    $inserts = array();
    foreach ($gameIds as $id) {
      list($key, $captain) = each($captains);
      $inserts[] = array($id, $captain['pirate_id']);
    }
    foreach ($gameIds as $id) {
      for ($i = 1; $i <= $piratesWithoutCaps; $i++) {
        list($key, $unit) = each($units);
        $inserts[] = array($id, $unit['pirate_id']);
      }
    }
    $sql = "INSERT INTO `game_pirate` (`gp_game`,`gp_pirate`) VALUES ?values";
    $dbWrite->query($sql, array($inserts));

    return true;
  } else {
    return false;
  }
}

/**
 * Возвращает пиратов данной карты
 * @param $mapId int
 *          ID карты
 *
 * @return array
 **/
function getPiratesFromGame($mapId)
{
  global $dbRead;

  $sql = "SELECT `game`.`game_id`, `pirates`.* FROM `game_pirate`
                INNER JOIN `pirates` ON `gp_pirate` = `pirate_id`
                INNER JOIN `game` ON `gp_game` = `game_id`
                WHERE `game_mapId` = ?i";
  $pirates = $dbRead->query($sql, array($mapId), 'assoc');
  return $pirates;
}
