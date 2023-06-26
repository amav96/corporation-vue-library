import { CheckBox, PropsDatePicker, PropsFile, PropsInput, PropsSelect, PropsTextArea } from "../../../packageTypes";
export interface Inputs extends PropsInput, PropsTextArea, PropsSelect, PropsFile, PropsDatePicker, CheckBox {
    key: string;
    cols?: number;
    slot?: boolean;
    clear?: boolean;
}
