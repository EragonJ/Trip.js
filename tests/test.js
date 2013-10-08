var baseTripData = [
    { sel: $(".demo"), content: "North", position: "n" },
    { sel: $(".demo"), content: "South", position: "s" }
];

asyncTest("onTripStart", function() {
    var trip = new Trip(baseTripData, {
        onTripStart: function() {
            ok(true, "onTripStart ok");
        },
        onTripEnd: function() {
            start();
        }
    });

    trip.start();
});

asyncTest("onTripChange", function() {
    var trip = new Trip(baseTripData, {
        onTripChange: function() {
            ok(true, "onTripChange ok");
        },
        onTripEnd: function() {
            start();
        }
    });

    trip.start();
});

asyncTest("onTripEnd", function() {
    var trip = new Trip(baseTripData, {
        onTripEnd: function() {
            ok(true, "onTripEnd ok");
            start();
        }
    });

    trip.start();
});

asyncTest("onTripStop", function() {
    var trip = new Trip(baseTripData, {
        onTripStop: function() {
            ok(true, "onTripStop ok");
            start();
        }
    });

    setTimeout(function() {
        trip.stop();
    }, 1000);

    trip.start();
});

asyncTest("directions test", function() {
    var trip = new Trip([
        { sel: $(".demo"), content: "North", position: "n" },
        { sel: $(".demo"), content: "East",  position: "e" },
        { sel: $(".demo"), content: "South", position: "s" },
        { sel: $(".demo"), content: "West",  position: "w" }
    ], {
        onTripChange: function(i, tripData) {
            var $tripBlock = $(".trip-block");
            ok($tripBlock.hasClass(tripData.position), "Detect postion : " + tripData.position);
        },
        onTripEnd: function() {
            start();
        }
    });

    trip.start();
});

asyncTest("theme test", function() {
    var trip = new Trip(baseTripData, {
        tripTheme: "white",
        onTripChange: function(i, tripData) {
            var $tripBlock = $(".trip-block");
            ok($tripBlock.hasClass("white"));
        },
        onTripEnd: function() {
            start();
        }
    });

    trip.start();
});
