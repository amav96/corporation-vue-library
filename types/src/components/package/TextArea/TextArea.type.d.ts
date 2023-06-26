import { BaseInputProps } from "../../../packageTypes";
export declare const PropsTextAreaPropType: {
    listenChange: {
        type: BooleanConstructor;
    };
    listenForm: {
        type: BooleanConstructor;
    };
    listenFocus: {
        type: BooleanConstructor;
    };
    maxRows: {
        type: NumberConstructor;
        default: number;
    };
    rows: {
        type: NumberConstructor;
        default: number;
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
export interface PropsTextArea extends BaseInputProps {
    rows?: number;
    maxRows?: number;
    listenChange?: boolean;
    listenForm?: boolean;
    listenFocus?: boolean;
}
