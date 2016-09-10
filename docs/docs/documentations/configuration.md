# Configuration

In Trip.js, we provide three three kind of options for developers to customize their own trips.

1. Global options - Change the default behavior of Trip.js and would influence all trips.
2. Local options - Only change the behavior of specifc trip and won't influence the others.
3. Parser options - There are small subsets of options that you can define in HTML if you are using parser mode.

**Note: Parser options was supported since 3.0.0+**

## Global options

### tripIndex

You can set tripIndex ( start from 0 ) to specific trip block at start.

+ Type : `Number`
+ Default : `0`

### tripTheme

You can set which theme to use, now Trip.js support **white**, **black**, **yeti** and **dark** and **minimalism** 5 themes.

+ Type : `String`
+ Default :`'black'`
+ **Note : `minimalism` theme was supported since 3.2.1+**

### tripClass

You can add custom class to Trip.js so that you can easily tweak something based on that classname in your CSS.

+ Type : `String`
+ Default :`''`
+ **Note : supported since 3.2.1+**

### tripBlockHTML

Base HTML for tripBlock

+ Type : `String`
+ Default : `An array contains base HTML of tripBlock` (Please check source code to know the default HTML)

### backToTopWhenEnded

You can ask Trip.js go back to top when ended.

+ Type : `Boolean`
+ Default : `false`


### overlayZindex

You can set the basic zIndex for overlay if you want to expose elements.

+ Type : `Number`
+ Default : `99999`

### overlayHolder

You can decide where to be the container of the overlay.

+ Type : `String`
+ Default : `'body'`

### enableKeyBinding

You can decide to bind key events for trip navigations or not.

+ Type : `Boolean`
+ Default : `true`

### enableAnimation

You can enable animations on tripBlock.

+ Type : `Boolean`
+ Default : `true`


### showCloseBox

You can decide to add small close icon on each trip or not

+ Type : `Boolean`
+ Default : `false`


### showSteps

You can now show steps UI to let users know the index of current trip

+ Type : `Boolean`
+ Default : `false`
+ **Note : supported since 3.2.1+**

### showHeader

If you want to show no matter with default or customized header, you have to set this value to true. You can check **header** option for more details.

+ Type : `Boolean`
+ Default : `false`

### showNavigation

Toggle navigation buttons

+ Type : `Boolean`
+ Default : `false`

### skipUndefinedTrip

You can enable this option to tell Trip.js skip undefined trips (Undefined trips mean the trips without content or without sel or can not be selected by jQuery)

+ Type : `Boolean`
+ Default : `false`

### stopClickPropagation

You can stop any click from Trip.js to be propagated to the root by setting this value.

+ Type : `Boolean`
+ Default : `false`

### delay

Every trip will be presented for 1 second (1000 ms) by default. Set this value to `-1` will prevent auto-advancing and you must manually call `trip.next()`.

+ Type : `Number`
+ Default : `1000`

### header

This is the header for each trip. You can customize your own if you don't want to use default one. You can put `{{tripIndex}}` and `{{tripTotal}}` in the title to notify users about the number of trips and current index of trip. Later when rendering, Trip.js will replace them with right information.

+ Type : `String`
+ Default : `Step {{tripIndex}}`

### prevLabel

Label for the previous button.

+ Type : `String`
+ Default : `'Back'`

### nextLabel

Label for the next button.

+ Type : `String`
+ Default : `'Next'`

### skipLabel

Label for the skip button.

+ Type : `String`
+ Default : `'Skip'`
+ **Note : supported since 3.2.1+**

### finishLabel

Label for the finish button.

+ Type : `String`
+ Default : `'Dismiss'`


### animation

Animation that would be applied on the tripBlock.

+ Type : `String`
+ Default : `'tada'`


### canGoPrev

Determines if the user can go backwards. If set to a function it is called and the response is evaluated.

+ Type : `Boolean`
+ Default : `true`

### canGoNext

Determines if the user can go forward. If set to a function it is called and the response is evaluated.

+ Type : `Boolean`
+ Default : `true`

### onStart() 

You can set a callback function triggered when Trip.js starts.

+ Type : `Function`
+ Default : `$.noop`
+ **Note : supported since 2.0.0+**

