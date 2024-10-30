import {
    ICraftingItemClass,
    ICraftItem,
    TCraftObjectTypes,
    TItemNode,
    TItems,
    TItemTypeSelected
} from "../../types/craftItemsType";
import {calculateJQ_DFC} from "./calculateJQ_DFC";
import {IBagCell} from "../Items/emptyBagCell";

export interface IGMCraftItem extends ICraftItem{
    itemTier: number;
    itemImage: string;
    artefactItemId?: string;
    foodConsumption?: number;
    defaultFoodConsumption?: number;
    enchantment?: string;
    journalQuantity?: number;
}

export type TWorkBenchItemSelectorItems = {
    [key in ICraftingItemClass]: {
        [key in TItemTypeSelected]?: IGMCraftItem[];
    };
}

export const createWorkBenchSelectorItems = (workBenchSelectorItems: TWorkBenchItemSelectorItems, marketItems: IBagCell[], craftItems: TItems, materials: ICraftItem[]) => {

    const objectTypeKeys = Object.keys(craftItems) as TCraftObjectTypes[];

    objectTypeKeys.forEach(itemTypeKey => craftItems[itemTypeKey].forEach(itemForSelect => [4, 5, 6, 7, 8].forEach(itemTier => {

        const {artefactItemId, itemClass, itemNode, CLOTH, LEATHER, PLANKS, METALBAR, STONEBLOCK, foodConsumption, ORE, ROCK, HIDE, FIBER, WOOD} = itemForSelect;

        let itemId: string;

        if (itemForSelect.itemId === 'BAG' || itemForSelect.itemId === 'CAPE'){
            itemId = `T${itemTier}_${itemForSelect.itemId}`;
        } else {
            itemId = `T${itemTier}_${itemTypeKey}_${itemForSelect.itemId}`;
        }

        let journalQuantity: number = 0;

        let defaultFoodConsumption: number = 0;

        if(itemClass === 'toolmaker'){
            if(itemId === 'TOOL_SIEGEHAMMER'){
                defaultFoodConsumption = 24.8;
                switch (itemTier){
                    case 4:
                    case 5:
                    case 6:
                        journalQuantity = 0.1 * (itemTier-3);
                        break;
                    case 7:
                        journalQuantity = 0.36;
                        break;
                    case 8:
                        journalQuantity = 0.38;
                }
            } else {
                defaultFoodConsumption = 14.4;
                switch (itemTier){
                    case 4:
                    case 5:
                    case 6:
                        journalQuantity = 0.1 * (itemTier-3);
                        break;
                    case 7:
                        journalQuantity = 0.36;
                        break;
                    case 8:
                        journalQuantity = 0.38;
                }
            }
        } else {
            const {
                journalsQuantity: calculatedJQ,
                defaultFoodConsumption: calculatedDFC
            } = calculateJQ_DFC(itemTypeKey, itemTier);

            journalQuantity = calculatedJQ;
            defaultFoodConsumption = calculatedDFC;
        }

        let defineArtefactId = () => {
            if (!artefactItemId) return '';

            if (artefactItemId === 'T4_SKILLBOOK_STANDARD') return artefactItemId;

            if (artefactItemId === 'QUESTITEM_TOKEN_ROYAL'){
                return `${artefactItemId}_T${itemTier}`;
            } else {
                return `T${itemTier}_${artefactItemId}`
            }
        }

        const definedArtefactId = defineArtefactId();

        const craftItem: IGMCraftItem = {
            itemId,
            itemClass: itemClass!,
            LEATHER: LEATHER || null,
            CLOTH: CLOTH || null,
            PLANKS: PLANKS || null,
            METALBAR: METALBAR || null,
            STONEBLOCK: STONEBLOCK || null,
            WOOD: WOOD || null,
            ORE: ORE || null,
            ROCK: ROCK || null,
            FIBER: FIBER || null,
            HIDE: HIDE || null,
            //itemName,
            itemNode: itemNode!,
            itemTier,
            itemImage: `https://render.albiononline.com/v1/item/${itemId}`,
            artefactItemId: definedArtefactId,
            foodConsumption,
            defaultFoodConsumption,
            journalQuantity,
        }

        let selectorType: TItemTypeSelected | undefined = undefined;

        switch (itemNode) {
            case 'axe':
            case 'dagger':
            case 'hammer':
            case 'knuckles':
            case 'mace':
            case 'sword':
            case 'quarterstaff':
            case 'spear':
            case 'arcanestaff':
            case 'cursestaff':
            case 'firestaff':
            case 'froststaff':
            case 'holystaff':
            case 'naturestaff':
            case 'crossbow':
            case 'bow':
            case 'book':
            case 'torch':
            case 'shield':
            case 'horn':
            case 'totem':
            case 'orb':
                selectorType = 'weapon';
                break;
            case 'cloth_armor':
            case 'leather_armor':
            case 'plate_armor':
            case 'cloth_helmet':
            case 'leather_helmet':
            case 'plate_helmet':
            case 'cloth_shoes':
            case 'leather_shoes':
            case 'plate_shoes':
            case 'fibergatherer_armor':
            case 'fishgatherer_armor':
            case 'hidegatherer_armor':
            case 'oregatherer_armor':
            case 'rockgatherer_armor':
            case 'woodgatherer_armor':
            case 'fibergatherer_helmet':
            case 'fishgatherer_helmet':
            case 'hidegatherer_helmet':
            case 'oregatherer_helmet':
            case 'rockgatherer_helmet':
            case 'woodgatherer_helmet':
            case 'fibergatherer_shoes':
            case 'fishgatherer_shoes':
            case 'hidegatherer_shoes':
            case 'oregatherer_shoes':
            case 'rockgatherer_shoes':
            case 'woodgatherer_shoes':
                selectorType = 'armor';
                break;
            case 'bag':
            case 'cape':
                selectorType = 'accessories';
                break;
            case 'skinningknife':
            case 'sickle':
            case 'pickaxe':
            case 'demolitionhammer':
            case 'fishing':
            case 'woodaxe':
            case 'stonehammer':
                selectorType = 'tools';
                break;
        }

        if (!!selectorType) {
            workBenchSelectorItems![itemClass as ICraftingItemClass]?.[selectorType]?.push(craftItem);
        }
    })));

    materials.forEach(material => ['', '_LEVEL1@1', '_LEVEL2@2', '_LEVEL3@3', '_LEVEL4@4'].forEach((materialEnchantment, enchantmentIndex) => {
        const {itemId, ORE, WOOD, ROCK, HIDE, FIBER, METALBAR, LEATHER, CLOTH, STONEBLOCK, PLANKS} = material;

        const itemApiId = `${itemId}${materialEnchantment}`;
        const itemQuantity = 999;
        const itemCellImg = '';
        const itemTier = itemId!.split('_')[0]!;
        const itemTierNum = +itemTier!.split('')[1]
        const itemImage = `https://render.albiononline.com/v1/item/${itemApiId}`;

        const itemNode = itemId?.split('_')[1] as TItemNode;
        const itemEnchantmentNum = materialEnchantment.split('@')[1] || '';
        const itemEnchantment = materialEnchantment;
        let itemClass: ICraftingItemClass | undefined = undefined;

        let foodConsumption = 1.8;

        const defaultFoodConsumption = 1.8;

        foodConsumption = foodConsumption * (Math.pow(2, itemTierNum - 4)) + (defaultFoodConsumption! * Math.pow(2, itemTierNum - 4) * (Math.pow(2, +itemEnchantmentNum) - 1));

        switch (itemNode) {
            case 'METALBAR':
                itemClass = 'smelter';
                break;
            case 'LEATHER':
                itemClass = 'tanner';
                break;
            case 'CLOTH':
                itemClass = 'weaver';
                break;
            case 'PLANKS':
                itemClass = 'lumbermill';
                break;
            case 'STONEBLOCK':
                itemClass = 'stonemason';
                break;
        }


        const marketMaterialItem: IBagCell = {
            itemImage,
            itemId: itemApiId,
            itemQuantity,
            itemCellImg,
            itemTier,
            itemNode,
            itemEnchantmentNum,
            itemEnchantment,
        }

        const materialItem: IGMCraftItem = {
            itemImage,
            itemId: itemApiId,
            itemNode,
            itemClass: itemClass!,
            METALBAR,
            LEATHER,
            CLOTH,
            PLANKS,
            STONEBLOCK,
            WOOD,
            ORE,
            ROCK,
            FIBER,
            HIDE,
            itemTier: itemTierNum,
            foodConsumption,
            defaultFoodConsumption,
            enchantment: itemEnchantment,
        }


        if (itemTier === 'T3' && enchantmentIndex > 0) return;
        if (enchantmentIndex > 0 && itemNode === 'STONEBLOCK') return;
        if (enchantmentIndex === 4 && itemNode === 'ROCK') return;

        marketItems.push(marketMaterialItem);

        if (itemTier === 'T3') return;

        workBenchSelectorItems![itemClass as ICraftingItemClass]?.['resources' as TItemTypeSelected]?.push(materialItem);
    }));
}