Trip.js
=======

Trip.js is a useful plugin that can help you customize a tutorial trip easily. ( Based on jQuery )

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


Options
=======

### tripIndex
You can set tripIndex ( start from 0 ) to specific trip block at start.

* Type: *number*
* Default: `0`

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

### delayPeriod
every trip will be lived for 1 second (1000 ms) by default

* Type: *number*
* Default: `1000`

Key Binding
===========

Trip.js would detect following keys to do relative actions after loading it.

* Right and Down arrows  - Go to next trip
* Left and Up arrows     - Go back to previous trip
* Space                  - pause / resume trip
* Esc                    - Stop trip

API
===

* trip.start()   - start your trip
* trip.stop()    - stop your trip
* trip.pause()   - pause / resume your trip

TODO
====

* [ ] Add different Trip themes
* [ ] Make new direction images with new themes
* [x] Add Compress source code

Author
======
EragonJ ( eragonj@eragonj.me )

License
=======
MIT