### onEnd(tripIndex, tripObject)

You can set a callback function triggered when Trip.js ends.

+ Type : `Function`
+ Default : `$.noop`
+ **Note : supported since 2.0.0+**

### onTripStart(tripIndex, tripObject)

You can set a callback function triggered when each trip starts. `tripObject` is your passed JSON for this current trip, and tripIndex is the index for current trip. You can add add your customized functions in your object and call them when this callback is called.

+ Type : `Function`
+ Default : `$.noop`
+ **Note : supported since 2.0.0+**

### onTripEnd(tripIndex, tripObject)

You can set a callback function triggered when each trip ends.

**Note**: for 3.1.0+, you can return a `jQuery deferred object` within this function to make sure all needed works are done before switching to the next step (e.g. append needed element in DOM tree). But remember, because Trip.js will **keep waiting until it is resolved**, don't do some heavy works here, otherwise, users will feel disappointed about this waiting time.

+ Type : `Function`
+ Default : `$.noop`
+ **Note : changed since 2.0.0+**

### onTripStop(tripIndex, tripObject)

You can set a callback function triggered when any trip is stopped.

+ Type : `Function`
+ Default : `$.noop`

### onTripPause(tripIndex, tripObject)

You can set a callback function triggered when any trip is paused.

+ Type : `Function`
+ Default : `$.noop`

### onTripResume(tripIndex, tripObject)

You can set a callback function triggered when any trip is resumed.

+ Type : `Function`
+ Default : `$.noop`
+ **Note : supported since 2.0.0+**

### onTripChange(tripIndex, tripObject)

You can set a callback function triggered when any trip changes to another one.

+ Type : `Function`
+ Default : `$.noop`

### onTripClose(tripIndex, tripObject)

You can set a callback function triggered when any trip is closed.

+ Type : `Function`
+ Default : `$.noop`
+ **Note : supported since 2.0.0+**

## Local options

### sel

which selector is referenced in this step

+ Type: `String` (for late referring) or `jQuery Object`
+ Default: `0`

### content **[required]**

What information that you want to show to users. You can put `{{tripIndex}}` and `{{tripTotal}}` in the content to notify users about the number of trips and current index of trip. Later when rendering, Trip.js will replace them with right information.

+ Type : `String`
+ Default : `No default`

### position

What position would you prefer for the tripBlock. We support 9 different positions : `e`, `w`, `n`, `s`, `screen-ne`, `screen-se`, `screen-sw`, `screen-nw`, `screen-center`.

To be clear, `e`, `w`, `n`, `s` are related to the sel, so for this use case, sel is **required**. For `screen-ne`, `screen-se`, `screen-sw`, `screen-nw` and `screen-center`, they are related to the screen (fixed in CSS), so you don't have to put sel in this case.

+ Type : `String`
+ Default : `'n'`

### expose

You can enable this option to expose your selected element in this trip.

+ Type : `Boolean` or `String` (for late referring) or `jQuery Object`
+ Default : `false`

### nextClickSelector

If there is any specific trip that needs a customized **Next** button instead of the default one, you can set this variable to any jQuery Object and Trip.js will automatically bind a once-click event on it. When user clicking on it, the trip will be advanced to the next one.

**Note**: This normally happens when you want to interact with the user and ask them to click on special thing to make sure they do understand how to use something before going to the next trip.

+ Type : `jQuery Object`
+ Default : `undefined`

### delay

### header

### showHeader

### canGoPrev

### canGoNext

### animation

### showNavigation

### enableAnimation

### showCloseBox

### stopClickPropagation

### showSteps

### prevLabel

### nextLabel

### skipLabel

### finishLabel

### onTripStart(tripIndex, tripObject)

### onTripEnd(tripIndex, tripObject)

### onTripStop(tripIndex, tripObject)

### onTripPause(tripIndex, tripObject)

### onTripResume(tripIndex, tripObject)

### onTripChange(tripIndex, tripObject)

### onTripClose(tripIndex, tripObject)

Check documentations above.

## Parser Options

### data-trip-index

### data-trip-content

### data-trip-delay

### data-trip-position

### data-trip-animation

### data-trip-expose

Check documentations above.

**Note : only support `Boolean` and `String` type here, no `jQuery` object.**
