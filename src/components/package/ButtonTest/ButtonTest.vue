<script setup lang='ts'>
import './_ButtonTest.scss';
console.log('charly')
</script>

<template>
    <button class="boton">
        <slot name="content" >default</slot>
    </button>
</template>
