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
var Select_vue_1 = require("../Select.vue");
var vue_1 = require("vue");
var Test_1 = require("@services/utils/Test");
describe('Select component', function () {
    function mountFunction(component, $options) {
        if ($options === void 0) { $options = {}; }
        var app = vue_1.createApp(component);
        app.use(bootstrap_vue_3_1["default"]);
        return test_utils_1.mount(component, __assign({ plugins: [app] }, $options));
    }
    var options = [
        {
            nombre: 'Argentina', id: 1
        },
        {
            nombre: 'Uruguay', id: 2
        },
        {
            nombre: 'Paraguay', id: 3
        },
        {
            nombre: 'Chile', id: 4
        },
        {
            nombre: 'Ecuador', id: 5
        },
    ];
    it('renders an Select correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, multiple, type, customClass, validations, errors, listenChange, listenForm, wrapper, element;
        return __generator(this, function (_a) {
            placeholder = 'Pais';
            value = [];
            multiple = true;
            type = 'select';
            customClass = 'test-class';
            validations = { rules: { required: true } };
            errors = [];
            listenChange = true;
            listenForm = false;
            wrapper = mountFunction(Select_vue_1["default"], {
                props: {
                    placeholder: placeholder,
                    value: value,
                    options: options,
                    multiple: multiple,
                    type: type,
                    customClass: customClass,
                    validations: validations,
                    errors: errors,
                    listenChange: listenChange,
                    listenForm: listenForm
                }
            });
            element = wrapper.element.querySelector('[aria-owns="listbox-Pais"]');
            expect(element).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('should emit Array object through update:model-value when select a option', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, multiple, type, customClass, validations, errors, listenChange, listenForm, wrapper, element, firstOption, emit, expectedArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Pais';
                    value = [];
                    multiple = true;
                    type = 'select';
                    customClass = 'test-class';
                    validations = { rules: { required: true } };
                    errors = [];
                    listenChange = true;
                    listenForm = false;
                    wrapper = mountFunction(Select_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            options: options,
                            multiple: multiple,
                            type: type,
                            customClass: customClass,
                            validations: validations,
                            errors: errors,
                            listenChange: listenChange,
                            listenForm: listenForm
                        }
                    });
                    element = wrapper.find('[aria-owns="listbox-Pais"]');
                    return [4 /*yield*/, element.trigger('click')];
                case 1:
                    _a.sent();
                    firstOption = Test_1.getOptionMultiSelect(wrapper, 'Pais', 'Pais-0');
                    return [4 /*yield*/, firstOption.trigger('click')];
                case 2:
                    _a.sent();
                    emit = wrapper.emitted('update:model-value');
                    expectedArray = [{ nombre: 'Argentina', id: 1 }];
                    expect(emit[0][0]).toEqual(expectedArray);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should emit object through emit update:model-value when select a option', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, multiple, type, customClass, validations, errors, listenChange, listenForm, wrapper, element, firstOption, emit, expectedObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Pais';
                    value = [];
                    multiple = false;
                    type = 'select';
                    customClass = 'test-class';
                    validations = { rules: { required: true } };
                    errors = [];
                    listenChange = true;
                    listenForm = false;
                    wrapper = mountFunction(Select_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            options: options,
                            multiple: multiple,
                            type: type,
                            customClass: customClass,
                            validations: validations,
                            errors: errors,
                            listenChange: listenChange,
                            listenForm: listenForm
                        }
                    });
                    element = wrapper.find('[aria-owns="listbox-Pais"]');
                    return [4 /*yield*/, element.trigger('click')];
                case 1:
                    _a.sent();
                    firstOption = Test_1.getOptionMultiSelect(wrapper, 'Pais', 'Pais-0');
                    return [4 /*yield*/, firstOption.trigger('click')];
                case 2:
                    _a.sent();
                    emit = wrapper.emitted('update:model-value');
                    expectedObject = { nombre: 'Argentina', id: 1 };
                    expect(emit[0][0]).toEqual(expectedObject);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should emit object through emit remove  when desSelect a option', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, multiple, type, customClass, validations, errors, listenChange, listenForm, listenRemove, wrapper, firstOption, secondOption, emit, expectedObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Pais';
                    value = [];
                    multiple = true;
                    type = 'select';
                    customClass = 'test-class';
                    validations = { rules: { required: true } };
                    errors = [];
                    listenChange = true;
                    listenForm = false;
                    listenRemove = true;
                    wrapper = mountFunction(Select_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            options: options,
                            multiple: multiple,
                            type: type,
                            customClass: customClass,
                            validations: validations,
                            errors: errors,
                            listenChange: listenChange,
                            listenForm: listenForm,
                            listenRemove: listenRemove
                        }
                    });
                    firstOption = Test_1.getOptionMultiSelect(wrapper, 'Pais', 'Pais-0');
                    return [4 /*yield*/, firstOption.trigger('click')];
                case 1:
                    _a.sent();
                    secondOption = Test_1.getOptionMultiSelect(wrapper, 'Pais', 'Pais-1');
                    return [4 /*yield*/, secondOption.trigger('click')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, wrapper.setProps({ value: [
                                {
                                    nombre: 'Argentina', id: 1
                                },
                                {
                                    nombre: 'Uruguay', id: 2
                                }
                            ] })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, secondOption.trigger('click')];
                case 5:
                    _a.sent();
                    emit = wrapper.emitted('remove');
                    expectedObject = { nombre: 'Uruguay', id: 2 };
                    expect(emit[0][0]).toEqual(expectedObject);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should render errors when value is empty before remove tags', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, multiple, type, customClass, validations, errors, wrapper, firstOption, secondOption, divElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Pais';
                    value = [];
                    multiple = true;
                    type = 'select';
                    customClass = 'test-class';
                    validations = { rules: { required: true } };
                    errors = [];
                    wrapper = mountFunction(Select_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            options: options,
                            multiple: multiple,
                            type: type,
                            customClass: customClass,
                            validations: validations,
                            errors: errors
                        }
                    });
                    firstOption = Test_1.getOptionMultiSelect(wrapper, 'Pais', 'Pais-0');
                    return [4 /*yield*/, firstOption.trigger('click')];
                case 1:
                    _a.sent();
                    secondOption = Test_1.getOptionMultiSelect(wrapper, 'Pais', 'Pais-1');
                    return [4 /*yield*/, secondOption.trigger('click')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, wrapper.setProps({ value: [
                                {
                                    nombre: 'Argentina', id: 1
                                },
                                {
                                    nombre: 'Uruguay', id: 2
                                }
                            ] })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, firstOption.trigger('click')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, secondOption.trigger('click')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, wrapper.setProps({ value: [] })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, wrapper.vm.handleValidations([])];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 10:
                    _a.sent();
                    divElement = wrapper.find('.invalid-feedback');
                    expect(divElement.exists()).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should render errors correctly when has external errors', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, multiple, validations, errors, wrapper, divElement, generatedErrors, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Pais';
                    value = [];
                    multiple = true;
                    validations = { rules: { required: true } };
                    errors = [];
                    wrapper = mountFunction(Select_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            validations: validations,
                            errors: errors,
                            multiple: multiple
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
    it('in the first render should process numbers array values in to objects array', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, multiple, type, wrapper, emit, expectedObject;
        return __generator(this, function (_a) {
            placeholder = 'Pais';
            value = [1, 2];
            multiple = true;
            type = 'select';
            wrapper = mountFunction(Select_vue_1["default"], {
                props: {
                    placeholder: placeholder,
                    value: value,
                    options: options,
                    multiple: multiple,
                    type: type
                }
            });
            emit = wrapper.emitted('update:model-value');
            expectedObject = [{ nombre: 'Argentina', id: 1 }, { nombre: 'Uruguay', id: 2 }];
            expect(emit[0][0]).toEqual(expectedObject);
            return [2 /*return*/];
        });
    }); });
    it('in the first render should process numbers value in to object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, multiple, type, wrapper, emit, expectedObject;
        return __generator(this, function (_a) {
            placeholder = 'Pais';
            value = 1;
            multiple = false;
            type = 'select';
            wrapper = mountFunction(Select_vue_1["default"], {
                props: {
                    placeholder: placeholder,
                    value: value,
                    options: options,
                    multiple: multiple,
                    type: type
                }
            });
            emit = wrapper.emitted('update:model-value');
            expectedObject = { nombre: 'Argentina', id: 1 };
            expect(emit[0][0]).toEqual(expectedObject);
            return [2 /*return*/];
        });
    }); });
});
