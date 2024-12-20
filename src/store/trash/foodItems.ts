// import {TConsumable} from "../../types/consumableTypes";
//
// export const foodItems: TConsumable = [
//     {
//         itemId: 'T5_MEAL_SOUP',
//         T5_CABBAGE: 144,
//         T1_FISHSAUCE_LEVEL: 90,
//         amountCrafted: 10,
//         foodConsumption: 648,
//     },
//     {
//         itemId: 'T5_MEAL_SOUP_FISH',
//         T7_FISH_FRESHWATER_SWAMP_RARE: 1,
//         T5_CABBAGE: 6,
//         T5_TEASEL: 6,
//         T5_MEAT: 6,
//         T1_FISHSAUCE_LEVEL: 27,
//         amountCrafted: 1,
//         foodConsumption: 81,
//     },
//     {
//         itemId: 'T4_MEAL_SALAD',
//         T4_TURNIP: 24,
//         T3_WHEAT: 24,
//         T1_FISHSAUCE_LEVEL: 30,
//         amountCrafted: 10,
//         foodConsumption: 216,
//     },
//     {
//         itemId: 'T6_MEAL_SALAD',
//         T6_POTATO: 72,
//         T5_CABBAGE: 72,
//         T1_FISHSAUCE_LEVEL: 90,
//         amountCrafted: 10,
//         foodConsumption: 648,
//     },
//     {
//         itemId: 'T4_MEAL_SALAD_FISH',
//         T5_FISH_SALTWATER_ALL_RARE: 1,
//         T4_TURNIP: 2,
//         T4_BURDOCK: 2,
//         T4_MEAT: 2,
//         T1_FISHSAUCE_LEVEL: 9,
//         amountCrafted: 1,
//         foodConsumption: 27,
//     },
//     {
//         itemId: 'T6_MEAL_SALAD_FISH',
//         T7_FISH_SALTWATER_ALL_RARE: 1,
//         T6_POTATO: 6,
//         T6_FOXGLOVE: 6,
//         T6_MEAT: 6,
//         T1_FISHSAUCE_LEVEL: 27,
//         amountCrafted: 1,
//         foodConsumption: 81,
//     },
//     {
//         itemId: 'T5_MEAL_PIE',
//         T5_CABBAGE: 6,
//         T3_FLOUR: 12,
//         T5_MEAT: 24,
//         T4_MILK: 6,
//         T1_FISHSAUCE_LEVEL: 30,
//         amountCrafted: 10,
//         foodConsumption: 216,
//     },
//     {
//         itemId: 'T7_MEAL_PIE',
//         T7_CORN: 18,
//         T3_FLOUR: 36,
//         T7_MEAT: 72,
//         T6_MILK: 18,
//         T1_FISHSAUCE_LEVEL: 90,
//         amountCrafted: 10,
//         foodConsumption: 648,
//     },
//     {
//         itemId: 'T5_MEAL_PIE_FISH',
//         T5_FISH_FRESHWATER_MOUNTAIN_RARE: 1,
//         T5_CABBAGE: 2,
//         T5_TEASEL: 2,
//         T5_EGG: 2,
//         T1_FISHSAUCE_LEVEL: 9,
//         amountCrafted: 1,
//         foodConsumption: 27,
//     },
//     {
//         itemId: 'T7_MEAL_PIE_FISH',
//         T7_FISH_FRESHWATER_MOUNTAIN_RARE: 1,
//         T7_CORN: 6,
//         T7_MULLEIN: 6,
//         T7_MEAT: 6,
//         T1_FISHSAUCE_LEVEL: 27,
//         amountCrafted: 1,
//         foodConsumption: 81,
//     },
//     {
//         itemId: 'T5_MEAL_OMELETTE',
//         T5_CABBAGE: 12,
//         T5_MEAT: 24,
//         T5_EGG: 6,
//         T1_FISHSAUCE_LEVEL: 30,
//         amountCrafted: 10,
//         foodConsumption: 189,
//     },
//     {
//         itemId: 'T7_MEAL_OMELETTE',
//         T7_CORN: 36,
//         T7_MEAT: 72,
//         T5_EGG: 18,
//         T1_FISHSAUCE_LEVEL: 90,
//         amountCrafted: 10,
//         foodConsumption: 567,
//     },
//     {
//         itemId: 'T5_MEAL_OMELETTE_FISH',
//         T5_FISH_FRESHWATER_STEPPE_RARE: 1,
//         T5_CABBAGE: 2,
//         T5_TEASEL: 2,
//         T5_EGG: 2,
//         T1_FISHSAUCE_LEVEL: 9,
//         amountCrafted: 1,
//         foodConsumption: 27,
//     },
//     {
//         itemId: 'T7_MEAL_OMELETTE_FISH',
//         T7_FISH_FRESHWATER_STEPPE_RARE: 1,
//         T7_CORN: 6,
//         T7_MULLEIN: 6,
//         T7_MEAT: 6,
//         T1_FISHSAUCE_LEVEL: 27,
//         amountCrafted: 1,
//         foodConsumption: 81,
//     },
//     {
//         itemId: 'T5_MEAL_OMELETTE_AVALON',
//         T6_MILK: 12,
//         T5_MEAT: 24,
//         T5_EGG: 6,
//         QUESTITEM_TOKEN_AVALON: 30,
//         T1_FISHSAUCE_LEVEL: 30,
//         amountCrafted: 10,
//         foodConsumption: 405,
//     },
//     {
//         itemId: 'T7_MEAL_OMELETTE_AVALON',
//         T8_MILK: 36,
//         T7_MEAT: 72,
//         T5_EGG: 18,
//         QUESTITEM_TOKEN_AVALON: 90,
//         T1_FISHSAUCE_LEVEL: 90,
//         amountCrafted: 10,
//         foodConsumption: 1215,
//     },
//     {
//         itemId: 'T5_MEAL_ROAST',
//         T5_MEAT: 24,
//         T5_CABBAGE: 12,
//         T6_MILK: 12,
//         T1_FISHSAUCE_LEVEL: 30,
//         amountCrafted: 10,
//         foodConsumption: 216,
//     },
//     {
//         itemId: 'T7_MEAL_ROAST',
//         T7_MEAT: 72,
//         T7_CORN: 36,
//         T8_MILK: 36,
//         T1_FISHSAUCE_LEVEL: 90,
//         amountCrafted: 10,
//         foodConsumption: 648,
//     },
//     {
//         itemId: 'T5_MEAL_ROAST_FISH',
//         T5_FISH_FRESHWATER_AVALON_RARE: 1,
//         T5_CABBAGE: 2,
//         T5_TEASEL: 2,
//         T6_MILK: 2,
//         T1_FISHSAUCE_LEVEL: 9,
//         amountCrafted: 1,
//         foodConsumption: 27,
//     },
//     {
//         itemId: 'T7_MEAL_ROAST_FISH',
//         T7_FISH_FRESHWATER_AVALON_RARE: 1,
//         T7_CORN: 6,
//         T7_MULLEIN: 6,
//         T8_MILK: 6,
//         T1_FISHSAUCE_LEVEL: 27,
//         amountCrafted: 1,
//         foodConsumption: 81,
//     },
//     {
//         itemId: 'T4_MEAL_STEW',
//         T4_TURNIP: 4,
//         T4_BREAD: 4,
//         T4_MEAT: 8,
//         T1_FISHSAUCE_LEVEL: 10,
//         amountCrafted: 10,
//         foodConsumption: 72,
//     },
//     {
//         itemId: 'T6_MEAL_STEW',
//         T6_POTATO: 12,
//         T4_BREAD: 12,
//         T6_MEAT: 24,
//         T1_FISHSAUCE_LEVEL: 30,
//         amountCrafted: 10,
//         foodConsumption: 216,
//     },
//     {
//         itemId: 'T8_MEAL_STEW',
//         T8_PUMPKIN: 36,
//         T4_BREAD: 36,
//         T8_MEAT: 72,
//         T1_FISHSAUCE_LEVEL: 90,
//         amountCrafted: 10,
//         foodConsumption: 648,
//     },
//     {
//         itemId: 'T4_MEAL_STEW_FISH',
//         T3_FISH_FRESHWATER_FOREST_RARE: 1,
//         T4_TURNIP: 1,
//         T4_BURDOCK: 1,
//         T1_FISHSAUCE_LEVEL: 3,
//         amountCrafted: 1,
//         foodConsumption: 9,
//     },
//     {
//         itemId: 'T6_MEAL_STEW_FISH',
//         T5_FISH_FRESHWATER_FOREST_RARE: 1,
//         T6_POTATO: 2,
//         T6_FOXGLOVE: 2,
//         T6_MILK: 2,
//         T1_FISHSAUCE_LEVEL: 9,
//         amountCrafted: 1,
//         foodConsumption: 27,
//     },
//     {
//         itemId: 'T8_MEAL_STEW_FISH',
//         T7_FISH_FRESHWATER_FOREST_RARE: 1,
//         T8_PUMPKIN: 6,
//         T8_YARROW: 6,
//         T8_MILK: 6,
//         T1_FISHSAUCE_LEVEL: 27,
//         amountCrafted: 1,
//         foodConsumption: 81,
//     },
//     {
//         itemId: 'T4_MEAL_STEW_AVALON',
//         T1_CARROT: 4,
//         T4_TURNIP: 4,
//         T4_MEAT: 8,
//         T1_FISHSAUCE_LEVEL: 10,
//         QUESTITEM_TOKEN_AVALON: 10,
//         amountCrafted: 10,
//         foodConsumption: 144,
//     },
//     {
//         itemId: 'T6_MEAL_STEW_AVALON',
//         T5_CABBAGE: 12,
//         T6_POTATO: 12,
//         T6_MEAT: 24,
//         T1_FISHSAUCE_LEVEL: 30,
//         QUESTITEM_TOKEN_AVALON: 30,
//         amountCrafted: 10,
//         foodConsumption: 432,
//     },
//     {
//         itemId: 'T8_MEAL_STEW_AVALON',
//         T7_CORN: 36,
//         T8_PUMPKIN: 36,
//         T8_MEAT: 72,
//         T1_FISHSAUCE_LEVEL: 90,
//         QUESTITEM_TOKEN_AVALON: 90,
//         amountCrafted: 10,
//         foodConsumption: 1296,
//     },
//     {
//         itemId: 'T4_MEAL_SANDWICH',
//         T4_BREAD: 4,
//         T4_MEAT: 8,
//         T4_BUTTER: 2,
//         T1_FISHSAUCE_LEVEL: 10,
//         amountCrafted: 10,
//         foodConsumption: 63,
//     },
//     {
//         itemId: 'T6_MEAL_SANDWICH',
//         T4_BREAD: 12,
//         T6_MEAT: 24,
//         T6_BUTTER: 6,
//         T1_FISHSAUCE_LEVEL: 30,
//         amountCrafted: 10,
//         foodConsumption: 189,
//     },
//     {
//         itemId: 'T8_MEAL_SANDWICH',
//         T4_BREAD: 36,
//         T8_MEAT: 72,
//         T8_BUTTER: 18,
//         T1_FISHSAUCE_LEVEL: 90,
//         amountCrafted: 10,
//         foodConsumption: 567,
//     },
//     {
//         itemId: 'T4_MEAL_SANDWICH_FISH',
//         T3_FISH_FRESHWATER_HIGHLANDS_RARE: 1,
//         T4_TURNIP: 1,
//         T4_BUTTER: 1,
//         T1_FISHSAUCE_LEVEL: 3,
//         amountCrafted: 1,
//         foodConsumption: 9,
//     },
//     {
//         itemId: 'T6_MEAL_SANDWICH_FISH',
//         T5_FISH_FRESHWATER_HIGHLANDS_RARE: 1,
//         T6_POTATO: 2,
//         T6_FOXGLOVE: 2,
//         T6_BUTTER: 2,
//         T1_FISHSAUCE_LEVEL: 9,
//         amountCrafted: 1,
//         foodConsumption: 27,
//     },
//     {
//         itemId: 'T8_MEAL_SANDWICH_FISH',
//         T7_FISH_FRESHWATER_HIGHLANDS_RARE: 1,
//         T8_PUMPKIN: 6,
//         T8_YARROW: 6,
//         T8_BUTTER: 6,
//         T1_FISHSAUCE_LEVEL: 27,
//         amountCrafted: 1,
//         foodConsumption: 81,
//     },
//     {
//         itemId: 'T4_MEAL_SANDWICH_AVALON',
//         T4_BREAD: 4,
//         T4_MEAT: 8,
//         T4_BUTTER: 2,
//         T1_FISHSAUCE_LEVEL: 10,
//         QUESTITEM_TOKEN_AVALON: 10,
//         amountCrafted: 10,
//         foodConsumption: 135,
//     },
//     {
//         itemId: 'T6_MEAL_SANDWICH_AVALON',
//         T4_BREAD: 12,
//         T6_MEAT: 24,
//         T6_BUTTER: 6,
//         T1_FISHSAUCE_LEVEL: 30,
//         QUESTITEM_TOKEN_AVALON: 30,
//         amountCrafted: 10,
//         foodConsumption: 405,
//     },
//     {
//         itemId: 'T8_MEAL_SANDWICH_AVALON',
//         T4_BREAD: 36,
//         T8_MEAT: 72,
//         T8_BUTTER: 18,
//         T1_FISHSAUCE_LEVEL: 90,
//         QUESTITEM_TOKEN_AVALON: 90,
//         amountCrafted: 10,
//         foodConsumption: 1215,
//     },
// ];
