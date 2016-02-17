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
    var tripExpose = node.dataset.tripExpose === 'true' ?
      true : (node.dataset.tripExpose || false);
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
      tripObject.expose = tripExpose;

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
