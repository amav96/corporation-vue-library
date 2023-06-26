"use strict";
exports.__esModule = true;
exports.nombreInput = {
    key: "nombre",
    type: "text",
    placeholder: "Nombre",
    value: "",
    state: null,
    cols: 6
};
exports.descripcionInput = {
    key: "descripcion",
    type: "textarea",
    placeholder: "Descripcion",
    value: "",
    state: null,
    cols: 6
};
exports.fechaNacimientoInput = {
    key: "fecha_nacimiento",
    type: "datetime",
    placeholder: "Fecha nacimiento",
    value: null,
    state: null,
    cols: 6
};
exports.paisSelect = {
    key: "pais",
    type: "select",
    placeholder: "Pais",
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
};
exports.mayorDeEdadInput = {
    key: "mayor_de_edad",
    type: "checkbox",
    option: true,
    value: null,
    state: null,
    cols: 6
};
exports.documentosInput = {
    key: "documentos",
    placeholder: 'Documentos',
    type: "file",
    value: null,
    state: null,
    cols: 6
};
