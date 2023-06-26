"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var vue_1 = require("vue");
exports.allowedFiles = function (files, accept) { return __spreadArrays(files).filter(function (f) { return accept.includes(f.type); }); };
exports.convertBase64 = function (image, name) {
    if (name === void 0) { name = 'img'; }
    console.log(image);
    return new Promise(function (resolve) {
        var typeImg = image.split('/')[1].split(';')[0];
        var arr = image.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        var nameImage = name.replace(/[^A-Za-z]/g, '').substr(0, 20) + image.split('/')[4].substr(-5);
        var numRamdon = Math.floor(Math.random() * 1000) + 1;
        while (n > 0) {
            n -= 1;
            u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new File([u8arr], numRamdon + "-" + nameImage + "." + typeImg, { type: mime });
        resolve(file);
    });
};
exports.convertFileToRender = function (file) {
    var buildImage = vue_1.reactive({
        readyState: 0,
        image: {
            base64: '',
            file: null,
            url: ''
        }
    });
    if (file) {
        if (file !== undefined && file !== '') {
            var reader_1 = new FileReader();
            buildImage.readyState = reader_1.readyState;
            reader_1.onload = function (e) { return __awaiter(void 0, void 0, void 0, function () {
                var image;
                return __generator(this, function (_a) {
                    buildImage.readyState = reader_1.readyState;
                    image = {
                        base64: e.target.result,
                        file: file,
                        url: ''
                    };
                    buildImage.image = image;
                    return [2 /*return*/];
                });
            }); };
            buildImage.readyState = reader_1.readyState;
            reader_1.readAsDataURL(file);
        }
    }
    return buildImage;
};
