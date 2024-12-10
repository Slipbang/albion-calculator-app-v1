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
export type TSelectQualityOptions = IOptions[];

export type TSelectClassOptions = {
    [key in ICraftingItemClass]: {
        [key in TItemTypeSelected]?: IOptions[]
    }
}

export const qualityOptions: TSelectQualityOptions = [
    {
        labelName: {
            ru: 'Обычное',
            en: 'Normal',
        },
        value: '1',
    },
    {
        labelName: {
            ru: 'Хорошее',
            en: 'Good',
        },
        value: '2',
    },
    {
        labelName: {
            ru: 'Выдающееся',
            en: 'Outstanding',
        },
        value: '3',
    },
    {
        labelName: {
            ru: 'Отличное',
            en: 'Excellent',
        },
        value: '4',
    },
    {
        labelName: {
            ru: 'Шедевр',
            en: 'Masterpiece',
        },
        value: '5',
    },
]

export const tierOptions: TSelectTierOptions = [
    {
        labelName: {
            ru: 'Все тиры',
            en: 'All Tiers',
        },
        value: 'T3 T4 T5 T6 T7 T8',
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
                value: 'sword shield axe mace knuckles crossbow hammer',
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
                value: 'knuckles',
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
                value: 'plate_helmet plate_armor plate_shoes',
            },
            {
                labelName: {
                    ru: 'Латный шлем',
                    en: 'Plate Helmet',
                },
                value: 'plate_helmet',
            },
            {
                labelName: {
                    ru: 'Латная броня',
                    en: 'Plate Armor',
                },
                value: 'plate_armor',
            },
            {
                labelName: {
                    ru: 'Латная обувь',
                    en: 'Plate Shoes',
                },
                value: 'plate_shoes',
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
                value: 'bow spear naturestaff dagger quarterstaff torch horn',
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
                value: 'naturestaff',
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
                value: 'leather_helmet leather_armor leather_shoes',
            },
            {
                labelName: {
                    ru: 'Кожаный шлем',
                    en: 'Leather Helmet',
                },
                value: 'leather_helmet',
            },
            {
                labelName: {
                    ru: 'Кожаная броня',
                    en: 'Leather Armor',
                },
                value: 'leather_armor',
            },
            {
                labelName: {
                    ru: 'Кожаная обувь',
                    en: 'Leather Shoes',
                },
                value: 'leather_shoes',
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
                value: 'firestaff book arcanestaff holystaff cursestaff froststaff orb totem torch',
            },
            {
                labelName: {
                    ru: 'Огненный',
                    en: 'Fire Staff',
                },
                value: 'firestaff',
            },
            {
                labelName: {
                    ru: 'Мистический',
                    en: 'Arcane Staff',
                },
                value: 'arcanestaff',
            },
            {
                labelName: {
                    ru: 'Священный',
                    en: 'Holy Staff',
                },
                value: 'holystaff',
            },
            {
                labelName: {
                    ru: 'Проклятый',
                    en: 'Cursed Staff',
                },
                value: 'cursestaff',
            },
            {
                labelName: {
                    ru: 'Морозный',
                    en: 'Frost Staff',
                },
                value: 'froststaff',
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
                value: 'cloth_helmet cloth_armor cloth_shoes',
            },
            {
                labelName: {
                    ru: 'Тканевый шлем',
                    en: 'Cloth Helmet',
                },
                value: 'cloth_helmet',
            },
            {
                labelName: {
                    ru: 'Тканевая броня',
                    en: 'Cloth Armor',
                },
                value: 'cloth_armor',
            },
            {
                labelName: {
                    ru: 'Тканевая обувь',
                    en: 'Cloth Shoes',
                },
                value: 'cloth_shoes',
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
                value: 'pickaxe woodaxe skinningknife stonehammer sickle demolitionhammer fishing',
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
                value: 'woodaxe',
            },
            {
                labelName: {
                    ru: 'Ножи свежевателя',
                    en: 'Skinning Knife',
                },
                value: 'skinningknife',
            },
            {
                labelName: {
                    ru: 'Кувалды камен.',
                    en: 'Stone Hammer',
                },
                value: 'stonehammer',
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
                value: 'demolitionhammer',
            },
            {
                labelName: {
                    ru: 'Удочка рыбака',
                    en: 'Fishing Rod',
                },
                value: 'fishing',
            },
        ],
        'armor': [
            {
                labelName: {
                    ru: 'Все категории',
                    en: 'All Categories',
                },
                value: 'fibergatherer_helmet fibergatherer_armor fibergatherer_shoes hidegatherer_helmet hidegatherer_armor hidegatherer_shoes oregatherer_helmet oregatherer_armor oregatherer_shoes rockgatherer_helmet rockgatherer_armor rockgatherer_shoes woodgatherer_helmet woodgatherer_armor woodgatherer_shoes fishgatherer_helmet fishgatherer_armor fishgatherer_shoes',
            },

            {
                labelName: {
                    ru: 'Шапка жнеца',
                    en: 'Harvester Cap',
                },
                value: 'fibergatherer_helmet',
            },
            {
                labelName: {
                    ru: 'Одежда жнеца',
                    en: 'Harvester Garb',
                },
                value: 'fibergatherer_armor',
            },
            {
                labelName: {
                    ru: 'Сапоги жнеца',
                    en: 'Harvester Workboots',
                },
                value: 'fibergatherer_shoes',
            },
            {
                labelName: {
                    ru: 'Шапка свежеват.',
                    en: 'Skinner Cap',
                },
                value: 'hidegatherer_helmet',
            },
            {
                labelName: {
                    ru: 'Одежда свежеват.',
                    en: 'Skinner Garb',
                },
                value: 'hidegatherer_armor',
            },
            {
                labelName: {
                    ru: 'Сапоги свежеват.',
                    en: 'Skinner Workboots',
                },
                value: 'hidegatherer_shoes',
            },
            {
                labelName: {
                    ru: 'Шапка шахтера',
                    en: 'Miner Cap',
                },
                value: 'oregatherer_helmet',
            },
            {
                labelName: {
                    ru: 'Одежда шахтера',
                    en: 'Miner Garb',
                },
                value: 'oregatherer_armor',
            },
            {
                labelName: {
                    ru: 'Сапоги шахтера',
                    en: 'Miner Workboots',
                },
                value: 'oregatherer_shoes',
            },
            {
                labelName: {
                    ru: 'Шапка каменол.',
                    en: 'Quarrier Cap',
                },
                value: 'rockgatherer_helmet',
            },
            {
                labelName: {
                    ru: 'Одежда каменол.',
                    en: 'Quarrier Garb',
                },
                value: 'rockgatherer_armor',
            },
            {
                labelName: {
                    ru: 'Сапоги каменол.',
                    en: 'Quarrier Workboots',
                },
                value: 'rockgatherer_shoes',
            },
            {
                labelName: {
                    ru: 'Шапка дровосека',
                    en: 'Lumberjack Cap',
                },
                value: 'rockgatherer_helmet',
            },
            {
                labelName: {
                    ru: 'Одежда дровосека',
                    en: 'Lumberjack Garb',
                },
                value: 'woodgatherer_armor',
            },
            {
                labelName: {
                    ru: 'Сапоги дровосека',
                    en: 'Lumberjack Workboots',
                },
                value: 'woodgatherer_shoes',
            },
            {
                labelName: {
                    ru: 'Шапка рыбака',
                    en: 'Fisherman Cap',
                },
                value: 'fishgatherer_helmet',
            },
            {
                labelName: {
                    ru: 'Одежда рыбака',
                    en: 'Fisherman Garb',
                },
                value: 'fishgatherer_armor',
            },
            {
                labelName: {
                    ru: 'Сапоги рыбака',
                    en: 'Fisherman Workboots',
                },
                value: 'fishgatherer_shoes',
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
        value: 'cloth_armor cloth_helmet cloth_shoes leather_armor leather_helmet leather_shoes plate_armor plate_helmet plate_shoes',
        params: [
            {
                labelName: {
                    ru: 'Тканевая броня',
                    en: 'Cloth Armor',
                },
                value: 'cloth_armor',
            },
            {
                labelName: {
                    ru: 'Тканевый шлем',
                    en: 'Cloth Helmet',
                },
                value: 'cloth_helmet',
            },
            {
                labelName: {
                    ru: 'Тканевая обувь',
                    en: 'Cloth Shoes',
                },
                value: 'cloth_shoes',
            },
            {
                labelName: {
                    ru: 'Кожаная броня',
                    en: 'Leather Armor',
                },
                value: 'leather_armor',
            },
            {
                labelName: {
                    ru: 'Кожаный шлем',
                    en: 'Leather Helmet',
                },
                value: 'leather_helmet',
            },
            {
                labelName: {
                    ru: 'Кожаная обувь',
                    en: 'Leather Shoes',
                },
                value: 'leather_shoes',
            },
            {
                labelName: {
                    ru: 'Латная броня',
                    en: 'Plate Armor',
                },
                value: 'plate_armor',
            },
            {
                labelName: {
                    ru: 'Латный шлем',
                    en: 'Plate Helmet',
                },
                value: 'plate_helmet',
            },
            {
                labelName: {
                    ru: 'Латная обувь',
                    en: 'Plate Shoes',
                },
                value: 'plate_shoes',
            },
        ]
    },
    {
        labelName: {
            ru: 'Ближний бой',
            en: 'Melee',
        },
        value: 'axe dagger hammer knuckles mace quarterstaff spear sword',
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
                value: 'knuckles',
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
        value: 'arcanestaff cursestaff firestaff froststaff holystaff naturestaff',
        params: [
            {
                labelName: {
                    ru: 'Мистический',
                    en: 'Arcane Staff',
                },
                value: 'arcanestaff',
            },
            {
                labelName: {
                    ru: 'Проклятый',
                    en: 'Cursed Staff',
                },
                value: 'cursestaff',
            },
            {
                labelName: {
                    ru: 'Огненный',
                    en: 'Fire Staff',
                },
                value: 'firestaff',
            },
            {
                labelName: {
                    ru: 'Морозный',
                    en: 'Frost Staff',
                },
                value: 'froststaff',
            },
            {
                labelName: {
                    ru: 'Священный',
                    en: 'Holy Staff',
                },
                value: 'holystaff',
            },
            {
                labelName: {
                    ru: 'Древесный',
                    en: 'Nature Staff',
                },
                value: 'naturestaff',
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