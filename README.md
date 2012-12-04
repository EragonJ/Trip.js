Trip.js (Still in development)
==============================

Trip.js is a light-weight jQuery plugin that can customize a 'tutorial trip' easily. 

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

Author
======
EragonJ ( eragonj@eragonj.me )

License
=======
MIT
