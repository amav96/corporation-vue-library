<script setup lang='ts'>
import { Table, Button, ModalForm, Dialog } from '@package';
import { toRefs, reactive, ref, computed, PropType, nextTick, onMounted, watch } from 'vue';
import {useToast} from 'vue-toast-notification';
import { ModalFormProps, deleteProp, TableProps, requestConfiguration as  requestConfigurationEntity } from "@packageTypes"



const props = defineProps({
  table: {
    type: Object as PropType<TableProps>,
    required: true
  },
  modalForm: {
    type: Object as PropType<ModalFormProps>,
    required: true
  },
  urlRestore: {
    type: String
  },
  urlDelete: {
    type: String
  },
  deleteRequestConfiguration:{
    type: Object as PropType<requestConfigurationEntity>
  },
  afterDelete: {
    type: Function
  },
  softDelete: {
      type: Boolean
  },
  editIcon: {
      type: String
  },
  deleteIcon: {
      type: String
  },
  restoreIcon: {
      type: String
  },
});

const $toast = useToast();

const {
  table,
  softDelete,
  editIcon,
  deleteIcon,
  restoreIcon,
  urlRestore,
  urlDelete,
  deleteRequestConfiguration,
  afterDelete,
  modalForm
 } = toRefs(props);


 const emit = defineEmits<{
  (e: "afterStore", value: any): void;
  (e: "afterUpdate", value: any): void;
  (e: "afterDelete", value: any): void;
}>();


const modalFormData = reactive({
  inputs: modalForm.value.inputs,
  urlStore: modalForm.value.urlStore,
  urlUpdate: modalForm.value.urlUpdate,
  urlShow: modalForm.value.urlShow,
  showRequestConfiguration: modalForm.value.showRequestConfiguration,
  storeRequestConfiguration : modalForm.value.storeRequestConfiguration,
  updateRequestConfiguration : modalForm.value.updateRequestConfiguration,
  updateDefaultParams : modalForm.value.updateDefaultParams,
  afterStore: modalForm.value.afterStore,
  afterUpdate: modalForm.value.afterUpdate,
  isEditMode: false,
  visible: false
})

const onOpenEdit = (data: any) :void => {
  modalFormData.visible = true
  modalFormData.urlUpdate = `${modalForm.value.urlUpdate}/${data.item.id}`
  modalFormData.urlShow = `${modalForm.value.urlShow}/${data.item.id}`
  modalFormData.isEditMode = true
}

const onOpenStore = () :void => {
  modalFormData.visible = true
  if(modalFormData.isEditMode){
    modalFormData.isEditMode = false
  }
}

const localItems = ref<Array<any>>([])

const handleUpdate = (data: any) :void => {
  let index = localItems.value.findIndex((value) => value.id === data.id );
  if(index > -1){
    localItems.value[index] = data
    if(modalFormData.afterUpdate){
      modalFormData.afterUpdate({resource: data})
    }
    emit('afterUpdate', {resource: data})
  }
}

const handleStore = (data: any) :void => {
  localItems.value = [...[data], ...localItems.value]  
  if(modalFormData.afterStore){
    modalFormData.afterStore({resource : data})
  }
}

const deleteOptions = reactive<deleteProp>({
  visible: false,
  centered: true,
  resource: null,
  text: '¿Estas seguro?'
})

const handleDelete = (data: any) :void => {
  deleteOptions.visible = true
  deleteOptions.resource = data.item.id
}

const loadingDelete = ref<boolean>(false);
const deleteItem = async (resource: any ) :Promise<void> => {
  if(!loadingDelete.value){
    deleteOptions.visible = false
    loadingDelete.value = true

    const url = `${urlDelete?.value}/${resource.value}`;

    let params = {
      ...{ method: "DELETE" },
      ...deleteRequestConfiguration?.value
    }

    try {
      const response = await fetch(url, params);
      const result = await response.json();
      loadingDelete.value = false
      if(result.errors || !result.data){
        $toast.error('No se ha eliminado correctamente')
      } else {
        $toast.success('Eliminado correctamente')
        localItems.value = localItems.value.filter((val) => val.id !== resource.value)
        if(afterDelete?.value){
          afterDelete.value({resource})
        }
        emit('afterDelete', {resource})
      }
    } catch (error) {
      
    }
  }
}

const refTable = ref<InstanceType<typeof Table> | null>(null)
const aditionalParams = ref<{deleted?: string}>({})
const lookForInactives = async () : Promise<void> => {
  aditionalParams.value = { deleted: 'true'}
  await nextTick()
  refTable.value?.applyLookFor({page : 1})
}
const lookForActives = async () : Promise<void> => {
  aditionalParams.value = {}
  await nextTick()
  refTable.value?.applyLookFor({page : 1})
}

const localFields = computed(() :Array<any> | undefined => {
  if(!inactives.value){
    return table.value.fields
  } else {
    let allFields = table.value.fields?.filter(val => val && val.key !== 'delete' && val.key !== 'edit');
    allFields?.push({
      key: 'restore',
      label: 'Restaurar'
    })
    return allFields
  }
});

