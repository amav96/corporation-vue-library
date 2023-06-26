import { BaseInputProps } from "../Input/Input.type";
export declare const PropsDatePickerPropType: {
    modelType: {
        type: StringConstructor;
        default: string;
    };
    format: {
        type: StringConstructor;
        default: string;
    };
    autoApply: {
        type: BooleanConstructor;
        default: boolean;
    };
    listenForm: {
        type: BooleanConstructor;
    };
    listenChange: {
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
export interface PropsDatePicker extends BaseInputProps {
    format?: string;
    modelType?: string;
    autoApply?: boolean;
    listenChange?: boolean;
    listenForm?: boolean;
}
export interface PropsDatePickerClaim extends PropsDatePicker {
    key: string;
}
