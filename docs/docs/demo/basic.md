> Reminder : please turn on your inspector first because we may put logs there if needed.

# Change position

<button class="demo-change-position step1 step2 step3 step4">Run this demo</button>

```javascript
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
```

Check its [documentation](../documentations/configuration.md#position) for more supported positions.

# Change theme

<button class="demo-change-theme step1 step2 step3 step4">Run this demo</button>

```javascript
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
```

Check its [documentation](../documentations/configuration.md#triptheme) for more supported themes.

# Scoll to top when finished

<button class="demo-scroll-to-top step1">Run this demo</button>

```javascript
var tripToScrollToTop = new Trip([
  { sel : $(".demo-scroll-to-top.step1"), content : "Let's fly ...", position : "e" }
], {
  backToTopWhenEnded : true,
  delay : 2000
});

$(".demo-scroll-to-top").on("click", function() {
  tripToScrollToTop.start();
});
```

Check its [documentation here](../documentations/configuration.md#backtotopwhenended).

# Show close box and navigation buttons

<button class="demo-show-navigation step1 step2">Run this demo</button>

```javascript
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
```

Check documentation about [showNavigation](../documentations/configuration.md#shownavigation) and [showCloseBox](../documentations/configuration.md#showclosebox)

** Note: ** When enabling `showNavigation`, sometimes it means that you don't need the countdown timer ! Users will mainly use navigation buttons to go next / previous. So don't forget to set `delay` to `-1` to disable it.

# Global options

> Please use inspector to check logs before starting this trip

<button class="demo-global-options step1 step2 step3">Run this demo</button>

```
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
```

Check its [documentation](../documentations/configuration.md#global-options) for more supported options;

**Note : ** There are tons of settings that you can tweak, please remember to check other missing settings.

# Local options

> Supported after 2.0.0+

> Please use inspector to check logs before starting this trip

<button class="demo-local-options step1 step2">Run this demo</button>

```javascript
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
```

Check its [documentation](../documentations/configuration.md#local-options) for more supported options;

**Note :** If local options exist, then global options will be suppressed by default !

# Highlight target

<button class="demo-highlight step1">Run this demo</button>

```
var tripToHighlight = new Trip([
  { sel : $(".demo-highlight.step1"), content : "Highlight this", expose : true }
], {
  delay : 3000
});

$(".demo-highlight").on("click", function() {
  tripToHighlight.start();
});
```

Check its [documentation here](../documentations/configuration.md#expose).

# Animation

> Powered by animate.css

<button class="demo-animation step1 step2 step3 step4 step5 step6 step7 step8">Run this demo</button>

```javascript
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
```

Check its [documentation and supported animations here](../documentations/configuration.md#animation).
