(function(exports) {
    var Helpers = {
        _debug: false,
        _CONSTANTS: {
            ESC: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        },
        getTripBlock: function() {
            return $('.trip-block');
        },
        sendKey: function(keyName) {
            if (this._CONSTANTS[keyName]) {
                if (this._debug) {
                    console.log('[DEBUG] SendKey > ', this._CONSTANTS[keyName]);
                }
                $('body').trigger({
                    type: 'keydown',
                    which: this._CONSTANTS[keyName]
                });
            }
        }
    };

    exports.Helpers = Helpers;
}(window));
