import {TSelectedLanguage} from "../../types/languageTypes";

export type TConsumableNames = {
    [key: string]: {
        [key in TSelectedLanguage]: string;
    }
}

export const consumablesNamesData: TConsumableNames = {
    //meals names
    T5_MEAL_SOUP: {
        ru: 'Капустный суп',
        en: 'Cabbage Soup',
    },
    T5_MEAL_SOUP_FISH: {
        ru: 'Суп из черноводных моллюсков',
        en: 'Blackbog Clam Soup',
    },
    T4_MEAL_SALAD: {
        ru: 'Салат с репой',
        en: 'Turnip Salad',
    },
    T6_MEAL_SALAD: {
        ru: 'Картофельный салат',
        en: 'Potato Salad',
    },
    T4_MEAL_SALAD_FISH: {
        ru: 'Салат со срединным осьминогом',
        en: 'Midwater Octopus Salad',
    },
    T6_MEAL_SALAD_FISH: {
        ru: 'Салат с глубинным кракеном',
        en: 'Deepwater Kraken Salad',
    },
    T5_MEAL_PIE: {
        ru: 'Пирог с гусятиной',
        en: 'Goose Pie',
    },
    T7_MEAL_PIE: {
        ru: 'Пирог со свининой',
        en: 'Pork Pie',
    },
    T5_MEAL_PIE_FISH: {
        ru: 'Пирог с горной слепоглазкой',
        en: 'Mountain Blindeye Pie',
    },
    T7_MEAL_PIE_FISH: {
        ru: 'Пирог с морозным смертеглазом',
        en: 'Frostpeak Deadeye Pie',
    },
    T5_MEAL_OMELETTE: {
        ru: 'Омлет с гусятиной',
        en: 'Goose Omelette',
    },
    T7_MEAL_OMELETTE: {
        ru: 'Омлет с беконом',
        en: 'Pork Omelette',
    },
    T5_MEAL_OMELETTE_FISH: {
        ru: 'Омлет с сухопутным крабом',
        en: 'Drybrook Crab Omelette',
    },
    T7_MEAL_OMELETTE_FISH: {
        ru: 'Омлет с грязекрабом',
        en: 'Dusthole Crab Omelette',
    },
    T5_MEAL_OMELETTE_AVALON: {
        ru: 'Авалонский омлет с гусятиной',
        en: 'Avalonian Goose Omelette',
    },
    T7_MEAL_OMELETTE_AVALON: {
        ru: 'Авалонский омлет с беконом',
        en: 'Avalonian Pork Omelette',
    },
    T5_MEAL_ROAST: {
        ru: 'Жареный гусь',
        en: 'Roast Goose',
    },
    T7_MEAL_ROAST: {
        ru: 'Жареная свинина',
        en: 'Roast Pork',
    },
    T5_MEAL_ROAST_FISH: {
        ru: 'Жареный мглистый окунь',
        en: 'Roasted Clearhaze Snapper',
    },
    T7_MEAL_ROAST_FISH: {
        ru: 'Жареный туманный окунь',
        en: 'Roasted Puremist Snapper',
    },
    T4_MEAL_STEW: {
        ru: 'Жаркое из козлятины',
        en: 'Goat Stew',
    },
    T6_MEAL_STEW: {
        ru: 'Жаркое из баранины',
        en: 'Mutton Stew',
    },
    T8_MEAL_STEW: {
        ru: 'Жаркое из говядины',
        en: 'Beef Stew',
    },
    T4_MEAL_STEW_FISH: {
        ru: 'Жаркое из речного угря',
        en: 'Greenriver Eel Stew',
    },
    T6_MEAL_STEW_FISH: {
        ru: 'Жаркое из красноводного угря',
        en: 'Redspring Eel Stew',
    },
    T8_MEAL_STEW_FISH: {
        ru: 'Жаркое из болотного угря',
        en: 'Deadwater Eel Stew',
    },
    T4_MEAL_STEW_AVALON: {
        ru: 'Авалонское жаркое из козлятины',
        en: 'Avalonian Goat Stew',
    },
    T6_MEAL_STEW_AVALON: {
        ru: 'Авалонское жаркое из баранины',
        en: 'Avalonian Mutton Stew',
    },
    T8_MEAL_STEW_AVALON: {
        ru: 'Авалонское жаркое из говядины',
        en: 'Avalonian Beef Stew',
    },
    T4_MEAL_SANDWICH: {
        ru: 'Сэндвич с козлятиной',
        en: 'Goat Sandwich',
    },
    T6_MEAL_SANDWICH: {
        ru: 'Сэндвич с бараниной',
        en: 'Mutton Sandwich',
    },
    T8_MEAL_SANDWICH: {
        ru: 'Сэндвич с говядиной',
        en: 'Beef Sandwich',
    },
    T4_MEAL_SANDWICH_FISH: {
        ru: 'Сэндвич с пестроногим подкаменщиком',
        en: 'Stonestream Lurcher Sandwich',
    },
    T6_MEAL_SANDWICH_FISH: {
        ru: 'Сэндвич с камышовым подкаменщиком',
        en: 'Rushwater Lurcher Sandwich',
    },
    T8_MEAL_SANDWICH_FISH: {
        ru: 'Сэндвич с громокрылым подкаменщиком',
        en: 'Thunderfall Lurcher Sandwich',
    },
    T4_MEAL_SANDWICH_AVALON: {
        ru: 'Авалонский сэндвич с козлятиной',
        en: 'Avalonian Goat Sandwich',
    },
    T6_MEAL_SANDWICH_AVALON: {
        ru: 'Авалонский сэндвич с бараниной',
        en: 'Avalonian Mutton Sandwich',
    },
    T8_MEAL_SANDWICH_AVALON: {
        ru: 'Авалонский сэндвич с говядиной',
        en: 'Avalonian Beef Sandwich',
    },

    //potions names
    T4_POTION_HEAL: {
        ru: 'Эликсир здоровья',
        en: 'Healing Potion',
    },

    T4_POTION_ENERGY: {
        ru: 'Эликсир энергии',
        en: 'Energy Potion',
    },

    T4_POTION_COOLDOWN: {
        ru: 'Малый эликсир яда',
        en: 'Minor Poison Potion',
    },
    T4_POTION_BERSERK: {
        ru: 'Малое зелье берсерка',
        en: 'Minor Berserk Potion',
    },
    T4_POTION_LAVA: {
        ru: 'Малое зелье адского пламени',
        en: 'Minor Hellfire Potion',
    },
    T4_POTION_GATHER: {
        ru: 'Малое зелье собирателя',
        en: 'Minor Gathering Potion',
    },
    T4_POTION_TORNADO: {
        ru: 'Малая Буря в стакане',
        en: 'Minor Tornado in a Bottle',
    },
    T5_POTION_REVIVE: {
        ru: 'Зелье гиганта',
        en: 'Gigantify Potion',
    },
    T5_POTION_STONESKIN: {
        ru: 'Эликсир защиты',
        en: 'Resistance Potion',
    },
    T5_POTION_SLOWFIELD: {
        ru: 'Вязкая настойка',
        en: 'Sticky Potion',
    },
    T5_POTION_MOB_RESET: {
        ru: 'Успокаивающее зелье',
        en: 'Calming Potion',
    },
    T5_POTION_CLEANSE2: {
        ru: 'Очищающее зелье',
        en: 'Cleansing Potion',
    },
    T5_POTION_ACID: {
        ru: 'Кислотное зелье',
        en: 'Acid Potion',
    },
    T6_POTION_HEAL: {
        ru: 'Большой эликсир здоровья',
        en: 'Major Healing Potion',
    },
    T6_POTION_ENERGY: {
        ru: 'Большой эликсир энергии',
        en: 'Major Energy Potion',
    },
    T6_POTION_COOLDOWN: {
        ru: 'Эликсир яда',
        en: 'Poison Potion',
    },
    T6_POTION_BERSERK: {
        ru: 'Зелье берсерка',
        en: 'Berserk Potion',
    },
    T6_POTION_LAVA: {
        ru: 'Зелье адского пламени',
        en: 'Hellfire Potion',
    },
    T6_POTION_GATHER: {
        ru: 'Зелье собирателя',
        en: 'Gathering Potion',
    },
    T6_POTION_TORNADO: {
        ru: 'Буря в стакане',
        en: 'Tornado in a Bottle',
    },
    T7_POTION_REVIVE: {
        ru: 'Большое зелье гиганта',
        en: 'Major Gigantify Potion',
    },
    T7_POTION_STONESKIN: {
        ru: 'Большой эликсир защиты',
        en: 'Major Resistance Potion',
    },
    T7_POTION_SLOWFIELD: {
        ru: 'Большая вязкая настойка',
        en: 'Major Sticky Potion',
    },
    T7_POTION_MOB_RESET: {
        ru: 'Большое успокаивающее зелье',
        en: 'Major Calming Potion',
    },
    T7_POTION_CLEANSE2: {
        ru: 'Большое очищающее зелье',
        en: 'Major Cleansing Potion',
    },
    T7_POTION_ACID: {
        ru: 'Большое кислотное зелье',
        en: 'Major Acid Potion',
    },
    T8_POTION_COOLDOWN: {
        ru: 'Большой эликсир яда',
        en: 'Major Poison Potion',
    },
    T8_POTION_CLEANSE: {
        ru: 'Эликсир невидимости',
        en: 'Invisibility Potion',
    },
    T8_POTION_BERSERK: {
        ru: 'Большое зелье берсерка',
        en: 'Major Berserk Potion',
    },
    T8_POTION_LAVA: {
        ru: 'Большое зелье адского пламени',
        en: 'Major Hellfire Potion',
    },
    T8_POTION_GATHER: {
        ru: 'Большое зелье собирателя',
        en: 'Major Gathering Potion',
    },
    T8_POTION_TORNADO: {
        ru: 'Большая буря в стакане',
        en: 'Major Tornado in a Bottle',
    },

    //resources names
    T1_FISHSAUCE_LEVEL1: {
        ru: 'Основной рыбный соус',
        en: 'Basic Fish Sauce',
    },
    T1_FISHSAUCE_LEVEL2: {
        ru: 'Необычный рыбный соус',
        en: 'Fancy Fish Sauce',
    },
    T1_FISHSAUCE_LEVEL3: {
        ru: 'Особый рыбный соус',
        en: 'Special Fish Sauce',
    },
    T1_FISHSAUCE_LEVEL: {
        ru: 'Рыбные соусы',
        en: 'Fish Sauces',
    },
    T1_CARROT: {
        ru: 'Морковь',
        en: 'Carrots',
    },
    T2_BEAN: {
      ru: 'Бобы',
      en: 'Beans',
    },
    T3_FLOUR: {
        ru: 'Мука',
        en: 'Flour',
    },
    T3_WHEAT: {
        ru: 'Сноп пшеницы',
        en: 'Sheaf of Wheat',
    },
    T5_CABBAGE: {
        ru: 'Капуста',
        en: 'Cabbage',
    },
    T3_COMFREY: {
        ru: 'Ярколист',
        en: 'Brightleaf Comfrey',
    },
    T5_TEASEL: {
        ru: 'Драконья ворсянка',
        en: 'Dragon Teasel',
    },
    T7_FISH_FRESHWATER_SWAMP_RARE: {
        ru: 'Черноводный моллюск',
        en: 'Blackbog Clam',
    },
    T5_MEAT: {
        ru: 'Гусятина',
        en: 'Raw Goose',
    },
    T4_TURNIP: {
        ru: 'Репа',
        en: 'Turnips',
    },
    T6_POTATO: {
        ru: 'Картофель',
        en: 'Potatoes',
    },
    T5_FISH_SALTWATER_ALL_RARE: {
        ru: 'Срединный осьминог',
        en: 'Midwater Octopus',
    },
    T4_BURDOCK: {
        ru: 'Зубчатый лопух',
        en: 'Crenellated Burdock',
    },
    T4_MEAT: {
        ru: 'Козлятина',
        en: 'Raw Goat',
    },
    T7_FISH_SALTWATER_ALL_RARE: {
        ru: 'Глубинный кракен',
        en: 'Deepwater Kraken',
    },
    T6_FOXGLOVE: {
        ru: 'Туманная наперстянка',
        en: 'Elusive Foxglove',
    },
    T6_MEAT: {
        ru: 'Баранина',
        en: 'Raw Mutton',
    },
    T4_MILK: {
        ru: 'Козье молоко',
        en: 'Goat\'s Milk',
    },
    T7_CORN: {
        ru: 'Кукурузные початки',
        en: 'Bundle of Corn',
    },
    T7_MEAT: {
        ru: 'Свинина',
        en: 'Raw Pork',
    },
    T6_MILK: {
        ru: 'Овечье молоко',
        en: 'Sheep\'s Milk',
    },
    T5_EGG: {
        ru: 'Гусиные яйца',
        en: 'Goose Eggs',
    },
    T5_FISH_FRESHWATER_MOUNTAIN_RARE: {
        ru: 'Горная слепоглазка',
        en: 'Mountain Blindeye',
    },
    T7_FISH_FRESHWATER_MOUNTAIN_RARE: {
        ru: 'Морозный смертеглаз',
        en: 'Frostpeak Deadeye',
    },
    QUESTITEM_TOKEN_AVALON: {
      ru: 'Авалонская энергия',
      en: 'Avalonian Energy',
    },
    T7_MULLEIN: {
        ru: 'Царский огнецвет',
        en: 'Firetouched Mullein',
    },
    T5_FISH_FRESHWATER_STEPPE_RARE: {
        ru: 'Сухопутный краб',
        en: 'Drybrook Crab',
    },
    T7_FISH_FRESHWATER_STEPPE_RARE: {
        ru: 'Грязекраб',
        en: 'Dusthole Crab',
    },
    T8_MILK: {
        ru: 'Коровье молоко',
        en: 'Cow\'s Milk',
    },
    T5_FISH_FRESHWATER_AVALON_RARE: {
        ru: 'Мглистый окунь',
        en: 'Clearhaze Snapper',
    },
    T7_FISH_FRESHWATER_AVALON_RARE: {
        ru: 'Туманный окунь',
        en: 'Puremist Snapper',
    },
    T4_BREAD: {
        ru: 'Хлеб',
        en: 'Bread',
    },
    T8_PUMPKIN: {
        ru: 'Тыква',
        en: 'Pumpkin',
    },
    T8_MEAT: {
        ru: 'Говядина',
        en: 'Raw Beef',
    },
    T3_FISH_FRESHWATER_FOREST_RARE: {
        ru: 'Речной угорь',
        en: 'Greenriver Eel',
    },
    T5_FISH_FRESHWATER_FOREST_RARE: {
        ru: 'Красноводный угорь',
        en: 'Redspring Eel',
    },
    T7_FISH_FRESHWATER_FOREST_RARE: {
        ru: 'Болотный угорь',
        en: 'Deadwater Eel',
    },
    T8_YARROW: {
        ru: 'Упырий тысячелистник',
        en: 'Ghoul Yarrow',
    },
    T4_BUTTER: {
        ru: 'Козье масло',
        en: 'Goat\'s Butter',
    },
    T6_BUTTER: {
        ru: 'Овечье молоко',
        en: 'Sheep\'s Butter',
    },
    T8_BUTTER: {
        ru: 'Коровье масло',
        en: 'Cow\'s Butter',
    },
    T3_FISH_FRESHWATER_HIGHLANDS_RARE: {
        ru: 'Пестроногий подкаменщик',
        en: 'Stonestream Lurcher',
    },
    T5_FISH_FRESHWATER_HIGHLANDS_RARE: {
        ru: 'Камышовый подкаменщик',
        en: 'Rushwater Lurcher',
    },
    T7_FISH_FRESHWATER_HIGHLANDS_RARE: {
        ru: 'Громокрылый подкаменщик',
        en: 'Thunderfall Lurcher',
    },
    T1_ALCHEMY_EXTRACT_LEVEL1: {
        ru: 'Базовый магический экстракт',
        en: 'Basic Arcane Extract',
    },
    T1_ALCHEMY_EXTRACT_LEVEL2: {
        ru: 'Очищенный магический экстракт',
        en: 'Refined Arcane Extract',
    },
    T1_ALCHEMY_EXTRACT_LEVEL3: {
        ru: 'Чистый магический экстракт',
        en: 'Pure Arcane Extract',
    },
    T1_ALCHEMY_EXTRACT_LEVEL: {
        ru: 'Магические экстракты',
        en: 'Arcane Extracts',
    },
    T3_EGG: {
        ru: 'Куриные яйца',
        en: 'Hen Eggs',
    },
    T3_ALCHEMY_RARE_WEREWOLF: {
        ru: 'Прочные клыки вервольфа',
        en: 'Rugged Werewolf Fangs',
    },
    T3_ALCHEMY_RARE_IMP: {
        ru: 'Прочный рог чертенка',
        en: 'Rugged Imp\'s Horn',
    },
    T3_ALCHEMY_RARE_ELEMENTAL: {
        ru: 'Прочная зубчатая руна',
        en: 'Rugged Runestone Tooth',
    },
    T3_ALCHEMY_RARE_EAGLE: {
        ru: 'Прочное перо рассвета',
        en: 'Rugged Dawnfeather',
    },
    T5_ALCHEMY_RARE_PANTHER: {
        ru: 'Отличные теневые когти',
        en: 'Fine Shadow Claws',
    },
    T2_AGARIC: {
        ru: 'Темногриб',
        en: 'Arcane Agaric',
    },
    T5_ALCHEMY_RARE_ENT: {
        ru: 'Отличные корни хьерна',
        en: 'Fine Sylvian Root',
    },
    T5_ALCHEMY_RARE_DIREBEAR: {
        ru: 'Отличные лапы духа медведя',
        en: 'Fine Spirit Paws',
    },
    T6_ALCOHOL: {
        ru: 'Картофельный самогон',
        en: 'Potato Schnapps',
    },
    T5_ALCHEMY_RARE_WEREWOLF: {
        ru: 'Отличные клыки вервольфа',
        en: 'Fine Werewolf Fangs',
    },
    T5_ALCHEMY_RARE_IMP: {
        ru: 'Отличный рог чертенка',
        en: 'Fine Imp\'s Horn',
    },
    T5_ALCHEMY_RARE_ELEMENTAL: {
        ru: 'Отличная зубчатая руна',
        en: 'Fine Runestone Tooth',
    },
    T5_ALCHEMY_RARE_EAGLE: {
        ru: 'Отличное перо рассвета',
        en: 'Fine Dawnfeather',
    },
    T7_ALCOHOL: {
        ru: 'Кукурузный самогон',
        en: 'Corn Hooch',
    },
    T7_ALCHEMY_RARE_PANTHER: {
        ru: 'Превосходные теневые когти',
        en: 'Excellent Shadow Claws',
    },
    T7_ALCHEMY_RARE_ENT: {
        ru: 'Превосходные корни хьерна',
        en: 'Excellent Sylvian Root',
    },
    T7_ALCHEMY_RARE_DIREBEAR: {
        ru: 'Превосходные лапы духа медведя',
        en: 'Excellent Spirit Paws',
    },
    T8_ALCOHOL: {
        ru: 'Тыквенный самогон',
        en: 'Pumpkin Moonshine',
    },
    T7_ALCHEMY_RARE_WEREWOLF: {
        ru: 'Превосходные клыки вервольфа',
        en: 'Excellent Werewolf Fangs',
    },
    T7_ALCHEMY_RARE_IMP: {
        ru: 'Превосходный рог чертенка',
        en: 'Excellent Imp\'s Horn',
    },
    T7_ALCHEMY_RARE_ELEMENTAL: {
        ru: 'Превосходная зубчатая руна',
        en: 'Excellent Runestone Tooth',
    },
    T7_ALCHEMY_RARE_EAGLE: {
        ru: 'Превосходное перо рассвета',
        en: 'Excellent Dawnfeather',
    },
}