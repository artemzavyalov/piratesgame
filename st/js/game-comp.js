can.Model.List['build'] = function (data, model) {
  var models = [];
  for (var k1 in data) {
    var line = data[k1];
    models.push(new model(line));
  }
  return new can.Model.List(models);
};

can.Model.List.prototype.grep = function (call) {
  var list = this;
  for (var i = 0; i < list.attr('length'); i++) {
    if (call(list.attr(i)) === false) return;
  }
};

can.Model.prototype.fireEvent = function (event, data) {
  var model = this;
  model.attr('event_' + event, JSON.stringify(data));
  model.attr('event', event);
};

can.Model.prototype.attrs = function (model) {
  var self = this;
  if (model) {
    can.each(model._data, function (el) {
      console.log('--', el);
      //self.attr('')
    });
  } else {
    return self._data;
  }
};

DGame.Models['Map'] = can.Model.extend({

}, {
});

DGame.Models['Player'] = can.Model.extend({

}, {
  die: function () {
    console.log('PLAYER died');
  }
});

DGame['Map'] = can.Control.extend({
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
    storage: {},
    ii: {}
  }
}, {
  getOpt: function () {
    return this.options;
  },
  init: function () {
    var controller = this, mainBlock = this.element, opt = this.options;

    opt.model.bind('event', function (e, value) {
      var data = opt.model.attr('event_' + value);
      if (controller[value]) {
        controller[value](data ? $.parseJSON(data) : undefined);
        opt.model.attr('event', '');
        opt.model.attr('event_' + value, '');
      }
    });

    opt.players.grep(function (inst) {
      if (inst.uid == '0') {
        inst.attr('photo', '/st/img/bot.png');
        inst.attr('photo_big', '/st/img/bot.png');
        inst.attr('photo_medium', '/st/img/bot.png');
      } else {
        opt.thisPlayerId = parseInt(inst.gameId, 10);
        DGame.VKAPI.getUserSmall(inst.uid, function (r) {
          var r = r.response[0];
          inst.attr('photo', r.photo);
          inst.attr('photo_big', r.photo_big);
          inst.attr('photo_medium', r.photo_medium);
        });
      }
    });

    for (var k in opt.units) {
      var my = 0;
      if (opt.units[k].id == opt.model.gameId) my = 1;

      for (var i in opt.units[k].childs) {
        opt.units[k].childs[i]['my'] = my;
        opt.units[k].childs[i]['steps'] = 1;
        opt.units[k].childs[i]['gold'] = 0;
        opt.units[k].childs[i]['blocked'] = false;
      }
    }

    DGame.Helpers.navigation();
    DGame.Helpers.statusBar();
    DGame.Helpers.controlBar();
    DGame.Helpers.confrimActionInit();

    window.OPTS = opt;// TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    opt.cUnit = new DGame.Unit('#game', {});
    window.UN = opt.cUnit;// TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    opt.storage = new DGame.Storage(mainBlock, {p: ['model', 'mapInfo', 'statusBar', 'ships', 'activeStep', 'stepActions', 'playersHistory']});
    opt.storage.check(opt);

    opt.ii = new DGame.II('#game', {config: opt, controller: controller});
    window.IIII = opt.ii;// TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
        controller.openField(mapField);
      }
    }

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

    console.log('MAP CONTROL', controller);
  },
  connectSend: function (data) {
    var controller = this, opt = this.options;
    opt.storage.save(opt);
    DGame.Connection.send($.extend({}, data));
  },
  connectBind: function (key) {
    var controller = this, opt = this.options;
    //DGame.Connection.receive(key);
    opt.model.fireEvent(key);
    opt.storage.save(opt);
  },
  connectUnbind: function (key) {
    var controller = this, opt = this.options;
    DGame.Connection.breakReceive(key);
    opt.model.attr('event_' + key, false);
    opt.storage.save(opt);
  },
  gameReady: function (data) {
    var controller = this, mainBlock = this.element, opt = this.options;
    controller.connectUnbind('gameReady');
    console.log('gameReady:', data);
    controller.putShip(function () {
      //controller.connectBind('changeShip');
      opt.ii.putShip();
    });
  },
  changeShip: function (data) {
    var controller = this, mainBlock = this.element, opt = this.options;
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
  shipReady: function (model, event, data) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (typeof opt.ships.my.players == 'undefined') {
      opt.ships.my['gold'] = 0;
      opt.ships.my['steps'] = 1;
      opt.ships.my['blocked'] = false;
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
          opt.ships['player_' + v.id]['gold'] = 0;
          opt.ships['player_' + v.id]['blocked'] = false;
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

    opt.activeStep = true;
    opt.stepActions.wakeUp = true;
    controller.mapViewTo(opt.ships.my);
    controller.statusBarInfo('Игра началась. Твой ход!', true);
    controller.connectUnbind('shipReady');

    opt.model.fireEvent('changeStep', {putStep: true});
    opt.storage.save(opt);
    DGame.Helpers.controlBarBlock(false);
  },
  changeStep: function (data) {
    data = data ? data : {};
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
  breakStep: function (data) {
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
          controller.statusBarInfo(can.view('TMPL_StatusBarPirateInfo', el)).statusBarShow();
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
          controller.statusBarInfo(can.view('TMPL_StatusBarPirateInfo', el)).statusBarShow();
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
      var whoPos = {x: who.attri('data-posx'), y: who.attri('data-posy')},
        wherePos = {x: where.attri('data-posx'), y: where.attri('data-posy')},
        whoId = who.attr('data-id'), pl = controller.getPlayer(whoId);
      if (where.hasClass('mapField') || (where.hasClass('sea') && where.find('.ship.my').length)) {
        if ((pl.steps > 0 && !pl.blocked)
          && ((Math.abs(whoPos.x - wherePos.x) == 1 && whoPos.y == wherePos.y)
          || (Math.abs(whoPos.y - wherePos.y) == 1 && whoPos.x == wherePos.x))) {
          return true;
        }
      }
    } else if (who.hasClass('ship')) {
      if (where.hasClass('sea')) {
        var whoPos = {x: from.attri('data-posx'), y: from.attri('data-posy')};
        var wherePos = {x: where.attri('data-posx'), y: where.attri('data-posy')};
        if ((whoPos.x == wherePos.x == 0 || whoPos.y == wherePos.y == 0)
          && (whoPos.x == opt.ships.my.x && whoPos.y == opt.ships.my.y)
          && opt.ships.my.steps > 0 && !opt.ships.my.blocked
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
    var whoId = who.attr('data-id'), objPlayer = controller.getPlayer(whoId),
      whoPos = {x: who.attri('data-posx'), y: who.attri('data-posy')},
      wherePos = {x: where.attri('data-posx'), y: where.attri('data-posy')};
    if (whoPos.x < wherePos.x && whoPos.y == wherePos.y) {
      opt.cUnit.moveRight(who);
    } else if (whoPos.x > wherePos.x && whoPos.y == wherePos.y) {
      opt.cUnit.moveLeft(who);
    } else if (whoPos.x == wherePos.x && whoPos.y < wherePos.y) {
      opt.cUnit.moveDown(who);
    } else if (whoPos.x == wherePos.x && whoPos.y > wherePos.y) {
      opt.cUnit.moveUp(who);
    }
    if (!where.attr('data-isanim') && !where.hasClass('sea')) {
      controller.openField(where);
    }
    if (where.hasClass('sea')) {
      setTimeout(function () {
        opt.cUnit.hide(who);
      }, 1000);
    } else {
      controller.actionsToMapBefore(who, where);
    }
    if (objPlayer.steps) controller.playerChange(whoId, {steps: '-=1'});
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
    controller.unitMakeField(who, where);
    controller.playerMove(objFrom, objWhere, whoId);
    if (!where.hasClass('sea')) controller.actionsToMapAfter(who, where);
    if (objPlayer.my) {
      controller.statusBarInfo(can.view('TMPL_StatusBarPirateInfo', objPlayer));
      var send = {putStep: {}};
      send['putStep']['pl_' + whoId] = wherePos;
      //controller.connectSend(send);
    }
    opt.storage.save(opt);
  },
  unitMakeField: function (who, field, params) {
    var controller = this, mainBlock = this.element, opt = this.options, objFrom = {}, objWhere = {};
    var whoId = who.attr('data-id'), objPlayer = controller.getPlayer(whoId), fieldInfo = null,
      fieldPos = {x: field.attri('data-posx'), y: field.attri('data-posy')};
    if (field.hasClass('sea')) {
      if (field.find('.ship.my').length) {
        if (objPlayer.gold) {
          opt.ships.my.gold += objPlayer.gold;
          objPlayer.gold = 0;
        }
      }
    } else {
      fieldInfo = opt.mapInfo[fieldPos.y][fieldPos.x];
      if (fieldInfo.gold && !objPlayer.gold) {
        objPlayer.gold = 1;
        fieldInfo.gold--;
        if (fieldInfo.gold) controller.changeLabel(field, fieldInfo.gold);
        else controller.deleteLabel(field);
      }
      if (fieldInfo.field_type == 'TRANSPORTER' && fieldInfo.field_direction == '1') {
        var goto = {}, gotoSel = '';
        if (fieldInfo.direction == 1) {
          gotoSel = '[data-posx="' + (fieldPos.x + 1) + '"][data-posy="' + fieldPos.y + '"]';
        } else if (fieldInfo.direction == 2) {
          gotoSel = '[data-posx="' + fieldPos.x + '"][data-posy="' + (fieldPos.y + 1) + '"]';
        } else if (fieldInfo.direction == 3) {
          gotoSel = '[data-posx="' + (fieldPos.x - 1) + '"][data-posy="' + fieldPos.y + '"]';
        } else if (fieldInfo.direction == 4) {
          gotoSel = '[data-posx="' + fieldPos.x + '"][data-posy="' + (fieldPos.y - 1) + '"]';
        }
        goto = $('.mapField' + gotoSel + ',.sea' + gotoSel);
        if (goto.length && (goto.hasClass('mapField') || (goto.hasClass('sea') && goto.find('.ship.my').length))) {
          setTimeout(function () {
            controller.unitMove(field, who, goto);
          }, 1000);
        }
      }
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
      //controller.connectSend({putStep: {ship: {x: whereC.x, y: whereC.y}}});
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
      controller.statusBarInfo(can.view('TMPL_StatusBarPirateInfo', player)).statusBarShow();
    }
    return false;
  },
  shipClick: function (obj, e) {
    var controller = this, mainBlock = this.element, opt = this.options;
    if (obj.hasClass('my')) {
      var dataPosX = (opt.change && opt.change.length) ? opt.change.attri('data-posx') : -1,
        dataPosY = (opt.change && opt.change.length) ? opt.change.attri('data-posy') : -1,
        objPosX = obj.parent('.sea').attri('data-posx'), objPosY = obj.parent('.sea').attri('data-posy');
      if (opt.change && opt.change.length && opt.change.hasClass('pirateUnit')
        && ((dataPosX == objPosX && Math.abs(dataPosY - objPosY) == 1)
        || (dataPosY == objPosY && Math.abs(dataPosX - objPosX) == 1))) {
        var dataPosStr = '[data-posx=' + dataPosX + '][data-posy=' + dataPosY + ']',
          from = $('.mapField' + dataPosStr + ',.sea' + dataPosStr);
        if (controller.checkMove(from, opt.change, obj.parent('.sea'))) {
          controller.unitMove(from, opt.change, obj.parent('.sea'));
        } else {
          opt.change = obj;
          controller.statusBarInfo(can.view('TMPL_StatusBarMyShipInfo', opt.ships.my)).statusBarShow();
        }
      } else {
        controller.statusBarInfo(can.view('TMPL_StatusBarMyShipInfo', opt.ships.my)).statusBarShow();
        opt.change = obj;
      }
    } else {
      opt.players.grep(function (inst, indexInArray) {
        if (obj.hasClass('player_' + inst.gameId)) {
          inst.gold = opt.ships['player_' + inst.gameId].gold;
          controller.statusBarInfo(can.view('TMPL_StatusBarEnemyShipInfo', inst)).statusBarShow();
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
          controller.statusBarInfo(can.view('TMPL_StatusBarPirateInfo', el)).statusBarShow();
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
      var player = players[k];
      if (player.blocked && DGame.Helpers.isNum(player.blocked)) {
        player.blocked--;
        if (player.blocked == 0) player.blocked = false;
      }
      player.steps = 1;
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
  pirateMove: function (who, where) {
    var controller = this, mainBlock = this.element, opt = this.options;
    who.css({
      left: where.position().left,
      top: where.position().top
    });
  },
  pirateReplaceToShip: function (unit, coords) {
    var controller = this, mainBlock = this.element, opt = this.options,
      unitId = unit.attri('data-id'), objPlayer = controller.getPlayer(unitId),
      unitPos = coords ? coords : {x: unit.attri('data-posx'), y: unit.attri('data-posy')};
    controller.playerMove(opt.mapInfo[unitPos.y][unitPos.x], opt.ships, unitId);
    controller.pirateMove(unit, $('.ship.' + unit.attr('data-cls')).parent());
    unit.attr('data-posx', opt.ships[unit.attr('data-cls')].x).attr('data-posy', opt.ships[unit.attr('data-cls')].y);
  },
  ifFreeSteps: function () {
    var controller = this, mainBlock = this.element, opt = this.options, ok = false;
    if (opt.ships.my.steps) {
      return true;
    }
    $('.my').each(function (key, obj) {
      var pl = controller.getPlayer($(obj).attr('data-id'));
      if (pl.steps && !pl.blocked) {
        ok = true;
        return false;
      }
    });
    return ok;
  },
  nextPlayerStep: function () {
    var controller = this, mainBlock = this.element, opt = this.options;
    DGame.Helpers.controlBarBlock(true);
    //controller.connectSend({breakStep: true});
    opt.activeStep = false;
    opt.ii.putStep();
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
    opt.statusBar['text'] = text;
    //opt.storage.save(opt);
    return controller;
  },
  statusError: function (error, params) {
    var controller = this, opt = this.options;
    console.log('statusError:', error);
    if (!params) {
      params = {};
    }
    params['error'] = error;
    controller.statusBarInfo(can.view('TMPL_StatusBarErrors', params));
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
            //controller.connectSend({putShip: {x: posX, y: posY}});
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
  calcFieldRandoms: function (fieldInfo) {
    return parseInt(fieldInfo.field_number, 10) == 0 ?
      DGame.Helpers.getRandomInt(fieldInfo.field_intervalRandomS, fieldInfo.field_intervalRandomE) :
      parseInt(fieldInfo.field_number, 10);
  },
  actionsToMapBefore: function (who, field) {
    var controller = this, mainBlock = this.element, opt = this.options,
      fieldPos = {x: field.attri('data-posx'), y: field.attri('data-posy')},
      fieldInfo = opt.mapInfo[fieldPos.y][fieldPos.x],
      whoId = who.attr('data-id'), objPlayer = controller.getPlayer(whoId);
    switch (fieldInfo.field_id) {
      case '5'://капкан
        var piratesInField = controller.getXYPlayer(fieldPos.x, fieldPos.y);
        if (piratesInField && piratesInField.my && piratesInField.my.length) {
          for (var i = 0; i < piratesInField.my.length; i++) {
            piratesInField.my[i].blocked = false;
          }
        } else {
          objPlayer.blocked = true;
        }
        break;
    }
    switch (fieldInfo.field_type) {
      case 'GOLD':
      case 'COSTLY':
        if (!fieldInfo.clean) {
          if (fieldInfo.field_number == 0)
            fieldInfo.field_number = controller.calcFieldRandoms(fieldInfo);
          fieldInfo.gold = parseInt(fieldInfo.field_number, 10);
          controller.addLabel(field, 'gold', fieldInfo.field_number);
          fieldInfo.clean = true;
        }
        break;
    }
  },
  actionsToMapAfter: function (who, field) {
    var controller = this, mainBlock = this.element, opt = this.options,
      fieldPos = {x: field.attri('data-posx'), y: field.attri('data-posy')},
      fieldInfo = opt.mapInfo[fieldPos.y][fieldPos.x],
      whoId = who.attr('data-id'), objPlayer = controller.getPlayer(whoId);
    console.log('fieldInfo after', fieldInfo);
    switch (fieldInfo.field_id) {
      case '2'://болото
      case '23'://дикая конопля
      case '24'://лианы
        objPlayer.blocked = controller.calcFieldRandoms(fieldInfo);
        break;
      case '8'://пушка
        if (fieldInfo.clean) break;
        var unitF = $('.pirateUnit[data-posx=' + fieldPos.x + '][data-posy=' + fieldPos.y + ']'),
          ifMy = unitF.hasClass('my') ? ':not(.my)' : '.my', units = {}, revert = false, fly = '';
        if (fieldInfo.direction == 4) {
          fly = 'flyUp';
          revert = true;
          units = $('.pirateUnit' + ifMy + '[data-posx=' + fieldPos.x + ']').filter(function () {
            return $(this).attri('data-posy') < fieldPos.y;
          });
        }
        if (fieldInfo.direction == 3) {
          fly = 'flyLeft';
          revert = true;
          units = $('.pirateUnit' + ifMy + '[data-posy=' + fieldPos.y + ']').filter(function () {
            return $(this).attri('data-posx') < fieldPos.x;
          });
        }
        if (fieldInfo.direction == 2) {
          fly = 'flyDown';
          units = $('.pirateUnit' + ifMy + '[data-posx=' + fieldPos.x + ']').filter(function () {
            return $(this).attri('data-posy') > fieldPos.y;
          });
        }
        if (fieldInfo.direction == 1) {
          fly = 'flyRight';
          units = $('.pirateUnit' + ifMy + '[data-posy=' + fieldPos.y + ']').filter(function () {
            return $(this).attri('data-posx') > fieldPos.x;
          });
        }
        units.each(function (i) {
          var unit = $(this), unitId = unit.attri('data-id'), objPlayer = controller.getPlayer(unitId),
            unitPos = {x: unit.attri('data-posx'), y: unit.attri('data-posy')};

          if (objPlayer.gold) objPlayer.gold = 0;
          setTimeout(function () {
            controller.mapViewTo(unitPos);
            setTimeout(function () {
              opt.cUnit[fly](unit, function () {
                opt.cUnit.hide(unit);
                controller.pirateReplaceToShip(unit, unitPos);
              });
            }, 100);
          }, 1000);
        });
        fieldInfo.clean = true;
        break;
      case '18':// подзорная труба
        if (fieldInfo.clean) break;
        var fields = {}, revert = false;
        if (fieldInfo.direction == 4) {
          revert = true;
          fields = $('.mapField[data-posx=' + fieldPos.x + ']').filter(function () {
            return $(this).attri('data-posy') < fieldPos.y;
          });
        }
        if (fieldInfo.direction == 3) {
          revert = true;
          fields = $('.mapField[data-posy=' + fieldPos.y + ']').filter(function () {
            return $(this).attri('data-posx') < fieldPos.x;
          });
        }
        if (fieldInfo.direction == 2) {
          fields = $('.mapField[data-posx=' + fieldPos.x + ']').filter(function () {
            return $(this).attri('data-posy') > fieldPos.y;
          });
        }
        if (fieldInfo.direction == 1) {
          fields = $('.mapField[data-posy=' + fieldPos.y + ']').filter(function () {
            return $(this).attri('data-posx') > fieldPos.x;
          });
        }
        fields.each(function (i) {
          var $th = $(this), time = revert ? (fields.length - i) * 80 : i * 80;
          setTimeout(function () {
            controller.openField($th);
          }, time);
        });
        fieldInfo.clean = true;
        break;
      case '21':// ураган
        var flyDirs = ['flyUp', 'flyDown', 'flyRight', 'flyLeft'];
        if (objPlayer.gold) objPlayer.gold = 0;
        setTimeout(function () {
          opt.cUnit[flyDirs[DGame.Helpers.getRandomInt(0, 3)]](who, function () {
            opt.cUnit.hide(who);
            controller.pirateReplaceToShip(who, fieldPos);
          });
        }, 1000);
        break;
      case '25':// зелье
        if (fieldInfo.clean) break;
        objPlayer.steps += controller.calcFieldRandoms(fieldInfo);
        fieldInfo.clean = true;
        break;
    }
  },
  addLabel: function (field, type, txt) {
    var controller = this, mainBlock = this.element, opt = this.options;
    switch (type) {
      case 'gold':
        field.append('<div class="label gold">' + txt + '</div>');
        break;
    }
  },
  changeLabel: function (field, txt) {
    var controller = this, mainBlock = this.element, opt = this.options;
    field.find('.label').text(txt);
  },
  deleteLabel: function (field) {
    field.find('.label').remove();
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
    return fieldMap;
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

DGame['Storage'] = can.Control.extend({
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
