import { BaseInputProps } from "../Input/Input.type";
export declare type AcceptTypes = "application/vnd.ms-excel" | "application/pdf" | "image/png" | "image/jpeg" | "image/jpg";
export interface PropsFile extends BaseInputProps {
    accept?: Array<AcceptTypes>;
    listenChange?: boolean;
    listenForm?: boolean;
}
export declare const PropsFilePropType: {
    accept: {
        type: any;
        validator: (value: string[]) => boolean;
        default: () => string[];
    };
    listenChange: {
        type: BooleanConstructor;
    };
    listenForm: {
        type: BooleanConstructor;
    };
    resetOnOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: any;
    };
    value: {
        type: null;
        default: null;
    };
    state: {
        type: null;
        default: null;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    hidden: {
        type: BooleanConstructor;
    };
    customClass: {
        type: StringConstructor;
        default: string;
    };
    validations: {
        type: any;
    };
    errors: {
        type: any;
        default: () => never[];
    };
    formatValue: {
        type: FunctionConstructor;
    };
};
