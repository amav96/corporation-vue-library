import { PropType } from "vue";
import { BaseInputProps, baseInputPropsPropType } from "../Input/Input.type";

export type AcceptTypes =  "application/vnd.ms-excel" |
                    "application/pdf" |
                    "image/png" |
                    "image/jpeg" |
                    "image/jpg"

export interface PropsFile extends BaseInputProps {
  accept?: Array<AcceptTypes>;
  listenChange?: boolean
  listenForm?: boolean;
}

export const PropsFilePropType = {
  ...baseInputPropsPropType,
  ...{
    accept: {
      type: Array as PropType<string[]>,
      validator: (value: string[]) => {
        const allowedTypes = ['application/vnd.ms-excel', 'application/pdf', 'image/png', 'image/jpeg', 'image/jpg']
        return value.every(type => allowedTypes.includes(type))
      },
      default: () => ['application/vnd.ms-excel', 'application/pdf', 'image/png', 'image/jpeg', 'image/jpg']
    },
    listenChange : {
      type: Boolean
    },
    listenForm: {
      type: Boolean
    },
    resetOnOpen : {
      type: Boolean,
      default: true
    }
  }
}
