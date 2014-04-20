DGame.Map.prototype.getPlayers = function(plId, params){
    var controller = this, mainBlock = this.element, opt = this.options, res = [];
    params = params ? params : {};
    for(var k in opt.ships) {
        var ship = opt.ships[k];
        if(typeof ship.players != 'undefined') {
            for(var i in ship.players) {
                if(ship.players[i].my == 0) {
                    if(params.blocked && ship.players[i].blocked) {
                    } else {
                        res.push(ship.players[i]);
                    }
                }
            }
        }
    }
    for(var i in opt.mapInfo) {
        var line = opt.mapInfo[i];
        for(var j in line) {
            var elem = line[j];
            for(var pl in elem) {
                var player = elem[pl];
                if(typeof player.players != 'undefined') {
                    for(var i in player.players) {
                        if(player.players[i].my == 0) {
                            if(params.blocked && player.players[i].blocked) {
                            } else {
                                res.push(player.players[i]);
                            }
                        }
                    }
                }
            }
        }
    }
    return res;
};

DGame['II'] = can.Control.extend({
    defaults: {

    }
},{
    init: function(){
        var controller = this;
        controller.options.config.players.grep(function(inst){
            if(inst.id == '0') {
                controller.options.bot = inst;
            }
        });
    },
    putShip: function(){
        var controller = this, opt = this.options, config = opt.config, bot = opt.bot, MAP = opt.controller;
        var act = {
            putShip: {x:'', y:''},
            playerId: bot.gameId
        };
        if(config.ships.my.x == '0' || config.ships.my.x == '11') {
            act.putShip.x = config.ships.my.x == '0' ? '11' : '0';
            act.putShip.y = DGame.Helpers.getRandomInt(1, 10);
        } else if(config.ships.my.y == '0' || config.ships.my.y == '11') {
            act.putShip.x = DGame.Helpers.getRandomInt(1, 10);
            act.putShip.y = config.ships.my.y == '0' ? '11' : '0';
        }
        config.model.fireEvent('changeShip', [act]);
    },
    getPls: function(){
        var controller = this, opt = this.options, config = opt.config, bot = opt.bot, MAP = opt.controller;
        return MAP.getPlayers(bot.gameId, {blocked: true});
    },
    goUnit: function(id, goto){
        var controller = this, opt = this.options, config = opt.config, bot = opt.bot, MAP = opt.controller,
            playerId = bot.gameId, players = MAP.getPlayers(playerId, {blocked: true}), acts = [];
        var plObj = $('.pirateUnit[data-id='+id+']'), plPosX = plObj.attri('data-posx'), plPosY = plObj.attri('data-posy');
        var unitId = 'pl_' + id;
        var act = {actions: {}};
        act['actions'][playerId] = {};
        act['actions'][playerId]['0'] = {};
        if(goto == 'left') goto = {x: -1, y: 0};
        if(goto == 'right') goto = {x: 1, y: 0};
        if(goto == 'top') goto = {x: 0, y: -1};
        if(goto == 'bottom') goto = {x: 0, y: 1};
        act['actions'][playerId]['0'][unitId] = {x: plPosX + goto.x, y: plPosY + goto.y};
        config.model.fireEvent('changeStep', act);
    },
    nextStep: function(){
        var controller = this, opt = this.options, config = opt.config, bot = opt.bot;
        config.model.fireEvent('breakStep', {playerId: bot.gameId});
        config.model.fireEvent('changeStep', {putStep: true});
    },
    setIIPlaces: function(){
        var controller = this, opt = this.options, config = opt.config, bot = opt.bot, MAP = opt.controller;
    },
    getIIPlaces: function(){
        var controller = this, opt = this.options, config = opt.config, bot = opt.bot, MAP = opt.controller;
    },
    putStep: function(){
        var controller = this, opt = this.options, config = opt.config, bot = opt.bot, MAP = opt.controller,
            playerId = bot.gameId, players = MAP.getPlayers(playerId, {blocked: true}), acts = [];
        $.each(players, function(i, pl){
            var plObj = $('.pirateUnit[data-id='+pl.id+']'), goto = null, unitId = 'pl_' + pl.id,
                plPosX = parseInt(plObj.attr('data-posx'), 10), plPosY = parseInt(plObj.attr('data-posy'), 10),
                act = {actions: {}};
            goto = controller.anyFreePlace(plObj, pl, acts);
            act['actions'][playerId] = {};
            act['actions'][playerId]['0'] = {};
            act['actions'][playerId]['0'][unitId] = {x: plPosX + goto.x, y: plPosY + goto.y};
            acts.push(act);
        });

        var moving = setInterval(function(){
            var act = acts.pop();
            if(act) {
                config.model.fireEvent('changeStep', act);
            } else {
                clearInterval(moving);
                config.model.fireEvent('breakStep', {playerId: playerId});
                config.model.fireEvent('changeStep', {putStep: true});
            }
        }, 2000);
    },
    anyFreePlace: function(plDom, plData, otherPlayersGo){
        var controller = this, opt = this.options, config = opt.config, bot = opt.bot, MAP = opt.controller, ret = {x:0,y:0},
            plPosX = parseInt(plDom.attr('data-posx'), 10), plPosY = parseInt(plDom.attr('data-posy'), 10);
        if(plPosX == 0) ret.x = 1;
        else if(plPosX == 11) ret.x = -1;
        else if(plPosY == 0) ret.y = 1;
        else if(plPosY == 11) ret.y = -1;
        else {
            var all = [], closed = [];
            $('.mapField[data-posx="' + (plPosX-1) + '"][data-posy="' + (plPosY) + '"], ' +
                '.mapField[data-posx="' + (plPosX+1) + '"][data-posy="' + (plPosY) + '"], ' +
                '.mapField[data-posx="' + (plPosX) + '"][data-posy="' + (plPosY-1) + '"], ' +
                '.mapField[data-posx="' + (plPosX) + '"][data-posy="' + (plPosY+1) + '"]').each(function(){
                    var x = parseInt($(this).attr('data-posx'), 10), y = parseInt($(this).attr('data-posy'), 10),
                        diffX = x - plPosX, diffY = y - plPosY, already = false;
                    $.each(otherPlayersGo, function(i, v){
                        v = DGame.Helpers.objGetProp(DGame.Helpers.objGetProp(DGame.Helpers.objGetProp(v['actions'])));
                        if(v.x == x && v.y == y) { already = true; return false; }
                    });
                    if($(this).find('.card').length == 1 && !already) {
                        closed.push({x: diffX, y: diffY});
                    } else {
                        var field = config.mapInfo[y][x];
                        if(field.field_type != 'DANGER' && field.field_type != 'DIE') {
                            all.push({x: diffX, y: diffY});
                        }
                    }
                });
            if(closed.length) ret = closed[DGame.Helpers.getRandomInt(0, closed.length - 1)];
            else if(all.length) ret = all[DGame.Helpers.getRandomInt(0, all.length - 1)];
            else {
                console.log('II BAG!!!!!');
                debugger;
            }
        }
        return ret;
    }
});
