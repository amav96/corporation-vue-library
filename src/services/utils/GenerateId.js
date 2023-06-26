"use strict";
exports.__esModule = true;
exports.getRandomInt = function (max) { return Math.floor(Math.random() * max); };
exports.generateId = function () {
    // aca puede ir otra implementacion para generar id
    return new Date().getMilliseconds() + exports.getRandomInt(100);
};
