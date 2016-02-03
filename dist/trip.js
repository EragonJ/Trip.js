/**
 *  Trip.js
 *
 *  This is a jQuery plugin that can help you customize your tutorial trip
 *  with full flexibilities.
 *
 *  Version: 3.1.4
 *
 *  Author: EragonJ <eragonj@eragonj.me>
 *  Blog: http://eragonj.me
 *
 *  @preserve
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["Trip"] = factory(require("jQuery"));
	else
		root["Trip"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Trip;

	var $ = __webpack_require__(1);
	var TripParser = __webpack_require__(2);
	var TripUtils = __webpack_require__(3);

	var CHECKED_ANIMATIONS = [
	  'flash', 'bounce', 'shake', 'tada',
	  'fadeIn', 'fadeInUp', 'fadeInDown',
	  'fadeInLeft', 'fadeInRight', 'fadeInUpBig', 'fadeInDownBig',
	  'fadeInLeftBig', 'fadeInRightBig', 'bounceIn', 'bounceInDown',
	  'bounceInUp', 'bounceInLeft', 'bounceInRight', 'rotateIn',
	  'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft',
	  'rotateInUpRight'
	];

	/**
	 * Trip
	 *
	 * @class Trip
	 * @param {Array.<Object>} tripData
	 * @param {Object} userOptions
	 */
	function Trip() {
	  var tripData;
	  var userOptions;
	  var tripParser = new TripParser();

	  // () - default parser mode without configurations
	  if (arguments.length === 0) {
	    tripData = tripParser.parse('default');
	    userOptions = {};
	  }
	  else if (arguments.length === 1) {
	    // ([]) - programming mode without configurations
	    if (TripUtils.isArray(arguments[0])) {
	      tripData = arguments[0];
	      userOptions = {};
	    }
	    // ({}) - default parser mode with configurations
	    else if (TripUtils.isObject(arguments[0])) {
	      tripData = tripParser.parse('default');
	      userOptions = arguments[0];
	    }
	    // ('.trip-nodes') - customized parser mode without configurations
	    else if (TripUtils.isString(arguments[0])) {
	      tripData = tripParser.parse(arguments[0]);
	      userOptions = {};
	    }
	    // we don't support other formats here, so let's throw error here
	    else {
	      throw 'Please check documents for passing parameters, you may pass' +
	        ' wrong parameters into constructor function !';
	    }
	  }
	  // Users pass tripData directly from codebase
	  else {
	    // ([], {}) - programming mode with configurations
	    if (TripUtils.isArray(arguments[0])) {
	      tripData = arguments[0];
	    }
	    // ('.trip-nodes', {}) - customized parser mode with configurations
	    else if (TripUtils.isString(arguments[0])) {
	      tripData = tripParser.parse(arguments[0]);
	    }
	    userOptions = arguments[1];
	  }

	  /**
	   * It is used to keep user and default settings.
	   *
	   * @memberOf Trip
	   * @type {Object}
	   */
	  this.settings = $.extend({
	    // basic config
	    tripIndex: 0,
	    tripTheme: 'black',
	    backToTopWhenEnded: false,
	    overlayHolder: 'body',
	    overlayZindex: 99999,
	    delay: 1000,
	    enableKeyBinding: true,
	    enableAnimation: true,
	    showCloseBox: false,
	    showHeader: false,
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
	    header: 'Step {{tripIndex}}',

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
	        '<div class="trip-header"></div>',
	        '<div class="trip-content"></div>',
	        '<div class="trip-progress-wrapper">',
	          '<div class="trip-progress-bar"></div>',
	          '<a href="#" class="trip-prev"></a>',
	          '<a href="#" class="trip-next"></a>',
	        '</div>',
	      '</div>'
	    ]
	  }, userOptions);

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
	    TRIP_BLOCK_OFFSET_HORIZONTAL: 10,
	    RESIZE_TIMEOUT: 200
	  };

	  this.console = window.console || {};
	}

	Trip.prototype = {
	  /**
	   * This is used to preInit Trip.js. For current use, we will try to
	   * override this.console if there is no window.console like IE.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  preInit: function() {
	    if (typeof this.console === 'undefined') {
	      var that = this;
	      var methods = ['log', 'warn', 'debug', 'info', 'error'];

	      $.each(methods, function(i, methodName) {
	        that.console[methodName] = $.noop;
	      });
	    }
	  },

	  /**
	   * Expose element which has hasExpose property.
	   *
	   * @memberOf Trip
	   * @type {Funtion}
	   */
	  showExpose: function() {
	    var o = this.getCurrentTripObject();
	    var oldCSS;
	    var newCSS;
	    var $sel;

	    if (typeof o.expose === 'string') {
	      $sel = $(o.expose);
	    }
	    else if (o.expose instanceof $) {
	      $sel = o.expose;
	    }
	    else {
	      $sel = $(o.sel);
	    }

	    this.hasExpose = true;

	    // NOTE: issue #68
	    // we have to make sure $sel does exist because we may have no
	    // $sel when using special directions
	    if ($sel.get(0) !== undefined) {
	      oldCSS = {
	        position: $sel.css('position'),
	        zIndex: $sel.css('z-Index')
	      };

	      newCSS = {
	        position: (function() {
	          // NOTE: issue #63
	          // We can't direclty use 'relative' if the original element
	          // is using properties other than 'relative' because
	          // this would break the UI.
	          if (['absolute', 'fixed'].indexOf(oldCSS.position) > -1) {
	            return oldCSS.position;
	          }
	          else {
	            return 'relative';
	          }
	        }()),
	        // we have to make it higher than the overlay
	        zIndex: this.settings.overlayZindex + 1
	      };

	      $sel
	        .data('trip-old-css', oldCSS)
	        .css(newCSS)
	        .addClass('trip-exposed');
	    }

	    this.$overlay.fadeIn();
	  },

	  /**
	   * Make exposed element back to normal state and hide overlay.
	   *
	   * @memberOf Trip
	   * @type {Funtion}
	   */
	  hideExpose: function() {
	    var $exposedSel = $('.trip-exposed');
	    this.hasExpose = false;

	    // NOTE: issue #68
	    // we have to make sure $sel does exist because we may have no
	    // $sel when using special directions
	    if ($exposedSel.get(0) !== undefined) {
	      var oldCSS = $exposedSel.data('trip-old-css');

	      $exposedSel
	        .css(oldCSS)
	        .removeClass('trip-exposed');
	    }

	    this.$overlay.fadeOut();
	  },

	  /**
	   * When users resize its browser, we will rerun Trip and restart the timer.
	   * TODO: We have to debounce this function later to make performance better.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  bindResizeEvents: function() {
	    var that = this;
	    var timer;

	    $(window).on('resize.Trip', function() {
	      window.clearTimeout(timer);
	      timer = window.setTimeout(function() {
	        that.run();
	      }, that.CONSTANTS.RESIZE_TIMEOUT);
	    });
	  },

	  /**
	   * Remove resize event from window.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  unbindResizeEvents: function() {
	    $(window).off('resize.Trip');
	  },

	  /**
	   * Bind keydown events on document.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  bindKeyEvents: function() {
	    var that = this;
	    $(document).on({
	      'keydown.Trip': function(e) {
	        // `this` will be bound to #document DOM element here
	        that.keyEvent.call(that, e);
	      }
	    });
	  },

	  /**
	   * Remove keydown events from document.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  unbindKeyEvents: function() {
	    $(document).off('keydown.Trip');
	  },

	  /**
	   * Bound keydown events. We will do specific actions when matched keys
	   * are pressed by user.
	   *
	   * @memberOf Trip
	   * @type {function}
	   * @param {Event} e
	   */
	  keyEvent: function(e) {
	    switch (e.which) {
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

	  /**
	   * Stop API, which will stop the trip.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @public
	   */
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

	    this.settings.onEnd(this.tripIndex, tripObject);

	    // We have to reset tripIndex in stop action too
	    this.tripIndex = this.settings.tripIndex;
	  },

	  /**
	   * This is an wrapper for pause and resume API.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  pauseOrResume: function() {
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

	  /**
	   * pause API, which will pause the trip.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @public
	   */
	  pause: function() {
	    this.pauseOrResume();
	    var tripObject = this.getCurrentTripObject();
	    var tripPause = tripObject.onTripPause || this.settings.onTripPause;
	    tripPause(this.tripIndex, tripObject);
	  },

	  /**
	   * pause API, which will pause the trip.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @public
	   */
	  resume: function() {
	    this.pauseOrResume();
	    var tripObject = this.getCurrentTripObject();
	    var tripResume = tripObject.onTripResume || this.settings.onTripResume;
	    tripResume(this.tripIndex, tripObject);
	  },

	  /**
	   * next API, which will jump to next the trip.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @public
	   */
	  next: function() {
	    var that = this;
	    // We have to make sure we can go next first,
	    // if not, let's just re-run
	    if (!this.canGoNext()) {
	      return this.run();
	    }

	    this.tripDirection = 'next';

	    // This is te best timing to call tripEnd because no matter
	    // users use arrow key or trip was changed by timer, we will
	    // all be here.
	    var tripObject = this.getCurrentTripObject();
	    var tripEnd = tripObject.onTripEnd || this.settings.onTripEnd;
	    var tripEndDefer = tripEnd(this.tripIndex, tripObject);

	    $.when(tripEndDefer).then(function() {
	      if (that.isLast()) {
	        that.doLastOperation();
	      }
	      else {
	        that.increaseIndex();
	        that.run();
	      }
	    });
	  },

	  /**
	   * prev API, which will jump to previous trip.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @public
	   */
	  prev: function() {
	    var that = this;
	    this.tripDirection = 'prev';

	    // When this is executed, it means users click on the arrow key to
	    // navigate back to previous trip. In that scenario, this is the better
	    // place to call onTripEnd before modifying tripIndex.
	    var tripObject = this.getCurrentTripObject();
	    var tripEnd = tripObject.onTripEnd || this.settings.onTripEnd;
	    var tripEndDefer = tripEnd(this.tripIndex, tripObject);

	    $.when(tripEndDefer).then(function() {
	      if (!that.isFirst() && that.canGoPrev()) {
	        that.decreaseIndex();
	      }
	      that.run();
	    });
	  },

	  /**
	   * Show current trip. In this method, we will control all stuffs about
	   * current trip including animation, timer, expose, progress bar.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @param {Object} o
	   */
	  showCurrentTrip: function(o) {
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
	      this.showExpose();
	    }
	  },

	  /**
	   * This is the last operation when we successfully finish all trips in
	   * the end.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
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

	    var tripObject = this.getCurrentTripObject();
	    this.settings.onEnd(this.tripIndex, tripObject);

	    // We have to reset tripIndex when trip got finished
	    this.tripIndex = this.settings.tripIndex;
	    return false;
	  },

	  /**
	   * This is used to show progress bar UI. We will use jQuery to manipulate
	   * the animation.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @param {Number} delay
	   */
	  showProgressBar: function(delay) {
	    var that = this;

	    this.$bar.animate({
	      width: '100%'
	    }, delay, 'linear', function() {
	      that.$bar.width(0);
	    });
	  },

	  /**
	   * Hide the progress bar and stop animations.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  hideProgressBar: function() {
	    this.$bar.width(0);
	    this.$bar.stop(true);
	  },

	  /**
	   * Pause the progress bar.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  pauseProgressBar: function() {
	    this.$bar.stop(true);
	  },

	  /**
	   * Resumse the progress bar.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @param {Number} remainingTime
	   */
	  resumeProgressBar: function(remainingTime) {
	    this.showProgressBar(remainingTime);
	  },

	  /**
	   * This is the main function to control each trip. In this method, we will
	   * make sure every tripData is valid and use that to do following works like
	   * showing trip, setup timer and trigger registered callbacks at the right
	   * timing.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  run: function() {
	    var that = this;
	    var tripObject = this.getCurrentTripObject();
	    var tripStart = tripObject.onTripStart || this.settings.onTripStart;
	    var tripChange = tripObject.onTripChange || this.settings.onTripChange;
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
	      this.timer = new TripUtils.Timer(function() {
	        that.next();
	      }, delay);
	    }
	  },

	  /**
	   * Check whether current trip is the first one.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @return {Boolean} whether current trip is the first one
	   */
	  isFirst: function() {
	    return (this.tripIndex === 0) ? true : false;
	  },

	  /**
	   * Check whether current trip is the last one.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @return {Boolean} whether current trip is the last one
	   */
	  isLast: function() {
	    return (this.tripIndex === this.tripData.length - 1) ? true : false;
	  },

	  /**
	   * Check whether tripData is valid
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @param {Object} o tripData
	   * @return {Boolean} whether tripData is valid
	   */
	  isTripDataValid: function(o) {
	    if (this.hasSpecialDirections()) {
	      return true;
	    }

	    if (o.nextClickSelector && $(o.nextClickSelector).length === 0) {
	      return false;
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

	  /**
	   * Check whether position is special or not
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @param {String} position position
	   * @return {Boolean} whether position is speical direction or not
	   */
	  hasSpecialDirections: function() {
	    var o = this.getCurrentTripObject();
	    var position = o.position;
	    var specialDirections = [
	      'screen-ne',
	      'screen-se',
	      'screen-sw',
	      'screen-nw',
	      'screen-center'
	    ];

	    // if we have set special direction,
	    // we don't need to check sel
	    if ($.inArray(position, specialDirections) >= 0) {
	      return true;
	    }
	    return false;
	  },

	  /**
	   * Check whether we can go to previous trip or not.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @return {Boolean} whether we can go to previous trip
	   */
	  canGoPrev: function() {
	    var trip = this.tripData[this.tripIndex];
	    var canGoPrev = trip.canGoPrev;

	    if (typeof canGoPrev === 'undefined') {
	      canGoPrev = this.settings.canGoPrev;
	    }

	    if (typeof canGoPrev === 'function') {
	      canGoPrev = canGoPrev.call(trip);
	    }

	    return canGoPrev;
	  },

	  /**
	   * Check whether we can go to next trip or not.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @return {Boolean} whether we can go to next trip
	   */
	  canGoNext: function() {
	    var trip = this.tripData[this.tripIndex];
	    var canGoNext = trip.canGoNext;

	    if (typeof canGoNext === 'undefined') {
	      canGoNext = this.settings.canGoNext;
	    }

	    if (typeof canGoNext === 'function') {
	      canGoNext = canGoNext.call(trip);
	    }

	    return canGoNext;
	  },

	  /**
	   * We can call this method to increase tripIndex because we are not allowed
	   * to manipualte the value directly.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  increaseIndex: function() {
	    if (this.tripIndex >= this.tripData.length - 1) {
	      // how about hitting the last item ?
	      // do nothing
	    }
	    else {
	      this.tripIndex += 1;
	    }
	  },

	  /**
	   * We can call this method to decrease tripIndex because we are not allowed
	   * to manipualte the value directly.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  decreaseIndex: function() {
	    if (this.tripIndex <= 0) {
	      // how about hitting the first item ?
	      // do nothing
	    }
	    else {
	      this.tripIndex -= 1;
	    }
	  },

	  /**
	   * This method is used to get current trip data.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @return {Object} current trip data
	   */
	  getCurrentTripObject: function() {
	    return this.tripData[this.tripIndex];
	  },

	  /**
	   * This method is used to replace all passed content with `tripIndex` and
	   * `tripTotal` information.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @param {String} content
	   * @return {String} replaced content
	   */
	  getReplacedTripContent: function(content) {
	    content = content || '';
	    var reTripIndex = /\{\{(tripIndex)\}\}/g;
	    var reTripTotal = /\{\{(tripTotal)\}\}/g;

	    content = content.replace(reTripIndex, this.tripIndex + 1);
	    content = content.replace(reTripTotal, this.tripData.length);
	    return content;
	  },

	  /**
	   * Based on current trip data, we will use this method to set all stuffs
	   * we want like content, prev / next labels, close button, used animations.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @param {Object} o
	   */
	  setTripBlock: function(o) {
	    var $tripBlock = this.$tripBlock;
	    var that = this;

	    // toggle used settings
	    var showCloseBox = o.showCloseBox || this.settings.showCloseBox;
	    var showNavigation = o.showNavigation || this.settings.showNavigation;
	    var showHeader = o.showHeader || this.settings.showHeader;

	    // labels
	    var closeBoxLabel = o.closeBoxLabel || this.settings.closeBoxLabel;
	    var prevLabel = o.prevLabel || this.settings.prevLabel;
	    var nextLabel = o.nextLabel || this.settings.nextLabel;
	    var finishLabel = o.finishLabel || this.settings.finishLabel;

	    // other user customized contents
	    var header = o.header || this.settings.header;

	    $tripBlock
	      .find('.trip-header')
	      .html(this.getReplacedTripContent(header))
	      .toggle(showHeader);

	    $tripBlock
	      .find('.trip-content')
	      .html(this.getReplacedTripContent(o.content));

	    $tripBlock
	      .find('.trip-prev')
	      .html(prevLabel)
	      .toggle(showNavigation && !this.isFirst());

	    $tripBlock
	      .find('.trip-next')
	      .html(this.isLast() ? finishLabel : nextLabel)
	      .toggle(showNavigation && !o.nextClickSelector);

	    $tripBlock
	      .find('.trip-close')
	      .html(closeBoxLabel)
	      .toggle(showCloseBox);

	    // remove old styles then add new one
	    $tripBlock.removeClass(
	      'e s w n screen-ne screen-se screen-sw screen-nw screen-center');
	    $tripBlock.addClass(o.position);

	    // if we have a nextClickSelector use that as the trigger for
	    // the next button
	    if (o.nextClickSelector) {
	      $(o.nextClickSelector).one('click.Trip', function(e) {
	        e.preventDefault();
	        // Force IE/FF to lose focus
	        $(this).blur();
	        that.next();
	      });
	    }

	    // NOTE: issue #27
	    // we have to set position left first then position top
	    // because when tripBlock hits the page margin, it will become
	    // multi-lined and this will break cached attributes.
	    //
	    // In this way, we have to count these attributes at runtime.
	    this.setTripBlockPosition(o, 'horizontal');
	    this.setTripBlockPosition(o, 'vertical');
	  },

	  /**
	   * This method is mainly used to help us position the trip block. As you can
	   * see, we will find out the $sel and its positions first then put our trip
	   * block at the right location.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @param {Object} o
	   * @param {String} horizontalOrVertical
	   */
	  setTripBlockPosition: function(o, horizontalOrVertical) {
	    var $tripBlock = this.$tripBlock;

	    //Styles need to be reset before capturing outer height and width
	    if (horizontalOrVertical === 'horizontal') {
	        // reset styles first
	        $tripBlock.css({
	            left: '',
	            right: '',
	            marginLeft: '',
	        });
	    }
	    else if (horizontalOrVertical === 'vertical') {
	        // reset styles first
	        $tripBlock.css({
	            top: '',
	            bottom: '',
	            marginTop: '',
	        });
	    }

	    var $sel = $(o.sel);
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

	  /**
	   * Add animation on the trip block.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @param {Object} o
	   */
	  addAnimation: function(o) {
	    var animation = o.animation || this.settings.animation;
	    if ($.inArray(animation, CHECKED_ANIMATIONS) >= 0) {
	      this.$tripBlock.addClass('animated');
	      this.$tripBlock.addClass(animation);
	    }
	  },

	  /**
	   * Remove animation from the trip block.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  removeAnimation: function() {
	    this.$tripBlock.removeClass(CHECKED_ANIMATIONS.join(' '));
	    this.$tripBlock.removeClass('animated');
	  },

	  /**
	   * After we positioned our trip block, we have to show it on the screen. If
	   * the trip block is not on the screen, we will scroll the $root element and
	   * then make sure it is definitely on the screen.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   * @param {Object} o
	   */
	  showTripBlock: function(o) {
	    this.$tripBlock.css({
	      display: 'inline-block',
	      // we have to make it higher than the overlay
	      zIndex: this.settings.overlayZindex + 1
	    });

	    var windowHeight = $(window).height();
	    var windowTop = $(window).scrollTop();
	    var tripBlockTop = this.$tripBlock.offset().top;
	    var tripBlockHeight = this.$tripBlock.height();
	    var OFFSET = 100; // make it look nice

	    if (tripBlockTop + tripBlockHeight < windowTop + windowHeight &&
	      tripBlockTop >= windowTop) {
	        // tripBlock is located inside the current screen,
	        // so we don't have to scroll
	    }
	    else {
	      this.$root.animate({ scrollTop: tripBlockTop - OFFSET }, 'slow');
	    }
	  },

	  /**
	   * Hide the trip block.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  hideTripBlock: function() {
	    this.removeAnimation();
	    this.$tripBlock.fadeOut('slow');
	  },

	  /**
	   * This is a method wrapper.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  create: function() {
	    this.createTripBlock();
	    this.createOverlay();
	  },

	  /**
	   * This method is used to create a trip block at the first time when
	   * start. If the trip block already exists on the DOM tree, we will
	   * not create it again.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
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

	  /**
	   * This method is used to create overlay. If the overlay is in the DOM tree,
	   * we will not create it again.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  createOverlay: function() {
	    // make sure the element doesn't exist in the DOM tree
	    if (typeof $('.trip-overlay').get(0) === 'undefined') {
	      var html = [
	        '<div class="trip-overlay">',
	        '</div>'
	      ].join('');

	      var $overlay = $(html);
	      $overlay
	        .height($(window).height())
	        .css({
	          zIndex: this.settings.overlayZindex
	        });

	      $(this.settings.overlayHolder).append($overlay);
	    }
	  },

	  /**
	   * Clean up all stuffs when we are going to start / restart a trip, so we
	   * can make we won't mess up with old stuffs.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
	  cleanup: function() {
	    $('.trip-overlay, .trip-block').remove();
	  },

	  /**
	   * Initialize Trip.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
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

	  /**
	   * Start Trip.
	   *
	   * @memberOf Trip
	   * @type {Function}
	   */
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = TripParser;

	/**
	 * TripParser - this is the parser that helps us parse DOM elements and
	 * return needed information to TripCore. By doing so, users can easily
	 * define their own trips from HTML.
	 *
	 * @class TripParser
	 */
	function TripParser() {
	  this._DEFAULT_TRIP_NODES_SELECTOR = '[data-trip]';
	  this._DEFAULT_TRIP_POSITION = 'n';
	  this._DEFAULT_TRIP_ANIMATION = 'tada';
	}

	TripParser.prototype = {
	  /**
	   * We will find out all pre-defined DOM elements from DOM tree.
	   *
	   * @memberOf TripParser
	   * @type {Function}
	   * @return {Array} Array of Element
	   */
	  _getAllTripNodes: function(selector) {
	    return document.querySelectorAll(selector);
	  },

	  /**
	   * we will use this function to parse out all needed information
	   * and wrap them into a tripData object then pass it out.
	   *
	   * TODO - http://caniuse.com/#search=dataset
	   * IE 8~10 can't use dataset directly, so we may need to use
	   * getAttribute for this case later.
	   *
	   * @memberOf TripParser
	   * @type {Function}
	   * @param {Element} node
	   * @return {Object} TripData
	   */
	  _parseTripData: function(node) {
	    var tripIndex = node.dataset.tripIndex;
	    var tripContent = node.dataset.tripContent;
	    var tripDelay = node.dataset.tripDelay;
	    var tripPosition =
	      node.dataset.tripPosition || this._DEFAULT_TRIP_POSITION;
	    var tripAnimation =
	      node.dataset.tripAnimation || this._DEFAULT_TRIP_ANIMATION;

	    if (!node || typeof tripIndex === 'undefined' || tripContent === '') {
	      // Let's ignore this tripData
	      return null;
	    }
	    else {
	      tripIndex = parseInt(tripIndex, 10);
	      tripDelay = parseInt(tripDelay, 10);

	      // TODO
	      // we can try to extend this tripData list
	      //
	      // We have to put tripIndex as its internal property so that
	      // we can sort them by their indexes.
	      var tripObject = {};
	      tripObject.sel = node;
	      tripObject._index = tripIndex;
	      tripObject.position = tripPosition;
	      tripObject.content = tripContent;

	      if (tripDelay && !isNaN(tripDelay)) {
	        tripObject.delay = tripDelay;
	      }

	      return tripObject;
	    }
	  },

	  _sort: function(tripData) {
	    tripData.sort(function(dataA, dataB) {
	      return dataA._index - dataB._index;
	    });
	  },

	  /**
	   * This is the main entry point to use tripParser.
	   *
	   * @memberOf TripParser
	   * @type {Function}
	   * @param {String} selector - selector to matches nodes from DOM tree
	   * @return {Array} Array of tripDatas
	   */
	  parse: function(selector) {
	    if (typeof selector !== 'string') {
	      throw 'Please check your selector - ' + selector + ' , and make sure ' +
	        ' it is String type';
	    }

	    selector = (selector === 'default') ?
	      this._DEFAULT_TRIP_NODES_SELECTOR : selector;

	    var that = this;
	    var tripData = [];
	    var nodes = this._getAllTripNodes(selector);

	    if (nodes) {
	      [].forEach.call(nodes, function(node) {
	        var tripDataForThatNode = that._parseTripData(node);
	        if (tripDataForThatNode) {
	          tripData.push(tripDataForThatNode);
	        }
	      });
	    }

	    // TODO
	    // we have to use one more function to clenaup broken steps here to make
	    // sure all stesp are increase from 0 to n-1. Otherwise, Trip.core may
	    // get broken.

	    this._sort(tripData);
	    return tripData;
	  }
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * TripUtils - some general used functions will be collected here.
	 *
	 * @class TripUtils
	 */
	var TripUtils = {

	  /**
	   * We will use this native method to know whether this is an array.
	   *
	   * @memberOf TripUtils
	   * @type {Function}
	   * @return {Boolean}
	   */
	  isArray: function(target) {
	    return Object.prototype.toString.call(target) === '[object Array]';
	  },

	  /**
	   * We will use this native method to know whether this is an object.
	   *
	   * @memberOf TripUtils
	   * @type {Function}
	   * @return {Boolean}
	   */
	  isObject: function(target) {
	    return Object.prototype.toString.call(target) === '[object Object]';
	  },

	  /**
	   * We will use this native method to know whether this is an string.
	   *
	   * @memberOf TripUtils
	   * @type {Function}
	   * @return {Boolean}
	   */
	  isString: function(target) {
	    return (typeof target === 'string');
	  },

	  /**
	   * 3rd party libraries / toolkits
	   *
	   * We will keep our 3rd party libraries / toolkits here to make sure we can
	   * track where did we get the code from and its usage.
	   *
	   * See also:
	   * http://stackoverflow.com/questions/3969475/javascript-pause-settimeout
	   *
	   * @memberOf TripUtils
	   * @type {Function}
	   * @return {Timer}
	   */
	  Timer: function(callback, delay) {
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
	};

	module.exports = TripUtils;


/***/ }
/******/ ])
});
;