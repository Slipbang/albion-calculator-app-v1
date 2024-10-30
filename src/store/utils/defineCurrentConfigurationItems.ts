import {ICraftItem, TItems} from "../../types/craftItemsType";
import {TArtefacts} from "../../types/artefactTypes";
import {createWorkBenchSelectorItems, TWorkBenchItemSelectorItems} from "./createWorkBenchSelectorItems";
import {TItemsForSelectorType} from "../../types/ConsumablesSelectorItemsType";
import {createConsumablesSelectorItems} from "./createConsumablesSelectorItems";
import {IBagCell} from "../Items/emptyBagCell";
import {TLanguageData} from "../../types/languageTypes";

export interface ICurrentConfigurationItems {
    workBenchSelectorItems: TWorkBenchItemSelectorItems,
    consumablesSelectorItems: TItemsForSelectorType;
    marketItems: IBagCell[];
    craftItems: TItems;
    languageData: TLanguageData;
    artefacts: TArtefacts;
    materials: ICraftItem[];
}

export const defineCurrentConfigurationItems = (): ICurrentConfigurationItems => {
    const data = localStorage.getItem('appConfigurationItems');

    let craftItems: TItems = {
        "MAIN": [],
        "2H": [],
        "BAG": [],
        "CAPE": [],
        "ARMOR": [],
        "HEAD": [],
        "SHOES": [],
        "OFF": [],
    }
    const workBenchSelectorItems: TWorkBenchItemSelectorItems = {
        warrior: {
            weapon: [],
            armor: [],
        },
        mage: {
            weapon: [],
            armor: [],
        },
        hunter: {
            weapon: [],
            armor: [],
        },
        toolmaker: {
            tools: [],
            accessories: [],
            armor: [],
        },
        tanner: {
            resources: [],
        },
        weaver: {
            resources: [],
        },
        smelter: {
            resources: [],
        },
        stonemason: {
            resources: [],
        },
        lumbermill: {
            resources: [],
        },
    };
    let materials: ICraftItem[] = [];
    let languageData: TLanguageData = {};

    let artefacts: TArtefacts = {
        WARRIOR: {
            RUNE: [],
            SOUL: [],
            RELIC: [],
            AVALONIAN: [],
        },
        MAGE: {
            RUNE: [],
            SOUL: [],
            RELIC: [],
            AVALONIAN: [],
        },
        HUNTER: {
            RUNE: [],
            SOUL: [],
            RELIC: [],
            AVALONIAN: [],
        }
    }
    const consumablesSelectorItems: TItemsForSelectorType = {
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

    const marketItems: IBagCell[] = [];

    if (data) {
        const items = JSON.parse(data);

        createWorkBenchSelectorItems(workBenchSelectorItems, marketItems, items.craftItems, items.materials);
        createConsumablesSelectorItems(items.consumableCraftItems.cooked, consumablesSelectorItems, 'FOOD');
        createConsumablesSelectorItems(items.consumableCraftItems.potion, consumablesSelectorItems, 'POTIONS');
        materials = [...items.materials];
        artefacts = {...items.artefacts};
        craftItems = {...items.craftItems};
        languageData = {...items.language};
    }

    return {
        craftItems,
        workBenchSelectorItems,
        materials,
        consumablesSelectorItems,
        languageData,
        artefacts,
        marketItems,
    }
}