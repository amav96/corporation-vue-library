<script lang='ts' setup>
import { ref, toRefs, computed, ComputedRef, watch, onMounted, PropType,  } from 'vue';
import {Form, Button} from "@package";
import { serializeParams } from '@services/utils/api';
import {useToast} from 'vue-toast-notification';
import { Inputs, requestConfiguration } from "@packageTypes"
import {BModal} from 'bootstrap-vue-3';

const props = defineProps({
    inputs: {
        type: Array as PropType<Inputs[]>,
        required: true
    },
    urlStore: {
        type: String,
        required: true
    },
    urlUpdate: {
        type: String,
        required: true
    },
    urlShow: {
        type: String,
    },
    isEditMode: {
        type: Boolean,
        required: true
    },
    visible: {
        type: Boolean,
        required: true
    },
    resetAfterClose: {
        type: Boolean,
        required: true
    },
    showRequestConfiguration:{
        type: Object as PropType<requestConfiguration>,
    },
    storeRequestConfiguration:{
        type: Object as PropType<requestConfiguration>,
    },
    updateRequestConfiguration:{
        type: Object as PropType<requestConfiguration>,
    },
    updateDefaultParams:{
        type: Object
    }
})

const {
    inputs,
    urlStore,
    urlUpdate,
    isEditMode,
    urlShow,
    visible,
    resetAfterClose,
    showRequestConfiguration,
    storeRequestConfiguration,
    updateRequestConfiguration,
    updateDefaultParams
 } = toRefs(props);

const emit = defineEmits<{
  (e: "afterStore", value: any): void;
  (e: "afterUpdate", value: any): void;
  (e: "close", value: boolean): void;
}>();

const $toast = useToast();

const generatedForm = ref<Array<Inputs>>([]);
const getInputs: ComputedRef<Array<Inputs>> = computed(() => {

  inputs.value.forEach(({key}, i) => {
    const index = generatedForm.value.map((input) => input.key).indexOf(key);
    // si ya existe el input
    if (index > -1) {
      // mergeo lo que tengo con lo que viene
      generatedForm.value[index] = {
        ...generatedForm.value[index],
        ...inputs.value[i],
      };

      generatedForm.value[i].value = inputs.value[i].value;
    } else {
      // si no existe, agrego el input
      generatedForm.value.push(inputs.value[i]);

      // si viene con valor, lo seteo
      if (inputs.value[i].value) {
        generatedForm.value[i].value = inputs.value[i].value;
      } else {
        generatedForm.value[i].value = null;

      }
    }
  });
  return generatedForm.value.filter((val) => !val.hidden);
});

const internalVisible = ref<boolean>(false)

const refModalForm = ref<InstanceType<typeof Form> | null>(null)
const hideModal = () :void => {
    if(resetAfterClose.value){
      refModalForm.value?.resetValues()
      refModalForm.value?.resetErrors()
      resetForm()
    }
    emit('close', false)
}
const handleOnSubmit = (data: any) => {
    const { items, isFormValid } = data
    if(!isEditMode.value) save({ items, isFormValid })
    else update({ items, isFormValid })
}

const loading = ref<boolean>(false);
const save = async ({ items, isFormValid } : any) => {
  if(!loading.value){
    loading.value = true
    if(isFormValid !== undefined && !isFormValid){
        $toast.info('Debes llenar el formulario correctamente');
    } else {
        try {

          let form : any = await serializeParams(items)
          if(form instanceof FormData === false && typeof form !== 'string'){
            form = JSON.stringify(form)
          }
          let params = {
              ...{
                method: "POST",
                body: form
              },
              ...storeRequestConfiguration?.value,
          }
          const response = await fetch(urlStore.value, params);
          const result = await response.json();

          loading.value = false
          const { data, error } = result
          if(!data || error){
              $toast.error('Ha ocurrido un error con el servidor');
          }else {
              $toast.success('Guardado correctamente');
              emit('afterStore', data)
              hideModal()
          }
        } catch (error) {
            loading.value = false
            $toast.error('Ha ocurrido un error con el servidor b2');
        }
    }
  }
}

const update = async ({ items, isFormValid } : any) => {
    if(!loading.value){
        loading.value = true
        if(isFormValid !== undefined && !isFormValid){
            $toast.info('Debes llenar el formulario correctamente');
        } else {
            try {
                let form : any = await serializeParams({...items,...updateDefaultParams?.value})
                if(form instanceof FormData === false && typeof form !== 'string'){
                  form = JSON.stringify(form)
                }
                let params = {
                    ...{
                        method: "PATCH",
                        body: form
                    },
                    ...updateRequestConfiguration?.value,
                }
                const response = await fetch(urlUpdate.value, params);
                const result = await response.json();

                loading.value = false
                const { data, error } = result
                if(!data || error){
                    $toast.error('Ha ocurrido un error con el servidor');
                }else {
                  $toast.success('Guardado correctamente');
                  emit('afterUpdate', data)
                  hideModal()
                }
            } catch (error) {
                loading.value = false
                $toast.error('Ha ocurrido un error con el servidor b2');
            }

        }
    }
}

const getEntity = async () => {
  if(urlShow?.value){
    let params = {
        ...{ method: "GET" },
        ...showRequestConfiguration?.value
    }
    const response = await fetch(urlShow.value, params);
    const result = await response.json();
    if(result.data) completeEntity(result.data)
  }
}

const completeEntity = (data : object) => {
  generatedForm.value.forEach((val, index) => {
    if(data.hasOwnProperty(val.key)){
      let property = data[val.key as keyof object];
      generatedForm.value[index].value = property
    }
  })
}

const resetForm = () => {
  generatedForm.value.forEach((val, index) => {
    if(val.value !== null && typeof val.value === 'object'){
      if(Array.isArray(val.value)){
        generatedForm.value[index].value = []
      } else {
        generatedForm.value[index].value = {}
      }
    } else if (typeof val.value === 'string') {
      generatedForm.value[index].value = ''
    } else {
      generatedForm.value[index].value = null
    }
  })
}

onMounted(() => isEditMode.value && getEntity())

// Watchs
watch(isEditMode, (value: boolean | null) =>  {
    if(value) getEntity()
});

watch(visible, (value: boolean) =>  internalVisible.value = value);

defineExpose({ resetForm })

</script>
<template>
  <div>
    <BModal
    :modelValue="internalVisible"
    hide-footer
    static
    @hide="hideModal"
    >
      <Form
      id="form-modalForm"
      v-if="inputs"
      :inputs="getInputs"
      ref="refModalForm"
      @onSubmit="handleOnSubmit"
      >
      <template #buttons>
        <div class="d-flex flex-row justify-content-end">
          <Button
          customClass="store-modalForm px-2"
          background="button-global--verde"
          text="Guardar"
          />
          <Button
          customClass="cancel-modalForm px-2 mx-2"
          background="button-global--rojo"
          text="Salir"
          type="button"
          @click="hideModal"
          />
        </div>
      </template>
      </Form>
    </BModal>
  </div>
</template>@services/utils/api