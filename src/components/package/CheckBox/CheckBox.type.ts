import { BaseInputProps, baseInputPropsPropType } from "../Input/Input.type";

export const CheckBoxPropType = {
    ...baseInputPropsPropType,
    ...{
      label: {
        type: String,
      },
      trackBy: {
        type: String,
      },
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      listenChange: {
        type: Boolean,
      },
      listenForm: {
        type: Boolean,
      },
      keyName: {
        type: String,
      },
      uncheckedValue:{
        type: null
      },
      option: {
        type: null,
        required: true
      }
    }
  }

  export interface CheckBox extends BaseInputProps {
    option?: object | number | string | boolean;
    label?: string;
    trackBy?: string;
    id?: string;
    name?: string;
    listenChange?: boolean;
    listenForm?: boolean;
    keyName?: string,
    uncheckedValue?: any
  }
  
  export interface CheckBoxKey extends CheckBox {
    key: string;
  }