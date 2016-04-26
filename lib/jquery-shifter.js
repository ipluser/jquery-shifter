/**
 * jquery-shifter 0.5.1
 * @author Plus <ipluser@163.com>
 * @license MIT
 */
;(function (global, $) {  // eslint-disable-line
  $.fn.shifter = function shifter(options) {
    var settings = $.extend({
      forwardText: 'forward',
      backwardText: 'backward',
      forwardSelector: '',
      backwardSelector: '',
      speed: 2000,
      maxShift: 4
    }, options);

    var self = $(this);
    var boxes = self.children();
    var wrapper = self.parent();

    var forward = settings.forwardSelector
        ? $(settings.forwardSelector)
        : $('<a href="javascript:void(0)" class="shifter-forward">' + settings.forwardText + '</a>');
    var backward = settings.backwardSelector
        ? $(settings.backwardSelector)
        : $('<a href="javascript:void(0)" class="shifter-backward">' + settings.backwardText + '</a>');

    var speed = (settings.speed <= 0) ? 2000 : settings.speed;
    var maxShift = (settings.maxShift <= 0) ? 4 : settings.maxShift;
    var unitDistance = wrapper.width();
    var boxesNum = boxes.length;
    var groups = Math.ceil(boxesNum / maxShift);
    var curGroup = 1;
    var shiftDistance = 0;

    maxShift = boxesNum < maxShift ? boxesNum : maxShift;

    if (!settings.backwardSelector) {
      self.after(backward);
    }

    if (!settings.forwardSelector) {
      self.after(forward);
    }

    self.css('width', unitDistance * groups + 'px');
    boxes.css('width', unitDistance / maxShift + 'px');
    boxes.show();

    backward.hide();
    if (curGroup >= groups) {
      forward.hide();
    }

    forward.on('click', function forwardEvent() {
      if (curGroup >= groups) {
        return;
      }

      curGroup++;
      shiftDistance -= unitDistance;

      backward.show();
      if (curGroup >= groups) {
        forward.hide();
      }

      self.stop().animate({marginLeft: shiftDistance + 'px'}, speed);
    });

    backward.on('click', function backwardEvent() {
      if (curGroup <= 1) {
        return;
      }

      curGroup--;
      shiftDistance += unitDistance;

      forward.show();
      if (curGroup <= 1) {
        backward.hide();
      }

      self.stop().animate({marginLeft: shiftDistance + 'px'}, speed);
    });
  };
})(window, jQuery);
