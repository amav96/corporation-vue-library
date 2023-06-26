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
exports.PropsSelectPropType = __assign(__assign({}, Input_type_1.baseInputPropsPropType), {
    options: {
        type: Array < any > ,
        "default": function () { return []; }
    },
    label: {
        type: String,
        "default": 'nombre'
    },
    trackBy: {
        type: String,
        "default": 'id'
    },
    searchable: {
        type: Boolean
    },
    listenRemove: {
        type: Boolean
    },
    listenSelect: {
        type: Boolean
    },
    listenForm: {
        type: Boolean
    },
    multiple: {
        type: Boolean
    },
    id: {
        type: String
    }
});
