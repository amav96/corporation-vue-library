import { Validations } from "../types/validations.type";
export declare function useError(validations: Validations | undefined): {
    errorMessages: import("vue").Ref<string[]>;
    hasError: import("vue").Ref<boolean | null>;
    isFormValid: import("vue").ComputedRef<boolean>;
    handleValidations: (value: string | number | boolean | object | (string | number | object)[]) => void;
};
