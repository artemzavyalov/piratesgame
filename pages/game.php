<?
$comp = (isset($_REQUEST['comp']) && $_REQUEST['comp']) ? true : false;
?>
<? if ($comp): ?>
  <script type="text/javascript" src="/st/js/game<?= $comp ? '-comp' : '' ?>.js"></script>
  <script type="text/javascript" src="/st/js/game-unit.js"></script>
  <script type="text/javascript" src="/st/js/game-ii.js"></script>
  <script type="text/javascript">
    $(function () {

      if (Modernizr.cssanimations) {
        DGame.MAP = new DGame.Map('#map', {
          mapInfo: <?=json_encode($map)?>,
          model: new DGame.Models.Map({id: <?=$mapId?>, gameId: <?=$gameId?>}),
          thisPlayerId: <?=$userId?>,
          players: can.Model.List.build(<?=json_encode(cropKeys($players))?>, DGame.Models.Player),
          units: <?=json_encode($units)?>
        });
      } else {
        alert('Sorry, your browser doesn\'t support CSS3 animation.');
      }

    });
  </script>
<? else: ?>
  <script type="text/javascript" src="/st/js/game<?= $comp ? '-comp' : '' ?>.js"></script>
  <script type="text/javascript" src="/st/js/game-unit.js"></script>
  <script type="text/javascript">
    $(function () {

      if (Modernizr.cssanimations) {
        new DGame.Controllers.Map($('#map'), {
          mapInfo: <?=json_encode($map)?>,
          model: new DGame.Models.Map({id: <?=$mapId?>, gameId: <?=$gameId?>}),
          thisPlayerId: <?=$userId?>,
          players: DGame.Models.List.Player.build(<?=json_encode(cropKeys($players))?>, DGame.Models.Player),
          units: <?=json_encode($units)?>
        });
      } else {
        alert('Sorry, your browser doesn\'t support CSS3 animation.');
      }

    });
  </script>
<? endif; ?>

<div id="container">
  <div id="putShip" style="display: none;">
    <div class="card ship"></div>
  </div>
  <div id="confirmAction" style="display: none;"></div>

  <div id="blockDisplay"
       style="width: <?= ($contWidth + 2 * 100) ?>px; height: <?= ($contHeight + 2 * 100) ?>px;"></div>
  <div id="statusBar" style="height: 10px;">
    <div class="info"></div>
    <div class="showhide">
      <div class="arrows show">
        <p class="arrow"></p>

        <p class="arrow"></p>
      </div>
    </div>
  </div>
  <div id="controlBar" style="top: <?= $curUser['user_setScreen'] - 50 ?>px; display: block;">
    <div class="finishStep"></div>
  </div>
  <div id="game"
       style="width: <?= ($contWidth + 2 * 100) ?>px; height: <?= ($contHeight + 2 * 100) ?>px; margin-top: 0px; margin-left: 0px;">
    <? for ($x = 0; $x <= $sizes['horizontal'] + 1; $x++): ?>
      <? for ($y = 0; $y <= $sizes['vertical'] + 1; $y++): ?>
        <? if ($x == 0 || $y == 0 || $x == $sizes['horizontal'] + 1 || $y == $sizes['vertical'] + 1): ?>
          <div class="card sea" data-posX="<?= $x ?>" data-posY="<?= $y ?>"
               style="left: <?= ($x * 120) ?>px; top: <?= ($y * 120) ?>px;"></div>
        <? endif; ?>
      <? endfor; ?>
    <? endfor; ?>
    <div id="map" style="width: <?= $contWidth ?>px; height: <?= $contHeight ?>px;"></div>
  </div>
</div>
<script type="text/ejs" id="rrr">
  <% if (hh == 2) { %>
    111111
    <% } else { %>
    222222
    <% } %>
</script>
<script type="text/ejs" id="TMPL_StatusBarPirateInfo">
    <img class="piratesImg" src="/st/img/pirates/<%= id %>.png">
    <div class="piratesDesc" style="width: <?= $curUser['user_setScreen'] - 150 ?>px;">
        <div class="piratesProp">
            <% if (my == 1) { %>
            <p style="float: right;">
                <% if (blocked) { %>
                не может двигаться<%= ((blocked === true) ? '' : ': ' + blocked) %>
  <% } else { %>
                очки перемещения: <%= steps %>
  <% } %>
            </p><div style="clear: both;"></div>
            <% } %>
  <% if (gold == 1) { %>
            <img src="/st/img/money.png" style="float: right;" /><div style="clear: both;"></div>
            <% } %>
        </div>
        <div style="clear: right;"></div>
        <div class="unchange"><p>&plus;</p></div>
        <p style="margin-top: -15px;"><%= name %></p>
        <p><%= description %></p>
    </div>
    <% if (captain == 1) { %><img class="piratesCap" src="/st/img/captain.png"><% } %>
</script>
<script type="text/ejs" id="TMPL_StatusBarEnemyShipInfo">
    <img class="piratesImg" src="<%= photo_medium %>" />
    <div class="piratesDesc" style="width: <?= $curUser['user_setScreen'] - 150 ?>px;">
        Корабль игрока <%= name %>
  <% if (gold > 0) { %>
        <div class="label gold" style="margin-left: 0px; right: 0px;"><%= gold %></div>
        <% } %>
    </div>

</script>
<script type="text/ejs" id="TMPL_StatusBarMyShipInfo">
    <img class="piratesImg" src="/st/img/ship.png">
    <div class="piratesDesc" style="width: <?= $curUser['user_setScreen'] - 150 ?>px;">
        <% if (steps == 0 || blocked) { %>
        У вашего корабля кончились ходы.
        <% } else { %>
        Ваш корабль. Можете перемещать его вдоль острова.
        <% } %>
  <% if (gold > 0) { %>
        <div class="label gold" style="margin-left: 0px; right: 0px;"><%= gold %></div>
        <% } %>
    </div>
    <div class="unchange" style="margin-top: -31px;"><p>&plus;</p></div>

</script>
<script type="text/ejs" id="TMPL_StatusBarErrors">
  <% if (error == 'MOVING_ERROR') { %>
    <img class="piratesImg" src="/st/img/pirates/<%= id %>.png">
    <div class="piratesDesc" style="width: <?= $curUser['user_setScreen'] - 150 ?>px;"><p><%= name %></p>Не может туда переместиться.</div>
    <% if (captain == 1) { %><img class="piratesCap" src="/st/img/captain.png"><% } %>
    <div class="unchange" style="margin-top: -31px;"><p>&plus;</p></div>
    <% } else if (error == 'SHIP_MOVING_LAND_ERROR') { %>
    <img class="piratesImg" src="/st/img/ship.png">
    <div class="piratesDesc" style="width: <?= $curUser['user_setScreen'] - 150 ?>px;">Корабль не может вылезти на сушу.</div>
    <div class="unchange" style="margin-top: -31px;"><p>&plus;</p></div>
    <% } else if (error == 'SHIP_MOVING_ERROR') { %>
    <img class="piratesImg" src="/st/img/ship.png">
    <div class="piratesDesc" style="width: <?= $curUser['user_setScreen'] - 150 ?>px;">Корабль не может туда переместиться.</div>
    <div class="unchange" style="margin-top: -31px;"><p>&plus;</p></div>
    <% } %>
</script>
