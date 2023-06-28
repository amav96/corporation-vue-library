import { App } from 'vue'

import * as components from './components/package'

const defaultComponents = components?.default;
const plugin = {
    install: (app: App) => {
      Object.keys(defaultComponents).forEach( name => {
        app.component(name as string, defaultComponents[name as keyof object]);
      })
    },
  };
export default plugin

export {Abm} from './components/package/Abm'
export { Button} from './components/package/Button'
export { CheckBox } from './components/package/CheckBox'
export { DSDate as Date } from './components/package/Date'
export { Dialog } from './components/package/Dialog'
export { ErrorsForm } from './components/package/ErrorsForm'
export { File } from './components/package/File'
export { Form } from './components/package/Form'
export { Input } from './components/package/Input'
export { ModalForm } from './components/package/ModalForm'
export { NavBar } from './components/package/NavBar'
export { Overlay } from './components/package/Overlay'
export { Select } from './components/package/Select'
export { SideBar } from './components/package/SideBar'
export { ItemSideBar } from './components/package/ItemSideBar'
export { Table } from './components/package/Table'
export { TextArea } from './components/package/TextArea'
export { TabBar } from './components/package/TabBar'
export { Layout } from './components/package/Layout'
export { MultipleForm } from './components/package/MultipleForm'
export {  FormFile }  from './components/package/FormFile'
export {  ActionBar }  from './components/package/ActionBar'
export { ButtonTest } from './components/package/ButtonTest'