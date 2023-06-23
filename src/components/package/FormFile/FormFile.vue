<script lang='ts' setup>
import { toRefs, PropType, ref, onMounted, watch, nextTick } from 'vue';
import { FileType, Inputs } from '@packageTypes';
import { File } from '@package';
import { convertFileToRender } from '@services/utils/Image';
import { generateId } from '@services/utils/GenerateId';

const props = defineProps({
    cols: Number,
    inputs: {
        type: Array as PropType<Inputs[]>,
        required: true
    },
    label: {
        type: String,
        default: 'Imagenes'
    },
    deleteIcon: {
      type: String,
      default: `http://localhost:8086/icons/basura.svg`
    },
    defaultValues: {
        type: Array as PropType<FileType[]>,
        default : () => []
    }
});

const {
//   file,
  label,
  inputs,
  cols,
  deleteIcon,
  defaultValues
 } = toRefs(props);

 const emit = defineEmits<{
  (e: "getValues", data: object): void;
  (e: "remove", index: number): void;
}>();

onMounted(() => {
    if(!inputs.value.every((input) => input.hasOwnProperty('listenForm'))){
        console.warn('Debes declarar una propiedad listeForm en los inputs del formulario <FormFile>')
    }
})

const files = ref<File[]>([])

const fileList = ref<FileType[]>([])

const onFile = async (files: File[]) => { 
  files.forEach( (f) => {
    fileList.value.push(
      {
          avatar: convertFileToRender(f),
          form: inputs.value,
          id: generateId()
      }
    )
  })

  await nextTick()
  if(refForm.value && Array.isArray(refForm.value)){
    refForm.value.forEach((component:any) => {
      component.getOnlyValues()
    })
  }

}

const remove = (item: any, index: number ) => {
    fileList.value.splice(index,1)
    emit("remove", index)
}

const getValues = async (formValues: any, index: number, item: any) => {
    let formValuesC = await formValues;
    emit("getValues", { formValues: formValuesC, index, item })
}

watch(defaultValues, async (value: FileType[]) => {
  fileList.value = value
  await nextTick()
  if(refForm.value && Array.isArray(refForm.value)){
    refForm.value.forEach((component:any) => {
      component.getOnlyValues()
    })
  }
}, { deep: true });


const getImage = (fileConvert: any): string => {
  if(fileConvert.url){
    return fileConvert.url
  } else if(fileConvert.base64){
    return fileConvert.base64
  } else {
    return 'https://picsum.photos/200/300'
  }
}

const refForm = ref<any>(null)

</script>
<template>
  <div>
    <label class="my-2 d-flex justify-content-center label-global">
        {{ label }}
    </label>
    <b-row class="justify-content-center">
      <b-col :cols="cols ?? 6">
        <File
          :value="files"
          @onChange="onFile"
          :resetOnOpen="false"
        />
      </b-col>
    </b-row>
    <template v-for="(item, index) in fileList" :key="item.id" >
        <div class="d-flex flex-row align-items-center my-2">
            <div class="d-flex align-items-center flex-column">
                <div>
                    Imagen
                </div>
                <b-avatar 
                class="align-items-center"
                :src="getImage(item.avatar.image)" size="5rem"></b-avatar>
            </div>
            <Form
            ref="refForm"
            style="margin-left:20px;"
            customClass="flex-grow-1"
            :inputs="item.form"
            @getValues="getValues($event, index, item)"
            />
            <div 
              class="d-flex justify-content-center align-items-center shadow p-2 mx-3 rounded"
              @click="remove(item,index)"
              >
                <img class="cursor-pointer" :src="deleteIcon" alt="basura">
            </div>
        </div>
    </template>
  </div>
</template>