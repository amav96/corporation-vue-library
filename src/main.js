"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
require("vue-toast-notification/dist/theme-sugar.css");
var bootstrap_vue_3_1 = require("bootstrap-vue-3");
require("bootstrap/dist/css/bootstrap.css");
require("bootstrap-vue-3/dist/bootstrap-vue-3.css");
var app = vue_1.createApp(App_vue_1["default"])
    .use(bootstrap_vue_3_1["default"])
    .mount("#app");
