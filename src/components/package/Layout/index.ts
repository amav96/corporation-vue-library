import { App, Plugin } from 'vue'

import Layout from './Layout.vue'

export default {
    install(Vue: App) {
        Vue.component(Layout.name, Layout)
    }
} as Plugin

export {
    Layout
}