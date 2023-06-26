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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var test_utils_1 = require("@vue/test-utils");
var bootstrap_vue_3_1 = require("bootstrap-vue-3");
require("@testing-library/jest-dom");
var Date_vue_1 = require("../Date.vue");
var vue_1 = require("vue");
describe('Date component', function () {
    function mountFunction(component, $options) {
        if ($options === void 0) { $options = {}; }
        var app = vue_1.createApp(component);
        app.use(bootstrap_vue_3_1["default"]);
        return test_utils_1.mount(component, __assign({ plugins: [app] }, $options));
    }
    it('should render errors correctly when has external errors', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, validations, errors, wrapper, divElement, generatedErrors, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Fecha de nacimiento';
                    value = null;
                    validations = { rules: { required: true } };
                    errors = [];
                    wrapper = mountFunction(Date_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            validations: validations,
                            errors: errors
                        }
                    });
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, wrapper.setProps({ errors: ['Es obligatorio'] })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 4:
                    _a.sent();
                    divElement = wrapper.find('.invalid-feedback');
                    expect(divElement.exists()).toBe(true);
                    generatedErrors = ['Es obligatorio'];
                    text = divElement.text();
                    expect(text).toContain(generatedErrors[0]);
                    return [2 /*return*/];
            }
        });
    }); }, 5000);
    it('should emit update:model-value when execute onDatePicker method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, validations, errors, wrapper, newValue, emit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Fecha de nacimiento';
                    value = null;
                    validations = { rules: { required: true } };
                    errors = [];
                    wrapper = mountFunction(Date_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            validations: validations,
                            errors: errors
                        }
                    });
                    newValue = '03/05/2023 11:41';
                    return [4 /*yield*/, wrapper.vm.onDatePicker(newValue)];
                case 1:
                    _a.sent();
                    emit = wrapper.emitted('update:model-value');
                    expect(emit[0][0]).toEqual(newValue);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should emit onDatePicker when execute onDatePicker method and listenChange is true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, validations, errors, listenChange, wrapper, newValue, emit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Fecha de nacimiento';
                    value = null;
                    validations = { rules: { required: true } };
                    errors = [];
                    listenChange = true;
                    wrapper = mountFunction(Date_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            validations: validations,
                            errors: errors,
                            listenChange: listenChange
                        }
                    });
                    newValue = '03/05/2023 11:41';
                    return [4 /*yield*/, wrapper.vm.onDatePicker(newValue)];
                case 1:
                    _a.sent();
                    emit = wrapper.emitted('onDatePicker');
                    expect(emit[0][0]).toEqual(newValue);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should emit onDatePicker when execute onDatePicker method and listenForm is true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, validations, errors, listenForm, wrapper, newValue, emit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Fecha de nacimiento';
                    value = null;
                    validations = { rules: { required: true } };
                    errors = [];
                    listenForm = true;
                    wrapper = mountFunction(Date_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            validations: validations,
                            errors: errors,
                            listenForm: listenForm
                        }
                    });
                    newValue = '03/05/2023 11:41';
                    return [4 /*yield*/, wrapper.vm.onDatePicker(newValue)];
                case 1:
                    _a.sent();
                    emit = wrapper.emitted('onDatePicker');
                    expect(emit[0][0]).toEqual(newValue);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should render errors when execute onClose and value is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, validations, errors, wrapper, divElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Fecha de nacimiento';
                    value = null;
                    validations = { rules: { required: true } };
                    errors = [];
                    wrapper = mountFunction(Date_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            validations: validations,
                            errors: errors
                        }
                    });
                    return [4 /*yield*/, wrapper.vm.onClose()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 2:
                    _a.sent();
                    divElement = wrapper.find('.invalid-feedback');
                    expect(divElement.exists()).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
