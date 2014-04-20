<?php

if (empty($curUser)) die('NOT AUTH');

$mapId = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;
$gameId = isset($_REQUEST['gameId']) ? $_REQUEST['gameId'] : 0;
$ids = isset($_REQUEST['ids']) ? $_REQUEST['ids'] : array();

$gameReady = isset($_REQUEST['gameReady']) ? $_REQUEST['gameReady'] : FALSE;
$changeShip = isset($_REQUEST['changeShip']) ? $_REQUEST['changeShip'] : FALSE;
$shipReady = isset($_REQUEST['shipReady']) ? $_REQUEST['shipReady'] : FALSE;
$changeStep = isset($_REQUEST['changeStep']) ? $_REQUEST['changeStep'] : FALSE;

$putShip = isset($_REQUEST['putShip']) ? $_REQUEST['putShip'] : FALSE;
$putStep = isset($_REQUEST['putStep']) ? $_REQUEST['putStep'] : FALSE;
$breakStep = isset($_REQUEST['breakStep']) ? $_REQUEST['breakStep'] : FALSE;

$userId = $curUser['user_id'];
$answer = array();

if ($gameId) {
  if ($putShip) {
    if (isGameActive($gameId)) {
      editGame(array(
        'game_stage' => 'SHIP',
        'game_progress' => 'PASSIVE',
        'game_lastAction' => json_encode(array('putShip' => $putShip))
      ), $gameId);

      if (!isMapFullStage('SHIP', $mapId)) {
        $game = nextGamePlayer($gameId, $mapId);
        editGame(array('game_progress' => 'ACTIVE'), $game['game_id']);
      }
    } else {
      die('YOU ARE BAD GUY!');
    }
  }
  if ($putStep) {
    $game = getGame($gameId);
    if ($game['game_progress'] == 'ACTIVE') {
      if ($game['game_lastAction'] == '') {
        editGame(array(
          'game_stage' => 'STEP',
          'game_lastAction' => json_encode(array($putStep))
        ), $gameId);
      } else {
        $action = array_merge(json_decode($game['game_lastAction'], TRUE), array($putStep));
        editGame(array(
          'game_lastAction' => json_encode($action)
        ), $gameId);
      }
    } else {
      die('YOU ARE BAD GUY!');
    }
  }
  if ($breakStep) {
    if (isGameActive($gameId)) {
      editGame(array('game_progress' => 'PASSIVE'), $gameId);
      $next = nextGamePlayer($gameId, $mapId);
      editGame(array('game_progress' => 'ACTIVE', 'game_lastAction' => ''), $next['game_id']);
      $answer['breakStep'] = cropKeys($next);
    } else {
      die('YOU ARE BAD GUY!');
    }
  }
}

if ($mapId) {
  if ($gameReady) {
    $games = getGames($mapId);
    $isCreator = FALSE;
    $setGameActive = 0;
    foreach ($games as $game) {
      if ($game['game_playerId'] == $userId && $game['game_stage'] == 'START' && $game['game_creator'] == 1) {
        $isCreator = TRUE;
        if ($game['game_progress'] == 'PASSIVE') {
          $setGameActive = $game['game_id'];
        }
      }
      if ($game['game_status'] != 'CONNECT') {
        $gameReady = FALSE;
      }
    }
    if ($gameReady) {
      if ($isCreator) {
        $answer['gameReady'] = 'CHANGE_SHIP';
      } else {
        $answer['gameReady'] = TRUE;
      }
      if ($setGameActive) {
        editGame(array('game_progress' => 'ACTIVE'), $setGameActive);
      }
    }
  }
  if ($changeShip) {
    $games = getGames($mapId);
    $res = array();
    foreach ($games as $game) {
      if ($game['game_playerId'] != $userId && $game['game_stage'] == 'SHIP') {
        if ($game['game_lastAction'] != '') {
          $res[$game['game_playerId']] = array_merge(json_decode($game['game_lastAction'], TRUE), array(
            'gameId' => $game['game_id'],
            'playerId' => $game['game_playerId']
          ));
        }
      }
      if ($game['game_playerId'] == $userId && $game['game_progress'] == 'ACTIVE') {
        $res['CHANGE_SHIP'] = TRUE;
      }
    }
    if ($res) {
      $answer['changeShip'] = $res;
    }
  }
  if ($shipReady) {
    $games = getGames($mapId);
    $isCreator = FALSE;
    $setGameActive = 0;
    foreach ($games as $game) {
      if ($game['game_playerId'] == $userId && strlen($game['game_lastAction'])) {
        editGame(array('game_lastAction' => ''), $game['game_id']);
      }
      if ($game['game_playerId'] == $userId && $game['game_creator'] == 1) {
        $isCreator = TRUE;
        if ($game['game_progress'] == 'PASSIVE') {
          $setGameActive = $game['game_id'];
        }
      }
      if ($game['game_stage'] != 'SHIP') {
        $shipReady = FALSE;
      }
    }
    if ($shipReady) {
      if ($isCreator) {
        $answer['shipReady'] = 'CHANGE_STEP';
      } else {
        $answer['shipReady'] = TRUE;
      }
      if ($setGameActive) {
        editGame(array('game_progress' => 'ACTIVE'), $setGameActive);
      }
    }
  }
  if ($changeStep) {
    $games = getGames($mapId);
    $res = array('actions' => array());
    foreach ($games as $game) {
      if ($game['game_playerId'] != $userId && $game['game_stage'] == 'STEP') {
        if ($game['game_lastAction'] != '') {
          $res['actions'][$game['game_playerId']] = array_merge(json_decode($game['game_lastAction'], TRUE), array(
            'gameId' => $game['game_id'],
            'playerId' => $game['game_playerId']
          ));
        }
      }
      if ($game['game_progress'] == 'ACTIVE' && $game['game_playerId'] == $userId && $game['game_lastAction'] == '') {
        $res['putStep'] = TRUE;
      }
    }
    if ($res) {
      $answer['changeStep'] = $res;
    }
  }
}

echo json_encode($answer);
die;
