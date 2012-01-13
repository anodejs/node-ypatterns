// Gate factory
module.exports = function () {

    var count = 0;
    var completion = null;

    return { enter: enter, exit: exit, close: close };

    function enter() {
        if (!completion) {
            count++;
            return true;
        }
        return false;
    }

    function exit() {
        if (count < 1) {
            throw new Error('exit called while nobody was inside');
        }
        if (!(--count)) {
            if (completion) {
                completion();
            }
        }
    }

    function close(callback) {
        if (completion) {
            throw new Error('close was called more than once');
        }
        callback = callback || function () { };
        completion = callback;
        if (!count) {
            completion();
        }
    }
}

