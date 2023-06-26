import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import Table from '../Table.vue';
import { createApp } from 'vue';
import BootstrapVue3 from 'bootstrap-vue-3';
import { Routes } from '@services/utils/Routes';
import { mockFetch } from '@services/utils/Test';
import { nombreInput, descripcionInput } from '../../../../../tests/assets/inputs'

describe('Table component', () => {
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
  ]

  it('should request to backend', async () => {

    const propsData = {
      url: Routes.ROLES.INDEX,
      requestConfiguration : {
        method: 'GET'
      },
      searchable: true,
      inputs: formInputs
    }

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

    const wrapper = mountFunction(Table, {
        props: propsData,
        attachToDocument: true
    });

    expect(fetch).toHaveBeenCalledWith(
        propsData.url+ '?page=1',
        propsData.requestConfiguration
    );
  })

  it('should send correct filter object to backend', async () => {

    const propsData = {
      url: Routes.ROLES.INDEX,
      requestConfiguration : {
        method: 'GET'
      },
      searchable: true,
      inputs: formInputs
    }

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

    const wrapper = mountFunction(Table, {
        props: propsData,
        attachToDocument: true
    });

    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    textInput.setValue('Martin')
    const textarea = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    textarea.setValue('Trabajador')

    await new Promise(resolve => setTimeout(resolve, 100));

    const formSubmit = wrapper.find('form')
    await formSubmit.trigger('submit')

    expect(fetch).toHaveBeenCalledWith(
        propsData.url+ '?nombre=Martin&descripcion=Trabajador&page=1',
        propsData.requestConfiguration,
    );

  })

  it('should send empty object to backend after remove filters', async () => {

    const propsData = {
      url: Routes.ROLES.INDEX,
      requestConfiguration : {
        method: 'GET'
      },
      searchable: true,
      inputs: formInputs
    }

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

    const wrapper = mountFunction(Table, {
        props: propsData,
        attachToDocument: true
    });

    const textInput = wrapper.find(`input[placeholder="${nombreInput.placeholder}"]`)
    textInput.setValue('Martin')
    const textarea = wrapper.find(`textarea[placeholder="${descripcionInput.placeholder}"]`)
    textarea.setValue('Trabajador')

    await new Promise(resolve => setTimeout(resolve, 100));

    wrapper.vm.resetLookFor()

    expect(fetch).toHaveBeenCalledWith(
        propsData.url+ '?page=1',
        propsData.requestConfiguration,
    );

  })

  it('should send correct page when click next page', async () => {

    const propsData = {
      url: Routes.ROLES.INDEX,
      requestConfiguration : {
        method: 'GET'
      },
    }

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : [
            {
                nombre: 'Martin',
                descripcion: 'Trabajador'
            },
            {
                nombre: 'Martin 2',
                descripcion: 'Trabajador 2'
            }
            ,{
                nombre: 'Martin 3',
                descripcion: 'Trabajador 3'
            }
          ],
          pagination: {
            count: 10,
            current_page: 1,
            has_next_page: true,
            limit: 3,
            page_count: 4
          }
        });
      },
    }));

    const wrapper = mountFunction(Table, {
        props: propsData,
        attachToDocument: true
    });

    await new Promise(resolve => setTimeout(resolve, 100));
    const twoPage = wrapper.find('.page-item [aria-label="Go to page 2"]')
    twoPage.trigger('click')

    expect(fetch).toHaveBeenCalledWith(
        propsData.url+ '?page=2',
        propsData.requestConfiguration,
    );

  })

  it('should render correctly cell slot', async () => {

    const propsData = {
      url: Routes.ROLES.INDEX,
      requestConfiguration : {
        method: 'GET'
      },
      fields: [
        {
            key: 'nombre',
            label: 'Nombre',
            sortable: true
        },
        {
            key: 'descripcion',
            label: 'Descripcion',
        },
        {
            key: 'created_at',
            label: 'Fecha',
        },
      ]
    }

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : [
            {
                nombre: 'Martin',
                descripcion: 'Trabajador'
            },
            {
                nombre: 'Martin 2',
                descripcion: 'Trabajador 2'
            }
            ,{
                nombre: 'Martin 3',
                descripcion: 'Trabajador 3'
            }
          ],
          pagination: {
            count: 10,
            current_page: 1,
            has_next_page: true,
            limit: 3,
            page_count: 4
          }
        });
      },
    }));

    const wrapper = mountFunction(Table, {
        props: propsData,
        attachToDocument: true,
        slots: {
            ['cell(created_at)']: '<div>celda fecha</div>'
        }
    });

    expect(wrapper.html()).toContain('<div>celda fecha</div>')

  })

  it('should render correctly filter slot', async () => {

    const propsData = {
      url: Routes.ROLES.INDEX,
      requestConfiguration : {
        method: 'GET'
      },
      fields: [
        {
            key: 'nombre',
            label: 'Nombre',
            sortable: true
        },
        {
            key: 'descripcion',
            label: 'Descripcion',
        },
        {
            key: 'created_at',
            label: 'Fecha',
        },
     ],
      searchable: true,
      inputs: [...formInputs, {
        key: "apellido",
        slot: true
      }]
    }


    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : [
            {
                nombre: 'Martin',
                descripcion: 'Trabajador'
            },
            {
                nombre: 'Martin 2',
                descripcion: 'Trabajador 2'
            }
            ,{
                nombre: 'Martin 3',
                descripcion: 'Trabajador 3'
            }
          ],
          pagination: {
            count: 10,
            current_page: 1,
            has_next_page: true,
            limit: 3,
            page_count: 4
          }
        });
      },
    }));

    const wrapper = mountFunction(Table, {
        props: propsData,
        attachToDocument: true,
        slots: {
            ['filter(apellido)']: '<div>filtro apellido</div>'
        }
    });

    expect(wrapper.html()).toContain('<div>filtro apellido</div>')
  })

});