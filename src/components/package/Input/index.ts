import { App, Plugin } from 'vue'

import Input from './Input.vue'

export default {
    install(Vue: App) {
        Vue.component(Input.name, Input)
    }
} as Plugin

export {
    Input as DSInput
}