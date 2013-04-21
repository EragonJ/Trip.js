/*
 *  Trip.js - A jQuery plugin that can help you customize your tutorial trip easily
 *  Version : 1.0.1
 *
 *  Author : EragonJ <eragonj@eragonj.me> 
 *  Blog : http://eragonj.me
 */
(function(window, $) {

    var Trip = function( tripData, userOptions ) {

        // save the settings
        this.settings = $.extend({

            // basic config
            tripIndex : 0,
            backToTopWhenEnded : false,
            overlayZindex : 99999,
            delay : 1000,
            enableKeyBinding : true,

            // callbacks
            onTripStart : $.noop,
            onTripEnd : $.noop,
            onTripStop : $.noop,

        }, userOptions);

        // save the trip data
        this.tripData = tripData;

        // used SELs
        this.$tripBlock = null;
        this.$tripArrow = null;
        this.$overlay = null;
        this.$bar = null;
        this.$root = $('body, html');

        // save the current trip index
        this.tripIndex = this.settings.tripIndex;
        this.timer = null;
        this.progressing = false;

        // about expose
        this.hasExpose = false;

        // contants
        this.CONSTANTS = {
            LEFT_ARROW : 37,
            UP_ARROW : 38,
            RIGHT_ARROW : 39,
            DOWN_ARROW : 40,
            ESC : 27,
            SPACE : 32
        };

        this.console = window.console || {};
    };

    Trip.prototype = {

        preInit : function() {

            // override console object for IE
            if ( typeof this.console === "undefined" ) {

                var self = this,
                    methods = ['log', 'warn', 'debug', 'info', 'error'];

                $.each(methods, function(i, methodName) {
                    self.console[methodName] = $.noop;
                });
            }
        },

        // TODO: implement expose
        showExpose : function( $sel ) {

            this.hasExpose = true;

            var oldCSS, 
                newCSS;

            oldCSS = {
                position : $sel.css('position'),
                zIndex : $sel.css('z-Index')
            };

            newCSS = {
                position : 'relative',
                zIndex : this.settings.overlayZindex + 1 // we have to make it higher than the overlay
            };

            $sel.data('trip-old-css', oldCSS)
                .css(newCSS)
                .addClass('trip-exposed');

            this.$overlay.show();
        },

        // TODO: implement expose
        hideExpose : function() {
            this.hasExpose = false;

            var $exposedSel = $('.trip-exposed'),
                oldCSS = $exposedSel.data('trip-old-css');

            $exposedSel.css( oldCSS )
                       .removeClass('trip-exposed');

            this.$overlay.hide();
        },

        bindKeyEvents : function() {
            var that = this;
            $(document).on({
                'keydown.Trip' : function(e) {
                    // `this` will be bound to #document DOM element here
                    that.keyEvent.call(that, e); 
                }
            });
        },

        unbindKeyEvents : function() {
            $(document).off('keydown.Trip');
        },

        keyEvent : function(e) {

            switch(e.which) {
            case this.CONSTANTS['ESC'] :

                this.stop();
                break;

            case this.CONSTANTS['SPACE'] : 

                // space will make the page jump
                e.preventDefault();
                this.pause();
                break;

            case this.CONSTANTS['LEFT_ARROW'] :
            case this.CONSTANTS['UP_ARROW'] :

                this.prev();
                break;

            case this.CONSTANTS['RIGHT_ARROW'] : 
            case this.CONSTANTS['DOWN_ARROW'] : 

                this.next();
                break;
            }
        },

        stop : function() {

            this.timer.stop();

            if ( this.hasExpose ) {
                this.hideExpose();
            }

            this.tripIndex = this.settings.tripIndex;
            this.hideTripBlock();

            // exec cb
            this.settings.onTripStop();
        },

        pause : function() {

            if ( this.progressing ) {
                this.timer.pause();
                this.pauseProgressBar();
            }
            else {
                var remainingTime = this.timer.resume();
                this.resumeProgressBar( remainingTime );
            }
            
            this.progressing = !this.progressing;
        },

        next : function() {
            if ( this.isLast() ){
                this.doLastOperation();
            }
            else {
                this.increaseIndex();
                this.run();
            }
        },

        prev : function() {
            if ( this.isFirst() ) {
                // do nothing
            }
            else {
                this.decreaseIndex();
                this.run();
            }
        },

        // XXX:
        // Because the trip index is controlled by increaseIndex / decreaseIndex methods only, 
        // `showCurrentTrip` doesn't have to take care about which is the current trip object, 
        // it just does the necessary operations according to the passed tripData `o`
        showCurrentTrip : function(o) {

            // Allow sel element to be a string selector
            // in case you want to create a TripObject that
            // handles an element that doesn't exist yet when you create
            // this Trip.
            if(typeof o.sel === 'string') {
                o.sel = $(o.sel);
            }

            // preprocess when we have to show trip block
            if ( this.timer ) {
                this.timer.stop();
            }
            
            if ( this.hasExpose ) {
                this.hideExpose();
            }

            if ( this.progressing ) {

                this.hideProgressBar();

                // not doing the progress effect
                this.progressing = false;
            }

            // show block
            var tripDataOk = this.checkTripData(o);
            if(tripDataOk) {
                this.setTripBlock(o);
                this.showTripBlock(o);

                if ( o.expose ) {
                    this.showExpose( o.sel );
                }
            }
        },

        doLastOperation : function() {
            
            this.timer.stop();

            if ( this.settings.enableKeyBinding ) {
                this.unbindKeyEvents();
            }

            this.hideTripBlock();

            if ( this.hasExpose ) {
                this.hideExpose();
            }
            
            if ( this.settings.backToTopWhenEnded ) {
                this.$root.animate({ scrollTop : 0 }, 'slow');
            }

            this.tripIndex = this.settings.tripIndex;
            this.settings.onTripEnd();

            return false;
        },

        showProgressBar : function( delay ) {
            var that = this;

            this.$bar.animate({
                width : '100%'  
            }, delay, "linear", function() {
                that.$bar.width(0);
            });
        },

        hideProgressBar : function() {
            this.$bar.width(0);
            this.$bar.stop(true);
        },

        pauseProgressBar : function() {
            this.$bar.stop(true);
        },

        resumeProgressBar : function( remainingTime ) {
            this.showProgressBar( remainingTime );
        },

        run : function() {

            var that = this,
                tripObject = this.getCurrentTripObject(),
                delay = tripObject.delay || this.settings.delay;

            // next to o
            this.showCurrentTrip( tripObject );

            // show the progress bar
            this.showProgressBar( delay );
            this.progressing = true;

            // set timer to show next
            this.timer = new Timer(function() {

                // XXX
                // If we get here, it means that we have finished a step within a trip.

                if ( that.hasCallback() ) {
                    tripObject.callback( that.tripIndex );
                }

                that.next();

            }, delay);
        },

        isFirst : function() {
            return ( this.tripIndex === 0 ) ? true : false;
        },

        isLast : function() {
            return ( this.tripIndex === this.tripData.length - 1 ) ? true : false;
        },

        hasCallback : function() {
            return (typeof this.tripData[ this.tripIndex ].callback !== "undefined");
        },

        increaseIndex : function() {
            // TODO :
            // how about hitting the last item ?
            if ( this.tripIndex >= this.tripData.length - 1 ) {
                // do nothing
            }
            else {
                this.tripIndex += 1;
            }
        },

        decreaseIndex : function() {
            // TODO : 
            // how about hitting the first item ?
            if ( this.tripIndex <= 0 ) {
                // do nothing
            }
            else {
                this.tripIndex -= 1;
            }
        },

        getCurrentTripObject : function() {
            return this.tripData[ this.tripIndex ];
        },

        checkTripData : function( o ) {
            /*
             *  Possible TripData properties
             *  {
             *      sel : $('#id'),
             *      content : 'This is a hint',
             *      position : 'n', // optional
             *  }
             */
            if ( typeof o.sel === 'undefined' ||
                    o.sel === null ||
                    o.sel.length === 0 ||
                    typeof o.content === 'undefined' ) {

                this.console.warn("Your tripData is not valid in obj :" + o +".");
                return false;
            }
            return true;        
        },

        setTripBlock : function( o ) {

            this.$tripBlock.find('.trip-content')
                               .html( o.content );

            var $sel = o.sel,
                selWidth = $sel.outerWidth(),
                selHeight = $sel.outerHeight(),
                blockWidth = this.$tripBlock.outerWidth(),
                blockHeight = this.$tripBlock.outerHeight(),
                arrowHeight = 10,
                arrowWidth = 10;

            // Take off e/s/w/n classes
            this.$tripArrow.removeClass('e s w n');

            switch( o.position ) {
            case 'e':
                this.$tripArrow.addClass('e');
                this.$tripBlock.css({
                    left : $sel.offset().left + selWidth + arrowWidth,
                    top : $sel.offset().top - (( blockHeight - selHeight ) / 2),
                });
                break;
            case 's':
                this.$tripArrow.addClass('s');
                this.$tripBlock.css({
                    left : $sel.offset().left + ((selWidth - blockWidth) / 2),
                    top : $sel.offset().top + selHeight + arrowHeight
                });
                break;
            case 'w':
                this.$tripArrow.addClass('w');
                this.$tripBlock.css({
                    left : $sel.offset().left - (arrowWidth + blockWidth),
                    top : $sel.offset().top - (( blockHeight - selHeight ) / 2)
                });
                break;
            case 'n':
            default: 

                this.$tripArrow.addClass('n');
                this.$tripBlock.css({
                    left : $sel.offset().left + ((selWidth - blockWidth) / 2),
                    top : $sel.offset().top - arrowHeight - blockHeight
                });

                break;
            }
        },

        showTripBlock : function( o ) {

            this.$tripBlock.css({
                display : 'inline-block',
                zIndex : this.settings.overlayZindex + 1 // we have to make it higher than the overlay
            });

            var top = this.$tripBlock.offset().top,
                OFFSET = 100; // make it look nice

            this.$root.animate({ scrollTop : top - OFFSET }, 'slow');
        },

        hideTripBlock : function() {
            this.$tripBlock.fadeOut('slow');
        },

        // TODO:
        // Make sure this method is only called ONCE in this page,
        // so that we will not create same DOMs more than once!
        create : function() {

            if ( !this.$tripBlock ) {
                this.createTripBlock();
                this.createOverlay();
            }
        },

        createTripBlock : function() {

            // make sure the element doesn't exist in the DOM tree
            if ( typeof $('.trip-block').get(0) === 'undefined' ) {

                var html = [
                    '<div class="trip-block">',
                        '<div class="trip-content"></div>',
                        '<div class="trip-progress-wrapper">',
                            '<div class="trip-progress-bar"></div>',
                        '</div>',
                        '<div class="trip-arrow"></div>',
                    '</div>'
                ].join('');

                var $tripBlock = $(html);  

                $('body').append( $tripBlock );
            }
        },

        createOverlay : function() {

            // make sure the element doesn't exist in the DOM tree
            if ( typeof $('.trip-overlay').get(0) === 'undefined' ) {

                var html = [
                    '<div class="trip-overlay">',
                    '</div>'
                ].join('');

                var $overlay = $(html);

                $overlay.height( $(document).height() );

                $('body').append( $overlay );
            }
        },

        init : function() {

            this.preInit();

            if ( this.settings.enableKeyBinding ) {
                this.bindKeyEvents();
            }

            // set refs
            this.$bar = $('.trip-progress-bar');
            this.$overlay = $('.trip-overlay');
            this.$tripArrow = $('.trip-arrow');
            this.$tripBlock = $('.trip-block');
        },

        start : function() {
            // onTripStart callback
            this.settings.onTripStart();

            // create some necessary DOM elements at the first time like jQuery UI
            this.create();

            // init some necessary stuffs like events, late DOM refs after creating DOMs
            this.init();

            // main entry
            this.run();
        }
    };

    // Expose to window
    window.Trip = Trip;


    /*
     *  3rd party libraries / toolkits
     *
     *  1) http://stackoverflow.com/questions/3969475/javascript-pause-settimeout
     */
    function Timer(e,t){var n,r,i=t;this.pause=function(){window.clearTimeout(n);i-=new Date-r};this.resume=function(){r=new Date;n=window.setTimeout(e,i);return i};this.stop=function(){window.clearTimeout(n)};this.resume()}

}(window, jQuery));
