import { 
  CheckBox, 
  PropsDatePicker,
  PropsFile,
  PropsInput,
  PropsSelect,
  PropsTextArea,
} from "../../../packageTypes";

// -----------------FormClaim--------------------

export interface Inputs extends
    PropsInput,
    PropsTextArea, 
    PropsSelect,
    PropsFile,
    PropsDatePicker,
    CheckBox {
    key: string;
    cols?: number;
    slot?: boolean;
    clear?: boolean
}

export interface onSubmitEntity {
  items: object,
  isFormValid?: boolean
}

// ----------------------------------------------
