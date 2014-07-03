asyncTest('theme test', function() {
  var trip = new Trip(baseTripData, {
    tripTheme: 'white',
    onTripChange: function(i, tripData) {
      var $tripBlock = $('.trip-block');
      ok($tripBlock.hasClass('white'));
    },
    onEnd: function() {
      start();
    }
  });

  trip.start();
});
