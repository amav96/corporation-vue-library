import { BaseInputProps, baseInputPropsPropType } from "../../../packageTypes";

export const PropsTextAreaPropType = {
  ...baseInputPropsPropType,
  ...{
    listenChange : {
      type: Boolean
    },
    listenForm : {
      type: Boolean
    },
    listenFocus : {
      type: Boolean
    },
    maxRows : {
      type: Number,
      default: 6
    },
    rows : {
      type: Number,
      default: 3
    }
  }
}

export interface PropsTextArea extends BaseInputProps {
    rows?: number;
    maxRows?: number;
    listenChange?: boolean;
    listenForm?: boolean;
    listenFocus?: boolean;
  }