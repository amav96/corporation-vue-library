import { BaseInputProps, baseInputPropsPropType } from "../Input/Input.type";

export const PropsSelectPropType = {
  ...baseInputPropsPropType,
  ...{
    options: {
      type: Array<any>,
      default: () => []
    },
    label: {
      type: String,
      default: 'nombre'
    },
    trackBy: {
      type: String,
      default: 'id'
    },
    searchable: {
      type: Boolean,
    },
    listenRemove: {
      type: Boolean
    },
    listenSelect: {
      type: Boolean
    },
    listenForm : {
      type: Boolean
    },
    multiple: {
      type: Boolean,
    },
    id: {
      type: String,
    }
  }

}

export interface PropsSelect extends BaseInputProps {
    options?: Array<any>;
    label?: string;
    trackBy?: string;
    searchable?: boolean;
    listenRemove?: boolean;
    listenSelect?: boolean;
    listenForm?: boolean;
    multiple?: boolean;
  }

export interface PropsSelectKey extends PropsSelect {
  key: string;
}