(function(exports) {
  var Helpers = {
    _debug: false,
    _CONSTANT: {
      ESC: 27,
      SPACE: 32,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    },
    getTripBlock: function() {
      return $('.trip-block');
    },
    sendKey: function(keyName, delay) {
      var that = this;
      delay = delay || 300;
      if (this._CONSTANT[keyName]) {
        if (this._debug) {
          console.log('[DEBUG] SendKey > ', this._CONSTANT[keyName]);
        }
        setTimeout(function() {
          $('body').trigger({
            type: 'keydown',
            which: that._CONSTANT[keyName]
          });
        }, delay);
      }
    }
  };

  exports.Helpers = Helpers;
}(window));
