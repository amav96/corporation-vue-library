export const nombreInput = {
    key: "nombre",
    type: "text",
    placeholder: "Nombre",
    value: "",
    state: null,
    cols: 6
};
  
export const descripcionInput = {
    key: "descripcion",
    type: "textarea",
    placeholder: "Descripcion",
    value: "",
    state: null,
    cols: 6
};
  
export const fechaNacimientoInput = {
    key: "fecha_nacimiento",
    type: "datetime",
    placeholder: "Fecha nacimiento",
    value: null,
    state: null,
    cols: 6
};
  
export const paisSelect = {
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
  
export const mayorDeEdadInput = {
    key: "mayor_de_edad",
    type: "checkbox",
    option: true,
    value: null,
    state: null,
    cols: 6
};
  
export const documentosInput = {
    key: "documentos",
    placeholder: 'Documentos',
    type: "file",
    value: null,
    state: null,
    cols: 6
};