"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Input_type_1 = require("../Input/Input.type");
exports.PropsFilePropType = __assign(__assign({}, Input_type_1.baseInputPropsPropType), {
    accept: {
        type: Array,
        validator: function (value) {
            var allowedTypes = ['application/vnd.ms-excel', 'application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
            return value.every(function (type) { return allowedTypes.includes(type); });
        },
        "default": function () { return ['application/vnd.ms-excel', 'application/pdf', 'image/png', 'image/jpeg', 'image/jpg']; }
    },
    listenChange: {
        type: Boolean
    },
    listenForm: {
        type: Boolean
    },
    resetOnOpen: {
        type: Boolean,
        "default": true
    }
});
