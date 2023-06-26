import baseApiUrl from "../BaseApiUrl";

function createRoute(path: string) {
  return {
    INDEX: baseApiUrl + '/api/' + path,
    STORE: baseApiUrl + '/api/' + path,
    UPDATE: baseApiUrl + '/api/' + path,
    SHOW: baseApiUrl + '/api/' + path,
    DELETE: baseApiUrl + '/api/' + path,
  };
}

export const Routes = {
  DATA_PROVIDER: {
    INDEX: baseApiUrl + '/api/dataProviders',
  },
  TRANSPORTADORES: createRoute('transportadores'),
  DOMICILIOS: createRoute('domicilios'),
  TERMINALES: createRoute('terminales'),
  CONTACTOS: createRoute('contactos'),
  DANIOS: createRoute('danios'),
  PARTES: createRoute('partes'),
  MODELOS: createRoute('modelos'),
  TIPO_EVENTOS: createRoute('eventos'),
  ROLES: createRoute('roles'),
};
