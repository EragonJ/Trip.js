module('integration tests');

asyncTest('make sure arrow key would trigger onTripEnd', function() {
  var step = 0;
  var trip = new Trip([
    { 
      sel: $('.demo'),
      content: 'North',
      position: 'n'
    },
    { 
      sel: $('.demo'),
      content: 'East',
      position: 'e',
      onTripEnd: function() {
        ok(true, 'local onTripEnd is called');
      }
    }
  ], {
    delay: 1000,
    onTripChange: function() {
      Helpers.sendKey('DOWN');
    },
    onTripEnd: function() {
      ok(true, 'global onTripEnd is called');
    },
    onEnd: function() {
      start();
    }
  });

  trip.start();
});
