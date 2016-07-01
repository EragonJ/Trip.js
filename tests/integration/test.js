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

asyncTest('next / prev will trigger onTripEnd too', function() {
  expect(2);

  var comingFromPrev = false;

  var trip = new Trip([
    {
      sel: $('.demo'),
      content: 'North',
      position: 'n',
      onTripStart: function() {
        Helpers.sendKey('DOWN');
      },
      onTripEnd: function() {
        ok(true, 'local onTripEnd is called');
      }
    },
    {
      sel: $('.demo'),
      content: 'East',
      position: 'e',
      onTripEnd: function() {
        if (comingFromPrev) {
          ok(true, 'local onTripEnd is called');
        }
      }
    },
    {
      sel: $('.demo'),
      content: 'South',
      position: 's',
      onTripStart: function() {
        if (!comingFromPrev) {
          Helpers.sendKey('UP');
          comingFromPrev = true;
        }
      }
    }
  ], {
    onEnd: function() {
      start();
    }
  });

  trip.start();
});

asyncTest('#68, expose would not make Trip throw exception', function() {
  var trip = new Trip([
    {
      content: '<div class="welcome-block">Welcome!</div>',
      position: 'screen-center',
      animation: 'fadeIn',
      expose : true
    },
    {
      sel: $('.demo'),
      content: '2nd block',
      position: 'n',
      expose : true,
      animation: 'bounce'
    },
    {
      sel: $('.demo'),
      content: '3rd block',
      position: 'n',
      expose : true,
      animation: 'shake'
    }
  ], {
    tripTheme : "white",
    onEnd: function() {
      ok(true, 'expose did pass');
      start();
    }
  });

  trip.start();
});

asyncTest('#69, we would pass tripIndex and tripObject in onEnd', function() {
  var trip = new Trip([
    {
      sel: $('.demo'),
      content: '1nd block',
    },
    {
      sel: $('.demo'),
      content: '2rd block',
      isSecondTrip: true
    }
  ], {
    tripTheme : "white",
    onEnd: function(tripIndex, tripObject) {
      equal(tripIndex, 1);
      equal(tripObject.isSecondTrip, true)
      ok(true, 'onEnd did exec');
      start();
    }
  });

  trip.start();
});

asyncTest('#63, we can expose item to right position', function() {
  var trip = new Trip([
    {
      sel: $('.demo-with-absolute'),
      content: '1st block',
      onTripStart: function() {
        var selTop = parseInt($('.demo-with-absolute').css('top'), 10);
        var blockTop = parseInt($('.trip-block').css('top'), 10);
        var blockHeight = $('.trip-block').outerHeight();
        equal(selTop,
          blockTop + blockHeight + trip.CONSTANT.TRIP_BLOCK_OFFSET_VERTICAL);
      }
    },
    {
      sel: $('.demo-with-fixed'),
      content: '2rd block',
      isSecondTrip: true,
      onTripEnd: function() {
        var selTop = parseInt($('.demo-with-fixed').css('top'), 10);
        var blockTop = parseInt($('.trip-block').css('top'), 10);
        var blockHeight = $('.trip-block').outerHeight();
        equal(selTop,
          blockTop + blockHeight + trip.CONSTANT.TRIP_BLOCK_OFFSET_VERTICAL);
      }
    },
  ], {
    tripTheme : "white",
    onEnd: function(tripIndex, tripObject) {
      start();
    }
  });

  trip.start();
});
