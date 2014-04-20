--
-- База данных: `dgame`
--

-- --------------------------------------------------------

--
-- Структура таблицы `fields`
--

CREATE TABLE IF NOT EXISTS `fields` (
  `field_id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `field_type` enum('GOLD','EMPTY','DANGER','DIE','HELPER','ALLY','COMPLEXITY','FEATURE','TRANSPORTER','COSTLY') NOT NULL DEFAULT 'EMPTY',
  `field_number` mediumint(6) unsigned NOT NULL DEFAULT '0',
  `field_intervalRandomS` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `field_intervalRandomE` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `field_direction` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `field_isUnique` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `field_name` varchar(255) NOT NULL,
  PRIMARY KEY (`field_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=30 ;

--
-- Дамп данных таблицы `fields`
--

INSERT INTO `fields` (`field_id`, `field_type`, `field_number`, `field_intervalRandomS`, `field_intervalRandomE`, `field_direction`, `field_isUnique`, `field_name`) VALUES
(1, 'EMPTY', 0, 0, 0, 0, 0, 'пусто'),
(2, 'COMPLEXITY', 0, 1, 3, 0, 0, 'болото'),
(3, 'DIE', 0, 0, 0, 0, 1, 'крокодил'),
(4, 'DIE', 0, 0, 0, 0, 1, 'чёрная метка'),
(5, 'DANGER', 0, 0, 0, 0, 0, 'капкан'),
(6, 'ALLY', 0, 0, 0, 0, 0, 'абориген'),
(7, 'ALLY', 0, 0, 0, 0, 1, 'пятница'),
(8, 'FEATURE', 0, 0, 0, 1, 0, 'пушка'),
(9, 'GOLD', 1, 0, 0, 0, 0, 'монета'),
(10, 'GOLD', 2, 0, 0, 0, 0, '2 монеты'),
(11, 'GOLD', 3, 0, 0, 0, 0, '3 монеты'),
(12, 'GOLD', 4, 0, 0, 0, 1, '4 монеты'),
(13, 'GOLD', 5, 0, 0, 0, 1, '5 монет'),
(14, 'COSTLY', 6, 0, 0, 0, 1, 'сокровищница'),
(15, 'COSTLY', 0, 1, 2, 0, 1, 'сундук пирата'),
(16, 'COSTLY', 0, 2, 3, 0, 1, 'клад'),
(17, 'HELPER', 0, 0, 0, 0, 1, 'слон'),
(18, 'FEATURE', 0, 0, 0, 1, 0, 'подзорная труба'),
(19, 'EMPTY', 0, 0, 0, 0, 0, 'трава'),
(20, 'HELPER', 0, 0, 0, 0, 1, 'пещера'),
(21, 'COMPLEXITY', 0, 0, 0, 0, 0, 'ураган'),
(22, 'COMPLEXITY', 0, 1, 2, 0, 0, 'львиный прайд'),
(23, 'COMPLEXITY', 2, 0, 0, 0, 0, 'дикая конопля'),
(24, 'COMPLEXITY', 3, 0, 0, 0, 0, 'лианы'),
(25, 'FEATURE', 1, 0, 0, 0, 1, 'настойка корня мандрагоры'),
(26, 'TRANSPORTER', 0, 0, 0, 0, 1, 'вход в подземелье'),
(27, 'TRANSPORTER', 0, 0, 0, 0, 1, 'выход из подземелья'),
(28, 'TRANSPORTER', 0, 0, 0, 1, 0, 'переход'),
(29, 'FEATURE', 0, 0, 0, 0, 1, 'джинн');

-- --------------------------------------------------------

--
-- Структура таблицы `game`
--

CREATE TABLE IF NOT EXISTS `game` (
  `game_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `game_mapId` int(11) unsigned NOT NULL,
  `game_playerId` int(11) unsigned NOT NULL DEFAULT '0',
  `game_status` set('CONNECT','WAIT','DISCONNECT') NOT NULL DEFAULT 'WAIT',
  `game_creator` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `game_stage` set('START','SHIP','STEP') NOT NULL DEFAULT 'START',
  `game_progress` set('PASSIVE','ACTIVE') NOT NULL DEFAULT 'PASSIVE',
  `game_lastAction` text NOT NULL,
  PRIMARY KEY (`game_id`),
  KEY `game_mapId` (`game_mapId`,`game_playerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `game_pirate`
--

CREATE TABLE IF NOT EXISTS `game_pirate` (
  `gp_game` int(11) unsigned NOT NULL,
  `gp_pirate` mediumint(6) unsigned NOT NULL,
  PRIMARY KEY (`gp_game`,`gp_pirate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `maps`
--

CREATE TABLE IF NOT EXISTS `maps` (
  `map_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `map_name` varchar(255) NOT NULL,
  `map_verticalFields` smallint(4) unsigned NOT NULL DEFAULT '0',
  `map_horizontalFields` smallint(4) unsigned NOT NULL DEFAULT '0',
  `map_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `map_userId` int(11) unsigned NOT NULL DEFAULT '0',
  `map_status` set('ACTIVE','CLOSE') NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`map_id`),
  KEY `map_userId` (`map_userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `maps_fields`
--

CREATE TABLE IF NOT EXISTS `maps_fields` (
  `maps_field_mapId` int(11) unsigned NOT NULL,
  `maps_field_fieldId` int(11) unsigned NOT NULL,
  `maps_field_positionX` smallint(3) unsigned NOT NULL DEFAULT '0',
  `maps_field_positionY` smallint(3) unsigned NOT NULL DEFAULT '0',
  `maps_field_type` smallint(3) unsigned NOT NULL DEFAULT '0',
  `maps_field_direction` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`maps_field_mapId`,`maps_field_fieldId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `pirates`
--

CREATE TABLE IF NOT EXISTS `pirates` (
  `pirate_id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `pirate_name` varchar(255) NOT NULL,
  `pirate_description` mediumtext NOT NULL,
  `pirate_captain` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pirate_id`),
  KEY `pirate_captain` (`pirate_captain`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Дамп данных таблицы `pirates`
--

INSERT INTO `pirates` (`pirate_id`, `pirate_name`, `pirate_description`, `pirate_captain`) VALUES
(1, 'Генри Морган', 'Опытный пиратский капитан. На его счету десятки захваченных прибрежных городов и сотни кораблей. Известен захватом и разграблением Панамы.', 1),
(2, 'Френсис Дрейк', 'С 18-ти лет был капитаном. Захватил испанский "Серебряный караван"(более 30-ти тонн серебра). Совершил кругосветное путешествие и участвовал в разгроме "Непобедимой армады".', 1),
(3, 'Чёрная борода', 'Командуя кораблём "Месть королевы Анны" наводил ужас на всё Карибское море. Для устрашения врагов вплетает в свою бороду запальные фитили и в клубах дыма бросается в бой.', 1),
(4, 'Барбаросса', 'Средиземноморский пират. Помог мавританскому султану захватить Алжир, но после убил его и сам стал править в Алжире.', 1),
(5, 'Оливье ле Вассер', 'Француз по происхождению. Совершал рейды по Атлантическому океану, потом перешёл в Индийский. По легенде зарыл крупный клад на Сейшельских островах.', 1),
(6, 'счастливчик Джек', 'Его везение не раз помогало выпутываться из  передряг.', 0),
(7, 'толстый Джон', 'Вес толстого Джона давно стал предметом шуток его товарищей по команде.', 0),
(8, 'Роберт Джонсон', 'Бывший солдат флота Её Величества. Отличный стрелок.', 0),
(9, 'Хью Стоун', 'Бывший шулер. Отлично играет в карты.', 0),
(10, 'малыш Билл', 'Пират огромного роста и силы. С ним лучше не связываться.', 0),
(11, 'тощий Джек', 'Отпетый уголовник. На его счету десятки загубленных жизней.', 0),
(12, 'Ральф Северянин', 'В нём течет кровь бесстрашных викингов, покорителей морей.', 0),
(13, 'Зикомо', 'Выходец из Африки.', 0),
(14, 'Анаквад', 'Родился в индейском племени. Был изгнан за убийство.', 0),
(15, 'Мясник', 'Никто не знает его настоящего имени. Мастерски владеет мясницким тесаком.', 0),
(16, 'Золотая серьга', 'Одна из немногих женщин среди пиратов. Умеет метать отравленные ножи.', 0),
(17, 'Чжи Лао', 'Мастерски владеет восточными единоборствами.', 0),
(18, 'Молчун', 'Никто не слышал его голоса.', 0),
(19, 'Мокрый Эдд', 'Даже среди пиратов выделяется своим пьянством.', 0),
(20, 'Дик Соколинный Глаз', 'Смотровой на мачте. Всегда первый замечает приближение земли.', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID пользователя в системе',
  `user_name` varchar(50) NOT NULL DEFAULT '' COMMENT 'Имя (ник) пользователя',
  `user_isOnline` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `user_isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `user_sex` enum('m','f','n') NOT NULL DEFAULT 'n' COMMENT 'Пол пользователя',
  `user_birthday` date NOT NULL DEFAULT '0000-00-00' COMMENT 'Дата рождения пользователя',
  `user_country` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT 'Страна пользователя',
  `user_city` varchar(50) NOT NULL DEFAULT '' COMMENT 'Город пользователя',
  `user_balance` mediumint(6) unsigned NOT NULL DEFAULT '0',
  `user_exp` int(11) NOT NULL DEFAULT '0',
  `user_dtreg` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата регистрации',
  `user_isBan` tinyint(4) NOT NULL DEFAULT '0',
  `user_level` int(13) NOT NULL DEFAULT '1',
  `user_permanent` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `user_setScreen` mediumint(4) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  KEY `user_country` (`user_country`),
  FULLTEXT KEY `user_name` (`user_name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_isOnline`, `user_isAdmin`, `user_sex`, `user_birthday`, `user_country`, `user_city`, `user_balance`, `user_exp`, `user_dtreg`, `user_isBan`, `user_level`, `user_permanent`, `user_setScreen`) VALUES
(1, 'Артём Завьялов', 0, 0, 'm', '1950-01-01', 1, 'Новосибирск', 0, 0, '2013-04-04 05:25:27', 0, 1, 1, 790),
(2, 'Patricia Bernard', 0, 0, 'f', '1989-06-11', 0, '', 0, 0, '2013-04-09 10:40:46', 0, 1, 1, 890),
(3, 'Юрий Завьялов', 0, 0, 'm', '1991-10-24', 1, 'Новосибирск', 0, 0, '2013-04-10 10:56:51', 0, 1, 0, 0),
(4, 'Ann Smith', 0, 0, 'f', '0000-00-00', 9, 'Chicago', 0, 0, '2014-01-05 11:36:43', 0, 1, 0, 0),
(0, 'Bot', 0, 0, 'm', '0000-00-00', 0, '', 0, 0, '2014-01-05 11:40:10', 0, 1, 0, 0),
(5, 'Роман Любимов', 0, 0, 'm', '1989-02-12', 1, 'Бердск', 0, 0, '2014-01-15 15:06:18', 0, 1, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `user_links`
--

CREATE TABLE IF NOT EXISTS `user_links` (
  `link_authId` smallint(2) unsigned NOT NULL COMMENT 'ID сайт, через который организуем регистрацию и авторизацию',
  `link_authUid` decimal(40,0) unsigned NOT NULL COMMENT 'ID пользователя на этом сайте',
  `link_userId` int(10) unsigned NOT NULL COMMENT 'ID пользователя в системе',
  PRIMARY KEY (`link_authId`,`link_authUid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user_links`
--

INSERT INTO `user_links` (`link_authId`, `link_authUid`, `link_userId`) VALUES
(0, 0, 0),
(1, 19069848, 5),
(1, 36008064, 3),
(1, 36011203, 1),
(1, 207894585, 2),
(1, 235269732, 4);

