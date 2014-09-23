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

asyncTest('expose would not make Trip throw exception, check #68', function() {
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
