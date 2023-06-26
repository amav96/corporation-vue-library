"use strict";
exports.__esModule = true;
exports.isTypeValue = function (value, type) {
    return typeof value === type;
};
exports.isEmpty = function (value) {
    if (value === null || value === undefined)
        return true;
    if (value instanceof Date)
        return false;
    switch (typeof value) {
        case "string":
            return !value || value.length === 0;
        case "object":
            if (Array.isArray(value))
                return value.length === 0;
            else
                return Object.keys(value).length === 0;
        default:
            return false;
    }
};
exports.isDate = function (date) { return Boolean(Date.parse(date)); };
exports.minLength = function (value, min) { return !exports.isEmpty(value) && value.length >= min; }; // Return true if condition succed
exports.maxLength = function (value, max) { return !exports.isEmpty(value) && value.length <= max; };
exports.isEmail = function (value) {
    // eslint-disable-next-line no-useless-escape
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value);
};
exports.contain = function (originalValue, values) {
    return originalValue && values.includes(originalValue);
};
