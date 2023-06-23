<script lang='ts' setup>
import { toRefs } from 'vue';

const props = withDefaults(defineProps<{
    title?: string,
    textColor?: string,
    customClass?: string
}>(), {
    title: 'Dashboard',
    textColor: 'c-text-primario',
})

const {
    title
} = toRefs(props)

</script>
<template>
    <div class="d-flex  m-4 flex-column flex-grow-1">
        <div class="d-flex flex-start mb-4">
            <h3 :class="`${textColor}`"><strong>{{title}}</strong></h3>
        </div>
        <slot name="layout" ></slot>
    </div>
</template>