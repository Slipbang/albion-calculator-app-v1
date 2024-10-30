//import {TSelectedLanguage} from "./languageTypes";

export type TCraftObjectTypes = '2H' | 'MAIN' | 'BAG' | 'CAPE' | 'ARMOR' | 'HEAD' | 'SHOES' | 'OFF';

export type TResourceType = 'METALBAR' | 'LEATHER' | 'CLOTH' | 'PLANKS' | 'STONEBLOCK' | 'ORE' | 'WOOD' | 'HIDE' | 'FIBER' | 'ROCK';

export type TTier = 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8';

export type TItemNode = 'axe' | 'dagger' | 'hammer' | 'knuckles' | 'mace'
    | 'quarterstaff' | 'spear' | 'sword' | 'arcanestaff' | 'cursestaff'
    | 'firestaff' | 'froststaff' | 'holystaff' | 'naturestaff' | 'bag'
    | 'cape' | 'cloth_armor' | 'leather_armor' | 'plate_armor' | 'cloth_helmet'
    | 'leather_helmet' | 'plate_helmet' | 'cloth_shoes' | 'leather_shoes'
    | 'plate_shoes' | 'bow' | 'crossbow' | 'book' | 'torch' | 'shield'
    | 'horn' | 'totem' | 'orb' | 'skinningknife' | 'sickle' | 'pickaxe'
    | 'demolitionhammer' | 'fishing' | 'woodaxe' | 'stonehammer'
    | 'fibergatherer_armor' | 'fibergatherer_helmet' | 'fibergatherer_shoes'
    | 'fishgatherer_armor' | 'fishgatherer_helmet' | 'fishgatherer_shoes'
    | 'hidegatherer_armor' | 'hidegatherer_helmet' | 'hidegatherer_shoes'
    | 'oregatherer_armor' | 'oregatherer_helmet' | 'oregatherer_shoes'
    | 'rockgatherer_armor' | 'rockgatherer_helmet' | 'rockgatherer_shoes'
    | 'woodgatherer_armor' | 'woodgatherer_helmet' | 'woodgatherer_shoes'
    | 'CLOTH' | 'LEATHER' | 'METALBAR' | 'PLANKS' | 'STONEBLOCK'
    | 'ORE' | 'WOOD' | 'HIDE' | 'FIBER' | 'ROCK' | '';

export type ICraftingItemClass = 'warrior' | 'hunter' | 'mage' | 'toolmaker' | 'tanner' | 'lumbermill' | 'stonemason' | 'weaver' | 'smelter';

export type TItemTypeSelected = 'weapon' | 'armor' | 'accessories' | 'tools' | 'resources';

export type TCraftItemType = 'mageWeapon' | 'hunterWeapon' | 'warriorWeapon' | 'tools' | 'armor' | 'helmet' | 'shoes' | 'offHand';

export type TWorkBenchNames  = 'Кузница' | 'Охотничий домик' | 'Башня мага' | 'Слесарка' | 'Плавильня'
    | 'Ткацкая мастерская' | 'Лесопилка' | 'Кожемятня' | 'Каменоломня' | 'Warrior\'s Forge' | 'Hunter\'s Lodge'
    | 'Mage\'s Tower' | 'Toolmaker' | 'Smelter' | 'Lumbermill' | 'Tanner' | 'Stonemason' | 'Weaver';

export type TResources = {
    [key in TResourceType]?: number | null;
}

// export type TItemName = {
//     [key in TSelectedLanguage]: string;
// }

export interface ICraftItem extends TResources{
    itemId: string | null;
    //itemName?: TItemName;
    itemNode?: TItemNode;
    itemExample?: boolean;
    itemClass?: ICraftingItemClass | '';
    itemType?: TCraftItemType;
    foodConsumption?: number;
    artefactItemId?: string;
}

export type TItems = {
    [key in TCraftObjectTypes]: ICraftItem[]
}

export type TMaterialsInfo = {
    materialApiId: {
        [key in TResourceType as `${Capitalize<string & key>}ApiId`]: string;
    };
    consumedMaterials: {
        [key in TResourceType as `consume${Capitalize<string & key>}Quantity`]: number | null;
    };
}