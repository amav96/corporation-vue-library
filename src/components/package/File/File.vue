<script lang='ts' setup>
import { toRefs, computed, reactive, ref, watch, nextTick } from 'vue';
import { isEmpty } from "@services/utils/Validations";
import { Validator } from '@services/utils/Validator';
import {  PropsFilePropType } from "@packageTypes"
import { removeSpaces } from '@services/utils/Formatters';
import { allowedFiles } from '@services/utils/Image';
import { removeDuplicates } from '@services/utils/Property';

const props = defineProps({
    ...PropsFilePropType
});

const {
  accept,
  customClass,
  value,
  validations,
  disabled,
  state,
  errors,
  placeholder,
  listenForm,
  resetOnOpen
 } = toRefs(props);

const inputFile = ref<HTMLInputElement | null>(null)

const emit = defineEmits<{
  (e: "onChange", value: Array<object> | Array<File>): void;
  (e: "setError", value: boolean): void;
}>();

const localAccept = computed((): string => accept.value.join(","));

const uploadFile = async (evt: Event) =>  {
  let el = evt.target as HTMLInputElement
  let files = el.files as unknown as Array<File>
  if (files.length > 0) {
    emit("onChange", allowedFiles(files, accept.value));
  } else if(listenForm.value){
    emit('onChange', allowedFiles(files, accept.value))
  }
}

const dropFiles = (evt: DragEvent) =>  {
    evt.preventDefault();
    if (evt.dataTransfer?.files.length) {
    let files = evt.dataTransfer.files as unknown as Array<File>
    emit("onChange", allowedFiles(files, accept.value));
    }
}

const resetEvent = () =>  {
  if(resetOnOpen.value){
    emit("onChange", []);
  }
}

const handleClick = () => {
  if(!disabled.value){
    inputFile.value?.click()
    if(inputFile.value){
      // inicializamos para controlar el click fuera de la ventana
        initialize()
    }
  }
}

const initialize = () => {
  // asignamos a la ventana abierta el evento onfocus para
  // detectar cuando hacemos click fuera de ella
  document.body.onfocus = checkIt;
}

const checkIt = () => {
  // la hacer click fuera de la ventana ejecutamos las validaciones
  handleValidations(value.value as Array<File>)
  document.body.onfocus = null;
}

const errorMessages = ref<Array<string>>([])
const validate =  new Validator();
const handleValidations = (val: Array<File>) => {
  if(validations?.value){
    validate.validate(val, validations.value)
    if(!isEmpty(validate.getErrors)){
      errorMessages.value = validate.getErrors
      emit("setError", true)
    } else {
      errorMessages.value = []
      emit("setError", false)
    }
  }
}

watch(errors, async (value: Array<string>) =>  {
  errorMessages.value = await removeDuplicates(value)
  await nextTick()
  if(errorMessages.value.length > 0){
    emit("setError", true)
  }
});

const identification = () => {
  // esta identificacion es para poder trastearlo en los tests
  if(placeholder?.value){
    return removeSpaces(placeholder?.value) + '-file'
  } else {
    return '-file'
  }
}


</script>
<template>
    <div>
        <div
        :class="`
        ${identification()} ${customClass} cursor-pointer border-files d-flex flex-column justify-content-center align-items-center w-100
        ${isEmpty(errorMessages) ? 'color-files-normal' : 'color-files-error'}`"
        >
            <div
            @dragover.prevent
            @dragenter.prevent
            @drop="dropFiles($event)"
            @click="handleClick"
            class="border-files-box"
            >
            <div class="d-flex justify-content-center">
                <img src="../../../assets/nube-file.svg" />
            </div>
            <template v-if="!isEmpty(value)">
                Archivos seleccionados
            </template>
            <div v-else class="d-flex justify-content-center mt-1 cursor-pointer">
                <div class="text-center" style="line-height: 1.1; font-size: 14.8px">
                Soltá el archivo en este recuadro o
                <span :class="`${isEmpty(errorMessages) ? 'text-primary' : 'text-danger'}`">seleccionalo</span> desde tu dispositivo
                </div>
            </div>
            </div>
            <input
            v-show="false"
            @click="resetEvent()"
            @change="uploadFile"
            :accept="localAccept"
            multiple
            type="file"
            ref="inputFile"
            />
        </div>
        <template v-if="!state">
            <div class="d-flex invalid-feedback">
                <span class="text-danger " v-for="(err,index) in errorMessages">
                    <small>{{ errorMessages.length > 1 && index < errorMessages.length - 1 ? err + ', ' : err }}</small>
                </span>
            </div>
        </template>
    </div>
</template>