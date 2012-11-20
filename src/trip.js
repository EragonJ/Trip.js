(function(window, $) {

    var Trip = function( tripData, userOptions ) {

        // save the trip data
        this.tripData = tripData;

        // used SELs
        this.$tripBlock = null;
        this.$overlay = null;
        this.$bar = null;
        this.$root = $('body, html');

        // save the current trip index
        this.tripIndex = 0;
        this.timer = null;
        this.progressing = false;

        // about expose
        this.hasExpose = false;

        // save the options
        this.options = $.extend({
            onTripStart : $.noop,
            onTripEnd : $.noop,
            backToTopWhenEnded : false,
            overlayZindex : 99999
        }, userOptions);
    };

    Trip.prototype = {

        // TODO: implement expose
        showExpose : function( $sel ) {

            var oldCSS, newCSS;

            this.hasExpose = true;

            oldCSS = {
                position : $sel.css('position'),
                zIndex : $sel.css('z-Index')
            };

            newCSS = {
                position : 'relative',
                zIndex : this.options.overlayZindex + 1 // we have to make it higher than the overlay
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
                //this.prev();
                break;
            case 39 : // right arrow
            case 40 : // down arrow

                // If we hit last here, then it means the user forces to exit the trip
                if ( this.isLast() ){
                    this.doLastOperation();
                }
                else {
                    this.increaseIndex();
                    this.run();
                }

                break;
            }
        },

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
            this.showTripBlock();

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
            this.hideExpose();
            this.options.onTripEnd();
            
            if ( this.options.backToTopWhenEnded ) {
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
                    typeof o.position === 'undefined' ||
                        typeof o.content === 'undefined' ) {
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
                arrowHeight = 10;

            // THis is for gravity n only, change this later
            this.$tripBlock.css({
                left : $sel.offset().left + ((selWidth - blockWidth) / 2),
                top : $sel.offset().top - arrowHeight - blockHeight
            });
        },

        showTripBlock : function() {

            this.$tripBlock.css({
                display : 'inline-block',
                zIndex : this.options.overlayZindex + 1 // we have to make it higher than the overlay
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
        },

        start : function() {
            // onTripStart callback
            this.options.onTripStart();

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
