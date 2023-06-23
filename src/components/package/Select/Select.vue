<script lang='ts' setup>
import { toRefs, watch, nextTick, onMounted } from 'vue';
import { isEmpty } from "@services/utils/Validations";
import { useError } from '../../../composables/useError';
import { PropsSelectPropType } from "@packageTypes"
import VueMultiselect from "vue-multiselect";
import { removeSpaces } from '@services/utils/Formatters';
import { removeDuplicates } from '@services/utils/Property';

const props = defineProps({
  ...PropsSelectPropType
});

const {
  placeholder,
  value,
  customClass,
  validations,
  label,
  trackBy,
  multiple,
  searchable,
  options,
  disabled,
  errors,
  listenSelect,
  listenRemove,
  listenForm,
  id,
 } = toRefs(props);

 // End Props

// Emits
const emit = defineEmits<{
  (e: "update:model-value", value: string | number | object): void;
  (e: "setError", value: boolean): void;
  (e: "select", value: Array<object> | Array<string> | object): void;
  (e: "remove", value: Array<object> | Array<string> | object): void;
}>();

// LifeCycleHooks
onMounted(() => {
  if(multiple.value && Array.isArray(value?.value) && value?.value?.length && value?.value?.length > 0 &&  value?.value.some((v) => typeof v === 'number')){
    lookForObjectsByPropertiesArray(value?.value.filter((v) => typeof v === 'number' || typeof v === 'string'))
  } else if (!multiple.value &&  !Array.isArray(value?.value) && (typeof value?.value === 'number' || typeof value?.value === 'string')){
    lookForObjectByValue(value?.value)
  }
})

// Composables
const {errorMessages, isFormValid, handleValidations} = useError(validations?.value)

// Watchs
watch(errors, async (value: Array<string>) =>  {
  errorMessages.value = await removeDuplicates(value)
  await nextTick()
  if(errorMessages.value.length > 0){
    emit("setError", true)
  }
});


const lookForObjectsByPropertiesArray = (ArrayProperties: Array<number>) => {
  // cuando seteamos como valor un array de ids. Ejemplo: Pais = { value : [1,2,3] }
  // buscamos los objetos en el listado de opciones para setear los objetos encontrados como valor
  if(options?.value){
    let val : Array<object> | Array<string> | object = []
    const lookFor = options.value.filter((option) => ArrayProperties.includes(option[trackBy.value]))
    if(value?.value && Array.isArray(value?.value)){
      val = [...value?.value?.filter((val: object | Array<number|string>) => typeof val !== "number" && typeof val !== "string"), ...lookFor]
      emit("update:model-value", val);
      handleValidations(val)
    } else {
      emit("update:model-value", val);
      handleValidations(val)
    }
  }
}

const lookForObjectByValue = (value: number | string) => {
  // cuando seteamos un numero como value. Ejemplo: Pais = { value : 1}
  if(options?.value){
    const lookFor = options.value.filter((option) => value === option[trackBy.value])
    emit("update:model-value", lookFor[0]);
    handleValidations(lookFor)
  }
}

watch(value, async (val: any) =>  {
  if(multiple.value && Array.isArray(val) && val.length > 0 &&  val.some((v) => typeof v === 'number')){
    lookForObjectsByPropertiesArray(val.filter((v) => typeof v === 'number'))
  } else if (!multiple.value &&  !Array.isArray(val) && typeof val === 'number'){
    lookForObjectByValue(val)
  }
});

// Methods
const onSelect = (modelData: object | Array<string|object|number>) => {
  let val : Array<object> | Array<string> | object = {}
    if(multiple.value && Array.isArray(value?.value)){
    val = [...value?.value, ...[modelData]]
    emit("update:model-value", val);
    handleValidations(val)
  } else {
    val = modelData
    emit("update:model-value", modelData);
    handleValidations(modelData)
  }
  if(listenSelect?.value){
    emit("select", val)
  } else if(listenForm.value){
    emit('select', val)
  }
};

const onRemove = (modelData: object) => {
    let val : Array<object> | Array<string> | object
    if(multiple.value && value?.value && Array.isArray(value?.value)){
        val = value?.value.filter((val : object) => val[trackBy.value as keyof object] !== modelData[trackBy.value as keyof object])
        emit("update:model-value", val);
        handleValidations(val)
    } else {
        val = {}
        emit("update:model-value", val)
        handleValidations(val)
    }
    if(listenRemove?.value){
      emit("remove", modelData)
    }
};

const onClose = () => {
}

const identification = () => {
  if(id?.value){
    return removeSpaces(id.value)
  } else if (placeholder?.value){
    return removeSpaces(placeholder.value)
  }
}

</script>

<template>
  <div>
    <VueMultiselect
    :id="identification()"
    :class="[`${customClass ?? ''} ${!isFormValid ? '' : '' } `]"
    :model-value="value"
    :options="options"
    :track-by="trackBy"
    :label="label"
    :placeholder="placeholder"
    :searchable="searchable"
    :multiple="multiple"
    :disabled="disabled"
    @select="onSelect($event)"
    @remove="onRemove($event)"
    @close="onClose()"
    />
    <template v-if="!isEmpty(errorMessages)">
        <div class="d-flex invalid-feedback">
            <span class="text-danger " v-for="(err,index) in errorMessages">
                <small>{{ errorMessages.length > 1 && index < errorMessages.length - 1 ? err + ', ' : err }}</small>
            </span>
        </div>
    </template>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css">
</style>