import {ICraftingItemClass, TItemTypeSelected} from "../../types/craftItemsType";

export interface IOptions {
    labelName: {
        ru: string,
        en: string,
    }
    value: string;
    params?: IOptions[]
}

export type TSelectTierOptions = IOptions[];

export type TSelectClassOptions = {
    [key in ICraftingItemClass]: {
        [key in TItemTypeSelected]?: IOptions[]
    }
}

export const tierOptions: TSelectTierOptions = [
    {
        labelName: {
            ru: 'Все тиры',
            en: 'All Tiers',
        },
        value: 'Т3 T4 T5 T6 T7 T8',
    },
    {
        labelName: {
            ru: 'Уровень 3',
            en: 'Tier 3',
        },
        value: 'T3',
    },
    {
        labelName: {
            ru: 'Уровень 4',
            en: 'Tier 4',
        },
        value: 'T4',
    },
    {
        labelName: {
            ru: 'Уровень 5',
            en: 'Tier 5',
        },
        value: 'T5',
    },
    {
        labelName: {
            ru: 'Уровень 6',
            en: 'Tier 6',
        },
        value: 'T6',
    },
    {
        labelName: {
            ru: 'Уровень 7',
            en: 'Tier 7',
        },
        value: 'T7',
    },
    {
        labelName: {
            ru: 'Уровень 8',
            en: 'Tier 8',
        },
        value: 'T8',
    },
];

