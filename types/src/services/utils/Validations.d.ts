declare type typeOfValueTypes = "string" | "number" | "object";
export declare const isTypeValue: (value: string | number | object, type: typeOfValueTypes) => boolean;
export declare const isEmpty: (value: any) => boolean;
export declare const isDate: (date: string) => boolean;
export declare const minLength: (value: string, min: number) => boolean;
export declare const maxLength: (value: string, max: number) => boolean;
export declare const isEmail: (value: string) => boolean;
export declare const contain: (originalValue: any, values: (string | number)[]) => boolean;
export {};
