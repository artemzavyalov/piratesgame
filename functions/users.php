<?php

/**
 * добавить пользователя
 * @param $arr array
 *          массив с данными о пользователе: имя, дата рождения, страна, город, ссылка на фотографию
 *
 * @return int
 *          ID пользователя
 **/
function addUser($arr) {
    global $dbWrite;

    $sql = "INSERT INTO `users` SET ?set";
    $userId  = $dbWrite->query($sql, array($arr), 'id');
    return $userId;
}
/**
 * отредактировать профиль пользователя
 * @param $userId int
 *                ID пользователя
 * @param $arr    array
 *          массив с данными о пользователе
 *
 * @return boolean
 **/
function editUser($userId, $arr) {
    global $dbWrite;

    $sql    = "UPDATE `users` SET ?set WHERE `user_id` = ?i LIMIT 1";
    $result = $dbWrite->query($sql, array($arr, $userId), 'ar');
    return $result;
}
/**
 * получить данные о пользователе
 * @param $userId int
 *                ID пользователя
 *
 * @return array
 *          массив с данными о пользователе
 **/
function getUser($userId) {
    global $dbRead;

    $sql    = "SELECT * FROM `users` WHERE `user_id` = ?i LIMIT 1";
    $user = $dbRead->query($sql, array($userId), 'row');
    return $user;
}

/**
 * Создать привязку пользователя к учётной записи на стороннем сайте
 * @param $authId  Идентификатор сайта
 * @param $authUid Идентификатор пользователя со стороннего сайта
 * @param $userId  Идентификатор пользователя Remamba
 *
 * @return bool
 */
function addUserLink($authId, $authUid, $userId) {
    global $dbWrite;

    $sql    = "INSERT INTO `user_links` (link_authId, link_authUid, link_userId) VALUE(?i, ?string, ?i)";
    $result = $dbWrite->query($sql, array($authId, $authUid, $userId), 'ar');
    return $result;
}

/**
 * Создать привязку пользователя к учётной записи на стороннем сайте
 * @param $authId
 *              Идентификатор сайта
 * @param $authUid
 *              Идентификатор пользователя со стороннего сайта
 *
 * @return bool
 */
function removeUserLink($authId, $authUid) {
    global $dbWrite;

    $sql    = "DELETE FROM `user_links` WHERE `link_authId`=?i AND `link_authUid`=?i";
    $data   = array($authId, $authUid);
    $result = $dbWrite->query($sql, $data, 'ar');
    return $result;
}

/**
 * Вернуть идентификатор пользователя зарегистрировавшегося с данного сайта
 * @param $authId
 *              Идентификатор сайта
 * @param $authUid
 *              Идентификатор пользователя со стороннего сайта
 *
 * @return int
 */
function checkUserLink($authId, $authUid) {
    global $dbRead;

    $sql    = "SELECT `link_userId` FROM `user_links` WHERE `link_authId` = ?i AND `link_authUid` = ?string LIMIT 1";
    $result = $dbRead->query($sql, array($authId, $authUid), 'el');
    return $result;
}

/**
 * Редактировать привязку пользователя к учётной записи стороннего сайта
 * @param $authId
 *              Идентификатор сайта
 * @param $authUid
 *              Идентификатор пользователя со стороннего сайта
 * @param $newUserId
 *              Идентификатор пользователя
 *
 * @return boolean
 */
function updateUserLink($authId, $authUid, $newUserId) {
    global $dbWrite;


    $sql    = "UPDATE `user_links` SET `link_userId`=?i WHERE `link_authId`=?i AND `link_authUid`=?string";
    $data   = array($newUserId, $authId, $authUid);
    $result = $dbWrite->query($sql, $data, 'ar');
    return $result;
}

/**
 * Получить ссылку на внешний профиль пользователя
 * @param int $authId идентификатор соцсети (1 - вконтакте)
 * @param int $userId идентификатор пользователя
 * @return int идентификатор пользователя в соцсети
 */
function getUserAuthUidLink($authId, $userId) {
    global $dbRead;

    $sql    = "SELECT `link_authUid` FROM `user_links` WHERE `link_authId` = ?i AND `link_userId` = ?i LIMIT 1";
    $result = $dbRead->query($sql, array($authId, $userId))->el();
    return $result;
}

/**
 * Получить список друзей пользователя из соц. сети
 * @param int $userId
 *                  ID пользователя
 * @param array $uids
 *                  Массив идентификаторов из соц. сети
 * @param int $authId
 *                  ID соц. сети
 * @return array
 */
function getFriends($userId, $uids, $authId) {
    global $dbRead;

    $sql = 'SELECT `users`.*, `link_authUid` as `user_uid`
            FROM `users`
                INNER JOIN `user_links` ON `link_userId`=`user_id` AND `link_authId`=?i
            WHERE `link_authUid` IN (?list)';
    $result = $dbRead->query($sql, array($authId, $userId, $uids))->assoc();
    return $result;
}