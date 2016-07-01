$(document).ready(function() {
  var trip = new Trip([
    {
      sel : $('.demo-index.step1'),
      position : 's',
      content : 'A short story behind Trip.js',
      delay : 2000,
      onTripEnd : function(i) {
        console.log("step "+ i +" is finished");
      }
    },
    {
      sel : $('.demo-index.step2'),
      position : 'n',
      content : 'North',
      delay : 2000
    },
    {
      sel : $('.demo-index.step3'),
      position : 'e',
      content : 'East',
      delay : 2000
    },
    {
      sel : $('.demo-index.step4'),
      position : 'w',
      content : 'West',
      delay : 2000
    },
    {
      sel : $('.demo-index.step6'),
      position : 's',
      content : 'South',
      delay : 2000
    },
    {
      position : 'screen-ne',
      content : 'North east on the screen',
      delay : 1000
    },
    {
      position : 'screen-nw',
      content : 'North west on the screen',
      delay : 1000
    },
    {
      position : 'screen-sw',
      content : 'South west on the screen',
      delay : 1000
    },
    {
      position : 'screen-se',
      content : 'South east on the screen',
      delay : 1000
    },
    {
      position : 'screen-center',
      content : 'Center on the screen',
      delay : 1000
    },
    {
      sel : $('.demo-index.step6'),
      content : 'You can pass only if you agree !',
      delay : 2000,
      canGoNext: function() {
        return confirm('You can pass only if you agree !');
      }
    },
    {
      sel : $('.demo-index.step6'),
      content : 'You can\'t proceed until you click next',
      delay : -1,
      showNavigation: true
    },
    {
      sel : $('.demo-index.step7'),
      content : 'You can stop the tour by hitting Esc or clicking the close box',
      delay : -1,
      showNavigation: true,
      showCloseBox: true
    },
    {
      sel : $('.demo-index.step8'),
      position : 'n',
      content : 'You can also highlight any important news for your users',
      expose : true,
      delay : 7000
    }
  ], {
    tripTheme : "dark",
    animation: "fadeIn",
    onStart : function() {
      console.log("onStart");
    },
    onEnd : function() {
      console.log("onEnd");
    },
    onTripStop : function() {
      console.log("onTripStop");
    },
    onTripChange : function(index, tripBlock) {
      console.log("onTripChange");
    },
    backToTopWhenEnded : true,
    delay : 2000
  });

  $(".start-demo-index").click(function() {
    trip.start();
  });

  window.trip = trip;
});
