var testCase = require('nodeunit').testCase;
var gateFactory = require('../main').gateFactory;

module.exports = testCase({

    enterecloseexit: function (test) {
        var gate = gateFactory();
        var step = 0;
        test.ok(gate.enter(), 'should be able enter empty gate');
        gate.close(function () {
            test.equal(step, 1, 'get clouse completion should come after everybody left');
            step++;
        });
        test.equal(step, 0, 'gate is not closed when somebody inside');
        test.ok(!gate.enter(), 'should not be able to enter into closing gate');
        step++;
        gate.exit();
        test.equal(step, 2, 'after everybody left, the gate is closed');
        test.done();
    }
});