"use strict";
exports.__esModule = true;
function mockFetch(backendResponse) {
    return new Promise(function (resolve, reject) {
        resolve(backendResponse);
    });
}
exports.mockFetch = mockFetch;
exports.getOptionMultiSelect = function (wrapper, selector, option) {
    return wrapper.find("[aria-owns=\"listbox-" + selector + "\"] .multiselect__content-wrapper .multiselect__content #" + option + " .multiselect__option");
};