const inactives = computed(() => aditionalParams.value.hasOwnProperty('deleted') && aditionalParams.value.deleted === 'true');

const loadingRestore = ref<boolean>(false);
const restore = async (data:any) :Promise<void> => {
  if(!loadingRestore.value){  
    loadingRestore.value = true
    let buildUrlRestore = urlRestore?.value ?? `${urlDelete?.value}/restore`;
    const url = `${buildUrlRestore}/${data.item.id}`;
    let params = {
      ...{ method: "PATCH" },
      ...modalFormData.updateRequestConfiguration
    }
    const response = await fetch(url, params);
    const result = await response.json();
    loadingRestore.value = false
    if(result.errors || !result.data){
      $toast.error('No se ha restaurado correctamente')
    } else {
      $toast.success('Restaurado correctamente')
      localItems.value = localItems.value.filter((val) => val.id !== data.item.id)
      if(modalFormData.afterStore){
        modalFormData.afterStore({resource : result.data})
      }
      emit('afterStore', {resource : result.data})
    }
  }
}

const busy = ref<boolean>(false);

const handleClose = (data: any) => {
  modalFormData.visible = data; 
  modalFormData.isEditMode = data
}

</script>
<template>
    <div >
      <Table
      :items="localItems"
      :striped="table.striped"
      :hover="table.hover"
      :busy="busy"
      :fields="localFields"
      :inputs="table.inputs"
      :searchable="table.searchable"
      :url="table.url"
      :firstNumber="table.firstNumber"
      :lastNumber="table.lastNumber"
      :requestConfiguration="table.requestConfiguration"
      :searchIcon="table.searchIcon"
      @getItems="localItems = $event"
      @loading="busy = $event"
      :aditionalParams="aditionalParams"
      ref="refTable"
      >
      <template  v-slot:block>
        <div  class="flex flex-row container-buttons">
          <div v-if="softDelete" class="buttons-filtros">
            <Button
            type="button"
            :background="`${!inactives ? 'button-global--secundario' : 'button-global--gris' }`"
            class="my-2 w-10 px-2 active-button"
            text="Activas"
            @click="lookForActives"
            />
            <Button
            type="button"
            :background="`${inactives ? 'button-global--secundario' : 'button-global--gris' }`"
            class="m-2 w-10 px-2 inactive-button"
            text="Inactivas"
            @click="lookForInactives"
            />
          </div>
            <Button
            v-if="modalFormData.urlStore"
            @click="onOpenStore"
            background="button-global--primario"
            customClass="store-button"
            class="my-2 w-25"
            text="Crear"
            type="button"
            />
        </div>
      </template>
      <template v-if="modalFormData.urlUpdate" v-slot:cell(edit)="{ data }: { data: any }">
        <div>
          <Button
          background="bg-white"
          :customClass="`edit-button-${data.index} p-1`"
          @click="onOpenEdit(data)"
          type="button"
          >
          <template v-slot:content>
            <img :src="editIcon" alt="editar">
          </template>
        </Button>
        </div>
      </template>
      <template v-if="urlDelete" v-slot:cell(delete)="{ data }: { data: any }">
        <Button
        background="bg-white"
        :customClass="`delete-button-${data.index} p-1`"
        type="button"
        @click="handleDelete(data)"
        >
          <template v-slot:content>
          <img :src="deleteIcon" alt="basura">
          </template>
        </Button>
      </template>
      <template v-slot:cell(restore)="{ data }: { data: any }">
        <Button
        background="bg-dark"
        :customClass="`restore-button-${data.index} p-1`"
        type="button"
        @click="restore(data)"
        >
          <template v-slot:content>
          <img :src="restoreIcon" alt="restaurar">
          </template>
        </Button>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-dark my-2">
          
        </div>
      </template>
      </Table>
      <ModalForm
      :inputs="modalFormData.inputs"
      :urlStore="modalFormData.urlStore"
      :urlUpdate="modalFormData.urlUpdate"
      :urlShow="modalFormData.urlShow"
      :isEditMode="modalFormData.isEditMode"
      :visible="modalFormData.visible"
      :resetAfterClose="true"
      :showRequestConfiguration="modalFormData.showRequestConfiguration"
      :storeRequestConfiguration="modalFormData.storeRequestConfiguration"
      :updateRequestConfiguration="modalFormData.updateRequestConfiguration"
      :updateDefaultParams="modalFormData.updateDefaultParams"
      @afterUpdate="handleUpdate"
      @afterStore="handleStore"
      @close="handleClose"
      />
      <Dialog
      :visible="deleteOptions.visible"
      :centered="deleteOptions.centered"
      :resource="deleteOptions.resource"
      :text="deleteOptions.text"
      @confirm="deleteItem"
      @cancel="deleteOptions.visible = false"
      />
    </div>
</template>