import {RootState} from "../index";

export const selectCraftResourcesList = (state: RootState) => state.profit.craftResourcesList;
export const selectCraftItemsList = (state: RootState) => state.profit.craftItemsList;
export const selectCraftedMealsList = (state: RootState) => state.profit.craftedMealsList;
export const selectCraftedPotionsList = (state: RootState) => state.profit.craftedPotionsList;
export const selectInitialQuantity = (state: RootState) => state.profit.initialQuantity;
export const selectErrors = (state: RootState) => state.profit.errors;
export const selectPercent = (state: RootState) => state.profit.percent;
export const selectItem = (state: RootState) => state.profit.selected.selectedItem;
export const selectConsumable = (state: RootState) => state.profit.selected.selectedConsumable;
export const selectResource = (state: RootState) => state.profit.selected.selectedResource;
export const selectItemType = (state: RootState) => state.profit.itemSelector.itemType;
export const selectItemNode = (state: RootState) => state.profit.itemSelector.itemNode;
export const selectCraftedItemData = (state: RootState) => state.profit.craftedItemData;
export const selectCraftedConsumablesData = (state: RootState) => state.profit.craftedConsumablesData;
export const selectConsumableItemQuantity = (state: RootState) => state.profit.consumableItemQuantity;


