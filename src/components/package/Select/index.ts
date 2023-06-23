import { App, Plugin } from 'vue'

import Select from './Select.vue'

export default {
    install(Vue: App) {
        Vue.component(Select.name, Select)
    }
} as Plugin

export {
    Select
}