import { App, Plugin } from 'vue'

import Form from './Form.vue'

export default {
    install(Vue: App) {
        Vue.component(Form.name, Form)
    }
} as Plugin

export {
    Form as Form
}