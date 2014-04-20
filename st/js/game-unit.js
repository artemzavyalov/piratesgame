DGame['Unit'] = can.Control.extend({
  defaults: {
    w: 70,
    h: 80,
    time: 1000,
    timeFly: 1500,
    steps: 125,
    way: '120px',
    bottom: '-238px',
    top: '-166px',
    left: '-90px',
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
      'data-cls': className,
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
  flyDown: function (unit, callback) {
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
      if (callback) {
        callback();
      }
    });
  },
  flyUp: function (unit, callback) {
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
      if (callback) {
        callback();
      }
    });
  },
  flyRight: function (unit, callback) {
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
      if (callback) {
        callback();
      }
    });
  },
  flyLeft: function (unit, callback) {
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
      if (callback) {
        callback();
      }
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
