import {
    ICraftingItemClass,
    ICraftItem,
    TCraftObjectTypes,
    TItemNode,
    TItemTypeSelected
} from "../../types/craftItemsType";
import {
    craftItems,
} from "./craftItems";
import {
    materials,
} from "./materials";
import {
    backpackCell
} from "../../components/Calculator/GameModeCalculator/Backpack/BackpackImgReexports/BackpackImgReexports";

export interface IGMCraftItem extends ICraftItem{
    itemTier: number;
    itemImage: string;
    artefactItemId?: string;
    foodConsumption?: number;
    defaultFoodConsumption?: number;
    enchantment?: string;
    journalQuantity?: number;
}

export interface IBagCell extends Pick<IGMCraftItem, 'itemId' | 'itemImage' | 'itemNode' | 'itemName'  > {
    itemCellImg?: string;
    itemQuantity: number | null;
    itemTier: string;
    itemIndex?: number;
    itemEnchantmentNum: string;
    itemEnchantment: string;
}

type TWorkBenchItemSelectorItems = {
    [key in ICraftingItemClass]: {
        [key in TItemTypeSelected]?: IGMCraftItem[];
    };
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

const marketItems: IBagCell[] = [];

const objectTypeKeys = Object.keys(craftItems) as TCraftObjectTypes[];

objectTypeKeys.forEach(itemTypeKey => craftItems[itemTypeKey].forEach(itemForSelect => [4, 5, 6, 7, 8].forEach(itemTier => {

    const {artefactItemId, itemClass, itemNode, CLOTH, LEATHER, PLANKS, METALBAR, STONEBLOCK, foodConsumption, itemName, ORE, ROCK, HIDE, FIBER, WOOD} = itemForSelect;

    let itemId: string;

    if (itemForSelect.itemId === 'BAG' || itemForSelect.itemId === 'CAPE'){
        itemId = `T${itemTier}_${itemForSelect.itemId}`;
    } else {
        itemId = `T${itemTier}_${itemTypeKey}_${itemForSelect.itemId}`;
    }

    let journalQuantity: number = 0;

    let defaultFoodConsumption = 0;

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
        switch (itemTypeKey){
            case '2H': {
                defaultFoodConsumption = 57.6;
                switch (itemTier){
                    case 4:
                    case 5:
                    case 6:
                        journalQuantity = 0.2 * (itemTier-3);
                        break;
                    case 7:
                        journalQuantity = 0.73;
                        break;
                    case 8:
                        journalQuantity = 0.76;
                }
            }
                break;
            case 'MAIN': {
                defaultFoodConsumption = 43.2;
                switch (itemTier){
                    case 4:
                    case 5:
                    case 6:
                        journalQuantity = 0.15 * (itemTier-3);
                        break;
                    case 7:
                        journalQuantity = 0.55;
                        break;
                    case 8:
                        journalQuantity = 0.57;
                }
            }
                break;
            case 'ARMOR':
            case 'BAG': {
                defaultFoodConsumption = 28.8;
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
                break;
            case 'HEAD':
            case 'SHOES':
            case 'OFF':
            case 'CAPE': {
                defaultFoodConsumption = 14.4;
                switch (itemTier){
                    case 4:
                    case 5:
                    case 6:
                        journalQuantity = 0.05 * (itemTier-3);
                        break;
                    case 7:
                        journalQuantity = 0.18;
                        break;
                    case 8:
                        journalQuantity = 0.19;
                }
            }
                break;
        }
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
        itemName,
        itemNode: itemNode!,
        itemTier,
        itemImage: `https://render.albiononline.com/v1/item/${itemId}`,
        artefactItemId: definedArtefactId,
        foodConsumption,
        defaultFoodConsumption,
        journalQuantity,
    }

    let itemType: TItemTypeSelected = 'weapon';

    switch (itemNode) {
        case 'axe':
        case 'dagger':
        case 'hammer':
        case 'warGloves':
        case 'mace':
        case 'sword':
        case 'quarterstaff':
        case 'spear':
        case 'arcaneStaff':
        case 'cursedStaff':
        case 'fireStaff':
        case 'frostStaff':
        case 'holyStaff':
        case 'natureStaff':
        case 'crossbow':
        case 'bow':
        case 'book':
        case 'torch':
        case 'shield':
        case 'horn':
        case 'totem':
        case 'orb':
            itemType = 'weapon';
            break;
        case 'clothArmor':
        case 'leatherArmor':
        case 'plateArmor':
        case 'clothHelmet':
        case 'leatherHelmet':
        case 'plateHelmet':
        case 'clothShoes':
        case 'leatherShoes':
        case 'plateShoes':
        case 'harvesterGarb':
        case 'fishermanGarb':
        case 'skinnerGarb':
        case 'minerGarb':
        case 'quarrierGarb':
        case 'lumberjackGarb':
        case 'harvesterCap':
        case 'fishermanCap':
        case 'skinnerCap':
        case 'minerCap':
        case 'quarrierCap':
        case 'lumberjackCap':
        case 'harvesterWorkboots':
        case 'fishermanWorkboots':
        case 'skinnerWorkboots':
        case 'minerWorkboots':
        case 'quarrierWorkboots':
        case 'lumberjackWorkboots':
            itemType = 'armor';
            break;
        case 'bag':
        case 'cape':
            itemType = 'accessories';
            break;
        case 'skinningKnife':
        case 'sickle':
        case 'pickaxe':
        case 'demolitionHammer':
        case 'fishingRod':
        case 'toolAxe':
        case 'stoneHammer':
            itemType = 'tools';
            break;
    }

    workBenchSelectorItems![itemClass as ICraftingItemClass]?.[itemType]?.push(craftItem);
})));

materials.forEach(material => ['', '_LEVEL1@1', '_LEVEL2@2', '_LEVEL3@3', '_LEVEL4@4'].forEach((materialEnchantment, enchantmentIndex) => {
    const {itemId, ORE, WOOD, ROCK, HIDE, FIBER, METALBAR, LEATHER, CLOTH, STONEBLOCK, PLANKS, itemName} = material;

    const itemApiId = `${itemId}${materialEnchantment}`;
    const itemQuantity = 999;
    const itemCellImg = '';
    const itemTier = itemId!.split('_')[0]!;
    const itemTierNum = +itemTier!.split('')[1]
    const itemImage = `https://render.albiononline.com/v1/item/${itemApiId}`;

    const materialEngName = `${itemName!['en']} ${itemTier}.${materialEnchantment.split('@')[1] || 0}`;
    const materialRuName = `${itemName!['ru']} ${itemTier}.${materialEnchantment.split('@')[1] || 0}`;
    const itemNode = itemId?.split('_')[1] as TItemNode;
    const itemEnchantmentNum = materialEnchantment.split('@')[1] || '';
    const itemEnchantment = materialEnchantment;
    let itemClass: ICraftingItemClass | null = null;

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
        itemName: {
            ru: materialRuName,
            en: materialEngName,
        },
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
        itemName,
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


    if (itemTier === 'T3' && enchantmentIndex > 0) return false;
    if (enchantmentIndex > 0 && itemNode === 'STONEBLOCK') return false;
    if (enchantmentIndex === 4 && itemNode === 'ROCK') return false;

    marketItems.push(marketMaterialItem);

    if (itemTier === 'T3') return  false;

    workBenchSelectorItems![itemClass as ICraftingItemClass]?.['resources' as TItemTypeSelected]?.push(materialItem);
}));

const emptyBagCell: IBagCell = {
    itemId: null,
    itemTier: '',
    itemQuantity: null,
    itemNode: '',
    itemEnchantmentNum: '',
    itemImage: '',
    itemEnchantment: '',
    itemName: {
        'ru': '',
        'en': '',
    },
    itemCellImg: backpackCell,
}

export {
    workBenchSelectorItems,
    marketItems,
    emptyBagCell,
}