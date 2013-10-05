var baseTripData = [
    { sel : $(".demo"), content : "North", position : "n" },
    { sel : $(".demo"), content : "South", position : "s" }
];

asyncTest("onTripStart", function() {
    var trip = new Trip(baseTripData, {
        onTripStart: function() {
            ok(true, "onTripStart ok");
            start();
        }
    });

    trip.start();
});

asyncTest("onTripChange", function() {
    var trip = new Trip(baseTripData, {
        onTripChange: function() {
            ok(true, "onTripChange ok");
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

test("End of Trip.js", function() {
    stop();  
});
