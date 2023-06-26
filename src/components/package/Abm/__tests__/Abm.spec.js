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
var Abm_vue_1 = require("../Abm.vue");
var vue_1 = require("vue");
var bootstrap_vue_3_1 = require("bootstrap-vue-3");
var Routes_1 = require("@services/utils/Routes");
var Test_1 = require("@services/utils/Test");
var BaseApiUrl_1 = require("@services/BaseApiUrl");
describe('ABM component', function () {
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
    var fields = [
        {
            key: 'id',
            label: '##',
            sortable: true
        },
        {
            key: 'descripcion',
            label: 'Descripcion'
        },
        {
            key: 'nombre',
            label: 'Nombre'
        },
        {
            key: 'edit',
            label: 'Editar'
        },
        {
            key: 'delete',
            label: 'Eliminar'
        },
    ];
    var filterInputs = [
        {
            key: "nombre",
            type: "text",
            placeholder: "Nombre",
            value: '',
            state: null,
            cols: 6
        },
        {
            key: "descripcion",
            type: "textarea",
            placeholder: "Descripcion",
            value: '',
            state: null,
            cols: 6
        },
    ];
    var formInputs = [
        {
            key: "nombre",
            type: "text",
            placeholder: "Nombre",
            value: null,
            state: null,
            cols: 6,
            validations: {
                rules: {
                    required: true
                }
            }
        },
    ];
    var propModalForm = {
        inputs: formInputs,
        urlStore: Routes_1.Routes.ROLES.STORE,
        urlUpdate: Routes_1.Routes.ROLES.UPDATE,
        urlShow: Routes_1.Routes.ROLES.SHOW,
        afterUpdate: function (data) {
        },
        afterStore: function (data) {
        },
        showRequestConfiguration: {
            method: 'GET',
            headers: {
                Authorization: 'token'
            }
        },
        updateRequestConfiguration: {
            method: 'POST',
            headers: {
                Authorization: 'token',
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8'
            }
        },
        storeRequestConfiguration: {
            method: 'POST',
            headers: {
                Authorization: 'token',
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8'
            }
        },
        updateDefaultParams: { '_method': 'PATCH' }
    };
    var propAbm = {
        deleteIcon: BaseApiUrl_1["default"] + "/icons/basura.svg",
        editIcon: BaseApiUrl_1["default"] + "/icons/editar.svg",
        restoreIcon: BaseApiUrl_1["default"] + "/icons/restaurar.svg",
        afterDelete: function (data) {
        },
        softDelete: true,
        deleteRequestConfiguration: {
            method: 'DELETE',
            headers: {
                Authorization: 'token'
            }
        }
    };
    var propTable = {
        fields: fields,
        inputs: filterInputs,
        url: Routes_1.Routes.ROLES.INDEX,
        requestConfiguration: {
            method: 'GET'
        },
        searchIcon: BaseApiUrl_1["default"] + "/icons/search.svg",
        searchable: true
    };
    it('should request to backend', function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper;
        return __generator(this, function (_a) {
            propsData = {
                table: propTable,
                modalForm: propModalForm,
                urlDelete: Routes_1.Routes.ROLES.DELETE,
                afterDelete: propAbm.afterDelete,
                editIcon: propAbm.editIcon,
                deleteIcon: propAbm.deleteIcon,
                restoreIcon: propAbm.restoreIcon,
                softDelete: propAbm.softDelete,
                deleteRequestConfiguration: propAbm.deleteRequestConfiguration
            };
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
            wrapper = mountFunction(Abm_vue_1["default"], {
                props: propsData,
                attachToDocument: true
            });
            expect(fetch).toHaveBeenCalledWith(propTable.url + '?page=1', propTable.requestConfiguration);
            return [2 /*return*/];
        });
    }); });
    it("should render button edit", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper;
        return __generator(this, function (_a) {
            propsData = {
                table: propTable,
                modalForm: propModalForm,
                urlDelete: Routes_1.Routes.ROLES.DELETE,
                afterDelete: propAbm.afterDelete,
                editIcon: propAbm.editIcon,
                deleteIcon: propAbm.deleteIcon,
                restoreIcon: propAbm.restoreIcon,
                softDelete: propAbm.softDelete,
                deleteRequestConfiguration: propAbm.deleteRequestConfiguration
            };
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
            wrapper = mountFunction(Abm_vue_1["default"], {
                props: propsData,
                attachToDocument: true
            });
            expect(wrapper.find('.edit-button-0').exists()).toBe(true);
            return [2 /*return*/];
        });
    }); });
    it("should render button delete", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper;
        return __generator(this, function (_a) {
            propsData = {
                table: propTable,
                modalForm: propModalForm,
                urlDelete: Routes_1.Routes.ROLES.DELETE,
                afterDelete: propAbm.afterDelete,
                editIcon: propAbm.editIcon,
                deleteIcon: propAbm.deleteIcon,
                restoreIcon: propAbm.restoreIcon,
                softDelete: propAbm.softDelete,
                deleteRequestConfiguration: propAbm.deleteRequestConfiguration
            };
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
            wrapper = mountFunction(Abm_vue_1["default"], {
                props: propsData,
                attachToDocument: true
            });
            expect(wrapper.find('.delete-button-0').exists()).toBe(true);
            return [2 /*return*/];
        });
    }); });
    it("should render button store", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper;
        return __generator(this, function (_a) {
            propsData = {
                table: propTable,
                modalForm: propModalForm,
                urlDelete: Routes_1.Routes.ROLES.DELETE,
                afterDelete: propAbm.afterDelete,
                editIcon: propAbm.editIcon,
                deleteIcon: propAbm.deleteIcon,
                restoreIcon: propAbm.restoreIcon,
                softDelete: propAbm.softDelete,
                deleteRequestConfiguration: propAbm.deleteRequestConfiguration
            };
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
            wrapper = mountFunction(Abm_vue_1["default"], {
                props: propsData,
                attachToDocument: true
            });
            expect(wrapper.find('.store-button').exists()).toBe(true);
            return [2 /*return*/];
        });
    }); });
    it("should not render button active when sofdelete is true", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper;
        return __generator(this, function (_a) {
            propsData = {
                table: propTable,
                modalForm: propModalForm,
                urlDelete: Routes_1.Routes.ROLES.DELETE,
                afterDelete: propAbm.afterDelete,
                editIcon: propAbm.editIcon,
                deleteIcon: propAbm.deleteIcon,
                restoreIcon: propAbm.restoreIcon,
                softDelete: false,
                deleteRequestConfiguration: propAbm.deleteRequestConfiguration
            };
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
            wrapper = mountFunction(Abm_vue_1["default"], {
                props: propsData,
                attachToDocument: true
            });
            expect(wrapper.find('.active-button').exists()).toBe(false);
            return [2 /*return*/];
        });
    }); });
    it("should not render button inactive when sofdelete is true", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper;
        return __generator(this, function (_a) {
            propsData = {
                table: propTable,
                modalForm: propModalForm,
                urlDelete: Routes_1.Routes.ROLES.DELETE,
                afterDelete: propAbm.afterDelete,
                editIcon: propAbm.editIcon,
                deleteIcon: propAbm.deleteIcon,
                restoreIcon: propAbm.restoreIcon,
                softDelete: false,
                deleteRequestConfiguration: propAbm.deleteRequestConfiguration
            };
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
            wrapper = mountFunction(Abm_vue_1["default"], {
                props: propsData,
                attachToDocument: true
            });
            expect(wrapper.find('.inactive-button').exists()).toBe(false);
            return [2 /*return*/];
        });
    }); });
    it("should render button active when sofdelete is true", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper;
        return __generator(this, function (_a) {
            propsData = {
                table: propTable,
                modalForm: propModalForm,
                urlDelete: Routes_1.Routes.ROLES.DELETE,
                afterDelete: propAbm.afterDelete,
                editIcon: propAbm.editIcon,
                deleteIcon: propAbm.deleteIcon,
                restoreIcon: propAbm.restoreIcon,
                softDelete: true,
                deleteRequestConfiguration: propAbm.deleteRequestConfiguration
            };
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
            wrapper = mountFunction(Abm_vue_1["default"], {
                props: propsData,
                attachToDocument: true
            });
            expect(wrapper.find('.active-button').exists()).toBe(true);
            return [2 /*return*/];
        });
    }); });
    it("should render button inactive when sofdelete is true", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper;
        return __generator(this, function (_a) {
            propsData = {
                table: propTable,
                modalForm: propModalForm,
                urlDelete: Routes_1.Routes.ROLES.DELETE,
                afterDelete: propAbm.afterDelete,
                editIcon: propAbm.editIcon,
                deleteIcon: propAbm.deleteIcon,
                restoreIcon: propAbm.restoreIcon,
                softDelete: true,
                deleteRequestConfiguration: propAbm.deleteRequestConfiguration
            };
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
            wrapper = mountFunction(Abm_vue_1["default"], {
                props: propsData,
                attachToDocument: true
            });
            expect(wrapper.find('.inactive-button').exists()).toBe(true);
            return [2 /*return*/];
        });
    }); });
    it("should change edit parameters correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        table: propTable,
                        modalForm: propModalForm,
                        urlDelete: Routes_1.Routes.ROLES.DELETE,
                        afterDelete: propAbm.afterDelete,
                        editIcon: propAbm.editIcon,
                        deleteIcon: propAbm.deleteIcon,
                        restoreIcon: propAbm.restoreIcon,
                        deleteRequestConfiguration: propAbm.deleteRequestConfiguration
                    };
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: [
                                    {
                                        nombre: 'Martin',
                                        descripcion: 'Trabajador',
                                        id: 1
                                    }
                                ]
                            });
                        }
                    }); });
                    wrapper = mountFunction(Abm_vue_1["default"], {
                        props: propsData
                    });
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                case 1:
                    _a.sent();
                    wrapper.vm.onOpenEdit({
                        item: {
                            nombre: 'Martin',
                            descripcion: 'Trabajador',
                            id: 1
                        }
                    });
                    expect(wrapper.vm.modalFormData.urlUpdate).toEqual(propModalForm.urlUpdate + '/1');
                    expect(wrapper.vm.modalFormData.urlShow).toEqual(propModalForm.urlShow + '/1');
                    expect(wrapper.vm.modalFormData.visible).toEqual(true);
                    expect(wrapper.vm.modalFormData.isEditMode).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should change delete parameters correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper;
        return __generator(this, function (_a) {
            propsData = {
                table: propTable,
                modalForm: propModalForm,
                urlDelete: Routes_1.Routes.ROLES.DELETE,
                afterDelete: propAbm.afterDelete,
                editIcon: propAbm.editIcon,
                deleteIcon: propAbm.deleteIcon,
                restoreIcon: propAbm.restoreIcon,
                deleteRequestConfiguration: propAbm.deleteRequestConfiguration
            };
            global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                json: function () {
                    return Promise.resolve({
                        data: [
                            {
                                nombre: 'Martin',
                                descripcion: 'Trabajador',
                                id: 1
                            }
                        ]
                    });
                }
            }); });
            wrapper = mountFunction(Abm_vue_1["default"], {
                props: propsData
            });
            wrapper.vm.handleDelete({
                item: {
                    nombre: 'Martin',
                    descripcion: 'Trabajador',
                    id: 1
                }
            });
            expect(wrapper.html()).toContain('¿Estas seguro?');
            return [2 /*return*/];
        });
    }); });
    it("should do correct petition to backend", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper, buttonConfirm;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        table: propTable,
                        modalForm: propModalForm,
                        urlDelete: Routes_1.Routes.ROLES.DELETE,
                        afterDelete: propAbm.afterDelete,
                        editIcon: propAbm.editIcon,
                        deleteIcon: propAbm.deleteIcon,
                        restoreIcon: propAbm.restoreIcon,
                        deleteRequestConfiguration: propAbm.deleteRequestConfiguration
                    };
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: [
                                    {
                                        nombre: 'Martin',
                                        descripcion: 'Trabajador',
                                        id: 1
                                    }
                                ]
                            });
                        }
                    }); });
                    wrapper = mountFunction(Abm_vue_1["default"], {
                        props: propsData
                    });
                    wrapper.vm.handleDelete({
                        item: {
                            nombre: 'Martin',
                            descripcion: 'Trabajador',
                            id: 1
                        }
                    });
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: {
                                    nombre: 'Martin',
                                    descripcion: 'Trabajador',
                                    id: 1
                                }
                            });
                        }
                    }); });
                    buttonConfirm = wrapper.find('.dialog-0');
                    buttonConfirm.trigger('click');
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 2:
                    _a.sent();
                    expect(fetch).toHaveBeenCalledWith(Routes_1.Routes.ROLES.DELETE + '/1', propAbm.deleteRequestConfiguration);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should has deleted param when click inactive", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper, buttonInactive;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        table: propTable,
                        modalForm: propModalForm,
                        urlDelete: Routes_1.Routes.ROLES.DELETE,
                        afterDelete: propAbm.afterDelete,
                        editIcon: propAbm.editIcon,
                        deleteIcon: propAbm.deleteIcon,
                        restoreIcon: propAbm.restoreIcon,
                        softDelete: true
                    };
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: [
                                    {
                                        nombre: 'Martin',
                                        descripcion: 'Trabajador',
                                        id: 1
                                    }
                                ]
                            });
                        }
                    }); });
                    wrapper = mountFunction(Abm_vue_1["default"], {
                        props: propsData
                    });
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 2:
                    _a.sent();
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: []
                            });
                        }
                    }); });
                    buttonInactive = wrapper.find('.inactive-button');
                    buttonInactive.trigger('click');
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                case 4:
                    _a.sent();
                    expect(fetch).toHaveBeenCalledWith(Routes_1.Routes.ROLES.INDEX + '?page=1&deleted=true', propTable.requestConfiguration);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should has empty param when click active", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper, buttonInactive, buttonActive;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        table: propTable,
                        modalForm: propModalForm,
                        urlDelete: Routes_1.Routes.ROLES.DELETE,
                        afterDelete: propAbm.afterDelete,
                        editIcon: propAbm.editIcon,
                        deleteIcon: propAbm.deleteIcon,
                        restoreIcon: propAbm.restoreIcon,
                        softDelete: true
                    };
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: [
                                    {
                                        nombre: 'Martin',
                                        descripcion: 'Trabajador',
                                        id: 1
                                    }
                                ]
                            });
                        }
                    }); });
                    wrapper = mountFunction(Abm_vue_1["default"], {
                        props: propsData
                    });
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 2:
                    _a.sent();
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: []
                            });
                        }
                    }); });
                    buttonInactive = wrapper.find('.inactive-button');
                    buttonInactive.trigger('click');
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                case 4:
                    _a.sent();
                    buttonActive = wrapper.find('.active-button');
                    buttonActive.trigger('click');
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                case 6:
                    _a.sent();
                    expect(fetch).toHaveBeenCalledWith(Routes_1.Routes.ROLES.INDEX + '?page=1', propTable.requestConfiguration);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should dont exist edit in table when click inactive", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper, buttonInactive;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        table: propTable,
                        modalForm: propModalForm,
                        urlDelete: Routes_1.Routes.ROLES.DELETE,
                        afterDelete: propAbm.afterDelete,
                        editIcon: propAbm.editIcon,
                        deleteIcon: propAbm.deleteIcon,
                        restoreIcon: propAbm.restoreIcon,
                        softDelete: true
                    };
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: [
                                    {
                                        nombre: 'Martin',
                                        descripcion: 'Trabajador',
                                        id: 1
                                    }
                                ]
                            });
                        }
                    }); });
                    wrapper = mountFunction(Abm_vue_1["default"], {
                        props: propsData
                    });
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 150); })];
                case 2:
                    _a.sent();
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: []
                            });
                        }
                    }); });
                    buttonInactive = wrapper.find('.inactive-button');
                    buttonInactive.trigger('click');
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 150); })];
                case 4:
                    _a.sent();
                    expect(wrapper.find('.edit-button-0').exists()).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should exist restore in table when click inactive", function () { return __awaiter(void 0, void 0, void 0, function () {
        var propsData, wrapper, buttonInactive;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    propsData = {
                        table: propTable,
                        modalForm: propModalForm,
                        urlDelete: Routes_1.Routes.ROLES.DELETE,
                        afterDelete: propAbm.afterDelete,
                        editIcon: propAbm.editIcon,
                        deleteIcon: propAbm.deleteIcon,
                        restoreIcon: propAbm.restoreIcon,
                        softDelete: true
                    };
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: [
                                    {
                                        nombre: 'Martin',
                                        descripcion: 'Trabajador',
                                        id: 1
                                    }
                                ]
                            });
                        }
                    }); });
                    wrapper = mountFunction(Abm_vue_1["default"], {
                        props: propsData
                    });
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 150); })];
                case 2:
                    _a.sent();
                    global.fetch = jest.fn().mockImplementation(function () { return Test_1.mockFetch({
                        json: function () {
                            return Promise.resolve({
                                data: [
                                    {
                                        nombre: 'Martin',
                                        descripcion: 'Trabajador',
                                        id: 1
                                    }
                                ]
                            });
                        }
                    }); });
                    buttonInactive = wrapper.find('.inactive-button');
                    buttonInactive.trigger('click');
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 150); })];
                case 4:
                    _a.sent();
                    expect(wrapper.find('.restore-button-0').exists()).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
