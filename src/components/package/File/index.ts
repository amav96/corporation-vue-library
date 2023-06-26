import { App, Plugin } from 'vue'

import File from './File.vue'

export default {
    install(Vue: App) {
        Vue.component(File.name, File)
    }
} as Plugin

export {
    File as File
}