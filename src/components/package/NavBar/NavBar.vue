<template>
    <div class="navbar-container">
        <div class="navbar-container__main">
            <img
            :src="logo"
            >
            <div class="navbar-container__main__title">
                <span> {{ title }} </span>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { toRefs } from 'vue';

const props = defineProps({
    logo: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'Aplicacion'
    }
})

const {
    logo,
    title,
 } = toRefs(props);

</script>


