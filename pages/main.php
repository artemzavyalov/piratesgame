<script type="text/javascript" src="/st/js/main.js"></script>
<div id="container">
  <button onclick="store.clear(); $.post('clear.php', function(){});">clear</button>
  <br>

  <div id="NO_CSS_ANIMATION" style="display: none;">
    К сожалению Ваш браузер не поддерживает CSS3 анимацию.<br>
    Установите последние версии современных браузеров:<br>
    <a href="http://www.google.com/chrome" target="about">Chrome</a><br>
    <a href="http://www.getfirefox.com/" target="about">Firefox</a>
  </div>

  <div id="NO_FRIENDS" style="display: none;">
    Вы не сможете играть пока не пригласите кого-нибудь из своих друзей.
    Выберите из списка друзей с кем Вы бы хотели сыграть.
  </div>

  <div id="NOT_VALID_FORM" style="display: none;">
    Выбери хотя бы одного друга для игры.
  </div>

  <div id="CREATE_GAME" style="display: none;">
    <form action="/?a=game" method="POST">
      поиск по списку друзей: <input type="text" id="findFriends"/>

      <div id="friendsBlock"></div>
    </form>
  </div>

  <div id="SHOW_SETTINGS" style="display: none;">
    Размеры игровой области:
    <div class="screenSlider"></div>
    <br>
  </div>

  <? if ($gamesWaitingMeCount): ?>
    <? foreach ($gamesWaitingMe as $game): ?>
      <a href="/?a=game&mapId=<?= $game['game_mapId'] ?>&gameId=<?= $game['game_id'] ?>"><?= $game['user_name'] ?> ждёт
        тебя</a><br>
    <? endforeach; ?>
  <? endif; ?>
  <? if ($gamesWaitingICount): ?>
    <? foreach ($gamesWaitingI as $game): ?>
      <a href="/?a=game&mapId=<?= $game['game_mapId'] ?>&gameId=<?= $game['game_id'] ?>">твоя игра</a><br>
    <? endforeach; ?>
  <? endif; ?>
  <a id="settings" href="#">Настройки</a><br>
  <a id="gameCreateComp" href="/?a=game&comp=1">Играть с компом</a><br>
  <a id="gameCreate" href="#">Создать свою игру</a><br>
  <a href="#" onclick="VK.callMethod('showInviteBox'); return false;">Пригласить друзей в игру</a><br>

</div>