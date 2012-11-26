(function(window, $) {

    var Trip = function( tripData, userOptions ) {

        // save the settings
        this.settings = $.extend({

            tripIndex : 0,
            onTripStart : $.noop,
            onTripEnd : $.noop,
            backToTopWhenEnded : false,
            overlayZindex : 99999

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
    };

    Trip.prototype = {

        // TODO: implement expose
        showExpose : function( $sel ) {

            this.hasExpose = true;

            var oldCSS, newCSS;

            oldCSS = {
                position : $sel.css('position'),
                zIndex : $sel.css('z-Index')
            };

            newCSS = {
                position : 'relative',
                zIndex : this.settings.overlayZindex + 1 // we have to make it higher than the overlay
            };

            $sel.data('tour-old-css', oldCSS)
                .css(newCSS)
                .addClass('trip-exposed');

            this.$overlay.show();
        },

        // TODO: implement expose
        hideExpose : function() {
            this.hasExpose = false;

            var $exposedSel = $('.trip-exposed'),
                oldCSS = $exposedSel.data('tour-old-css');

            $exposedSel.css( oldCSS )
                       .removeClass('trip-exposed');

            this.$overlay.hide();
        },

        bindKeyEvent : function() {
            var that = this;
            $(document).on({
                'keydown.Trip' : function(e) {
                    // `this` will be bound to #document DOM element here
                    that.keyEvent.call(that, e); 
                }
            });
        },

        unbindKeyEvent : function() {
            $(document).off('.Trip');
        },

        keyEvent : function(e) {
            switch(e.which) {
            case 27 : // esc
                this.stop();
                break;
            case 37 : // left arrow
            case 38 : // up arrow

                // if ( this.isFirst() ) {
                //     // If we hit first here, then it means do nothing
                // }
                // else {
                //     this.decreaseIndex();
                //     this.prev();
                // }
                break;
            case 39 : // right arrow
            case 40 : // down arrow

                if ( this.isLast() ){
                    // If we hit last here, then it means the user forces to exit the trip
                    this.doLastOperation();
                }
                else {
                    this.increaseIndex();
                    this.run();
                }

                break;
            }
        },

        // If the user forces to stop the timer, we won't do any further actions instead
        stop : function() {

            // clear timer
            clearTimeout( this.timer );

            this.tripIndex = 0;
            this.hideTripBlock();
        },

        next : function(o) {

            // preprocess when we have to show trip block
            clearTimeout( this.timer );
            
            if ( this.hasExpose ) {
                this.hideExpose();
            }

            if ( this.progressing ) {
                this.hideProgressBar();
            }

            // show block
            this.checkTripData(o);
            this.setTripBlock(o);
            this.showTripBlock(o);

            if ( o.expose ) {
                this.showExpose( o.sel );
            }
        },

        // TODO: add prev later
        prev : function(o) {
            // show block
        
            // set timer to show prev
            //
            // this.decreaseIndex();
        },

        doLastOperation : function() {

            clearTimeout( this.timer );

            this.unbindKeyEvent();
            this.hideTripBlock();

            if ( this.hasExpose ) {
                this.hideExpose();
            }

            this.settings.onTripEnd();
            
            if ( this.settings.backToTopWhenEnded ) {
                this.$root.animate({ scrollTop : 0 }, 'slow');
            }

            return false;
        },

        showProgressBar : function( delay ) {

            var that = this;
            
            // doing the progress effect
            this.progressing = true;

            this.$bar.animate({
                width : '100%'  
            }, delay, "linear", function() {
                that.$bar.width(0);
            });
        },

        hideProgressBar : function() {

            // not doing the progress effect
            this.progressing = false;

            this.$bar.width(0);
            this.$bar.stop(true);
        },

        run : function() {

            var that = this,
                o = this.getCurrentTripObject(),
                delay = o.delay || 1000;

            // next to o
            this.next(o);

            // show the progress bar
            this.showProgressBar( delay );

            // set timer to show next
            this.timer = setTimeout(function() {

                if ( that.isLast() ) {
                    that.doLastOperation();
                }
                else {
                    // increase the index after delay to make sure we can pause on this block
                    that.increaseIndex();
                    that.run();
                }

            // delay when the object has delay attribute or delay 1000 ms 
            }, delay);
        },

        isFirst : function() {
            return ( this.tripIndex === 0 ) ? true : false;
        },

        isLast : function() {
            return ( this.tripIndex === this.tripData.length - 1 ) ? true : false;
        },

        increaseIndex : function() {
            // TODO : how about hitting the last item ?
            if ( this.tripIndex >= this.tripData.length - 1 ) {

            }
            else {
                this.tripIndex += 1;
            }
        },

        decreaseIndex : function() {
            // TODO : how about hitting the first item ?
            if ( this.tripIndex <= 0 ) {

            }
            else {
                this.tripIndex -= 1;
            }
        },

        getCurrentTripIndex : function() {
            return this.tripIndex;
        },

        getCurrentTripObject : function() {
            return this.tripData[ this.getCurrentTripIndex() ];
        },

        checkTripData : function( o ) {
            //    { sel : $('#abc'), position : 'n', content : 'This is a highlight', },
            //    { sel : $('#def'), position : 'e', content : 'xxxx' },
            //
            if ( typeof o.sel === 'undefined' ||
                    typeof o.content === 'undefined' ) {
                        //typeof o.position === 'undefined' ||

                console.warn("Your tripData is not valid in obj :" + o +".");
                return false;
            }
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
                    top : $sel.offset().top + arrowHeight + blockHeight
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

        create : function() {

            // use Trip.js at the first time
            if ( !this.$tripBlock ) {
                this.createTripBlock();
                this.createOverlay();
            }
        },

        createTripBlock : function() {

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

            this.$tripBlock = $tripBlock;
        },

        createOverlay : function() {

            var $overlay = $('<div class="trip-overlay"></div>');

            $overlay.height( $(document).height() );

            $('body').append( $overlay );
        },

        init : function() {
            this.bindKeyEvent();

            // set refs
            this.$bar = $('.trip-progress-bar');
            this.$overlay = $('.trip-overlay');
            this.$tripArrow = $('.trip-arrow');
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

    // Example : 
    //
    // Trip([
    //    { sel : $('#abc'), position : 'n', content : 'This is a highlight', expose : true },
    //    { sel : $('#def'), position : 'e', content : 'xxxx' },
    // ], {
    //     onTripStart : $.noop,
    //     onTripEnd : $.noop,
    // });
    //

    // Expose to window
    window.Trip = Trip;

}(window, jQuery));
