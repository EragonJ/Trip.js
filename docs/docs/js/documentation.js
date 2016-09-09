require([
  'Trip'
], function(Trip) {
  $(document).ready(function() {

    // Documentation - black theme
    var tripBlackTheme = new Trip([
      { sel : $(".documentation-theme-black.step1"), content : "North", position : "n" },
      { sel : $(".documentation-theme-black.step1"), content : "East",  position : "e" },
      { sel : $(".documentation-theme-black.step1"), content : "South", position : "s" },
      { sel : $(".documentation-theme-black.step1"), content : "West",  position : "w" }
    ], {
      tripTheme: 'black',
      showSteps: true,
      showNavigation: true,
      showHeader: true
    });

    $(".documentation-theme-black").on("click", function() {
      tripBlackTheme.start();
    });

    // Documentation - white theme
    var tripWhiteTheme = new Trip([
      { sel : $(".documentation-theme-white.step1"), content : "North", position : "n" },
      { sel : $(".documentation-theme-white.step1"), content : "East",  position : "e" },
      { sel : $(".documentation-theme-white.step1"), content : "South", position : "s" },
      { sel : $(".documentation-theme-white.step1"), content : "West",  position : "w" }
    ], {
      tripTheme: 'white',
      showSteps: true,
      showNavigation: true,
      showHeader: true
    });

    $(".documentation-theme-white").on("click", function() {
      tripWhiteTheme.start();
    });

    // Documentation - dark theme
    var tripDarkTheme = new Trip([
      { sel : $(".documentation-theme-dark.step1"), content : "North", position : "n" },
      { sel : $(".documentation-theme-dark.step1"), content : "East",  position : "e" },
      { sel : $(".documentation-theme-dark.step1"), content : "South", position : "s" },
      { sel : $(".documentation-theme-dark.step1"), content : "West",  position : "w" }
    ], {
      tripTheme: 'dark',
      showSteps: true,
      showNavigation: true,
      showHeader: true
    });

    $(".documentation-theme-dark").on("click", function() {
      tripDarkTheme.start();
    });

    // Documentation - yeti theme
    var tripYetiTheme = new Trip([
      { sel : $(".documentation-theme-yeti.step1"), content : "North", position : "n" },
      { sel : $(".documentation-theme-yeti.step1"), content : "East",  position : "e" },
      { sel : $(".documentation-theme-yeti.step1"), content : "South", position : "s" },
      { sel : $(".documentation-theme-yeti.step1"), content : "West",  position : "w" }
    ], {
      tripTheme: 'yeti',
      showSteps: true,
      showNavigation: true,
      showHeader: true
    });

    $(".documentation-theme-yeti").on("click", function() {
      tripYetiTheme.start();
    });

    // Documentation - minimalism theme
    var tripMinimalismTheme = new Trip([
      { sel : $(".documentation-theme-minimalism.step1"), content : "North", position : "n" },
      { sel : $(".documentation-theme-minimalism.step1"), content : "East",  position : "e" },
      { sel : $(".documentation-theme-minimalism.step1"), content : "South", position : "s" },
      { sel : $(".documentation-theme-minimalism.step1"), content : "West",  position : "w" }
    ], {
      tripTheme: 'minimalism',
      showSteps: true,
      showNavigation: true,
      showHeader: true
    });

    $(".documentation-theme-minimalism").on("click", function() {
      tripMinimalismTheme.start();
    });
  });
});
