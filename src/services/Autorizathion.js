"use strict";
exports.__esModule = true;
exports.authorization = function () {
    var token = localStorage.getItem('token');
    if (token) {
        return "Bearer " + token;
    }
    return '';
};
