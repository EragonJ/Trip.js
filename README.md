# Trip.js

![Trip.js](https://raw.github.com/EragonJ/Trip.js/master/public/img/logo-tiny.png "Trip.js")

Trip.js is a jQuery plugin that can help you customize a tutorial trip easily with more flexibilities. Right now Trip.js support lots of useful stuffs like **keyboard binding**, **animations**, **changing themes** ... etc. If you want to highly customize your own tutorial trip, then Trip.js is definitely worth to give it a try !

# Browser Support

Trip.js has been tested and work well on `IE 9+`, `Chrome 32+`, `Firefox 32+` and `Safari 9+`

# Support Trip.js !

If you do love Trip.js, feel free to buy me some beers ! :beers:

My bitcoin wallet : **1KtpFtaLW52tCe2VhWxCMHmRt8Mrxqj4WB**

# Awesome badges

[![Build Status](https://travis-ci.org/EragonJ/Trip.js.png?branch=master)](https://travis-ci.org/EragonJ/Trip.js) [![Join the chat at https://gitter.im/EragonJ/Trip.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/EragonJ/Trip.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Version

3.1.5

# How to use this library

Please check [website](http://eragonj.github.io/Trip.js), [setup](http://eragonj.github.io/Trip.js/doc-setup.html), [configuration](http://eragonj.github.io/Trip.js/doc-configuration.html) and [API](http://eragonj.github.io/Trip.js/doc-api.html) :P

# How to Contribute

If you want to build your own Trip.js, you can check `Gruntfile.js` for details.

All you have to do is to clone the whole repository and do `npm install` to install all necessary modules !

If you are willing to contribute any commit for Trip.js, please follow the rule below : 

1. Create an issue talking about your change and let's discuss here.
2. Assign yourself as assignee.
3. Fork Trip.js.
4. Put your changes into a commit !
5. Press `grunt build` to build all necessary files. Notes: You need to install compass (I am sorry because it is ruby based), node and npm first, and don't forget to press `npm install` to install all needed building tools so that grunt can recognize it and help you minify js, compile jade and SCSS.
6. Send a pull request to Trip.js and make sure put `fix #xxx` in your commit title.
7. Make sure Travis is green and ping me :D

Although the rule is not forced to follow, it would be helpful for me to review code to make sure there is nothing missing and make the code base consistent. 

Thanks for all your participations !!! 

## How to run Tests

`grunt test` (this will run all qunit tests)

## How to build

`grunt build` (this will build js & css together)

## How to compile html

`grunt html` (Because we use `jade`, so you may need to compile first)

## How to create docs

`grunt doc` (This includes `jsdoc` for source code and documentations)

# TODO

* Add data-x to define steps ( make the setup easier )
* Add UI for pause/play/stop to make users know how to interact
* Don't depend on jQuery

# Special Thanks

* Everyone who is engaged in this project.
* [Animate.css](http://daneden.github.io/animate.css/)

# Author

EragonJ ( eragonj@eragonj.me )

# License

MIT
