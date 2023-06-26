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
require("@testing-library/jest-dom");
var ModalForm_vue_1 = require("../ModalForm.vue");
var vue_1 = require("vue");
var inputs_1 = require("../../../../../tests/assets/inputs");
var bootstrap_vue_3_1 = require("bootstrap-vue-3");
var Routes_1 = require("@services/utils/Routes");
var Test_1 = require("@services/utils/Test");
describe('ModalForm component', function () {
    function mountFunction(component, $options) {
        if ($options === void 0) { $options = {}; }
        var app = vue_1.createApp(component);
        app.use(bootstrap_vue_3_1["default"]);
        return test_utils_1.mount(component, __assign({ plugins: [app] }, $options));
    }
    var originalFetch;
    afterEach(function () {
        global.fetch = originalFetch;
    });
    var formInputs = [
        inputs_1.nombreInput,
        inputs_1.descripcionInput,
        inputs_1.fechaNacimientoInput,
        inputs_1.paisSelect,
        inputs_1.mayorDeEdadInput,
        inputs_1.documentosInput,
    ];
    it('render correctly every input', function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper, textInput, textareaInput, dateInput, select, checkBox, file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        inputs: formInputs,
                        urlStore: Routes_1.Routes.ROLES.STORE,
                        urlUpdate: Routes_1.Routes.ROLES.UPDATE,
                        urlShow: Routes_1.Routes.ROLES.SHOW,
                        isEditMode: false,
                        visible: true,
                        resetAfterClose: ''
                    };
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve([]);
                        }
                    }); });
                    wrapper = mountFunction(ModalForm_vue_1["default"], {
                        props: propsData,
                        attachToDocument: true
                    });
                    wrapper.vm.internalVisible = true;
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    textInput = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    expect(textInput.exists()).toBe(true);
                    textareaInput = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    expect(textareaInput.exists()).toBe(true);
                    dateInput = wrapper.find("input[placeholder=\"" + inputs_1.fechaNacimientoInput.placeholder + "\"]");
                    expect(dateInput.exists()).toBe(true);
                    select = wrapper.find("[aria-owns=listbox-" + inputs_1.paisSelect.placeholder + "]");
                    expect(select.exists()).toBe(true);
                    checkBox = wrapper.find("input[name=\"checkbox-" + inputs_1.mayorDeEdadInput.key + "\"]");
                    expect(checkBox.exists()).toBe(true);
                    file = wrapper.find("." + inputs_1.documentosInput.placeholder + "-file");
                    expect(file.exists()).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('check value inputs when open to edit', function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper, textInput, valueText, textarea, valueTextarea;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        inputs: [
                            inputs_1.nombreInput,
                            inputs_1.descripcionInput
                        ],
                        urlStore: Routes_1.Routes.ROLES.STORE,
                        urlUpdate: Routes_1.Routes.ROLES.UPDATE,
                        updateRequestConfiguration: {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        },
                        urlShow: Routes_1.Routes.ROLES.SHOW,
                        isEditMode: false,
                        visible: '',
                        resetAfterClose: ''
                    };
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: {
                                    nombre: 'Martin',
                                    descripcion: 'Trabajador'
                                }
                            });
                        }
                    }); });
                    wrapper = mountFunction(ModalForm_vue_1["default"], {
                        props: propsData,
                        attachToDocument: true
                    });
                    wrapper.setProps({
                        isEditMode: true
                    });
                    wrapper.vm.internalVisible = true;
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                case 2:
                    _a.sent();
                    textInput = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    valueText = textInput.element.value;
                    textarea = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    valueTextarea = textarea.element.value;
                    expect(valueText).toEqual('Martin');
                    expect(valueTextarea).toEqual('Trabajador');
                    return [2 /*return*/];
            }
        });
    }); }, 1500);
    it('should send METHOD POST and correct object to backend when edit', function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper, textInput, textarea, formSubmit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        inputs: [
                            inputs_1.nombreInput,
                            inputs_1.descripcionInput
                        ],
                        urlStore: Routes_1.Routes.ROLES.STORE,
                        urlUpdate: Routes_1.Routes.ROLES.UPDATE,
                        updateRequestConfiguration: {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        },
                        urlShow: Routes_1.Routes.ROLES.SHOW,
                        isEditMode: true,
                        visible: true,
                        resetAfterClose: false
                    };
                    // Primer fetch para obtener la entidad
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: {
                                    nombre: 'Martin',
                                    descripcion: 'Trabajador'
                                }
                            });
                        }
                    }); });
                    wrapper = mountFunction(ModalForm_vue_1["default"], {
                        props: propsData,
                        attachToDocument: true
                    });
                    wrapper.setProps({
                        isEditMode: true
                    });
                    wrapper.vm.internalVisible = true;
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                case 2:
                    _a.sent();
                    textInput = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    textInput.setValue('Martin editado');
                    textarea = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    textarea.setValue('Trabajador editado');
                    global.fetch = originalFetch;
                    // segundo fetch para guardar al editar
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: [
                                    {
                                        nombre: 'Martin',
                                        descripcion: 'Trabajador'
                                    }
                                ]
                            });
                        }
                    }); });
                    formSubmit = wrapper.find('form');
                    return [4 /*yield*/, formSubmit.trigger('submit')];
                case 3:
                    _a.sent();
                    expect(fetch).toHaveBeenCalledWith(propsData.urlUpdate, __assign(__assign({}, propsData.updateRequestConfiguration), { body: JSON.stringify({
                            nombre: 'Martin editado',
                            descripcion: 'Trabajador editado'
                        }) }));
                    return [2 /*return*/];
            }
        });
    }); }, 1500);
    it('should send METHOD POST and default value with correct object to backend when edit', function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper, textInput, textarea, formSubmit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        inputs: [
                            inputs_1.nombreInput,
                            inputs_1.descripcionInput
                        ],
                        urlStore: Routes_1.Routes.ROLES.STORE,
                        urlUpdate: Routes_1.Routes.ROLES.UPDATE,
                        updateRequestConfiguration: {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        },
                        updateDefaultParams: {
                            _method: 'PATCH'
                        },
                        urlShow: Routes_1.Routes.ROLES.SHOW,
                        isEditMode: true,
                        visible: true,
                        resetAfterClose: false
                    };
                    // Primer fetch para obtener la entidad
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: {
                                    nombre: 'Martin',
                                    descripcion: 'Trabajador'
                                }
                            });
                        }
                    }); });
                    wrapper = mountFunction(ModalForm_vue_1["default"], {
                        props: propsData,
                        attachToDocument: true
                    });
                    wrapper.setProps({
                        isEditMode: true
                    });
                    wrapper.vm.internalVisible = true;
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                case 2:
                    _a.sent();
                    textInput = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    textInput.setValue('Martin editado');
                    textarea = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    textarea.setValue('Trabajador editado');
                    global.fetch = originalFetch;
                    // segundo fetch para guardar al editar
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: {
                                    nombre: 'Martin editado',
                                    descripcion: 'Trabajador editado'
                                }
                            });
                        }
                    }); });
                    formSubmit = wrapper.find('form');
                    return [4 /*yield*/, formSubmit.trigger('submit')];
                case 3:
                    _a.sent();
                    expect(fetch).toHaveBeenCalledWith(propsData.urlUpdate, __assign(__assign({}, propsData.updateRequestConfiguration), { body: JSON.stringify({
                            nombre: 'Martin editado',
                            descripcion: 'Trabajador editado',
                            _method: 'PATCH'
                        }) }));
                    return [2 /*return*/];
            }
        });
    }); }, 1500);
    it('should send METHOD POST and correct object to backend when create', function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper, textInput, textareaInput, formSubmit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        inputs: [
                            inputs_1.nombreInput,
                            inputs_1.descripcionInput
                        ],
                        urlStore: Routes_1.Routes.ROLES.STORE,
                        storeRequestConfiguration: {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        },
                        urlUpdate: Routes_1.Routes.ROLES.UPDATE,
                        urlShow: Routes_1.Routes.ROLES.SHOW,
                        isEditMode: false,
                        visible: '',
                        resetAfterClose: ''
                    };
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve([]);
                        }
                    }); });
                    wrapper = mountFunction(ModalForm_vue_1["default"], {
                        props: propsData,
                        attachToDocument: true
                    });
                    wrapper.vm.internalVisible = true;
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    textInput = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    textInput.setValue('Martin');
                    textareaInput = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    textareaInput.setValue('Trabajador');
                    formSubmit = wrapper.find('form');
                    return [4 /*yield*/, formSubmit.trigger('submit')];
                case 2:
                    _a.sent();
                    expect(fetch).toHaveBeenCalledWith(propsData.urlStore, __assign(__assign({}, propsData.storeRequestConfiguration), { body: JSON.stringify({
                            nombre: 'Martin',
                            descripcion: 'Trabajador'
                        }) }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should emit afterUpdate after edit', function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper, textInput, textarea, updated, formSubmit, emit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        inputs: [
                            inputs_1.nombreInput,
                            inputs_1.descripcionInput
                        ],
                        urlStore: Routes_1.Routes.ROLES.STORE,
                        urlUpdate: Routes_1.Routes.ROLES.UPDATE,
                        updateRequestConfiguration: {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        },
                        updateDefaultParams: {
                            _method: 'PATCH'
                        },
                        urlShow: Routes_1.Routes.ROLES.SHOW,
                        isEditMode: true,
                        visible: true,
                        resetAfterClose: false
                    };
                    // Primer fetch para obtener la entidad
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: {
                                    nombre: 'Martin',
                                    descripcion: 'Trabajador'
                                }
                            });
                        }
                    }); });
                    wrapper = mountFunction(ModalForm_vue_1["default"], {
                        props: propsData,
                        attachToDocument: true
                    });
                    wrapper.setProps({
                        isEditMode: true
                    });
                    wrapper.vm.internalVisible = true;
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                case 2:
                    _a.sent();
                    textInput = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    textInput.setValue('Martin editado');
                    textarea = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    textarea.setValue('Trabajador editado');
                    global.fetch = originalFetch;
                    updated = {
                        nombre: 'Martin editado',
                        descripcion: 'Trabajador editado'
                    };
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: updated
                            });
                        }
                    }); });
                    formSubmit = wrapper.find('form');
                    return [4 /*yield*/, formSubmit.trigger('submit')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                case 4:
                    _a.sent();
                    emit = wrapper.emitted();
                    expect(emit.afterUpdate[0][0]).toEqual(updated);
                    return [2 /*return*/];
            }
        });
    }); }, 1500);
    it('should emit afterStore after store', function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, created, wrapper, textInput, textareaInput, formSubmit, emit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        inputs: [
                            inputs_1.nombreInput,
                            inputs_1.descripcionInput
                        ],
                        urlStore: Routes_1.Routes.ROLES.STORE,
                        storeRequestConfiguration: {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        },
                        urlUpdate: Routes_1.Routes.ROLES.UPDATE,
                        urlShow: Routes_1.Routes.ROLES.SHOW,
                        isEditMode: false,
                        visible: true,
                        resetAfterClose: true
                    };
                    created = {
                        nombre: 'Martin',
                        descripcion: 'Trabajador'
                    };
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: created
                            });
                        }
                    }); });
                    wrapper = mountFunction(ModalForm_vue_1["default"], {
                        props: propsData,
                        attachToDocument: true
                    });
                    wrapper.vm.internalVisible = true;
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    textInput = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    textInput.setValue(created.nombre);
                    textareaInput = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    textareaInput.setValue(created.descripcion);
                    formSubmit = wrapper.find('form');
                    return [4 /*yield*/, formSubmit.trigger('submit')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                case 3:
                    _a.sent();
                    emit = wrapper.emitted();
                    expect(emit.afterStore[0][0]).toEqual(created);
                    return [2 /*return*/];
            }
        });
    }); });
});
