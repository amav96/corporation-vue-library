import { PropType } from "vue";
import type { Validations } from "../../../packageTypes"

export const baseInputPropsPropType = {
  placeholder: {
    type: String as PropType<string>
  },
  value : {
    type: null,
    default: null
  },
  state: {
    type: null,
    default:  null
  },
  type:{
    type: String || null,
    default: 'text'
  },
  title : {
    type: String
  },
  disabled : {
    type: Boolean,
    default: false
  },
  hidden: {
    type: Boolean
  },
  customClass: {
    type: String,
    default: ''
  },
  validations: {
    type: Object as PropType <Validations>
  },
  errors: {
    type: Array as PropType<Array<string>>,
    default : () => []
  },
  formatValue: {
    type: Function
  }
}

export const PropsInputPropType = {
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
    preppendClass : {
      type: String,
      default: ''
    },
    iconLeft : {
      type: String
    }
  }

}

export interface BaseInputProps {
  placeholder?: string;
  value?: any;
  type?: 'text' | 'password' | 'number' | 'time' | 'date' | 'color' | 'slot' | 'checkbox' | 'select' | 'multiselect' | 'datetime' | 'file' | 'textarea' | 'email';
  title?: string;
  disabled?: boolean;
  state?: Boolean | null | undefined;
  hidden?: boolean;
  customClass?: string;
  validations?: Validations;
  errors?: Array<string>;
  key?: string;
  formatValue?: Function
}

// -----------------Input-----------------------

export interface PropsInput extends BaseInputProps {
  listenChange?: boolean;
  listenForm?: boolean;
  listenFocus?: boolean;
  preppendClass?: string;
  iconLeft?: string

}

export type BaseInput = Omit<BaseInputProps, "multiple">;