module.exports = {
  Timer: Timer
};

/**
 * 3rd party libraries / toolkits
 *
 * We will keep our 3rd party libraries / toolkits here to make sure we can
 * track where did we get the code from and its usage.
 *
 * See also:
 * http://stackoverflow.com/questions/3969475/javascript-pause-settimeout
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
