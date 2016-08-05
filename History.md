# History

## 2016-08-04 - version 3.3.3

+ fixed a typo in 3.3.2

## 2016-08-04 - version 3.3.2

+ fixed the regression issue caused by #146

## 2016-08-04 - version 3.3.1

+ fixed blinking expose problem

## 2016-07-11 - version 3.3.0

+ changed some DOM structures
+ changed CSS specificity to make it simpler
+ changed canGoPrev() and canGoNext() logics
+ `next(tripIndex)` now will ignore `canGoNext()` check

## 2016-07-06 - version 3.2.2

+ fixed callback scope, all bound to `trip` itself, so you can use `this.next()` API in your tripObject
+ fixed arrow color for all themes

## 2016-07-04 - version 3.2.1
+ added TripConstant model
+ added a new theme called `minimalism`
+ added `tripClass` settings so that users can add extra class on it for more customization works
+ showed `prev` button even if users are on the first step

## 2016-07-01 - version 3.2.0

+ added `data-trip-step` class on trip-block so that devs can do more controls in CSS
+ added skip button (and skipLabel settings)
+ added steps UI (and showSteps settings)
+ updated existing styles to make it work better with steps UI
+ changed default animation to `fadeIn`
+ changed themes strucutre to make it neat
+ renamed `.trip-progress-wrapper` to `.trip-navigation`

## 2016-06-30 - version 3.1.7

+ moved animations into trip.animation.js
+ trip.next(i) now accepts the index to let you jump to different trip

## 2016-04-28 - version 3.1.6

+ Fixed wrong configuration in UMD which makes Trip.js can't be used in AMD
+ nextClickSelector should not be triggered after trip is stopped

## 2016-02-17 - version 3.1.5

+ added `data-trip-expose` option in parser mode

## 2016-02-03 - version 3.1.4

+ fixed #142, Added `fadeIn()` / `fadeOut()` to animate overlay
