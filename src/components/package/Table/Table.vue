<script lang="ts" setup>
import { Pagination, BackEndPagination, Field, Inputs, requestConfiguration as requestConfigurationEntity } from "@packageTypes"
import { toRefs, useSlots, computed, reactive, ref, onMounted, watch, PropType } from 'vue';

// import {useToast} from 'vue-toast-notification';
import { BTable, BPagination, TableItem, TableField } from 'bootstrap-vue-next';
import Form from "../Form/Form.vue";
import Button from "../Button/Button.vue";

const props = defineProps({
    items : {
        type: Array as PropType<TableItem[]>,
        default: () => [],
    },
    fields : {
        type: Array as PropType<TableField[]>
    },
    busy : {
        type: Boolean,
        default: false
    },
    striped: {
        type: Boolean
    },
    hover : {
        type: Boolean
    },
    totalRows: {
        type: Number
    },
    perPage: {
        type: Number
    },
    currentPage: {
        type: Number
    },
    firstNumber: {
        type: Boolean
    },
    lastNumber: {
        type: Boolean
    },
    searchable: {
        type: Boolean
    },
    inputs: {
        type: Array as PropType<Inputs[]>
    },
    requestConfiguration: {
        type: Object as PropType<requestConfigurationEntity>,
        default: () => ({
            method: 'GET'
        })
    },
    url: {
        type: String
    },
    modelKey: {
        type: String,
        default: 'data'
    },
    aditionalParams: {
        type: Object
    },
    searchIcon: {
        type: String
    },
})

const {
    items,
    fields,
    busy,
    striped,
    hover,
    totalRows,
    perPage,
    currentPage,
    firstNumber,
    lastNumber,
    searchable,
    inputs,
    url,
    requestConfiguration,
    modelKey,
    aditionalParams,
    searchIcon
 } = toRefs(props);

const emit = defineEmits<{
    (e: "update:model-value-page", value: number): void;
    (e: "getItems", value: Array<any>): void;
    (e: "loading", value: boolean): void;
}>();

// const $toast = useToast();

const slots = useSlots()

const nameCellSlots = computed (() => {
    return Object.keys(slots).filter((k) => k.split('cell')[0] === '').map((k) => k.split('cell')[1].replace(/[^a-zA-Z_]+/g, ''))
})
const nameFilterSlots = computed (() => {
    return Object.keys(slots).filter((k) => k.split('filter')[0] === '').map((k) => k.split('filter')[1].replace(/[^a-zA-Z_]+/g, ''))
})

const cell = (key : any) =>  {
    return `cell(${key})`; // simple string interpolation
}

const internalPagination = reactive<Pagination>({
  currentPage: 1,
  totalRows: 10,
  perPage: 5
})

const handlePage = (value: number) => {
    if(url?.value){
        internalPagination.currentPage =  value
        applyLookFor({})
    } else {
        emit("update:model-value-page", value);
    }
}

const refTableForm = ref<InstanceType<typeof Form> | null>(null)
onMounted(() => {
    if(url?.value){
        applyLookFor({})
    }
})

const localItems = ref<TableItem[]>([{}]);
watch(items, async (value: TableItem[]) =>  {
    localItems.value = value
});

const loadingSearch = ref<boolean>(false)

const applyLookFor = async (params : any = null) :Promise<void> => {
    if(url?.value && !loadingSearch.value){
        loadingSearch.value = true
        emit('loading', true)
        let queryParams : object = {}
        if(searchable.value && params){
            queryParams = {...params}
        }
        queryParams = {...queryParams, ...{ page: internalPagination.currentPage}, ...aditionalParams?.value }
        try {

            let params = {
                ...{ method: "GET" },
                ...requestConfiguration.value
            }

            Object.keys(queryParams).forEach((k) => {
                let currentValue : any = queryParams[k as keyof object]
                if(currentValue === null ||
                    currentValue === '' ||
                   ( Array.isArray(currentValue) && currentValue.length === 0)
                ){
                    delete queryParams[k as keyof object]
                }
            })

            let urlParams: any = url.value+'?'+ new URLSearchParams(queryParams as URLSearchParams)

            const response = await fetch(urlParams, params);
            const result = await response.json();

            loadingSearch.value = false
            emit('loading', false)
            if(result.error){
                // $toast.error('Ha ocurrido un error con el servidor');
            }else{
                if (result && result[modelKey.value as keyof object] && Array.isArray(result[modelKey.value as keyof object])){
                    localItems.value = result[modelKey.value as keyof object]
                }
                if(result?.pagination){
                    const pagination :BackEndPagination = result?.pagination
                    internalPagination.currentPage = pagination.current_page
                    internalPagination.totalRows = pagination.count
                    internalPagination.perPage = pagination.limit
                }
                emit("getItems", localItems.value)
            }
        } catch (error) {
            console.log(error);
            loadingSearch.value = false
            emit('loading', false)
            // $toast.error('Ha ocurrido un error con el servidor B2');
        }

    } else if(!url?.value) {
        console.error('Url undefined')
    }
}

const resetLookFor = async () :Promise<void> => {
    const form = refTableForm.value
    if(form){
        await form.resetValues()
        internalPagination.currentPage = 1
        await applyLookFor()
    }
}

const handleOnSubmit = async (data: any) => {
    await applyLookFor(data.items)
}

defineExpose({ applyLookFor})

</script>

<template>
  <div >
    <template
    v-if="searchable && inputs"
    >
      <div class="d-flex flex-column" >
        <Form
        :inputs="inputs"
        ref="refTableForm"
        @onSubmit="handleOnSubmit"
        >
        <template #buttons>
            <div class="d-flex">
                <Button
                class="c-bg-primario my-2 w-10 px-2"
                >
                  <template #content>
                      <img :src="searchIcon" alt="buscar">
                  </template>
                </Button>
                <Button
                type="button"
                class="c-bg-blanco m-2 w-10 px-2 "
                @click="resetLookFor()"
                >
                  <template #content>
                      <small class="text-black" >Limpiar filtros</small>
                  </template>
                </Button>
            </div>
        </template>
        <template
        v-for="(item) in nameFilterSlots"
        v-slot:[item]
        >
            <slot :name="`filter(${item})`" ></slot>
        </template>
        </Form>
      </div>
    </template>
    <slot name="block" ></slot>
    <BTable
    class="table_global"
    :hover="hover"
    :busy="busy"
    :fields="fields"
    :items="localItems"
    responsive
    show-empty
    >
        <template
        v-for="(item) in nameCellSlots"
        v-slot:[cell(item)]="data"
        >
            <slot :name="`cell(${item})`" v-bind="{data}" ></slot>
        </template>
        <template #table-busy>
        <slot name="table-busy" ></slot>
        </template>
    </BTable>
    <BPagination
    :modelValue="currentPage ?? internalPagination.currentPage"
    :total-rows="totalRows ?? internalPagination.totalRows"
    :per-page="perPage ?? internalPagination.perPage"
    :firstNumber="firstNumber"
    :lastNumber="lastNumber"
    @update:model-value="handlePage"
    :disabled="loadingSearch"
    >
    </BPagination>
  </div>
</template>

