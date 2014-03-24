# Trip.js

![Trip.js](https://raw.github.com/EragonJ/Trip.js/master/public/img/logo-tiny.png "Trip.js")

Trip.js is a jQuery plugin that can help you customize a tutorial trip easily with more flexibilities. Right now Trip.js support lots of useful stuffs like **keyboard binding**, **animations**, **changing themes** ... etc. If you want to highly customize your own tutorial trip, then Trip.js is definitely worth to give it a try !

# Build Status

[![Build Status](https://travis-ci.org/EragonJ/Trip.js.png?branch=master)](https://travis-ci.org/EragonJ/Trip.js)

# Version

1.3.0

# Install

Clone the latest version from Github directly

* `git clone git://github.com/EragonJ/Trip.js.git`

Or Install from Bower

* `bower install trip.js`

# Setup (minimal)

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

# How to Contribute

If you want to build your own Trip.js, you can check `Gruntfile.js` for details.

All you have to do is to clone the whole repository and do `npm install` to install all necessary modules !

If you are willing to contribute any commit for Trip.js, please follow the rule below : 

1. Create an issue talking about your change and let's discuss here.
2. Assign yourself as assignee.
3. fork Trip.js.
4. put your changes into a commit !
5. press `grunt build` to build all necessary files. Notes: You need to install compass (I am sorry because it is ruby based), node and npm first, and don't forget to press `npm install` to install all needed building tools so that grunt can recognize it and help you minify js, compile jade and SCSS.
6. send a pull request to Trip.js and make sure put `fix #xxx` in your commit title.
7. make sure Travis is green and ping me :D

Although the rule is not forced to follow, it would be helpful for me to review code to make sure there is nothing missing and make the code base consistent. 

Thanks for all your participations !!! 

## How to run Tests

`grunt test` (this will run all qunit tests)

## How to build

`grunt build` (this will do `uglify`, `sass`, `jade` at the same time)

# Global Options

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

### enableAnimation 
You can enable animations on tripBlock.

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

### animation
Animation that would be applied on the tripBlock.

* Type: *String*
* Default: `tada`

### tripBlockHTML
Base HTML for tripBlock

* Type: *Array*
* Default: An array contains base HTML of tripBlock

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

### onTripPause(tripIndex, tripObject)
You can set a callback function triggered when the Trip.js pauses. tripObject is your passed JSON for this current trip, and tripIndex is the current step index when the trip was paused. You can add your customized functions in your object and call them when Trip.js is paused.

* Type: *function*
* Default: `$.noop`

### onTripChange(tripIndex, tripObject)
You can set a callback function triggered when Trip.js changes to another step. tripObject is your passed JSON for this current trip, so you can add your customized functions in your object and call the function when Trip.js changes to this step.

* Type: *function*
* Default: `$.noop`

### onTripClose(tripIndex)
You can do whatever you want when users click on the close button on the top-right icon. In your callback, you will get current tripIndex as first parameter and you can use that index to do following things.

* Type: *function*
* Default: `$.noop`

# Local Options

You can setup specific options for each step.

### sel
Which selector is referenced in this step.

* Type: *jQuery Object*
* no default

### content *Required*
What information that you want to show to users.

* Type: *String*
* no default

### position 
What position would you prefer for the tripBlock. We support 9 different positions : e, w, n, s, screen-ne, screen-se, screen-sw, screen-nw, screen-center. To be clear, *e*, *w*, *n*, *s* are related to the sel, so for this use case, sel is *required*. For *screen-ne*, *screen-se*, *screen-sw*, *screen-nw* and *screen-center* are related to the screen (fixed in CSS), so in this case, you don't have to put sel.

* Type: *String*
* Default: `n` ( You can use e, w, n, s, screen-ne, screen-se, screen-sw, screen-nw, screen-center 9 positions )

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

### animation
Animation that would be applied on the tripBlock. if ignored, global value would be used.

* Type: *String*
* Default: `tada`

# Key Binding

Trip.js would detect following keys to do relative actions after loading it.

* Right and Down arrows  - Go to next trip
* Left and Up arrows     - Go back to previous trip
* Space                  - pause / resume trip
* Esc                    - Stop trip

# API

* trip.start()  - start your trip
* trip.stop()   - stop your trip
* trip.pause()  - pause / resume your trip ( same as trip.resume() )
* trip.resume() - pause / resume your trip ( same as trip.pasue()  )
* trip.next()   - jump to next step
* trip.prev()   - jump back to previous step

# TODO

* Add data-x to define steps ( make the setup easier )
* Add UI for pause/play/stop to make users know how to interact
* Don't depend on jQuery

# Author
EragonJ ( eragonj@eragonj.me )

# License
MIT
