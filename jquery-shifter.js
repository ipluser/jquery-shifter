/**
 * jquery-shifter 0.5.1
 * @author Plus <ipluser@163.com>
 * @license MIT
 */
;(function ($) {
  $.fn.shifter = function (options) {

    var settings = $.extend({
      forwardText: 'forward',
      backwardText: 'backward',
      forwardSelector: '',
      backwardSelector: '',
      speed: 2000,
      maxShift: 4
    }, options);

    var shifter = $(this),
        boxes = shifter.children(),
        wrapper = shifter.parent();

    var forward = settings.forwardSelector
            ? $(settings.forwardSelector)
            : $('<a href="javascript:void(0)" class="shifter-forward">' + settings.forwardText + '</a>'),
        backward = settings.backwardSelector
            ? $(settings.backwardSelector)
            : $('<a href="javascript:void(0)" class="shifter-backward">' + settings.backwardText + '</a>');

    var speed = (settings.speed <= 0) ? 2000 : settings.speed,
        maxShift = (settings.maxShift <= 0) ? 4 : settings.maxShift,
        unitDistance = wrapper.width(),
        boxesNum = boxes.length,
        groups = Math.ceil(boxesNum / maxShift),
        curGroup = 1,
        shiftDistance = 0;

    maxShift = boxesNum < maxShift ? boxesNum : maxShift;

    if (!settings.backwardSelector) {
      shifter.after(backward);
    }

    if (!settings.forwardSelector) {
      shifter.after(forward);
    }

    shifter.css('width', unitDistance * groups + 'px');
    boxes.css('width', unitDistance / maxShift + 'px')
    boxes.show();

    backward.hide();
    if (curGroup >= groups) {
      forward.hide();
    }

    forward.on('click', function () {
      if (curGroup >= groups) {
        return;
      }

      curGroup++;
      shiftDistance -= unitDistance;

      backward.show();
      if (curGroup >= groups) {
        forward.hide();
      }

      shifter.stop().animate({marginLeft: shiftDistance + 'px'}, speed);
    });

    backward.on('click', function () {
      if (curGroup <= 1) {
        return;
      }

      curGroup--;
      shiftDistance += unitDistance;

      forward.show();
      if (curGroup <= 1) {
        backward.hide();
      }

      shifter.stop().animate({marginLeft: shiftDistance + 'px'}, speed);
    });

  };
})(jQuery);