import {TCalcProps} from "../../types/calculatorPropsType";
import {TTier} from "../../types/craftItemsType";
import {IConsumableObject} from "../../types/consumableTypes";
import {foodItems} from "./foodItems";
import {potionItems} from "./potionItems";

type TItemsForSelectorTypes = {
    [key in Exclude<TCalcProps, 'items' | 'resource'>]: {
        [key in Exclude<TTier, 'T3'>]: IConsumableObject[];
    }
}

export const consumablesSelectorItems: TItemsForSelectorTypes = {
    food: {
        T4: [],
        T5: [],
        T6: [],
        T7: [],
        T8: [],
    },
    potions: {
        T4: [],
        T5: [],
        T6: [],
        T7: [],
        T8: [],
    }
};

foodItems.forEach(item => {
    const itemTier = item.itemId.split('_')[0] as Exclude<TTier, 'T3'>;

    consumablesSelectorItems.food[itemTier].push(item);
})

potionItems.forEach(item => {
    const itemTier = item.itemId.split('_')[0] as Exclude<TTier, 'T3'>;

    consumablesSelectorItems.potions[itemTier].push(item);
})