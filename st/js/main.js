$(function(){

    if(!Modernizr.cssanimations) {
        $('#NO_CSS_ANIMATION').dialog({
            autoOpen: true,
            width: 650,
            height: 400,
            buttons: [
                {
                    text: "OK",
                    click: function() {
                        $(this).dialog('close');
                    }
                }
            ]
        });
    } else {
        $('#settings').click(function(){
            $('#SHOW_SETTINGS').dialog({
                autoOpen: true,
                width: 650,
                height: 350,
                create: function(event, ui){
                    $('#SHOW_SETTINGS').find('.screenSlider').slider({
                        min: 700,
                        max: 1000,
                        step: 10,
                        value: $(window).height(),
                        slide: function(event, ui){
                            var val = ui.value;
                            VK.callMethod("resizeWindow", val, val);

                        }
                    });
                },
                buttons: [
                    {
                        text: "Сохранить",
                        click: function() {
                            var screenSize = $('#SHOW_SETTINGS').find('.screenSlider').slider('value');
                            $.post('/?a=editUser', {screenSize: screenSize}, function(answer){
                                console.log('edit!');
                            }, 'json');
                            $(this).dialog('close');
                        }
                    }
                ]
            });
            return false;
        });
        //$('#gameCreateComp').click(function(e){});
        $('#gameCreate').click(function(e){
            $('#friendsBlock').empty();
            $('#CREATE_GAME').dialog({
                autoOpen: true,
                width: 650,
                height: 350,
                open: function(event, ui){
                    $('#CREATE_GAME').parents('.ui-dialog').find('.ui-dialog-buttonset button').click(function(){
                        $('#CREATE_GAME form').submit();
                    });
                },
                buttons: [
                    {
                        text: "Создать",
                        click: function() {
                        }
                    }
                ]
            });
            DGame.VKAPI.getAppFriends(function(res){
                if(res.response.length) {
                    for(var i in res.response) {
                        var id = res.response[i];
                        DGame.VKAPI.getUser(id, function(res){
                            var friend = res.response.user[0];
                            availableTags.push(friend.first_name+' '+friend.last_name);
                            var blockFriend = $('<div class="friend" data-uid="'+friend.uid+'">' +
                                '<img src="'+friend.photo_medium+'" />' +
                                '<p class="name">'+friend.first_name+' '+friend.last_name+'</p>' +
                                '</div>');
                            $('#friendsBlock').append(blockFriend);
                        });
                    }
                    var availableTags = [];
                    var keyDownHandler = function(event){// Обработчик нажатий клавиш
                        setTimeout(function(){
                            switch(event.keyCode) {
                                case 8:// Нажали backspace
                                    autoCompleteSearch();
                                    break;
                                case 46:// Нажали delete
                                    autoCompleteSearch();
                                    break;
                            }
                        }, 5);
                    };
                    var autoCompleteSearch = function(){// Выбор пользователей при поиске
                        var str = $('#findFriends').val();
                        var patt = new RegExp(str, 'i');
                        if(str == '') {
                            $('#friendsBlock .friend').show();
                        } else {
                            $('#friendsBlock .friend').hide();
                            for(var k in availableTags) {
                                var num = availableTags[k].search(patt);
                                if(num > -1) {
                                    $('#friendsBlock .friend:eq(' + k + ')').show();
                                }
                            }
                        }
                    };
                    $('#findFriends').autocomplete({
                        search: autoCompleteSearch,
                        select: function(e, ui){
                            var str = ui.item.value;
                            var patt = new RegExp(str, 'i');
                            for(var k in availableTags) {
                                var num = availableTags[k].search(patt);
                                if(num > -1) {
                                    $('#friendsBlock .friend:eq(' + k + ')').click();
                                }
                            }
                        },
                        source: availableTags
                    }).focus(function(){// При фокусе вешаем обработчик на нажатие клавиш
                            $(document).keydown(keyDownHandler);
                        }).blur(function(){// При отмене фокуса убираем
                            $(document).unbind('keydown', keyDownHandler);
                        }).focus();
                    $('#friendsBlock').on('click', '.friend', function(){
                        if($(this).attr('data-checked')) {
                            $(this).removeAttr('data-checked');
                        } else {
                            $(this).attr('data-checked', '1');
                        }
                        return false;
                    });
                } else {
                    $('#CREATE_GAME').dialog('close');
                    $('#NO_FRIENDS').dialog({
                        autoOpen: true,
                        width: 650,
                        height: 250,
                        close: function(){
                            VK.callMethod('showInviteBox');
                        },
                        buttons: [
                            {
                                text: "Пригласить друзей",
                                click: function() {
                                    $(this).dialog('close');
                                }
                            }
                        ]
                    });
                }
            });
/*            DGame.VKAPI.getFriends(DGame.vkuid, function(res){
                var users = res.response, friendUids = [];
                for(var i in users) {
                    friendUids.push(users[i].uid);
                }
                var params = {friendUids: friendUids, authId: 1};
                $.post('/?a=getAllFriends', params, function(answer){
                    console.log('FRIENDS: ', answer);
                }, 'json');
            });*/
            return false;
        });
        $('#CREATE_GAME form').submit(function(e){
            if($('#friendsBlock .friend[data-checked]').length) {
                $('#friendsBlock .friend[data-checked]').each(function(){
                    $('#CREATE_GAME form').append($('<input type="hidden" name="players[]" value="'+$(this).attr('data-uid')+'" />'));
                });
                return true;
            } else {
                $('#NOT_VALID_FORM').dialog({
                    autoOpen: true,
                    width: 650,
                    height: 250,
                    buttons: [
                        {
                            text: "OK",
                            click: function() {
                                $(this).dialog('close');
                            }
                        }
                    ]
                });
            }
            return false;
        });
    }
});
