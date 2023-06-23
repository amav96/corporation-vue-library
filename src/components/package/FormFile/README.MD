
const archivoForm = [
    { 
        key: "descripcion",
        title: "Descripción",
        placeholder: "Resolución",
        type : "textarea",
        value : null,
        state : null,
        cols: 12,
        listenForm: true
    },
]

const archivos = ref<any[]>([])

const getValues = (data: any) => { 
    archivos.value[data.index] = data
}

const remove = (index: number) => {
    archivos.value.splice(index, 1)
}

const defaultFiles = ref<FileType[]>([])
onMounted(() => {
    // poner imagen y valores por defecto
    setTimeout(() => {
        defaultFiles.value.push(
        {
            avatar: {
                image: {
                    url: 'https://picsum.photos/200/300',
                }
            },
            form: [
                { 
                    key: "descripcion",
                    title: "Descripción",
                    placeholder: "Resolución",
                    type : "textarea",
                    value : 'Esta es una foto normal',
                    state : null,
                    cols: 12,
                    listenForm: true
                },
            ],
            id: generateId()
        }
    )
    }, 2000);

})

</script>
<template>
    <div class="my-4">
        <div class="">
            <FormFile
            :label="'Carta de Parte/Remito'"
            :inputs="archivoForm"
            :cols="6"
            :defaultValues="defaultFiles"
            @getValues="getValues"
            @remove="remove"
            />
        </div>
        <div class="d-flex justify-content-end m-4">
            <Button
            background="bg-success"
            text="Siguiente"
            />
        </div>
    </div>
</template>
