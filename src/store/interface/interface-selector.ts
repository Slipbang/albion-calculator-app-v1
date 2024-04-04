import {RootState} from "../index";

export const selectGameMode = (state: RootState) => state.interface.global.gameMode;
export const selectCalculatorType = (state: RootState) => state.interface.global.calculatorType;
export const selectMarketMenuShown = (state: RootState) => state.interface.global.isMarketMenuShown;
export const selectCraftingFormVisibility = (state: RootState) => state.interface.global.isCraftingFormVisible;
export const selectMarketItemVisibility = (state: RootState) => state.interface.global.isMarketItemVisible;
export const selectCraftTableVisibility = (state: RootState) => state.interface.global.isCraftTableShown;
export const selectInfoTableVisibility = (state: RootState) => state.interface.global.isInfoTableShown;
export const selectItemSelectorVisibility = (state: RootState) => state.interface.global.isItemSelectorShown;

export const selectSwiperCount = (state: RootState) => state.interface.DefaultCalculator.swiperCount;

export const selectNodeIS = (state: RootState) => state.interface.GMItemSelector.selectedNodeIS;
export const selectTierIS = (state: RootState) => state.interface.GMItemSelector.selectedTierIS;
export const selectInputIS = (state: RootState) => state.interface.GMItemSelector.inputSearchIS;

export const selectTierMM = (state: RootState) => state.interface.MarketMenu.selectedTierMM;
export const selectItemTypeMM = (state: RootState) => state.interface.MarketMenu.selectedItemTypeMM;
export const selectEnchantmentMM = (state: RootState) => state.interface.MarketMenu.selectedEnchantmentMM;
export const selectInputMM = (state: RootState) => state.interface.MarketMenu.inputSearchMM;

export const selectItemsQuantityCF = (state: RootState) => state.interface.GMCraftingForm.itemsQuantityCF;
export const selectMaterialEnchantmentCF = (state: RootState) => state.interface.GMCraftingForm.materialEnchantmentCF;
export const selectItemEnchantmentCF = (state: RootState) => state.interface.GMCraftingForm.itemEnchantmentCF;
export const selectEnchantmentNumCF = (state: RootState) => state.interface.GMCraftingForm.enchantmentNumCF;
export const selectReturnPercentCF = (state: RootState) => state.interface.GMCraftingForm.returnPercentCF;
export const selectJournalUsageCF = (state: RootState) => state.interface.GMCraftingForm.isJournalUsedCF;
export const selectOwnJournalPriceCF = (state: RootState) => state.interface.GMCraftingForm.ownJournalPriceCF;
export const selectJournalPriceFetchedStateCF = (state: RootState) => state.interface.GMCraftingForm.isJournalPriceFetchedCF;
export const selectArtefactPriceFetchedStateCF = (state: RootState) => state.interface.GMCraftingForm.isArtefactPriceFetchedCF;
export const selectOwnArtefactPriceCF = (state: RootState) => state.interface.GMCraftingForm.ownArtefactPriceCF;
export const selectJournalPriceCF = (state: RootState) => state.interface.GMCraftingForm.journalPriceCF;
export const selectArtefactPriceCF = (state: RootState) => state.interface.GMCraftingForm.artefactPriceCF;
export const selectEnchantmentButtons = (state: RootState) => state.interface.GMCraftingForm.enchantmentButtons;

export const selectItemQuantityMI = (state: RootState) => state.interface.MarketItem.itemQuantityMI;
export const selectPriceFetchedState = (state: RootState) => state.interface.MarketItem.isPriceFetchedMI;
export const selectOwnItemPriceMI = (state: RootState) => state.interface.MarketItem.ownItemPriceMI;
export const selectItemPriceMI = (state: RootState) => state.interface.MarketItem.itemPriceMI;
