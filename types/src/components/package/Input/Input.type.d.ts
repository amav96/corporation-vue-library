import type { Validations } from "../../../packageTypes";
export declare const baseInputPropsPropType: {
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
export declare const PropsInputPropType: {
    listenChange: {
        type: BooleanConstructor;
    };
    listenForm: {
        type: BooleanConstructor;
    };
    listenFocus: {
        type: BooleanConstructor;
    };
    preppendClass: {
        type: StringConstructor;
        default: string;
    };
    iconLeft: {
        type: StringConstructor;
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
export interface BaseInputProps {
    placeholder?: string;
    value?: any;
    type?: 'text' | 'password' | 'number' | 'time' | 'date' | 'color' | 'slot' | 'checkbox' | 'select' | 'multiselect' | 'datetime' | 'file' | 'textarea' | 'email';
    title?: string;
    disabled?: boolean;
    state?: Boolean | null | undefined;
    hidden?: boolean;
    customClass?: string;
    validations?: Validations;
    errors?: Array<string>;
    key?: string;
    formatValue?: Function;
}
export interface PropsInput extends BaseInputProps {
    listenChange?: boolean;
    listenForm?: boolean;
    listenFocus?: boolean;
    preppendClass?: string;
    iconLeft?: string;
}
export declare type BaseInput = Omit<BaseInputProps, "multiple">;
