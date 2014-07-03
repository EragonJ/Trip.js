module('onTripXYZ callbacks tests');

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

asyncTest('onEnd', function() {
  var trip = new Trip(baseTripData, {
    onEnd: function() {
      ok(true, 'onEnd ok');
      start();
    }
  });

  trip.start();
});

asyncTest('onTripStart', function() {
  var trip = new Trip(baseTripData, {
    onTripStart: function() {
      ok(true, 'onTripStart ok');
    },
    onEnd: function() {
      start();
    }
  });

  trip.start();
});

asyncTest('onTripEnd', function() {
  var trip = new Trip(baseTripData, {
    onTripEnd: function() {
      ok(true, 'onTripEnd ok');
    },
    onEnd: function() {
      start();
    }
  });

  trip.start();
});

asyncTest('onTripPause', function() {
  var trip = new Trip(baseTripData, {
    onTripPause: function() {
      ok(true, 'onTripPause ok');
    },
    onEnd: function() {
      start();
    }
  });

  setTimeout(function() {
    trip.pause();
    setTimeout(function() {
      trip.resume();
    }, 500);
  }, 1000);

  trip.start();
});

asyncTest('onTripResume', function() {
  var trip = new Trip(baseTripData, {
    onTripResume: function() {
      ok(true, 'onTripResume ok');
    },
    onEnd: function() {
      start();
    }
  });

  setTimeout(function() {
    trip.pause();
    setTimeout(function() {
      trip.resume();
    }, 500);
  }, 1000);

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

asyncTest('onTripClose', function() {
  var tripData = $.extend(baseTripData, {
    showCloseBox: true
  });

  var trip = new Trip(tripData, {
    onTripClose: function() {
      ok(true, 'onTripClose ok');
    },
    onTripStop: function() {
      start();
    }
  });

  setTimeout(function() {
    $('.trip-close').click();
  }, 500);

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

