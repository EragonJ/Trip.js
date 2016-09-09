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
   * @param {*} target
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
   * @param {*} target
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
   * @param {*} target
   * @return {Boolean}
   */
  isString: function(target) {
    return (typeof target === 'string');
  },

  /**
   * We will use this function to compute the resulting boolean option
   * based on the local and global settings.
   *
   * @memberOf TripUtils
   * @type {Function}
   * @param {*} local setting
   * @param {*} global setting
   * @return {Boolean}
   */
  isSet: function(localSetting, globalSetting) {
    return typeof localSetting !== 'undefined' ?
      localSetting : globalSetting;
  },

  /**
   * Handy wrapper of console.log
   *
   * @memberOf TripUtils
   * @type {Function}
   */
  log: function() {
    var console = window.console;
    if (typeof console !== 'undefined' && console.log) {
      console.log.apply(console, arguments);
    }
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
   * @param {Function} callback
   * @param {Number} delay
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
