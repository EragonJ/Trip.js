module('onTripXYZ related callbacks tests');

asyncTest('onStart', function() {
  var trip = new Trip(baseTripData, {
    onStart: function() {
      ok(true, 'onStart ok');
    },
    onEnd: function() {
      start();
    }
  });

  trip.start();
});

asyncTest('onTripChange', function() {
  var trip = new Trip(baseTripData, {
    onTripChange: function() {
      ok(true, 'onTripChange ok');
    },
    onEnd: function() {
      start();
    }
  });

  trip.start();
});

asyncTest('onEnd', function() {
  var trip = new Trip(baseTripData, {
    onEnd: function() {
      ok(true, 'onEnd ok');
      start();
    }
  });

  trip.start();
});

asyncTest('onTripStop', function() {
  var trip = new Trip(baseTripData, {
    onTripStop: function() {
      ok(true, 'onTripStop ok');
      start();
    }
  });

  setTimeout(function() {
    trip.stop();
  }, 1000);

  trip.start();
});

