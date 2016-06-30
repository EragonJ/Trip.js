# Key Bindings

Trip.js would detect following keys to do relative actions after loading it.

+ Right and Down arrows - Go to next trip
+ Left and Up arrows - Go back to previous trip
+ Space - pause / resume trip
+ Esc - Stop trip

# API

+ `trip.start()`
+ `trip.stop()`
+ `trip.pause()`
+ `trip.resume()`
+ `trip.next()`
+ `trip.prev()`

## Introductions

When using Trip.js, after initializing, you will get a `trip` object that has several APIs that you can use with in different situation. And here comes an example : 

```javascript
var trip = new Trip([...]);
```

### trip.start()

This is the entry point that to start the whole predefined trip.

### trip.stop()

This will finish the whole trip in time.

### trip.pause()

Sometimes, you may need to pause the trip for a while to let users do something, then, you can use this.

### trip.resume()

After a while, you want to make the paused trip back to work, you will need this one. But even if `trip.pause()` and `trip.resume()` sounds different, the implementation behind them are the same, so you can just treat them as same function but with different name.

### trip.next(tripIndex)

Jump to the next step by default. If you do pass `tripIndex` into this method, then you can directly jump to that step.

### trip.prev()

Jump back to previous step.
