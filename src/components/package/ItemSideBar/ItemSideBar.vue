<script lang='ts' setup>
import { ItemSideBar, Item } from "@packageTypes"
import { toRefs, computed, ref, PropType } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    colorTextItem: {
        type: String,
        default: 'white'
    },
    image: { 
        type: String,
    },
    name: {
        type: Object
    },
    path: {
        type: String
    },
    redirect: {
        type: String,
    },
    visible: {
        type: Boolean
    },
    deployed: {
        type: Boolean
    },
    subSection : {
        type: Array as PropType<Array<Item>>
    }
})
const {
    title,
    name,
    path,
    redirect,
    image,
    deployed,
    colorTextItem,
    subSection
 } = toRefs(props);


 const emit = defineEmits<{
  (e: "navigate", value: any): void;
}>();

const styleToSection = computed(() => {
    return `height: 55px;`
})

const styleDeployed = computed(() => {
    return `width:${!deployed.value ? '68px' : '138px'};justify-content:center`
})

const deployedSection = ref<boolean>(false);

const handleNavigation = () => {
    if(subSection?.value){
        deployedSection.value = !deployedSection.value
    } else {
        const object = {
          title: title.value,
          name : name?.value,
          path : path?.value,
          redirect : redirect?.value,
          image : image?.value,
          deployed : deployed.value,
          colorTextItem : colorTextItem.value,
          subSection : subSection?.value,
        }
        emit('navigate', object)
    }
}

const handleSubNavigation = (data: ItemSideBar) => {
    emit('navigate', data)
}

</script>
<template>
    <transition mode="out-in">    
        <div
        :style="styleDeployed"
        class="SidebarResizableContainer__item"
        >
            <div 
            class="SidebarResizableContainer__item__box"
            @click="handleNavigation"
            >
                <div 
                :style="styleToSection"
                class="SidebarResizableContainer__item__box__item">
                    <div
                    v-if="deployed"
                    :style="`color:${colorTextItem}`"
                    class="SidebarResizableContainer__item__box__item__title" >
                    {{ title }}
                    </div>
                    <div class="SidebarResizableContainer__item__box__item__boxImg">
                        <img
                        :src="image"
                        >
                    </div>
                </div>
                <div class="subSectionContainer"
                v-if="deployedSection && deployed && subSection">
                    <div
                    class="subSection"
                    v-for="(section, index) in subSection"
                    :key="index"
                    @click="handleSubNavigation(section)"
                    >
                        <div class="subSection__title">
                            {{ section.title }}
                        </div>
                        <div
                        v-if="section.image"
                        class="subSection__img">
                            <img
                            :src="section.image"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

