$.Model.List('DGame.Models.List', {
  build: function (data, model) {
    var models = [];
    for (var k1 in data) {
      var line = data[k1];
      models.push(new model(line));
    }
    return new this(models);
  }
}, {
});

$.Model('DGame.Models.Map', {
  attributes: {
  }
}, {
});

$.Model('DGame.Models.Player', {
  attributes: {
  }
}, {
  die: function () {
    console.log('PLAYER died');
  }
});

DGame.Models.List('DGame.Models.List.Player', {
}, {
});

$.Model('DGame.Models.Unit', {
  create: function () {
    console.log('UNIT Created');
  },
  attributes: {
  }
}, {
  move: function () {
    console.log('UNIT Moved');
  },
  die: function () {
    console.log('UNIT died');
  }
});

$.Controller('DGame.Controllers.Map', {
  defaults: {
    model: {},
    players: {},
    thisPlayerId: 0,
    mapInfo: {},
    statusBar: {},
    ships: {},
    units: {},
    change: {},
    activeStep: false,
    stepActions: {},
    playersHistory: {},
    mapField: '.mapField',
    cUnit: {},
    storage: {}
  }
}, {
  getOpt: function () {
    return this.options;
  },
  init: function () {
    var controller = this, mainBlock = this.element, opt = this.options;

    opt.players.grep(function (inst) {
      DGame.VKAPI.getUserSmall(inst.uid, function (r) {
        var r = r.response[0];
        inst.attr('photo', r.photo);
        inst.attr('photo_big', r.photo_big);
        inst.attr('photo_medium', r.photo_medium);
      });
    });

    for (var k in opt.units) {
      var my = 0;
      if (opt.units[k].id == opt.model.gameId) {
        my = 1;
      }
      for (var i in opt.units[k].childs) {
        opt.units[k].childs[i]['my'] = my;
        opt.units[k].childs[i]['steps'] = 1;
      }
    }

    DGame.Helpers.navigation();
    DGame.Helpers.statusBar();
    DGame.Helpers.controlBar();
    DGame.Helpers.confrimActionInit();

    opt.cUnit = new DGame.Controllers.Map.Unit($('#game'), {});
    opt.storage = new DGame.Controllers.Map.Storage(mainBlock, {p: ['model', 'mapInfo', 'statusBar', 'ships', 'activeStep', 'stepActions', 'playersHistory']});
    opt.storage.check(opt);

    if (opt.statusBar.display == undefined) {
      controller.statusBarInfo('Ожидание других игроков....', true).statusBarShow();
      opt.storage.save(opt);
    } else {
      controller.statusBarInfo(opt.statusBar.text);
      if (opt.statusBar.display) {
        controller.statusBarShow();
      } else {
        controller.statusBarHide();
      }
    }

    for (var i in opt.mapInfo) {
      var line = opt.mapInfo[i];
      for (var j in line) {
        var field = line[j], direction = 0;
        if (field['field_direction'] * 1) {
          direction = field['direction'];
        }
        var style = ' style="top: ' + ((i - 1) * 120) + 'px; left: ' + ((j - 1) * 120) + 'px;" ';
        var mapField = $('<div' + style + ' class="mapField" data-field="' + field['field_id'] + '" ' +
          'data-direction="' + direction + '" data-posX="' + j + '" data-posY="' + i + '"><div class="card back"></div></div>');
        mainBlock.append(mapField);
      }
    }
    DGame.Connection.start(opt.model);

    if (!controller.loadFromStorage()) {
      controller.connectBind('gameReady');
    }
    if (!opt.activeStep) {
      DGame.Helpers.controlBarBlock(true);
    }

    setTimeout(function () {
      $('#game')
        .on('click', '.sea', function (e) {
          return $.proxy(controller.seaClick, controller)($(this), e);
        })
        .on('click', '.pirateUnit', function (e) {
          return $.proxy(controller.pirateClick, controller)($(this), e);
        })
        .on('mouseenter', '.pirateUnit', function (e) {
          return $.proxy(controller.pirateMouseEnter, controller)($(this), e);
        })
        .on('mouseleave', '.pirateUnit', function (e) {
          return $.proxy(controller.pirateMouseLeave, controller)($(this), e);
        })
        .on('click', '.sea .ship', function (e) {
          return $.proxy(controller.shipClick, controller)($(this), e);
        })
        .on('mouseenter', '.sea .ship', function (e) {
          return $.proxy(controller.shipMouseEnter, controller)($(this), e);
        })
        .on('mouseleave', '.sea .ship', function (e) {
          return $.proxy(controller.shipMouseLeave, controller)($(this), e);
        });
      $('#statusBar')
        .on('click', '.unchange', function (e) {
          return $.proxy(controller.unchange, controller)($(this), e);
        });
    }, 500);
  },
  connectSend: function (data) {
    var controller = this, opt = this.options;
    opt.storage.save(opt);
    DGame.Connection.send($.extend({}, data));
  },
  connectBind: function (key) {
    var controller = this, opt = this.options;
    DGame.Connection.receive(key);
    opt.model.attr('event_' + key, true);
    opt.storage.save(opt);
  },
  connectUnbind: function (key) {
    var controller = this, opt = this.options;
    DGame.Connection.breakReceive(key);
    opt.model.attr('event_' + key, false);
    opt.storage.save(opt);
  },
  '{model} gameReady': function (model, event, data) {
    var controller = this, mainBlock = this.element, opt = this.options;
    controller.connectUnbind('gameReady');
    console.log('gameReady:', data);
    if (data) {
      if (data == 'CHANGE_SHIP') {
        controller.putShip(function () {
          controller.connectBind('changeShip');
        });
      } else {
        controller.connectBind('changeShip');
        controller.statusBarInfo('Выбор корабля, дождитесь своей очереди....', true);
      }
    }
  },
  '{model} changeShip': function (model, event, data) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (data.CHANGE_SHIP) {
      controller.putShip(null);
      delete data.CHANGE_SHIP;
    }
    for (var k in data) {
      var v = data[k];
      if (v.putShip && typeof opt.ships['player_' + v.playerId] == 'undefined') {
        opt.ships['player_' + v.playerId] = v;
        opt.storage.save(opt);
        controller.shipTo(v.putShip.x, v.putShip.y, false, 'player_' + v.playerId);
        controller.mapViewTo(v.putShip);
      }
    }
    if (opt.players.length == DGame.Helpers.objLength(opt.ships)) {
      controller.connectUnbind('changeShip');
      controller.connectBind('shipReady');
      setTimeout(function () {
        opt.storage.save(opt);
      }, 500);
    }
  },
  '{model} shipReady': function (model, event, data) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (typeof opt.ships.my.players == 'undefined') {
      opt.ships.my['steps'] = 1;
      for (var k in opt.units) {
        var v = opt.units[k];
        if (v.id == opt.thisPlayerId) {
          opt.ships.my['players'] = v.childs;
          var ship = $('.ship.my').parent();
          for (var kp in v.childs) {
            var unit = opt.cUnit.put(v.childs[kp].id, ship.attr('data-posx'), ship.attr('data-posy'), 'my');
            opt.cUnit.hide(unit);
          }
        } else {
          opt.ships['player_' + v.id]['players'] = v.childs;
          var ship = $('.ship.player_' + v.id).parent();
          for (var kp in v.childs) {
            var unit = opt.cUnit.put(v.childs[kp].id, ship.attr('data-posx'), ship.attr('data-posy'), 'player_' + v.id);
            opt.cUnit.hide(unit);
          }
        }
      }
      setTimeout(function () {
        opt.storage.save(opt);
      }, 500);
    }
    if (data == 'CHANGE_STEP') {
      opt.activeStep = true;
      opt.stepActions.wakeUp = true;
      controller.mapViewTo(opt.ships.my);
      controller.statusBarInfo('Игра началась. Твой ход!', true);
      controller.connectUnbind('shipReady');
      controller.connectBind('changeStep');
      DGame.Helpers.controlBarBlock(false);
    } else {
      controller.statusBarInfo('Игра начилась. Ожидание очереди хода....', true);
      controller.connectUnbind('shipReady');
      controller.connectBind('changeStep');
    }
  },
  '{model} changeStep': function (model, event, data) {
    var controller = this, mainBlock = this.element, opt = this.options,
      newActions = DGame.Helpers.compareObj(data.actions, opt.playersHistory);
    if (DGame.Helpers.objLength(newActions)) {
      opt.playersHistory = data.actions;
      for (var plID in newActions) {
        var plAct = newActions[plID];
        for (var key in plAct) {
          if (DGame.Helpers.isNum(key)) {
            for (var unit in plAct[key]) {
              var uAct = plAct[key][unit];
              if (unit == 'ship') {
                var from = $('.ship.player_' + plID).parent();
                var where = $('.sea[data-posx=' + uAct.x + '][data-posy=' + uAct.y + ']');
                controller.shipMove(from, where, plID);
                controller.mapViewTo(uAct);
              } else if (unit.substr(0, 3) == 'pl_') {
                var unitID = parseInt(unit.substr(3), 10);
                var who = $('.pirateUnit[data-id=' + unitID + ']');
                var fromDataPosStr = '[data-posx=' + who.attr('data-posx') + '][data-posy=' + who.attr('data-posy') + ']';
                var whereDataPosStr = '[data-posx=' + uAct.x + '][data-posy=' + uAct.y + ']';
                var from = $('.mapField' + fromDataPosStr + ',.sea' + fromDataPosStr);
                var where = $('.mapField' + whereDataPosStr + ',.sea' + whereDataPosStr);
                controller.unitMove(from, who, where);
                controller.mapViewTo(uAct);
              }
            }
          }
        }
      }
    }
    if (data.putStep) {
      opt.activeStep = true;
      DGame.Helpers.controlBarBlock(false);
      controller.wakeUp();
      if (!opt.stepActions.reloadMySteps) controller.reloadMySteps();
      opt.storage.save(opt);
    }
  },
  wakeUp: function () {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (!opt.stepActions.wakeUp) {
      controller.statusBarInfo('Твой ход!');
      controller.mapViewTo(opt.ships.my);
      opt.stepActions.wakeUp = true;
    }
  },
  '{model} breakStep': function (model, event, data) {
    var controller = this, mainBlock = this.element, opt = this.options;
    opt.stepActions = {};
    delete opt.playersHistory[data.playerId];
  },
  '{mapField} click': function (obj, e) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (typeof opt.change != 'undefined' && opt.change.length) {
      if (opt.change.hasClass('pirateUnit')) {
        var dataPosStr = '[data-posx=' + opt.change.attr('data-posx') + '][data-posy=' + opt.change.attr('data-posy') + ']';
        var from = $('.mapField' + dataPosStr + ',.sea' + dataPosStr);
        if (controller.checkMove(from, opt.change, obj)) {
          controller.unitMove(from, opt.change, obj);
        } else {
          controller.statusError('MOVING_ERROR', controller.getPlayer(opt.change.attr('data-id'))).statusBarShow();
        }
      } else if (opt.change.hasClass('ship')) {
        controller.statusError('SHIP_MOVING_LAND_ERROR', {}).statusBarShow();
      }
    } else {
      console.log('NO CHANGED');
    }
  },
  '{mapField} mouseenter': function (obj, e) {
    var controller = this, mainBlock = this.element, opt = this.options,
      units = controller.getXYPlayer(obj.attr('data-posx'), obj.attr('data-posy'));
    if ($(':animated').length) return false;

    for (var k in units) {
      var players = units[k];
      if (k == 'my') {
        DGame.Helpers.circleMenu(obj, players, function (el, o) {
          if (el.my) {
            opt.change = $('.pirateUnit[data-id=' + el.id + ']');
          } else {
            opt.change = {};
          }
          controller.statusBarInfo($('#TMPL_StatusBarPirateInfo').tmpl(el)).statusBarShow();
        }, function () {
          $('.mapField[data-posx=' + obj.attr('data-posx') + '][data-posy=' + obj.attr('data-posy') + ']').click();
        });
      } else {
        DGame.Helpers.circleMenu(obj, players, function (el, o) {
          if (el.my) {
            opt.change = $('.pirateUnit[data-id=' + el.id + ']');
          } else {
            opt.change = {};
          }
          controller.statusBarInfo($('#TMPL_StatusBarPirateInfo').tmpl(el)).statusBarShow();
        }, function () {
          $('.mapField[data-posx=' + obj.attr('data-posx') + '][data-posy=' + obj.attr('data-posy') + ']').click();
        });
      }
    }
  },
  '{mapField} mouseleave': function (obj, e) {
    var controller = this, mainBlock = this.element, opt = this.options;
  },
  seaClick: function (obj, e) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (DGame.Helpers.objLength(opt.change)) {
      if (opt.change.hasClass('pirateUnit')) {
        console.log('pirate.........');
      } else if (opt.change.hasClass('ship')) {
        var from = opt.change.parent();
        if (controller.checkMove(from, opt.change, obj)) {
          controller.shipMove(from, obj);
        } else {
          controller.statusError('SHIP_MOVING_ERROR', {}).statusBarShow();
        }
      }
    } else {
      console.log('NO CHANGED');
    }
  },
  checkMove: function (from, who, where) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (!opt.activeStep) {
      return false;
    }
    if ($(':animated').length) {
      return false;
    }

    if (who.hasClass('pirateUnit')) {
      if (where.hasClass('mapField')) {
        var whoPos = {x: who.attr('data-posx') * 1, y: who.attr('data-posy') * 1},
          wherePos = {x: where.attr('data-posx') * 1, y: where.attr('data-posy') * 1},
          whoId = who.attr('data-id'), pl = controller.getPlayer(whoId);
        if ((pl.steps > 0)
          && ((Math.abs(whoPos.x - wherePos.x) == 1 && whoPos.y == wherePos.y)
          || (Math.abs(whoPos.y - wherePos.y) == 1 && whoPos.x == wherePos.x))) {
          return true;
        }
      }
    } else if (who.hasClass('ship')) {
      if (where.hasClass('sea')) {
        var whoPos = {x: from.attr('data-posx') * 1, y: from.attr('data-posy') * 1};
        var wherePos = {x: where.attr('data-posx') * 1, y: where.attr('data-posy') * 1};
        if ((whoPos.x == wherePos.x == 0 || whoPos.y == wherePos.y == 0)
          && (whoPos.x == opt.ships.my.x && whoPos.y == opt.ships.my.y)
          && opt.ships.my.steps > 0
          && ((Math.abs(whoPos.x - wherePos.x) == 1 && whoPos.y == wherePos.y)
          || (Math.abs(whoPos.y - wherePos.y) == 1 && whoPos.x == wherePos.x))) {
          return true;
        }
      }
    }
    return false;
  },
  unitMove: function (from, who, where) {
    var controller = this, mainBlock = this.element, opt = this.options, objFrom = {}, objWhere = {};
    setTimeout(function () {
      DGame.Helpers.circleMenuReset();
    }, 1000);
    opt.cUnit.show(who);
    var whoId = who.attr('data-id'), objPlayer = controller.getPlayer(whoId);
    var whoPos = {x: who.attr('data-posx') * 1, y: who.attr('data-posy') * 1};
    var wherePos = {x: where.attr('data-posx') * 1, y: where.attr('data-posy') * 1};
    if (whoPos.x < wherePos.x && whoPos.y == wherePos.y) {
      opt.cUnit.moveRight(who);
    } else if (whoPos.x > wherePos.x && whoPos.y == wherePos.y) {
      opt.cUnit.moveLeft(who);
    } else if (whoPos.x == wherePos.x && whoPos.y < wherePos.y) {
      opt.cUnit.moveDown(who);
    } else if (whoPos.x == wherePos.x && whoPos.y > wherePos.y) {
      opt.cUnit.moveUp(who);
    }
    if (!where.attr('data-isanim')) {
      controller.openField(where);
    }
    controller.playerChange(whoId, {steps: '-=1'});
    if (from.hasClass('mapField')) {
      objFrom = opt.mapInfo[whoPos.y][whoPos.x];
    } else if (from.hasClass('sea') && from.find('.ship').length) {
      objFrom = opt.ships;
    }
    if (where.hasClass('mapField')) {
      objWhere = opt.mapInfo[wherePos.y][wherePos.x];
    } else if (where.hasClass('sea') && where.find('.ship').length) {
      objWhere = opt.ships;
    }
    controller.playerMove(objFrom, objWhere, whoId);
    if (objPlayer.my) {
      controller.statusBarInfo($('#TMPL_StatusBarPirateInfo').tmpl(objPlayer));
      var send = {putStep: {}};
      send['putStep']['pl_' + whoId] = wherePos;
      controller.connectSend(send);
    } else {
      opt.storage.save(opt);
    }
  },
  shipMove: function (from, where, playerId) {
    var controller = this, mainBlock = this.element, opt = this.options, ship = from.find('.ship'),
      shipNew = ship.clone().appendTo($('#game')), fromPos = from.position(), wherePos = where.position(),
      fromC = {x: from.attr('data-posx'), y: from.attr('data-posy')},
      whereC = {x: where.attr('data-posx'), y: where.attr('data-posy')};
    DGame.Helpers.circleMenuReset();
    if (!playerId) {
      opt.ships.my.steps -= 1;
      opt.ships.my.x = whereC.x;
      opt.ships.my.y = whereC.y;
    } else {
      opt.ships['player_' + playerId].steps -= 1;
      opt.ships['player_' + playerId].putShip.x = whereC.x;
      opt.ships['player_' + playerId].putShip.y = whereC.y;
    }
    ship.remove();
    shipNew.css({
      top: fromPos.top + 'px',
      left: fromPos.left + 'px'
    }).animate({
        top: wherePos.top + 'px',
        left: wherePos.left + 'px'
      }, 1000, function () {
        shipNew.remove();
        ship.appendTo(where);
      });
    if (!playerId) {
      $('.pirateUnit.my[data-posx=' + whereC.x + '][data-posy=' + whereC.y + ']').each(function (num, obj) {
        console.log('ЧЕЛОВЕК ЗА БОРТОМ!!!', obj);
      });
      $('.pirateUnit.my[data-posx=' + fromC.x + '][data-posy=' + fromC.y + ']').each(function (num, obj) {
        $(obj).attr({
          'data-posx': whereC.x,
          'data-posy': whereC.y
        }).css({
            top: wherePos.top + 'px',
            left: wherePos.left + 'px'
          });
      });
      controller.connectSend({putStep: {ship: {x: whereC.x, y: whereC.y}}});
    } else {
      $('.pirateUnit.player_' + playerId + '[data-posx=' + whereC.x + '][data-posy=' + whereC.y + ']').each(function (num, obj) {
        console.log('ЧЕЛОВЕК ЗА БОРТОМ!!!', obj);
      });
      $('.pirateUnit.player_' + playerId + '[data-posx=' + fromC.x + '][data-posy=' + fromC.y + ']').each(function (num, obj) {
        $(obj).attr({
          'data-posx': whereC.x,
          'data-posy': whereC.y
        }).css({
            top: wherePos.top + 'px',
            left: wherePos.left + 'px'
          });
      });
      opt.storage.save(opt);
    }
  },
  unchange: function (obj, e) {
    var controller = this, mainBlock = this.element, opt = this.options;
    opt.change = {};
    controller.statusBarInfo('').statusBarHide();
  },
  pirateClick: function (obj, e) {
    var controller = this, mainBlock = this.element, opt = this.options, player = controller.getPlayer(obj.attr('data-id'));
    if (DGame.Helpers.objLength(opt.change) && opt.change.hasClass('pirateUnit') && opt.change.hasClass('my')
      && obj.hasClass('my') && opt.change.attr('data-id') != obj.attr('data-id')) {
      $('.mapField[data-posx=' + obj.attr('data-posx') + '][data-posy=' + obj.attr('data-posy') + ']').click();
    } else {
      if (obj.hasClass('my')) {
        opt.change = obj;
        player.pl = 'my';
      } else {
        player.pl = false;
      }
      controller.statusBarInfo($('#TMPL_StatusBarPirateInfo').tmpl(player)).statusBarShow();
    }
    return false;
  },
  shipClick: function (obj, e) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (obj.hasClass('my')) {
      controller.statusBarInfo($('#TMPL_StatusBarMyShipInfo').tmpl(opt.ships.my)).statusBarShow();
      opt.change = obj;
    } else {
      opt.players.grep(function (inst, indexInArray) {
        if (obj.hasClass('player_' + inst.id)) {
          controller.statusBarInfo($('#TMPL_StatusBarEnemyShipInfo').tmpl(inst)).statusBarShow();
        }
      });
    }
    return false;
  },
  pirateMouseEnter: function (obj, e) {
    var controller = this, mainBlock = this.element, opt = this.options,
      unitsInField = opt.mapInfo[obj.attr('data-posy')][obj.attr('data-posx')];
    $('#map .mapField[data-posx=' + obj.attr('data-posx') + '][data-posy=' + obj.attr('data-posy') + ']').mouseenter();
  },
  pirateMouseLeave: function (obj, e) {
    var controller = this, mainBlock = this.element, opt = this.options;
    $('#map .mapField[data-posx=' + obj.attr('data-posx') + '][data-posy=' + obj.attr('data-posy') + ']').mouseleave();
  },
  shipMouseEnter: function (obj, e) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if ($(':animated').length) return false;

    for (var k in opt.ships) {
      var v = opt.ships[k];
      if (obj.hasClass(k) && typeof v.players != 'undefined' && DGame.Helpers.objLength(v.players)) {
        DGame.Helpers.circleMenu(obj, v.players, function (el, ship) {
          if (el.my) {
            opt.change = $('.pirateUnit[data-id=' + el.id + ']');
          } else {
            opt.change = {};
          }
          controller.statusBarInfo($('#TMPL_StatusBarPirateInfo').tmpl(el)).statusBarShow();
        }, function () {
          controller.shipClick(obj, e);
        });
      }
    }
  },
  shipMouseLeave: function (obj, e) {
    var controller = this, mainBlock = this.element, opt = this.options;
  },
  reloadMySteps: function () {
    var controller = this, mainBlock = this.element, opt = this.options;
    opt.ships.my.steps = 1;
    var players = controller.getMyPlayers();
    for (var k in players) {
      players[k].steps = 1;
    }
    opt.stepActions.reloadMySteps = true;
  },
  getXYPlayer: function (x, y) {
    var controller = this, mainBlock = this.element, opt = this.options, units = opt.mapInfo[y][x], res = {};
    for (var k in units) {
      if (k == 'my') {
        res[k] = units[k].players;
      } else if (k.substr(0, 7) == 'player_') {
        res[k.substr(7)] = units[k].players;
      }
    }
    return res;
  },
  getMyPlayers: function () {
    var controller = this, mainBlock = this.element, opt = this.options, res = [];
    for (var k in opt.ships) {
      var ship = opt.ships[k];
      if (typeof ship.players != 'undefined') {
        for (var i in ship.players) {
          if (ship.players[i].my == 1) res.push(ship.players[i]);
        }
      }
    }
    for (var i in opt.mapInfo) {
      var line = opt.mapInfo[i];
      for (var j in line) {
        var elem = line[j];
        for (var pl in elem) {
          if (pl == 'my' || pl.substr(0, 7) == 'player_') {
            var player = elem[pl];
            if (typeof player.players != 'undefined') {
              for (var i in player.players) {
                if (player.players[i].my == 1) res.push(player.players[i]);
              }
            }
          }
        }
      }
    }
    return res;
  },
  getPlayer: function (id) {
    var controller = this, mainBlock = this.element, opt = this.options;
    for (var k in opt.ships) {
      var ship = opt.ships[k];
      if (typeof ship.players != 'undefined') {
        for (var i in ship.players) {
          if (ship.players[i].id == id) {
            return ship.players[i];
          }
        }
      }
    }
    for (var i in opt.mapInfo) {
      var line = opt.mapInfo[i];
      for (var j in line) {
        var elem = line[j];
        for (var pl in elem) {
          if (pl == 'my' || pl.substr(0, 7) == 'player_') {
            var player = elem[pl];
            if (typeof player.players != 'undefined') {
              for (var i in player.players) {
                if (player.players[i].id == id) {
                  return player.players[i];
                }
              }
            }
          }
        }
      }
    }
    return false;
  },
  playerChange: function (id, params) {
    var controller = this, mainBlock = this.element, opt = this.options;
    var paramsIteration = function (call) {
      for (var i in params) {
        var val = params[i], act = false;
        if (params[i].substr(0, 2) == '-=') {
          val = params[i].substr(2);
          act = '-=';
        }
        call(i, val, act);
      }
    };
    paramsIteration(function (key, val, act) {
      var player = controller.getPlayer(id);
      if (player) {
        player[key] -= 1;
      } else {
        return false;
      }
    });
    return true;
  },
  playerMove: function (from, where, id) {
    var controller = this, mainBlock = this.element, opt = this.options;
    for (var pk in from) {
      var pl = from[pk];
      if (typeof pl.players != 'undefined') {
        for (var k in pl.players) {
          var v = pl.players[k];
          if (v.id == id) {
            pl.players.splice(k, 1);
            if (typeof where[pk] == 'undefined' || typeof where[pk].players == 'undefined') {
              where[pk] = {players: []};
            }
            where[pk].players.push(v);
          }
        }
      }
    }

    return true;
  },
  ifFreeSteps: function () {
    var controller = this, mainBlock = this.element, opt = this.options, ok = false;
    if (opt.ships.my.steps) {
      return true;
    }
    $('.my').each(function (key, obj) {
      var pl = controller.getPlayer($(obj).attr('data-id'));
      if (pl.steps) {
        ok = true;
        return false;
      }
    });
    return ok;
  },
  nextPlayerStep: function () {
    var controller = this, mainBlock = this.element, opt = this.options;
    DGame.Helpers.controlBarBlock(true);
    controller.connectSend({breakStep: true});
    opt.activeStep = false;

  },
  controlBarFinStep: function () {
    var controller = this, opt = this.options, controlBar = $('#controlBar');
    if (controller.ifFreeSteps()) {
      DGame.Helpers.confrimAction('Некоторые персонажи ещё могут ходить.<br>Вы точно хотите завершить ход?', function () {
        controller.nextPlayerStep();
        $(this).dialog('close');
      }, function () {
        $(this).dialog('close');
      });
    } else {
      controller.nextPlayerStep();
    }
  },
  statusBarInfo: function (text, one) {
    var controller = this, opt = this.options, statusBar = $('#statusBar');
    if (one) {
      var values = statusBar.data('values');
      if (!values) values = [];
      for (var k in values) {
        var v = values[k];
        if (v == text) {
          return controller;
        }
      }
      values.push(text);
      statusBar.data('values', values);
    }
    statusBar.find('.info').html(text);
    opt.statusBar.text = text;
    //opt.storage.save(opt);
    return controller;
  },
  statusError: function (error, params) {
    var controller = this, opt = this.options;
    if (!params) {
      params = {};
    }
    params['error'] = error;
    controller.statusBarInfo($('#TMPL_StatusBarErrors').tmpl(params));
    return controller;
  },
  statusBarShow: function () {
    var controller = this, opt = this.options, statusBar = $('#statusBar');
    statusBar.animate({height: 115}, {
      duration: 300,
      step: function () {
        statusBar.css('overflow', 'visible');
      },
      complete: function () {
        statusBar.find('.showhide .arrows').removeClass('show');
      }
    });
    opt.statusBar.display = true;
    //opt.storage.save(opt);
    return controller;
  },
  statusBarHide: function () {
    var controller = this, opt = this.options, statusBar = $('#statusBar');
    statusBar.animate({height: 10}, {
      duration: 300,
      step: function () {
        statusBar.css('overflow', 'visible');
      },
      complete: function () {
        statusBar.find('.showhide .arrows').addClass('show');
      }
    });
    opt.statusBar.display = false;
    //opt.storage.save(opt);
    return controller;
  },
  shipTo: function (x, y, my, className) {
    var card = '<div class="card ship ' + className + '"></div>';
    if (my) {
      card = '<div class="card ship my"></div>';
    }
    $('#game .sea[data-posX=' + x + '][data-posY=' + y + ']').append($(card));
  },
  putShip: function (call) {
    var controller = this, mainBlock = this.element, opt = this.options;

    if (!$('.ui-dialog[aria-describedby=putShip]').length) {
      controller.statusBarInfo('Выбери корабль и куда ему причалить....').statusBarShow();

      opt.model.attr('show_putShip', true);
      opt.storage.save(opt);

      $('#putShip').dialog({
        autoOpen: true,
        resizable: false,
        draggable: false,
        open: function (event, ui) {
          $(event.target).parent().find('.ui-dialog-titlebar .ui-button').hide();
        },
        width: 400,
        height: 200
      });
      var hiddenDraggable = {};
      $('#putShip .ship').draggable({
        appendTo: 'body',
        helper: 'clone',
        zIndex: 9999999999999999,
        start: function (event, ui) {
          hiddenDraggable = $(this);
          hiddenDraggable.hide();
        },
        stop: function (event, ui) {
          console.log('draggable stop!!');
          if (hiddenDraggable.length) {
            hiddenDraggable.show();
            hiddenDraggable = {};
          }
        }
      });
      $('#game .sea').droppable({
        drop: function (event, ui) {
          console.log('droppable drop!!');
          console.log(hiddenDraggable.length);
          if (hiddenDraggable.length) {
            $('#putShip').dialog('close');
            var posX = $(this).attr('data-posX'), posY = $(this).attr('data-posY');

            opt.model.removeAttr('show_putShip');
            opt.storage.save(opt);

            opt.ships['my'] = {x: posX, y: posY};
            controller.connectSend({putShip: {x: posX, y: posY}});
            controller.shipTo(posX, posY, true, '');
            controller.statusBarInfo('Ожидание остальных игроков....').statusBarShow();
            hiddenDraggable = {};
            if (call) {
              call();
            }
          }
        }
      });
    }
  },
  mapViewTo: function (coord, revers, afterCall) {
    var controller = this, mainBlock = this.element, opt = this.options, css = {}, time = 700, prevX = 0, prevY = 0,
      game = $('#game'), mX = parseInt(game.css('margin-left'), 10), mY = parseInt(game.css('margin-top'), 10),
      bX = game.width() - $(window).width() + 40, bY = game.height() - $(window).height() + 40,
      x = $(window).width() / 2 - coord.x * 120, y = $(window).height() / 2 - coord.y * 120;
    DGame.Helpers.circleMenuReset();
    if (!afterCall) afterCall = function () {
    };

    if (x <= 0 && x >= -bX) {
      css['margin-left'] = x;
    } else {
      if (x > 0) {
        css['margin-left'] = 0;
      } else {
        css['margin-left'] = -bX;
      }
    }
    if (y <= 0 && y >= -bY) {
      css['margin-top'] = y;
    } else {
      if (y > 0) {
        css['margin-top'] = 0;
      } else {
        css['margin-top'] = -bY;
      }
    }
    game.animate(css, time, function () {
      if (revers) {
        game.animate({
          marginLeft: mX,
          marginTop: mY
        }, time, function () {
          afterCall();
        });
      } else {
        afterCall();
      }
    });
  },
  openField: function (x, y) {
    var controller = this, mainBlock = this.element, opt = this.options, fieldMap = {};
    if (typeof x == 'object' && x.hasClass('mapField')) {
      fieldMap = x;
    } else {
      fieldMap = mainBlock.find('.mapField[data-posX=' + x + '][data-posY=' + y + ']');
    }
    if (!fieldMap.length) return false;

    if (!fieldMap.attr('data-isAnim')) {
      fieldMap.attr('data-isAnim', '1');
      var id = fieldMap.attr('data-field'), direction = fieldMap.attr('data-direction');
      var css = {
        'background-image': "url('/st/img/cards/" + id + ".jpg')"
      };
      var attr = {};
      if (direction > 0) {
        attr['class'] = 'card cardId' + id + ' defaultRotate' + (direction * 90);
      }
      controller.fieldRotation(fieldMap, 'back', 'cardId' + id, css, attr, {180: 'rot180', 360: 'rot360'}, 1000);
    }
    return true;
  },
  fieldRotation: function (fieldBlock, frontClass, backClass, backCss, backAttr, rotations, timeCycle) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (!fieldBlock.length) return false;
    fieldBlock.empty();
    var front = $('<div class="card ' + frontClass + ' ' + rotations[180] + '"></div>');
    fieldBlock.append(front);
    var backOut = $('<div class="card ' + backClass + ' ' + rotations[360] + '"></div>');
    var backInn = $('<div class="card" style="position: static;"></div>');
    backInn.css(backCss).attr(backAttr);
    fieldBlock.append(backOut.append(backInn));
    setTimeout(function () {
      fieldBlock.find('.' + frontClass).removeClass(rotations[180]);
      fieldBlock.find('.' + backClass).removeClass(rotations[360]);
    }, timeCycle);
    var interval = setInterval(function () {
      if (fieldBlock.find('.' + frontClass).hasClass(rotations[180])) {
        var zi = fieldBlock.find('.' + frontClass).css('z-index');
        if (zi == '1') {
          fieldBlock.find('.' + frontClass).css('z-index', '3');
        } else {
          fieldBlock.find('.' + frontClass).css('z-index', '1');
        }
      } else {
        clearInterval(interval);
      }
    }, timeCycle / 2);
  },
  loadFromStorage: function () {
    var controller = this, mainBlock = this.element, opt = this.options, attrs = opt.model.attrs(), event = '';
    for (var k in opt.ships) {
      var v = opt.ships[k];
      if (k == 'my') {
        controller.shipTo(v.x, v.y, true, '');
        if (typeof v.players != 'undefined') {
          var ship = $('.ship.my').parent();
          for (var kp in v.players) {
            var unit = opt.cUnit.put(v.players[kp].id, ship.attr('data-posx'), ship.attr('data-posy'), 'my');
            opt.cUnit.hide(unit);
          }
        }
      } else {
        controller.shipTo(v.putShip.x, v.putShip.y, false, k);
        if (typeof v.players != 'undefined') {
          var ship = $('.ship.' + k).parent();
          for (var kp in v.players) {
            var unit = opt.cUnit.put(v.players[kp].id, ship.attr('data-posx'), ship.attr('data-posy'), k);
            opt.cUnit.hide(unit);
          }
        }
      }
    }
    for (var i in opt.mapInfo) {
      var line = opt.mapInfo[i];
      for (var j in line) {
        var elem = line[j];
        for (var pl in elem) {
          if (pl == 'my' || pl.substr(0, 7) == 'player_') {
            var player = elem[pl];
            if (typeof player.players != 'undefined') {
              var field = mainBlock.find('.mapField[data-posX=' + j + '][data-posY=' + i + ']');
              for (var k in player.players) {
                opt.cUnit.put(player.players[k].id, field.attr('data-posx'), field.attr('data-posy'), pl);
                controller.openField(field);
              }
            }
          }
        }
      }
    }
    for (var k in attrs) {
      var v = attrs[k];
      if (k.substring(0, 6) == 'event_' && v) {
        event = k.substring(6);
      }
    }
    if (event) {
      controller.connectBind(event);
      return true;
    } else {
      return false;
    }
  }
});

