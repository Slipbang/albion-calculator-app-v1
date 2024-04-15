import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {enchantmentOptions, IOptions, nodeOptions, tierOptions, typeOptions} from "../Options/CustomSelecrorsOptions";
import {TCalcProps} from "../../types/calculatorPropsType";
import {dummyEnchantmentButtons, IEnchantmentButton} from "./DummyEnchantmentButtons/DummyEnchantmentButtons";

export interface ICount {
    left: number;
    right: number;
}

export type TTheme = 'dark' | 'light';

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
        itemQuantityMI: number;
        isPriceFetchedMI: boolean;
        ownItemPriceMI: number;
        itemPriceMI: number;
    };
}

const defineTheme = (): TTheme => {
    const themeStorage = localStorage.getItem('AT-web-interface-theme');
    if (themeStorage === 'dark' || themeStorage === 'light'){
        return themeStorage as TTheme;
    }

    return 'light';
}

const theme = defineTheme();

const initialState: IInitialState = {
    global: {
        gameMode: true,
        calculatorType: 'resource',
        isMarketMenuShown: false,
        isCraftingFormVisible: false,
        isMarketItemVisible: false,
        isCraftTableShown: false,
        isInfoTableShown: false,
        isItemSelectorShown: false,
        theme: theme,
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
        itemQuantityMI: 1,
        isPriceFetchedMI: false,
        ownItemPriceMI: 0,
        itemPriceMI: 0,
    },
}

const interfaceSlice = createSlice({
    name: '@profit',
    initialState,
    reducers: {
        setTheme(state){
            switch (state.global.theme){
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
        toggleGameMode(state, action: PayloadAction<{isGame?: boolean} | undefined>) {
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
})

export const interfaceSliceActions = interfaceSlice.actions;
export default interfaceSlice;