export const nodeOptions: TSelectClassOptions = {
    'warrior': {
        'weapon': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'sword shield axe mace warGloves crossbow hammer',
            },
            {
                labelName: {
                    ru: 'Мечи',
                    en: 'Sword',
                },
                value: 'sword',
            },
            {
                labelName: {
                    ru: 'Щиты',
                    en: 'Shield',
                },
                value: 'shield',
            },
            {
                labelName: {
                    ru: 'Топоры',
                    en: 'Axe',
                },
                value: 'axe',
            },
            {
                labelName: {
                    ru: 'Булавы',
                    en: 'Mace',
                },
                value: 'mace',
            },
            {
                labelName: {
                    ru: 'Боевые перчатки',
                    en: 'War Gloves',
                },
                value: 'warGloves',
            },
            {
                labelName: {
                    ru: 'Арбалеты',
                    en: 'Crossbow',
                },
                value: 'crossbow',
            },
            {
                labelName: {
                    ru: 'Молоты',
                    en: 'Hammer',
                },
                value: 'hammer',
            },
        ],
        'armor': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'plateHelmet plateArmor plateShoes',
            },
            {
                labelName: {
                    ru: 'Латный шлем',
                    en: 'Plate Helmet',
                },
                value: 'plateHelmet',
            },
            {
                labelName: {
                    ru: 'Латная броня',
                    en: 'Plate Armor',
                },
                value: 'plateArmor',
            },
            {
                labelName: {
                    ru: 'Латная обувь',
                    en: 'Plate Shoes',
                },
                value: 'plateShoes',
            },
        ],
    },
    'hunter': {
        'weapon': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'bow spear natureStaff dagger quarterstaff torch horn',
            },
            {
                labelName: {
                    ru: 'Луки',
                    en: 'Bow',
                },
                value: 'bow',
            },
            {
                labelName: {
                    ru: 'Копья',
                    en: 'Spear',
                },
                value: 'spear',
            },
            {
                labelName: {
                    ru: 'Древесный',
                    en: 'Nature Staff',
                },
                value: 'natureStaff',
            },
            {
                labelName: {
                    ru: 'Кинжалы',
                    en: 'Dagger',
                },
                value: 'dagger',
            },
            {
                labelName: {
                    ru: 'Шесты',
                    en: 'Quarterstaff',
                },
                value: 'quarterstaff',
            },
            {
                labelName: {
                    ru: 'Факелы',
                    en: 'Torch',
                },
                value: 'torch',
            },
            {
                labelName: {
                    ru: 'Рога',
                    en: 'Horn',
                },
                value: 'horn',
            },
        ],
        'armor': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'leatherHelmet leatherArmor leatherShoes',
            },
            {
                labelName: {
                    ru: 'Кожаный шлем',
                    en: 'Leather Helmet',
                },
                value: 'leatherHelmet',
            },
            {
                labelName: {
                    ru: 'Кожаная броня',
                    en: 'Leather Armor',
                },
                value: 'leatherArmor',
            },
            {
                labelName: {
                    ru: 'Кожаная обувь',
                    en: 'Leather Shoes',
                },
                value: 'leatherShoes',
            },
        ],
    },
    'mage': {
        'weapon': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'fireStaff book arcaneStaff holyStaff cursedStaff frostStaff orb totem torch',
            },
            {
                labelName: {
                    ru: 'Огненный',
                    en: 'Fire Staff',
                },
                value: 'fireStaff',
            },
            {
                labelName: {
                    ru: 'Мистический',
                    en: 'Arcane Staff',
                },
                value: 'arcaneStaff',
            },
            {
                labelName: {
                    ru: 'Священный',
                    en: 'Holy Staff',
                },
                value: 'holyStaff',
            },
            {
                labelName: {
                    ru: 'Проклятый',
                    en: 'Cursed Staff',
                },
                value: 'cursedStaff',
            },
            {
                labelName: {
                    ru: 'Морозный',
                    en: 'Frost Staff',
                },
                value: 'frostStaff',
            },
            {
                labelName: {
                    ru: 'Книги',
                    en: 'Book',
                },
                value: 'book',
            },
            {
                labelName: {
                    ru: 'Сферы',
                    en: 'Orb',
                },
                value: 'orb',
            },
            {
                labelName: {
                    ru: 'Тотемы',
                    en: 'Totem',
                },
                value: 'totem',
            },
            {
                labelName: {
                    ru: 'Факелы',
                    en: 'Torch',
                },
                value: 'torch',
            },
        ],
        'armor': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'clothHelmet clothArmor clothShoes',
            },
            {
                labelName: {
                    ru: 'Тканевый шлем',
                    en: 'Cloth Helmet',
                },
                value: 'clothHelmet',
            },
            {
                labelName: {
                    ru: 'Тканевая броня',
                    en: 'Cloth Armor',
                },
                value: 'clothArmor',
            },
            {
                labelName: {
                    ru: 'Тканевая обувь',
                    en: 'Cloth Shoes',
                },
                value: 'clothShoes',
            },
        ],
    },

    'toolmaker': {
        'tools': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'pickaxe toolAxe skinningKnife stoneHammer sickle demolitionHammer fishingRod',
            },
            {
                labelName: {
                    ru: 'Кирки шахтера',
                    en: 'Pickaxe',
                },
                value: 'pickaxe',
            },
            {
                labelName: {
                    ru: 'Топоры дровосека',
                    en: 'Wood Axe',
                },
                value: 'toolAxe',
            },
            {
                labelName: {
                    ru: 'Ножи свежевателя',
                    en: 'Skinning Knife',
                },
                value: 'skinningKnife',
            },
            {
                labelName: {
                    ru: 'Кувалды камен.',
                    en: 'Stone Hammer',
                },
                value: 'stoneHammer',
            },
            {
                labelName: {
                    ru: 'Серпы жнеца',
                    en: 'Sickle',
                },
                value: 'sickle',
            },
            {
                labelName: {
                    ru: 'Осандные молоты',
                    en: 'Demolition Hammer',
                },
                value: 'demolitionHammer',
            },
            {
                labelName: {
                    ru: 'Удочка рыбака',
                    en: 'Fishing Rod',
                },
                value: 'fishingRod',
            },
        ],
        'armor': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'harvesterCap harvesterGarb harvesterWorkboots skinnerCap skinnerGarb skinnerWorkboots minerCap minerGarb minerWorkboots quarrierCap quarrierGarb quarrierWorkboots lumberjackCap lumberjackGarb lumberjackWorkboots fishermanCap fishermanGarb fishermanWorkboots',
            },
            {
                labelName: {
                    ru: 'Шапка жнеца',
                    en: 'Harvester Cap',
                },
                value: 'harvesterCap ',
            },
            {
                labelName: {
                    ru: 'Одежда жнеца',
                    en: 'Harvester Garb',
                },
                value: 'harvesterGarb',
            },
            {
                labelName: {
                    ru: 'Сапоги жнеца',
                    en: 'Harvester Workboots',
                },
                value: 'harvesterWorkboots',
            },
            {
                labelName: {
                    ru: 'Шапка свежеват.',
                    en: 'Skinner Cap',
                },
                value: 'skinnerCap',
            },
            {
                labelName: {
                    ru: 'Одежда свежеват.',
                    en: 'Skinner Garb',
                },
                value: 'skinnerGarb',
            },
            {
                labelName: {
                    ru: 'Сапоги свежеват.',
                    en: 'Skinner Workboots',
                },
                value: 'skinnerWorkboots',
            },
            {
                labelName: {
                    ru: 'Шапка шахтера',
                    en: 'Miner Cap',
                },
                value: 'minerCap',
            },
            {
                labelName: {
                    ru: 'Одежда шахтера',
                    en: 'Miner Garb',
                },
                value: 'minerGarb',
            },
            {
                labelName: {
                    ru: 'Сапоги шахтера',
                    en: 'Miner Workboots',
                },
                value: 'minerWorkboots',
            },
            {
                labelName: {
                    ru: 'Шапка каменол.',
                    en: 'Quarrier Cap',
                },
                value: 'quarrierCap',
            },
            {
                labelName: {
                    ru: 'Одежда каменол.',
                    en: 'Quarrier Garb',
                },
                value: 'quarrierGarb',
            },
            {
                labelName: {
                    ru: 'Сапоги каменол.',
                    en: 'Quarrier Workboots',
                },
                value: 'quarrierWorkboots',
            },
            {
                labelName: {
                    ru: 'Шапка дровосека',
                    en: 'Lumberjack Cap',
                },
                value: 'lumberjackCap',
            },
            {
                labelName: {
                    ru: 'Одежда дровосека',
                    en: 'Lumberjack Garb',
                },
                value: 'lumberjackGarb',
            },
            {
                labelName: {
                    ru: 'Сапоги дровосека',
                    en: 'Lumberjack Workboots',
                },
                value: 'lumberjackWorkboots',
            },
            {
                labelName: {
                    ru: 'Шапка рыбака',
                    en: 'Fisherman Cap',
                },
                value: 'fishermanCap',
            },
            {
                labelName: {
                    ru: 'Одежда рыбака',
                    en: 'Fisherman Garb',
                },
                value: 'fishermanGarb',
            },
            {
                labelName: {
                    ru: 'Сапоги рыбака',
                    en: 'Fisherman Workboots',
                },
                value: 'fishermanWorkboots',
            },
        ],
        'accessories': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'bag cape',
            },
            {
                labelName: {
                    ru: 'Сумки',
                    en: 'Bag',
                },
                value: 'bag',
            },
            {
                labelName: {
                    ru: 'Плащи',
                    en: 'Cape',
                },
                value: 'cape',
            },
        ]
    },
    'tanner': {
        'resources': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'LEATHER',
            },
        ]
    },
    'lumbermill': {
        'resources': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'PLANKS',
            },
        ]
    },
    'stonemason': {
        'resources': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'STONEBLOCK',
            },
        ]
    },
    'weaver': {
        'resources': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'CLOTH',
            },
        ]
    },
    'smelter': {
        'resources': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'METALBAR',
            },
        ]
    }
};

