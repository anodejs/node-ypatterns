﻿var testCase = require('nodeunit').testCase;
var gate = require('../main').gate;

module.exports = testCase({

    // close once
    test1: function (test) {
        var gate1 = gate();
        var step = 0;
        test.ok(gate1.enter(), 'should be able enter empty gate');
        gate1.close(function () {
            test.equal(step, 1, 'get close completion should come after everybody left');
            step++;
        });
        test.equal(step, 0, 'gate is not closed when somebody inside');
        test.ok(!gate1.enter(), 'should not be able to enter into closing gate');
        step++;
        gate1.exit();
        test.equal(step, 2, 'after everybody left, the gate is closed');
        test.done();
    },

    // close twice
    test2: function (test) {
        var gate1 = gate();
        var step = 0;
        test.ok(gate1.enter(), 'should be able enter empty gate');
        gate1.close(function () {
            test.equal(step, 1, 'get close completion should come after everybody left');
            step++;
        });
        // close again
        gate1.close(function () {
            test.equal(step, 2, 'get cluse completion should come after everybody left');
            step++;
        });
        test.equal(step, 0, 'gate is not closed when somebody inside');
        test.ok(!gate1.enter(), 'should not be able to enter into closing gate');
        step++;
        gate1.exit();
        test.equal(step, 3, 'after everybody left, the gate is closed');
        test.done();
    }
});