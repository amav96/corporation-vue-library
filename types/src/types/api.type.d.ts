export interface ErrorApi {
    error?: {
        errors?: object;
        message: string;
    };
}
export interface requestConfiguration {
    method?: string;
    headers?: {
        Authorization: string;
        'Content-Type'?: string;
        'Accept'?: string;
    };
    body?: any;
}
