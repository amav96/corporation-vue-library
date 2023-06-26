"use strict";
exports.__esModule = true;
var BaseApiUrl_1 = require("../BaseApiUrl");
function createRoute(path) {
    return {
        INDEX: BaseApiUrl_1["default"] + '/api/' + path,
        STORE: BaseApiUrl_1["default"] + '/api/' + path,
        UPDATE: BaseApiUrl_1["default"] + '/api/' + path,
        SHOW: BaseApiUrl_1["default"] + '/api/' + path,
        DELETE: BaseApiUrl_1["default"] + '/api/' + path
    };
}
exports.Routes = {
    DATA_PROVIDER: {
        INDEX: BaseApiUrl_1["default"] + '/api/dataProviders'
    },
    TRANSPORTADORES: createRoute('transportadores'),
    DOMICILIOS: createRoute('domicilios'),
    TERMINALES: createRoute('terminales'),
    CONTACTOS: createRoute('contactos'),
    DANIOS: createRoute('danios'),
    PARTES: createRoute('partes'),
    MODELOS: createRoute('modelos'),
    TIPO_EVENTOS: createRoute('eventos'),
    ROLES: createRoute('roles')
};
