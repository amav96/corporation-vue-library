import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import ModalForm from '../ModalForm.vue';
import { createApp } from 'vue';
import { nombreInput, descripcionInput, fechaNacimientoInput, paisSelect, mayorDeEdadInput,documentosInput} from '../../../../../tests/assets/inputs'
import BootstrapVue3 from 'bootstrap-vue-3';
import { Routes } from '@services/utils/Routes';
import { mockFetch } from '@services/utils/Test';

describe('ModalForm component', () => {
  function mountFunction(component: any, $options = {}) {
    const app = createApp(component);
    app.use(BootstrapVue3);
    return mount(component, {
      plugins: [app],
      ...$options,
    });
  }

  let originalFetch : any;
  afterEach(() => {
    global.fetch = originalFetch
  })

  const formInputs: any = [
    nombreInput,
    descripcionInput,
    fechaNacimientoInput,
    paisSelect,
    mayorDeEdadInput,
    documentosInput,
  ]

  it('render correctly every input', async () => {

    const propsData = {
        inputs : formInputs,
        urlStore: Routes.ROLES.STORE,
        urlUpdate: Routes.ROLES.UPDATE,
        urlShow: Routes.ROLES.SHOW,
        isEditMode: false,
        visible: true,
        resetAfterClose: '',
    }

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve([]);
      },
    }));

    const wrapper = mountFunction(ModalForm, {
        props: propsData,
        attachToDocument: true
    });
    wrapper.vm.internalVisible = true
    await wrapper.vm.$nextTick();
    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    expect(textInput.exists()).toBe(true);

    const textareaInput = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    expect(textareaInput.exists()).toBe(true);

    const dateInput = wrapper.find(`input[placeholder="${fechaNacimientoInput.placeholder}"]`)
    expect(dateInput.exists()).toBe(true);

    const select = wrapper.find(`[aria-owns=listbox-${paisSelect.placeholder}]`)
    expect(select.exists()).toBe(true);

    const checkBox = wrapper.find(`input[name="checkbox-${mayorDeEdadInput.key}"]`)
    expect(checkBox.exists()).toBe(true);

    const file = wrapper.find(`.${documentosInput.placeholder}-file`)
    expect(file.exists()).toBe(true);

  })

  it('check value inputs when open to edit', async () => {

    const propsData = {
      inputs : [
        nombreInput,
        descripcionInput],
      urlStore: Routes.ROLES.STORE,
      urlUpdate: Routes.ROLES.UPDATE,
      updateRequestConfiguration: {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json; charset=UTF-8'
        }
      },
      urlShow: Routes.ROLES.SHOW,
      isEditMode: false,
      visible: '',
      resetAfterClose: '',
    }

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : {
            nombre: 'Martin',
            descripcion: 'Trabajador'
          }
        });
      },
    }));

    const wrapper = mountFunction(ModalForm, {
        props: propsData,
        attachToDocument: true
    });

    wrapper.setProps({
      isEditMode: true
    })
    wrapper.vm.internalVisible = true
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 200));
    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    let valueText = (textInput.element as HTMLInputElement).value
    const textarea = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    let valueTextarea = (textarea.element as HTMLInputElement).value

    expect(valueText).toEqual('Martin')
    expect(valueTextarea).toEqual('Trabajador')
  }, 1500)

  it('should send METHOD POST and correct object to backend when edit', async () => {

    const propsData = {
      inputs : [
        nombreInput,
        descripcionInput],
      urlStore: Routes.ROLES.STORE,
      urlUpdate: Routes.ROLES.UPDATE,
      updateRequestConfiguration: {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json; charset=UTF-8'
      }
      },
      urlShow: Routes.ROLES.SHOW,
      isEditMode: true,
      visible: true,
      resetAfterClose: false
    }
    // Primer fetch para obtener la entidad
    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : {
            nombre: 'Martin',
            descripcion: 'Trabajador'
          }
        });
      },
    }));

    const wrapper = mountFunction(ModalForm, {
        props: propsData,
        attachToDocument: true
    });

    wrapper.setProps({
      isEditMode: true
    })
    wrapper.vm.internalVisible = true
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 200));
    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    textInput.setValue('Martin editado')
    const textarea = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    textarea.setValue('Trabajador editado')

    global.fetch = originalFetch;
    // segundo fetch para guardar al editar
    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : [
            {
              nombre: 'Martin',
              descripcion: 'Trabajador'
            }
          ]
        });
      },
    }));

    const formSubmit = wrapper.find('form')
    await formSubmit.trigger('submit')

    expect(fetch).toHaveBeenCalledWith(
      propsData.urlUpdate,
      {
        ...propsData.updateRequestConfiguration,
        body: JSON.stringify({
          nombre: 'Martin editado',
          descripcion: 'Trabajador editado'
        })
      }
    );
  }, 1500)

  it('should send METHOD POST and default value with correct object to backend when edit', async () => {

    const propsData = {
      inputs : [
        nombreInput,
        descripcionInput],
      urlStore: Routes.ROLES.STORE,
      urlUpdate: Routes.ROLES.UPDATE,
      updateRequestConfiguration: {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json; charset=UTF-8'
        }
      },
      updateDefaultParams: {
        _method: 'PATCH'
      },
      urlShow: Routes.ROLES.SHOW,
      isEditMode: true,
      visible: true,
      resetAfterClose: false
    }
    // Primer fetch para obtener la entidad
    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : {
            nombre: 'Martin',
            descripcion: 'Trabajador'
          }
        });
      },
    }));

    const wrapper = mountFunction(ModalForm, {
        props: propsData,
        attachToDocument: true
    });

    wrapper.setProps({
      isEditMode: true
    })
    wrapper.vm.internalVisible = true
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 200));
    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    textInput.setValue('Martin editado')
    const textarea = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    textarea.setValue('Trabajador editado')

    global.fetch = originalFetch;
    // segundo fetch para guardar al editar
    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : {
            nombre: 'Martin editado',
            descripcion: 'Trabajador editado'
          }
        });
      },
    }));

    const formSubmit = wrapper.find('form')
    await formSubmit.trigger('submit')

    expect(fetch).toHaveBeenCalledWith(
      propsData.urlUpdate,
      {
        ...propsData.updateRequestConfiguration,
        body: JSON.stringify({
          nombre: 'Martin editado',
          descripcion: 'Trabajador editado',
          _method: 'PATCH'
        })
      }
    );
  }, 1500)
  

  it('should send METHOD POST and correct object to backend when create', async () => {

    const propsData = {
      inputs : [
        nombreInput,
        descripcionInput],
      urlStore: Routes.ROLES.STORE,
      storeRequestConfiguration : {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json; charset=UTF-8'
        }
      },
      urlUpdate: Routes.ROLES.UPDATE,
      urlShow: Routes.ROLES.SHOW,
      isEditMode: false,
      visible: '',
      resetAfterClose: '',
  }

  global.fetch = jest.fn().mockImplementation(() => mockFetch({
    json() {
      return Promise.resolve([]);
    },
  }));

  const wrapper = mountFunction(ModalForm, {
      props: propsData,
      attachToDocument: true
  });
  wrapper.vm.internalVisible = true
  await wrapper.vm.$nextTick();
  
  const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
  textInput.setValue('Martin')

  const textareaInput = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
  textareaInput.setValue('Trabajador')

  const formSubmit = wrapper.find('form')
  await formSubmit.trigger('submit')

    expect(fetch).toHaveBeenCalledWith(
      propsData.urlStore,
      {
        ...propsData.storeRequestConfiguration,
        body: JSON.stringify({
          nombre: 'Martin',
          descripcion: 'Trabajador'
        })
      }
    );
  })

  it('should emit afterUpdate after edit', async () => {

    const propsData = {
      inputs : [
        nombreInput,
        descripcionInput],
      urlStore: Routes.ROLES.STORE,
      urlUpdate: Routes.ROLES.UPDATE,
      updateRequestConfiguration: {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json; charset=UTF-8'
        }
      },
      updateDefaultParams: {
        _method: 'PATCH'
      },
      urlShow: Routes.ROLES.SHOW,
      isEditMode: true,
      visible: true,
      resetAfterClose: false
    }
    // Primer fetch para obtener la entidad
    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : {
            nombre: 'Martin',
            descripcion: 'Trabajador'
          }
        });
      },
    }));

    const wrapper = mountFunction(ModalForm, {
        props: propsData,
        attachToDocument: true
    });

    wrapper.setProps({
      isEditMode: true
    })
    wrapper.vm.internalVisible = true
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 200));
    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    textInput.setValue('Martin editado')
    const textarea = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    textarea.setValue('Trabajador editado')

    global.fetch = originalFetch;
    // segundo fetch para guardar al editar
    const updated = {
      nombre: 'Martin editado',
      descripcion: 'Trabajador editado'
    }
    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : updated
        });
      },
    }));

    const formSubmit = wrapper.find('form')
    await formSubmit.trigger('submit')

    await new Promise(resolve => setTimeout(resolve, 200));

    const emit: any = wrapper.emitted()
    expect(emit.afterUpdate[0][0]).toEqual(updated)
  }, 1500)

  it('should emit afterStore after store', async () => {

    const propsData = {
      inputs : [
        nombreInput,
        descripcionInput],
      urlStore: Routes.ROLES.STORE,
      storeRequestConfiguration : {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json; charset=UTF-8'
        }
      },
      urlUpdate: Routes.ROLES.UPDATE,
      urlShow: Routes.ROLES.SHOW,
      isEditMode: false,
      visible: true,
      resetAfterClose: true,
  }

    const created = {
      nombre: 'Martin',
      descripcion: 'Trabajador'
    }
    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : created
        });
      },
    }));

    const wrapper = mountFunction(ModalForm, {
        props: propsData,
        attachToDocument: true
    });
    wrapper.vm.internalVisible = true
    await wrapper.vm.$nextTick();
    
    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    textInput.setValue(created.nombre)

    const textareaInput = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    textareaInput.setValue(created.descripcion)

    const formSubmit = wrapper.find('form')
    await formSubmit.trigger('submit')

    await new Promise(resolve => setTimeout(resolve, 200));

    const emit: any = wrapper.emitted()
    expect(emit.afterStore[0][0]).toEqual(created)
  })

});