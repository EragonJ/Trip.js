$(document).ready(function() {

    /*
     * basic-demo-1
     */
    var trip1 = new Trip([
        { sel : $(".demo-basic-1.step1"), content : "North", position : "n" },
        { sel : $(".demo-basic-1.step2"), content : "East",  position : "e" },
        { sel : $(".demo-basic-1.step3"), content : "South", position : "s" },
        { sel : $(".demo-basic-1.step4"), content : "West",  position : "w" }
    ], {

    });
    
    $(".start-demo-basic-1").on("click", function() {
        trip1.start();
    });
    
    /*
     * basic-demo-2
     */
    var trip2 = new Trip([
        { sel : $(".demo-basic-2.step1"), content : "North", position : "n" },
        { sel : $(".demo-basic-2.step2"), content : "East",  position : "e" },
        { sel : $(".demo-basic-2.step3"), content : "South", position : "s" },
        { sel : $(".demo-basic-2.step4"), content : "West",  position : "w" }
    ], {
        tripTheme : "white",
        onTripStart : function() {
            $("body").css({ "background-color" : "#eee" });
        },
        onTripEnd : function() {
            $("body").css({ "background-color" : "#fff" });
        }
    });

    $(".start-demo-basic-2").on("click", function() {
        trip2.start();
    });

    /*
     * basic-demo-3
     */
    var trip3 = new Trip([
        { sel : $(".demo-basic-3.step1"), content : "Let's fly ...", position : "e" }
    ], {
        backToTopWhenEnded : true,
        delay : 3000
    });

    $(".start-demo-basic-3").on("click", function() {
        trip3.start();
    });

    /*
     * basic-demo-4
     */
    var trip4 = new Trip([
        { sel : $(".demo-basic-4.step1"), content : "Hola!", position : "n" },
        { sel : $(".demo-basic-4.step2"), content : "Adios!", position : "s" }
    ], {
        showNavigation : true,
        showCloseBox : true,
        delay : -1
    });

    $(".start-demo-basic-4").on("click", function() {
        trip4.start();
    });

    /*
     * basic-demo-5
     */
    var trip5 = new Trip([
        { sel : $(".demo-basic-5.step1"), content : "onTripStart get triggered before we start our trip", position : "n" },
        { sel : $(".demo-basic-5.step2"), content : "Press ESC to stop this step !", position : "s", delay : 3000, myFunction : function() { return "this is user's function" } }
    ], {
        onTripStart : function() {
            alert("onTripStart");
        },
        onTripStop : function() {
            alert("onTripStop");
        },
        onTripEnd : function() {
            alert("onTripEnd");
        },
        onTripChange : function(i, tripData) {
            if ( i === 1 ) {
                alert("onTripChange, go check your console !");
                console.log("You can put your own function or data in tripData, then access it onTripChange !");
                console.log("current tripIndex : " + i);
                console.log("current tripData : ", tripData);
                console.log("User's function : " + tripData.myFunction());
            }
        }
    });

    $(".start-demo-basic-5").on("click", function() {
        trip5.start();
    });
    
    /*
     * basic-demo-6
     */
    var trip6 = new Trip([
        { sel : $(".demo-basic-6.step1"), content : "Highlight this", expose : true },
        { sel : $(".demo-basic-6.step2"), content : "No highlight" },
        { sel : $(".demo-basic-6.step3"), content : "Highlight that", expose : true }
    ], {
        delay : 3000
    });
    
    $(".start-demo-basic-6").on("click", function() {
        trip6.start();
    });
});
