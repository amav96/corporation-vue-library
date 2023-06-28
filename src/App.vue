<script lang="ts" setup>
import { Button } from '../src/components/package/Button';
import { Dialog } from '../src/components/package/Dialog';
// import { Button } from '@package';
import './assets/scss/index.scss';
import { ref } from 'vue';

const deleteOptions =  ref<any>({
  visible : true,
  centered : true,
  resource : 1,
  text : 'Hola estamos aqui'
})


const deleteItem = () => {
  deleteOptions.value.visible = false
}

</script>

<template>
  <div class="AppRoot-fullPage">
    APP TEST
    <Button
    background="button-global--primario"
    customClass="store-button"
    class="my-2 w-25"
    text="Crear"
    type="button"
    />
    <Dialog
    :visible="deleteOptions.visible"
    :centered="deleteOptions.centered"
    :resource="deleteOptions.resource"
    :text="deleteOptions.text"
    @confirm="deleteItem"
    @cancel="deleteOptions.visible = false"></Dialog>
  </div>

 
</template>


