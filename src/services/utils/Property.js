"use strict";
exports.__esModule = true;
exports.getIndex = function (value, k) {
    if (!value || value === undefined || value === null) {
        throw new Error("Object is expected in getIndex");
    }
    var i = -1;
    for (var index = 0; index < value.length; index++) {
        if (value[index].key == k) {
            i = index;
            break;
        }
    }
    return i;
};
exports.removeDuplicates = function (arr, key) { return new Promise(function (resolve) {
    if (key) {
        var remove = arr.filter(function (val, index, array) { return array.findIndex(function (find) { return find[key] === val[key]; }) === index; });
        resolve(remove);
    }
    else {
        var remove = arr.filter(function (val, index, array) { return array.findIndex(function (find) { return find === val; }) === index; });
        resolve(remove);
    }
}); };
