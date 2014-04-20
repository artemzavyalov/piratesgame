<?php

require_once 'inc.php';

$dbWrite->query('TRUNCATE TABLE `game`');
$dbWrite->query('TRUNCATE TABLE `game_pirate`');
$dbWrite->query('TRUNCATE TABLE `maps`');
$dbWrite->query('TRUNCATE TABLE `maps_fields`');
