<?php
$dbConfig = array();
if ($_SERVER['HTTP_HOST'] == 'dgame') {
  $dbConfig['host'] = '127.0.0.1';
  $dbConfig['username'] = 'root';
  $dbConfig['password'] = ',jknnt,t';
  $dbConfig['dbname'] = 'dgame';
  $dbConfig['charset'] = 'utf8';
}
if ($_SERVER['HTTP_HOST'] == 'dgame.zavart.ru') {
  $dbConfig['host'] = '127.0.0.1';
  $dbConfig['username'] = 'root';
  $dbConfig['password'] = '6b78ev568bn';
  $dbConfig['dbname'] = 'dgame';
  $dbConfig['charset'] = 'utf8';
}
