import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    enchantmentOptions,
    IOptions,
    nodeOptions,
    qualityOptions,
    tierOptions,
    typeOptions
} from "../Options/CustomSelecrorsOptions";
import {TCalcProps} from "../../types/calculatorPropsType";
import {dummyEnchantmentButtons, IEnchantmentButton} from "./DummyEnchantmentButtons/DummyEnchantmentButtons";
import axios from "axios";
import {ICraftItem, TItems} from "../../types/craftItemsType";
import {TConsumable} from "../../types/consumableTypes";

import {TArtefacts} from "../../types/artefactTypes";
import {defineCurrentConfigurationItems, ICurrentConfigurationItems} from "../utils/defineCurrentConfigurationItems";
import {TLanguageData} from "../../types/languageTypes";

export interface ICount {
    left: number;
    right: number;
}

export type TTheme = 'dark' | 'light';

export type TConsumableCraftItems = {
    cooked: TConsumable;
    potion: TConsumable;
}

interface IItemsConfigurationData {
    craftItems: TItems;
    consumableCraftItems: TConsumableCraftItems;
    artefacts: TArtefacts;
    materials: ICraftItem[];
    languageData: TLanguageData;
}

export const serverUrl = 'https://albion-online-data-server.onrender.com';

export const itemsHttpRequests = createAsyncThunk<IItemsConfigurationData>(
    '@interface/fetchConfigurationItems',
    async (_, thunkAPI) => {
        // const jsonItems = localStorage.getItem('appConfigurationItems');
        // let appDate = null;
        // let githubCommitDate = null;
        //
        // const githubApiUrl = 'https://api.github.com/repos/ao-data/ao-bin-dumps/commits';
        // if (jsonItems) {
        //     const items = JSON.parse(jsonItems);
        //     appDate = items.date;
        //
        //     const {data: githubData} = await axios.get(githubApiUrl);
        //     githubCommitDate = githubData[0]['commit']['author']['date'];
        //
        //     if (!!appDate && !!githubCommitDate && (githubCommitDate === appDate)) {
        //         return thunkAPI.rejectWithValue('LOCALSTORAGE_IS_NOT_EMPTY');
        //     }
        // }

        const {data: ATData} = await axios.get<IItemsConfigurationData>(`${serverUrl}/data`);

        if (!('craftItems' in ATData)) {
            return thunkAPI.rejectWithValue('EMPTY_OBJECT');
        }

        return ATData;
    }
)

interface IInitialState {
    global: {
        gameMode: boolean;
        calculatorType: TCalcProps;
        isMarketMenuShown: boolean;
        isCraftingFormVisible: boolean;
        isMarketItemVisible: boolean;
        isCraftTableShown: boolean;
        isInfoTableShown: boolean;
        isItemSelectorShown: boolean;
        theme: TTheme;
    };

    DefaultCalculator: {
        swiperCount: ICount;
    };

    GMItemSelector: {
        selectedNodeIS: IOptions;
        selectedTierIS: IOptions;
        inputSearchIS: string;
    };

    MarketMenu: {
        selectedTierMM: IOptions;
        selectedItemTypeMM: IOptions;
        selectedEnchantmentMM: IOptions;
        inputSearchMM: string;
    };

    GMCraftingForm: {
        itemsQuantityCF: number;
        materialEnchantmentCF: string;
        itemEnchantmentCF: string;
        enchantmentNumCF: string;
        returnPercentCF: number;
        isJournalUsedCF: boolean;
        ownJournalPriceCF: number;
        isJournalPriceFetchedCF: boolean;
        journalPriceCF: number;
        isArtefactPriceFetchedCF: boolean;
        ownArtefactPriceCF: number;
        artefactPriceCF: number;
        enchantmentButtons: IEnchantmentButton[],
    };

    MarketItem: {
        itemQualityMI: IOptions;
        itemQuantityMI: number;
        isPriceFetchedMI: boolean;
        ownItemPriceMI: number;
        itemPriceMI: number;
    };
    items: ICurrentConfigurationItems;
    status: 'loading' | 'error' | 'success';
}

const defineTheme = (): TTheme => {
    const themeStorage = localStorage.getItem('AT-web-interface-theme');
    if (themeStorage === 'dark' || themeStorage === 'light') {
        return themeStorage as TTheme;
    }

    return 'light';
}

const theme = defineTheme();

