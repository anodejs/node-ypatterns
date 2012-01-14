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

    // Before starting initialization obtain gate entrance.
    // No need to check return code as the gate is new.
    gate.enter();
    obj.initialize(function () {
        // Upon initialization completion, exit the gate. From now on the cleanup can be executed.
        // at any time. Before exiting the gate, cleanup was delayed until this moment.
        gate.exit();
        // Ensure callback can see returned handle.
        process.nextTick(function () {
            // Notify factory completion.
            callback();
        });
    });

    // Return handle.
    return { close: close };

    function close(callback) {
        // Close the initialization gate.
        // Upon completion, can be sure the initialization was done.
        // Now cleanup can operate on all objects initialization created.
        gate.close(function () {
            obj.cleanup(callback);
        });
    }
}

