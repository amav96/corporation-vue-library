<script lang="ts" setup>

import { Inputs, PropsSelectKey, PropsTextArea, PropsDatePickerClaim, CheckBoxKey, PropsInput } from "@packageTypes"
import { toRefs, computed, ComputedRef, ref, nextTick, PropType } from 'vue';
import {File, Input, TextArea, Select, Date, CheckBox} from "@package";
import { Validator } from '@services/utils/Validator';
import { isEmpty } from '@services/utils/Validations';
import {BCol, BRow, BForm} from 'bootstrap-vue-3';
import { PropsFile } from '../File/File.type';

const props = defineProps({
  inputs: {
    type: Array as PropType<Inputs[]>,
    required: true
  },
  id: {
    type: String
  },
  customClass: {
    type: String,
    default: ''
  }
})

const { inputs, customClass } = toRefs(props);

interface onSubmitEntity {
  items: object,
  isFormValid?: boolean
}

const emit = defineEmits<{
  (e: "select", data: object): void;
  (e: "change", data: object): void;
  (e: "onFile", data: object): void;
  (e: "focus", data: object): void;
  (e: "remove", data: object): void;
  (e: "datePicker", data: object): void;
  (e: "switch", data: string | boolean | object): void;
  (e: "getValues", data: object): void;
  (e: "onSubmit", data: onSubmitEntity): void;
  
}>();

const generatedForm = ref<Inputs[]>([]);
const formValues = ref<any>({});

const hasFormatValue = ref<boolean>(false)
const getInputs : ComputedRef<Inputs[]> = computed(() => {
  inputs.value.forEach(({key}, i) => {
    const index = generatedForm.value.map((input) => input.key).indexOf(key);
    const validKey = key as unknown as keyof Object;
    // si ya existe el input
    if (index > -1) {
      // mergeo lo que tengo con lo que viene
      generatedForm.value[index] = {
        ...generatedForm.value[index],
        ...inputs.value[i],
      };
     
      if(inputs.value[i].value){
        formValues.value[validKey] = inputs.value[i].value;
      }
    } else {
      // si no existe, agrego el input
      generatedForm.value.push({ ...inputs.value[i] });
      // let typeValue = getTypeValue(inputs.value[i])
      Object.defineProperty(formValues.value, validKey, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {}
      });
  
      // si viene con valor, lo seteo
      if (inputs.value[i].value) {
        formValues.value[validKey] = inputs.value[i].value;
      } else {
        formValues.value[validKey] = null;
      }
    }
  });
  hasFormatValue.value = generatedForm.value.some((val) =>  val.hasOwnProperty('formatValue')  && val.formatValue && typeof val.formatValue === 'function')
  hasValidations.value = generatedForm.value.some((val) => val.hasOwnProperty('validations')  && val.validations)
  return generatedForm.value.filter((val) => !val.hidden);
});


const onChange = (value: string, input: PropsInput | PropsTextArea) :void =>  {
  if(input.listenChange){
    emit('change', { value, input })
  } else if(input.listenForm){
    emit('getValues', formValues.value)
  }
}

const onFile = (value: any, input: PropsFile | PropsTextArea) :void =>  {
  formValues.value[input.key as keyof object] = value
  if(input.listenChange){
    emit('onFile', { value, input })
  } else if(input.listenForm){
    emit('getValues', formValues.value)
  }
}

const onFocus = (value: string, input: PropsInput | PropsTextArea) :void =>  {
  if(input.listenFocus){
    emit('focus', { value, input })
  }
}

const onSelect = (value: Array<object> | Array<string> | object, input: PropsSelectKey) :void => {
  if(input.listenSelect){
    emit('select', { value, input })
  } else if(input.listenForm){
    emit('getValues', formValues.value)
  }
};

const onRemove = (value: object, input: PropsSelectKey): void => {
  if(input.listenRemove){
    emit('remove', { value, input})
  } else if(input.listenForm){
    emit('getValues', formValues.value)
  }
};

const onDatePicker = (value: Date, input: PropsDatePickerClaim) :void => {
  if(input.listenChange){
    emit('datePicker', { value, input})
  } else if(input.listenForm){
    emit('getValues', formValues.value)
  }
};

