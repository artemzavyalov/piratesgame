<?php
session_start();

define('ROOT_DIR', str_replace('\\', '/', dirname(__FILE__)));
define('PHP_PATH', '/usr/bin/php');

require_once ROOT_DIR . '/libs/goDB/autoload.php';
require_once ROOT_DIR . '/libs/goDB/Result.php';
require_once ROOT_DIR . '/libs/goDB/DB.php';
require_once ROOT_DIR . '/libs/goDB/Adapters/mysql.php';
require_once ROOT_DIR . '/libs/goDB/Helpers/Config.php';
require_once ROOT_DIR . '/libs/goDB/Helpers/Connector.php';
require_once ROOT_DIR . '/libs/goDB/Helpers/Fetcher.php';
require_once ROOT_DIR . '/libs/goDB/Helpers/Templater.php';
require_once ROOT_DIR . '/libs/goDB/Helpers/ParserPH.php';
require_once ROOT_DIR . '/libs/goDB/Implementations/Base.php';
require_once ROOT_DIR . '/libs/goDB/Implementations/mysql.php';
require_once ROOT_DIR . '/libs/goDB/Exceptions/Exception.php';
require_once ROOT_DIR . '/libs/goDB/Exceptions/Logic.php';
require_once ROOT_DIR . '/libs/goDB/Exceptions/Query.php';

require_once ROOT_DIR . '/functions/helpers.php';
require_once ROOT_DIR . '/functions/users.php';
require_once ROOT_DIR . '/functions/players.php';
require_once ROOT_DIR . '/functions/map.php';

// Configs
$dbConfig = array();
if($_SERVER['HTTP_HOST'] == 'dgame') {
    $dbConfig['host']     = '127.0.0.1';
    $dbConfig['username'] = 'root';
    $dbConfig['password'] = ',jknnt,t';
    $dbConfig['dbname']   = 'dgame';
    $dbConfig['charset']  = 'utf8';

}
if($_SERVER['HTTP_HOST'] == 'dgame.zavart.ru') {
    $dbConfig['host']     = '127.0.0.1';
    $dbConfig['username'] = 'root';
    $dbConfig['password'] = '6b78ev568bn';
    $dbConfig['dbname']   = 'dgame';
    $dbConfig['charset']  = 'utf8';

}

$dbRead   = go\DB\DB::create($dbConfig, 'mysql');
$dbWrite  = go\DB\DB::create($dbConfig, 'mysql', TRUE);

$memcache = new Memcache;
$memcache->connect('127.0.0.1', 11211);

$config = array();
$config['game'] = array(
    'COUNT_PIRATES' => 3
);
$config['buildMap'] = array(
    'sizes' => array(
        'vertical' => 10,
        'horizontal' => 10,
    ),
    'counts' => array(
        'DIE' => 2,
        'ALLY' => 2,
        'HELPER' => 2,
        'TRANSPORTER' => 2,
        'COSTLY' => 3,
    ),
    'percents' => array(
        'GOLD' => 10,
        'EMPTY' => 5,
        'DANGER' => 20,
        'COMPLEXITY' => 30,
        'FEATURE' => 30,
        'TRANSPORTER' => 5,
    ),
);
