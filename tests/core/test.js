module('core tests');

asyncTest('customized parser mode with configuration', function() {
  var trip = new Trip('.customized-trip-group', {
    onTripChange: function(tripIndex, tripObject) {
      var positionMap = ['n', 'e', 's'];
      equal(tripObject.content, 'hi' + (tripIndex + 1));
      equal(tripObject.delay, 100 * (tripIndex + 1));
      equal(tripObject.position, positionMap[tripIndex]);
    },
    onEnd: function() {
      start(); 
    }
  });

  trip.start();
});

asyncTest('default parser mode with configuration', function() {
  var trip = new Trip({
    onTripChange: function(tripIndex, tripObject) {
      var positionMap = ['n', 'e', 's'];
      equal(tripObject.content, 'hi' + (tripIndex + 1));
      equal(tripObject.delay, undefined,
        'we will use delay from configuration');
      equal(tripObject.position, positionMap[tripIndex]);
    },
    delay: 100,
    onEnd: function() {
      start(); 
    }
  });

  trip.start();
});

asyncTest('programming mode with configuration', function() {
  var trip = new Trip([
    { sel: '.step1', position: 'n', content: 'hi1' },
    { sel: '.step2', position: 'e', content: 'hi2' },
    { sel: '.step3', position: 's', content: 'hi3' }
  ], {
    onTripChange: function(tripIndex, tripObject) {
      var positionMap = ['n', 'e', 's'];
      equal(tripObject.content, 'hi' + (tripIndex + 1));
      equal(tripObject.delay, undefined,
        'we will use delay from configuration');
      equal(tripObject.position, positionMap[tripIndex]);
    },
    delay: 200,
    onEnd: function() {
      start(); 
    }
  });

  trip.start();
});

asyncTest('with nextClickSelector option', function() {
  var trip = new Trip([
    { sel: '.step1', position: 'n', content: 'hi1', nextClickSelector: '.step2' },
    { sel: '.step2', position: 'e', content: 'hi2', nextClickSelector: '.step2' },
    { sel: '.step3', position: 's', content: 'hi3', nextClickSelector: '.step2' }
  ],{
    onEnd: function() {
      start(); 
    }
  });

  trip.start();

  $('.step2').click();
  equal(trip.tripIndex, 1);

  $('.step2').click();
  equal(trip.tripIndex, 2);
});

asyncTest('when tripEnds returns a deferred, wait for it to be resolved ',
  function() {
    var deferred = new $.Deferred()
    var trip = new Trip([
      { sel: '.step1', position: 'n', content: 'hi1' },
      { sel: '.step2', position: 'e', content: 'hi2' },
      { sel: '.step3', position: 's', content: 'hi3' }
    ], {
      onTripEnd: function() {
        return deferred;
      },
      onEnd: function() {
        start();
      }
    });

    trip.start();

    $('.trip-next').click();
    equal(trip.tripIndex, 0);

    deferred.resolve();
    equal(trip.tripIndex, 1);
});

asyncTest('next() can be called with index', function() {
  var count = 0;

  var trip = new Trip([
    { sel: '.step1', position: 'n', content: 'hi1' },
    { sel: '.step2', position: 'e', content: 'hi2' },
    { sel: '.step3', position: 's', content: 'hi3' }
  ], {
    onTripChange: function(i) {
      count++;
      if (i === 0) {
        trip.next(2);
      }
    },
    onEnd: function() {
      equal(count, 2);
      start();
    }
  });

  trip.start();
});
