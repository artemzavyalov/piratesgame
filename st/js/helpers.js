$.extend(DGame, {VKAPI: {
    isAppUser: function(id, callback){
        var params = {};
        if(id) {
            params['uid'] = id;
        }
        if(typeof VK.Api != 'undefined') {
            VK.Api.call('isAppUser', params, callback);
        } else if(typeof VK.api != 'undefined') {
            VK.api('isAppUser', params, callback);
        }
    },
    getUserSmall: function(id, callback){
        if(typeof VK.Api != 'undefined') {
            VK.Api.call('users.get', {uids: id, fields: 'photo, photo_medium, photo_big'}, callback);
        } else if(typeof VK.api != 'undefined') {
            VK.api('users.get', {uids: id, fields: 'photo, photo_medium, photo_big'}, callback);
        }
    },
    getUser: function(id, callback){
        var code =  'var user=API.users.get({"uids": "' + id + '", "fields": "uid,first_name,last_name,nickname,' +
            'screen_name,sex,bdate,city,country,timezone,photo,photo_medium,photo_big,has_mobile,rate,contacts"});' +
            'var city=API.places.getCityById({"cids": user@.city});' +
            'var country=API.places.getCountryById({"cids": user@.country});' +
            'return {"user": user, "city": city, "country": country};';
        if(typeof VK.Api != 'undefined') {
            VK.Api.call('execute', {'code': code}, callback);
        } else if(typeof VK.api != 'undefined') {
            VK.api('execute', {'code': code}, callback);
        }
    },
    getAppFriends: function(callback){
        if(typeof VK.Api != 'undefined') {
            VK.Api.call('friends.getAppUsers', {}, callback);
        } else if(typeof VK.api != 'undefined') {
            VK.api('friends.getAppUsers', {}, callback);
        }
    },
    getFriends: function(id, callback) {
        var params = {fields: 'uid,first_name,last_name,bdate,photo,photo_medium,photo_big'};
        if(id) {
            params['uid'] = id;
        }
        if(typeof VK.Api != 'undefined') {
            VK.Api.call('friends.get', params, callback);
        } else if(typeof VK.api != 'undefined') {
            VK.api('friends.get', params, callback);
        }
    }
}});