const onSwitch = (index: number, value: string | boolean | object, input: CheckBoxKey) :void => {
  if(input.listenChange){
    emit('switch', { value, input})
  } else if(input.listenForm){
    emit('getValues', formValues.value)
  }
};

const setError = (index: number, value: boolean | null, input: PropsSelectKey) => {
  generatedForm.value[index].state = value
}

const getValues = () : Promise<onSubmitEntity> =>  {
  return new Promise( async (resolve) => {
    if(hasValidations){
      resolve({ items: await processFormValues(formValues.value), isFormValid: isValid()})
    } else {
      resolve({ items: await processFormValues(formValues.value)})
    }
  });
}

const getOnlyValues = () => {
  emit('getValues', formValues.value)
}

const processFormValues = (formValues: any) : Promise<object> => {
  return new Promise( async (resolve) => {
    if(hasFormatValue){
      let buildObject: any = {}
      generatedForm.value.forEach((value) => {
        buildObject[value.key] = value.formatValue ? value.formatValue(formValues[value.key]) : formValues[value.key]
      })
      resolve(buildObject)
    } else {
      resolve(formValues)
    }
  })
}

const setValue = (payload: { key: string, value : any }) =>  {
  // esta funcion es para setear especificamente una propiedad
  // pero con setear el objeto padre PROPS basta
  if (payload.key) {
    formValues.value[payload.key] = payload.value ?? null;
  }
}

const resetValues = () :Promise<object> =>  {
  return new Promise( async (resolve) => {
    const keys = Object.keys(formValues.value);
    for (let i = 0; i < keys.length; i += 1) {
      formValues.value[keys[i]] = null;
    }
    for (let i = 0; i < generatedForm.value.length; i += 1) {
      let val = generatedForm.value[i].value;
      if(val !== null && typeof val === 'object'){
            if(Array.isArray(val)){
                generatedForm.value[i].value = []
            } else {
                generatedForm.value[i].value = {}
            }
      } else if (typeof val === 'string') {
          generatedForm.value[i].value = ''
      } else {
          generatedForm.value[i].value = null
      }
    }
    await nextTick()
    resolve(formValues.value);
  });
}

const resetErrors = () :void =>  {
  for (let i = 0; i < generatedForm.value.length; i += 1) {
    if(generatedForm.value[i].hasOwnProperty('state')){
      generatedForm.value[i].state = null
    }
  }
}

// Validator
const validator = new Validator();
const hasValidations = ref<boolean>(false)
const isValid = () : boolean => {

  // Este metodo se puede usar desde el componente padre para saber
  // si el formulario es valido y recolectar los mensajes de error
  let result = true

  generatedForm.value.forEach((_,index) => {
    let currentInput  = generatedForm.value[index]
    if(currentInput.validations){
      const validKey = currentInput.key as unknown as keyof Object;
      validator.validate(formValues.value[validKey], currentInput.validations);
      if(!isEmpty(validator.getErrors)){
        generatedForm.value[index].errors = validator.getErrors;
        result = false;
      }
    }
  })
  return result
}

const handleSubmit = async (evt : Event) => {
  evt.preventDefault() 
  emit('onSubmit', await getValues())
}

defineExpose({ getValues, getOnlyValues, setValue, resetValues, resetErrors})

</script>

