import { App } from 'vue'

import * as components from './components/package'


const plugin = {
    install: (app: App) => {
      for (const prop in components) {
        if (typeof components[prop as keyof object] === 'object') {
          const component = components[prop as keyof typeof components];
          app.component(component.name, component);
        }
      }
    },
  };
export default plugin