$.extend(DGame, {Helpers: {
    getRandomInt: function(min, max){
        min = parseInt(min, 10);
        max = parseInt(max, 10);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    objGetProp: function(obj){
        for (var i in obj) {
            return obj[i];
        }
    },
    objLength: function(obj){
        var count = 0;
        for(var k in obj) {
            count++;
        }
        return count;
    },
    isNum: function(variable){
        return (typeof variable == 'string' && !isNaN(variable)) || (typeof variable == 'number');
    },
    // Возвращает отличия первого объекта от второго
    compareObj: function(obj){
        var inst = this, arr_dif = {}, i = 1, argc = arguments.length, argv = arguments, key, val, found=false;
        for ( key in obj ){
            val = obj[key];
            for (i = 1; i< argc; i++){
                found = false;
                if(argv[i][key]){
                    if((typeof argv[i][key] == 'object' || typeof argv[i][key] == 'array')
                        && (typeof val == 'object' || typeof val == 'array')) {
                        var comp = inst.compareObj(val, argv[i][key]);
                        if(inst.objLength(comp)) {
                            arr_dif[key] = comp;
                            found = true;
                            break;
                        } else {
                            found = true;
                            break;
                        }
                    } else {
                        if(val == argv[i][key]) {
                            found = true;
                            break;
                        }
                    }
                }
                if(!found){
                    arr_dif[key] = val;
                }
            }
        }
        return arr_dif;
    },
    findIdInObj: function(obj, id){
        for(var k in obj) {
            if(obj[k].id == id) {
                return obj[k];
            }
        }
        return false;
    },
    statusBar: function(){
        var map = $('#map'), statusBar = $('#statusBar');
        statusBar.find('.showhide').click(function(){
            if($(this).find('.arrows').hasClass('show')) {
                DGame.MAP.statusBarShow();
            } else {
                DGame.MAP.statusBarHide();
            }
            return false;
        });
        statusBar.show();
    },
    blockMap: function(cursor){
        var block = $('#blockDisplay');
        if(cursor) {
            block.css('cursor', cursor);
        }
        block.show();
    },
    unblockMap: function(){
        var block = $('#blockDisplay');
        block.hide();
    },
    controlBar: function(){
        var map = $('#map'), controlBar = $('#controlBar');
        controlBar.find('.finishStep').click(function(){
            if(!$(this).hasClass('grey')) {
                DGame.MAP.controlBarFinStep();
            }
        }).hover(function(){
                if(!$(this).hasClass('grey')) {
                    $(this).css({cursor: 'pointer', backgroundPositionY: '50%'});
                }
            }, function(){
                if(!$(this).hasClass('grey')) {
                    $(this).css({cursor: 'default', backgroundPositionY: '0%'});
                }
            });
    },
    controlBarBlock: function(block){
        var map = $('#map'), controlBar = $('#controlBar');
        if(block) {
            controlBar.find('.finishStep').addClass('grey').css({ backgroundPositionY: '100%'});
        } else {
            controlBar.find('.finishStep').removeClass('grey').css({ backgroundPositionY: '0%'});
        }
    },
    navigation: function(){
        var block = $('#blockDisplay'), prevX = 0, prevY = 0, moving = false, evClick = {},
            bX = $('#game').width() - $(window).width() + 40, bY = $('#game').height() - $(window).height() + 40;
        var down = function(eDown){
            evClick = eDown;
            moving = false;
            if(!$(eDown.target).closest('#statusBar, #controlBar, .cMenu, .ui-widget').length) {
                DGame.Helpers.blockMap('move');
                $(document).mouseup(up);
            }
            setTimeout(function(){ if(moving) DGame.Helpers.circleMenuReset(); }, 500);
            return false;
        };
        var up = function(eUp){
            DGame.Helpers.unblockMap();
            prevX = 0;
            prevY = 0;
            $(document).unbind('mouseup', up);
            if(!moving && eUp.type != 'mouseleave') {
                $(evClick.target).click();
            }
            return false;
        };
        block.mousemove(function(eMove){
            var x = eMove.pageX, y = eMove.pageY, offsetX = 0, offsetY = 0;
            moving = true;
            if(prevX && prevY) {
                var css = {}, mX = parseInt($('#game').css('margin-left'), 10), mY = parseInt($('#game').css('margin-top'), 10);
                offsetX = x - prevX;
                offsetY = y - prevY;

                if(mX + offsetX <= 0 && mX + offsetX >= -bX) {
                    css['margin-left'] = mX + offsetX;
                }
                if(mY + offsetY <= 0 && mY + offsetY >= -bY) {
                    css['margin-top'] = mY + offsetY;
                }
                $('#game').css(css);
            }
            prevX = x;
            prevY = y;
            return false;
        });
        $(document).mousedown(down);
        $('body').mouseleave(up);
    },
    confrimActionInit: function(){
        $('#confirmAction').dialog({
            autoOpen: false,
            resizable: false,
            draggable: false,
            width: 500,
            height: 200,
            buttons: [
                {
                    text: 'Да',
                    click: function(){

                    }
                },
                {
                    text: 'Нет',
                    click: function(){

                    }
                }
            ]
        });
    },
    confrimAction: function(text, handlerOk, handlerNo){
        $('#confirmAction').html(text).dialog( "option", "buttons", [
            {
                text: 'Да',
                click: handlerOk
            }, {
                text: 'Нет',
                click: handlerNo
            }
        ]).dialog('open');
    },
    circleMenu: function(obj, data, clickElemHandler, clickMainHandler){
        if($('.cMenu').length) {
            return false;
        }
        var pos = obj.offset(), menu = $('<div class="cMenu" style="left: '+pos.left+'px; top: '+pos.top+'px;"></div>'),
            radius = 40, centrX = 40, centrY = 40, parts = DGame.Helpers.objLength(data), num = 0;

        if(!parts) return false;

        for(var alfa = 90; alfa > -270; alfa -= 360 / parts) {
            var corner = 2 * Math.PI - alfa / 180 * Math.PI;
            var x = parseFloat(radius * Math.cos(corner) + centrX);
            var y = parseFloat(radius * Math.sin(corner) + centrY);
            var el = $('<div class="cElem" data-num="'+num+'" ></div>').css({
                top: y,
                left: x,
                'background-image': 'url("/st/img/pirates/' + data[num]['id'] + '.png")'
            }).click(function(){
                    clickElemHandler(data[$(this).attr('data-num')], obj);
                    return false;
                });
            menu.append(el);
            num++;
        }
        menu.mouseleave(function(e){
            $(this).remove();
        }).click(function(){
                clickMainHandler();
                return false;
            });
        $('#container').append(menu);
    },
    circleMenuReset: function(){
        $('.cMenu').mouseleave();
    }
}});

$.extend(DGame, {Connection: {
    cacheQueries: {},
    cacheResponses: {},
    send: function(params){
        $.extend(true, this.cacheQueries, params);
        console.log('send:', $.extend({}, this.cacheQueries), params);
    },
    receive: function(params){
        var objParam = {};
        objParam[params] = true;
        $.extend(true, this.cacheResponses, objParam);
    },
    breakReceive: function(key) {
        for(var k in this.cacheResponses) {
            if(k == key) {
                delete this.cacheResponses[k];
            }
        }
    },
    start: function(obj){
        var t = this;
        setInterval(function(){
            var query = t.cacheQueries;
            if(DGame.Helpers.objLength(query)) console.log('sending... ', query);
            $.extend(query, t.cacheResponses);
            $.extend(query, {id: obj.id, gameId: obj.gameId});
            $.post('/?a=changeMap', query, function(answer){
                $.each(answer, function(key, val){
                    if(t.cacheResponses[key]) {
                        $.event.trigger(key, [val], obj, true);
                    }
                    if(t.cacheQueries[key]) {
                        $.event.trigger(key, [val], obj, true);
                    }
                });
                t.cacheQueries = {};
            }, 'json');
        }, 2000);
    }
}});

$.fn.attri = function(name){
    return parseInt($(this).attr(name), 10);
};