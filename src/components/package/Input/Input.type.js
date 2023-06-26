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
exports.baseInputPropsPropType = {
    placeholder: {
        type: String
    },
    value: {
        type: null,
        "default": null
    },
    state: {
        type: null,
        "default": null
    },
    type: {
        type: String || null,
        "default": 'text'
    },
    title: {
        type: String
    },
    disabled: {
        type: Boolean,
        "default": false
    },
    hidden: {
        type: Boolean
    },
    customClass: {
        type: String,
        "default": ''
    },
    validations: {
        type: Object
    },
    errors: {
        type: Array,
        "default": function () { return []; }
    },
    formatValue: {
        type: Function
    }
};
exports.PropsInputPropType = __assign(__assign({}, exports.baseInputPropsPropType), {
    listenChange: {
        type: Boolean
    },
    listenForm: {
        type: Boolean
    },
    listenFocus: {
        type: Boolean
    },
    preppendClass: {
        type: String,
        "default": ''
    },
    iconLeft: {
        type: String
    }
});
