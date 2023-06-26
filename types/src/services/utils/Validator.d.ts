import { Validations, Validator as ValidatorEntity } from "../../types/validations.type";
export declare class Validator implements ValidatorEntity {
    errors: Array<string>;
    required: boolean;
    min: boolean;
    max: boolean;
    contain: boolean;
    email: boolean;
    message: boolean;
    string: boolean;
    number: boolean;
    validate(value: any, validations: Validations): void;
    get getErrors(): Array<string>;
}
