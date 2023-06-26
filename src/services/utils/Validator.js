"use strict";
exports.__esModule = true;
var Validations_1 = require("./Validations");
var Validator = /** @class */ (function () {
    function Validator() {
        this.errors = [];
        this.required = false;
        this.min = false;
        this.max = false;
        this.contain = false;
        this.email = false;
        this.message = false;
        this.string = false;
        this.number = false;
    }
    Validator.prototype.validate = function (value, validations) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.errors = [];
        if (typeof validations === "object" && validations !== null) {
            var property = validations.rules;
            var messages = validations.messages;
            if (property.required && Validations_1.isEmpty(value)) {
                this.required = true;
                var message = (_a = messages === null || messages === void 0 ? void 0 : messages.required) !== null && _a !== void 0 ? _a : "Es obligatorio";
                this.errors.push(message);
            }
            else if (property.required && !Validations_1.isEmpty(value) && this.required) {
                // Se elimina el error generado en el if anterior, y se setea la variable en false
                // para no volver a entrar en este bloque de codigo
                this.required = false;
            }
            if (!Validations_1.isEmpty(value) && property.string && !Validations_1.isTypeValue(value, "string")) {
                this.string = true;
                var message = (_b = messages === null || messages === void 0 ? void 0 : messages.string) !== null && _b !== void 0 ? _b : "Este valor debe ser un string";
                this.errors.push(message);
            }
            else if (!Validations_1.isEmpty(value) && property.string && Validations_1.isTypeValue(value, "string") && this.string) {
                this.string = false;
            }
            if (!Validations_1.isEmpty(value) && property.number && !Validations_1.isTypeValue(value, "number")) {
                this.number = true;
                var message = (_c = messages === null || messages === void 0 ? void 0 : messages.number) !== null && _c !== void 0 ? _c : "Este valor debe ser un numero";
                this.errors.push(message);
            }
            else if (!Validations_1.isEmpty(value) && property.number && Validations_1.isTypeValue(value, "number") && this.number) {
                this.number = false;
            }
            if (!Validations_1.isEmpty(value) && property.min && !Validations_1.minLength(value, property.min)) {
                this.min = true;
                var message = (_d = messages === null || messages === void 0 ? void 0 : messages.min) !== null && _d !== void 0 ? _d : "Debe tener un largo mayor a " + property.min;
                this.errors.push(message);
            }
            else if (property.min && (Validations_1.minLength(value, property.min) || Validations_1.isEmpty(value)) && this.min) {
                this.min = false;
            }
            if (!Validations_1.isEmpty(value) && property.max && !Validations_1.maxLength(value, property.max)) {
                this.max = true;
                var message = (_e = messages === null || messages === void 0 ? void 0 : messages.max) !== null && _e !== void 0 ? _e : "Debe tener un largo menor a " + property.max;
                this.errors.push(message);
            }
            else if (property.max && (Validations_1.maxLength(value, property.max) || Validations_1.isEmpty(value)) && this.max) {
                this.max = false;
            }
            if (!Validations_1.isEmpty(value) && property.contain && !Validations_1.contain(value, property.contain)) {
                this.contain = true;
                var message = (_f = messages === null || messages === void 0 ? void 0 : messages.contain) !== null && _f !== void 0 ? _f : "Contiene valores inv\u00E1lidos";
                this.errors.push(message);
            }
            else if (!Validations_1.isEmpty(value) && property.contain && Validations_1.contain(value, property.contain) && this.contain) {
                this.contain = false;
            }
            if (!Validations_1.isEmpty(value) && property.email && !Validations_1.isEmail(value)) {
                this.email = true;
                var message = (_g = messages === null || messages === void 0 ? void 0 : messages.email) !== null && _g !== void 0 ? _g : "Email inv\u00E1lido";
                this.errors.push(message);
            }
            else if (!Validations_1.isEmpty(value) && property.email && Validations_1.isEmail(value) && this.email) {
                this.email = false;
            }
        }
        else {
            throw Error("Params incorrect");
        }
    };
    Object.defineProperty(Validator.prototype, "getErrors", {
        get: function () {
            return this.errors;
        },
        enumerable: true,
        configurable: true
    });
    return Validator;
}());
exports.Validator = Validator;
