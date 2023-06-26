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
var packageTypes_1 = require("../../../packageTypes");
exports.PropsTextAreaPropType = __assign(__assign({}, packageTypes_1.baseInputPropsPropType), {
    listenChange: {
        type: Boolean
    },
    listenForm: {
        type: Boolean
    },
    listenFocus: {
        type: Boolean
    },
    maxRows: {
        type: Number,
        "default": 6
    },
    rows: {
        type: Number,
        "default": 3
    }
});
