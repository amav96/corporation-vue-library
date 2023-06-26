import { App, Plugin } from 'vue'
import TextArea from './TextArea.vue'

export default {
    install(Vue: App) {
        Vue.component(TextArea.name, TextArea)
    }
} as Plugin

export {
    TextArea as TextArea
}