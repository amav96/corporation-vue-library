"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var Validator_1 = require("@services/utils/Validator");
var Validations_1 = require("@services/utils/Validations");
function useError(validations) {
    // state encapsulated and managed by the composable
    var errorMessages = vue_1.ref([]);
    var hasError = vue_1.ref(null);
    // empieza en null para que cuando sea cambiando de null a true o false
    // pueda ser observado desde arafue
    // Validator
    var validator = new Validator_1.Validator();
    // a composable can update its managed state over time.
    var handleValidations = function (value) {
        if (validations) {
            validator.validate(value, validations);
            if (!Validations_1.isEmpty(validator.getErrors)) {
                errorMessages.value = validator.getErrors;
                hasError.value = true;
            }
            else {
                errorMessages.value = [];
                hasError.value = false;
            }
        }
    };
    // Computed Properties
    var isFormValid = vue_1.computed(function () { return Validations_1.isEmpty(errorMessages.value) || !hasError; });
    // expose managed state as return value
    return { errorMessages: errorMessages, hasError: hasError, isFormValid: isFormValid, handleValidations: handleValidations };
}
exports.useError = useError;