const initialState: IInitialState = {
    global: {
        gameMode: true,
        calculatorType: 'RESOURCES',
        isMarketMenuShown: false,
        isCraftingFormVisible: false,
        isMarketItemVisible: false,
        isCraftTableShown: false,
        isInfoTableShown: false,
        isItemSelectorShown: false,
        theme,
    },

    DefaultCalculator: {
        swiperCount: {
            left: 0,
            right: 5,
        }
    },

    GMItemSelector: {
        selectedNodeIS: nodeOptions['tanner']['resources']![0],
        selectedTierIS: tierOptions[0],
        inputSearchIS: '',
    },

    MarketMenu: {
        selectedTierMM: tierOptions[0],
        selectedItemTypeMM: typeOptions[0],
        selectedEnchantmentMM: enchantmentOptions[0],
        inputSearchMM: '',
    },

    GMCraftingForm: {
        itemsQuantityCF: 1,
        materialEnchantmentCF: '',
        itemEnchantmentCF: '',
        enchantmentNumCF: '',
        returnPercentCF: 15.2,
        isJournalUsedCF: false,
        isJournalPriceFetchedCF: false,
        ownJournalPriceCF: 0,
        journalPriceCF: 0,
        isArtefactPriceFetchedCF: false,
        ownArtefactPriceCF: 0,
        artefactPriceCF: 0,
        enchantmentButtons: JSON.parse(JSON.stringify(dummyEnchantmentButtons)),
    },

    MarketItem: {
        itemQualityMI: qualityOptions[0],
        itemQuantityMI: 1,
        isPriceFetchedMI: false,
        ownItemPriceMI: 0,
        itemPriceMI: 0,
    },

    items: defineCurrentConfigurationItems(),
    status: 'success',
}

