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
exports.PropsDatePickerPropType = __assign(__assign({}, Input_type_1.baseInputPropsPropType), {
    modelType: {
        type: String,
        "default": 'dd/MM/yyyy hh:mm'
    },
    format: {
        type: String,
        "default": 'dd/MM/yyyy hh:mm'
    },
    autoApply: {
        type: Boolean,
        "default": false
    },
    listenForm: {
        type: Boolean
    },
    listenChange: {
        type: Boolean,
        "default": false
    }
});
