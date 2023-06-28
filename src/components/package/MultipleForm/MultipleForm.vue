<script lang='ts' setup>
import {Inputs, currentMultipleForm } from '@packageTypes';
import {Button} from '../Button'
import { PropType, toRefs } from 'vue';
import baseApiUrl from '@services/BaseApiUrl';

const props = defineProps({
  forms: {
    type: Array as PropType<Array<Inputs[]>>,
    required: true
  },
  title: {
    type: String,
    default: 'Formulario multiple',
    required: true
  },
  deleteIcon: {
      type: String,
      default: `http://localhost:8086/icons/basura.svg`
  },
})

const {
    forms
} = toRefs(props)

// Emits
const emit = defineEmits<{
  (e: "remove", form: currentMultipleForm): void;
  (e: "add", forms: Array<Inputs[]>): void;
  (e: "getMultipleValues", data: object): void;
}>();


const remove = (form: Inputs[], index: number, unique: string) => emit("remove", {form, index, unique})

const add = () => emit("add", forms.value)

const getKeyDelete = (data:any) => data.filter((form:any) => form.slot && form.key.indexOf('delete-') > -1)[0].key

const getValues = async (formValues: any, index: number) => {
    let formValuesC = await formValues;
    emit("getMultipleValues", { formValues: formValuesC, index})
}

</script>
<template>
    <div class="d-flex flex-column w-100" >
        <div>
            <h6>{{ title  }}</h6>
        </div>
        <Form
        v-for="(form, index) in forms"
        :key="getKeyDelete(form)"
        :customClass="`col-12`"
        :inputs="form"
        @getValues="getValues($event, index)"
        >
        <template v-slot:[`${getKeyDelete(form)}`]>
            <div class=" d-flex justify-content align-items-center h-100" >
                <img class="cursor-pointer"  @click="remove(form, index, getKeyDelete(form))" :src="deleteIcon" alt="basura">
            </div>
        </template>
        </Form>
        <div>
            <Button
            background="c-bg-manzana"
            textColor="white-text"
            text="Agregar item"
            type="button"
            :iconLeft="baseApiUrl + '/icons/sumar.svg'"
            @click="add"
            />
        </div>
    </div>
</template>