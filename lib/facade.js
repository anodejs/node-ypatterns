// Facade pattern.
// Create facade for objects that have initialization and cleanup.
// The facade exposes method 'create' which returns handle. Handle has 'close' method.
// Facade object garantees that cleanup of object will be called after initialization.

var gateFactory = require('./gate');

// Facade factory
// obj - facaded object. The object should expose the 'initialize' and 'cleanup' methods,
// each has only callback as a parameter.
module.exports = function (obj, callback) {

    var gate = gateFactory();

    gate.enter();
    obj.initialize(function () {
        gate.exit();
        // Ensure callback can see returned handle.
        process.nextTick(function () {
            callback();
        });
    });

    // Return handle.
    return { close: close };

    function close(callback) {
        gate.close(function () {
            obj.cleanup(callback);
        });
    }
}

