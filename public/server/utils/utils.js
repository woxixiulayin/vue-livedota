'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.log = undefined;

var _config = require('../config.js');

var log = function log(str) {
    if (_config.DEBUG === true) {
        var date = new Date();
        console.log('------------------------------------');
        if (typeof str === "string") {
            console.log(date.toLocaleString() + ": " + str);
        } else {
            console.log(date.toLocaleString());
            console.log(str);
        }
    }
};

exports.log = log;