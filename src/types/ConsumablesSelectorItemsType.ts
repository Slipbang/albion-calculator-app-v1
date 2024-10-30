import {TCalcProps} from "./calculatorPropsType";
import {TTier} from "./craftItemsType";
import {IConsumableObject} from "./consumableTypes";

export type TItemsForSelectorType = {
    [key in TCalcProps]: {
        [key in Exclude<TTier, 'T3'>]: IConsumableObject[];
    }
}