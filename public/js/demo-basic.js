$(document).ready(function() {

  /*
   * basic-demo-1
   */
  var trip1 = new Trip([
    { sel : $('.demo-basic-1.step1'), content : 'North', position : 'n' },
    { sel : $('.demo-basic-1.step2'), content : 'East',  position : 'e' },
    { sel : $('.demo-basic-1.step3'), content : 'South', position : 's' },
    { sel : $('.demo-basic-1.step4'), content : 'West',  position : 'w' }
  ], {

  });

  $('.start-demo-basic-1').on('click', function() {
    trip1.start();
  });

  /*
   * basic-demo-2-1
   */
  var trip2_1 = new Trip([
    { sel : $('.demo-basic-2.step1'), content : 'North', position : 'n' },
    { sel : $('.demo-basic-2.step2'), content : 'East',  position : 'e' },
    { sel : $('.demo-basic-2.step3'), content : 'South', position : 's' },
    { sel : $('.demo-basic-2.step4'), content : 'West',  position : 'w' }
  ], {
    tripTheme : 'white',
    onStart : function() {
      $('body').css({ 'background-color' : '#eee' });
    },
    onEnd : function() {
      $('body').css({ 'background-color' : '#fff' });
    }
  });

  $('.start-demo-basic-2-1').on('click', function() {
    trip2_1.start();
  });

  /**
   * basic-demo-2-2
   */
  var trip2_2 = new Trip([
    { sel : $('.demo-basic-2.step1'), content : 'This is Yeti!', position : 'n' },
    { sel : $('.demo-basic-2.step2'), content : 'This is Yeti!', position : 'e' },
    { sel : $('.demo-basic-2.step3'), content : 'This is Yeti!', position : 's' },
    { sel : $('.demo-basic-2.step4'), content : 'This is Yeti!', position : 'w' }
  ], {
    showHeader: true,
    tripTheme : 'yeti'
  });

  $('.start-demo-basic-2-2').on('click', function() {
    trip2_2.start();
  });

  /**
   * basic-demo-2-3
   */
  var trip2_3 = new Trip([
    { sel : $('.demo-basic-2.step1'), content : 'This is Dark!', position : 'n' },
    { sel : $('.demo-basic-2.step2'), content : 'This is Dark!', position : 'e' },
    { sel : $('.demo-basic-2.step3'), content : 'This is Dark!', position : 's' },
    { sel : $('.demo-basic-2.step4'), content : 'This is Dark!', position : 'w' }
  ], {
    showHeader: true,
    tripTheme : 'dark'
  });

  $('.start-demo-basic-2-3').on('click', function() {
    trip2_3.start();
  });

  /*
   * basic-demo-3
   */
  var trip3 = new Trip([
    { sel : $('.demo-basic-3.step1'), content : 'Let\'s fly ...', position : 'e' }
  ], {
    backToTopWhenEnded : true,
    delay : 3000
  });

  $('.start-demo-basic-3').on('click', function() {
    trip3.start();
  });

  /*
   * basic-demo-4
   */
  var trip4 = new Trip([
    { sel : $('.demo-basic-4.step1'), content : 'Hola!', position : 'n' },
    { sel : $('.demo-basic-4.step2'), content : 'Adios!', position : 's' }
  ], {
    showNavigation : true,
    showCloseBox : true,
    delay : -1
  });

  $('.start-demo-basic-4').on('click', function() {
    trip4.start();
  });

  /*
   * basic-demo-5
   */
  var trip5 = new Trip([
    { sel : $('.demo-basic-5.step1'), content : 'Hi', position : 'n' },
    { sel : $('.demo-basic-5.step2'), content : 'Press ESC to stop this step !', position : 's', delay : 3000, myFunction : function() { return 'this is user\'s function'; } },
    { sel : $('.demo-basic-5.step3'), content : 'Click the close icon to see what\'s going on in your console log', delay: -1, showCloseBox: true }
  ], {
    onStart : function() {
      console.log('onStart');
    },
    onEnd : function() {
      console.log('onEnd');
    },
    onTripStop : function() {
      console.log('onTripStop');
    },
    onTripChange : function(i, tripData) {
      if ( i === 1 ) {
        console.log("You can put your own function or data in tripData andaccess it onTripChange !");
        console.log('current tripIndex : ' + i);
        console.log('current tripData : ', tripData);
        console.log('User\'s function : ' + tripData.myFunction());
      }
    },
    onTripClose: function(i) {
      console.log('You close the trip at index : ', i);
    }
  });

  $('.start-demo-basic-5').on('click', function() {
    trip5.start();
  });

  /*
   * basic-demo-6
   */
  var trip6 = new Trip([
    {
      sel: $('.demo-basic-6.step1'),
      content: 'onTripStart will be called when entering this trip',
      onTripStart: function(tripIndex) {
        console.log('onTripStart : ', tripIndex);
      },
      onTripEnd: function(tripIndex) {
        console.log('onTripEnd : ', tripIndex);
      }
    },
    {
      sel: $('.demo-basic-6.step2'),
      content: 'We will use global onTripStart if there is no local one',
      onTripEnd: function(tripIndex) {
        console.log('onTripEnd : ', tripIndex);
      }
    }
  ], {
    onTripStart: function(tripIndex) {
      console.log('default onTripStart : ', tripIndex);
    }
  });

  $('.start-demo-basic-6').on('click', function() {
    trip6.start();
  });

  /*
   * basic-demo-7
   */
  var trip7 = new Trip([
    { sel : $(".demo-basic-7.step1"), content : "Highlight this", expose : true },
    { sel : $(".demo-basic-7.step2"), content : "Highlight multiple elements with selector or jQuery object", expose : '.demo-basic-7.step1, .start-demo-basic-7' },
    { sel : $(".demo-basic-7.step3"), content : "No highlight" },
    { sel : $(".demo-basic-7.step4"), content : "Highlight that", expose : true }
  ], {
    delay : 3000
  });

  $('.start-demo-basic-7').on('click', function() {
    trip7.start();
  });

  /*
   * basic-demo-8
   */
  var trip8 = new Trip([
    { sel : $('.demo-basic-8.step1'), content : 'hi'},
    { sel : $('.demo-basic-8.step2'), content : 'hi', animation: 'bounce'},
    { sel : $('.demo-basic-8.step3'), content : 'hi', animation: 'shake'},
    { sel : $('.demo-basic-8.step4'), content : 'hi', animation: 'fadeIn'},
    { sel : $('.demo-basic-8.step5'), content : 'hi', animation: 'fadeInUp'},
    { sel : $('.demo-basic-8.step6'), content : 'hi', animation: 'fadeInDown'},
    { sel : $('.demo-basic-8.step7'), content : 'hi', animation: 'fadeInLeft'},
    { sel : $('.demo-basic-8.step8'), content : 'hi', animation: 'rotateInUpRight'}
  ], {
    delay : 1000,
    animation: 'tada'
  });

  $('.start-demo-basic-8').on('click', function() {
    trip8.start();
  });
});
