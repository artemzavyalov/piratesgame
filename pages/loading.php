<!doctype html>
<head>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
    <title>DGame</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/st/css/styles.css">
    <link rel="stylesheet" href="/st/css/preloader.css">
    <link rel="stylesheet" href="/st/jquery-ui/smoothness/jquery-ui-1.10.2.custom.css">
    <script type="text/javascript" src="/st/js/jquery-1.9.0.min.js"></script>
    <script type="text/javascript" src="/st/js/preloading.js"></script>
    <script type="text/javascript" src="/st/js/steal.production.js"></script>
    <script>
        function auth() {
            VK.init(function() {
                var get = <?=json_encode($_GET)?>;
                DGame.VKAPI.getUser(get.viewer_id, function(response){
                    console.log(response);
                    jQuery.ajax({
                        type: 'POST',
                        url: '/?a=auth',
                        async: false,
                        cache: false,
                        dataType: 'json',
                        data: {serviceId: 1, serviceName: 'Vkontakte', data: response},
                        error: function(err, errTxt){
                            console.log('auth error! ', errTxt, err);
                        },
                        success: function(data){
                            console.log('auth success! ', data);
                            circlePreloader.moveToComplete($('.hidden-layer'), 100, 10);
                            window.location.assign('/');
                        }
                    });
                });
            }, function() {
                alert('VK API ERROR!!!');
            });
        }
        function readyGo() {
            circlePreloader.init($('.hidden-layer'), 0, 60, $(window).width() / 2, $(window).height() / 2, 'red');
            steal('/st/js/jquery-ui-1.10.2.custom.min.js').then('/st/js/jquerymx-3.2.custom.min.js',
                    'http://vk.com/js/api/xd_connection.js', '/st/js/modernizr.custom.animation.js',
                    '/st/js/store.min.js', function(){
                        console.log('main libraries loading!!!');
                        circlePreloader.moveToComplete($('.hidden-layer'), 30, 10);
                        $.Class('DGame', {
                            // Static methods
                        }, {
                            // Prototype methods
                        });
                    }).then('/st/js/helpers.js', '/st/js/main.js', '/st/js/game.js', function(){
                        console.log('application loading!!!');
                        circlePreloader.moveToComplete($('.hidden-layer'), 50, 10);
                        var countImgs = <?=count($imgs)?>, loadImgs = 0;
                        <? foreach($imgs as $img): ?>
                        $("<img />").attr("src", '<?=$img?>').load(function(){
                            loadImgs++;
                            if(loadImgs == countImgs) {
                                console.log('all images loading!!!');
                                circlePreloader.moveToComplete($('.hidden-layer'), 70, 10);
                                auth();
                            }
                        });
                        <? endforeach; ?>
                    });
        }
    </script>
</head>
<body onload="readyGo()">

<div class="hidden-layer progressCircle"></div>

</body>
</html>