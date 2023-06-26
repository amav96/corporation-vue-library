export function mockFetch(backendResponse : any): Promise<Response>  {
    return new Promise((resolve, reject) => {
      resolve( backendResponse as Response) ;
    });
  }

export const getOptionMultiSelect = (wrapper : any, selector: string, option : string) => {
  return wrapper.find(`[aria-owns="listbox-${selector}"] .multiselect__content-wrapper .multiselect__content #${option} .multiselect__option`)
}