<script lang='ts' setup>
import MultipleForm from '@components/package/MultipleForm/MultipleForm.vue';
import { currentMultipleForm } from '@packageTypes';
import { ref } from 'vue';

const denunciaForm = [
    { 
        key: "danios",
        title: "Daños",
        type : "select",
        multiple: true,
        validations : {
            rules : {
                required : true 
            }, 
        },
        options: [],
        placeholder : "Daños",
        value : null,
        cols: 4
    },
    { 
        key: "transportador",
        title: "transportador",
        type : "select",
        validations : {
            rules : {
                required : true 
            }, 
        },
        options: [],
        placeholder : "transportador",
        value : null,
        cols: 4
    },
    { 
        key: "chofer",
        title: "Chofer",
        type : "select",
        validations : {
            rules : {
                required : true 
            }, 
        },
        options: [],
        placeholder : "Chofer",
        value : null,
        cols: 4
    },
    { 
        key: "fecha_evento",
        title: "Fecha del evento",
        type : "datetime",
        validations : {
            rules : {
                required : true,
            }, 
        },
        placeholder : "Fecha del evento",
        value : null,
        state : null,
        cols: 4
    },
    { 
        key: "nro_baliza",
        title: "N° de baliza",
        type : "text",
        placeholder : "N° de baliza",
        value : null,
        state : null,
        cols: 4
    },
    { 
        key: "tipo_evento",
        title: "Tipo de evento",
        type : "select",
        validations : {
            rules : {
                required : true 
            }, 
        },
        options: [],
        placeholder : "Tipo de evento",
        value : null,
        cols: 4
    },
    {
        slot: true,
        key: 'partes_slot',
        cols: 12,
    },
    { 
        key: "monto_reclamado",
        title: "Monto reclamado",
        type : "text",
        placeholder : "Monto reclamado",
        value : null,
        state : null,
        cols: 12
    },
    { 
        key: "resolucion",
        title: "Resolucion",
        type : "textarea",
        placeholder : "Resolucion",
        value : null,
        state : null,
        cols: 12
    }
]

const modelDanios = ref<any>([
        { 
            key: "parte",
            title: "Parte",
            type : "select",
            validations : {
                rules : {
                    required : true 
                }, 
            },
            options: [{nombre: 'puerta', id: 1}, {nombre: 'caucho', id: 2}],
            placeholder : "Parte",
            value : null,
            cols: 3,
            listenForm: true
        },
        { 
            key: "danios",
            title: "Daños",
            type : "select",
            multiple: true,
            validations : {
                rules : {
                    required : true 
                }, 
            },
            options: [],
            placeholder : "Daños",
            value : null,
            cols: 4,
            listenForm: true
        },
        { 
            key: "codigo",
            title: "Codigo de danio",
            type : "text",
            placeholder : "Codigo de danio",
            value : null,
            state : null,
            cols: 4,
            listenForm: true
        },
        {
            slot: true,
            key: 'delete-0',
            cols: 1
        }
])

const daniosPartes = ref<any>([modelDanios.value])

const daniosPartesValues = ref<any>([])

const removeFormDaniosPartes = async (data : currentMultipleForm) => {
    let lookForIndex = daniosPartes.value.findIndex((forms:any) => forms.findIndex((input:any) => input.key === data.unique) > -1)
    if(lookForIndex > -1){
        daniosPartesValues.value.splice(lookForIndex, 1)
        await nextTick()
        daniosPartes.value.splice(lookForIndex, 1)
    }
}

const addForm = () => {
    let nextForm = modelDanios.value.map((form: Inputs) => {
        if(form.slot === true){
            return {
                ...form,
                key: 'delete-' + generateId()
            }
        } else {
            return form
        }
    });
    daniosPartes.value.push(nextForm)
}

const getMultipleValues = async ({ formValues, index}: any) => {
    daniosPartesValues.value[index] = formValues
    await nextTick()
}

const handleOnSubmit = (data:any) => {
    let dataForm = data.items
    dataForm.daniosCombo = daniosPartesValues.value
                            .map((properties: any) => {
                                Object.keys(properties).forEach((k) => {
                                    if(k.indexOf('delete-') > -1){
                                        delete properties[k]
                                    } 
                                })
                                return properties
                            })
}

</script>
<template>
    <div class="my-4">
        <Form
        :inputs="denunciaForm"
        @onSubmit="handleOnSubmit"
        >
        <template #partes_slot>
            <div class="shadow p-3">
                <MultipleForm
                :forms="daniosPartes"
                title="Daños y partes"
                @remove="removeFormDaniosPartes"
                @add="addForm"
                @getMultipleValues="getMultipleValues"
                />
            </div>
        </template>
        <template #buttons>
            <div class="d-flex justify-content-end">
                <Button
                background="bg-success"
                text="Siguiente"
                />
            </div>
        </template>
        </Form>
    </div>
</template>
