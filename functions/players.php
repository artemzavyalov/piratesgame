<?php

/**
 * Начинаем ожидание пользователей в игру
 * @param $userId int
 *          ID создателя игры
 * @param $mapId int
 *          ID игровой карты
 * @param $players array
 *          список игроков
 *
 * @return int
 *          ID записи с ожиданием
 **/
function addGame($userId, $mapId, $players)
{
  global $dbWrite;

  $inserts = array(
    array($mapId, $userId, 'CONNECT', 1)
  );
  foreach ($players as $playerId) {
    $status = 'WAIT';
    if ($playerId == '0') $status = 'CONNECT';
    $inserts[] = array($mapId, $playerId, $status, 0);
  }
  $sql = "INSERT INTO `game` (`game_mapId`,`game_playerId`, `game_status`, `game_creator`) VALUES ?values";
  $dbWrite->query($sql, array($inserts));
  return TRUE;
}

/**
 * Изменить параметры игры
 * @param $params array
 *          параметры
 * @param $gameId int
 *
 * @return bool
 **/
function editGame($params, $gameId)
{
  global $dbWrite;

  $sql = "UPDATE `game` SET ?set WHERE `game_id` = ?i LIMIT 1";
  $result = $dbWrite->query($sql, array($params, $gameId), 'ar');
  return $result;
}

/**
 * Получает игру по ID
 * @param $gameId int
 *
 * @return int
 **/
function getGame($gameId)
{
  global $dbRead;

  $sql = "SELECT * FROM `game` WHERE `game_id` = ?i LIMIT 1";
  $game = $dbRead->query($sql, array($gameId), 'row');
  return $game;
}

/**
 * Получает ID игры
 * @param $playerId int
 * @param $mapId int
 *
 * @return int
 **/
function getGameId($playerId, $mapId)
{
  global $dbRead;

  $sql = "SELECT `game_id` FROM `game` WHERE `game_mapId` = ?i AND `game_playerId` = ?i";
  $gameId = $dbRead->query($sql, array($mapId, $playerId), 'el');
  return $gameId;
}

/**
 * Получает список игр
 * @param $mapId int
 *          ID карты
 *
 * @return int
 **/
function getGames($mapId)
{
  global $dbRead;

  $sql = "SELECT * FROM `game` WHERE `game_mapId` = ?i ORDER BY `game_creator` DESC, `game_id` DESC";
  $games = $dbRead->query($sql, array($mapId), 'assoc');
  return $games;
}

/**
 * Список игр где ждут пользователя
 * @param $userId int
 *          ID пользователя которого ждут
 *
 * @return array
 *          список игр
 **/
function getGamePlayers($userId)
{
  global $dbRead;

  $sql = "SELECT * FROM `game`
                        INNER JOIN `maps` ON `game_mapId` = `map_id`
                        INNER JOIN `users` ON `map_userId` = `user_id`
                WHERE `game_playerId` = ?i && `game_creator` = 0";
  $games = $dbRead->query($sql, array($userId), 'assoc');
  return $games;
}

/**
 * Список игр где пользователь ждёт других
 * @param $userId int
 *          ID пользователя
 *
 * @return array
 *          список игр
 **/
function getGamePlayer($userId)
{
  global $dbRead;

  $sql = "SELECT * FROM `game`
                        INNER JOIN `maps` ON `game_mapId` = `map_id`
                        INNER JOIN `users` ON `game_playerId` = `user_id`
                WHERE `game_playerId` = ?i && `game_creator` = 1";
  $games = $dbRead->query($sql, array($userId), 'assoc');
  return $games;
}

/**
 * Список игроков карты
 * @param $mapId int
 *          ID карты
 *
 * @return array
 *          список игроков
 **/
function getPlayersFromGame($mapId)
{
  global $dbRead;

  $sql = "SELECT `link_authUid` as `user_uid`, `users`.*, `game_id` as `user_gameId`, `game_creator` as `user_gameCreator` FROM `game`
                        INNER JOIN `users` ON `game_playerId` = `user_id`
                        INNER JOIN `user_links` ON `game_playerId` = `link_userId`
                WHERE `game_mapId` = ?i";
  $games = $dbRead->query($sql, array($mapId), 'assoc');
  return $games;
}

/**
 * Активна ли данная игра
 * @param $gameId int
 *          ID игры
 *
 * @return bool
 **/
function isGameActive($gameId)
{
  global $dbRead;

  $sql = "SELECT * FROM `game` WHERE `game_id` = ?i AND `game_progress` = 'ACTIVE' LIMIT 1";
  $game = $dbRead->query($sql, array($gameId), 'num');
  return (bool)$game;
}

/**
 * Получить следующий ход
 * @param $gameId int
 *          ID игры
 * @param $mapId int
 *          ID карты
 *
 * @return array
 **/
function nextGamePlayer($gameId, $mapId)
{
  global $dbRead;

  $sql = "SELECT * FROM `game` WHERE `game_id` > ?i AND `game_mapId` = ?i LIMIT 1";
  $game = $dbRead->query($sql, array($gameId, $mapId), 'row');
  if (!$game) {
    $sql = "SELECT * FROM `game` WHERE `game_mapId` = ?i ORDER BY `game_id` ASC LIMIT 1";
    $game = $dbRead->query($sql, array($mapId), 'row');
  }
  return $game;
}

/**
 * Завершена ли стадия игры
 * @param $stage string
 *          стадия
 * @param $mapId int
 *          ID карты
 *
 * @return bool
 **/
function isMapFullStage($stage, $mapId)
{
  global $dbRead;

  $sql = "SELECT * FROM `game` WHERE `game_stage` != ? AND `game_mapId` = ?i LIMIT 1";
  $game = $dbRead->query($sql, array($stage, $mapId), 'num');
  return !(bool)$game;
}
