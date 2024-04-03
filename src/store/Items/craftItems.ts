import {TCraftObjectTypes, TItems, TItemNode} from "../../types/craftItemsType";
import {backpackCell} from "../../components/Calculator/GameModeCalculator/Backpack/BackpackImgReexports/BackpackImgReexports";

export const craftItems: TItems = {
    "MAIN": [
        {
            itemId: 'FROSTSTAFF',
            itemName: {
                ru: 'Морозный посох',
                en: 'Frost Staff',
            },
            itemNode: 'frostStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            itemExample: true,
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 43.2,
        },
        {
            itemId: 'FROSTSTAFF_KEEPER',
            itemName: {
                ru: 'Посох инея',
                en: 'Hoarfrost Staff',
            },
            itemNode: 'frostStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_MAIN_FROSTSTAFF_KEEPER',
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 54,
        },
        {
            itemId: 'FROSTSTAFF_AVALON',
            itemName: {
                ru: 'Леденящий вой',
                en: 'Chillhowl',
            },
            itemNode: 'frostStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_MAIN_FROSTSTAFF_AVALON',
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 205.2,
        },
        {
            itemId: 'ARCANESTAFF',
            itemName: {
                ru: 'Мистический посох',
                en: 'Arcane Staff',
            },
            itemNode: 'arcaneStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            itemExample: true,
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 43.2,
        },
        {
            itemId: 'ARCANESTAFF_UNDEAD',
            itemName: {
                ru: 'Ведьмовской посох',
                en: 'Witchwork Staff',
            },
            itemNode: 'arcaneStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_MAIN_ARCANESTAFF_UNDEAD',
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 54,
        },
        {
            itemId: 'CURSEDSTAFF',
            itemName: {
                ru: 'Проклятый посох',
                en: 'Cursed Staff',
            },
            itemNode: 'cursedStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            itemExample: true,
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 43.2,
        },
        {
            itemId: 'CURSEDSTAFF_UNDEAD',
            itemName: {
                ru: 'Гибельный посох',
                en: 'Lifecurse Staff',
            },
            itemNode: 'cursedStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_MAIN_CURSEDSTAFF_UNDEAD',
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 54,
        },
        {
            itemId: 'CURSEDSTAFF_AVALON',
            itemName: {
                ru: 'Призыватель теней',
                en: 'Shadowcaller',
            },
            itemNode: 'cursedStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_MAIN_CURSEDSTAFF_AVALON',
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 205.2,
        },
        {
            itemId: 'FIRESTAFF',
            itemName: {
                ru: 'Огненный посох',
                en: 'Fire Staff',
            },
            itemNode: 'fireStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            itemExample: true,
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 43.2,
        },
        {
            itemId: 'FIRESTAFF_KEEPER',
            itemName: {
                ru: 'Посох лесного пожара',
                en: 'Wildfire Staff',
            },
            itemNode: 'fireStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_MAIN_FIRESTAFF_KEEPER',
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 54,
        },
        {
            itemId: 'HOLYSTAFF',
            itemName: {
                ru: 'Священный посох',
                en: 'Holy Staff',
            },
            itemNode: 'holyStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            itemExample: true,
            PLANKS: 16,
            CLOTH: 8,
            foodConsumption: 43.2,
        },
        {
            itemId: 'HOLYSTAFF_MORGANA',
            itemName: {
                ru: 'Посох жизни',
                en: 'Lifetouch Staff',
            },
            itemNode: 'holyStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_MAIN_HOLYSTAFF_MORGANA',
            PLANKS: 16,
            CLOTH: 8,
            foodConsumption: 54,
        },
        {
            itemId: 'HOLYSTAFF_AVALON',
            itemName: {
                ru: 'Благодатный посох',
                en: 'Hallowfall',
            },
            itemNode: 'holyStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_MAIN_HOLYSTAFF_AVALON',
            PLANKS: 16,
            CLOTH: 8,
            foodConsumption: 205.2,
        },
        {
            itemId: 'NATURESTAFF',
            itemName: {
                ru: 'Древесный посох',
                en: 'Nature Staff',
            },
            itemNode: 'natureStaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            itemExample: true,
            PLANKS: 16,
            CLOTH: 8,
            foodConsumption: 43.2,
        },
        {
            itemId: 'NATURESTAFF_KEEPER',
            itemName: {
                ru: 'Друидский посох',
                en: 'Druidic Staff',
            },
            itemNode: 'natureStaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_MAIN_NATURESTAFF_KEEPER',
            PLANKS: 16,
            CLOTH: 8,
            foodConsumption: 54,
        },
        {
            itemId: 'NATURESTAFF_AVALON',
            itemName: {
                ru: 'Посох железного корня',
                en: 'Ironroot Staff',
            },
            itemNode: 'natureStaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_MAIN_NATURESTAFF_AVALON',
            PLANKS: 16,
            CLOTH: 8,
            foodConsumption: 205.2,
        },
        {
            itemId: 'AXE',
            itemName: {
                ru: 'Боевой топор',
                en: 'Battleaxe',
            },
            itemNode: 'axe',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            itemExample: true,
            PLANKS: 8,
            METALBAR: 16,
            foodConsumption: 43.2,
        },
        {
            itemId: 'DAGGER',
            itemName: {
                ru: 'Кинжал',
                en: 'Dagger',
            },
            itemNode: 'dagger',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            itemExample: true,
            METALBAR: 12,
            LEATHER: 12,
            foodConsumption: 43.2,
        },
        {
            itemId: 'RAPIER_MORGANA',
            itemName: {
                ru: 'Кровопускатель',
                en: 'Bloodletter',
            },
            itemNode: 'dagger',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_MAIN_RAPIER_MORGANA',
            METALBAR: 16,
            LEATHER: 8,
            foodConsumption: 54,
        },
        {
            itemId: 'DAGGER_HELL',
            itemName: {
                ru: 'Клык демона',
                en: 'Demonfang',
            },
            itemNode: 'dagger',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_MAIN_DAGGER_HELL',
            METALBAR: 12,
            LEATHER: 12,
            foodConsumption: 75.6,
        },
        {
            itemId: 'HAMMER',
            itemName: {
                ru: 'Молот',
                en: 'Hammer',
            },
            itemNode: 'hammer',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            METALBAR: 24,
            foodConsumption: 43.2,
        },
        {
            itemId: 'MACE',
            itemName: {
                ru: 'Булава',
                en: 'Mace',
            },
            itemNode: 'mace',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            itemExample: true,
            METALBAR: 16,
            CLOTH: 8,
            foodConsumption: 43.2,
        },
        {
            itemId: 'ROCKMACE_KEEPER',
            itemName: {
                ru: 'Каменная булава',
                en: 'Bedrock Mace',
            },
            itemNode: 'mace',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_MAIN_ROCKMACE_KEEPER',
            METALBAR: 16,
            CLOTH: 8,
            foodConsumption: 54,
        },
        {
            itemId: 'MACE_HELL',
            itemName: {
                ru: 'Булава инкуба',
                en: 'Incubus Mace',
            },
            itemNode: 'mace',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_MAIN_MACE_HELL',
            METALBAR: 16,
            CLOTH: 8,
            foodConsumption: 75.6,
        },
        {
            itemId: 'SPEAR',
            itemName: {
                ru: 'Копье',
                en: 'Spear',
            },
            itemNode: 'spear',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            itemExample: true,
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 43.2,
        },
        {
            itemId: 'SPEAR_KEEPER',
            itemName: {
                ru: 'Копье цапли',
                en: 'Heron Spear',
            },
            itemNode: 'spear',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_MAIN_SPEAR_KEEPER',
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 54,
        },
        {
            itemId: 'SPEAR_LANCE_AVALON',
            itemName: {
                ru: 'Копье рассвета',
                en: 'Daybreaker',
            },
            itemNode: 'spear',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_MAIN_SPEAR_LANCE_AVALON',
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 205.2,
        },
        {
            itemId: 'SWORD',
            itemName: {
                ru: 'Палаш',
                en: 'Broadsword',
            },
            itemNode: 'sword',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            itemExample: true,
            METALBAR: 16,
            LEATHER: 8,
            foodConsumption: 43.2,
        },
        {
            itemId: 'SCIMITAR_MORGANA',
            itemName: {
                ru: 'Королевский меч',
                en: 'Clarent Blade',
            },
            itemNode: 'sword',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_MAIN_SCIMITAR_MORGANA',
            METALBAR: 16,
            LEATHER: 8,
            foodConsumption: 54,
        },
        {
            itemId: '1HCROSSBOW',
            itemName: {
                ru: 'Легкий арбалет',
                en: 'Light Crossbow',
            },
            itemNode: 'crossbow',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            PLANKS: 16,
            METALBAR: 8,
            foodConsumption: 43.2,
        },
    ],
    "2H": [
        {
            itemId: 'FROSTSTAFF',
            itemName: {
                ru: 'Большой морозный посох',
                en: 'Great Frost Staff',
            },
            itemNode: 'frostStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'GLACIALSTAFF',
            itemName: {
                ru: 'Ледяной посох',
                en: 'Glacial Staff',
            },
            itemNode: 'frostStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'ICEGAUNTLETS_HELL',
            itemName: {
                ru: 'Заледенелый посох',
                en: 'Icicle Staff',
            },
            itemNode: 'frostStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_2H_ICEGAUNTLETS_HELL',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 108,
        },
        {
            itemId: 'ICECRYSTAL_UNDEAD',
            itemName: {
                ru: 'Призма вечного холода',
                en: 'Permafrost Prism',
            },
            itemNode: 'frostStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_2H_ICECRYSTAL_UNDEAD',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 158.4,
        },
        {
            itemId: 'ARCANESTAFF',
            itemName: {
                ru: 'Большой мистический посох',
                en: 'Great Arcane Staff',
            },
            itemNode: 'arcaneStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'ENIGMATICSTAFF',
            itemName: {
                ru: 'Загадочный посох',
                en: 'Enigmatic Staff',
            },
            itemNode: 'arcaneStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'ARCANESTAFF_HELL',
            itemName: {
                ru: 'Оккультный посох',
                en: 'Occult Staff',
            },
            itemNode: 'arcaneStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_2H_ARCANESTAFF_HELL',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 108,
        },
        {
            itemId: 'ENIGMATICORB_MORGANA',
            itemName: {
                ru: 'Средоточие злобы',
                en: 'Malevolent Locus',
            },
            itemNode: 'arcaneStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_2H_ENIGMATICORB_MORGANA',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 158.4,
        },
        {
            itemId: 'ARCANE_RINGPAIR_AVALON',
            itemName: {
                ru: 'Песнь заката',
                en: 'Evensong',
            },
            itemNode: 'arcaneStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_2H_ARCANE_RINGPAIR_AVALON',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 273.6,
        },
        {
            itemId: 'CURSEDSTAFF',
            itemName: {
                ru: 'Большой проклятый посох',
                en: 'Great Cursed Staff',
            },
            itemNode: 'cursedStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'DEMONICSTAFF',
            itemName: {
                ru: 'Демонический посох',
                en: 'Demonic Staff',
            },
            itemNode: 'cursedStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'SKULLORB_HELL',
            itemName: {
                ru: 'Проклятый череп',
                en: 'Cursed Skull',
            },
            itemNode: 'cursedStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_2H_SKULLORB_HELL',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 108,
        },
        {
            itemId: 'CURSEDSTAFF_MORGANA',
            itemName: {
                ru: 'Посох обреченности',
                en: 'Damnation Staff',
            },
            itemNode: 'cursedStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_2H_CURSEDSTAFF_MORGANA',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 158.4,
        },
        {
            itemId: 'FIRESTAFF',
            itemName: {
                ru: 'Большой огненный посох',
                en: 'Great Fire Staff',
            },
            itemNode: 'fireStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'INFERNOSTAFF',
            itemName: {
                ru: 'Адский посох',
                en: 'Infernal Staff',
            },
            itemNode: 'fireStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'FIRESTAFF_HELL',
            itemName: {
                ru: 'Посох серы',
                en: 'Brimstone Staff',
            },
            itemNode: 'fireStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_2H_FIRESTAFF_HELL',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 108,
        },
        {
            itemId: 'INFERNOSTAFF_MORGANA',
            itemName: {
                ru: 'Пылающий посох',
                en: 'Blazing Staff',
            },
            itemNode: 'fireStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_2H_INFERNOSTAFF_MORGANA',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 158.4,
        },
        {
            itemId: 'FIRE_RINGPAIR_AVALON',
            itemName: {
                ru: 'Песнь рассвета',
                en: 'Dawnsong',
            },
            itemNode: 'fireStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_2H_FIRE_RINGPAIR_AVALON',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 273.6,
        },
        {
            itemId: 'HOLYSTAFF',
            itemName: {
                ru: 'Большой священный посох',
                en: 'Great Holy Staff',
            },
            itemNode: 'holyStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            PLANKS: 20,
            CLOTH: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'DIVINESTAFF',
            itemName: {
                ru: 'Божественный посох',
                en: 'Divine Staff',
            },
            itemNode: 'holyStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            PLANKS: 20,
            CLOTH: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'HOLYSTAFF_HELL',
            itemName: {
                ru: 'Посох падших',
                en: 'Fallen Staff',
            },
            itemNode: 'holyStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_2H_HOLYSTAFF_HELL',
            PLANKS: 20,
            CLOTH: 12,
            foodConsumption: 108,
        },
        {
            itemId: 'HOLYSTAFF_UNDEAD',
            itemName: {
                ru: 'Посох искупления',
                en: 'Redemption Staff',
            },
            itemNode: 'holyStaff',
            itemType: 'mageWeapon',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_2H_HOLYSTAFF_UNDEAD',
            PLANKS: 20,
            CLOTH: 12,
            foodConsumption: 158.4,
        },
        {
            itemId: 'NATURESTAFF',
            itemName: {
                ru: 'Большой древесный посох',
                en: 'Great Nature Staff',
            },
            itemNode: 'natureStaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            PLANKS: 20,
            CLOTH: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'WILDSTAFF',
            itemName: {
                ru: 'Дикий посох',
                en: 'Wild Staff',
            },
            itemNode: 'natureStaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            PLANKS: 20,
            CLOTH: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'NATURESTAFF_HELL',
            itemName: {
                ru: 'Посох порчи',
                en: 'Blight Staff',
            },
            itemNode: 'natureStaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_NATURESTAFF_HELL',
            PLANKS: 20,
            CLOTH: 12,
            foodConsumption: 108,
        },
        {
            itemId: 'NATURESTAFF_KEEPER',
            itemName: {
                ru: 'Неудержимый посох',
                en: 'Rampant Staff',
            },
            itemNode: 'natureStaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_NATURESTAFF_KEEPER',
            PLANKS: 20,
            CLOTH: 12,
            foodConsumption: 158.4,
        },
        {
            itemId: 'AXE',
            itemName: {
                ru: 'Большой топор',
                en: 'Greataxe',
            },
            itemNode: 'axe',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            PLANKS: 12,
            METALBAR: 20,
            foodConsumption: 57.6,
        },
        {
            itemId: 'HALBERD',
            itemName: {
                ru: 'Алебарда',
                en: 'Halberd',
            },
            itemNode: 'axe',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'HALBERD_MORGANA',
            itemName: {
                ru: 'Падальщик',
                en: 'Carrioncaller',
            },
            itemNode: 'axe',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_HALBERD_MORGANA',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 72,
        },
        {
            itemId: 'SCYTHE_HELL',
            itemName: {
                ru: 'Адская коса',
                en: 'Infernal Scythe',
            },
            itemNode: 'axe',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_SCYTHE_HELL',
            PLANKS: 12,
            METALBAR: 20,
            foodConsumption: 108,
        },
        {
            itemId: 'DUALAXE_KEEPER',
            itemName: {
                ru: 'Медвежьи лапы',
                en: 'Bear Paws',
            },
            itemNode: 'axe',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_DUALAXE_KEEPER',
            PLANKS: 12,
            METALBAR: 20,
            foodConsumption: 158.4,
        },
        {
            itemId: 'AXE_AVALON',
            itemName: {
                ru: 'Разрушитель миров',
                en: 'Realmbreaker',
            },
            itemNode: 'axe',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_AXE_AVALON',
            PLANKS: 12,
            METALBAR: 20,
            foodConsumption: 273.6,
        },
        {
            itemId: 'DAGGERPAIR',
            itemName: {
                ru: 'Парные кинжалы',
                en: 'Dagger Pair',
            },
            itemNode: 'dagger',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            METALBAR: 16,
            LEATHER: 16,
            foodConsumption: 57.6,
        },
        {
            itemId: 'CLAWPAIR',
            itemName: {
                ru: 'Когти',
                en: 'Claws',
            },
            itemNode: 'dagger',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 57.6,
        },
        {
            itemId: 'DUALSICKLE_UNDEAD',
            itemName: {
                ru: 'Вестники смерти',
                en: 'Deathgivers',
            },
            itemNode: 'dagger',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_DUALSICKLE_UNDEAD',
            METALBAR: 16,
            LEATHER: 16,
            foodConsumption: 158.4,
        },
        {
            itemId: 'DAGGER_KATAR_AVALON',
            itemName: {
                ru: 'Укротитель ярости',
                en: 'Bridled Fury',
            },
            itemNode: 'dagger',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_DAGGER_KATAR_AVALON',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 273.6,
        },
        {
            itemId: 'POLEHAMMER',
            itemName: {
                ru: 'Чекан',
                en: 'Polehammer',
            },
            itemNode: 'hammer',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            METALBAR: 20,
            CLOTH: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'HAMMER',
            itemName: {
                ru: 'Большой молот',
                en: 'Great Hammer',
            },
            itemNode: 'hammer',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            METALBAR: 20,
            CLOTH: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'HAMMER_UNDEAD',
            itemName: {
                ru: 'Могильный молот',
                en: 'Tombhammer',
            },
            itemNode: 'hammer',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_HAMMER_UNDEAD',
            METALBAR: 20,
            CLOTH: 12,
            foodConsumption: 72,
        },
        {
            itemId: 'DUALHAMMER_HELL',
            itemName: {
                ru: 'Молоты кузни',
                en: 'Forge Hammers',
            },
            itemNode: 'hammer',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_DUALHAMMER_HELL',
            METALBAR: 20,
            CLOTH: 12,
            foodConsumption: 108,
        },
        {
            itemId: 'HAMMER_AVALON',
            itemName: {
                ru: 'Длань правосудия',
                en: 'Hand of Justice',
            },
            itemNode: 'hammer',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_HAMMER_AVALON',
            METALBAR: 20,
            CLOTH: 12,
            foodConsumption: 273.6,
        },
        {
            itemId: 'RAM_KEEPER',
            itemName: {
                ru: 'Хранитель рощи',
                en: 'Grovekeeper',
            },
            itemNode: 'hammer',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_RAM_KEEPER',
            METALBAR: 20,
            CLOTH: 12,
            foodConsumption: 158.4,
        },
        {
            itemId: 'KNUCKLES_SET1',
            itemName: {
                ru: 'Перчатки крушителя',
                en: 'Brawler Gloves',
            },
            itemNode: 'warGloves',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            itemExample: true,
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 57.6,
        },
        {
            itemId: 'KNUCKLES_SET2',
            itemName: {
                ru: 'Боевые наручи',
                en: 'Battle Bracers',
            },
            itemNode: 'warGloves',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 57.6,
        },
        {
            itemId: 'KNUCKLES_SET3',
            itemName: {
                ru: 'Шипастые рукавицы',
                en: 'Spiked Gauntlets',
            },
            itemNode: 'warGloves',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 57.6,
        },
        {
            itemId: 'KNUCKLES_KEEPER',
            itemName: {
                ru: 'Медвежьи перчатки',
                en: 'Ursine Maulers',
            },
            itemNode: 'warGloves',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_KNUCKLES_KEEPER',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 72,
        },
        {
            itemId: 'KNUCKLES_HELL',
            itemName: {
                ru: 'Адские длани',
                en: 'Hellfire Hands',
            },
            itemNode: 'warGloves',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_KNUCKLES_HELL',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 108,
        },
        {
            itemId: 'KNUCKLES_MORGANA',
            itemName: {
                ru: 'Вороний цестус',
                en: 'Ravenstrike Cestus',
            },
            itemNode: 'warGloves',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 158.4,
        },
        {
            itemId: 'KNUCKLES_AVALON',
            itemName: {
                ru: 'Кулаки Авалона',
                en: 'Fists of Avalon',
            },
            itemNode: 'warGloves',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_KNUCKLES_AVALON',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 273.6,
        },
        {
            itemId: 'MACE',
            itemName: {
                ru: 'Тяжелая булава',
                en: 'Heavy Mace',
            },
            itemNode: 'mace',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 57.6,
        },
        {
            itemId: 'FLAIL',
            itemName: {
                ru: 'Моргенштерн',
                en: 'Morning Star',
            },
            itemNode: 'mace',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            METALBAR: 20,
            CLOTH: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'MACE_MORGANA',
            itemName: {
                ru: 'Булава Камланна',
                en: 'Camlann Mace',
            },
            itemNode: 'mace',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            METALBAR: 20,
            CLOTH: 12,
            foodConsumption: 158.4,
        },
        {
            itemId: 'DUALMACE_AVALON',
            itemName: {
                ru: 'Хранители клятвы',
                en: 'Oathkeepers',
            },
            itemNode: 'mace',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_DUALMACE_AVALON',
            METALBAR: 20,
            CLOTH: 12,
            foodConsumption: 273.6,
        },
        {
            itemId: 'QUARTERSTAFF',
            itemName: {
                ru: 'Боевой шест',
                en: 'Quarterstaff',
            },
            itemNode: 'quarterstaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            itemExample: true,
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 57.6,
        },
        {
            itemId: 'IRONCLADEDSTAFF',
            itemName: {
                ru: 'Железный посох',
                en: 'Iron-clad Staff',
            },
            itemNode: 'quarterstaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 57.6,
        },
        {
            itemId: 'DOUBLEBLADEDSTAFF',
            itemName: {
                ru: 'Острый шест',
                en: 'Double Bladed Staff',
            },
            itemNode: 'quarterstaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 57.6,
        },
        {
            itemId: 'COMBATSTAFF_MORGANA',
            itemName: {
                ru: 'Посох черного монаха',
                en: 'Black Monk Stave',
            },
            itemNode: 'quarterstaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_COMBATSTAFF_MORGANA',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 72,
        },
        {
            itemId: 'TWINSCYTHE_HELL',
            itemName: {
                ru: 'Коса душ',
                en: 'Soulscythe',
            },
            itemNode: 'quarterstaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_TWINSCYTHE_HELL',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 108,
        },
        {
            itemId: 'ROCKSTAFF_KEEPER',
            itemName: {
                ru: 'Посох равновесия',
                en: 'Staff of Balance',
            },
            itemNode: 'quarterstaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_ROCKSTAFF_KEEPER',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 158.4,
        },
        {
            itemId: 'QUARTERSTAFF_AVALON',
            itemName: {
                ru: 'Искатель Грааля',
                en: 'Grailseeker',
            },
            itemNode: 'quarterstaff',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_QUARTERSTAFF_AVALON',
            METALBAR: 12,
            LEATHER: 20,
            foodConsumption: 273.6,
        },
        {
            itemId: 'SPEAR',
            itemName: {
                ru: 'Пика',
                en: 'Pike',
            },
            itemNode: 'spear',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'GLAIVE',
            itemName: {
                ru: 'Глефа',
                en: 'Glaive',
            },
            itemNode: 'spear',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            PLANKS: 12,
            METALBAR: 20,
            foodConsumption: 57.6,
        },
        {
            itemId: 'HARPOON_HELL',
            itemName: {
                ru: 'Охотник за душами',
                en: 'Spirithunter',
            },
            itemNode: 'spear',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_HARPOON_HELL',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 108,
        },
        {
            itemId: 'TRIDENT_UNDEAD',
            itemName: {
                ru: 'Трезубец',
                en: 'Trinity Spear',
            },
            itemNode: 'spear',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_TRIDENT_UNDEAD',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 158.4,
        },
        {
            itemId: 'CLAYMORE',
            itemName: {
                ru: 'Клеймор',
                en: 'Claymore',
            },
            itemNode: 'sword',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            METALBAR: 20,
            LEATHER: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'DUALSWORD',
            itemName: {
                ru: 'Парные мечи',
                en: 'Dual Swords',
            },
            itemNode: 'sword',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            METALBAR: 20,
            LEATHER: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'CLEAVER_HELL',
            itemName: {
                ru: 'Меч резни',
                en: 'Carving Sword',
            },
            itemNode: 'sword',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_CLEAVER_HELL',
            METALBAR: 20,
            LEATHER: 12,
            foodConsumption: 108,
        },
        {
            itemId: 'DUALSCIMITAR_UNDEAD',
            itemName: {
                ru: 'Парные галатины',
                en: 'Galatine Pair',
            },
            itemNode: 'sword',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_DUALSCIMITAR_UNDEAD',
            METALBAR: 20,
            LEATHER: 12,
            foodConsumption: 158.4,
        },
        {
            itemId: 'CLAYMORE_AVALON',
            itemName: {
                ru: 'Царетворец',
                en: 'Kingmaker',
            },
            itemNode: 'sword',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_CLAYMORE_AVALON',
            METALBAR: 20,
            LEATHER: 12,
            foodConsumption: 273.6,
        },
        {
            itemId: 'BOW',
            itemName: {
                ru: 'Лук',
                en: 'Bow',
            },
            itemNode: 'bow',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            itemExample: true,
            PLANKS: 32,
            foodConsumption: 57.6,
        },
        {
            itemId: 'WARBOW',
            itemName: {
                ru: 'Боевой лук',
                en: 'Warbow',
            },
            itemNode: 'bow',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            PLANKS: 32,
            foodConsumption: 57.6,
        },
        {
            itemId: 'LONGBOW',
            itemName: {
                ru: 'Длинный лук',
                en: 'Longbow',
            },
            itemNode: 'bow',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            PLANKS: 32,
            foodConsumption: 57.6,
        },
        {
            itemId: 'LONGBOW_UNDEAD',
            itemName: {
                ru: 'Шепчущий лук',
                en: 'Whispering Bow',
            },
            itemNode: 'bow',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_LONGBOW_UNDEAD',
            PLANKS: 32,
            foodConsumption: 72,
        },
        {
            itemId: 'BOW_HELL',
            itemName: {
                ru: 'Воющий лук',
                en: 'Wailing Bow',
            },
            itemNode: 'bow',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_BOW_HELL',
            PLANKS: 32,
            foodConsumption: 108,
        },
        {
            itemId: 'BOW_KEEPER',
            itemName: {
                ru: 'Лук Бадона',
                en: 'Bow of Badon',
            },
            itemNode: 'bow',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_BOW_KEEPER',
            PLANKS: 32,
            foodConsumption: 158.4,
        },
        {
            itemId: 'BOW_AVALON',
            itemName: {
                ru: 'Туманный пронзатель',
                en: 'Mistpiercer',
            },
            itemNode: 'bow',
            itemType: 'hunterWeapon',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_2H_BOW_AVALON',
            PLANKS: 32,
            foodConsumption: 273.6,
        },
        {
            itemId: 'CROSSBOW',
            itemName: {
                ru: 'Арбалет',
                en: 'Crossbow',
            },
            itemNode: 'crossbow',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            itemExample: true,
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'CROSSBOWLARGE',
            itemName: {
                ru: 'Тяжелый арбалет',
                en: 'Heavy Crossbow',
            },
            itemNode: 'crossbow',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 57.6,
        },
        {
            itemId: 'REPEATINGCROSSBOW_UNDEAD',
            itemName: {
                ru: 'Плачущий арбалет',
                en: 'Weeping Repeater',
            },
            itemNode: 'crossbow',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_REPEATINGCROSSBOW_UNDEAD',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 72,
        },
        {
            itemId: 'DUALCROSSBOW_HELL',
            itemName: {
                ru: 'Самострелы',
                en: 'Boltcasters',
            },
            itemNode: 'crossbow',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_DUALCROSSBOW_HELL',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 108,
        },
        {
            itemId: 'CROSSBOWLARGE_MORGANA',
            itemName: {
                ru: 'Осадный арбалет',
                en: 'Siegebow',
            },
            itemNode: 'crossbow',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_CROSSBOWLARGE_MORGANA',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 158.4,
        },
        {
            itemId: 'CROSSBOW_CANNON_AVALON',
            itemName: {
                ru: 'Творец энергии',
                en: 'Energy Shaper',
            },
            itemNode: 'crossbow',
            itemType: 'warriorWeapon',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_2H_CROSSBOW_CANNON_AVALON',
            PLANKS: 20,
            METALBAR: 12,
            foodConsumption: 273.6,

        },
        {
            itemId: 'TOOL_FISHINGROD',
            itemName: {
                ru: 'Удочка',
                en: 'Fishing Rod',
            },
            itemNode: 'fishingRod',
            itemClass: 'toolmaker',
            PLANKS: 6,
            CLOTH: 2,
            foodConsumption: 14.4,
        },
        {
            itemId: 'TOOL_SIEGEHAMMER',
            itemName: {
                ru: 'Осадный молот',
                en: 'Demolition Hammer',
            },
            itemNode: 'demolitionHammer',
            itemClass: 'toolmaker',
            PLANKS: 8,
            STONEBLOCK: 8,
            foodConsumption: 28.8,
        },
        {
            itemId: 'TOOL_PICK',
            itemName: {
                ru: 'Кирка',
                en: 'Pickaxe',
            },
            itemNode: 'pickaxe',
            itemClass: 'toolmaker',
            PLANKS: 6,
            METALBAR: 2,
            foodConsumption: 14.4,
        },
        {
            itemId: 'TOOL_SICKLE',
            itemName: {
                ru: 'Серп',
                en: 'Sickle',
            },
            itemNode: 'sickle',
            itemClass: 'toolmaker',
            PLANKS: 6,
            METALBAR: 2,
            foodConsumption: 14.4,
        },
        {
            itemId: 'TOOL_KNIFE',
            itemName: {
                ru: 'Свежевальный нож',
                en: 'Skinning Knife',
            },
            itemNode: 'skinningKnife',
            itemClass: 'toolmaker',
            PLANKS: 6,
            METALBAR: 2,
            foodConsumption: 14.4,
        },
        {
            itemId: 'TOOL_HAMMER',
            itemName: {
                ru: 'Кувалда',
                en: 'Stone Hammer',
            },
            itemNode: 'stoneHammer',
            itemClass: 'toolmaker',
            PLANKS: 6,
            METALBAR: 2,
            foodConsumption: 14.4,
        },
        {
            itemId: 'TOOL_AXE',
            itemName: {
                ru: 'Топор',
                en: 'Axe',
            },
            itemNode: 'toolAxe',
            itemClass: 'toolmaker',
            PLANKS: 6,
            METALBAR: 2,
            foodConsumption: 14.4,
        },
    ],
    "BAG": [
        {
            itemId: 'BAG',
            itemName: {
                ru: 'Сумка',
                en: 'Bag',
            },
            itemNode: 'bag',
            itemType: 'tools',
            itemClass: 'toolmaker',
            itemExample: true,
            LEATHER: 8,
            CLOTH: 8,
            foodConsumption: 28.8,
        },
        {
            itemId: 'INSIGHT',
            itemName: {
                ru: 'Кошель интуиции',
                en: 'Satchel of Insight',
            },
            itemNode: 'bag',
            itemType: 'tools',
            itemClass: 'toolmaker',
            artefactItemId: 'T4_SKILLBOOK_STANDARD',
            LEATHER: 8,
            CLOTH: 8,
            foodConsumption: 28.8,
        },
    ],
    "CAPE": [
        {
            itemId: 'CAPE',
            itemName: {
                ru: 'Плащ',
                en: 'Cape',
            },
            itemNode: 'cape',
            itemType: 'tools',
            itemClass: 'toolmaker',
            itemExample: true,
            LEATHER: 4,
            CLOTH: 4,
            foodConsumption: 14.4,
        },
    ],
    "ARMOR": [
        {
            itemId: 'CLOTH_SET1',
            itemName: {
                ru: 'Мантия ученого',
                en: 'Scholar Robe',
            },
            itemNode: 'clothArmor',
            itemType: 'armor',
            itemClass: 'mage',
            itemExample: true,
            CLOTH: 16,
            foodConsumption: 28.8,
        },
        {
            itemId: 'CLOTH_SET2',
            itemName: {
                ru: 'Мантия клирика',
                en: 'Cleric Robe',
            },
            itemNode: 'clothArmor',
            itemType: 'armor',
            itemClass: 'mage',
            CLOTH: 16,
            foodConsumption: 28.8,
        },
        {
            itemId: 'CLOTH_SET3',
            itemName: {
                ru: 'Мантия чародея',
                en: 'Mage Robe',
            },
            itemNode: 'clothArmor',
            itemType: 'armor',
            itemClass: 'mage',
            CLOTH: 16,
            foodConsumption: 28.8,
        },
        {
            itemId: 'CLOTH_KEEPER',
            itemName: {
                ru: 'Мантия друида',
                en: 'Druid Robe',
            },
            itemNode: 'clothArmor',
            itemType: 'armor',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_ARMOR_CLOTH_KEEPER',
            CLOTH: 16,
            foodConsumption: 36,
        },
        {
            itemId: 'CLOTH_MORGANA',
            itemName: {
                ru: 'Мантия культиста',
                en: 'Cultist Robe',
            },
            itemNode: 'clothArmor',
            itemType: 'armor',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_ARMOR_CLOTH_MORGANA',
            CLOTH: 16,
            foodConsumption: 79.2,
        },
        {
            itemId: 'CLOTH_HELL',
            itemName: {
                ru: 'Дьявольская мантия',
                en: 'Fiend Robe',
            },
            itemNode: 'clothArmor',
            itemType: 'armor',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_ARMOR_CLOTH_HELL',
            CLOTH: 16,
            foodConsumption: 54,
        },
        {
            itemId: 'CLOTH_FEY',
            itemName: {
                ru: 'Мантия из сказочной',
                en: 'Feyscale Robe',
            },
            itemNode: 'clothArmor',
            itemType: 'armor',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_ARMOR_CLOTH_FEY',
            CLOTH: 16,
            foodConsumption: 79.2,
        },
        {
            itemId: 'CLOTH_AVALON',
            itemName: {
                ru: 'Мантия чистоты',
                en: 'Robe of Purity',
            },
            itemNode: 'clothArmor',
            itemType: 'armor',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_ARMOR_CLOTH_AVALON',
            CLOTH: 16,
            foodConsumption: 136.8,
        },
        {
            itemId: 'CLOTH_ROYAL',
            itemName: {
                ru: 'Королевская мантия',
                en: 'Royal Robe',
            },
            itemNode: 'clothArmor',
            itemType: 'armor',
            itemClass: 'mage',
            CLOTH: 16,
            foodConsumption: 36,
            artefactItemId: 'QUESTITEM_TOKEN_ROYAL',
        },
        {
            itemId: 'LEATHER_SET1',
            itemName: {
                ru: 'Куртка наемника',
                en: 'Mercenary Jacket',
            },
            itemNode: 'leatherArmor',
            itemType: 'armor',
            itemClass: 'hunter',
            itemExample: true,
            LEATHER: 16,
            foodConsumption: 28.8,
        },
        {
            itemId: 'LEATHER_SET2',
            itemName: {
                ru: 'Куртка охотника',
                en: 'Hunter Jacket',
            },
            itemNode: 'leatherArmor',
            itemType: 'armor',
            itemClass: 'hunter',
            LEATHER: 16,
            foodConsumption: 28.8,
        },
        {
            itemId: 'LEATHER_SET3',
            itemName: {
                ru: 'Куртка убийцы',
                en: 'Assassin Jacket',
            },
            itemNode: 'leatherArmor',
            itemType: 'armor',
            itemClass: 'hunter',
            LEATHER: 16,
            foodConsumption: 28.8,
        },
        {
            itemId: 'LEATHER_MORGANA',
            itemName: {
                ru: 'Куртка лазутчика',
                en: 'Stalker Jacket',
            },
            itemNode: 'leatherArmor',
            itemType: 'armor',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_ARMOR_LEATHER_MORGANA',
            LEATHER: 16,
            foodConsumption: 36,
        },
        {
            itemId: 'LEATHER_HELL',
            itemName: {
                ru: 'Адская куртка',
                en: 'Hellion Jacket',
            },
            itemNode: 'leatherArmor',
            itemType: 'armor',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_ARMOR_LEATHER_HELL',
            LEATHER: 16,
            foodConsumption: 50.4,
        },
        {
            itemId: 'LEATHER_UNDEAD',
            itemName: {
                ru: 'Куртка призрака',
                en: 'Specter Jacket',
            },
            itemNode: 'leatherArmor',
            itemType: 'armor',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_ARMOR_LEATHER_UNDEAD',
            LEATHER: 16,
            foodConsumption: 79.2,
        },
        {
            itemId: 'LEATHER_FEY',
            itemName: {
                ru: 'Куртка туманного охотника',
                en: 'Mistwalker Jacket',
            },
            itemNode: 'leatherArmor',
            itemType: 'armor',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_ARMOR_LEATHER_FEY',
            LEATHER: 16,
            foodConsumption: 79.2,
        },
        {
            itemId: 'LEATHER_AVALON',
            itemName: {
                ru: 'Куртка упорства',
                en: 'Jacket of Tenacity',
            },
            itemNode: 'leatherArmor',
            itemType: 'armor',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_ARMOR_LEATHER_AVALON',
            LEATHER: 16,
            foodConsumption: 136.8,
        },
        {
            itemId: 'LEATHER_ROYAL',
            itemName: {
                ru: 'Королевская куртка',
                en: 'Royal Jacket',
            },
            itemNode: 'leatherArmor',
            itemType: 'armor',
            itemClass: 'hunter',
            LEATHER: 16,
            foodConsumption: 36,
            artefactItemId: 'QUESTITEM_TOKEN_ROYAL',
        },
        {
            itemId: 'PLATE_SET1',
            itemName: {
                ru: 'Броня солдата',
                en: 'Soldier Armor',
            },
            itemNode: 'plateArmor',
            itemType: 'armor',
            itemClass: 'warrior',
            itemExample: true,
            METALBAR: 16,
            foodConsumption: 28.8,
        },
        {
            itemId: 'PLATE_SET2',
            itemName: {
                ru: 'Броня рыцаря',
                en: 'Knight Armor',
            },
            itemNode: 'plateArmor',
            itemType: 'armor',
            itemClass: 'warrior',
            METALBAR: 16,
            foodConsumption: 28.8,

        },
        {
            itemId: 'PLATE_SET3',
            itemName: {
                ru: 'Броня хранителя',
                en: 'Guardian Armor',
            },
            itemNode: 'plateArmor',
            itemType: 'armor',
            itemClass: 'warrior',
            METALBAR: 16,
            foodConsumption: 28.8,
        },
        {
            itemId: 'PLATE_UNDEAD',
            itemName: {
                ru: 'Могильная броня',
                en: 'Graveguard Armor',
            },
            itemNode: 'plateArmor',
            itemType: 'armor',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_ARMOR_PLATE_UNDEAD',
            METALBAR: 16,
            foodConsumption: 36,
        },
        {
            itemId: 'PLATE_HELL',
            itemName: {
                ru: 'Демоническая броня',
                en: 'Demon Armor',
            },
            itemNode: 'plateArmor',
            itemType: 'armor',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_ARMOR_PLATE_HELL',
            METALBAR: 16,
            foodConsumption: 50.4,
        },
        {
            itemId: 'PLATE_KEEPER',
            itemName: {
                ru: 'Броня вершителя',
                en: 'Judicator Armor',
            },
            itemNode: 'plateArmor',
            itemType: 'armor',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_ARMOR_PLATE_KEEPER',
            METALBAR: 16,
            foodConsumption: 79.2,
        },
        {
            itemId: 'PLATE_FEY',
            itemName: {
                ru: 'Броня сумеречного ткача',
                en: 'Duskweaver Armor',
            },
            itemNode: 'plateArmor',
            itemType: 'armor',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_ARMOR_PLATE_FEY',
            METALBAR: 16,
            foodConsumption: 79.2,
        },
        {
            itemId: 'PLATE_AVALON',
            itemName: {
                ru: 'Броня доблести',
                en: 'Armor of Valor',
            },
            itemNode: 'plateArmor',
            itemType: 'armor',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_ARMOR_PLATE_AVALON',
            METALBAR: 16,
            foodConsumption: 136.8
        },
        {
            itemId: 'PLATE_ROYAL',
            itemName: {
                ru: 'Королевская броня',
                en: 'Royal Armor',
            },
            itemNode: 'plateArmor',
            itemType: 'armor',
            itemClass: 'warrior',
            METALBAR: 16,
            foodConsumption: 36,
            artefactItemId: 'QUESTITEM_TOKEN_ROYAL',
        },
        {
            itemId: 'GATHERER_FIBER',
            itemName: {
                ru: 'Одежда жнеца',
                en: 'Harvester Garb',
            },
            itemClass: 'toolmaker',
            itemNode: 'harvesterGarb',
            CLOTH: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'GATHERER_FISH',
            itemName: {
                ru: 'Одежда рыбака',
                en: 'Fisherman Garb',
            },
            itemClass: 'toolmaker',
            itemNode: 'fishermanGarb',
            LEATHER: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'GATHERER_HIDE',
            itemName: {
                ru: 'Одежда свежевателя',
                en: 'Skinner Garb',
            },
            itemClass: 'toolmaker',
            itemNode: 'skinnerGarb',
            LEATHER: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'GATHERER_ORE',
            itemName: {
                ru: 'Одежда шахтера',
                en: 'Miner Garb',
            },
            itemClass: 'toolmaker',
            itemNode: 'minerGarb',
            METALBAR: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'GATHERER_ROCK',
            itemName: {
                ru: 'Одежда каменолома',
                en: 'Quarrier Garb',
            },
            itemClass: 'toolmaker',
            itemNode: 'quarrierGarb',
            METALBAR: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'GATHERER_WOOD',
            itemName: {
                ru: 'Одежда дровосека',
                en: 'Lumberjack Garb',
            },
            itemClass: 'toolmaker',
            itemNode: 'lumberjackGarb',
            LEATHER: 8,
            foodConsumption: 14.4,
        },
    ],
    "HEAD": [
        {
            itemId: 'CLOTH_SET1',
            itemName: {
                ru: 'Колпак ученого',
                en: 'Scholar Cowl',
            },
            itemNode: 'clothHelmet',
            itemType: 'helmet',
            itemClass: 'mage',
            itemExample: true,
            CLOTH: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'CLOTH_SET2',
            itemName: {
                ru: 'Колпак клирика',
                en: 'Cleric Cowl',
            },
            itemNode: 'clothHelmet',
            itemType: 'helmet',
            itemClass: 'mage',
            CLOTH: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'CLOTH_SET3',
            itemName: {
                ru: 'Колпак чародея',
                en: 'Mage Cowl',
            },
            itemNode: 'clothHelmet',
            itemType: 'helmet',
            itemClass: 'mage',
            CLOTH: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'CLOTH_KEEPER',
            itemName: {
                ru: 'Колпак друида',
                en: 'Druid Cowl',
            },
            itemNode: 'clothHelmet',
            itemType: 'helmet',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_HEAD_CLOTH_KEEPER',
            CLOTH: 8,
            foodConsumption: 18,
        },
        {
            itemId: 'CLOTH_HELL',
            itemName: {
                ru: 'Дьявольский колпак',
                en: 'Fiend Cowl',
            },
            itemNode: 'clothHelmet',
            itemType: 'helmet',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_HEAD_CLOTH_HELL',
            CLOTH: 8,
            foodConsumption: 25.2,
        },
        {
            itemId: 'CLOTH_MORGANA',
            itemName: {
                ru: 'Колпак культиста',
                en: 'Cultist Cowl',
            },
            itemNode: 'clothHelmet',
            itemType: 'helmet',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_HEAD_CLOTH_MORGANA',
            CLOTH: 8,
            foodConsumption: 39.6,
        },
        {
            itemId: 'CLOTH_FEY',
            itemName: {
                ru: 'Шляпа из сказочной',
                en: 'Feyscale Hat',
            },
            itemNode: 'clothHelmet',
            itemType: 'helmet',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_HEAD_CLOTH_FEY',
            CLOTH: 8,
            foodConsumption: 39.6,
        },
        {
            itemId: 'CLOTH_AVALON',
            itemName: {
                ru: 'Колпак чистоты',
                en: 'Cowl of Purity',
            },
            itemNode: 'clothHelmet',
            itemType: 'helmet',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_HEAD_CLOTH_AVALON',
            CLOTH: 8,
            foodConsumption: 68.4,
        },
        {
            itemId: 'CLOTH_ROYAL',
            itemName: {
                ru: 'Королевский колпак',
                en: 'Royal Cowl',
            },
            itemNode: 'clothHelmet',
            itemType: 'helmet',
            itemClass: 'mage',
            CLOTH: 8,
            foodConsumption: 18,
            artefactItemId: 'QUESTITEM_TOKEN_ROYAL',
        },
        {
            itemId: 'LEATHER_SET1',
            itemName: {
                ru: 'Капюшон наемника',
                en: 'Mercenary Hood',
            },
            itemNode: 'leatherHelmet',
            itemType: 'helmet',
            itemClass: 'hunter',
            itemExample: true,
            LEATHER: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'LEATHER_SET2',
            itemName: {
                ru: 'Капюшон охотника',
                en: 'Hunter Hood',
            },
            itemNode: 'leatherHelmet',
            itemType: 'helmet',
            itemClass: 'hunter',
            LEATHER: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'LEATHER_SET3',
            itemName: {
                ru: 'Капюшон убийцы',
                en: 'Assassin Hood',
            },
            itemNode: 'leatherHelmet',
            itemType: 'helmet',
            itemClass: 'hunter',
            LEATHER: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'LEATHER_MORGANA',
            itemName: {
                ru: 'Капюшон лазутчика',
                en: 'Stalker Hood',
            },
            itemNode: 'leatherHelmet',
            itemType: 'helmet',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_HEAD_LEATHER_MORGANA',
            LEATHER: 8,
            foodConsumption: 18,
        },
        {
            itemId: 'LEATHER_HELL',
            itemName: {
                ru: 'Адский капюшон',
                en: 'Hellion Hood',
            },
            itemNode: 'leatherHelmet',
            itemType: 'helmet',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_HEAD_LEATHER_HELL',
            LEATHER: 8,
            foodConsumption: 25.2,
        },
        {
            itemId: 'LEATHER_UNDEAD',
            itemName: {
                ru: 'Капюшон призрака',
                en: 'Specter Hood',
            },
            itemNode: 'leatherHelmet',
            itemType: 'helmet',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_HEAD_LEATHER_UNDEAD',
            LEATHER: 8,
            foodConsumption: 39.6,
        },
        {
            itemId: 'LEATHER_FEY',
            itemName: {
                ru: 'Капюшон туманного охотника',
                en: 'Mistwalker Hood',
            },
            itemNode: 'leatherHelmet',
            itemType: 'helmet',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_HEAD_LEATHER_FEY',
            LEATHER: 8,
            foodConsumption: 39.6,
        },
        {
            itemId: 'LEATHER_AVALON',
            itemName: {
                ru: 'Капюшон упорства',
                en: 'Hood of Tenacity',
            },
            itemNode: 'leatherHelmet',
            itemType: 'helmet',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_HEAD_LEATHER_AVALON',
            LEATHER: 8,
            foodConsumption: 68.4,
        },
        {
            itemId: 'LEATHER_ROYAL',
            itemName: {
                ru: 'Королевский капюшон',
                en: 'Royal Hood',
            },
            itemNode: 'leatherHelmet',
            itemType: 'helmet',
            itemClass: 'hunter',
            LEATHER: 8,
            foodConsumption: 18,
            artefactItemId: 'QUESTITEM_TOKEN_ROYAL',
        },
        {
            itemId: 'PLATE_SET1',
            itemName: {
                ru: 'Шлем солдата',
                en: 'Soldier Helmet',
            },
            itemNode: 'plateHelmet',
            itemType: 'helmet',
            itemClass: 'warrior',
            itemExample: true,
            METALBAR: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'PLATE_SET2',
            itemName: {
                ru: 'Шлем рыцаря',
                en: 'Knight Helmet',
            },
            itemNode: 'plateHelmet',
            itemType: 'helmet',
            itemClass: 'warrior',
            METALBAR: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'PLATE_SET3',
            itemName: {
                ru: 'Шлем хранителя',
                en: 'Guardian Helmet',
            },
            itemNode: 'plateHelmet',
            itemType: 'helmet',
            itemClass: 'warrior',
            METALBAR: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'PLATE_UNDEAD',
            itemName: {
                ru: 'Могильный шлем',
                en: 'Graveguard Helmet',
            },
            itemNode: 'plateHelmet',
            itemType: 'helmet',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_HEAD_PLATE_UNDEAD',
            METALBAR: 8,
            foodConsumption: 18,
        },
        {
            itemId: 'PLATE_HELL',
            itemName: {
                ru: 'Демонический шлем',
                en: 'Demon Helmet',
            },
            itemNode: 'plateHelmet',
            itemType: 'helmet',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_HEAD_PLATE_HELL',
            METALBAR: 8,
            foodConsumption: 25.2,
        },
        {
            itemId: 'PLATE_KEEPER',
            itemName: {
                ru: 'Шлем вершителя',
                en: 'Judicator Helmet',
            },
            itemNode: 'plateHelmet',
            itemType: 'helmet',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_HEAD_PLATE_KEEPER',
            METALBAR: 8,
            foodConsumption: 39.6,
        },
        {
            itemId: 'PLATE_FEY',
            itemName: {
                ru: 'Шлем сумеречного ткача',
                en: 'Duskweaver Helmet',
            },
            itemNode: 'plateHelmet',
            itemType: 'helmet',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_HEAD_PLATE_FEY',
            METALBAR: 8,
            foodConsumption: 39.6,
        },
        {
            itemId: 'PLATE_AVALON',
            itemName: {
                ru: 'Шлем доблести',
                en: 'Helmet of Valor',
            },
            itemNode: 'plateHelmet',
            itemType: 'helmet',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_HEAD_PLATE_AVALON',
            METALBAR: 8,
            foodConsumption: 68.4,
        },
        {
            itemId: 'PLATE_ROYAL',
            itemName: {
                ru: 'Королевский шлем',
                en: 'Royal Helmet',
            },
            itemNode: 'plateHelmet',
            itemType: 'helmet',
            itemClass: 'warrior',
            METALBAR: 8,
            foodConsumption: 18,
            artefactItemId: 'QUESTITEM_TOKEN_ROYAL',
        },
        {
            itemId: 'GATHERER_FIBER',
            itemName: {
                ru: 'Шапка жнеца',
                en: 'Harvester Cap',
            },
            itemClass: 'toolmaker',
            itemNode: 'harvesterCap',
            CLOTH: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'GATHERER_FISH',
            itemName: {
                ru: 'Шапка рыбака',
                en: 'Fisherman Cap',
            },
            itemClass: 'toolmaker',
            itemNode: 'fishermanCap',
            LEATHER: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'GATHERER_HIDE',
            itemName: {
                ru: 'Шапка свежевателя',
                en: 'Skinner Cap',
            },
            itemClass: 'toolmaker',
            itemNode: 'skinnerCap',
            LEATHER: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'GATHERER_ORE',
            itemName: {
                ru: 'Шапка шахтера',
                en: 'Miner Cap',
            },
            itemClass: 'toolmaker',
            itemNode: 'minerCap',
            METALBAR: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'GATHERER_ROCK',
            itemName: {
                ru: 'Шапка каменолома',
                en: 'Quarrier Cap',
            },
            itemClass: 'toolmaker',
            itemNode: 'quarrierCap',
            METALBAR: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'GATHERER_WOOD',
            itemName: {
                ru: 'Шапка дровосека',
                en: 'Lumberjack Cap',
            },
            itemClass: 'toolmaker',
            itemNode: 'lumberjackCap',
            LEATHER: 8,
            foodConsumption: 14.4,
        },
    ],
    "SHOES": [
        {
            itemId: 'CLOTH_SET1',
            itemName: {
                ru: 'Сандалии ученого',
                en: 'Scholar Sandals',
            },
            itemNode: 'clothShoes',
            itemType: 'shoes',
            itemClass: 'mage',
            itemExample: true,
            CLOTH: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'CLOTH_SET2',
            itemName: {
                ru: 'Сандалии клирика',
                en: 'Cleric Sandals',
            },
            itemNode: 'clothShoes',
            itemType: 'shoes',
            itemClass: 'mage',
            CLOTH: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'CLOTH_SET3',
            itemName: {
                ru: 'Сандалии чародея',
                en: 'Mage Sandals',
            },
            itemNode: 'clothShoes',
            itemType: 'shoes',
            itemClass: 'mage',
            CLOTH: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'CLOTH_KEEPER',
            itemName: {
                ru: 'Сандалии друида',
                en: 'Druid Sandals',
            },
            itemNode: 'clothShoes',
            itemType: 'shoes',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_SHOES_CLOTH_KEEPER',
            CLOTH: 8,
            foodConsumption: 18,
        },
        {
            itemId: 'CLOTH_HELL',
            itemName: {
                ru: 'Дьявольские сандалии',
                en: 'Fiend Sandals',
            },
            itemNode: 'clothShoes',
            itemType: 'shoes',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_SHOES_CLOTH_HELL',
            CLOTH: 8,
            foodConsumption: 25.2,
        },
        {
            itemId: 'CLOTH_MORGANA',
            itemName: {
                ru: 'Сандалии культиста',
                en: 'Cultist Sandals',
            },
            itemNode: 'clothShoes',
            itemType: 'shoes',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_SHOES_CLOTH_MORGANA',
            CLOTH: 8,
            foodConsumption: 39.6,
        },
        {
            itemId: 'CLOTH_FEY',
            itemName: {
                ru: 'Сандалии из сказочной',
                en: 'Feyscale Sandals',
            },
            itemNode: 'clothShoes',
            itemType: 'shoes',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_SHOES_CLOTH_FEY',
            CLOTH: 8,
            foodConsumption: 39.6,
        },
        {
            itemId: 'CLOTH_AVALON',
            itemName: {
                ru: 'Сандалии чистоты',
                en: 'Sandals of Purity',
            },
            itemNode: 'clothShoes',
            itemType: 'shoes',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_SHOES_CLOTH_AVALON',
            CLOTH: 8,
            foodConsumption: 68.4,
        },
        {
            itemId: 'CLOTH_ROYAL',
            itemName: {
                ru: 'Королевские сандалии',
                en: 'Royal Sandals',
            },
            itemNode: 'clothShoes',
            itemType: 'shoes',
            itemClass: 'mage',
            CLOTH: 8,
            foodConsumption: 18,
            artefactItemId: 'QUESTITEM_TOKEN_ROYAL'
        },
        {
            itemId: 'LEATHER_SET1',
            itemName: {
                ru: 'Ботинки наемника',
                en: 'Mercenary Shoes',
            },
            itemNode: 'leatherShoes',
            itemType: 'shoes',
            itemClass: 'hunter',
            itemExample: true,
            LEATHER: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'LEATHER_SET2',
            itemName: {
                ru: 'Ботинки охотника',
                en: 'Hunter Shoes',
            },
            itemNode: 'leatherShoes',
            itemType: 'shoes',
            itemClass: 'hunter',
            LEATHER: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'LEATHER_SET3',
            itemName: {
                ru: 'Ботинки убийцы',
                en: 'Assassin Shoes',
            },
            itemNode: 'leatherShoes',
            itemType: 'shoes',
            itemClass: 'hunter',
            LEATHER: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'LEATHER_MORGANA',
            itemName: {
                ru: 'Ботинки лазутчика',
                en: 'Stalker Shoes',
            },
            itemNode: 'leatherShoes',
            itemType: 'shoes',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_SHOES_LEATHER_MORGANA',
            LEATHER: 8,
            foodConsumption: 18,
        },
        {
            itemId: 'LEATHER_HELL',
            itemName: {
                ru: 'Адские ботинки',
                en: 'Hellion Shoes',
            },
            itemNode: 'leatherShoes',
            itemType: 'shoes',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_SHOES_LEATHER_HELL',
            LEATHER: 8,
            foodConsumption: 25.2,
        },
        {
            itemId: 'LEATHER_UNDEAD',
            itemName: {
                ru: 'Ботинки призрака',
                en: 'Specter Shoes',
            },
            itemNode: 'leatherShoes',
            itemType: 'shoes',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_SHOES_LEATHER_UNDEAD',
            LEATHER: 8,
            foodConsumption: 39.6,
        },
        {
            itemId: 'LEATHER_FEY',
            itemName: {
                ru: 'Ботинки туманного охотника',
                en: 'Mistwalker Shoes',
            },
            itemNode: 'leatherShoes',
            itemType: 'shoes',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_SHOES_LEATHER_FEY',
            LEATHER: 8,
            foodConsumption: 39.6,
        },
        {
            itemId: 'LEATHER_AVALON',
            itemName: {
                ru: 'Ботинки упорства',
                en: 'Shoes of Tenacity',
            },
            itemNode: 'leatherShoes',
            itemType: 'shoes',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_SHOES_LEATHER_AVALON',
            LEATHER: 8,
            foodConsumption: 68.4,
        },
        {
            itemId: 'LEATHER_ROYAL',
            itemName: {
                ru: 'Королевские ботинки',
                en: 'Royal Shoes',
            },
            itemNode: 'leatherShoes',
            itemType: 'shoes',
            itemClass: 'hunter',
            LEATHER: 8,
            foodConsumption: 18,
            artefactItemId: 'QUESTITEM_TOKEN_ROYAL',
        },
        {
            itemId: 'PLATE_SET1',
            itemName: {
                ru: 'Сапоги солдата',
                en: 'Soldier Boots',
            },
            itemNode: 'plateShoes',
            itemType: 'shoes',
            itemClass: 'warrior',
            itemExample: true,
            METALBAR: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'PLATE_SET2',
            itemName: {
                ru: 'Сапоги рыцаря',
                en: 'Knight Boots',
            },
            itemNode: 'plateShoes',
            itemType: 'shoes',
            itemClass: 'warrior',
            METALBAR: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'PLATE_SET3',
            itemName: {
                ru: 'Сапоги хранителя',
                en: 'Guardian Boots',
            },
            itemNode: 'plateShoes',
            itemType: 'shoes',
            itemClass: 'warrior',
            METALBAR: 8,
            foodConsumption: 14.4,
        },
        {
            itemId: 'PLATE_UNDEAD',
            itemName: {
                ru: 'Могильные сапоги',
                en: 'Graveguard Boots',
            },
            itemNode: 'plateShoes',
            itemType: 'shoes',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_SHOES_PLATE_UNDEAD',
            METALBAR: 8,
            foodConsumption: 18,
        },
        {
            itemId: 'PLATE_HELL',
            itemName: {
                ru: 'Демонические сапоги',
                en: 'Demon Boots',
            },
            itemNode: 'plateShoes',
            itemType: 'shoes',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_SHOES_PLATE_HELL',
            METALBAR: 8,
            foodConsumption: 25.2,
        },
        {
            itemId: 'PLATE_KEEPER',
            itemName: {
                ru: 'Сапоги вершителя',
                en: 'Judicator Boots',
            },
            itemNode: 'plateShoes',
            itemType: 'shoes',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_SHOES_PLATE_KEEPER',
            METALBAR: 8,
            foodConsumption: 39.6,
        },
        {
            itemId: 'PLATE_FEY',
            itemName: {
                ru: 'Сапоги сумеречного ткача',
                en: 'Duskweaver Boots',
            },
            itemNode: 'plateShoes',
            itemType: 'shoes',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_SHOES_PLATE_FEY',
            METALBAR: 8,
            foodConsumption: 39.6,
        },
        {
            itemId: 'PLATE_AVALON',
            itemName: {
                ru: 'Сапоги доблести',
                en: 'Boots of Valor',
            },
            itemNode: 'plateShoes',
            itemType: 'shoes',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_SHOES_PLATE_AVALON',
            METALBAR: 8,
            foodConsumption: 68.4,
        },
        {
            itemId: 'PLATE_ROYAL',
            itemName: {
                ru: 'Королевские сапоги',
                en: 'Royal Boots',
            },
            itemNode: 'plateShoes',
            itemType: 'shoes',
            itemClass: 'warrior',
            METALBAR: 8,
            foodConsumption: 18,
            artefactItemId: 'QUESTITEM_TOKEN_ROYAL',
        },
        {
            itemId: 'GATHERER_FIBER',
            itemName: {
                ru: 'Рабочие сапоги жнеца',
                en: 'Harvester Workboots',
            },
            itemClass: 'toolmaker',
            itemNode: 'harvesterWorkboots',
            foodConsumption: 14.4,
            CLOTH: 8
        },
        {
            itemId: 'GATHERER_FISH',
            itemName: {
                ru: 'Рабочие сапоги рыбака',
                en: 'Fisherman Workboots',
            },
            itemClass: 'toolmaker',
            itemNode: 'fishermanWorkboots',
            foodConsumption: 14.4,
            LEATHER: 8,
        },
        {
            itemId: 'GATHERER_HIDE',
            itemName: {
                ru: 'Рабочие сапоги свежевателя',
                en: 'Skinner Workboots',
            },
            itemClass: 'toolmaker',
            itemNode: 'skinnerWorkboots',
            foodConsumption: 14.4,
            LEATHER: 8,
        },
        {
            itemId: 'GATHERER_ORE',
            itemName: {
                ru: 'Рабочие сапоги шахтера',
                en: 'Miner Workboots',
            },
            itemClass: 'toolmaker',
            itemNode: 'minerWorkboots',
            foodConsumption: 14.4,
            METALBAR: 8
        },
        {
            itemId: 'GATHERER_ROCK',
            itemName: {
                ru: 'Рабочие сапоги каменолома',
                en: 'Quarrier Workboots',
            },
            itemClass: 'toolmaker',
            itemNode: 'quarrierWorkboots',
            foodConsumption: 14.4,
            METALBAR: 8
        },
        {
            itemId: 'GATHERER_WOOD',
            itemName: {
                ru: 'Рабочие сапоги дровосека',
                en: 'Lumberjack Workboots',
            },
            itemClass: 'toolmaker',
            itemNode: 'lumberjackWorkboots',
            foodConsumption: 14.4,
            LEATHER: 8,
        },
    ],
    "OFF": [
        {
            itemId: 'SHIELD',
            itemName: {
                ru: 'Щит',
                en: 'Shield',
            },
            itemNode: 'shield',
            itemType: 'offHand',
            itemClass: 'warrior',
            itemExample: true,
            PLANKS: 4,
            METALBAR: 4,
            foodConsumption: 14.4,
        },
        {
            itemId: 'TOWERSHIELD_UNDEAD',
            itemName: {
                ru: 'Саркофаг',
                en: 'Sarcophagus',
            },
            itemNode: 'shield',
            itemType: 'offHand',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_OFF_TOWERSHIELD_UNDEAD',
            PLANKS: 4,
            METALBAR: 4,
            foodConsumption: 18,
        },
        {
            itemId: 'SHIELD_HELL',
            itemName: {
                ru: 'Щит негодяя',
                en: 'Caitiff Shield',
            },
            itemNode: 'shield',
            itemType: 'offHand',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_OFF_SHIELD_HELL',
            PLANKS: 4,
            METALBAR: 4,
            foodConsumption: 25.2,
        },
        {
            itemId: 'SPIKEDSHIELD_MORGANA',
            itemName: {
                ru: 'Лицелом',
                en: 'Facebreaker',
            },
            itemNode: 'shield',
            itemType: 'offHand',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_OFF_SPIKEDSHIELD_MORGANA',
            PLANKS: 4,
            METALBAR: 4,
            foodConsumption: 39.6,
        },
        {
            itemId: 'SHIELD_AVALON',
            itemName: {
                ru: 'Эгида звезд',
                en: 'Astral Aegis',
            },
            itemNode: 'shield',
            itemType: 'offHand',
            itemClass: 'warrior',
            artefactItemId: 'ARTEFACT_OFF_SHIELD_AVALON',
            PLANKS: 4,
            METALBAR: 4,
            foodConsumption: 68.4,
        },
        {
            itemId: 'BOOK',
            itemName: {
                ru: 'Книга заклинаний',
                en: 'Tome of Spells',
            },
            itemNode: 'book',
            itemType: 'offHand',
            itemClass: 'mage',
            itemExample: true,
            CLOTH: 4,
            LEATHER: 4,
            foodConsumption: 14.4,
        },
        {
            itemId: 'ORB_MORGANA',
            itemName: {
                ru: 'Око тайны',
                en: 'Eye of Secrets',
            },
            itemNode: 'orb',
            itemType: 'offHand',
            itemClass: 'mage',
            itemExample: true,
            artefactItemId: 'ARTEFACT_OFF_ORB_MORGANA',
            CLOTH: 4,
            LEATHER: 4,
            foodConsumption: 18,
        },
        {
            itemId: 'DEMONSKULL_HELL',
            itemName: {
                ru: 'Череп-трофей',
                en: 'Muisak',
            },
            itemNode: 'book',
            itemType: 'offHand',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_OFF_DEMONSKULL_HELL',
            CLOTH: 4,
            LEATHER: 4,
            foodConsumption: 25.2,
        },
        {
            itemId: 'TOTEM_KEEPER',
            itemName: {
                ru: 'Корень природы',
                en: 'Taproot',
            },
            itemNode: 'totem',
            itemType: 'offHand',
            itemClass: 'mage',
            itemExample: true,
            artefactItemId: 'ARTEFACT_OFF_TOTEM_KEEPER',
            CLOTH: 4,
            LEATHER: 4,
            foodConsumption: 39.6,
        },
        {
            itemId: 'CENSER_AVALON',
            itemName: {
                ru: 'Небесное кадило',
                en: 'Celestial Censer',
            },
            itemNode: 'torch',
            itemType: 'offHand',
            itemClass: 'mage',
            artefactItemId: 'ARTEFACT_OFF_CENSER_AVALON',
            CLOTH: 4,
            LEATHER: 4,
            foodConsumption: 68.4,
        },
        {
            itemId: 'TORCH',
            itemName: {
                ru: 'Факел',
                en: 'Torch',
            },
            itemNode: 'torch',
            itemType: 'offHand',
            itemClass: 'hunter',
            itemExample: true,
            PLANKS: 4,
            CLOTH: 4,
            foodConsumption: 14.4,
        },
        {
            itemId: 'HORN_KEEPER',
            itemName: {
                ru: 'Туманный зов',
                en: 'Mistcaller',
            },
            itemNode: 'horn',
            itemType: 'offHand',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_OFF_HORN_KEEPER',
            PLANKS: 4,
            CLOTH: 4,
            foodConsumption: 18,
        },
        {
            itemId: 'TALISMAN_AVALON',
            itemName: {
                ru: 'Священный скипетр',
                en: 'Sacred Scepter',
            },
            itemNode: 'torch',
            itemType: 'offHand',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_OFF_TALISMAN_AVALON',
            PLANKS: 4,
            CLOTH: 4,
            foodConsumption: 68.4,
        },
        {
            itemId: 'LAMP_UNDEAD',
            itemName: {
                ru: 'Могильная свеча',
                en: 'Cryptcandle',
            },
            itemNode: 'torch',
            itemType: 'offHand',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_OFF_LAMP_UNDEAD',
            PLANKS: 4,
            CLOTH: 4,
            foodConsumption: 39.6,
        },
        {
            itemId: 'JESTERCANE_HELL',
            itemName: {
                ru: 'Зловещая трость',
                en: 'Leering Cane',
            },
            itemNode: 'torch',
            itemType: 'offHand',
            itemClass: 'hunter',
            artefactItemId: 'ARTEFACT_OFF_JESTERCANE_HELL',
            PLANKS: 4,
            CLOTH: 4,
            foodConsumption: 25.2,
        },
    ],
};

