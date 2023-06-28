<script setup lang="ts" >
import { toRefs, computed, ref, watch, nextTick } from 'vue';
import { isEmpty } from "@services/utils/Validations";
import { generateId } from '@services/utils/GenerateId';
import { useError } from '../../../composables/useError';
import {ErrorsForm} from '../ErrorsForm';
import { PropsTextAreaPropType } from '@packageTypes';
import { removeDuplicates } from '@services/utils/Property';
import {BFormTextarea, InputType} from 'bootstrap-vue-next';

// Props
const props = defineProps({
  ...PropsTextAreaPropType
})

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
  } =
  toRefs(props);
// End Props

//Emits
const emit = defineEmits<{
  (e: "update:model-value", value: string): void;
  (e: "onChange", value: string): void;
  (e: "setError", value: boolean | null): void;
  (e: "onFocus", value: string): void;
}>();

// Composables Functions
const { errorMessages, hasError ,isFormValid , handleValidations } = useError(validations?.value)

// Computed Properties
const inputType = computed((): InputType => type.value as InputType);

// Watchs
watch(hasError, (value: boolean | null) =>  emit("setError", value));

watch(errors, async (value: Array<string>) =>  {
  errorMessages.value = await removeDuplicates(value)
  await nextTick()
  if(errorMessages.value.length > 0){
    emit("setError", true)
  }
});

// Methods
const onChange = (val: string) => {
  emit("update:model-value", val);
  handleValidations(val)
  if(listenChange.value){
    emit('onChange', val)
  } else if(listenForm.value){
    emit('onChange', val)
  }
};

const onBlur = (evt: Event) => {
  let el = evt.target as HTMLInputElement
  handleValidations(el.value)
}


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
    <BFormTextarea
      :class="[`${customClass} textarea-global`]"
      :id="getId()"
      @input="onChange($event)"
      @blur="onBlur($event)"
      @focus="onFocus"
      :modelValue="value"
      :type="inputType"
      :placeholder="placeholder"
      :state="state !== null ? !state : null"
      :disabled="disabled"
      :rows="rows"
      :max-rows="maxRows"
      trim
    />
    <ErrorsForm
      v-if="!isEmpty(errorMessages)"
      :error-messages="errorMessages"
      :state="state !== null ? !state : null"
    />
  </div>
</template>
