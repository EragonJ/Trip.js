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

asyncTest('target inside iframe', function() {
  var arrowHeight = 10;
  var arrowWidth = 10;
  
  var frame = $('[name="iframe parser"]');
  var trip = new Trip([
    { sel: frame.contents().find('.iframe-step1'), position: 'n', content: 'hi1' },
    { sel: frame.contents().find('.iframe-step2'), content: 'hi2' },
    { sel: frame.contents().find('.iframe-step3'), content: 'hi3' }
  ], {
    onStart: function () {
      frame.contents().scrollTop(frame.height() * Math.random());
      frame.contents().scrollLeft(frame.width() * Math.random());
    },
    onTripChange: function(i, o) {
      var $tripBlock = $(".trip-block");
      var blockWidth = $tripBlock.outerWidth();
      var blockHeight = $tripBlock.outerHeight();
      
      var selWidth = $(o.sel) && $(o.sel).outerWidth();
      var selHeight = $(o.sel) && $(o.sel).outerHeight();
      
      var top = frame.position().top - $(o.sel).parents('html,body').scrollTop();
      var left = frame.position().left - $(o.sel).parents('html,body').scrollLeft();
      var blockPos = $tripBlock.position();
      var pointerTop = $(o.sel).position().top - arrowHeight - blockHeight;
      var pointerLeft = $(o.sel).position().left + ((selWidth - blockWidth) / 2);
      equal(Math.round(left + pointerLeft), Math.round(blockPos.left), "Left of tripBlock is wrong for iframe element "+ i);
      equal(Math.round(top + pointerTop), Math.round(blockPos.top), "Top of tripBlock is wrong for iframe element "+ i);
    },
    onEnd: function() {
      start(); 
    }
  })

  trip.start();
});
