<script lang='ts' setup>
import { toRefs, reactive, watch, nextTick } from 'vue';
import { isEmpty } from '@services/utils/Validations';
import { useError } from '../../../composables/useError';
import { PropsDatePickerPropType } from "@packageTypes"
import { removeDuplicates } from '@services/utils/Property';
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css"

// Props

const props = defineProps({
  ...PropsDatePickerPropType
});

const {
  placeholder,
  value,
  customClass,
  validations,
  disabled,
  errors,
  autoApply,
  listenChange,
  listenForm
 } = toRefs(reactive(props));

 // End Props

// Emits
const emit = defineEmits<{
  (e: "update:model-value", value: string | Date): void;
  (e: "setError", value: boolean | null): void;
  (e: "onDatePicker", value: Date): void;
}>();

// Watchs

watch(errors, async (value: Array<string>) =>  {
  errorMessages.value = await removeDuplicates(value)
  await nextTick()
  if(errorMessages.value.length > 0){
    emit("setError", true)
  }
});

// Composables

const { hasError, errorMessages, isFormValid ,handleValidations } = useError(validations?.value)

watch(hasError, (value: boolean | null) =>  {
  emit("setError", value)
});


// Methods
const onDatePicker = async (val: Date,) => {
  emit('update:model-value', val)
  if(listenChange.value){
    emit("onDatePicker", val)
  } else if(listenForm.value){
    emit("onDatePicker", val)
  }
  await nextTick()
  handleValidations(val)
};

const onClose = () => {
  handleValidations(value.value)
};

</script>

<template>
  <div>
    <VueDatePicker
    :input-class-name="`VueDatePicker ${customClass ?? ''} ${!isFormValid ? 'border border-danger' : '' }`"
    :placeholder="placeholder"
    :transitions="false"
    :format="format ?? 'dd/MM/yyyy hh:mm'"
    :model-type="modelType ?? 'dd/MM/yyyy hh:mm'"
    :disabled="disabled"
    :modelValue="value"
    :auto-apply="autoApply"
    @update:model-value="onDatePicker"
    @closed="onClose"
    @blur="handleValidations(value)"
    />
    <template v-if="!isEmpty(errorMessages)">
      <div class="d-flex invalid-feedback" >
          <span class="text-danger " v-for="(err,index) in errorMessages">
              <small>{{ errorMessages.length > 1 && index < errorMessages.length - 1 ? err + ', ' : err }}</small>
          </span>
      </div>
    </template>
  </div>
</template>

