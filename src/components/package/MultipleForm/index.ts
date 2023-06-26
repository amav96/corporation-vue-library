import { App, Plugin } from 'vue'

import MultipleForm from './MultipleForm.vue'

export default {
    install(Vue: App) {
        Vue.component(MultipleForm.name, MultipleForm)
    }
} as Plugin


export {
    MultipleForm as MultipleForm
}