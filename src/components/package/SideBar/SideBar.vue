<script lang='ts' setup>
import type { Menu } from "@packageTypes"
import { toRefs, ref, PropType } from 'vue';
import ItemSideBar from './ItemSideBar.vue';

const props = defineProps({
    background : {
        type: String,
        default: '#0162A0'
    },
    colorScrollBar : {
        type: String,
        default: '#0162A0'
    },
    colorTextItem : {
        type: String
    },
    menu: {
        type: Object as PropType<Menu>,
        required: true
    }
})

const {
    background,
    colorScrollBar,
    colorTextItem,
    menu,
 } = toRefs(props);

const deployed = ref<boolean>(false);
const open = () => {
    if(!deployed.value){
        deployed.value = true
    }
}

const close = () => {
    if(deployed.value){
        deployed.value = false
    }
}


</script>
<template>
    <div class="SidebarResizableContainer">
        <div class="SidebarResizableContainer__sidebarWrapper">
            <div
            v-on:mouseover="open"
            v-on:mouseleave="close"
            class="Sidebar SidebarResizableContainer__sidebar">
                <div class="Sidebar__Top">
                    <template
                    v-for="(item, index) in menu.top"
                    :key="index"
                    >
                    <ItemSideBar
                    :title="item.title"
                    :image="item.image"
                    :deployed="deployed"
                    :colorTextItem="colorTextItem"
                    :subSection="item.subSection"
                    :name="item.name"
                    :path="item.path"
                    @navigate="$emit('navigate', $event)"
                    />
                    </template>
                </div>
                <div class="Sidebar__Above">
                    <template
                    v-for="(item, index) in menu.above"
                    :key="index"
                    >
                    <ItemSideBar
                    :title="item.title"
                    :image="item.image"
                    :deployed="deployed"
                    :colorTextItem="colorTextItem"
                    :name="item.name"
                    :path="item.path"
                    @navigate="$emit('navigate', $event)"
                    />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

