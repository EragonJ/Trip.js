/*
 *  Trip.js
 *
 *  This is a jQuery plugin that can help you customize your tutorial trip
 *  with full flexibilities.
 *
 *  Version: 1.3.0
 *
 *  Author: EragonJ <eragonj@eragonj.me>
 *  Blog: http://eragonj.me
 *
 *  @preserve
 */
(function(window, $) {

  var CHECKED_ANIMATIONS = [
    'flash', 'bounce', 'shake', 'tada',
    'fadeIn', 'fadeInUp', 'fadeInDown',
    'fadeInLeft', 'fadeInRight', 'fadeInUpBig', 'fadeInDownBig',
    'fadeInLeftBig', 'fadeInRightBig', 'bounceIn', 'bounceInDown',
    'bounceInUp', 'bounceInLeft', 'bounceInRight', 'rotateIn',
    'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft',
    'rotateInUpRight'
  ];

  var Trip = function(tripData, userOptions) {
    // save the settings
    this.settings = $.extend({
      // basic config
      tripIndex: 0,
      tripTheme: 'black',
      backToTopWhenEnded: false,
      overlayZindex: 99999,
      delay: 1000,
      enableKeyBinding: true,
      enableAnimation: true,
      showCloseBox: false,
      skipUndefinedTrip: false,

      // navigation
      showNavigation: false,
      canGoNext: true,
      canGoPrev: true,

      // labels
      nextLabel: 'Next',
      prevLabel: 'Back',
      finishLabel: 'Dismiss',
      closeBoxLabel: '&#215;',

      // callbacks for whole process
      onStart: $.noop,
      onEnd: $.noop,

      // callbacks for each trip
      onTripStart: $.noop,
      onTripEnd: $.noop,
      onTripStop: $.noop,
      onTripPause: $.noop,
      onTripResume: $.noop,
      onTripChange: $.noop,
      onTripClose: $.noop,

      // animation
      animation: 'tada',

      // customizable HTML
			tripBlockHTML: [
				'<div class="trip-block">',
					'<a href="#" class="trip-close"></a>',
					'<div class="trip-content"></div>',
					'<div class="trip-progress-wrapper">',
						'<div class="trip-progress-bar"></div>',
						'<a href="#" class="trip-prev"></a>',
						'<a href="#" class="trip-next"></a>',
					'</div>',
				'</div>'
			]
    }, userOptions);

    // save the trip data
    this.tripData = tripData;

    // used SELs
    this.$tripBlock = null;
    this.$overlay = null;
    this.$bar = null;
    this.$root = $('body, html');

    // save the current trip index
    this.tripIndex = this.settings.tripIndex;
    this.tripDirection = 'next';
    this.timer = null;
    this.progressing = false;

    // about expose
    this.hasExpose = false;

    // contants
    this.CONSTANTS = {
      LEFT_ARROW: 37,
      UP_ARROW: 38,
      RIGHT_ARROW: 39,
      DOWN_ARROW: 40,
      ESC: 27,
      SPACE: 32,
      TRIP_BLOCK_OFFSET_VERTICAL: 10,
      TRIP_BLOCK_OFFSET_HORIZONTAL: 10
    };

    this.console = window.console || {};
  };

  Trip.prototype = {
    preInit: function() {
      // override console object for IE
      if (typeof this.console === 'undefined') {
        var self = this;
        var methods = ['log', 'warn', 'debug', 'info', 'error'];

        $.each(methods, function(i, methodName) {
          self.console[methodName] = $.noop;
        });
      }
    },

    // TODO: implement expose
    showExpose: function($sel) {
      var oldCSS;
      var newCSS;

      this.hasExpose = true;

      oldCSS = {
        position: $sel.css('position'),
        zIndex: $sel.css('z-Index')
      };

      // we have to make it higher than the overlay
      newCSS = {
        position: 'relative',
        zIndex: this.settings.overlayZindex + 1
      };

      $sel
        .data('trip-old-css', oldCSS)
        .css(newCSS)
        .addClass('trip-exposed');

      this.$overlay.show();
    },

    // TODO: implement expose
    hideExpose: function() {
      var $exposedSel = $('.trip-exposed');
      var oldCSS = $exposedSel.data('trip-old-css');

      this.hasExpose = false;

      $exposedSel
        .css(oldCSS)
        .removeClass('trip-exposed');

      this.$overlay.hide();
    },

    bindResizeEvents: function() {
      var that = this;
      $(window).on('resize.Trip', function() {
        // when users resize the window
        // our current solution is to rerun the trip (will restart the timer)
        that.run();
      });
    },

    unbindResizeEvents: function() {
      $(window).off('resize.Trip');
    },

    bindKeyEvents: function() {
      var that = this;
      $(document).on({
        'keydown.Trip': function(e) {
          // `this` will be bound to #document DOM element here
          that.keyEvent.call(that, e);
        }
      });
    },

    unbindKeyEvents: function() {
      $(document).off('keydown.Trip');
    },

    keyEvent: function(e) {
      switch(e.which) {
        case this.CONSTANTS.ESC:
          this.stop();
          break;

        case this.CONSTANTS.SPACE:
          // space will make the page jump
          e.preventDefault();
          this.pause();
          break;

        case this.CONSTANTS.LEFT_ARROW:
        case this.CONSTANTS.UP_ARROW:
          this.prev();
          break;

        case this.CONSTANTS.RIGHT_ARROW:
        case this.CONSTANTS.DOWN_ARROW:
          this.next();
          break;
      }
    },

    stop: function() {
      if (this.timer) {
        this.timer.stop();
      }

      if (this.hasExpose) {
        this.hideExpose();
      }

      this.hideTripBlock();
      this.unbindKeyEvents();
      this.unbindResizeEvents();

      var tripObject = this.getCurrentTripObject();
      var tripStop = tripObject.onTripStop || this.settings.onTripStop;
      tripStop(this.tripIndex, tripObject);
    },

    pauseAndResume: function() {
      if (this.progressing) {
        this.timer.pause();
        this.pauseProgressBar();
      }
      else {
        var remainingTime = this.timer.resume();
        this.resumeProgressBar(remainingTime);
      }
      this.progressing = !this.progressing;
    },

    pause: function() {
      this.pauseAndResume();
      var tripObject = this.getCurrentTripObject();
      var tripPause = tripObject.onTripPause || this.settings.onTripPause;
      tripPause(this.tripIndex, tripObject);
    },

    resume: function() {
      this.pauseAndResume();
      var tripObject = this.getCurrentTripObject();
      var tripResume = tripObject.onTripResume || this.settings.onTripResume;
      tripResume(this.tripIndex, tripObject);
    },

    next: function() {
      this.tripDirection = 'next';

      if (!this.canGoNext()) {
        return this.run();
      }

      if (this.hasCallback()) {
        this.callCallback();
      }

      if (this.isLast()) {
        this.doLastOperation();
      }
      else {
        this.increaseIndex();
        this.run();
      }
    },

    prev: function() {
      this.tripDirection = 'prev';

      if (!this.isFirst() && this.canGoPrev()) {
        this.decreaseIndex();
      }
      this.run();
    },

    // XXX:
    // Because the trip index is controlled by increaseIndex / decreaseIndex
    // methods only, `showCurrentTrip` doesn't have to take care about which is
    // the current trip object, it just does the necessary operations
    // according to the passed tripData `o`
    showCurrentTrip: function(o) {
      // Allow sel element to be a string selector
      // in case you want to create a tripObject that
      // handles an element that doesn't exist yet when you create
      // this Trip.
      if (typeof o.sel === 'string') {
        o.sel = $(o.sel);
      }

      if (this.settings.enableAnimation) {
        this.removeAnimation();
      }

      // preprocess when we have to show trip block
      if (this.timer) {
        this.timer.stop();
      }

      if (this.hasExpose) {
        this.hideExpose();
      }

      if (this.progressing) {
        this.hideProgressBar();

        // not doing the progress effect
        this.progressing = false;
      }

      this.setTripBlock(o);
      this.showTripBlock(o);

      if (this.settings.enableAnimation) {
        this.addAnimation(o);
      }

      if (o.expose) {
        this.showExpose(o.sel);
      }
    },

    doLastOperation: function() {
      if (this.timer) {
        this.timer.stop();
      }

      if (this.settings.enableKeyBinding) {
        this.unbindKeyEvents();
      }

      this.hideTripBlock();
      this.unbindResizeEvents();

      if (this.hasExpose) {
        this.hideExpose();
      }

      if (this.settings.backToTopWhenEnded) {
        this.$root.animate({ scrollTop: 0 }, 'slow');
      }

      this.tripIndex = this.settings.tripIndex;
      this.settings.onEnd();

      return false;
    },

    showProgressBar: function(delay) {
      var that = this;

      this.$bar.animate({
        width: '100%'
      }, delay, 'linear', function() {
        that.$bar.width(0);
      });
    },

    hideProgressBar: function() {
      this.$bar.width(0);
      this.$bar.stop(true);
    },

    pauseProgressBar: function() {
      this.$bar.stop(true);
    },

    resumeProgressBar: function(remainingTime) {
      this.showProgressBar(remainingTime);
    },

    run: function() {
      var that = this;
      var tripObject = this.getCurrentTripObject();
      var tripStart = tripObject.onTripStart || this.settings.onTripStart;
      var tripChange = tripObject.onTripChange || this.settings.onTripChange;
      var tripEnd = tripObject.onTripEnd || this.settings.onTripEnd;
      var delay = tripObject.delay || this.settings.delay;

      if (!this.isTripDataValid(tripObject)) {
        // force developers to double check tripData again
        if (this.settings.skipUndefinedTrip === false) {
          this.console.error(
            'Your tripData is not valid at index: ' + this.tripIndex);
          this.stop();
          return false;
        }
        // let it go
        else {
          return this[this.tripDirection]();
        }
      }

      this.showCurrentTrip(tripObject);
      this.showProgressBar(delay);
      this.progressing = true;

      tripChange(this.tripIndex, tripObject);
      tripStart(this.tripIndex, tripObject);

      // set timer to show next, if the timer is less than zero we expect
      // it to be manually advanced
      if (delay >= 0) {
        this.timer = new Timer(function() {
          tripEnd(that.tripIndex, tripObject);
          that.next();
        }, delay);
      }
    },

    isFirst: function() {
      return (this.tripIndex === 0) ? true: false;
    },

    isLast: function() {
      return (this.tripIndex === this.tripData.length - 1) ? true: false;
    },

    isTripDataValid: function(o) {
      var specialDirections = [
        'screen-ne',
        'screen-se',
        'screen-sw',
        'screen-nw',
        'screen-center'
      ];

      // if we have set special direction,
      // we don't need to check sel
      if ($.inArray(o.position, specialDirections) >= 0) {
        return true;
      }

      // have to check `sel` & `content` two required fields
      if (typeof o.content === 'undefined' ||
        typeof o.sel === 'undefined' ||
        o.sel === null ||
        o.sel.length === 0 ||
        $(o.sel).length === 0) {
          return false;
      }
      return true;
    },

    hasCallback: function() {
      return (typeof this.tripData[this.tripIndex].callback !== 'undefined');
    },

    callCallback: function() {
      this.tripData[this.tripIndex].callback(this.tripIndex);
    },

    canGoPrev: function() {
      var trip = this.tripData[this.tripIndex];
      var canGoPrev = trip.canGoPrev || this.settings.canGoPrev;

      if (typeof canGoPrev === 'function') {
        canGoPrev = canGoPrev.call(trip);
      }

      return canGoPrev;
    },

    canGoNext: function() {
      var trip = this.tripData[this.tripIndex];
      var canGoNext = trip.canGoNext || this.settings.canGoNext;

      if (typeof canGoNext === 'function') {
        canGoNext = canGoNext.call(trip);
      }

      return canGoNext;
    },

    increaseIndex: function() {
      if (this.tripIndex >= this.tripData.length - 1) {
        // how about hitting the last item ?
        // do nothing
      }
      else {
        this.tripIndex += 1;
      }
    },

    decreaseIndex: function() {
      if (this.tripIndex <= 0) {
        // how about hitting the first item ?
        // do nothing
      }
      else {
        this.tripIndex -= 1;
      }
    },

    getCurrentTripObject: function() {
      return this.tripData[this.tripIndex];
    },

    setTripBlock: function(o) {
      var $tripBlock = this.$tripBlock;
      var showCloseBox = o.showCloseBox || this.settings.showCloseBox;
      var showNavigation = o.showNavigation || this.settings.showNavigation;
      var closeBoxLabel = o.closeBoxLabel || this.settings.closeBoxLabel;
      var prevLabel = o.prevLabel || this.settings.prevLabel;
      var nextLabel = o.nextLabel || this.settings.nextLabel;
      var finishLabel = o.finishLabel || this.settings.finishLabel;

      $tripBlock
        .find('.trip-content')
        .html(o.content);

      $tripBlock
        .find('.trip-prev')
        .html(prevLabel)
        .toggle(showNavigation && !this.isFirst());

      $tripBlock
        .find('.trip-next')
        .html(this.isLast() ? finishLabel: nextLabel)
        .toggle(showNavigation);

      $tripBlock
        .find('.trip-close')
        .html(closeBoxLabel)
        .toggle(showCloseBox);

      // remove old styles then add new one
      $tripBlock.removeClass(
        'e s w n screen-ne screen-se screen-sw screen-nw screen-center');
      $tripBlock.addClass(o.position);

      // NOTE: issue #27
      // we have to set position left first then position top
      // because when tripBlock hits the page margin, it will become
      // multi-lined and this will break cached attributes.
      //
      // In this way, we have to count these attributes at runtime.
      this.setTripBlockPosition(o, 'horizontal');
      this.setTripBlockPosition(o, 'vertical');
    },

    setTripBlockPosition: function(o, horizontalOrVertical) {
      var $tripBlock = this.$tripBlock;
      var $sel = o.sel;
      var selWidth = $sel && $sel.outerWidth();
      var selHeight = $sel && $sel.outerHeight();
      var blockWidth = $tripBlock.outerWidth();
      var blockHeight = $tripBlock.outerHeight();
      var arrowHeight = 10;
      var arrowWidth = 10;
      var cssHorizontal;
      var cssVertical;

      switch (o.position) {
        case 'screen-center':
          cssHorizontal = '50%';
          cssVertical = '50%';
          break;
        case 'screen-ne':
        case 'screen-se':
        case 'screen-nw':
        case 'screen-sw':
          cssHorizontal = this.CONSTANTS.TRIP_BLOCK_OFFSET_HORIZONTAL;
          cssVertical = this.CONSTANTS.TRIP_BLOCK_OFFSET_VERTICAL;
          break;
        case 'e':
          cssHorizontal = $sel.offset().left + selWidth + arrowWidth;
          cssVertical = $sel.offset().top - ((blockHeight - selHeight) / 2);
          break;
        case 's':
          cssHorizontal = $sel.offset().left + ((selWidth - blockWidth) / 2);
          cssVertical = $sel.offset().top + selHeight + arrowHeight;
          break;
        case 'w':
          cssHorizontal = $sel.offset().left - (arrowWidth + blockWidth);
          cssVertical = $sel.offset().top - ((blockHeight - selHeight) / 2);
          break;
        case 'n':
          /* falls through */
        default:
          cssHorizontal = $sel.offset().left + ((selWidth - blockWidth) / 2);
          cssVertical = $sel.offset().top - arrowHeight - blockHeight;
          break;
      }

      if (horizontalOrVertical === 'horizontal') {
        // reset styles first
        $tripBlock.css({
          left: '',
          right: '',
          marginLeft: '',
        });

        switch (o.position) {
          case 'screen-center':
            $tripBlock.css({
              left: cssHorizontal,
              marginLeft: -0.5 * blockWidth
            });
            break;
          case 'screen-se':
          case 'screen-ne':
            $tripBlock.css({
              right: cssHorizontal
            });
            break;
          case 'screen-sw':
          case 'screen-nw':
          case 'e':
          case 's':
          case 'w':
          case 'n':
            /* falls through */
          default:
            $tripBlock.css({
              left: cssHorizontal
            });
            break;
        }
      }
      else if (horizontalOrVertical === 'vertical') {
        // reset styles first
        $tripBlock.css({
          top: '',
          bottom: '',
          marginTop: '',
        });

        switch (o.position) {
          case 'screen-center':
            $tripBlock.css({
              top: cssVertical,
              marginTop: -0.5 * blockHeight
            });
            break;
          case 'screen-sw':
          case 'screen-se':
            $tripBlock.css({
              bottom: cssVertical
            });
            break;
          case 'screen-nw':
          case 'screen-ne':
          case 'e':
          case 's':
          case 'w':
          case 'n':
            /* falls through */
          default:
            $tripBlock.css({
              top: cssVertical
            });
            break;
        }
      }
    },

    addAnimation: function(o) {
      var animation = o.animation || this.settings.animation;
      if ($.inArray(animation, CHECKED_ANIMATIONS) >= 0) {
        this.$tripBlock.addClass('animated');
        this.$tripBlock.addClass(animation);
      }
    },

    removeAnimation: function() {
      this.$tripBlock.removeClass(CHECKED_ANIMATIONS.join(' '));
      this.$tripBlock.removeClass('animated');
    },

    showTripBlock: function(o) {
      this.$tripBlock.css({
        display: 'inline-block',
        // we have to make it higher than the overlay
        zIndex: this.settings.overlayZindex + 1
      });

      var windowHeight = $(window).height();
      var windowTop = $(window).scrollTop();
      var tripBlockTop = this.$tripBlock.offset().top;
      var OFFSET = 100; // make it look nice

      if (tripBlockTop < windowTop + windowHeight &&
        tripBlockTop >= windowTop) {
          // tripBlock is located inside the current screen,
          // so we don't have to scroll
      }
      else {
        this.$root.animate({ scrollTop: tripBlockTop - OFFSET }, 'slow');
      }
    },

    hideTripBlock: function() {
      this.$tripBlock.fadeOut('slow');
    },

    // TODO:
    // Make sure this method is only called ONCE in this page,
    // so that we will not create same DOMs more than once!
    create: function() {
      this.createTripBlock();
      this.createOverlay();
    },

    createTripBlock: function() {
      // make sure the element doesn't exist in the DOM tree
      if (typeof $('.trip-block').get(0) === 'undefined') {
        var that = this;
        var tripBlockHTML = this.settings.tripBlockHTML.join('');
        var $tripBlock = $(tripBlockHTML).addClass(this.settings.tripTheme);

        $('body').append($tripBlock);

        $tripBlock.find('.trip-close').on('click', function(e) {
          e.preventDefault();
          var tripObject = that.getCurrentTripObject();
          var tripClose = tripObject.onTripClose || that.settings.onTripClose;
          tripClose(that.tripIndex, tripObject);
          that.stop();
        });

        $tripBlock.find('.trip-prev').on('click', function(e) {
          e.preventDefault();
          // Force IE/FF to lose focus
          $(this).blur();
          that.prev();
        });

        $tripBlock.find('.trip-next').on('click', function(e) {
          e.preventDefault();
          // Force IE/FF to lose focus
          $(this).blur();
          that.next();
        });
      }
    },

    createOverlay: function() {
      // make sure the element doesn't exist in the DOM tree
      if (typeof $('.trip-overlay').get(0) === 'undefined') {
        var html = [
          '<div class="trip-overlay">',
          '</div>'
        ].join('');

        var $overlay = $(html);
        $overlay.height($(window).height())
          .css({
            zIndex: this.settings.overlayZindex
          });

        $('body').append($overlay);
      }
    },

    cleanup: function() {
      $('.trip-overlay, .trip-block').remove();
    },

    init: function() {
      this.preInit();

      if (this.settings.enableKeyBinding) {
        this.bindKeyEvents();
      }

      this.bindResizeEvents();

      // set refs
      this.$tripBlock = $('.trip-block');
      this.$bar = $('.trip-progress-bar');
      this.$overlay = $('.trip-overlay');
    },

    start: function() {
      // cleanup old DOM first
      this.cleanup();

      // we will call this before initializing all stuffs
      this.settings.onStart();

      // create some necessary DOM elements at the first time like jQuery UI
      this.create();

      // init some necessary stuffs like events, late DOM refs
      // after creating DOMs
      this.init();

      // main entry
      this.run();
    }
  };

  // Expose to window
  window.Trip = Trip;

  /*
   *  3rd party libraries / toolkits
   *
   *  1) http://stackoverflow.com/questions/3969475/javascript-pause-settimeout
   */
  function Timer(callback, delay) {
    var timerId;
    var start;
    var remaining = delay;

    this.pause = function() {
      window.clearTimeout(timerId);
      remaining -= new Date() - start;
    };

    this.resume = function() {
      start = new Date();
      timerId = window.setTimeout(callback, remaining);
      return remaining;
    };

    this.stop = function() {
      window.clearTimeout(timerId);
    };

    this.resume();
  }

}(window, jQuery));
