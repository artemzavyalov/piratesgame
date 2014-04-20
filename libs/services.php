<?php
class services {

    public static function parse($name, $data) {
        return call_user_func_array('services::parse' . $name, array($data));
    }

    private static function parseVkontakte($data) {
        $data = $data['response'];
        $userInfo = current($data['user']);
        $country = (isset($data['country']) && $data['country']) ? current($data['country']) : array('cid' => 0);
        $city = (isset($data['city']) && $data['city']) ? current($data['city']) : array('name' => '');
        $countryId = $country['cid'];
        $cityName = $city['name'];

        if($userInfo['sex'] == 2) {
            $userInfo['sex'] = 'm';
        } elseif($userInfo['sex'] == 1) {
            $userInfo['sex'] = 'f';
        } else {
            $userInfo['sex'] = 'n';
        }
        $bdate = '0000-00-00';
        if(isset($userInfo['bdate'])) {
            $userInfo['bdate'] = explode('.', $userInfo['bdate']);
            if(isset($userInfo['bdate'][2]) && isset($userInfo['bdate'][1]) && isset($userInfo['bdate'][0])) {
                $bdate = $userInfo['bdate'][2] . '-' . $userInfo['bdate'][1] . '-' . $userInfo['bdate'][0];
            }
        }

        $userData = array(
            'user_name' => $userInfo['first_name'] . ' ' . $userInfo['last_name'],
            'user_sex' => $userInfo['sex'],
            'user_birthday' => $bdate,
            'user_country' => intval($countryId),
            'user_city' => $cityName,
        );
        $ret = array('userData' => $userData,
                     'uid' => $userInfo['uid'],
                    );
        return $ret;
    }

    public static function getVKFriends($data) {
        $config = Config::getInstance();


        $friends = array();
        foreach($data as $friend) {
            $bdateStr  = '0000-00-00';
            if(isset($friend['bdate']) && !empty($friend['bdate'])) {
                $bdate = explode('.', $friend['bdate']);
                if(isset($bdate[1]) && isset($bdate[0])) {
                    if(strlen($bdate[1]) == 1) {
                        $bdate[1] = '0' . $bdate[1];
                    }
                    if(strlen($bdate[0]) == 1) {
                        $bdate[0] = '0' . $bdate[0];
                    }
                    if(!isset($bdate[2])) {
                        $bdate[2] = '0000';
                    }
                    $bdateStr = $bdate[2] . '-' . $bdate[1] . '-' . $bdate[0];
                }
            }
            $friends[] = array(
                'friend_friendUid' => intval($friend['uid']),
                'friend_friendBirthday' => addslashes($bdateStr),
            );
        }
        return $friends;
    }

    private static function parseFacebook($data) {
        $config = Config::getInstance();


        if($data['gender'] == 'male') {
            $data['gender'] = 'm';
        } elseif($data['gender'] == 'female') {
            $data['gender'] = 'f';
        } else {
            $data['gender'] = 'n';
        }
        $bdate = '0000-00-00';
        if(isset($data['birthday'])) {
            $data['birthday'] = explode('/', $data['birthday']);
            if(isset($data['birthday'][2]) && isset($data['birthday'][1]) && isset($data['birthday'][0])) {
                $bdate = $data['birthday'][2] . '-' . $data['birthday'][1] . '-' . $data['birthday'][0];
            }
        }
        /*$countryId = 0;
        $cityName = '';
        if(isset($data['hometown']['name'])) {
            foreach($config->vk_cities as $country => $cities) {
                foreach($cities as $city) {
                    if(strstr($data['hometown']['name'], $city)) {
                        $countryId = $country;
                        $cityName = $city;
                        break 2;
                    }
                }
            }
        }*/
        $avatar = 'https://graph.facebook.com/' . $data['username'] . '/picture';
        $userData = array(
            'user_name' => $data['first_name'] . ' ' . $data['last_name'],
            'user_phone' => '',
            'user_sex' => $data['gender'],
            'user_birthday' => $bdate,
            'user_country' => 0,
            'user_city' => '',
            'user_avatarYes' => 0,
            'user_avatarFrom' => '',
            'user_timezone' => $data['timezone'] . ':00:00',
        );
        $ret = array('userData' => $userData, 'uid' => $data['id'], 'avatar' => '');
        return $ret;
    }

