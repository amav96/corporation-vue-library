import { Inputs } from '@packageTypes';
export interface FileType {
    avatar: {
        image: {
            file?: File,
            base64?: string,
            url?: string
        }
    }
    form: Inputs[]
    id: number
}