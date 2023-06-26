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
var Form_vue_1 = require("../Form.vue");
var vue_1 = require("vue");
var inputs_1 = require("../../../../../tests/assets/inputs");
var Test_1 = require("@services/utils/Test");
var bootstrap_vue_3_1 = require("bootstrap-vue-3");
var Formatters_1 = require("@services/utils/Formatters");
describe('Form component', function () {
    function mountFunction(component, $options) {
        if ($options === void 0) { $options = {}; }
        var app = vue_1.createApp(component);
        app.use(bootstrap_vue_3_1["default"]);
        return test_utils_1.mount(component, __assign({ plugins: [app] }, $options));
    }
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
            propsData = {
                inputs: formInputs
            };
            wrapper = mountFunction(Form_vue_1["default"], {
                props: propsData
            });
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
        });
    }); });
    it('render slot inside', function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, slot, wrapper;
        return __generator(this, function (_a) {
            propsData = {
                inputs: [
                    {
                        key: 'body',
                        slot: true
                    }
                ]
            };
            slot = "<input type='text' placeholder='body' name='body' />";
            wrapper = mountFunction(Form_vue_1["default"], {
                props: propsData,
                slots: {
                    body: slot
                }
            });
            expect(wrapper.html()).toContain('<div class=\"col-12 justify-content-center align-items-center my-2\"><input type=\"text\" placeholder=\"body\" name=\"body\"></div>');
            return [2 /*return*/];
        });
    }); });
    it('should send correct object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var initialValues, propsData, wrapper, textInput, textareaInput, firstOption, checkBox, file, changeEvent, formSubmit, emit, expectedObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initialValues = {
                        nombre: 'Tomas',
                        descripcion: 'Excelente',
                        fecha_nacimiento: '03/05/2023 11:41',
                        pais: [{ nombre: "Argentina", id: 1 }],
                        mayor_de_edad: true,
                        documentos: [{ type: 'image/png' }, { type: 'image/jpg' }, { type: 'image/jpeg' }]
                    };
                    propsData = {
                        inputs: formInputs.map(function (input) {
                            if (input.key === 'fecha_nacimiento') {
                                return __assign(__assign({}, input), { value: '03/05/2023 11:41' });
                            }
                            else {
                                return input;
                            }
                        })
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData,
                        attachToDocument: true,
                        slots: {
                            buttons: '<button id="EnviarForm" type="submit"> Enviar formulario</button>'
                        }
                    });
                    textInput = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(initialValues.nombre)];
                case 1:
                    _a.sent();
                    textareaInput = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    return [4 /*yield*/, textareaInput.setValue(initialValues.descripcion)];
                case 2:
                    _a.sent();
                    firstOption = Test_1.getOptionMultiSelect(wrapper, 'Pais', 'Pais-0');
                    return [4 /*yield*/, firstOption.trigger('click')];
                case 3:
                    _a.sent();
                    checkBox = wrapper.find("input[name=\"checkbox-" + inputs_1.mayorDeEdadInput.key + "\"]");
                    expect(checkBox.exists()).toBe(true);
                    return [4 /*yield*/, checkBox.setValue(initialValues.mayor_de_edad)];
                case 4:
                    _a.sent();
                    file = wrapper.find("." + inputs_1.documentosInput.placeholder + "-file input[type=\"file\"]");
                    changeEvent = new Event('change', { bubbles: true });
                    Object.defineProperty(file.element, 'files', {
                        value: initialValues.documentos
                    });
                    file.element.dispatchEvent(changeEvent);
                    formSubmit = wrapper.find('form');
                    return [4 /*yield*/, formSubmit.trigger('submit')];
                case 5:
                    _a.sent();
                    emit = wrapper.emitted();
                    expectedObject = {
                        items: initialValues,
                        isFormValid: true
                    };
                    expect(emit.onSubmit[0][0]).toEqual(expectedObject);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be isFormValid false', function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper, formSubmit, emit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        inputs: formInputs.map(function (input) {
                            return __assign(__assign({}, input), { validations: {
                                    rules: { required: true }
                                } });
                        })
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData,
                        attachToDocument: true,
                        slots: {
                            buttons: '<button id="EnviarForm" type="submit"> Enviar formulario</button>'
                        }
                    });
                    formSubmit = wrapper.find('form');
                    return [4 /*yield*/, formSubmit.trigger('submit')];
                case 1:
                    _a.sent();
                    emit = wrapper.emitted();
                    expect(emit.onSubmit[0][0].isFormValid).toEqual(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should set erros in every input', function () { return __awaiter(void 0, void 0, void 0, function () {
        var formInputsa, propsData, wrapper, expectedErrors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formInputsa = [
                        inputs_1.nombreInput,
                        inputs_1.descripcionInput,
                        inputs_1.fechaNacimientoInput,
                        inputs_1.paisSelect,
                        inputs_1.mayorDeEdadInput,
                        inputs_1.documentosInput,
                    ];
                    propsData = {
                        inputs: formInputsa.map(function (input) {
                            return __assign(__assign({}, input), { validations: {
                                    rules: { required: true }
                                } });
                        })
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData
                    });
                    wrapper.vm.isValid();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    expectedErrors = ['Es obligatorio'];
                    wrapper.vm.generatedForm.forEach(function (obj) {
                        expect(obj.errors).toEqual(expectedErrors);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should format correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var initialValues, propsData, wrapper, textInput, textareaInput, firstOption, checkBox, file, changeEvent, formSubmit, emit, expectedObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initialValues = {
                        nombre: 'Tomas',
                        descripcion: 'Excelente',
                        fecha_nacimiento: '03/05/2023 11:41',
                        pais: [{ nombre: "Argentina", id: 1 }],
                        mayor_de_edad: true,
                        documentos: [{ type: 'image/png' }, { type: 'image/jpg' }, { type: 'image/jpeg' }]
                    };
                    propsData = {
                        inputs: formInputs.map(function (input) {
                            if (input.key === 'fecha_nacimiento') {
                                return __assign(__assign({}, input), { value: '03/05/2023 11:41' });
                            }
                            else if (input.key === 'pais') {
                                return __assign(__assign({}, input), { formatValue: function (item) {
                                        return Formatters_1.getValuesInArrayObjects(item);
                                    } });
                            }
                            else {
                                return input;
                            }
                        })
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData,
                        attachToDocument: true,
                        slots: {
                            buttons: '<button id="EnviarForm" type="submit"> Enviar formulario</button>'
                        }
                    });
                    textInput = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(initialValues.nombre)];
                case 1:
                    _a.sent();
                    textareaInput = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    return [4 /*yield*/, textareaInput.setValue(initialValues.descripcion)];
                case 2:
                    _a.sent();
                    firstOption = Test_1.getOptionMultiSelect(wrapper, 'Pais', 'Pais-0');
                    return [4 /*yield*/, firstOption.trigger('click')];
                case 3:
                    _a.sent();
                    checkBox = wrapper.find("input[name=\"checkbox-" + inputs_1.mayorDeEdadInput.key + "\"]");
                    expect(checkBox.exists()).toBe(true);
                    return [4 /*yield*/, checkBox.setValue(initialValues.mayor_de_edad)
                        // await checkBox.trigger('click')
                    ];
                case 4:
                    _a.sent();
                    file = wrapper.find("." + inputs_1.documentosInput.placeholder + "-file input[type=\"file\"]");
                    changeEvent = new Event('change', { bubbles: true });
                    Object.defineProperty(file.element, 'files', {
                        value: initialValues.documentos
                    });
                    file.element.dispatchEvent(changeEvent);
                    formSubmit = wrapper.find('form');
                    return [4 /*yield*/, formSubmit.trigger('submit')];
                case 5:
                    _a.sent();
                    emit = wrapper.emitted();
                    expectedObject = {
                        items: __assign(__assign({}, initialValues), { pais: [1] }),
                        isFormValid: true
                    };
                    expect(emit.onSubmit[0][0]).toEqual(expectedObject);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reset values correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var initialValues, propsData, wrapper, textInput, textareaInput, firstOption, checkBox, file, changeEvent, formSubmit, expectObject, expectArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initialValues = {
                        nombre: 'Tomas',
                        descripcion: 'Excelente',
                        fecha_nacimiento: '03/05/2023 11:41',
                        pais: [{ nombre: "Argentina", id: 1 }],
                        mayor_de_edad: true,
                        documentos: [{ type: 'image/png' }, { type: 'image/jpg' }, { type: 'image/jpeg' }]
                    };
                    propsData = {
                        inputs: formInputs.map(function (input) {
                            if (input.key === 'fecha_nacimiento') {
                                return __assign(__assign({}, input), { value: '03/05/2023 11:41' });
                            }
                            else {
                                return input;
                            }
                        })
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData,
                        attachToDocument: true,
                        slots: {
                            buttons: '<button id="EnviarForm" type="submit"> Enviar formulario</button>'
                        }
                    });
                    textInput = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(initialValues.nombre)];
                case 1:
                    _a.sent();
                    textareaInput = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    return [4 /*yield*/, textareaInput.setValue(initialValues.descripcion)];
                case 2:
                    _a.sent();
                    firstOption = Test_1.getOptionMultiSelect(wrapper, 'Pais', 'Pais-0');
                    return [4 /*yield*/, firstOption.trigger('click')];
                case 3:
                    _a.sent();
                    checkBox = wrapper.find("input[name=\"checkbox-" + inputs_1.mayorDeEdadInput.key + "\"]");
                    expect(checkBox.exists()).toBe(true);
                    return [4 /*yield*/, checkBox.setValue(initialValues.mayor_de_edad)];
                case 4:
                    _a.sent();
                    file = wrapper.find("." + inputs_1.documentosInput.placeholder + "-file input[type=\"file\"]");
                    changeEvent = new Event('change', { bubbles: true });
                    Object.defineProperty(file.element, 'files', {
                        value: initialValues.documentos
                    });
                    file.element.dispatchEvent(changeEvent);
                    formSubmit = wrapper.find('form');
                    return [4 /*yield*/, formSubmit.trigger('submit')];
                case 5:
                    _a.sent();
                    wrapper.vm.resetValues();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 6:
                    _a.sent();
                    expectObject = {
                        nombre: null,
                        descripcion: null,
                        fecha_nacimiento: null,
                        pais: null,
                        mayor_de_edad: null,
                        documentos: null
                    };
                    expect(wrapper.vm.formValues).toEqual(expectObject);
                    expectArray = [
                        {
                            key: 'nombre',
                            type: 'text',
                            placeholder: 'Nombre',
                            value: '',
                            state: null,
                            cols: 6
                        },
                        {
                            key: 'descripcion',
                            type: 'textarea',
                            placeholder: 'Descripcion',
                            value: '',
                            state: null,
                            cols: 6
                        },
                        {
                            key: 'fecha_nacimiento',
                            type: 'datetime',
                            placeholder: 'Fecha nacimiento',
                            value: '',
                            state: null,
                            cols: 6
                        },
                        {
                            key: 'pais',
                            type: 'select',
                            placeholder: 'Pais',
                            value: [],
                            options: [
                                { nombre: "Argentina", id: 1 },
                                { nombre: "Uruguay", id: 2 },
                                { nombre: "Paraguay", id: 3 },
                                { nombre: "Chile", id: 4 },
                                { nombre: "Ecuador", id: 5 }
                            ],
                            multiple: true,
                            state: null,
                            cols: 6
                        },
                        {
                            key: 'mayor_de_edad',
                            type: 'checkbox',
                            option: true,
                            value: null,
                            state: null,
                            cols: 6
                        },
                        {
                            key: 'documentos',
                            placeholder: 'Documentos',
                            type: 'file',
                            value: null,
                            state: null,
                            cols: 6
                        }
                    ];
                    expect(wrapper.vm.generatedForm).toEqual(expectArray);
                    return [2 /*return*/];
            }
        });
    }); });
    it('set value correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        inputs: [inputs_1.nombreInput]
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData
                    });
                    wrapper.vm.setValue({ key: 'nombre', value: 'tomasito' });
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    expect(wrapper.vm.formValues.nombre).toEqual('tomasito');
                    return [2 /*return*/];
            }
        });
    }); });
    it('checkbox should emit event -> switch when have listenChange=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newCheckBox, propsData, wrapper, checkBox, emit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newCheckBox = __assign(__assign({}, inputs_1.mayorDeEdadInput), { listenChange: true });
                    propsData = {
                        inputs: [newCheckBox]
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData
                    });
                    checkBox = wrapper.find("input[name=\"checkbox-" + inputs_1.mayorDeEdadInput.key + "\"]");
                    return [4 /*yield*/, checkBox.setValue(true)];
                case 1:
                    _a.sent();
                    emit = wrapper.emitted();
                    expect(emit["switch"][0][0]).toEqual({
                        value: true,
                        input: newCheckBox
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('checkbox should emit event -> getValues when have listenForm=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newCheckBox, propsData, wrapper, checkBox;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newCheckBox = __assign(__assign({}, inputs_1.mayorDeEdadInput), { listenForm: true });
                    propsData = {
                        inputs: [newCheckBox]
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData
                    });
                    checkBox = wrapper.find("input[name=\"checkbox-" + inputs_1.mayorDeEdadInput.key + "\"]");
                    return [4 /*yield*/, checkBox.setValue(true)];
                case 1:
                    _a.sent();
                    expect(wrapper.emitted().getValues).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('date should emit event -> datePicker when have listenChange=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newDate, propsData, wrapper, newValue;
        return __generator(this, function (_a) {
            newDate = __assign(__assign({}, inputs_1.fechaNacimientoInput), { listenChange: true });
            propsData = {
                inputs: [newDate]
            };
            wrapper = mountFunction(Form_vue_1["default"], {
                props: propsData
            });
            newValue = '03/05/2023 11:41';
            // Llamamos manualmente a este metodo porque no hay manera de simular la apertura del date y seleccionar una fech
            wrapper.vm.onDatePicker(newValue, { listenChange: true });
            expect(wrapper.emitted().datePicker).toBeTruthy();
            return [2 /*return*/];
        });
    }); });
    it('date should emit event -> getValues when have listenForm=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newDate, propsData, wrapper, newValue;
        return __generator(this, function (_a) {
            newDate = __assign(__assign({}, inputs_1.fechaNacimientoInput), { listenForm: true });
            propsData = {
                inputs: [newDate]
            };
            wrapper = mountFunction(Form_vue_1["default"], {
                props: propsData
            });
            newValue = '03/05/2023 11:41';
            // Llamamos manualmente a este metodo porque no hay manera de simular la apertura del date y seleccionar una fech
            wrapper.vm.onDatePicker(newValue, { listenForm: true });
            expect(wrapper.emitted().getValues).toBeTruthy();
            return [2 /*return*/];
        });
    }); });
    it('Select should emit event -> select when have listenSelect=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newSelect, propsData, wrapper, element, firstOption, emit, objectExpected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newSelect = __assign(__assign({}, inputs_1.paisSelect), { listenSelect: true });
                    propsData = {
                        inputs: [newSelect]
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData
                    });
                    element = wrapper.find('[aria-owns="listbox-Pais"]');
                    return [4 /*yield*/, element.trigger('click')];
                case 1:
                    _a.sent();
                    firstOption = Test_1.getOptionMultiSelect(wrapper, 'Pais', 'Pais-0');
                    return [4 /*yield*/, firstOption.trigger('click')];
                case 2:
                    _a.sent();
                    emit = wrapper.emitted();
                    objectExpected = {
                        value: [newSelect.options[0]],
                        input: newSelect
                    };
                    expect(emit.select[0][0]).toEqual(objectExpected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Select should emit event -> getValues when have listenForm=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newSelect, propsData, wrapper, element, firstOption;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newSelect = __assign(__assign({}, inputs_1.paisSelect), { listenForm: true });
                    propsData = {
                        inputs: [newSelect]
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData
                    });
                    element = wrapper.find('[aria-owns="listbox-Pais"]');
                    return [4 /*yield*/, element.trigger('click')];
                case 1:
                    _a.sent();
                    firstOption = Test_1.getOptionMultiSelect(wrapper, 'Pais', 'Pais-0');
                    return [4 /*yield*/, firstOption.trigger('click')];
                case 2:
                    _a.sent();
                    expect(wrapper.emitted().getValues).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Select should emit event -> remove when have listenRemove=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newSelect, propsData, wrapper, element, firstOption, emit, objectExpected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newSelect = __assign(__assign({}, inputs_1.paisSelect), { listenRemove: true });
                    propsData = {
                        inputs: [newSelect]
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData
                    });
                    element = wrapper.find('[aria-owns="listbox-Pais"]');
                    return [4 /*yield*/, element.trigger('click')];
                case 1:
                    _a.sent();
                    firstOption = Test_1.getOptionMultiSelect(wrapper, 'Pais', 'Pais-0');
                    return [4 /*yield*/, firstOption.trigger('click')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, firstOption.trigger('click')];
                case 4:
                    _a.sent();
                    emit = wrapper.emitted();
                    objectExpected = {
                        value: newSelect.options[0],
                        input: newSelect
                    };
                    expect(emit.remove[0][0]).toEqual(objectExpected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Input should emit event -> focus when have listenFocus=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newInput, propsData, wrapper, written, textInput, inputElement, emit, objectExpected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newInput = __assign(__assign({}, inputs_1.nombreInput), { listenFocus: true });
                    propsData = {
                        inputs: [newInput]
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData
                    });
                    written = 'juan de las casas';
                    textInput = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(written)];
                case 1:
                    _a.sent();
                    inputElement = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    return [4 /*yield*/, inputElement.trigger('focus')];
                case 2:
                    _a.sent();
                    emit = wrapper.emitted();
                    objectExpected = {
                        value: written,
                        input: newInput
                    };
                    expect(emit.focus[0][0]).toEqual(objectExpected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Input should emit event -> change when have listenChange=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newInput, propsData, wrapper, written, textInput, emit, objectExpected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newInput = __assign(__assign({}, inputs_1.nombreInput), { listenChange: true });
                    propsData = {
                        inputs: [newInput]
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData
                    });
                    written = 'juan de las casas';
                    textInput = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(written)];
                case 1:
                    _a.sent();
                    emit = wrapper.emitted();
                    objectExpected = {
                        value: written,
                        input: newInput
                    };
                    expect(emit.change[0][0]).toEqual(objectExpected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Input should emit event -> getValues when have listenForm=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newInput, propsData, wrapper, written, textInput, emit, objectExpected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newInput = __assign(__assign({}, inputs_1.nombreInput), { listenForm: true });
                    propsData = {
                        inputs: [newInput]
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData
                    });
                    written = 'juan de las casas';
                    textInput = wrapper.find("input[placeholder=\"" + inputs_1.nombreInput.placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(written)];
                case 1:
                    _a.sent();
                    emit = wrapper.emitted();
                    objectExpected = {
                        nombre: written
                    };
                    expect(emit.getValues[0][0]).toEqual(objectExpected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Textarea should emit event -> focus when have listenFocus=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newTextarea, propsData, wrapper, written, textInput, inputElement, emit, objectExpected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newTextarea = __assign(__assign({}, inputs_1.descripcionInput), { listenFocus: true });
                    propsData = {
                        inputs: [newTextarea]
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData
                    });
                    written = 'juan de las casas';
                    textInput = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(written)];
                case 1:
                    _a.sent();
                    inputElement = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    return [4 /*yield*/, inputElement.trigger('focus')];
                case 2:
                    _a.sent();
                    emit = wrapper.emitted();
                    objectExpected = {
                        value: written,
                        input: newTextarea
                    };
                    expect(emit.focus[0][0]).toEqual(objectExpected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Textarea should emit event -> change when have listenChange=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newTextarea, propsData, wrapper, written, textInput, emit, objectExpected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newTextarea = __assign(__assign({}, inputs_1.descripcionInput), { listenChange: true });
                    propsData = {
                        inputs: [newTextarea]
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData
                    });
                    written = 'juan de las casas';
                    textInput = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(written)];
                case 1:
                    _a.sent();
                    emit = wrapper.emitted();
                    objectExpected = {
                        value: written,
                        input: newTextarea
                    };
                    expect(emit.change[0][0]).toEqual(objectExpected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Textarea should emit event -> getValues when have listenForm=true', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newTextarea, propsData, wrapper, written, textInput, emit, objectExpected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newTextarea = __assign(__assign({}, inputs_1.descripcionInput), { listenForm: true });
                    propsData = {
                        inputs: [newTextarea]
                    };
                    wrapper = mountFunction(Form_vue_1["default"], {
                        props: propsData
                    });
                    written = 'juan de las casas';
                    textInput = wrapper.find("textarea[placeholder=\"" + inputs_1.descripcionInput.placeholder + "\"]");
                    return [4 /*yield*/, textInput.setValue(written)];
                case 1:
                    _a.sent();
                    emit = wrapper.emitted();
                    objectExpected = {
                        descripcion: written
                    };
                    expect(emit.getValues[0][0]).toEqual(objectExpected);
                    return [2 /*return*/];
            }
        });
    }); });
});