    private static function parseTwitter($data) {
        $ava = '';
        if(isset($data->profile_image_url) && $data->profile_image_url) {
            $ava = $data->profile_image_url;
        }
        $userData = array(
            'user_name' => $data->name . ' ' . $data->screen_name,
            'user_phone' => '',
            'user_sex' => 'n',
            'user_birthday' => '',
            'user_country' => 0,
            'user_city' => '',
            'user_avatarYes' => 0,
            'user_avatarFrom' => $ava,
            'user_timezone' => intval($data->utc_offset / 3600) . ':00:00',
        );
        $ret = array('userData' => $userData, 'uid' => $data->id, 'avatar' => $ava);
        return $ret;
    }

    private static function parseGoogle($data) {
        if($data['gender'] == 'male') {
            $data['gender'] = 'm';
        } elseif($data['gender'] == 'female') {
            $data['gender'] = 'f';
        } else {
            $data['gender'] = 'n';
        }
        if(!isset($data['picture'])) {
            $data['picture'] = '';
        }
        $userData = array(
            'user_name' => $data['name'],
            'user_phone' => '',
            'user_sex' => $data['gender'],
            'user_birthday' => '',
            'user_country' => 0,
            'user_city' => '',
            'user_avatarYes' => 0,
            'user_avatarFrom' => $data['picture'],
            'user_timezone' => '00:00:00',
        );
        $ret = array('userData' => $userData, 'uid' => $data['id'], 'avatar' => $data['picture']);
        return $ret;
    }

    private static function parseMailru($data) {
        $config = Config::getInstance();


        $data = current($data);
        $ava = '';
        if($data['has_pic']) {
            $ava = $data['pic_big'];
        }
        $countryId = 0;
        foreach($config->vk_countries as $k => $country) {
            if($data['location']['country']['name'] == $country) {
                $countryId = $k;
            }
        }
        if($data['sex'] == '0') {
            $data['sex'] = 'm';
        } elseif($data['sex'] == '1') {
            $data['sex'] = 'f';
        } else {
            $data['sex'] = 'n';
        }
        $bday = explode('.', $data['birthday']);
        $data['birthday'] = $bday[2] . '-' . $bday[1] . '-' . $bday[0];
        $userData = array(
            'user_name' => $data['first_name'] . ' ' . $data['last_name'],
            'user_phone' => '',
            'user_sex' => $data['sex'],
            'user_birthday' => $data['birthday'],
            'user_country' => $countryId,
            'user_city' => $data['location']['city']['name'],
            'user_avatarYes' => 0,
            'user_avatarFrom' => $ava,
            'user_timezone' => '00:00:00',
        );
        $ret = array('userData' => $userData, 'uid' => $data['uid'], 'avatar' => $ava);
        return $ret;
    }

    private static function parseOdnoclassniki($data) {
        $config = Config::getInstance();


        $ava = $data['pic_1'];
        $data['location'] = (array) $data['location'];
        $countryId = 0;
        if($data['location']['country'] == 'RUSSIAN_FEDERATION') {
            $countryId = 1;
        }
        if($data['gender'] == 'male') {
            $data['gender'] = 'm';
        } elseif($data['gender'] == 'female') {
            $data['gender'] = 'f';
        } else {
            $data['gender'] = 'n';
        }
        $userData = array(
            'user_name' => $data['first_name'] . ' ' . $data['last_name'],
            'user_phone' => '',
            'user_sex' => $data['gender'],
            'user_birthday' => $data['birthday'],
            'user_country' => $countryId,
            'user_city' => $data['location']['city'],
            'user_avatarYes' => 0,
            'user_avatarFrom' => $ava,
            'user_timezone' => '00:00:00',
        );
        $ret = array('userData' => $userData, 'uid' => $data['uid'], 'avatar' => $ava);
        return $ret;
    }
}
?>