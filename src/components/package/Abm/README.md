const fields: any = ref([
      {
        key: 'id',
        label: '##'
      },
      {
        key: 'nombre',
        label: 'nombre',
      },
      {
        key: 'created_at',
        label: 'Fecha'
      },
      {
        key: 'edit',
        label: 'Editar'
      },
      {
        key: 'delete',
        label: 'Eliminar'
      },
    ])
const filterInputs = ref<Array<Inputs>>([
  { 
    key: "nombre",
    type : "text",
    placeholder : "Nombre",
    value : null,
    state : null,
    cols: 6,
  }
])
const formInputs = ref<Array<Inputs>>([
  { 
    key: "nombre",
    type : "text",
    placeholder : "Nombre",
    value : null,
    state : null,
    cols: 6,
    validations : {
      rules : {
        required: true
      }
    }
  },
])

const propAbm = reactive({
  fields: fields.value,
  filterInputs: filterInputs.value,
  formInputs: formInputs.value,
  urlIndex: Routes.CONTEXT.INDEX,
  urlStore: Routes.CONTEXT.STORE,
  urlUpdate: Routes.CONTEXT.UPDATE,
  urlShow: Routes.CONTEXT.SHOW,
  urlDelete: Routes.CONTEXT.DELETE,
  updateStore: 'keyInStore',
  addStore: 'keyInStore',
  deleteStore: 'keyInStore',
  softDelete: true,
  searchable: true,
})


</script>

<template>
  <div>
    <Abm
    :fields="propAbm.fields"
    :filterInputs="propAbm.filterInputs"
    :formInputs="propAbm.formInputs"
    :urlIndex="propAbm.urlIndex"
    :urlStore="propAbm.urlStore"
    :urlUpdate="propAbm.urlUpdate"
    :urlShow="propAbm.urlShow"
    :urlDelete="propAbm.urlDelete"
    :updateStore="propAbm.updateStore"
    :addStore="propAbm.addStore"
    :deleteStore="propAbm.deleteStore"
    :softDelete="propAbm.softDelete"
    :searchable="propAbm.searchable"
    />
  </div>
</template>