import { BaseInputProps } from "../Input/Input.type";
export declare const PropsSelectPropType: {
    options: {
        type: boolean;
        default: () => never[];
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    trackBy: {
        type: StringConstructor;
        default: string;
    };
    searchable: {
        type: BooleanConstructor;
    };
    listenRemove: {
        type: BooleanConstructor;
    };
    listenSelect: {
        type: BooleanConstructor;
    };
    listenForm: {
        type: BooleanConstructor;
    };
    multiple: {
        type: BooleanConstructor;
    };
    id: {
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
export interface PropsSelect extends BaseInputProps {
    options?: Array<any>;
    label?: string;
    trackBy?: string;
    searchable?: boolean;
    listenRemove?: boolean;
    listenSelect?: boolean;
    listenForm?: boolean;
    multiple?: boolean;
}
export interface PropsSelectKey extends PropsSelect {
    key: string;
}
