asyncTest('directions test', function() {
  var trip = new Trip([
    { sel: $('.demo'), content: 'North',     position: 'n' },
    { sel: $('.demo'), content: 'East',      position: 'e' },
    { sel: $('.demo'), content: 'South',     position: 's' },
    { sel: $('.demo'), content: 'West',      position: 'w' },
    { sel: $('.demo'), content: 'screen-center', position: 'screen-center' },
    { sel: $('.demo'), content: 'screen-ne',   position: 'scren-ne' },
    { sel: $('.demo'), content: 'screen-se',   position: 'scren-se' },
    { sel: $('.demo'), content: 'screen-nw',   position: 'scren-nw' },
    { sel: $('.demo'), content: 'screen-sw',   position: 'scren-sw' }
  ], {
    onTripChange: function(i, tripData) {
      var $tripBlock = $('.trip-block');
      ok($tripBlock.hasClass(tripData.position), 'Detect postion : ' + tripData.position);
    },
    onEnd: function() {
      start();
    }
  });

  trip.start();
});
