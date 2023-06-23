import { BaseInputProps, baseInputPropsPropType } from "../Input/Input.type";

export const PropsDatePickerPropType = {
  ...baseInputPropsPropType,
  ...{
    modelType: {
      type: String,
      default: 'dd/MM/yyyy hh:mm'
    },
    format: {
      type: String,
      default: 'dd/MM/yyyy hh:mm'
    },
    autoApply: {
      type: Boolean,
      default: false
    },
    listenForm: {
      type: Boolean,
    },
    listenChange: {
      type: Boolean,
      default: false
    },
  }
}

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