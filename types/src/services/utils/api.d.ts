declare global {
    interface ArrayConstructor {
        isArray(arg: ReadonlyArray<any> | any): arg is ReadonlyArray<any>;
    }
}
interface Config {
    multipleFile?: boolean;
    appendForm?: boolean;
}
export declare const serializeParams: (params: object, config?: Config) => Promise<object>;
export {};
