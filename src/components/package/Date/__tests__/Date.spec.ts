import { mount } from '@vue/test-utils';
import BootstrapVue3 from 'bootstrap-vue-3';
import '@testing-library/jest-dom';
import Date from '../Date.vue';
import { createApp } from 'vue';
import { Validations } from '../../../../types/validations.type';


describe('Date component', () => {
  function mountFunction(component: any, $options = {}) {
    const app = createApp(component);
    app.use(BootstrapVue3);
    return mount(component, {
      plugins: [app],
      ...$options,
    });
  }

  it('should render errors correctly when has external errors', async () => {

    const placeholder = 'Fecha de nacimiento';
    const value = null;
    const validations : Validations = { rules: { required: true } };
    const errors: string[] = [];
  
    const wrapper = mountFunction(Date, {
      props: {
        placeholder,
        value,
        validations,
        errors,
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 500));

    await wrapper.setProps({ errors: ['Es obligatorio'] });
    await wrapper.vm.$nextTick();
  
    const divElement = wrapper.find('.invalid-feedback');
    expect(divElement.exists()).toBe(true);
  
    const generatedErrors = ['Es obligatorio'];
    const text = divElement.text();
    expect(text).toContain(generatedErrors[0]);
  }, 5000);

  it('should emit update:model-value when execute onDatePicker method', async () => {

    const placeholder = 'Fecha de nacimiento';
    const value = null;
    const validations : Validations = { rules: { required: true } };
    const errors: string[] = [];
  
    const wrapper = mountFunction(Date, {
      props: {
        placeholder,
        value,
        validations,
        errors,
      },
    });

    const newValue = '03/05/2023 11:41'
    await wrapper.vm.onDatePicker(newValue);

    const emit : any = wrapper.emitted('update:model-value')
    expect(emit[0][0]).toEqual(newValue)

  })

  it('should emit onDatePicker when execute onDatePicker method and listenChange is true', async () => {
    const placeholder = 'Fecha de nacimiento';
    const value = null;
    const validations : Validations = { rules: { required: true } };
    const errors: string[] = [];
    const listenChange = true
  
    const wrapper = mountFunction(Date, {
      props: {
        placeholder,
        value,
        validations,
        errors,
        listenChange
      },
    });

    const newValue = '03/05/2023 11:41'
    await wrapper.vm.onDatePicker(newValue);

    const emit : any = wrapper.emitted('onDatePicker')
    expect(emit[0][0]).toEqual(newValue)

  })

  it('should emit onDatePicker when execute onDatePicker method and listenForm is true', async () => {

    const placeholder = 'Fecha de nacimiento';
    const value = null;
    const validations : Validations = { rules: { required: true } };
    const errors: string[] = [];
    const listenForm = true
  
    const wrapper = mountFunction(Date, {
      props: {
        placeholder,
        value,
        validations,
        errors,
        listenForm
      },
    });

    const newValue = '03/05/2023 11:41'
    await wrapper.vm.onDatePicker(newValue);

    const emit : any = wrapper.emitted('onDatePicker')
    expect(emit[0][0]).toEqual(newValue)

  })

  it('should render errors when execute onClose and value is empty', async () => {

    const placeholder = 'Fecha de nacimiento';
    const value = null;
    const validations : Validations = { rules: { required: true } };
    const errors: string[] = [];
  
    const wrapper = mountFunction(Date, {
      props: {
        placeholder,
        value,
        validations,
        errors,
      },
    });

    await wrapper.vm.onClose();

    await wrapper.vm.$nextTick();
  
    const divElement = wrapper.find('.invalid-feedback');
    expect(divElement.exists()).toBe(true);

  })


});