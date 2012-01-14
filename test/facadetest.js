var testCase = require('nodeunit').testCase;
var facadeFactory = require('../main').facadeFactory;

module.exports = testCase({

    usage: function (test) {

        var step = 'start';

        function originalFactory(param1, param2) {

            return { initialize: initialize, cleanup: cleanup };

            function initialize(callback) {
                // parameters are delivered into initialization.
                test.equal(param1, 'p1');
                test.equal(param2, 'p2');
                // Complete initialization asynchronously.
                process.nextTick(function () {
                    // Initialization completes asynchronously, but everything created
                    // during initialization can be used in cleanup.
                    step = 'initialize completed';
                    callback();
                });
                step = 'initialize called';
            }

            function cleanup(callback) {
                // Cleanup always called after initialize and hence can be used
                test.equal(step, 'initialize completed');
                step = 'cleanup completed';
                callback();
            }
        }

        function facadedFactory(param1, param2, callback) {
            var original = originalFactory(param1, param2);
            return facadeFactory(original, callback);
        }

        var handle = facadedFactory('p1', 'p2', function () {
        });

        test.equal(step, 'initialize called');
        // Start closing before initialization is completed.
        handle.close(function () {
            test.equal(step, 'cleanup completed');
            test.done();
        });

        test.equal(step, 'initialize called');
    }
});