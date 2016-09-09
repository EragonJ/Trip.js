require([
  'Trip'
], function(Trip) {
  $(document).ready(function() {

    // Demo - Change position
    var tripToChangePosition = new Trip([
      { sel : $(".demo-change-position.step1"), content : "North", position : "n" },
      { sel : $(".demo-change-position.step2"), content : "East",  position : "e" },
      { sel : $(".demo-change-position.step3"), content : "South", position : "s" },
      { sel : $(".demo-change-position.step4"), content : "West",  position : "w" }
    ], {

    });

    $(".demo-change-position").on("click", function() {
      tripToChangePosition.start();
    });

    // Demo - Change theme
    var tripToChangeTheme = new Trip([
			{ sel : $(".demo-change-theme.step1"), content : "North", position : "n" },
			{ sel : $(".demo-change-theme.step2"), content : "East",  position : "e" },
			{ sel : $(".demo-change-theme.step3"), content : "South", position : "s" },
			{ sel : $(".demo-change-theme.step4"), content : "West",  position : "w" }
		], {
			tripTheme : "white",
			onStart : function() {
				$("body").css({ "background-color" : "#eee" });
			},
			onEnd : function() {
				$("body").css({ "background-color" : "#fff" });
			}
		});

		$(".demo-change-theme").on("click", function() {
			tripToChangeTheme.start();
		});

    // Demo - Scroll to top
		var tripToScrollToTop = new Trip([
			{ sel : $(".demo-scroll-to-top.step1"), content : "Let's fly ...", position : "e" }
		], {
			backToTopWhenEnded : true,
			delay : 2000
		});

		$(".demo-scroll-to-top").on("click", function() {
			tripToScrollToTop.start();
		});

    // Demo - Show navigation
    var tripToShowNavigation = new Trip([
      { sel : $(".demo-show-navigation.step1"), content : "Hola!", position : "n" },
      { sel : $(".demo-show-navigation.step2"), content : "Adios!", position : "s" }
    ], {
      showNavigation : true,
      showCloseBox : true,
      delay : -1
    });

    $(".demo-show-navigation").on("click", function() {
      tripToShowNavigation.start();
    });

    // Demo - Global options
		var tripToCheckGlobalOptions = new Trip([
			{ sel : $(".demo-global-options.step1"), content : "Hi", position : "n" },
			{ sel : $(".demo-global-options.step2"), content : "Press ESC to stop this step !", position : "s", delay : 3000, myFunction : function() { return "this is user's function"; } },
			{ sel : $(".demo-global-options.step3"), content : "Click the close icon to see what's going on in your console log", delay: -1, showCloseBox: true }
		], {
			onStart : function() {
				console.log("onStart");
			},
			onEnd : function() {
				console.log("onEnd");
			},
			onTripStop : function() {
				console.log("onTripStop");
			},
			onTripChange : function(i, tripData) {
				if (i === 1) {
					console.log("You can put your own function or data in tripData andaccess it onTripChange !");
					console.log("current tripIndex : " + i);
					console.log("current tripData : ", tripData);
					console.log("User's function : " + tripData.myFunction());
				}
			},
			onTripClose: function(i) {
				console.log("You close the trip at index : ", i);
			}
		});

		$(".demo-global-options").on("click", function() {
			tripToCheckGlobalOptions.start();
		});

    // Demo - Local options
    var tripToCheckLocalOptions = new Trip([
      {
        sel: $('.demo-local-options.step1'),
        content: 'onTripStart will be called when entering this trip',
        onTripStart: function(tripIndex) {
          console.log('onTripStart : ', tripIndex);
        },
        onTripEnd: function(tripIndex) {
          console.log('onTripEnd : ', tripIndex);
        }
      },
      {
        sel: $('.demo-local-options.step2'),
        content: 'We will use global onTripStart if there is no local one',
        onTripEnd: function(tripIndex) {
          console.log('onTripEnd : ', tripIndex);
        }
      }
    ], {
      delay: 3000,
      onTripStart: function(tripIndex) {
        console.log('default onTripStart : ', tripIndex);
      }
    });

    $('.demo-local-options').on('click', function() {
      tripToCheckLocalOptions.start();
    });

    // Demo - Highlight
    var tripToHighlight = new Trip([
      { sel : $(".demo-highlight.step1"), content : "Highlight this", expose : true }
    ], {
      delay : 3000
    });

    $(".demo-highlight").on("click", function() {
      tripToHighlight.start();
    });

    // Demo - Change animation
    var tripToChangeAnimation = new Trip([
      { sel : $(".demo-animation.step1"), content : "hi"},
      { sel : $(".demo-animation.step2"), content : "hi", animation: 'bounce'},
      { sel : $(".demo-animation.step3"), content : "hi", animation: 'shake'},
      { sel : $(".demo-animation.step4"), content : "hi", animation: 'fadeIn'},
      { sel : $(".demo-animation.step5"), content : "hi", animation: 'fadeInUp'},
      { sel : $(".demo-animation.step6"), content : "hi", animation: 'fadeInDown'},
      { sel : $(".demo-animation.step7"), content : "hi", animation: 'fadeInLeft'},
      { sel : $(".demo-animation.step8"), content : "hi", animation: 'rotateInUpRight'}
    ], {
      delay : 1500,
      animation: 'tada'
    });

    $(".demo-animation").on("click", function() {
      tripToChangeAnimation.start();
    });
  });
});
