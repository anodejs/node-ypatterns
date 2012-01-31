// Create handle for the object that can be used to trigger object's cleanup.
// Handle garantees that cleanup of object will be called after initialization.

var gateFactory = require('./gate');

// Handle wrapper
// instance - object should expose the 'initialize' and 'cleanup' methods,
// each has only callback as a parameter.
module.exports = function (instance) {

    var gate = gateFactory();

    // Before starting initialization obtain gate entrance.
    // No need to check return code as the gate is new.
    gate.enter();
    instance.initialize(function (err) {
        // Upon initialization completion, exit the gate. From now on the cleanup can be executed.
        // at any time. Before exiting the gate, cleanup was delayed until this moment.
        gate.exit();
    });

    // Return handle.
    return { close: close };

    function close(callback) {
        // Close the initialization gate.
        // Upon completion, can be sure the initialization was done.
        // Now cleanup can operate on all objects initialization created.
        gate.close(function () {
            instance.cleanup(callback);
        });
    }
}

