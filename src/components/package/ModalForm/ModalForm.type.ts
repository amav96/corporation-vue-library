import { Inputs, requestConfiguration } from "../../../packageTypes";

export interface ModalFormProps {
    inputs: Inputs[];
    urlStore: string;
    urlUpdate: string;
    urlShow: string;
    isEditMode?: boolean;
    visible?: boolean;
    resetAfterClose?: boolean;
    showRequestConfiguration: requestConfiguration;
    storeRequestConfiguration?: requestConfiguration;
    updateRequestConfiguration?: requestConfiguration;
    updateDefaultParams?: object;
    afterStore?: Function,
    afterUpdate?: Function    
   
}

