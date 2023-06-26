import { mount } from '@vue/test-utils';
import BootstrapVue3 from 'bootstrap-vue-3';
import '@testing-library/jest-dom';
import Input from '../Input.vue';
import { reactive } from 'vue';

describe('Input component', () => {
  function mountFunction(component: any, options = {}) {
    return mount(component, {
      global: {
        plugins: [BootstrapVue3],
      },
      ...options,
    });
  }

  it('renders an input with all the provided props', async () => {
    const placeholder = 'Test Placeholder';
    const value = '';
    const type = 'text';
    const state = false;
    const customClass = 'test-class';
    const validations = { rules: { required: true } };
    const errors: string[] = [];
    const listenChange = true;
    const listenForm = false;
    const listenFocus = false;
    const preppendClass = 'test-prepend-class';
    const iconLeft = 'test-icon.png';

    const wrapper = mountFunction(Input, {
      props: {
        placeholder,
        value,
        type,
        state,
        customClass,
        validations,
        errors,
        listenChange,
        listenForm,
        listenFocus,
        preppendClass,
        iconLeft,
      },
    });

    const inputElement = wrapper.find('input');
    expect(inputElement.attributes('placeholder')).toBe(placeholder);
    expect(inputElement.attributes('type')).toBe(type);
    expect(inputElement.attributes('class')).toContain(customClass);

    expect(wrapper.vm.state).toEqual(state);
    expect(wrapper.vm.validations).toEqual(validations);
    expect(wrapper.vm.errors).toEqual(errors);
    expect(wrapper.vm.listenChange).toBe(listenChange);
    expect(wrapper.vm.listenForm).toBe(listenForm);
    expect(wrapper.vm.listenFocus).toBe(listenFocus);
    expect(wrapper.vm.preppendClass).toBe(preppendClass);
    expect(wrapper.vm.iconLeft).toBe(iconLeft);
  });

  it('should emit update:model-value typing', async () => {
    const placeholder = 'Test Placeholder';
    const value = 'Test Value';
    const wrapper = mountFunction(Input, {
      props: {
        placeholder,
        value,
      },
    });

    const write : string = 'juan de las casas';
    const textInput = wrapper.find(`input[placeholder="${placeholder}"]`)
    await textInput.setValue(write)
    let valueInput : string = (wrapper.emitted('update:model-value') as string[][])?.[0][0];
    expect(valueInput).toEqual(write)

  })

  it('should emit onChange typing when have listenChange=true', async () => {
    const placeholder = 'Test Placeholder';
    const value = '';
    const listenChange = true;

    const wrapper = mountFunction(Input, {
      props: {
        placeholder,
        value,
        listenChange,
      },
    });

    const write : string = 'juan de las casas';
    const textInput = wrapper.find(`input[placeholder="${placeholder}"]`)
    await textInput.setValue(write)
    let valueInput : string = (wrapper.emitted('onChange') as string[][])?.[0][0];
    expect(valueInput).toEqual(write)

  })

  it('should emit onChange typing when have listenForm=true', async () => {
    const placeholder = 'Test Placeholder';
    const value = '';
    const listenForm = true;

    const wrapper = mountFunction(Input, {
      props: {
        placeholder,
        value,
        listenForm,
      },
    });

    const write : string = 'juan de las casas';
    const textInput = wrapper.find(`input[placeholder="${placeholder}"]`)
    await textInput.setValue(write)
    let valueInput : string = (wrapper.emitted('onChange') as string[][])?.[0][0];
    expect(valueInput).toEqual(write)

  })

  it('should emit onFocus when focused input', async () => {
    const placeholder = 'Test Placeholder';
    const value = '';
    const listenFocus = true;

    const wrapper = mountFunction(Input, {
      props: {
        placeholder,
        value,
        listenFocus,
      },
    });

    const write : string = 'juan de las casas';
    const textInput = wrapper.find(`input[placeholder="${placeholder}"]`)
    await textInput.setValue(write)
    const inputElement = wrapper.find(`input[placeholder="${placeholder}"]`)
    await inputElement.trigger('focus');
    let valueInput : string = (wrapper.emitted('onFocus') as string[][])?.[0][0];
    expect(valueInput).toEqual(write)

  })

  it('should render correctly errors when typing input and clear all', async () => {
    const placeholder = 'Test Placeholder';
    const value = '';
    const validations = { rules: { required: true } };

    const wrapper = mountFunction(Input, {
      props: {
        placeholder,
        value,
        validations
      },
    });

    const write : string = 'juan de las casas';
    const textInput = wrapper.find(`input[placeholder="${placeholder}"]`)
    await textInput.setValue(write)
    await textInput.setValue('')

    const divElement = wrapper.find('div.invalid-feedback');
    expect(divElement.exists()).toBe(true);

    const genereatedErrors = ['Es obligatorio']
    const text = divElement.text();
    expect(text).toContain(genereatedErrors[0]);

  })

  it('should render errors correctly when trigger blur event on input', async () => {
    const placeholder = 'Test Placeholder';
    const value = '';
    const validations = { rules: { required: true } };

    const wrapper = mountFunction(Input, {
      props: {
        placeholder,
        value,
        validations
      },
    });

    const inputElement = wrapper.find(`input[placeholder="${placeholder}"]`)
    await inputElement.trigger('blur');

    const divElement = wrapper.find('div.invalid-feedback');
    expect(divElement.exists()).toBe(true);

    const genereatedErrors = ['Es obligatorio']
    const text = divElement.text();
    expect(text).toContain(genereatedErrors[0]);
  });

  it('should render errors correctly when has external errors', async () => {
    const placeholder = 'Test Placeholder';
    const value = '';
    const validations = { rules: { required: true } };
    const errors = reactive<string[]>([]);
  
    const wrapper = mountFunction(Input, {
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
  
    const divElement = wrapper.find('div.invalid-feedback');
    expect(divElement.exists()).toBe(true);
  
    const generatedErrors = ['Es obligatorio'];
    const text = divElement.text();
    expect(text).toContain(generatedErrors[0]);
  }, 5000);
});