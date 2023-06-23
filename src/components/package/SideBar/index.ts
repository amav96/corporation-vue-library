import { App, Plugin } from 'vue'

import SideBar from './SideBar.vue'
import ItemSideBar from './ItemSideBar.vue'

export default {
    install(Vue: App) {
        Vue.component(SideBar.name, SideBar)
        Vue.component(ItemSideBar.name, ItemSideBar)
    }
} as Plugin

export {
    SideBar,
    ItemSideBar
}