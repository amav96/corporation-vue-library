<script lang='ts' setup>
import { toRefs, reactive, watch, nextTick } from 'vue';
import { isEmpty } from '@services/utils/Validations';
import { useError } from '../../../composables/useError';
import {ErrorsForm} from '@package';
import { CheckBoxPropType } from "@packageTypes"
import { removeDuplicates } from '@services/utils/Property';
import {BFormCheckbox} from 'bootstrap-vue-3';

const props = defineProps({
  ...CheckBoxPropType
});

const {
  value,
  option,
  customClass,
  validations,
  disabled,
  errors,
  id,
  name,
  state,
  listenChange,
  listenForm,
  keyName,
  uncheckedValue
 } = toRefs(reactive(props));
 // End Props

 //Emits
const emit = defineEmits<{
  (e: "update:model-value", value: string | boolean | object): void;
  (e: "setError", value: boolean | null): void;
  (e: "onSwitch", value: string | boolean | object): void;
}>();

// Composables Functions
const { hasError, errorMessages , isFormValid , handleValidations } = useError(validations?.value)

watch(hasError, (value: boolean | null) =>  {
  emit("setError", value)
});

// Watchs
watch(errors, async (value: Array<string>) =>  {
  errorMessages.value = await removeDuplicates(value)
  await nextTick()
  if(errorMessages.value.length > 0){
    emit("setError", true)
  }
});

// Methods
const onChange = (val: string | object | Array<string|number|object>) => {
  emit("update:model-value", val);
  handleValidations(val)
  if(listenChange.value){
    emit("onSwitch", val)
  } else if(listenForm.value){
    emit("onSwitch", val)
  }
}
</script>

<template>
  <div>
    <BFormCheckbox
    :class="[`${customClass}`]"
    @input="onChange($event)"
    :id="id ?? `checkbox-${keyName}`"
    :name="name ?? `checkbox-${keyName}`"
    :value="option"
    :unchecked-value="uncheckedValue"
    :state="state !== null ? !state : null"
    switch
    :disabled="disabled"
    >
    </BFormCheckbox>
    <ErrorsForm
      v-if="!isEmpty(errorMessages)"
      :error-messages="errorMessages"
      :state="state !== null ? !state : null"
    />
  </div>
</template>