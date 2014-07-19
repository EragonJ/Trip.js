# Trip.js

![Trip.js](https://raw.github.com/EragonJ/Trip.js/master/public/img/logo-tiny.png "Trip.js")

Trip.js is a jQuery plugin that can help you customize a tutorial trip easily with more flexibilities. Right now Trip.js support lots of useful stuffs like **keyboard binding**, **animations**, **changing themes** ... etc. If you want to highly customize your own tutorial trip, then Trip.js is definitely worth to give it a try !

# Build Status

[![Build Status](https://travis-ci.org/EragonJ/Trip.js.png?branch=master)](https://travis-ci.org/EragonJ/Trip.js)

# Version

2.0.1

# Install

Clone the latest version from Github directly

* `git clone git://github.com/EragonJ/Trip.js.git`

Or Install from Bower

* `bower install trip.js`

Or [OSSCDN by MaxCDN](http://osscdn.com/#/jquery.trip.js)

* `<link rel="stylesheet" type="text/css" href="//oss.maxcdn.com/jquery.trip.js/1.3.0/trip.min.css" />`
* `<script src="//oss.maxcdn.com/jquery.trip.js/1.3.0/trip.min.js"></script>`

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

# Documentation

Please check the [documentation](http://eragonj.github.io/Trip.js/doc/documentation.html) here !

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

`grunt build` (this will do `uglify`, `sass` at the same time)

## How to compile html

`grunt html` (Because we use `jade`, so you may need to compile first)

## How to create docs

`grunt doc` (This includes `jsdoc` for source code and documentations)

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

# Special Thanks

* Everyone who is engaged in this project.
* [Animate.css](http://daneden.github.io/animate.css/)
