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
var TextArea_vue_1 = require("../TextArea.vue");
var vue_1 = require("vue");
describe('TextArea component', function () {
    function mountFunction(component, options) {
        if (options === void 0) { options = {}; }
        return test_utils_1.mount(component, __assign({ global: {
                plugins: [bootstrap_vue_3_1["default"]]
            } }, options));
    }
    it('renders an TextArea with all the provided props', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, type, state, customClass, validations, errors, listenChange, listenForm, listenFocus, wrapper, inputElement;
        return __generator(this, function (_a) {
            placeholder = 'Test Placeholder';
            value = '';
            type = 'text';
            state = false;
            customClass = 'test-class';
            validations = { rules: { required: true } };
            errors = [];
            listenChange = true;
            listenForm = false;
            listenFocus = false;
            wrapper = mountFunction(TextArea_vue_1["default"], {
                props: {
                    placeholder: placeholder,
                    value: value,
                    type: type,
                    state: state,
                    customClass: customClass,
                    validations: validations,
                    errors: errors,
                    listenChange: listenChange,
                    listenForm: listenForm,
                    listenFocus: listenFocus
                }
            });
            inputElement = wrapper.find('textarea');
            expect(inputElement.attributes('placeholder')).toBe(placeholder);
            expect(inputElement.attributes('type')).toBe(type);
            expect(inputElement.attributes('class')).toContain(customClass);
            expect(wrapper.vm.state).toEqual(state);
            expect(wrapper.vm.validations).toEqual(validations);
            expect(wrapper.vm.errors).toEqual(errors);
            expect(wrapper.vm.listenChange).toBe(listenChange);
            expect(wrapper.vm.listenForm).toBe(listenForm);
            expect(wrapper.vm.listenFocus).toBe(listenFocus);
            return [2 /*return*/];
        });
    }); });
    it('should emit update:model-value typing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, wrapper, write, textInput, valueInput;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    placeholder = 'Test Placeholder';
                    value = 'Test Value';
                    wrapper = mountFunction(TextArea_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value
                        }
                    });
                    write = 'juan de las casas';
                    textInput = wrapper.find("textarea[placeholder=\"" + placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(write)];
                case 1:
                    _b.sent();
                    valueInput = (_a = wrapper.emitted('update:model-value')) === null || _a === void 0 ? void 0 : _a[0][0];
                    expect(valueInput).toEqual(write);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should emit onChange typing when have listenChange=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, listenChange, wrapper, write, textInput, valueInput;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    placeholder = 'Test Placeholder';
                    value = '';
                    listenChange = true;
                    wrapper = mountFunction(TextArea_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            listenChange: listenChange
                        }
                    });
                    write = 'juan de las casas';
                    textInput = wrapper.find("textarea[placeholder=\"" + placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(write)];
                case 1:
                    _b.sent();
                    valueInput = (_a = wrapper.emitted('onChange')) === null || _a === void 0 ? void 0 : _a[0][0];
                    expect(valueInput).toEqual(write);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should emit onChange typing when have listenForm=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, listenForm, wrapper, write, textInput, valueInput;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    placeholder = 'Test Placeholder';
                    value = '';
                    listenForm = true;
                    wrapper = mountFunction(TextArea_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            listenForm: listenForm
                        }
                    });
                    write = 'juan de las casas';
                    textInput = wrapper.find("textarea[placeholder=\"" + placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(write)];
                case 1:
                    _b.sent();
                    valueInput = (_a = wrapper.emitted('onChange')) === null || _a === void 0 ? void 0 : _a[0][0];
                    expect(valueInput).toEqual(write);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should emit onFocus when focused TextArea', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, listenFocus, wrapper, write, textInput, inputElement, valueInput;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    placeholder = 'Test Placeholder';
                    value = '';
                    listenFocus = true;
                    wrapper = mountFunction(TextArea_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            listenFocus: listenFocus
                        }
                    });
                    write = 'juan de las casas';
                    textInput = wrapper.find("textarea[placeholder=\"" + placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(write)];
                case 1:
                    _b.sent();
                    inputElement = wrapper.find("textarea[placeholder=\"" + placeholder + "\"]");
                    return [4 /*yield*/, inputElement.trigger('focus')];
                case 2:
                    _b.sent();
                    valueInput = (_a = wrapper.emitted('onFocus')) === null || _a === void 0 ? void 0 : _a[0][0];
                    expect(valueInput).toEqual(write);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should render correctly errors when typing input and clear all', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, validations, wrapper, write, textInput, divElement, genereatedErrors, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Test Placeholder';
                    value = '';
                    validations = { rules: { required: true } };
                    wrapper = mountFunction(TextArea_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            validations: validations
                        }
                    });
                    write = 'juan de las casas';
                    textInput = wrapper.find("textarea[placeholder=\"" + placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(write)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, textInput.setValue('')];
                case 2:
                    _a.sent();
                    divElement = wrapper.find('div.invalid-feedback');
                    expect(divElement.exists()).toBe(true);
                    genereatedErrors = ['Es obligatorio'];
                    text = divElement.text();
                    expect(text).toContain(genereatedErrors[0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should render errors correctly when trigger blur event on TextArea', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, validations, wrapper, inputElement, divElement, genereatedErrors, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Test Placeholder';
                    value = '';
                    validations = { rules: { required: true } };
                    wrapper = mountFunction(TextArea_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            validations: validations
                        }
                    });
                    inputElement = wrapper.find("textarea[placeholder=\"" + placeholder + "\"]");
                    return [4 /*yield*/, inputElement.trigger('blur')];
                case 1:
                    _a.sent();
                    divElement = wrapper.find('div.invalid-feedback');
                    expect(divElement.exists()).toBe(true);
                    genereatedErrors = ['Es obligatorio'];
                    text = divElement.text();
                    expect(text).toContain(genereatedErrors[0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should render errors correctly when has external errors', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, validations, errors, wrapper, divElement, generatedErrors, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Test Placeholder';
                    value = '';
                    validations = { rules: { required: true } };
                    errors = vue_1.reactive([]);
                    wrapper = mountFunction(TextArea_vue_1["default"], {
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
                    divElement = wrapper.find('div.invalid-feedback');
                    expect(divElement.exists()).toBe(true);
                    generatedErrors = ['Es obligatorio'];
                    text = divElement.text();
                    expect(text).toContain(generatedErrors[0]);
                    return [2 /*return*/];
            }
        });
    }); }, 5000);
});