export const typeOptions: IOptions[] = [
    {
        labelName: {
            ru: 'Все типы',
            en: 'All',
        },
        value: '',
    },
    {
        labelName: {
            ru: 'Ресурсы',
            en: 'Resource',
        },
        value: 'CLOTH LEATHER METALBAR PLANKS STONEBLOCK ORE WOOD HIDE FIBER ROCK',
        params: [
            {
                labelName: {
                    ru: 'Ткань',
                    en: 'Clot',
                },
                value: 'CLOTH',
            },
            {
                labelName: {
                    ru: 'Кожа',
                    en: 'Leather',
                },
                value: 'LEATHER',
            },
            {
                labelName: {
                    ru: 'Слитки',
                    en: 'Metal Bar',
                },
                value: 'METALBAR',
            },
            {
                labelName: {
                    ru: 'Брусья',
                    en: 'Planks',
                },
                value: 'PLANKS',
            },
            {
                labelName: {
                    ru: 'Блоки',
                    en: 'Stone Block',
                },
                value: 'STONEBLOCK',
            },
            {
                labelName: {
                    ru: 'Руда',
                    en: 'Ore',
                },
                value: 'ORE',
            },
            {
                labelName: {
                    ru: 'Древесина',
                    en: 'Wood',
                },
                value: 'WOOD',
            },
            {
                labelName: {
                    ru: 'Шкуры',
                    en: 'Hide',
                },
                value: 'HIDE',
            },
            {
                labelName: {
                    ru: 'Волокно',
                    en: 'Fiber',
                },
                value: 'FIBER',
            },
            {
                labelName: {
                    ru: 'Камень',
                    en: 'Rock',
                },
                value: 'ROCK',
            },
        ]
    },
    {
        labelName: {
            ru: 'Броня',
            en: 'Armor',
        },
        value: 'clothArmor clothHelmet clothShoes leatherArmor leatherHelmet leatherShoes plateArmor plateHelmet plateShoes',
        params: [
            {
                labelName: {
                    ru: 'Тканевая броня',
                    en: 'Cloth Armor',
                },
                value: 'clothArmor',
            },
            {
                labelName: {
                    ru: 'Тканевый шлем',
                    en: 'Cloth Helmet',
                },
                value: 'clothHelmet',
            },
            {
                labelName: {
                    ru: 'Тканевая обувь',
                    en: 'Cloth Shoes',
                },
                value: 'clothShoes',
            },
            {
                labelName: {
                    ru: 'Кожаная броня',
                    en: 'Leather Armor',
                },
                value: 'leatherArmor',
            },
            {
                labelName: {
                    ru: 'Кожаный шлем',
                    en: 'Leather Helmet',
                },
                value: 'leatherHelmet',
            },
            {
                labelName: {
                    ru: 'Кожаная обувь',
                    en: 'Leather Shoes',
                },
                value: 'leatherShoes',
            },
            {
                labelName: {
                    ru: 'Латная броня',
                    en: 'Plate Armor',
                },
                value: 'plateArmor',
            },
            {
                labelName: {
                    ru: 'Латный шлем',
                    en: 'Plate Helmet',
                },
                value: 'plateHelmet',
            },
            {
                labelName: {
                    ru: 'Латная обувь',
                    en: 'Plate Shoes',
                },
                value: 'plateShoes',
            },
        ]
    },
    {
        labelName: {
            ru: 'Ближний бой',
            en: 'Melee',
        },
        value: 'axe dagger hammer warGloves mace quarterstaff spear sword',
        params: [
            {
                labelName: {
                    ru: 'Топоры',
                    en: 'Axe',
                },
                value: 'axe',
            },
            {
                labelName: {
                    ru: 'Кинжалы',
                    en: 'Dagger',
                },
                value: 'dagger',
            },
            {
                labelName: {
                    ru: 'Молоты',
                    en: 'Hammer',
                },
                value: 'hammer',
            },
            {
                labelName: {
                    ru: 'Боевые перчатки',
                    en: 'War Gloves',
                },
                value: 'warGloves',
            },
            {
                labelName: {
                    ru: 'Булавы',
                    en: 'Mace',
                },
                value: 'mace',
            },
            {
                labelName: {
                    ru: 'Шесты',
                    en: 'Quarterstaff',
                },
                value: 'quarterstaff',
            },
            {
                labelName: {
                    ru: 'Копья',
                    en: 'Spear',
                },
                value: 'spear',
            },
            {
                labelName: {
                    ru: 'Мечи',
                    en: 'Sword',
                },
                value: 'sword',
            },
        ],
    },
    {
        labelName: {
            ru: 'Дальний бой',
            en: 'Ranged',
        },
        value: 'bow crossbow',
        params: [
            {
                labelName: {
                    ru: 'Луки',
                    en: 'Bow',
                },
                value: 'bow',
            },
            {
                labelName: {
                    ru: 'Арбалеты',
                    en: 'Crossbow',
                },
                value: 'crossbow',
            },
        ]
    },
    {
        labelName: {
            ru: 'Магия',
            en: 'Magic',
        },
        value: 'arcaneStaff cursedStaff fireStaff frostStaff holyStaff natureStaff',
        params: [
            {
                labelName: {
                    ru: 'Мистический',
                    en: 'Arcane Staff',
                },
                value: 'arcaneStaff',
            },
            {
                labelName: {
                    ru: 'Проклятый',
                    en: 'Cursed Staff',
                },
                value: 'cursedStaff',
            },
            {
                labelName: {
                    ru: 'Огненный',
                    en: 'Fire Staff',
                },
                value: 'fireStaff',
            },
            {
                labelName: {
                    ru: 'Морозный',
                    en: 'Frost Staff',
                },
                value: 'frostStaff',
            },
            {
                labelName: {
                    ru: 'Священный',
                    en: 'Holy Staff',
                },
                value: 'holyStaff',
            },
            {
                labelName: {
                    ru: 'Древесный',
                    en: 'Nature Staff',
                },
                value: 'natureStaff',
            },
        ]
    }
];

export const enchantmentOptions: IOptions[] = [
    {
        labelName: {
            ru: 'Все зач.',
            en: 'All Ench.',
        },
        value: '0 _LEVEL1@1 _LEVEL2@2 _LEVEL3@3 _LEVEL4@4',
    },
    {
        labelName: {
            ru: 'Зач. 0',
            en: 'Ench. 0',
        },
        value: '0',
    },
    {
        labelName: {
            ru: 'Зач. 1',
            en: 'Ench. 1',
        },
        value: '_LEVEL1@1',
    },
    {
        labelName: {
            ru: 'Зач. 2',
            en: 'Ench. 2',
        },
        value: '_LEVEL2@2',
    },
    {
        labelName: {
            ru: 'Зач. 3',
            en: 'Ench. 3',
        },
        value: '_LEVEL3@3',
    },
    {
        labelName: {
            ru: 'Зач. 4',
            en: 'Ench. 4',
        },
        value: '_LEVEL4@4',
    },
];