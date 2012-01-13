var gateFactory = require('./gate');

// Facade factory
module.exports = function(obj, callback) {

    var gate = gateFactory();

    gate.enter();
    obj.initialize(function () {
        gate.exit();
        callback();
    });

    return { close: close };

    function close(callback) {
        gate.close(function () {
            obj.cleanup(callback);
        });
    }
}

