<script setup lang='ts'>
import { ref, watch, toRefs } from 'vue';
import {Button} from "@package";
import { BModal } from 'bootstrap-vue-3';

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    resource: {
        type: null
    },
    textConfirm: {
        type: String,
        default: 'Confirmar',
    },
    textCancel: {
        type: String,
        default: 'Cancelar',
    },
    centered: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
        default: '¿Estas seguro?'
    }
})

const { visible, resource, centered, text } = toRefs(props);

const emit = defineEmits<{
  (e: "hide", value: any): void;
  (e: "cancel", value: any): void;
  (e: "confirm", value: any): void;
}>();

const internalVisible = ref<boolean>(false)

watch(visible, (value: boolean) =>  internalVisible.value = value);

const hideModal = () => {
    emit("cancel", resource)
    internalVisible. value = false
}

const confirm = () => {
    emit("confirm", resource)
    internalVisible. value = false
}

</script>
<template>
    <div>
        <BModal
        :modelValue="internalVisible"
        hide-footer
        :centered="centered"
        @hide="hideModal"
        static
        >
        {{ text }}
        <div class="d-flex flex-row justify-content-end">
            <Button
            :background="`button-global--secundario`"
            class="my-2 w-10 px-2 dialog-0"
            :text="textConfirm"
            type="button"
            @click="confirm"
            />
            <Button
            :background="`button-global--rojo`"
            class="m-2 w-10 px-2 dialog-1"
            :text="textCancel"
            type="button"
            @click="hideModal"
            />
        </div>
        </BModal>
    </div>

</template>