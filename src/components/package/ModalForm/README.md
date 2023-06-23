
<!-- Ejemplo de como invocar el modal form desde un componente padre -->

const inputs = ref<Array<Inputs>>([
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
  }
])
const modalFormData = reactive({
  inputs: inputs.value,
  urlStore: Routes.ROLES.STORE,
  urlUpdate: Routes.ROLES.UPDATE,
  urlShow: Routes.ROLES.SHOW,
  isEditMode: false,
  visible: false
})

const onOpenEdit = () => {
  modalFormData.visible = true
  modalFormData.urlUpdate = `${Routes.ROLES.UPDATE}/${10}`
  modalFormData.urlShow = `${Routes.ROLES.SHOW}/${10}`
  modalFormData.isEditMode = true
}

const onOpenStore = () => {
  modalFormData.visible = true
  if(modalFormData.isEditMode){
    modalFormData.isEditMode = false
  }
}

// puedes usar la referencia
const refDashboard = ref<InstanceType<typeof Form> | null>(null)

<template>
  <div>
    <button
    @click="onOpenEdit"
    class="btn btn-warning">
      Editar
    </button>
    <button
    @click="onOpenStore"
    class="btn btn-success">
      Crear
    </button>
    <ModalForm
    :inputs="modalFormData.inputs" // los inptus a leer
    :urlStore="modalFormData.urlStore" // url para crear
    :urlUpdate="modalFormData.urlUpdate" // url para editar
    :urlShow="modalFormData.urlShow" // url para cuando editemos, poder completar los campos
    :isEditMode="modalFormData.isEditMode" // el modo en el que esta el formulario
    :visible="modalFormData.visible" // mostramos el form
    :resetAfterClose="true" // resetear el formulario luego de cerrar el modal
    @close="($event : boolean) => {
      modalFormData.visible = $event; // cerramos el form
      modalFormData.isEditMode = $event // reseteamos el isEditMode para que pueda funcionar correctamente
    }"
    ref="refDashboard"
    />
  </div>
</template>