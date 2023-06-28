<script setup lang="ts" >
import { toRefs, computed, ref, watch, nextTick } from 'vue';
import { InputType } from "bootstrap-vue-next";
import { generateId } from '@services/utils/GenerateId';
import {ErrorsForm} from '../ErrorsForm';
import { useError } from '../../../composables/useError';
import { isEmpty } from '@services/utils/Validations';
import { PropsInputPropType } from "@packageTypes"
import { removeDuplicates } from '@services/utils/Property';
import {BFormInput} from 'bootstrap-vue-next';

// Props

const props = defineProps({
  ...PropsInputPropType,
});

const {
  placeholder,
  value,
  type,
  disabled,
  state,
  customClass,
  validations,
  errors,
  listenChange,
  listenForm,
  listenFocus,
  preppendClass,
  iconLeft
} = toRefs(props);
//End Props

// Computed Properties
const inputType = computed((): InputType => type.value as InputType);

//Emits
const emit = defineEmits<{
  (e: "update:model-value", value: string): void;
  (e: "setError", value: boolean | null): void;
  (e: "onChange", value: string): void;
  (e: "onFocus", value: string): void;

}>();


// Composables Functions
const { hasError, errorMessages , handleValidations } = useError(validations?.value)

// Watchs
watch(hasError, (value: boolean | null) => {
  emit("setError", value)
});

watch(errors, async (value: Array<string>) =>  {
  errorMessages.value = await removeDuplicates(value)
  await nextTick()
  if(errorMessages.value.length > 0){
    emit("setError", true)
  }
});

// Methods
const onChange = (value: string) => {
  emit("update:model-value", value);
  handleValidations(value)
  if(listenChange.value){
    emit('onChange', value)
  } else if(listenForm.value){
    emit('onChange', value)
  }
};

const onBlur = (event : Event) => {
  let el = event.target as HTMLInputElement
  handleValidations(el.value)
}

// Watchs
watch(hasError, (value: boolean | null) =>  {
  emit("setError", value)
});

watch(errors, async (value: Array<string>) =>  {
  errorMessages.value = await removeDuplicates(value)
  await nextTick()
  if(errorMessages.value.length > 0){
    emit("setError", true)
  }
});

const id = ref<string>('')
const getId = (): string => {
  id.value = placeholder?.value ? placeholder?.value.replace(/\s/g, '').replace(/[^\w\s]/gi, '') : `${generateId()}`
  return id.value
}

const onFocus = (event: Event) => {
  let el = event.target as HTMLInputElement
  if(listenFocus.value){
    emit('onFocus', el.value)
  }
}
</script>

<template>
  <div role="group">
    <div class="input-group">
      <div v-if="iconLeft" :class="preppendClass">
        <img
        :src="iconLeft"
        >
      </div>
        <BFormInput
          :class="`${customClass} input-global`"
          :id="getId()"
          @input="onChange($event)"
          @blur="onBlur($event)"
          @focus="onFocus"
          :modelValue="(value as string)"
          :type="inputType"
          :placeholder="placeholder"
          :state="state !== null ? !state : null"
          :disabled="disabled"
          trim
        />
      </div>
      
      <ErrorsForm
      v-if="!isEmpty(errorMessages)"
      :errorMessages="errorMessages"
      :state="state !== null ? !state : null"
      />
  </div>
</template>
