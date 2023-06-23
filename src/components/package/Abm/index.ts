import { App, Plugin } from 'vue'
import Abm from './Abm.vue'

export default {
    install(Vue: App) {
        Vue.component(Abm.name, Abm)
    }
} as Plugin

export {
    Abm
}