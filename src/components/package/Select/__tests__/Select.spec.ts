import { mount } from '@vue/test-utils';
import BootstrapVue3 from 'bootstrap-vue-3';
import '@testing-library/jest-dom';
import Select from '../Select.vue';
import { createApp } from 'vue';
import { Validations } from '../../../../types/validations.type';
import { getOptionMultiSelect } from '@services/utils/Test';

describe('Select component', () => {
  function mountFunction(component: any, $options = {}) {
    const app = createApp(component);
    app.use(BootstrapVue3);
    return mount(component, {
      plugins: [app],
      ...$options,
    });
  }

  const options: Array<object> = [
    {
      nombre: 'Argentina', id: 1
    },
    {
      nombre: 'Uruguay', id: 2
    },
    {
      nombre: 'Paraguay', id: 3
    },
    {
      nombre: 'Chile', id: 4
    },
    {
      nombre: 'Ecuador', id: 5
    },
  ]

  it('renders an Select correctly', async () => {
    const placeholder = 'Pais';
    const value: any[] = [];
    const multiple: boolean = true
    const type : string = 'select';
    const customClass = 'test-class';
    const validations : Validations = { rules: { required: true } };
    const errors: string[] = [];
    const listenChange: boolean = true;
    const listenForm: boolean = false;


    const wrapper = mountFunction(Select, {
      props: {
        placeholder,
        value,
        options,
        multiple,
        type,
        customClass,
        validations,
        errors,
        listenChange,
        listenForm,
      },
    });

    const element = wrapper.element.querySelector('[aria-owns="listbox-Pais"]');
    expect(element).toBeDefined();
  });

  it('should emit Array object through update:model-value when select a option', async () => {
    const placeholder = 'Pais';
    const value: any[] = [];
    const multiple: boolean = true
    const type : string = 'select';
    const customClass = 'test-class';
    const validations : Validations = { rules: { required: true } };
    const errors: string[] = [];
    const listenChange: boolean = true;
    const listenForm: boolean = false;

    const wrapper = mountFunction(Select, {
      props: {
        placeholder,
        value,
        options,
        multiple,
        type,
        customClass,
        validations,
        errors,
        listenChange,
        listenForm,
      },
    });

    const element = wrapper.find('[aria-owns="listbox-Pais"]');
    await element.trigger('click')

    const firstOption = getOptionMultiSelect(wrapper, 'Pais', 'Pais-0')
    await firstOption.trigger('click')

    const emit: any = wrapper.emitted('update:model-value')
    const expectedArray = [{nombre: 'Argentina', id: 1}]
    expect(emit[0][0]).toEqual(expectedArray)

  });

  it('should emit object through emit update:model-value when select a option', async () => {
    const placeholder = 'Pais';
    const value: any[] = [];
    const multiple: boolean = false
    const type : string = 'select';
    const customClass = 'test-class';
    const validations : Validations = { rules: { required: true } };
    const errors: string[] = [];
    const listenChange: boolean = true;
    const listenForm: boolean = false;

    const wrapper = mountFunction(Select, {
      props: {
        placeholder,
        value,
        options,
        multiple,
        type,
        customClass,
        validations,
        errors,
        listenChange,
        listenForm,
      },
    });

    const element = wrapper.find('[aria-owns="listbox-Pais"]');
    await element.trigger('click')

    const firstOption = getOptionMultiSelect(wrapper, 'Pais', 'Pais-0')
    await firstOption.trigger('click')

    const emit: any = wrapper.emitted('update:model-value')
    const expectedObject = {nombre: 'Argentina', id: 1}
    expect(emit[0][0]).toEqual(expectedObject)

  });

  it('should emit object through emit remove  when desSelect a option', async () => {
    const placeholder = 'Pais';
    const value: any[] = [];
    const multiple: boolean = true
    const type : string = 'select';
    const customClass = 'test-class';
    const validations : Validations = { rules: { required: true } };
    const errors: string[] = [];
    const listenChange: boolean = true;
    const listenForm: boolean = false;
    const listenRemove: boolean = true;

    const wrapper = mountFunction(Select, {
      props: {
        placeholder,
        value,
        options,
        multiple,
        type,
        customClass,
        validations,
        errors,
        listenChange,
        listenForm,
        listenRemove
      },
    });

    const firstOption = getOptionMultiSelect(wrapper, 'Pais', 'Pais-0')
    await firstOption.trigger('click')

    const secondOption = getOptionMultiSelect(wrapper, 'Pais', 'Pais-1')
    await secondOption.trigger('click')

    await wrapper.setProps({ value: [
      {
        nombre: 'Argentina', id: 1
      },
      {
        nombre: 'Uruguay', id: 2
      }
    ] });
    await wrapper.vm.$nextTick();

    await secondOption.trigger('click')

    const emit: any = wrapper.emitted('remove')
    const expectedObject = {nombre: 'Uruguay', id: 2}
    expect(emit[0][0]).toEqual(expectedObject)

  });

  it('should render errors when value is empty before remove tags', async () => {

    const placeholder = 'Pais';
    const value: any[] = [];
    const multiple: boolean = true
    const type : string = 'select';
    const customClass = 'test-class';
    const validations : Validations = { rules: { required: true } };
    const errors: string[] = [];

    const wrapper = mountFunction(Select, {
      props: {
        placeholder,
        value,
        options,
        multiple,
        type,
        customClass,
        validations,
        errors,
      },
    });

    const firstOption = getOptionMultiSelect(wrapper, 'Pais', 'Pais-0')
    await firstOption.trigger('click')

    const secondOption = getOptionMultiSelect(wrapper, 'Pais', 'Pais-1')
    await secondOption.trigger('click')

    await wrapper.setProps({ value: [
      {
        nombre: 'Argentina', id: 1
      },
      {
        nombre: 'Uruguay', id: 2
      }
    ]});

    await wrapper.vm.$nextTick();

    await firstOption.trigger('click')
    await secondOption.trigger('click')

    await wrapper.setProps({ value: []});
    await wrapper.vm.$nextTick();

    await wrapper.vm.handleValidations([]);
    
    await wrapper.vm.$nextTick();

    const divElement = wrapper.find('.invalid-feedback');
    expect(divElement.exists()).toBe(true);
  });

  it('should render errors correctly when has external errors', async () => {

    const placeholder = 'Pais';
    const value: any[] = [];
    const multiple: boolean = true
    const validations : Validations = { rules: { required: true } };
    const errors: string[] = [];
  
    const wrapper = mountFunction(Select, {
      props: {
        placeholder,
        value,
        validations,
        errors,
        multiple
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

  it('in the first render should process numbers array values in to objects array', async () => {
    const placeholder = 'Pais';
    const value: any[] = [1,2];
    const multiple: boolean = true
    const type : string = 'select';

    const wrapper = mountFunction(Select, {
      props: {
        placeholder,
        value,
        options,
        multiple,
        type,
      },
    });
    const emit: any = wrapper.emitted('update:model-value')
    const expectedObject = [{nombre: 'Argentina', id: 1}, {nombre: 'Uruguay', id: 2}]
    expect(emit[0][0]).toEqual(expectedObject)

  });

  it('in the first render should process numbers value in to object', async () => {
    const placeholder = 'Pais';
    const value = 1;
    const multiple: boolean = false
    const type : string = 'select';

    const wrapper = mountFunction(Select, {
      props: {
        placeholder,
        value,
        options,
        multiple,
        type,
      },
    });
    const emit: any = wrapper.emitted('update:model-value')
    const expectedObject = {nombre: 'Argentina', id: 1}
    expect(emit[0][0]).toEqual(expectedObject)

  });
});