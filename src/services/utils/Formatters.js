"use strict";
exports.__esModule = true;
exports.formatDateTime = function (dateTime) {
    if (!dateTime)
        return "";
    var date = new Date(dateTime);
    var dia = date.getDate();
    var ano = date.getFullYear();
    var hora = date.getHours();
    var minutos = date.getMinutes();
    if (!dia || !ano)
        return dateTime;
    var dateFormat = ("0" + date.getDate()).slice(-2).slice(-2) + "/" + ("0" +
        (date.getMonth() + 1)).slice(-2) + "/" + ano;
    return dateFormat + " " + ("0" + hora).slice(-2) + ":" + ("0" + minutos).slice(-2);
};
exports.formatDate = function (onlyDate) {
    if (!onlyDate)
        return "";
    if (onlyDate.indexOf("/") > -1) {
        return onlyDate;
    }
    var date = new Date(onlyDate);
    var ano = date.getFullYear();
    var dateFormat = ("0" + date.getDate()).slice(-2).slice(-2) + "/" + ("0" +
        (date.getMonth() + 1)).slice(-2) + "/" + ano;
    return dateFormat;
};
exports.removeAccents = function (str) {
    if (!str) {
        return "";
    }
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
exports.removeSpaces = function (str) { return str.replace(/\s/g, '').replace(/[^\w\s]/gi, ''); };
exports.getValuesInArrayObjects = function (Array, trackBy) {
    if (trackBy === void 0) { trackBy = 'id'; }
    var buildArray = [];
    Array.forEach(function (val) {
        if (val.hasOwnProperty(trackBy)) {
            buildArray.push(val[trackBy]);
        }
    });
    return buildArray;
};