$.Controller('DGame.Controllers.Map.Storage', {
  defaults: {
    p: {}
  }
}, {
  init: function () {
    this.print();
  },
  check: function (opt) {
    var st = {}, load = true;
    this.paramsIteration(function (v) {
      st[v] = store.get(v);
      if (typeof st[v] == 'undefined') {
        load = false;
      }
    });

    if (load && st.model.id == opt.model.id && st.model.gameId == opt.model.gameId) {
      this.paramsIteration(function (v) {
        if (v == 'model') {
          for (var k in opt.model.attrs()) {
            opt.model.removeAttr(k);
          }
          opt.model.attrs(st.model);
        } else {
          opt[v] = st[v];
        }
      });
    } else {
      this.paramsIteration(function (v) {
        if (v == 'model') {
          store.set('model', opt.model.attrs());
        } else {
          store.set(v, opt[v]);
        }
      });
    }
  },
  paramsIteration: function (call) {
    for (var k in this.options.p) {
      call(this.options.p[k]);
    }
  },
  save: function (opt) {
    this.paramsIteration(function (v) {
      if (v == 'model') {
        store.set('model', opt.model.attrs());
      } else {
        if (v == 'statusBar') {
          store.set(v, $.extend(opt[v], {text: ''}));
        } else {
          store.set(v, opt[v]);
        }
      }
    });
    //this.print();
  },
  get: function (key) {
    return store.get(key);
  },
  print: function () {
    console.log(store.getAll());
  }
});

