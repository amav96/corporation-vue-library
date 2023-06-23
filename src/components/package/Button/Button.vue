<script setup lang='ts'> 
import { toRefs } from 'vue';
import {BButton} from 'bootstrap-vue-3';

const props = defineProps({
  text: {
      type: String,
      default: ''
  },
  background: {
      type: String,
      default: ''
  },
  textColor: {
      type: String,
      default: ''
  },
  customClass: {
      type: String,
      default: 'px-2'
  },
  type: {
    type: String,
    default: 'submit'
  },
  size:{
      type: String,
      default: 'md'
  },
  rounded:{
      type: String,
      default: 'md'
  },
  href:{
      // la url a abrir con window.open
      type: String,
      default: ''
  },
  icon:{
      type: String,
      default: '',
  },
  iconLeft:{
      type: String,
      default: '',
  },
  to:{
      // el objeto de la ruta a navegar
      type: Object,
  },
  loading:{
      type: Boolean,
      default: false,
  },
  disabled:{
      type: Boolean,
      default: false,
  }
})

const {
    background,
    textColor,
    text,
    size,
    rounded, 
    href,
    icon,
    iconLeft,
    to,
    loading,
    disabled,
 } = toRefs(props);

</script>

<template>
    <BButton
    :type=type
    :class="[
      `button-global LocalBaseButton c-btn-${size} ${background} ${textColor} ${customClass} c-rounded-${rounded} ${loading || disabled? '' : 'cursor-pointer'}`
      ]"
    >
    <slot name="content" >
      <template v-if="loading">
        <div  class="spinner-border spinner-border-sm mx-2 my-1"  role="status">
            <span class="sr-only">Loading...</span>
        </div>
      </template>
      <template v-else>
        <div v-if="iconLeft" style="margin-left:0px;margin-right:10px;">
            <img :src="iconLeft"  :class="[`${size}-LocalBaseButton-icon`]"/>
        </div>
          <div v-if="text">
              <strong>{{text}}</strong>
          </div>
        <div v-if="icon"  style="margin-left:10px;margin-right:0px;">
            <img :src="icon"  :class="[`${size}-LocalBaseButton-icon`]"/>
        </div>
      </template>
    </slot>
    </BButton>
</template>
