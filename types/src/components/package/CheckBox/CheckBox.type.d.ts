import { BaseInputProps } from "../Input/Input.type";
export declare const CheckBoxPropType: {
    label: {
        type: StringConstructor;
    };
    trackBy: {
        type: StringConstructor;
    };
    id: {
        type: StringConstructor;
    };
    name: {
        type: StringConstructor;
    };
    listenChange: {
        type: BooleanConstructor;
    };
    listenForm: {
        type: BooleanConstructor;
    };
    keyName: {
        type: StringConstructor;
    };
    uncheckedValue: {
        type: null;
    };
    option: {
        type: null;
        required: boolean;
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
export interface CheckBox extends BaseInputProps {
    option?: object | number | string | boolean;
    label?: string;
    trackBy?: string;
    id?: string;
    name?: string;
    listenChange?: boolean;
    listenForm?: boolean;
    keyName?: string;
    uncheckedValue?: any;
}
export interface CheckBoxKey extends CheckBox {
    key: string;
}
