import { mount } from '@vue/test-utils';
import BootstrapVue3 from 'bootstrap-vue-3';
import '@testing-library/jest-dom';
import InputFile from '../File.vue';
import { createApp } from 'vue';
import { Validations } from '@packageTypes';

describe('Select component', () => {
  function mountFunction(component: any, $options = {}) {
    const app = createApp(component);
    app.use(BootstrapVue3);
    return mount(component, {
      plugins: [app],
      ...$options,
    });
  }

  it('renders an File correctly', async () => {
    const placeholder = 'Documentos';
    const value: any[] = [];
    const validations : Validations = { rules: { required: true } };

    const wrapper = mountFunction(InputFile, {
      props: {
        placeholder,
        value,
        validations,
      },
    });

    const element = wrapper.element.querySelector('[aria-owns="listbox-Pais"]');
    expect(element).toBeDefined();
  });

  it('should render errors correctly when has external errors', async () => {

    const placeholder = 'Documentos';
    const value: any[] = [];
    const validations : Validations = { rules: { required: true } };
  
    const wrapper = mountFunction(InputFile, {
      props: {
        placeholder,
        value,
        validations,
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

  it('should emit onChange after trigger event change', async () => {
    const placeholder = 'Documento';
    const value: any[] = [];

    const wrapper = mountFunction(InputFile, {
      props: {
        placeholder,
        value,
      },
    });

    const input = wrapper.find('.Documento-file input[type="file"]');
    const mockImages = [{type: 'image/png'},{type: 'image/jpg'},{type: 'image/jpeg'}]
    const changeEvent = new Event('change', { bubbles: true });
    Object.defineProperty(input.element, 'files', {
      value: mockImages,
    });

    input.element.dispatchEvent(changeEvent);
    expect(wrapper.emitted()).toHaveProperty('onChange');

  });

  it('should emit onChange with value expected', async () => {
    const placeholder = 'Documento';
    const value: any[] = [];

    const wrapper = mountFunction(InputFile, {
      props: {
        placeholder,
        value,
      },
    });

    const mockImages = [{type: 'image/png'},{type: 'image/jpg'},{type: 'image/jpeg'}]
    await wrapper.vm.uploadFile({ target: { files: mockImages } });

    const emit: any = wrapper.emitted('onChange')
    expect(emit[0][0]).toEqual(mockImages);

  });

  it('should emit onChange with values after trigger event drop', async () => {
    const placeholder = 'Documento';
    const value: any[] = [];

    const wrapper = mountFunction(InputFile, {
      props: {
        placeholder,
        value,
      },
    });

    const contentFile = wrapper.find('.Documento-file .border-files-box');

    const mockImages = [{type: 'image/png'},{type: 'image/jpg'},{type: 'image/jpeg'}]
    await contentFile.trigger('drop', { dataTransfer: { files: mockImages } })
    const emit: any = wrapper.emitted('onChange');
    expect(wrapper.emitted()).toHaveProperty('onChange');
    expect(emit[0][0]).toEqual(mockImages)

  });

  it('should emit empty onChange (reset every time when click)', async () => {
    const placeholder = 'Documento';
    const value: any[] = [];

    const wrapper = mountFunction(InputFile, {
      props: {
        placeholder,
        value,
      },
    });

    const input = wrapper.find('.Documento-file input[type="file"]');
    await input.trigger('click');
    const emit: any = wrapper.emitted('onChange');
    expect(wrapper.emitted()).toHaveProperty('onChange');
    expect(emit[0][0]).toEqual([])

  });

  it('should show text "Archivos seleccionados" when there is images)', async () => {
    const placeholder = 'Documento';
    const value: any[] = [];

    const wrapper = mountFunction(InputFile, {
      props: {
        placeholder,
        value,
      },
    });

    const mockImages = [{type: 'image/png'},{type: 'image/jpg'},{type: 'image/jpeg'}]
    wrapper.setProps({value: mockImages})
    await wrapper.vm.$nextTick();

    const content = wrapper.find('.Documento-file');
    const text = content.text();
    expect(text).toContain('Archivos seleccionados');

  });

});