const objectTypeKeys = Object.keys(craftItems) as TCraftObjectTypes[];

export type TCraftItems = {
    divFactor?: number;
    itemId: string | null;
    itemClass: string | null;
    LEATHER?: number | null;
    CLOTH?: number | null;
    PLANKS?: number | null;
    METALBAR?: number | null;
    WOOD?: number | null;
    ORE?: number | null;
    ROCK?: number | null;
    FIBER?: number | null;
    HIDE?: number | null;
    STONEBLOCK?: number | null;
    itemName?: {
        'ru': string,
        'en': string,
    }
    itemNode: TItemNode;
    itemTier: number;
    itemImage: string;
    artefactItemId?: string;
    foodConsumption?: number;
    defaultFoodConsumption?: number;
    enchantment?: string;
    journalQuantity?: number;

}

export interface IBagCell extends Pick<TCraftItems, 'itemId' | 'itemImage' | 'itemNode' | 'itemName' > {
    itemCellImg?: string;
    itemQuantity: number | null;
    itemTier: string;
    itemIndex?: number;
    itemEnchantmentNum: string;
    itemEnchantment: string;

}

export const emptyBagCell: IBagCell = {
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

const warriorCraftItems: TCraftItems[] = [];
const huntersCraftItems: TCraftItems[] = [];
const mageCraftItems: TCraftItems[] = [];
const toolmakerCraftItems: TCraftItems[] = [];

objectTypeKeys.forEach(itemTypeKey => craftItems[itemTypeKey].forEach(itemForSelect => [4, 5, 6, 7, 8].forEach(itemTier => {

    const {artefactItemId, itemClass, itemNode, CLOTH, LEATHER, PLANKS, METALBAR, STONEBLOCK, foodConsumption, itemName} = itemForSelect;

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

    const craftItem: TCraftItems = {
        itemId,
        itemClass: itemClass!,
        LEATHER: LEATHER || null,
        CLOTH: CLOTH || null,
        PLANKS: PLANKS || null,
        METALBAR: METALBAR || null,
        STONEBLOCK: STONEBLOCK || null,
        itemName,
        itemNode: itemNode!,
        itemTier,
        itemImage: `https://render.albiononline.com/v1/item/${itemId}`,
        artefactItemId: definedArtefactId,
        foodConsumption,
        defaultFoodConsumption,
        journalQuantity,
    }

    switch (itemForSelect.itemClass){
        case "warrior":
            warriorCraftItems.push(craftItem);
            break;
        case 'hunter':
            huntersCraftItems.push(craftItem);
            break;
        case 'mage':
            mageCraftItems.push(craftItem);
            break;
        case 'toolmaker':
            toolmakerCraftItems.push(craftItem);
            break;
    }
})));

export {
    warriorCraftItems,
    huntersCraftItems,
    mageCraftItems,
    toolmakerCraftItems,
}
