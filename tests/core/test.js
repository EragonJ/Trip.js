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

asyncTest('with waitForNextElement option', function() {
  var trip = new Trip([
    { sel: '.step1', position: 'n', content: 'hi1' },
    { sel: '.step2', position: 'e', content: 'hi2' },
    { sel: '.step3', position: 's', content: 'hi3' }
  ],{
    showNavigation: true,
    waitForNextElement: true,
    onEnd: function() {
      start(); 
    }
  });

  trip.start();
  $('.trip-next').click()
  equal(trip.tripIndex, 1)

  var savedStep = $('.step3').clone(true)
  $('.step3').remove()
  setTimeout( function(){$('body').append(savedStep)}, 100);

  $('.trip-next').click()
  equal(trip.tripIndex, 2)
});
