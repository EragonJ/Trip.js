Trip.js
=======

Trip.js is a useful plugin that can help you customize a tutorial trip easily. ( Based on jQuery )

Version
=======

1.0.2

Install
=====

Clone the latest version from Github directly

* `git clone git://github.com/EragonJ/Trip.js.git`

Or Install from Bower

* `bower install trip.js`

Setup (minimal)
===============

* include jQuery
* include Trip.css
* include Trip.js
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

### onTripStart
You can set a callback function triggered when the trip starts

* Type: *function*
* Default: `$.noop`

### onTripEnd
You can set a callback function triggered when the trip ends

* Type: *function*
* Default: `$.noop`

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

### delayPeriod
Every trip will be delayed for 1 second (1000 ms) by default

* Type: *number*
* Default: `1000`

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

* Type: *Number*
* Default: `1000` (ms)

### callback
You can do whatever you want to do after this step passed. BTW, Trip.js will assign the current `tripIndex` (start from 0) as the first parameter back to your callback function for later use.

* Type: *Function*
* Default: `$.noop`


Key Binding
===========

Trip.js would detect following keys to do relative actions after loading it.

* Right and Down arrows  - Go to next trip
* Left and Up arrows     - Go back to previous trip
* Space                  - pause / resume trip
* Esc                    - Stop trip

API
===

* trip.start() - start your trip
* trip.stop()  - stop your trip
* trip.pause() - pause / resume your trip
* trip.next()  - jump to next step
* trip.prev()  - jump back to previous step

TODO
====

* [ ] Bypass !tripDataOk step
* [ ] Add different Trip themes
* [ ] Make new direction images with new themes

Author
======
EragonJ ( eragonj@eragonj.me )

License
=======
MIT