$.Controller('DGame.Controllers.Map.Unit', {
  defaults: {
    w: 70,
    h: 80,
    time: 1000,
    timeFly: 1500,
    steps: 125,
    way: '120px',
    bottom: '80px',
    top: '157px',
    left: '230px',
    right: '-10px',
    fly: '80px'
  }
}, {
  init: function () {
  },
  put: function (id, x, y, className) {
    var controller = this, mainBlock = this.element, opt = this.options, pos = {},
      field = $('.mapField[data-posx=' + x + '][data-posy=' + y + ']'), unit = $('<div class="pirateUnit ' + className + '"><div>');
    if (!field.length) {
      field = $('.sea[data-posx=' + x + '][data-posy=' + y + ']');
    }
    pos = field.position();
    unit.attr({
      'data-id': id,
      'data-posx': x,
      'data-posy': y
    }).css({
        top: pos.top + 'px',
        left: pos.left + 'px',
        marginTop: '25px',
        marginLeft: '30px',
        backgroundPositionY: opt.bottom
      });
    mainBlock.append(unit);
    return unit;
  },
  show: function (unit) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (!unit.length) return false;
    unit.show();
  },
  hide: function (unit) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (!unit.length) return false;
    unit.hide();
  },
  remove: function (unit) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (!unit.length) return false;
    unit.remove();
  },
  moveDown: function (unit) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (!unit.length) return false;
    unit.attr({
      'data-posy': unit.attr('data-posy') * 1 + 1
    }).css({
        backgroundPositionY: opt.bottom
      });
    var move = setInterval(function () {
      unit.css({
        backgroundPositionX: '+=' + opt.w
      });
    }, opt.steps);
    unit.animate({
      top: '+=' + opt.way
    }, opt.time, function () {
      clearInterval(move);
      unit.css({
        backgroundPositionX: '0px'
      });
    });
  },
  moveUp: function (unit) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (!unit.length) return false;
    unit.attr({
      'data-posy': unit.attr('data-posy') - 1
    }).css({
        backgroundPositionY: opt.top
      });
    var move = setInterval(function () {
      unit.css({
        backgroundPositionX: '+=' + opt.w
      });
    }, opt.steps);
    unit.animate({
      top: '-=' + opt.way
    }, opt.time, function () {
      clearInterval(move);
      unit.css({
        backgroundPositionX: '0px'
      });
    });
  },
  moveLeft: function (unit) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (!unit.length) return false;
    unit.attr({
      'data-posx': unit.attr('data-posx') - 1
    }).css({
        backgroundPositionY: opt.left
      });
    var move = setInterval(function () {
      unit.css({
        backgroundPositionX: '+=' + opt.w
      });
    }, opt.steps);
    unit.animate({
      left: '-=' + opt.way
    }, opt.time, function () {
      clearInterval(move);
      unit.css({
        backgroundPositionX: '0px'
      });
    });
  },
  moveRight: function (unit) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (!unit.length) return false;
    unit.attr({
      'data-posx': unit.attr('data-posx') * 1 + 1
    }).css({
        backgroundPositionY: opt.right
      });
    var move = setInterval(function () {
      unit.css({
        backgroundPositionX: '+=' + opt.w
      });
    }, opt.steps);
    unit.animate({
      left: '+=' + opt.way
    }, opt.time, function () {
      clearInterval(move);
      unit.css({
        backgroundPositionX: '0px'
      });
    });
  },
  flyDown: function (unit, coord) {
    if (!unit.length) return false;
    var controller = this, mainBlock = this.element, opt = this.options,
      pos = {x: unit.attr('data-posx'), y: unit.attr('data-posy')},
      mSize = {x: $('#game .card.sea[data-posX="0"]').length - 2, y: $('#game .card.sea[data-posY="0"]').length - 2},
      newY = mSize.y - pos.y + 1, newTime = (pos.y > mSize.y / 2) ? opt.timeFly / 2 : opt.timeFly;
    unit.attr({
      'data-posy': unit.attr('data-posy') * 1 + newY
    }).css({
        backgroundPositionY: opt.fly
      });
    var move = setInterval(function () {
      unit.css({
        backgroundPositionX: '+=' + opt.w
      });
    }, opt.steps);
    unit.animate({
      top: '+=' + (parseInt(opt.way, 10) * newY)
    }, newTime, function () {
      clearInterval(move);
      unit.css({
        backgroundPositionX: '0px',
        backgroundPositionY: opt.bottom
      });
    });
  },
  flyUp: function (unit, coord) {
    if (!unit.length) return false;
    var controller = this, mainBlock = this.element, opt = this.options,
      pos = {x: unit.attr('data-posx'), y: unit.attr('data-posy')},
      mSize = {x: $('#game .card.sea[data-posX="0"]').length - 2, y: $('#game .card.sea[data-posY="0"]').length - 2},
      newY = 0, newTime = (pos.y > mSize.y / 2) ? opt.timeFly / 2 : opt.timeFly;
    unit.attr({
      'data-posy': newY
    }).css({
        backgroundPositionY: opt.fly
      });
    var move = setInterval(function () {
      unit.css({
        backgroundPositionX: '+=' + opt.w
      });
    }, opt.steps);
    unit.animate({
      top: 0
    }, newTime, function () {
      clearInterval(move);
      unit.css({
        backgroundPositionX: '0px',
        backgroundPositionY: opt.bottom
      });
    });
  },
  flyRight: function (unit, coord) {
    if (!unit.length) return false;
    var controller = this, mainBlock = this.element, opt = this.options,
      pos = {x: unit.attr('data-posx'), y: unit.attr('data-posy')},
      mSize = {x: $('#game .card.sea[data-posX="0"]').length - 2, y: $('#game .card.sea[data-posY="0"]').length - 2},
      newX = mSize.x - pos.x + 1, newTime = (pos.y > mSize.y / 2) ? opt.timeFly / 2 : opt.timeFly;
    unit.attr({
      'data-posx': unit.attr('data-pox') * 1 + newX
    }).css({
        backgroundPositionY: opt.fly
      });
    var move = setInterval(function () {
      unit.css({
        backgroundPositionX: '+=' + opt.w
      });
    }, opt.steps);
    unit.animate({
      left: '+=' + (parseInt(opt.way, 10) * newX)
    }, newTime, function () {
      clearInterval(move);
      unit.css({
        backgroundPositionX: '0px',
        backgroundPositionY: opt.bottom
      });
    });
  },
  flyLeft: function (unit, coord) {
    if (!unit.length) return false;
    var controller = this, mainBlock = this.element, opt = this.options,
      pos = {x: unit.attr('data-posx'), y: unit.attr('data-posy')},
      mSize = {x: $('#game .card.sea[data-posX="0"]').length - 2, y: $('#game .card.sea[data-posY="0"]').length - 2},
      newX = 0, newTime = (pos.y > mSize.y / 2) ? opt.timeFly / 2 : opt.timeFly;
    unit.attr({
      'data-posy': newX
    }).css({
        backgroundPositionY: opt.fly
      });
    var move = setInterval(function () {
      unit.css({
        backgroundPositionX: '+=' + opt.w
      });
    }, opt.steps);
    unit.animate({
      left: 0
    }, newTime, function () {
      clearInterval(move);
      unit.css({
        backgroundPositionX: '0px',
        backgroundPositionY: opt.bottom
      });
    });
  },
  sinkDown: function (unit, callback) {
    if (!unit.length) return false;
    var controller = this, mainBlock = this.element, opt = this.options,
      bPos = {x: unit.css('backgroundPositionX'), y: unit.css('backgroundPositionY')};
    unit.css({
      backgroundImage: 'none',
      overflow: 'hidden'
    }).append('<div class="pirateInner" style="background-position-x: ' + bPos.x + '; background-position-y: ' + bPos.y + ';" />');
    unit.find('.pirateInner').animate({
      marginTop: 80
    }, opt.timeFly, function () {
      if (callback) {
        callback();
      }
    });
  }
});