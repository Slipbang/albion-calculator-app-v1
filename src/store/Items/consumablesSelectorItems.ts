import {TCalcProps} from "../../types/calculatorPropsType";
import {TTier} from "../../types/craftItemsType";
import {IConsumableObject} from "../../types/consumableTypes";
import {foodItems} from "./foodItems";
import {potionItems} from "./potionItems";

type TItemsForSelectorTypes = {
    [key in TCalcProps]: {
        [key in Exclude<TTier, 'T3'>]: IConsumableObject[];
    }
}

export const consumablesSelectorItems: TItemsForSelectorTypes = {
    ITEMS: {
        T4: [],
        T5: [],
        T6: [],
        T7: [],
        T8: [],
    },
    RESOURCES: {
        T4: [],
        T5: [],
        T6: [],
        T7: [],
        T8: [],
    },
    FOOD: {
        T4: [],
        T5: [],
        T6: [],
        T7: [],
        T8: [],
    },
    POTIONS: {
        T4: [],
        T5: [],
        T6: [],
        T7: [],
        T8: [],
    }
};

foodItems.forEach(item => {
    const itemTier = item.itemId.split('_')[0] as Exclude<TTier, 'T3'>;

    consumablesSelectorItems.FOOD[itemTier].push(item);
})

potionItems.forEach(item => {
    const itemTier = item.itemId.split('_')[0] as Exclude<TTier, 'T3'>;

    consumablesSelectorItems.POTIONS[itemTier].push(item);
})