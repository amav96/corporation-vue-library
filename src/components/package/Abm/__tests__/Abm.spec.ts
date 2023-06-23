import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import Abm from '../Abm.vue';
import { createApp } from 'vue';
import BootstrapVue3 from 'bootstrap-vue-3';
import { Routes } from '@services/utils/Routes';
import { mockFetch } from '@services/utils/Test';
import baseApiUrl from '@services/BaseApiUrl';

describe('ABM component', () => {
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

  const fields = [
    {
      key: 'id',
      label: '##',
      sortable: true
    },
    {
      key: 'descripcion',
      label: 'Descripcion',
    },
    {
      key: 'nombre',
      label: 'Nombre',
    },
    {
      key: 'edit',
      label: 'Editar'
    },
    {
      key: 'delete',
      label: 'Eliminar'
    },
  ]

  const filterInputs = [
    {
      key: "nombre",
      type : "text",
      placeholder : "Nombre",
      value : '',
      state : null,
      cols: 6
    },
    {
      key: "descripcion",
      type : "textarea",
      placeholder : "Descripcion",
      value : '',
      state : null,
      cols: 6
    },
  ]

  const formInputs = [
    {
      key: "nombre",
      type : "text",
      placeholder : "Nombre",
      value : null,
      state : null,
      cols: 6,
        validations : {
            rules : {
            required: true
            }
        }
      },
  ]

  const propModalForm = {
    inputs: formInputs,
    urlStore: Routes.ROLES.STORE,
    urlUpdate: Routes.ROLES.UPDATE,
    urlShow: Routes.ROLES.SHOW,
    afterUpdate: (data: any) => {

    },
    afterStore: (data: any) => {

    },
    showRequestConfiguration : {
      method: 'GET',
      headers: {
        Authorization: 'token'
      }
    },
    updateRequestConfiguration : {
      method: 'POST',
      headers: {
        Authorization: 'token',
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8'
      }
    },
    storeRequestConfiguration : {
      method: 'POST',
      headers: {
        Authorization: 'token',
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8'
      }
    },
    updateDefaultParams: { '_method': 'PATCH'},

  }

  const propAbm = {
    deleteIcon: `${baseApiUrl}/icons/basura.svg`,
    editIcon: `${baseApiUrl}/icons/editar.svg`,
    restoreIcon: `${baseApiUrl}/icons/restaurar.svg`,
    afterDelete : (data: any) => {

    },
    softDelete: true,
    deleteRequestConfiguration : {
      method: 'DELETE',
      headers: {
        Authorization: 'token',
      }
    },
  }

  const propTable = {
    fields: fields,
    inputs: filterInputs,
    url: Routes.ROLES.INDEX,
    requestConfiguration: {
      method: 'GET',
    },
    searchIcon: `${baseApiUrl}/icons/search.svg`,
    searchable: true,
  }

  

  it('should request to backend', async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      softDelete : propAbm.softDelete,
      deleteRequestConfiguration : propAbm.deleteRequestConfiguration
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

    const wrapper = mountFunction(Abm, {
        props: propsData,
        attachToDocument: true
    });

    expect(fetch).toHaveBeenCalledWith(
        propTable.url+ '?page=1',
        propTable.requestConfiguration
    );
  })

  it("should render button edit", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      softDelete : propAbm.softDelete,
      deleteRequestConfiguration : propAbm.deleteRequestConfiguration
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

    const wrapper = mountFunction(Abm, {
      props: propsData,
      attachToDocument: true
    });

    expect(wrapper.find('.edit-button-0').exists()).toBe(true)
  })

  it("should render button delete", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      softDelete : propAbm.softDelete,
      deleteRequestConfiguration : propAbm.deleteRequestConfiguration
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

    const wrapper = mountFunction(Abm, {
      props: propsData,
      attachToDocument: true
    });

    expect(wrapper.find('.delete-button-0').exists()).toBe(true)

  })

  it("should render button store", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      softDelete : propAbm.softDelete,
      deleteRequestConfiguration : propAbm.deleteRequestConfiguration
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

    const wrapper = mountFunction(Abm, {
      props: propsData,
      attachToDocument: true
    });

    expect(wrapper.find('.store-button').exists()).toBe(true)

  })

  it("should not render button active when sofdelete is true", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      softDelete : false,
      deleteRequestConfiguration : propAbm.deleteRequestConfiguration
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

    const wrapper = mountFunction(Abm, {
      props: propsData,
      attachToDocument: true
    });

    expect(wrapper.find('.active-button').exists()).toBe(false)

  })

  it("should not render button inactive when sofdelete is true", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      softDelete : false,
      deleteRequestConfiguration : propAbm.deleteRequestConfiguration
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

    const wrapper = mountFunction(Abm, {
      props: propsData,
      attachToDocument: true
    });

    expect(wrapper.find('.inactive-button').exists()).toBe(false)

  })

  it("should render button active when sofdelete is true", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      softDelete : true,
      deleteRequestConfiguration : propAbm.deleteRequestConfiguration
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

    const wrapper = mountFunction(Abm, {
      props: propsData,
      attachToDocument: true
    });

    expect(wrapper.find('.active-button').exists()).toBe(true)

  })

  it("should render button inactive when sofdelete is true", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      softDelete : true,
      deleteRequestConfiguration : propAbm.deleteRequestConfiguration
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

    const wrapper = mountFunction(Abm, {
      props: propsData,
      attachToDocument: true
    });

    expect(wrapper.find('.inactive-button').exists()).toBe(true)
  })

  it("should change edit parameters correctly", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      deleteRequestConfiguration : propAbm.deleteRequestConfiguration
    }

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : [
            {
              nombre: 'Martin',
              descripcion: 'Trabajador',
              id: 1
            }
          ]
        });
      },
    }));

    const wrapper = mountFunction(Abm, {
      props: propsData,
    });
    await new Promise(resolve => setTimeout(resolve, 200));

    wrapper.vm.onOpenEdit({
      item: {
        nombre: 'Martin',
        descripcion: 'Trabajador',
        id: 1
      }
    })

    expect(wrapper.vm.modalFormData.urlUpdate).toEqual(propModalForm.urlUpdate+ '/1')
    expect(wrapper.vm.modalFormData.urlShow).toEqual(propModalForm.urlShow+ '/1')
    expect(wrapper.vm.modalFormData.visible).toEqual(true)
    expect(wrapper.vm.modalFormData.isEditMode).toEqual(true)

  })

  it("should change delete parameters correctly", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      deleteRequestConfiguration : propAbm.deleteRequestConfiguration
    }

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : [
            {
              nombre: 'Martin',
              descripcion: 'Trabajador',
              id: 1
            }
          ]
        });
      },
    }));

    const wrapper = mountFunction(Abm, {
      props: propsData,
    });
    wrapper.vm.handleDelete({
      item: {
        nombre: 'Martin',
        descripcion: 'Trabajador',
        id: 1
      }
    })

    expect(wrapper.html()).toContain('¿Estas seguro?')
  })

  it("should do correct petition to backend", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      deleteRequestConfiguration : propAbm.deleteRequestConfiguration
    }

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : [
            {
              nombre: 'Martin',
              descripcion: 'Trabajador',
              id: 1
            }
          ]
        });
      },
    }));

    const wrapper = mountFunction(Abm, {
      props: propsData,
    });
    wrapper.vm.handleDelete({
      item: {
        nombre: 'Martin',
        descripcion: 'Trabajador',
        id: 1
      }
    })
    await wrapper.vm.$nextTick();

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : 
            {
              nombre: 'Martin',
              descripcion: 'Trabajador',
              id: 1
            }
        });
      },
    }));

    const buttonConfirm = wrapper.find('.dialog-0')
    buttonConfirm.trigger('click')
    await wrapper.vm.$nextTick();


    expect(fetch).toHaveBeenCalledWith(
      Routes.ROLES.DELETE + '/1',
      propAbm.deleteRequestConfiguration
    );
  })

  it("should has deleted param when click inactive", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      softDelete: true
    }

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : [
            {
              nombre: 'Martin',
              descripcion: 'Trabajador',
              id: 1
            }
          ]
        });
      },
    }));

    const wrapper = mountFunction(Abm, {
      props: propsData,
    });
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 500));

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : []
        });
      },
    }));
    
    const buttonInactive = wrapper.find('.inactive-button')
    buttonInactive.trigger('click')
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 200));

    expect(fetch).toHaveBeenCalledWith(
      Routes.ROLES.INDEX + '?page=1&deleted=true',
      propTable.requestConfiguration
    );
  })

  it("should has empty param when click active", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      softDelete: true
    }

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : [
            {
              nombre: 'Martin',
              descripcion: 'Trabajador',
              id: 1
            }
          ]
        });
      },
    }));

    const wrapper = mountFunction(Abm, {
      props: propsData,
    });
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 500));

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : []
        });
      },
    }));
    
    const buttonInactive = wrapper.find('.inactive-button')
    buttonInactive.trigger('click')
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 200));

    const buttonActive = wrapper.find('.active-button')
    buttonActive.trigger('click')

    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 200));

    expect(fetch).toHaveBeenCalledWith(
      Routes.ROLES.INDEX + '?page=1',
      propTable.requestConfiguration
    );
  })

  it("should dont exist edit in table when click inactive", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      softDelete: true
    }

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : [
            {
              nombre: 'Martin',
              descripcion: 'Trabajador',
              id: 1
            }
          ]
        });
      },
    }));

    const wrapper = mountFunction(Abm, {
      props: propsData,
    });
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 150));

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : []
        });
      },
    }));
    
    const buttonInactive = wrapper.find('.inactive-button')
    buttonInactive.trigger('click')
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 150));

    expect(wrapper.find('.edit-button-0').exists()).toBe(false)

  })

  it("should exist restore in table when click inactive", async () => {

    const propsData = {
      table: propTable,
      modalForm : propModalForm,
      urlDelete : Routes.ROLES.DELETE,
      afterDelete : propAbm.afterDelete,
      editIcon : propAbm.editIcon,
      deleteIcon : propAbm.deleteIcon,
      restoreIcon : propAbm.restoreIcon,
      softDelete: true
    }

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : [
            {
              nombre: 'Martin',
              descripcion: 'Trabajador',
              id: 1
            }
          ]
        });
      },
    }));

    const wrapper = mountFunction(Abm, {
      props: propsData,
    });
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 150));

    global.fetch = jest.fn().mockImplementation(() => mockFetch({
      json() {
        return Promise.resolve({
          data : [
            {
              nombre: 'Martin',
              descripcion: 'Trabajador',
              id: 1
            }
          ]
        });
      },
    }));
    
    const buttonInactive = wrapper.find('.inactive-button')
    buttonInactive.trigger('click')
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 150));

    expect(wrapper.find('.restore-button-0').exists()).toBe(true)

  })
});