$.Model('DGame.Models.Map', {
  attributes: {
  }
}, {
  putShip: function (x, y) {
    console.log('save coordinates; X : ', x, 'Y : ', y);
  }
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

DGame.Models.Unit('DGame.Models.Unit.Player', {
  attributes: {
  }
}, {
  die: function () {
    console.log('PLAYER died');
  }
});

$.Controller('DGame.Controllers.Map', {
  defaults: {
    model: {},
    mapInfo: {},
    mapField: '',
    rotations: {180: 'rot180', 360: 'rot360'}
  }
}, {
  init: function () {
    var controller = this, mainBlock = this.element, opt = this.options;
    opt.model = new DGame.Models.Map({id: 1});

    for (var i in opt.mapInfo) {
      var line = opt.mapInfo[i];
      for (var j in line) {
        var field = line[j], direction = 0;
        if (field['field_direction']) {
          direction = field['direction'];
        }
        var style = ' style="top: ' + ((i - 1) * 120) + 'px; left: ' + ((j - 1) * 120) + 'px;" ';
        var mapField = $('<div' + style + ' class="mapField" data-field="' + field['field_id'] + '" ' +
          'data-direction="' + direction + '" data-posX="' + i + '" data-posY="' + j + '"><div class="card back"></div></div>');
        mainBlock.append(mapField);
        controller.openField(i, j);
      }
    }
  },
  putShip: function () {
    var controller = this, mainBlock = this.element, opt = this.options;
    $('#putShip').dialog({
      autoOpen: true,
      width: 600,
      height: 300,
      buttons: [
        {
          text: "Cancel",
          click: function () {
            $(this).dialog('close');
          }
        }
      ]
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
        if (hiddenDraggable.length) {
          hiddenDraggable.show();
          hiddenDraggable = {};
        }
      }
    });
    $('#game .sea').droppable({
      drop: function (event, ui) {
        if (hiddenDraggable.length) {
          $('#putShip').dialog('close');
          var offset = $(this).offset();
          opt.model.putShip(offset.top / 120, offset.left / 120);
          $(this).append(hiddenDraggable.clone().show().removeClass('ui-draggable'));
          hiddenDraggable = {};
        }
      }
    });
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
  openField: function (x, y) {
    var controller = this, mainBlock = this.element, opt = this.options,
      fieldMap = mainBlock.find('[data-posX=' + x + '][data-posY=' + y + ']');
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
      controller.fieldRotation(fieldMap, 'back', 'cardId' + id, css, attr, opt.rotations, 1000);
    }
    return true;
  }
});

$.Controller('DGame.Controllers.Player', {

}, {

});