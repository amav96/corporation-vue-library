"use strict";
exports.__esModule = true;
var SideBar_vue_1 = require("./SideBar.vue");
exports.SideBar = SideBar_vue_1["default"];
var ItemSideBar_vue_1 = require("./ItemSideBar.vue");
exports.ItemSideBar = ItemSideBar_vue_1["default"];
exports["default"] = {
    install: function (Vue) {
        Vue.component(SideBar_vue_1["default"].name, SideBar_vue_1["default"]);
        Vue.component(ItemSideBar_vue_1["default"].name, ItemSideBar_vue_1["default"]);
    }
};