const interfaceSlice = createSlice({
    name: '@interface',
    initialState,
    reducers: {
        setTheme(state) {
            switch (state.global.theme) {
                case 'dark':
                    state.global.theme = "light";
                    break;
                case 'light':
                    state.global.theme = "dark";
                    break;
            }
            localStorage.setItem("AT-web-interface-theme", state.global.theme);
        },
        toggleCraftTableVisibility(state, action: PayloadAction<boolean | undefined>) {
            if (action.payload === undefined) {
                state.global.isCraftTableShown = !state.global.isCraftTableShown;
            } else {
                state.global.isCraftTableShown = action.payload;
            }
        },
        setSwiperCount(state, action: PayloadAction<{ isLeft: boolean }>) {
            if (action.payload.isLeft) {
                state.DefaultCalculator.swiperCount = {
                    left: +state.DefaultCalculator.swiperCount.left - 1,
                    right: +state.DefaultCalculator.swiperCount.right - 1,
                }
            } else {
                state.DefaultCalculator.swiperCount = {
                    left: +state.DefaultCalculator.swiperCount.left + 1,
                    right: +state.DefaultCalculator.swiperCount.right + 1,
                }
            }
        },
        setEnchantmentButtons(state, action: PayloadAction<IEnchantmentButton[]>) {
            state.GMCraftingForm.enchantmentButtons = action.payload;
        },
        setCalculatorType(state, action: PayloadAction<TCalcProps>) {
            state.global.calculatorType = action.payload;
        },
        setIsCraftingFormVisible(state, action: PayloadAction<boolean>) {
            state.global.isCraftingFormVisible = action.payload;
        },
        toggleMarketMenuShown(state) {
            state.global.isMarketMenuShown = !state.global.isMarketMenuShown;
        },
        setMarketItemVisibility(state, action: PayloadAction<boolean>) {
            state.global.isMarketItemVisible = action.payload;
        },
        setInfoTableVisibility(state, action: PayloadAction<boolean>) {
            state.global.isInfoTableShown = action.payload;
        },
        toggleGameMode(state, action: PayloadAction<{ isGame?: boolean } | undefined>) {
            state.global.isCraftingFormVisible = initialState.global.isCraftingFormVisible;
            state.global.isMarketItemVisible = initialState.global.isMarketItemVisible;
            state.global.isMarketMenuShown = initialState.global.isMarketMenuShown;
            state.global.isCraftTableShown = initialState.global.isCraftTableShown;
            if (action.payload?.isGame === undefined) {
                state.global.gameMode = !state.global.gameMode;
            } else {
                state.global.gameMode = action.payload.isGame;
            }
        },
        toggleItemSelectorVisibility(state, action: PayloadAction<boolean | undefined>) {
            if (action.payload === undefined) {
                state.global.isItemSelectorShown = !state.global.isItemSelectorShown;
            } else {
                state.global.isItemSelectorShown = action.payload;
            }
        },
        setSelectedTierIS(state, action: PayloadAction<IOptions>) {
            state.GMItemSelector.selectedTierIS = action.payload;
        },
        setSelectedNodeIS(state, action: PayloadAction<IOptions>) {
            state.GMItemSelector.selectedNodeIS = action.payload;
        },
        setInputSearchIS(state, action: PayloadAction<string>) {
            state.GMItemSelector.inputSearchIS = action.payload;
        },
        setSelectedTierMM(state, action: PayloadAction<IOptions>) {
            state.MarketMenu.selectedTierMM = action.payload;
        },
        setSelectedItemTypeMM(state, action: PayloadAction<IOptions>) {
            state.MarketMenu.selectedItemTypeMM = action.payload;
        },
        setSelectedEnchantmentMM(state, action: PayloadAction<IOptions>) {
            state.MarketMenu.selectedEnchantmentMM = action.payload;
        },
        setInputSearchMM(state, action: PayloadAction<string>) {
            state.MarketMenu.inputSearchMM = action.payload;
        },
        resetMarketMenuSelectors(state) {
            state.MarketMenu.selectedTierMM = initialState.MarketMenu.selectedTierMM;
            state.MarketMenu.selectedItemTypeMM = initialState.MarketMenu.selectedItemTypeMM;
            state.MarketMenu.selectedEnchantmentMM = initialState.MarketMenu.selectedEnchantmentMM;
            state.MarketMenu.inputSearchMM = initialState.MarketMenu.inputSearchMM;
        },
        setItemsQuantityCF(state, action: PayloadAction<number>) {
            state.GMCraftingForm.itemsQuantityCF = action.payload;
        },
        setMaterialEnchantmentCF(state, action: PayloadAction<string>) {
            state.GMCraftingForm.materialEnchantmentCF = action.payload;
        },
        setItemEnchantmentCF(state, action: PayloadAction<string>) {
            state.GMCraftingForm.itemEnchantmentCF = action.payload;
        },
        setEnchantmentNumCF(state, action: PayloadAction<string>) {
            state.GMCraftingForm.enchantmentNumCF = action.payload;
        },
        setReturnPercentCF(state, action: PayloadAction<number>) {
            state.GMCraftingForm.returnPercentCF = action.payload;
        },
        setIsJournalsUsedCF(state, action: PayloadAction<boolean | undefined>) {
            if (action?.payload === undefined) {
                state.GMCraftingForm.isJournalUsedCF = !state.GMCraftingForm.isJournalUsedCF;
            } else {
                state.GMCraftingForm.isJournalUsedCF = action.payload;
            }
        },
        setOwnJournalPriceCF(state, action: PayloadAction<number>) {
            state.GMCraftingForm.ownJournalPriceCF = action.payload;
        },
        setIsJournalPriceFetchedCF(state) {
            state.GMCraftingForm.isJournalPriceFetchedCF = !state.GMCraftingForm.isJournalPriceFetchedCF;
        },
        setIsArtefactPriceFetchedCF(state, action: PayloadAction<boolean | undefined>) {
            if (action?.payload === undefined) {
                state.GMCraftingForm.isArtefactPriceFetchedCF = !state.GMCraftingForm.isArtefactPriceFetchedCF;
            } else {
                state.GMCraftingForm.isArtefactPriceFetchedCF = action.payload;
            }
        },
        setOwnArtefactPriceCF(state, action: PayloadAction<number>) {
            state.GMCraftingForm.ownArtefactPriceCF = action.payload;
        },
        setJournalPriceCF(state, action: PayloadAction<number>) {
            state.GMCraftingForm.journalPriceCF = action.payload;
        },
        setArtefactPriceCF(state, action: PayloadAction<number>) {
            state.GMCraftingForm.artefactPriceCF = action.payload;
        },
        setItemQuantityMI(state, action: PayloadAction<number>) {
            state.MarketItem.itemQuantityMI = action.payload;
        },
        setItemQualityMI(state, action: PayloadAction<IOptions>) {
            state.MarketItem.itemQualityMI = action.payload;
        },
        setIsPriceFetchedMI(state, action: PayloadAction<boolean | undefined>) {
            if (action?.payload === undefined) {
                state.MarketItem.isPriceFetchedMI = !state.MarketItem.isPriceFetchedMI;
            } else {
                state.MarketItem.isPriceFetchedMI = action.payload;
            }
        },
        setOwnItemPriceMI(state, action: PayloadAction<number>) {
            state.MarketItem.ownItemPriceMI = action.payload;
        },
        setItemPriceMI(state, action: PayloadAction<number>) {
            state.MarketItem.itemPriceMI = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(itemsHttpRequests.pending, (state: IInitialState) => {
            state.status = 'loading';
        })
        builder.addCase(itemsHttpRequests.fulfilled, (state: IInitialState, action: PayloadAction<IItemsConfigurationData>) => {
            state.status = 'success';
            localStorage.setItem('appConfigurationItems', JSON.stringify(action.payload));
            state.items = defineCurrentConfigurationItems();
        })
        builder.addCase(itemsHttpRequests.rejected, (state: IInitialState, action) => {
            if (action.payload === 'EMPTY_OBJECT') {
                state.status = 'error';
            }
            // else if (action.payload === 'LOCALSTORAGE_IS_NOT_EMPTY') {
            //     state.status = 'success';
            // }
        })
    }
})

export const interfaceSliceActions = interfaceSlice.actions;
export default interfaceSlice;