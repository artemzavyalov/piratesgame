<?php

if(empty($curUser)) die('NOT AUTH');

$userId = $curUser['user_id'];

$gamesWaitingI = getGamePlayer($userId);
$gamesWaitingICount = count($gamesWaitingI);

$gamesWaitingMe = getGamePlayers($userId);
$gamesWaitingMeCount = count($gamesWaitingMe);
