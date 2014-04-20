<?php
$memcache = new Memcache;
$memcache->connect('127.0.0.1', 11211);

$t = $memcache->get('test');
if ($t) {
  var_dump($t);
} else {
  $memcache->add('test', 'test variable', false, 30);
  var_dump('SET!!');
}
