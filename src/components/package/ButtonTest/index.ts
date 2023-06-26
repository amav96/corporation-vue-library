import { App, Plugin } from 'vue';
import ButtonTest from './ButtonTest.vue';

export default {
    install: (Vue: App) => {
       return Vue.component(ButtonTest.name, ButtonTest);
    },
} as Plugin;

export {
    ButtonTest,
};
