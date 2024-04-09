export type TCraftObjectTypes = '2H' | 'MAIN' | 'BAG' | 'CAPE' | 'ARMOR' | 'HEAD' | 'SHOES' | 'OFF';

export type TResourceType = 'METALBAR' | 'LEATHER' | 'CLOTH' | 'PLANKS' | 'STONEBLOCK' | 'ORE' | 'WOOD' | 'HIDE' | 'FIBER' | 'ROCK';

export type TTier = 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8';

export type TItemNode = 'axe' | 'dagger' | 'hammer' | 'warGloves' | 'mace'
    | 'quarterstaff' | 'spear' | 'sword' | 'arcaneStaff' | 'cursedStaff'
    | 'fireStaff' | 'frostStaff' | 'holyStaff' | 'natureStaff' | 'bag'
    | 'cape' | 'clothArmor' | 'leatherArmor' | 'plateArmor' | 'clothHelmet'
    | 'leatherHelmet' | 'plateHelmet' | 'clothShoes' | 'leatherShoes'
    | 'plateShoes' | 'bow' | 'crossbow' | 'book' | 'torch' | 'shield'
    | 'horn' | 'totem' | 'orb' | 'skinningKnife' | 'sickle' | 'pickaxe'
    | 'demolitionHammer' | 'fishingRod' | 'toolAxe' | 'stoneHammer' | 'harvesterGarb'
    | 'fishermanGarb' | 'skinnerGarb' | 'minerGarb' | 'quarrierGarb'
    | 'lumberjackGarb' | 'harvesterCap' | 'fishermanCap' | 'skinnerCap'
    | 'minerCap' | 'quarrierCap' | 'lumberjackCap'
    | 'harvesterWorkboots' | 'fishermanWorkboots' | 'skinnerWorkboots'
    | 'minerWorkboots' | 'quarrierWorkboots' | 'lumberjackWorkboots'
    | 'CLOTH' | 'LEATHER' | 'METALBAR' | 'PLANKS' | 'STONEBLOCK'
    | 'ORE' | 'WOOD' | 'HIDE' | 'FIBER' | 'ROCK' | '';

export type ICraftingItemClass = 'warrior' | 'hunter' | 'mage' | 'toolmaker' | 'tanner' | 'lumbermill' | 'stonemason' | 'weaver' | 'smelter';

export type TItemTypeSelected = 'weapon' | 'armor' | 'accessories' | 'tools' | 'resources';

export type TCraftItemType = 'mageWeapon' | 'hunterWeapon' | 'warriorWeapon' | 'tools' | 'armor' | 'helmet' | 'shoes' | 'offHand';

export type TWorkBenchNames  = 'Кузница' | 'Охотничий домик' | 'Башня мага' | 'Слесарка' | 'Плавильня'
    | 'Ткацкая мастерская' | 'Лесопилка' | 'Кожемятня' | 'Каменоломня' | 'Warrior\'s Forge' | 'Hunter\'s Lodge'
    | 'Mage\'s Tower' | 'Toolmaker' | 'Smelter' | 'Lumbermill' | 'Tanner' | 'Stonemason' | 'Weaver';

export interface ICraftItem {
    itemId: string | null;
    itemName?: {
        'ru': string;
        'en': string;
    };
    itemNode?: TItemNode;
    itemExample?: boolean;
    PLANKS?: number | null;
    METALBAR?: number | null;
    LEATHER?: number | null;
    CLOTH?: number | null;
    STONEBLOCK?: number | null;
    WOOD?: number | null;
    ORE?: number | null;
    ROCK?: number | null;
    FIBER?: number | null;
    HIDE?: number | null;
    itemClass?: ICraftingItemClass | '';
    itemType?: TCraftItemType;
    foodConsumption?: number;
    artefactItemId?: string;
}

export type TItems = {
    [key in TCraftObjectTypes]: ICraftItem[]
}

export interface IConsumedMaterials {
    materialApiId: {
        PLANKSApiId: string;
        METALBARApiId: string;
        CLOTHApiId: string;
        LEATHERApiId: string;
        STONEBLOCKApiId: string;
        OREApiId: string;
        WOODApiId: string;
        HIDEApiId: string;
        FIBERApiId: string;
        ROCKApiId: string;

    };
    consumedMaterials: {
        consumeLEATHERQuantity: number | null;
        consumePLANKSQuantity: number | null;
        consumeCLOTHQuantity: number | null;
        consumeMETALBARQuantity: number | null;
        consumeSTONEBLOCKQuantity: number | null;
        consumeOREQuantity: number | null;
        consumeWOODQuantity: number | null;
        consumeFIBERQuantity: number | null;
        consumeHIDEQuantity: number | null;
        consumeROCKQuantity: number | null;
    };
}