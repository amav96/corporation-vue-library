"use strict";
exports.__esModule = true;
var Date_vue_1 = require("./Date.vue");
exports.Date = Date_vue_1["default"];
exports["default"] = {
    install: function (Vue) {
        Vue.component(Date_vue_1["default"].name, Date_vue_1["default"]);
    }
};
