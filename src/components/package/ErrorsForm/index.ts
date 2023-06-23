import { App, Plugin } from 'vue'

import ErrorsForm from './ErrorsForm.vue'

export default {
    install(Vue: App) {
        Vue.component(ErrorsForm.name, ErrorsForm)
    }
} as Plugin

export {
    ErrorsForm
}