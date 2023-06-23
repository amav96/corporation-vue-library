<script lang='ts' setup>
import { toRefs, ref, watch } from 'vue';
import { ItemTab } from '@packageTypes'

const props = withDefaults(defineProps<{
    tabs: Array<ItemTab>,
    defaultTab?: string
}>(), {
    defaultTab : ''
})

const {
    tabs,
    defaultTab
} = toRefs(props)

const emit = defineEmits<{
  (e: "onChange", value: { index: number, tab : ItemTab}): void;
}>();

const currentTab = ref<number>(0)

const getBg = (index: number, tab: ItemTab): string => {
    if(currentTab.value === index) return tab.currentTabBgColor
    return tab.bgColor
}

const getText = (index: number, tab: ItemTab): string => {
    if(currentTab.value === index) return tab.currentTabTextColor
    return tab.textColor
}

const selectTab = (index: number, tab: ItemTab) => {
    currentTab.value = index
    emit('onChange', { index, tab})
}

watch(defaultTab, async (value: string) => {
    tabs.value.forEach((tab, index) => {
        if(tab.id === value){
            emit('onChange', { index, tab})
            currentTab.value = index
        }
    })
})



</script>
<template>
    <div class="d-flex flex-row flex-wrap  border border-secondary TabBar justify-content-around">
        <div v-for="(tab,index) in tabs"
        @click="selectTab(index, tab)"
        :key="index"
        :class="`TabBar__item text-center ${getBg(index, tab)} ${getText(index, tab)}`"
        >
            {{ tab.title }}
        </div>
    </div>
</template>

<style>
.TabBar{
    border-radius: 15px;
    width: 100%;
}

.TabBar__item{
    border-radius: 15px;
    flex-grow: 1;
    flex-basis: 0;
    padding: 4px 3px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>