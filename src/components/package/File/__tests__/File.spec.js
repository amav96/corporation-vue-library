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
var File_vue_1 = require("../File.vue");
var vue_1 = require("vue");
describe('Select component', function () {
    function mountFunction(component, $options) {
        if ($options === void 0) { $options = {}; }
        var app = vue_1.createApp(component);
        app.use(bootstrap_vue_3_1["default"]);
        return test_utils_1.mount(component, __assign({ plugins: [app] }, $options));
    }
    it('renders an File correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, validations, wrapper, element;
        return __generator(this, function (_a) {
            placeholder = 'Documentos';
            value = [];
            validations = { rules: { required: true } };
            wrapper = mountFunction(File_vue_1["default"], {
                props: {
                    placeholder: placeholder,
                    value: value,
                    validations: validations
                }
            });
            element = wrapper.element.querySelector('[aria-owns="listbox-Pais"]');
            expect(element).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('should render errors correctly when has external errors', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, validations, wrapper, divElement, generatedErrors, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Documentos';
                    value = [];
                    validations = { rules: { required: true } };
                    wrapper = mountFunction(File_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value,
                            validations: validations
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
    it('should emit onChange after trigger event change', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, wrapper, input, mockImages, changeEvent;
        return __generator(this, function (_a) {
            placeholder = 'Documento';
            value = [];
            wrapper = mountFunction(File_vue_1["default"], {
                props: {
                    placeholder: placeholder,
                    value: value
                }
            });
            input = wrapper.find('.Documento-file input[type="file"]');
            mockImages = [{ type: 'image/png' }, { type: 'image/jpg' }, { type: 'image/jpeg' }];
            changeEvent = new Event('change', { bubbles: true });
            Object.defineProperty(input.element, 'files', {
                value: mockImages
            });
            input.element.dispatchEvent(changeEvent);
            expect(wrapper.emitted()).toHaveProperty('onChange');
            return [2 /*return*/];
        });
    }); });
    it('should emit onChange with value expected', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, wrapper, mockImages, emit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Documento';
                    value = [];
                    wrapper = mountFunction(File_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value
                        }
                    });
                    mockImages = [{ type: 'image/png' }, { type: 'image/jpg' }, { type: 'image/jpeg' }];
                    return [4 /*yield*/, wrapper.vm.uploadFile({ target: { files: mockImages } })];
                case 1:
                    _a.sent();
                    emit = wrapper.emitted('onChange');
                    expect(emit[0][0]).toEqual(mockImages);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should emit onChange with values after trigger event drop', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, wrapper, contentFile, mockImages, emit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Documento';
                    value = [];
                    wrapper = mountFunction(File_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value
                        }
                    });
                    contentFile = wrapper.find('.Documento-file .border-files-box');
                    mockImages = [{ type: 'image/png' }, { type: 'image/jpg' }, { type: 'image/jpeg' }];
                    return [4 /*yield*/, contentFile.trigger('drop', { dataTransfer: { files: mockImages } })];
                case 1:
                    _a.sent();
                    emit = wrapper.emitted('onChange');
                    expect(wrapper.emitted()).toHaveProperty('onChange');
                    expect(emit[0][0]).toEqual(mockImages);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should emit empty onChange (reset every time when click)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, wrapper, input, emit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Documento';
                    value = [];
                    wrapper = mountFunction(File_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value
                        }
                    });
                    input = wrapper.find('.Documento-file input[type="file"]');
                    return [4 /*yield*/, input.trigger('click')];
                case 1:
                    _a.sent();
                    emit = wrapper.emitted('onChange');
                    expect(wrapper.emitted()).toHaveProperty('onChange');
                    expect(emit[0][0]).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should show text "Archivos seleccionados" when there is images)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var placeholder, value, wrapper, mockImages, content, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    placeholder = 'Documento';
                    value = [];
                    wrapper = mountFunction(File_vue_1["default"], {
                        props: {
                            placeholder: placeholder,
                            value: value
                        }
                    });
                    mockImages = [{ type: 'image/png' }, { type: 'image/jpg' }, { type: 'image/jpeg' }];
                    wrapper.setProps({ value: mockImages });
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    content = wrapper.find('.Documento-file');
                    text = content.text();
                    expect(text).toContain('Archivos seleccionados');
                    return [2 /*return*/];
            }
        });
    }); });
});
