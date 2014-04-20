<?php

function getImgsFromDisk($rootDir, $relDir, $imgs){
    $dir = scandir($rootDir . $relDir);
    foreach($dir as $key => $val) {
        if($val != '.' && $val != '..') {
            if(is_file($rootDir . $relDir . '/' . $val)) {
                $imgs[] = $relDir . '/' . $val;
            } else {
                $imgs = array_merge($imgs, getImgsFromDisk($rootDir, $relDir . '/' . $val, array()));
            }
        }
    }
    return $imgs;
}

/**
 * Преобразует ассоциативный массив вида:
 * array(
 *  'group1' => 'abc', 'group2' => 'egf', 'value1' => 'oui'
 *  'group1' => 'abc', 'group2' => 'egf', 'value1' => 'ert'
 *  'group1' => 'cba', 'group2' => 'hjg', 'value1' => 'dgf'
 * )
 * к двумерному виду:
 * array(
 *  'group1' => 'abc', 'group2' => 'egf', 'childs => array(
 *                                                         'value1' => 'oui',
 *                                                         'value1' => 'ert'
 *                                                         )
 *  'group1' => 'cba', 'group2' => 'hjg', 'childs => array(
 *                                                         'value1' => 'dgf'
 *                                                        )
 * )
 *
 * @param            $assoc         Ассоциативный массив полученный из Mysql запроса
 * @param            $groupKey      Ключ из массива по которому надо группировать
 * @param bool       $groupPrefix   Префикс ключей которые будут сгруппированы
 *
 * @return array
 */
function mysqlTwoDimensional($assoc, $groupKey, $groupPrefix) {
    $prevKey    = FALSE;
    $result     = array();
    $childs     = array();
    $childsPrev = array();
    $assoc[]    = array($groupKey => NULL);
    foreach ($assoc as $ka => $va) {
        $child = array();
        if ($va[$groupKey] !== $prevKey) {
            $childsPrev = $childs;
            $childs     = array();
        }
        foreach ($va as $k => $v) {
            if (strpos($k, $groupPrefix) !== 0) $child[$k] = $v;
        }
        $childs[] = $child;
        if ($va[$groupKey] !== $prevKey) {
            $prevKey = $va[$groupKey];
            $res     = array();
            foreach ($va as $k => $v) {
                if (strpos($k, $groupPrefix) === 0) $res[$k] = $v;
            }
            $result[] = $res;
            if (!empty($childsPrev)) {
                $result[count($result) - 2]['childs'] = $childsPrev;
            }
            $childsPrev = array();
        }
    }
    unset($result[count($result) - 1]);
    return $result;
}

/**
 * Обрезает ключи в массиве до символа "_"
 * @param $data   array       входной массив
 *
 * @return array
 */
function cropKeys($data) {
    $ret = array();
    foreach($data as $k => $v) {
        if(is_array($v)) {
            $ret[$k] = cropKeys($v);
        } else {
            $pos = strpos($k, '_');
            if($pos >= 0) $ret[substr($k, strpos($k, '_') + 1)] = $v;
            else $ret[$k] = $v;
        }
    }
    return $ret;
}

/**
 * Логи в файл
 * @param $data   array       входной массив
 *
 * @return undefined
 */
function logMsg($data) {
    switch(gettype($data)) {
        case 'array':
            ob_start();
            print_r($data);
            $data = ob_get_contents();
            ob_end_clean();
            //$data = json_encode($data);
            break;
    }
    if(strlen($data) > 0) {
        file_put_contents('log.txt', $data . '
', FILE_APPEND);
    }
}