var baseTripData = [
    { sel: $('.demo'), content: 'North', position: 'n' },
    { sel: $('.demo'), content: 'South', position: 's' }
];

module('onTripXYZ related callbacks tests');

asyncTest('onTripStart', function() {
    var trip = new Trip(baseTripData, {
        onTripStart: function() {
            ok(true, 'onTripStart ok');
        },
        onTripEnd: function() {
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
        onTripEnd: function() {
            start();
        }
    });

    trip.start();
});

asyncTest('onTripEnd', function() {
    var trip = new Trip(baseTripData, {
        onTripEnd: function() {
            ok(true, 'onTripEnd ok');
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

module('visual related tests');

asyncTest('directions test', function() {
    var trip = new Trip([
        { sel: $('.demo'), content: 'North',         position: 'n' },
        { sel: $('.demo'), content: 'East',          position: 'e' },
        { sel: $('.demo'), content: 'South',         position: 's' },
        { sel: $('.demo'), content: 'West',          position: 'w' },
        { sel: $('.demo'), content: 'screen-center', position: 'screen-center' },
        { sel: $('.demo'), content: 'screen-ne',     position: 'scren-ne' },
        { sel: $('.demo'), content: 'screen-se',     position: 'scren-se' },
        { sel: $('.demo'), content: 'screen-nw',     position: 'scren-nw' },
        { sel: $('.demo'), content: 'screen-sw',     position: 'scren-sw' }
    ], {
        onTripChange: function(i, tripData) {
            var $tripBlock = $('.trip-block');
            ok($tripBlock.hasClass(tripData.position), 'Detect postion : ' + tripData.position);
        },
        onTripEnd: function() {
            start();
        }
    });

    trip.start();
});

asyncTest('theme test', function() {
    var trip = new Trip(baseTripData, {
        tripTheme: 'white',
        onTripChange: function(i, tripData) {
            var $tripBlock = $('.trip-block');
            ok($tripBlock.hasClass('white'));
        },
        onTripEnd: function() {
            start();
        }
    });

    trip.start();
});

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
                Helpers.sendKey('ESC');
            }
        },
        onTripStop: function() {
            // we will get here when finished
            start();
        },
        onTripEnd: function() {
            throw new Error('We can\' get into onTripEnd!');
        }
    });

    trip.start();
});
