# Theme

In Trip.js, we do support five built-in themes for devs to use ! They have different looks and feels so just choose whichever you like for your works :)

## Black

<button class="documentation-theme-black step1">Demo</button>

## White

<button class="documentation-theme-white step1">Demo</button>

## Dark

<button class="documentation-theme-dark step1">Demo</button>

## Yeti

<button class="documentation-theme-yeti step1">Demo</button>

## Minimalism

<button class="documentation-theme-minimalism step1">Demo</button>

# Theme details

Go check [theme folder](https://github.com/EragonJ/Trip.js/tree/master/src/themes) first, you will notice there are several default themes got supported by Trip.js. If you check the `default` one as reference, you will see the theme structure below : 

```javascript
module.exports = [
  '<div class="trip-block">',
    '<a href="#" class="trip-close"></a>',
    '<div class="trip-header"></div>',
    '<div class="trip-content"></div>',
    '<div class="trip-progress-steps"></div>',
    '<div class="trip-navigation">',
      '<a href="#" class="trip-prev"></a>',
      '<a href="#" class="trip-skip"></a>',
      '<a href="#" class="trip-next"></a>',
    '</div>',
    '<div class="trip-progress-bar"></div>',
  '</div>'
].join('');
```

As you can see, a theme will be composed with several components :

## .trip-block

This is the main container for all components, so if you want to customize your own theme later, you need to make sure to use `.trip-block.YOUR_TRIP_CLASS_NAME` to override the default styles.

## .trip-close

This is the UI for users to *click* and to close the whole trip. when clickin on this, `onTripClose()` callback will be triggered and you can some follow-up works there.

## .trip-header

By default, Trip.js will put `Step {{tripIndex}}` into your header. In order to show this, don't forget to set `showHeader` to `true` !

## .trip-content

This is the container that you can put anything. In order to make it highly customized, we use `innerHTML` here to help you inject your content. So you can put any valid HTML tags here if you want !

## .trip-progress-steps

Sometimes you want to let users know how many steps left to finish the whole trip. In this case, you need to set `showSteps` to `true` to show it.

## .trip-navigation

This is the container to wraps `.trip-prev`, `.trip-skip` and `.trip-next` three buttons.

## .trip-prev

This is the button that users can click to go back to previous step.

## .trip-skip

This is the UI for users to *click* and to close the whole trip. when clickin on this, `onTripClose()` callback will be triggered and you can some follow-up works there. (same with `.trip-close`)

## .trip-next

This is the button that users can click to go ahead to next step.

## .trip-progress-bar

This is the UI to let users know how many time left before going to next step.

# How to make a new theme 

AWESOME !! You are reading this part ! But there is no much information here because the strucutre behind Trip.js is damn simple !

To quickly know how to make your own, please go check source code of [default theme](https://github.com/EragonJ/Trip.js/tree/master/src/themes/default) and [minimalism](https://github.com/EragonJ/Trip.js/tree/master/src/themes/minimalism) theme.

As you can see, the default one follows the basic strucutre and CSS, but the other one has differnt structure and its own style which overrides the base, so you can just follow it and make your own !

Later, when you finish a new theme, feel free to send Trip.js a PR for your new theme so that everyone can use it too ! Big thanks !
