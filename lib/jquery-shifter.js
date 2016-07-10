/* eslint-disable */
(function(global, factory) {
  if (!global.document) {
    throw new Error('jquery-shifter requires a window with a document');
  }

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('jquery'), global);
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory($, global));
  } else {
    factory(global.jQuery, global);
  }
}(typeof window !== 'undefined' ? window : this, function($, global) {
  /* eslint-enable */
  $.fn.shifter = function shifter(options) {
    var settings = $.extend({
      forwardText: 'forward',
      backwardText: 'backward',
      forwardSelector: '',
      backwardSelector: '',
      switcher: true,
      speed: 2000,
      responsive: true,
      maxShift: 4
    }, options);

    var $self = $(this);
    var $boxes = $self.children();
    var $wrapper = $self.parent();

    var $forward = settings.forwardSelector
        ? $(settings.forwardSelector)
        : $('<a href="javascript:void(0)" class="shifter-forward">' + settings.forwardText + '</a>');
    var $backward = settings.backwardSelector
        ? $(settings.backwardSelector)
        : $('<a href="javascript:void(0)" class="shifter-backward">' + settings.backwardText + '</a>');

    var switcher = settings.switcher;
    var speed = (settings.speed <= 0) ? 2000 : settings.speed;
    var maxShift = (settings.maxShift <= 0) ? 4 : settings.maxShift;
    var unitDistance = $wrapper.width();
    var boxesNum = $boxes.length;
    var groups = Math.ceil(boxesNum / maxShift);
    var curGroup = 1;
    var shiftDistance = 0;
    var responsive = settings.responsive;

    maxShift = boxesNum < maxShift ? boxesNum : maxShift;
    responsive = responsive && $.extend({ delay: 200 }, responsive) || false;

    if (!settings.backwardSelector) {
      $self.after($backward);
    }

    if (!settings.forwardSelector) {
      $self.after($forward);
    }

    $self.css('width', unitDistance * groups + 'px');
    $boxes.css('width', unitDistance / maxShift + 'px');
    $boxes.show();

    if (switcher) {
      $backward.hide();
      if (curGroup >= groups) {
        $forward.hide();
      }
    }

    $forward.on('click', function forwardEvent() {
      if (curGroup >= groups) {
        return;
      }

      curGroup++;
      shiftDistance -= unitDistance;

      if (switcher) {
        $backward.show();
        if (curGroup >= groups) {
          $forward.hide();
        }
      }

      $self.stop().animate({marginLeft: shiftDistance + 'px'}, speed);
    });

    $backward.on('click', function backwardEvent() {
      if (curGroup <= 1) {
        return;
      }

      curGroup--;
      shiftDistance += unitDistance;

      if (switcher) {
        $forward.show();
        if (curGroup <= 1) {
          $backward.hide();
        }
      }

      $self.stop().animate({marginLeft: shiftDistance + 'px'}, speed);
    });

    function repaint() {
      unitDistance = $wrapper.width();
      shiftDistance = -unitDistance * (curGroup - 1);

      $self.css('width', unitDistance * groups + 'px');
      $self.css('marginLeft', shiftDistance + 'px');
      $boxes.css('width', unitDistance / maxShift + 'px');
    }

    function throttle(fn, delay) {
      var ctx;
      var args;
      var previous = Date.now();

      var later = function later() {
        fn.apply(ctx, args);
      };

      return function throttleWrapper() {
        ctx = this;
        args = arguments;
        var now = Date.now();
        var diff = now - previous - delay;

        if (diff >= 0) {
          previous = now;
          setTimeout(later, delay);
        }
      };
    }

    if (responsive) {
      $(window).on('resize', throttle(repaint, responsive.delay));
    }
  };
}));
