import {ICraftItem} from "../../types/craftItemsType";

export const materials: ICraftItem[] = [
    {
        itemId: `T3_METALBAR`,
        itemName: {
          ru: 'Слиток бронзы',
          en: 'Bronze Bar',
        },
        ORE: 2,
    },
    {
        itemId: `T4_METALBAR`,
        itemName: {
          ru: 'Слиток стали',
          en: 'Steel Bar',
        },
        ORE: 2,
        METALBAR: 1,
    },
    {
        itemId: `T5_METALBAR`,
        itemName: {
          ru: 'Слиток титановой стали',
          en: 'Titanium Steel',
        },
        ORE: 3,
        METALBAR: 1,
    },
    {
        itemId: `T6_METALBAR`,
        itemName: {
          ru: 'Слиток рунитовой стали',
          en: 'Runite Steel',
        },
        ORE: 4,
        METALBAR: 1,
    },
    {
        itemId: `T7_METALBAR`,
        itemName: {
          ru: 'Слиток метеоритной стали',
          en: 'Meteorite Steel',
        },
        ORE: 5,
        METALBAR: 1,
    },
    {
        itemId: `T8_METALBAR`,
        itemName: {
          ru: 'Слиток адамантиевой стали',
          en: 'Adamantium Steel',
        },
        ORE: 5,
        METALBAR: 1,
    },
    {
        itemId: `T3_LEATHER`, //LEATHER
        itemName: {
          ru: 'Толстая кожа',
          en: 'Thick Leather',
        },
        HIDE: 2,
        LEATHER: 1,
    },
    {
        itemId: `T4_LEATHER`,
        itemName: {
          ru: 'Обработанная кожа',
          en: 'Worked Leather',
        },
        HIDE: 2,
        LEATHER: 1,
    },
    {
        itemId: `T5_LEATHER`,
        itemName: {
          ru: 'Выделанная кожа',
          en: 'Cured Leather',
        },
        HIDE: 3,
        LEATHER: 1,
    },
    {
        itemId: `T6_LEATHER`,
        itemName: {
          ru: 'Кожа демона',
          en: 'Hardened Leather',
        },
        HIDE: 4,
        LEATHER: 1,
    },
    {
        itemId: `T7_LEATHER`,
        itemName: {
          ru: 'Прочная кожа',
          en: 'Reinforced Leather',
        },
        HIDE: 5,
        LEATHER: 1,
    },
    {
        itemId: `T8_LEATHER`,
        itemName: {
          ru: 'Долговечная кожа',
          en: 'Fortified Leather',
        },
        HIDE: 5,
        LEATHER: 1,
    },
    {
        itemId: `T3_CLOTH`, //CLOTH
        itemName: {
          ru: 'Крепкая ткань',
          en: 'Neat Cloth',
        },
        FIBER: 2,
        CLOTH: 1,
    },
    {
        itemId: `T4_CLOTH`,
        itemName: {
          ru: 'Изысканная ткань',
          en: 'Fine Cloth',
        },
        FIBER: 2,
        CLOTH: 1,
    },
    {
        itemId: `T5_CLOTH`,
        itemName: {
          ru: 'Ткань с',
          en: 'Ornate Cloth',
        },
        FIBER: 3,
        CLOTH: 1,
    },
    {
        itemId: `T6_CLOTH`,
        itemName: {
          ru: 'Дорогая ткань',
          en: 'Lavish Cloth',
        },
        FIBER: 4,
        CLOTH: 1,
    },
    {
        itemId: `T7_CLOTH`,
        itemName: {
          ru: 'Роскошная ткань',
          en: 'Opulent Cloth',
        },
        FIBER: 5,
        CLOTH: 1,
    },
    {
        itemId: `T8_CLOTH`,
        itemName: {
          ru: 'Великолепная ткань',
          en: 'Baroque Cloth',
        },
        FIBER: 5,
        CLOTH: 1,
    },
    {
        itemId: `T3_PLANKS`, //PLANKS
        itemName: {
          ru: 'Каштановые брусья',
          en: 'Chestnut Planks',
        },
        WOOD: 2,
        PLANKS: 1,
    },
    {
        itemId: `T4_PLANKS`,
        itemName: {
          ru: 'Сосновые брусья',
          en: 'Pine Planks',
        },
        WOOD: 2,
        PLANKS: 1,
    },
    {
        itemId: `T5_PLANKS`,
        itemName: {
          ru: 'Брусья из кедра',
          en: 'Cedar Planks',
        },
        WOOD: 3,
        PLANKS: 1,
    },
    {
        itemId: `T6_PLANKS`,
        itemName: {
          ru: 'Брусья из кровавого дерева',
          en: 'Bloodoak Planks',
        },
        WOOD: 4,
        PLANKS: 1,
    },
    {
        itemId: `T7_PLANKS`,
        itemName: {
          ru: 'Брусья из железного дерева',
          en: 'Ashenbark Planks',
        },
        WOOD: 5,
        PLANKS: 1,
    },
    {
        itemId: `T8_PLANKS`,
        itemName: {
          ru: 'Брусья из белого дерева',
          en: 'Whitewood Planks',
        },
        WOOD: 5,
        PLANKS: 1,
    },
    {
        itemId: `T3_STONEBLOCK`,
        itemName: {
          ru: 'Блок песчаника',
          en: 'Sandstone Block',
        },
        ROCK: 2,
        STONEBLOCK: 1,
    },
    {
        itemId: `T4_STONEBLOCK`,
        itemName: {
          ru: 'Блок травертина',
          en: 'Travertine Block',
        },
        ROCK: 2,
        STONEBLOCK: 1,
    },
    {
        itemId: `T5_STONEBLOCK`,
        itemName: {
          ru: 'Блок гранита',
          en: 'Granite Block',
        },
        ROCK: 3,
        STONEBLOCK: 1,
    },
    {
        itemId: `T6_STONEBLOCK`,
        itemName: {
          ru: 'Блок лунного камня',
          en: 'Slate Block',
        },
        ROCK: 4,
        STONEBLOCK: 1,
    },
    {
        itemId: `T7_STONEBLOCK`,
        itemName: {
          ru: 'Блок базальта',
          en: 'Basalt Block',
        },
        ROCK: 5,
        STONEBLOCK: 1,
    },
    {
        itemId: `T8_STONEBLOCK`,
        itemName: {
          ru: 'Блок мрамора',
          en: 'Marble Block',
        },
        ROCK: 5,
        STONEBLOCK: 1,
    },
    {
        itemId: `T4_ORE`,
        itemName: {
          ru: 'Железная руда',
          en: 'Iron Ore',
        },
    },
    {
        itemId: `T5_ORE`,
        itemName: {
          ru: 'Титановая руда',
          en: 'Titanium Ore',
        },
    },
    {
        itemId: `T6_ORE`,
        itemName: {
          ru: 'Рунитовая руда',
          en: 'Runite Ore',
        },
    },
    {
        itemId: `T7_ORE`,
        itemName: {
          ru: 'Метеоритная руда',
          en: 'Meteorite Ore',
        },
    },
    {
        itemId: `T8_ORE`,
        itemName: {
          ru: 'Адамантиевая руда',
          en: 'Adamantium Ore',
        },
    },
    {
        itemId: `T4_WOOD`,
        itemName: {
          ru: 'Бревна сосны',
          en: 'Pine Logs',
        },
    },
    {
        itemId: `T5_WOOD`,
        itemName: {
          ru: 'Бревна кедра',
          en: 'Cedar Logs',
        },
    },
    {
        itemId: `T6_WOOD`,
        itemName: {
          ru: 'Бревна кровавого дерева',
          en: 'Bloodoak Logs',
        },
    },
    {
        itemId: `T7_WOOD`,
        itemName: {
          ru: 'Бревна железного дерева',
          en: 'Ashenbark Logs',
        },
    },
    {
        itemId: `T8_WOOD`,
        itemName: {
          ru: 'Бревна белого дерева',
          en: 'Whitewood Logs',
        },
    },
    {
        itemId: `T4_HIDE`,
        itemName: {
          ru: 'Средняя шкура',
          en: 'Medium Hide',
        },
    },
    {
        itemId: `T5_HIDE`,
        itemName: {
          ru: 'Тяжелая шкура',
          en: 'Heavy Hide',
        },
    },
    {
        itemId: `T6_HIDE`,
        itemName: {
          ru: 'Прочная шкура',
          en: 'Robust Hide',
        },
    },
    {
        itemId: `T7_HIDE`,
        itemName: {
          ru: 'Толстая шкура',
          en: 'Thick Hide',
        },
    },
    {
        itemId: `T8_HIDE`,
        itemName: {
          ru: 'Надежная шкура',
          en: 'Resilient Hide',
        },
    },
    {
        itemId: `T4_FIBER`,
        itemName: {
          ru: 'Пенька',
          en: 'Hemp',
        },
    },
    {
        itemId: `T5_FIBER`,
        itemName: {
          ru: 'Звездоцвет',
          en: 'Skyflower',
        },
    },
    {
        itemId: `T6_FIBER`,
        itemName: {
          ru: 'Хлопок-янтарник',
          en: 'Amberleaf Cotton',
        },
    },
    {
        itemId: `T7_FIBER`,
        itemName: {
          ru: 'Златолен',
          en: 'Sunflax',
        },
    },
    {
        itemId: `T8_FIBER`,
        itemName: {
          ru: 'Призрачная пенька',
          en: 'Ghost Hemp',
        },
    },
    {
        itemId: `T4_ROCK`,
        itemName: {
          ru: 'Травертин',
          en: 'Travertine',
        },
    },
    {
        itemId: `T5_ROCK`,
        itemName: {
          ru: 'Гранит',
          en: 'Granite',
        },
    },
    {
        itemId: `T6_ROCK`,
        itemName: {
          ru: 'Лунный камень',
          en: 'Slate',
        },
    },
    {
        itemId: `T7_ROCK`,
        itemName: {
          ru: 'Базальт',
          en: 'Basalt',
        },
    },
    {
        itemId: `T8_ROCK`,
        itemName: {
          ru: 'Мрамор',
          en: 'Marble',
        },
    },
]