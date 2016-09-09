# Setup

In this chapter, we will tell you how to setup Trip.js properly steps by steps.

## How to install Trip.js ?

### GitHub

```bash
git clone git://github.com/EragonJ/Trip.js.git
```

### npm

```bash
npm install --save trip.js
```

### Bower

```bash
bower install trip.js --save
```

### CDN (OSSCDN by MaxCDN)

```html
<link rel="stylesheet" type="text/css" href="//oss.maxcdn.com/jquery.trip.js/3.3.3/trip.min.css"/>
<script src="//oss.maxcdn.com/jquery.trip.js/3.3.3/trip.min.js"></script>
```

## How to setup Trip.js properly ?

1. include jQuery (I will try to remove this dependency in future version)
2. include trip.min.css
3. include trip.min.js

Powered with webpack, starting from **3.1.3+**, Trip.js has been refactored in UMD (Universal Module Definition) pattern which can be used in several ways below :

### AMD style (supported from 3.1.3+)

```javascript
require([
  'Trip'
], function(Trip) {
  // ...
});
```

### CommomJS style (supported from 3.1.3+)

```javascript
var Trip = require('Trip');
// ...
```

### VanilaJS style

```javascript
var Trip = window.Trip;
// ...
```

## How to use Trip.js ?

### Programming mode

In programming mode, you can easily define your own trips easily in JavaScript. As you may see below, every trip is wrapped well in an object with defined properties to tell Trip.js to do related works for it.

```javascript
var options = {}; // details about options are listed in next chapter
var trip = new Trip([
  { 
    sel : $('#element1'),
    content : 'This is element 1'
  },
  {
    sel : $('#element2'),
    content : 'This is element 2'
  }
], options);
```

If you want to use default behaviors, okay, just remove options and everything still works perfectly !

```javascript
var trip = new Trip([
  { 
    sel : $('#element1'),
    content : 'This is element 1'
  },
  {
    sel : $('#element2'),
    content : 'This is element 2'
  }
]);
```

### Parser mode (supported from 3.0.0+)

In parser mode, you can define your own trip inside HTML instead of passing it from JavaScript. With this, we can easily define our own logic for each trip in HTML and keep our JavaScript cleaner. For some fans for Angular.js or some frameworks, it would be more familiar to them to define stuffs in this way.

You can pass valid CSS selectors in **String** type as the first parameter to tell Trip.js which trips you are referring. With this, you can easily create many different groups of trips and control your own tutorial trips.

```html
<div>
  <div class="your-own-trips" data-trip-index="1" data-trip-content="hi1" data-trip-position="n" data-trip-delay="100">hi</div>
  <div class="your-own-trips" data-trip-index="2" data-trip-content="hi2" data-trip-position="e" data-trip-delay="200" data-trip-expose="true">I am Trip.js</div>
</div>
```

```javascript
var options = {}; // details about options are listed in next chapter
var trip = new Trip('.your-own-trips', options);
```

If you want to use default behaviors, okay, just remove options and everything still works perfectly !

```javascript
var trip = new Trip('.your-own-trips');
```
But sometimes, we just have one group of trips that wants to animate with, okay, Trip.js will automatically parse all elements with **[data-trip]** attribute and make them inside a group. What you need to do is define customized attribute on each DOM and Trip.js will try to parse them out and transform them into recognizable data to it.

```html
<!-- We will talk about more customizable options for parser mode in next chapter -->
<div>
  <div data-trip data-trip-index="1">hi</div>
  <div data-trip data-trip-index="2">I am Trip.js</div>
</div>
```

```javascript
var options = {}; // details about options are listed in next chapter
var trip = new Trip(options);
```

And once again, if you want to use default behaviors, okay, just remove options and everything still works perfectly !

```javascript
var trip = new Trip(); // quite simple huh ?!
```

Last but not the least, you just have to start it and your fantastic trip would get presented one by one to users !

```javascript
trip.start();
```
