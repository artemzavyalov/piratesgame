// jQuery.browser для версии 1.9
(function (b) {
    var parse = function( ua ) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
            /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
            /(msie) ([\w.]+)/.exec( ua ) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
            [];

        return {
            browser: match[ 1 ] || "",
            version: match[ 2 ] || "0"
        };
    };

    matched = parse( navigator.userAgent );
    browser = {};

    if ( matched.browser ) {
        browser[ matched.browser ] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if ( browser.chrome ) {
        browser.webkit = true;
    } else if ( browser.webkit ) {
        browser.safari = true;
    }

    b.browser = browser;
})(jQuery);

// Preloader
var circlePreloader = {
    margins: ['-8', '-18', '-32'],
    cycle: null,
    init: function(show, count, radius, centrX, centrY, color){
        var instance = this;
        var rotate = function(obj, angle){
            obj.css({
                'transform': 'rotate('+angle+'deg)',
                '-ms-transform': 'rotate('+angle+'deg)',
                '-webkit-transform': 'rotate('+angle+'deg)',
                '-o-transform': 'rotate('+angle+'deg)',
                '-moz-transform': 'rotate('+angle+'deg)'
            });
        };

        if(count !== false) {
            var len = count.toString().length;
            show.append($('<div class="progressCount" style="top: '+centrY+'px; left: '+centrX+'px; ' +
                'margin-left: '+instance.margins[len - 1]+'px;">'+count+'</div>'));
        }
        var addClass = '';
        if(color) {
            addClass = color;
        }
        for(var alfa = 90; alfa > -270; alfa -= 9) {
            var corner = 2 * Math.PI - alfa / 180 * Math.PI;
            var x = parseFloat(radius * Math.cos(corner) + centrX);
            var y = parseFloat(radius * Math.sin(corner) + centrY);
            var n = $('<div class="progressElem '+addClass+'" style="top: '+y+'px; left: '+x+'px;"></div>');
            show.append(n);
            rotate(n, 270 - alfa);
        }
    },
    cycleComplete: function(show, step){
        var instance = this;
        var val = 0;
        instance.cycle = setInterval(function(){
            val += step;
            if(val > 100) {
                val = 0;
            }
            instance.complete(show, val);
        }, 50);
        return instance.cycle;
    },
    cycleStop: function(show){
        var instance = this;
        if(instance.cycle) {
            clearInterval(instance.cycle);
        }
    },
    moveToComplete: function(show, percents, step){
        var instance = this;
        var thisCount = parseInt(show.find('.progressCount').text(), 10);
        if(thisCount < percents) {
            if(step > 0) {
                instance.complete(show, thisCount+step);
                setTimeout(function(){
                    instance.moveToComplete(show, percents, step);
                }, 500);
            } else {
                instance.complete(show, percents);
            }
        }
    },
    complete: function(show, percents){
        var instance = this;
        var count = show.find('.progressElem').length;
        if(show.find('.progressCount').length) {
            var len = percents.toString().length;
            show.find('.progressCount').css('margin-left', instance.margins[len - 1]+'px').text(percents);
        }
        if(count) {
            show.find('.progressElem').each(function(index){
                var preloderElem = $(this);
                var thisPercent = index / count * 100;
                if(percents >= thisPercent) {
                    if(!preloderElem.hasClass('complete')) {
                        preloderElem.addClass('complete');
                    }
                } else {
                    if(preloderElem.hasClass('complete')) {
                        preloderElem.removeClass('complete');
                    }
                }
            });
        } else {
            return false;
        }
    },
    reset: function(show){
        var instance = this;
        show.find('.progressCount').css('margin-left', '-8px').text('0');
        show.find('.progressElem').each(function(){
            $(this).removeClass('complete');
        });
    },
    die: function(show){
        var instance = this;
        instance.cycleStop(null);
        show.fadeOut(300, function() {
            show.remove();
        });
    }
};