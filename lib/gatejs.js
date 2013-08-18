// Gate pattern triggers cleanup only after there is no usage of resources.
// Think about mall that don't allow entering after certain hour, but it locks gates only after all
// customers had left.
// Gate object exposes 3 methods:
// - enter - try to enter via gate. If close on the gate wasn't triggered yet, the entrance is allowed.
// - exit - exit via the gate.
// - close - trigger gate closing. The completion is called only after all who entered the gate left.

// Gate factory
module.exports = function () {

    var count = 0;
    var callbacks = [];

    return { enter: enter, exit: exit, close: close };

    // enter the gate.
    // returns true if entrance is allowed.
    function enter() {
        if (!callbacks.length) {
            count++;
            return true;
        }
        return false;
    }

    // exit the gate.
    function exit() {
        if (count < 1) {
            throw new Error('exit called while nobody was inside');
        }
        if (!(--count)) {
            _completion();
        }
    }

    // trigger gate closing.
    function close(callback) {
        callbacks.push(callback || function() {});
        if (!count) {
            _completion();
        }
    }

    function _completion() {
        if (callbacks.length) {
            callbacks.forEach(function(cb){ cb(); });
        }
    }
}

