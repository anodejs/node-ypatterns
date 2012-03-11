# ypatterns

Miscellaneous programming patterns.

[![Build Status](https://secure.travis-ci.org/anodejs/node-ypatterns.png)](http://travis-ci.org/anodejs/node-ypatterns)

## Gate

This is the pattern of usage counter.
Anybody can enter the gate is the gate is not closed.
When gate is closed, notbody allowed to enter. However, all those that are already inside, can exit the gate.
The completion of gate clouser will be called when everybody left (exited the gate).

### Usage

```
var gate = require('ypatterns').gate;
//...
if (gate.enter()) {
  //... entrance granted.
  //...
  gate.exit();
}
else {
  //... entrance is not allowed anymore, the gate is closed.
}
...
gate.close(function() {
  //... nobody is inside.
});
```

## Handle Wrapper

This pattern is for objects that exhibit handle-like facade. Upon instantiation, such objects return handle, which has
only methode ```close```. Such facade is useful for object that are listeners and call for notifications.
To expose handle facade, one has to implement factory, which has ```initialize``` and ```cleanup``` methods.
The wrapper takes care to call cleanup only after initialization is completed.

### Definition

```
var handleWrapper = require('ypatterns').handleWrapper;
//...
function factory(...) {
  function initialize(callback) {
    //...
  }
  function cleanup(callback) {
    //...
  }
  return handleWrapper({ initialize: initialize, cleanup: cleanup });
}
```

### Usage

```
var handle = factory(...);
...
handle.close(function() {
  // Object is closed.
});
```

## License

MIT
