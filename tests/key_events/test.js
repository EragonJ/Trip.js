module('keyboard related tests');

asyncTest('arrow keys test', function() {
  var step = 0;
  var trip = new Trip([
    { sel: $('.demo'), content: 'North', position: 'n' },
    { sel: $('.demo'), content: 'East',  position: 'e' },
    { sel: $('.demo'), content: 'West',  position: 'w' }
  ], {
    onTripChange: function(index) {
      step++;
      if (step === 1) {
        ok(Helpers.getTripBlock().hasClass('n'));
        Helpers.sendKey('DOWN');
      }
      else if (step === 2) {
        ok(Helpers.getTripBlock().hasClass('e'));
        Helpers.sendKey('UP');
      }
      else if (step === 3) {
        ok(Helpers.getTripBlock().hasClass('n'));
        Helpers.sendKey('RIGHT');
      }
      else if (step === 4) {
        ok(Helpers.getTripBlock().hasClass('e'));
        Helpers.sendKey('LEFT');
      }
      else if (step === 5) {
        ok(Helpers.getTripBlock().hasClass('n'));
        Helpers.sendKey('SPACE');
      }
      else if (step === 6) {
        ok(Helpers.getTripBlock().hasClass('e'));
        Helpers.sendKey('RIGHT');
      }
      else if (step === 7) {
        ok(Helpers.getTripBlock().hasClass('w'));
        Helpers.sendKey('ESC');
      }
    },
    onTripPause: function() {
      ok('Press space would trigger onTripPause');
      Helpers.sendKey('SPACE');
    },
    onTripResume: function() {
      ok('Press space again would trigger onTripResume');
    },
    onTripStop: function() {
      // we will get here when finished
      start();
    },
    onEnd: function() {
      ok('When stop, we still go into onEnd')
    }
  });

  trip.start();
});
