import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import Form from '../Form.vue';
import { createApp } from 'vue';
import { nombreInput, descripcionInput, fechaNacimientoInput, paisSelect, mayorDeEdadInput,documentosInput} from '../../../../../tests/assets/inputs'
import { getOptionMultiSelect } from '@services/utils/Test';
import BootstrapVue3 from 'bootstrap-vue-3';
import { getValuesInArrayObjects } from '@services/utils/Formatters';

describe('Form component', () => {
  function mountFunction(component: any, $options = {}) {
    const app = createApp(component);
    app.use(BootstrapVue3);
    return mount(component, {
      plugins: [app],
      ...$options,
    });
  }

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
        inputs : formInputs
    }

    const wrapper = mountFunction(Form, {
        props: propsData,
    });

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

  it('render slot inside', async () => {

    const propsData = {
        inputs : [
          {
            key: 'body',
            slot: true
          }
        ]
    }

    const slot = "<input type='text' placeholder='body' name='body' />"
    const wrapper = mountFunction(Form, {
      props: propsData,
      slots: {
        body: slot
      }
    });

    expect(wrapper.html()).toContain('<div class=\"col-12 justify-content-center align-items-center my-2\"><input type=\"text\" placeholder=\"body\" name=\"body\"></div>')

  })

  it('should send correct object', async () => {

    const initialValues = {
      nombre: 'Tomas',
      descripcion: 'Excelente',
      fecha_nacimiento: '03/05/2023 11:41',
      pais: [ { nombre: "Argentina", id: 1 } ],
      mayor_de_edad: true,
      documentos: [{type: 'image/png'},{type: 'image/jpg'},{type: 'image/jpeg'}]
    }

    const propsData = {
        inputs : formInputs.map((input : any) => {
          if(input.key === 'fecha_nacimiento'){
            return {
              ...input,
              value: '03/05/2023 11:41'
            }
          } else {
            return input
          }
        })
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
      attachToDocument: true,
      slots: {
        buttons: '<button id="EnviarForm" type="submit"> Enviar formulario</button>'
      }
    });

    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    await textInput.setValue(initialValues.nombre)

    const textareaInput = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    await textareaInput.setValue(initialValues.descripcion)

    const firstOption = getOptionMultiSelect(wrapper, 'Pais', 'Pais-0')
    await firstOption.trigger('click')

    const checkBox = wrapper.find(`input[name="checkbox-${mayorDeEdadInput.key}"]`)
    expect(checkBox.exists()).toBe(true)
    await checkBox.setValue(initialValues.mayor_de_edad)


    const file = wrapper.find(`.${documentosInput.placeholder}-file input[type="file"]`)

    const changeEvent = new Event('change', { bubbles: true });
    Object.defineProperty(file.element, 'files', {
      value: initialValues.documentos,
    });
    file.element.dispatchEvent(changeEvent);

    const formSubmit = wrapper.find('form')
    await formSubmit.trigger('submit')

    const emit:any = wrapper.emitted()
    const expectedObject = {
      items: initialValues,
      isFormValid: true
    }

    expect(emit.onSubmit[0][0]).toEqual(expectedObject)
  })

  it('should be isFormValid false', async () => {
    const propsData = {
        inputs : formInputs.map((input : any) => {
          return {
            ...input,
            validations: {
              rules: { required: true}
            }
          }
        })
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
      attachToDocument: true,
      slots: {
        buttons: '<button id="EnviarForm" type="submit"> Enviar formulario</button>'
      }
    });

    const formSubmit = wrapper.find('form')
    await formSubmit.trigger('submit')

    const emit:any = wrapper.emitted()
    expect(emit.onSubmit[0][0].isFormValid).toEqual(false)
  })

  it('should set erros in every input', async () => {

    const formInputsa: any = [
      nombreInput,
      descripcionInput,
      fechaNacimientoInput,
      paisSelect,
      mayorDeEdadInput,
      documentosInput,
    ]
    const propsData = {
      inputs : formInputsa.map((input : any) => {
        return {
          ...input,
          validations: {
            rules: { required: true}
          }
        }
      })
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });
    wrapper.vm.isValid()
    await wrapper.vm.$nextTick();

    const expectedErrors = ['Es obligatorio'];

    wrapper.vm.generatedForm.forEach((obj: any) => {
      expect(obj.errors).toEqual(expectedErrors);
    });
  })

  it('should format correctly', async () => {

    const initialValues = {
      nombre: 'Tomas',
      descripcion: 'Excelente',
      fecha_nacimiento: '03/05/2023 11:41',
      pais: [ { nombre: "Argentina", id: 1 } ],
      mayor_de_edad: true,
      documentos: [{type: 'image/png'},{type: 'image/jpg'},{type: 'image/jpeg'}]
    }

    const propsData = {
        inputs : formInputs.map((input : any) => {
          if(input.key === 'fecha_nacimiento'){
            return {
              ...input,
              value: '03/05/2023 11:41'
            }
          }else if(input.key === 'pais'){
            return {
              ...input,
              formatValue: (item: any) => {
                return getValuesInArrayObjects(item)
              }
            }
          } else {
            return input
          }
        })
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
      attachToDocument: true,
      slots: {
        buttons: '<button id="EnviarForm" type="submit"> Enviar formulario</button>'
      }
    });

    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    await textInput.setValue(initialValues.nombre)

    const textareaInput = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    await textareaInput.setValue(initialValues.descripcion)

    const firstOption = getOptionMultiSelect(wrapper, 'Pais', 'Pais-0')
    await firstOption.trigger('click')

    const checkBox = wrapper.find(`input[name="checkbox-${mayorDeEdadInput.key}"]`)
    expect(checkBox.exists()).toBe(true)
    await checkBox.setValue(initialValues.mayor_de_edad)
    // await checkBox.trigger('click')

    const file = wrapper.find(`.${documentosInput.placeholder}-file input[type="file"]`)

    const changeEvent = new Event('change', { bubbles: true });
    Object.defineProperty(file.element, 'files', {
      value: initialValues.documentos,
    });
    file.element.dispatchEvent(changeEvent);

    const formSubmit = wrapper.find('form')
    await formSubmit.trigger('submit')

    const emit:any = wrapper.emitted()
    const expectedObject = {
      items: {
        ...initialValues,
        pais: [1]
      },
      isFormValid: true
    }
    expect(emit.onSubmit[0][0]).toEqual(expectedObject)
  })

  it('reset values correctly', async () => {

    const initialValues = {
      nombre: 'Tomas',
      descripcion: 'Excelente',
      fecha_nacimiento: '03/05/2023 11:41',
      pais: [ { nombre: "Argentina", id: 1 } ],
      mayor_de_edad: true,
      documentos: [{type: 'image/png'},{type: 'image/jpg'},{type: 'image/jpeg'}]
    }

    const propsData = {
        inputs : formInputs.map((input : any) => {
          if(input.key === 'fecha_nacimiento'){
            return {
              ...input,
              value: '03/05/2023 11:41'
            }
          } else {
            return input
          }
        })
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
      attachToDocument: true,
      slots: {
        buttons: '<button id="EnviarForm" type="submit"> Enviar formulario</button>'
      }
    });

    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    await textInput.setValue(initialValues.nombre)

    const textareaInput = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    await textareaInput.setValue(initialValues.descripcion)

    const firstOption = getOptionMultiSelect(wrapper, 'Pais', 'Pais-0')
    await firstOption.trigger('click')

    const checkBox = wrapper.find(`input[name="checkbox-${mayorDeEdadInput.key}"]`)
    expect(checkBox.exists()).toBe(true)
    await checkBox.setValue(initialValues.mayor_de_edad)

    const file = wrapper.find(`.${documentosInput.placeholder}-file input[type="file"]`)

    const changeEvent = new Event('change', { bubbles: true });
    Object.defineProperty(file.element, 'files', {
      value: initialValues.documentos,
    });
    file.element.dispatchEvent(changeEvent);

    const formSubmit = wrapper.find('form')
    await formSubmit.trigger('submit')

    wrapper.vm.resetValues()
    await wrapper.vm.$nextTick();
    const expectObject = {
      nombre: null,
      descripcion: null,
      fecha_nacimiento: null,
      pais: null,
      mayor_de_edad: null,
      documentos: null
    }
    expect(wrapper.vm.formValues).toEqual(expectObject)

    const expectArray = [
      {
        key: 'nombre',
        type: 'text',
        placeholder: 'Nombre',
        value: '',
        state: null,
        cols: 6
      },
      {
        key: 'descripcion',
        type: 'textarea',
        placeholder: 'Descripcion',
        value: '',
        state: null,
        cols: 6
      },
      {
        key: 'fecha_nacimiento',
        type: 'datetime',
        placeholder: 'Fecha nacimiento',
        value: '',
        state: null,
        cols: 6
      },
      {
        key: 'pais',
        type: 'select',
        placeholder: 'Pais',
        value: [],
        options: [
          { nombre: "Argentina", id: 1 },
          { nombre: "Uruguay", id: 2 },
          { nombre: "Paraguay", id: 3 },
          { nombre: "Chile", id: 4 },
          { nombre: "Ecuador", id: 5 }
        ],
        multiple: true,
        state: null,
        cols: 6
      },
      {
        key: 'mayor_de_edad',
        type: 'checkbox',
        option: true,
        value: null,
        state: null,
        cols: 6
      },
      {
        key: 'documentos',
        placeholder: 'Documentos',
        type: 'file',
        value: null,
        state: null,
        cols: 6
      }
    ]

    expect(wrapper.vm.generatedForm).toEqual(expectArray)
  })

  it('set value correctly', async () => {

    const propsData = {
      inputs : [nombreInput]
    }
    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    wrapper.vm.setValue({ key: 'nombre', value: 'tomasito'})
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.formValues.nombre).toEqual('tomasito')
  })

  it('checkbox should emit event -> switch when have listenChange=true', async () => {
    const newCheckBox = {
      ...mayorDeEdadInput,
      listenChange: true
    }
    const propsData = {
      inputs : [newCheckBox]
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    const checkBox = wrapper.find(`input[name="checkbox-${mayorDeEdadInput.key}"]`)
    await checkBox.setValue(true)
    const emit:any = wrapper.emitted()
    expect(emit.switch[0][0]).toEqual({
      value: true,
      input: newCheckBox
    })
  })

  it('checkbox should emit event -> getValues when have listenForm=true', async () => {
    const newCheckBox = {
      ...mayorDeEdadInput,
      listenForm: true
    }
    const propsData = {
      inputs : [newCheckBox]
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    const checkBox = wrapper.find(`input[name="checkbox-${mayorDeEdadInput.key}"]`)
    await checkBox.setValue(true)
    expect(wrapper.emitted().getValues).toBeTruthy();

  })

  it('date should emit event -> datePicker when have listenChange=true', async () => {
    const newDate = {
      ...fechaNacimientoInput,
      listenChange: true
    }
    const propsData = {
      inputs : [newDate]
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    const newValue = '03/05/2023 11:41'
    // Llamamos manualmente a este metodo porque no hay manera de simular la apertura del date y seleccionar una fech
    wrapper.vm.onDatePicker(newValue, {listenChange: true})

    expect(wrapper.emitted().datePicker).toBeTruthy();
  })

  it('date should emit event -> getValues when have listenForm=true', async () => {
    const newDate = {
      ...fechaNacimientoInput,
      listenForm: true
    }
    const propsData = {
      inputs : [newDate]
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    const newValue = '03/05/2023 11:41'
    // Llamamos manualmente a este metodo porque no hay manera de simular la apertura del date y seleccionar una fech
    wrapper.vm.onDatePicker(newValue, {listenForm: true})
    expect(wrapper.emitted().getValues).toBeTruthy();
  })

  it('Select should emit event -> select when have listenSelect=true', async () => {
    const newSelect = {
      ...paisSelect,
      listenSelect: true
    }
    const propsData = {
      inputs : [newSelect]
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    const element = wrapper.find('[aria-owns="listbox-Pais"]');
    await element.trigger('click')

    const firstOption = getOptionMultiSelect(wrapper, 'Pais', 'Pais-0')
    await firstOption.trigger('click')

    const emit:any = wrapper.emitted()
    const objectExpected = {
      value: [newSelect.options[0]],
      input: newSelect
    }
    expect(emit.select[0][0]).toEqual(objectExpected)
  })

  it('Select should emit event -> getValues when have listenForm=true', async () => {
    const newSelect = {
      ...paisSelect,
      listenForm: true
    }
    const propsData = {
      inputs : [newSelect]
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    const element = wrapper.find('[aria-owns="listbox-Pais"]');
    await element.trigger('click')

    const firstOption = getOptionMultiSelect(wrapper, 'Pais', 'Pais-0')
    await firstOption.trigger('click')

    expect(wrapper.emitted().getValues).toBeTruthy();
  })

  it('Select should emit event -> remove when have listenRemove=true', async () => {
    const newSelect = {
      ...paisSelect,
      listenRemove: true
    }
    const propsData = {
      inputs : [newSelect]
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    const element = wrapper.find('[aria-owns="listbox-Pais"]');
    await element.trigger('click')

    const firstOption = getOptionMultiSelect(wrapper, 'Pais', 'Pais-0')
    await firstOption.trigger('click')
    await wrapper.vm.$nextTick();

    await firstOption.trigger('click')

    const emit:any = wrapper.emitted()
    const objectExpected = {
      value: newSelect.options[0],
      input: newSelect
    }
    expect(emit.remove[0][0]).toEqual(objectExpected)

  })

  it('Input should emit event -> focus when have listenFocus=true', async () => {
    const newInput = {
      ...nombreInput,
      listenFocus: true
    }
    const propsData = {
      inputs : [newInput]
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    const written : string = 'juan de las casas';
    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    await textInput.setValue(written)
    const inputElement = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    await inputElement.trigger('focus');

    const emit:any = wrapper.emitted()
    const objectExpected = {
      value: written,
      input: newInput
    }
    expect(emit.focus[0][0]).toEqual(objectExpected)
  })

  it('Input should emit event -> change when have listenChange=true', async () => {
    const newInput = {
      ...nombreInput,
      listenChange: true
    }
    const propsData = {
      inputs : [newInput]
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    const written : string = 'juan de las casas';
    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    await textInput.setValue(written)

    const emit:any = wrapper.emitted()
    const objectExpected = {
      value: written,
      input: newInput
    }
    expect(emit.change[0][0]).toEqual(objectExpected)
  })

  it('Input should emit event -> getValues when have listenForm=true', async () => {
    const newInput = {
      ...nombreInput,
      listenForm: true
    }
    const propsData = {
      inputs : [newInput]
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    const written : string = 'juan de las casas';
    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    await textInput.setValue(written)

    const emit:any = wrapper.emitted()
    const objectExpected = {
      nombre: written
    }
    expect(emit.getValues[0][0]).toEqual(objectExpected)
  })

  it('Textarea should emit event -> focus when have listenFocus=true', async () => {
    const newTextarea = {
      ...descripcionInput,
      listenFocus: true
    }
    const propsData = {
      inputs : [newTextarea]
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    const written : string = 'juan de las casas';
    const textInput = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    await textInput.setValue(written)
    const inputElement = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    await inputElement.trigger('focus');

    const emit:any = wrapper.emitted()
    const objectExpected = {
      value: written,
      input: newTextarea
    }
    expect(emit.focus[0][0]).toEqual(objectExpected)
  })

  it('Textarea should emit event -> change when have listenChange=true', async () => {
    const newTextarea = {
      ...descripcionInput,
      listenChange: true
    }
    const propsData = {
      inputs : [newTextarea]
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    const written : string = 'juan de las casas';
    const textInput = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    await textInput.setValue(written)

    const emit:any = wrapper.emitted()
    const objectExpected = {
      value: written,
      input: newTextarea
    }
    expect(emit.change[0][0]).toEqual(objectExpected)
  })

  it('Textarea should emit event -> getValues when have listenForm=true', async () => {
    const newTextarea = {
      ...descripcionInput,
      listenForm: true
    }
    const propsData = {
      inputs : [newTextarea]
    }

    const wrapper = mountFunction(Form, {
      props: propsData,
    });

    const written : string = 'juan de las casas';
    const textInput = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    await textInput.setValue(written)

    const emit:any = wrapper.emitted()
    const objectExpected = {
      descripcion: written
    }
    expect(emit.getValues[0][0]).toEqual(objectExpected)
  })

});