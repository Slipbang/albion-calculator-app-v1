import {TTier} from "../../types/craftItemsType";
import {TConsumable} from "../../types/consumableTypes";
import {TItemsForSelectorType} from "../../types/ConsumablesSelectorItemsType";
import {TCalcProps} from "../../types/calculatorPropsType";

export const createConsumablesSelectorItems = (items: TConsumable, consumablesSelectorItems:TItemsForSelectorType, type: TCalcProps) => {
    items.forEach(item => {
        const itemTier = item.itemId.split('_')[0] as Exclude<TTier, 'T3'>;

        consumablesSelectorItems[type][itemTier].push(item);
    })

}