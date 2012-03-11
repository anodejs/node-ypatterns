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
...
if (gate.enter()) {
  ... entrance granted.
  ...
  gate.exit();
}
else {
  ... entrance is not allowed anymore, the gate is closed.
}
...
gate.close(function() {
  ... nobody is inside.
});
```

## License

MIT
