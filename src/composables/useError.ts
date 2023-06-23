import { computed, ref } from "vue";
import { Validator } from "@services/utils/Validator";
import { isEmpty } from "@services/utils/Validations";
import {Validations} from "../types/validations.type"


export function useError(validations : Validations | undefined) {

    // state encapsulated and managed by the composable
    const errorMessages = ref<Array<string>>([])
    const hasError = ref<boolean | null>(null) 
    // empieza en null para que cuando sea cambiando de null a true o false
    // pueda ser observado desde arafue

    // Validator
    const validator = new Validator();
  
    // a composable can update its managed state over time.
    const handleValidations = (value: boolean | string | object | number | Array<string|number|object>) => {
        if(validations){
            validator.validate(value, validations)
        if(!isEmpty(validator.getErrors)){
            errorMessages.value = validator.getErrors
            hasError.value = true
        } else {
            errorMessages.value = []
            hasError.value = false
        }
      }
    }

    // Computed Properties
    const isFormValid = computed((): boolean => isEmpty(errorMessages.value) || !hasError );

    // expose managed state as return value
    return { errorMessages, hasError, isFormValid ,handleValidations}
  }
  
