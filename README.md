Trip.js
=======

![Trip.js](https://raw.github.com/EragonJ/Trip.js/master/public/img/logo-tiny.png "Trip.js")

Trip.js is a plugin that can help you customize a tutorial trip easily with more flexibilities. ( Based on jQuery )

Version
=======

1.2.3

Install
=====

Clone the latest version from Github directly

* `git clone git://github.com/EragonJ/Trip.js.git`

Or Install from Bower

* `bower install trip.js`

How to Contribute
=====

If you want to build your own trip.js, you can check `Makefile` for details.

Trip.js uses `uglifyjs(to minify)`, `scss(+compass)` and `jade(for introduction page)` to build final related scripts.

If you are willing to contribute any commit for Trip.js, please use mentioned tools above to finish the whole build process to make the codebase consistent. 

Thanks ! 

Setup (minimal)
===============

* include jQuery
* include trip.min.css
* include trip.min.js
* setup trip codes shown below

        var trip = new Trip([
            { 
                sel : $('#element1'),
                content : 'This is element 1'
            },
            {
                sel : $('#element2'),
                content : 'This is element 2'
            }
        ], options); // details about options are listed below


Global Options
==============

You can setup global options for the whole trip.

### tripIndex
You can set tripIndex ( start from 0 ) to specific trip block at start.

* Type: *number*
* Default: `0`

### tripTheme
You can set which theme to use, now have white and black two themes.

* Type: *String*
* Default: `black`

### backToTopWhenEnded
You can ask Trip.js go back to top when ended 

* Type: *boolean*
* Default: `false`

### overlayZindex 
You can set the basic zIndex for overlay if you want to expose elements

* Type: *number*
* Default: `99999`

### enableKeyBinding 
You can decide to bind key events for trip navigations or not.

* Type: *boolean*
* Default: `true`

### showCloseBox
You can decide to add small close icon on each trip or not

* Type: *boolean*
* Default: `false`

### skipUndefinedTrip 
You can enable this option to tell Trip.js skip undefined trips ( Undefined trips mean the trips without content or without sel or can not be selected by jQuery ). 

* Type: *boolean*
* Default: `false`

### delay
Every trip will be delayed for 1 second (1000 ms) by default.
Setting to a `-1` will prevent auto-advancing. You must manually call `trip.next()`.

* Type: *number*
* Default: `1000`

### showNavigation
Toggle navigation buttons.

* Type: *boolean*
* Default: `false`

### prevLabel
Label for the previous button.

* Type: *String*
* Default: `Back`

### nextLabel
Label for the next button.

* Type: *String*
* Default: `Next`

### finishLabel
Label for the finish button.

* Type: *String*
* Default: `Dismiss`

### canGoPrev
Determines if the user can go backwards. If set to a function it is called and the response is evaluated.

* Type: *function* or *boolean*
* Default: `true`

### canGoNext
Determines if the user can go forward. If set to a function it is called and the response is evaluated.

* Type: *function* or *boolean*
* Default: `true`

### onTripStart
You can set a callback function triggered when the trip starts

* Type: *function*
* Default: `$.noop`

### onTripEnd
You can set a callback function triggered when the trip ends

* Type: *function*
* Default: `$.noop`

### onTripStop
You can set a callback function triggered when Trip.js stops.

* Type: *function*
* Default: `$.noop`

### onTripChange(tripIndex, tripObject)
You can set a callback function triggered when Trip.js changes to another step. tripObject is your passed JSON for this current trip, so you can add your customized functions in your object and call the function when Trip.js changes to this step.

* Type: *function*
* Default: `$.noop`

Local Options
=============

You can setup specific options for each step.

### sel *Required*
Which selector is referenced in this step.

* Type: *jQuery Object*
* no default

### content *Required*
What information that you want to show to users.

* Type: *String*
* no default

### position 
What position would you prefer for the tripBlock.

* Type: *String*
* Default: `n` ( You can use e, w, n, s four positions )

### delay
You can delay longer / shoter for this step. You can assign `delay` in global options to change the default delay.
Setting to a `-1` will prevent auto-advancing. You must manually call `trip.next()`.

* Type: *Number*
* Default: `1000` (ms)

### callback
You can do whatever you want to do after this step passed. BTW, Trip.js will assign the current `tripIndex` (start from 0) as the first parameter back to your callback function for later use.

* Type: *Function*
* Default: `$.noop`

### expose
You can enable this option to expose your selected element in this trip.

* Type: *boolean*
* Default: `false`

### showNavigation
Toggle navigation buttons.

* Type: *boolean*
* Default: `false`

### showCloseBox
You can decide to add small close icon on each trip or not

* Type: *boolean*
* Default: `false`

### prevLabel
Label for the previous button.

* Type: *String*
* Default: `Back`

### nextLabel
Label for the next button.

* Type: *String*
* Default: `Next`

### finishLabel
Label for the finish button.

* Type: *String*
* Default: `Dismiss`

### canGoPrev
Determines if the user can go backwards. If set to a function it is called and the
response is evaluated.

* Type: *Boolean|Function*
* Default: `true`

### canGoNext
Determines if the user can go forward. If set to a function it is called and the response is evaluated.

* Type: *Boolean|Function*
* Default: `true`


Key Binding
===========

Trip.js would detect following keys to do relative actions after loading it.

* Right and Down arrows  - Go to next trip
* Left and Up arrows     - Go back to previous trip
* Space                  - pause / resume trip
* Esc                    - Stop trip

API
===

* trip.start()  - start your trip
* trip.stop()   - stop your trip
* trip.pause()  - pause / resume your trip ( same as trip.resume() )
* trip.resume() - pause / resume your trip ( same as trip.pasue()  )
* trip.next()   - jump to next step
* trip.prev()   - jump back to previous step

TODO
====

* Add data-x to define steps ( make the setup easier )
* Add UI for pause/play/stop to make users know how to interact
* Don't depend on jQuery

Author
======
EragonJ ( eragonj@eragonj.me )

License
=======
MIT
