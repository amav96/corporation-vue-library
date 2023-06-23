<script lang="ts" setup>
import './ActionBar.scss';
import { ref, PropType } from 'vue';
import { useRouter } from 'vue-router';

interface menuItem {
  title: string;
  icon?: string;
  name?: {
    name: string;
  };
  path?: string;
}

const props = defineProps({
  translateY: {
    type: String,
    default: '-45%',
  },
  colorTitle: {
    type: String,
    default: 'c-text-primario',
  },
  iconOpen: {
    type: String,
    default: '',
  },
  iconClose: {
    type: String,
    default: '',
  },
  menu: {
    type: Array as PropType<menuItem[]>,
    default: () => [],
  },
  backgroundItem: {
    type: String,
    default: '#6587DD',
  },
  textItem: {
    type: String,
    default: '#fff',
  },
});

const emit = defineEmits<{
  (e: 'isOpen', value: boolean): void;
  (e: 'navigate', menu: menuItem): void;
}>();

const { translateY, iconOpen, iconClose, menu, backgroundItem, textItem } =
  props;
const router = useRouter();

const open = ref<boolean>(false);
const handleOpen = () => {
  open.value = !open.value;
  emit('isOpen', open.value);
};
</script>
<template>
  <div :style="`transform: translateY(-45%);`" class="ActionBarContainer">
    <div @click="handleOpen" class="ActionBarContainer__arrow cursor-pointer">
      <img v-if="!open" :src="iconOpen" alt="buscar" />
      <img v-if="open" :src="iconClose" alt="buscar" />
    </div>

    <div
      class="ActionBarItem"
      :style="`align-items:${open ? 'start' : 'center'};`"
    >
      <div v-if="!open" :class="`ActionBarItem__text ${colorTitle}`">
        Ajustes disponibles
      </div>
      <div v-else class="d-flex flex-column ActionBarItem__itemContainer">
        <div
          v-for="(item, index) in menu"
          :key="index"
          @click="$emit('navigate', item)"
          class="ActionBarItem__itemContainer__item cursor-pointer"
          :style="`background:${backgroundItem};color:${textItem};`"
        >
          <div>{{ item.title }}</div>
          <img v-if="item.icon" :src="item.icon" />
        </div>
      </div>
    </div>
  </div>
</template>