<template>
  <div :class="`${customClass}`">
    <BForm :id="id" @submit="handleSubmit" >
      <BRow>
        <BCol
          v-for="(input, index) in getInputs"
          :key="index"
          :cols="input.hasOwnProperty('cols') ? input.cols : 12"
          :class="`justify-content-center align-items-center my-2 ${input.customClass ?? ''}`"
        >
          <slot v-if="input.slot" :name="input.key" />
          <div v-if="input.clear" >
          </div>
          <template v-else>
            <label
              class="my-1 d-flex label-global"
              v-if="input.type !== 'slot' && input.title"
            >
              {{ input.title }}
            </label>
            <Input
              v-if="
                input.type === 'text' ||
                input.type === 'password' ||
                input.type === 'number' ||
                input.type === 'time' ||
                input.type === 'date' ||
                input.type === 'color' ||
                input.type === 'email'
              "
              :customClass="`${input.customClass ?? ''}`"
              :preppend-class="`${input.preppendClass ?? ''}`"
              :icon-left="input.iconLeft"
              :value="formValues[input.key]"
              :type="input.type"
              :placeholder="input.placeholder"
              :state="input.hasOwnProperty('state') ? (input.state ?? null) : null"
              :disabled="input.disabled"
              :listen-change="input.listenChange"
              :listen-form="input.listenForm"
              :listen-focus="input.listenFocus"
              :validations="input.validations"
              :errors="input.errors"
              v-model:model-value="formValues[input.key]"
              @onChange="onChange($event, input)"
              @onFocus="onFocus($event, input)"
              @setError="setError(index, $event, input)"
            />
            <TextArea
              v-if="input.type === 'textarea'"
              :customClass="`${input.customClass ?? ''}`"
              :value="formValues[input.key]"
              :type="input.type"
              :placeholder="input.placeholder"
              :state="input.hasOwnProperty('state') ? (input.state ?? null) : null"
              :rows="input.rows"
              :max-rows="input.maxRows"
              :disabled="input.disabled"
              :listen-change="input.listenChange"
              :listen-form="input.listenForm"
              :listen-focus="input.listenFocus"
              :validations="input.validations"
              :errors="input.errors"
              v-model:model-value="formValues[input.key]"
              @onChange="onChange($event, input)"
              @onFocus="onFocus($event, input)"
              @setError="setError(index, $event, input)"
            />
            <CheckBox
              v-if="input.type === 'checkbox'"
              :customClass="`${input.customClass ?? ''}`"
              :value="input.value"
              :option="input.option"
              :uncheckedValue="input.uncheckedValue"
              :id="input.id"
              :name="input.name"
              :keyName="input.key"
              :state="input.hasOwnProperty('state') ? (input.state ?? null) : null"
              :disabled="input.disabled"
              :listen-change="input.listenChange"
              :listen-form="input.listenForm"
              :validations="input.validations"
              :errors="input.errors"
              v-model:model-value="formValues[input.key]"
              @onSwitch="onSwitch(index, $event, input)"
              @setError="setError(index, $event, input)"
            />
            <Select
              v-if="input.type === 'select'"
              :customClass="`${input.customClass ?? ''}`"
              :value="formValues[input.key]"
              :options="input.options"
              :track-by="input.trackBy"
              :label="input.label"
              :placeholder="input.placeholder"
              :searchable="input.searchable"
              :multiple="input.multiple"
              :listen-remove="input.listenRemove"
              :listen-select="input.listenSelect"
              :listen-form="input.listenForm"
              :validations="input.validations"
              :errors="input.errors"
              v-model:model-value="formValues[input.key]"
              @setError="setError(index, $event, input)"
              @select="onSelect($event, input)"
              @remove="onRemove($event, input)"
            />
            <Date
              v-if="input.type === 'datetime'"
              :customClass="`${input.customClass ?? ''}`"
              :value="formValues[input.key]"
              :placeholder="input.placeholder"
              :transitions="false"
              :format="input.format ?? 'dd/MM/yyyy hh:mm'"
              :model-type="input.modelType ?? 'dd/MM/yyyy hh:mm'"
              :auto-apply="input.autoApply ?? false"
              :disabled="input.disabled"
              :listenChange="input.listenChange"
              :validations="input.validations"
              :errors="input.errors"
              v-model:model-value="formValues[input.key]"
              @setError="setError(index, $event, input)"
              @onDatePicker="onDatePicker($event, input)"
            />
            <File
              v-if="input.type === 'file'"
              :value="formValues[input.key]"
              :customClass="`my-1 ${input.customClass ?? ''}`"
              :accept="input.accept"
              :disabled="input.disabled"
              :placeholder="input.placeholder"
              :validations="input.validations"
              :errors="input.errors"
              @setError="setError(index, $event, input)"
              @onChange="onFile($event, input)"
            />
          </template>
        </BCol>
      </BRow>
      <slot name="buttons" ></slot>
    </BForm>
  </div>
</template>

