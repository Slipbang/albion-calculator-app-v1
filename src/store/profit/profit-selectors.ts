import {RootState} from "../index";

export const selectCraftResourcesList = (state: RootState) => state.profit.craftResourcesList;
export const selectCraftItemsList = (state: RootState) => state.profit.craftItemsList;
export const selectInitialQuantity = (state: RootState) => state.profit.initialQuantity;
export const selectErrors = (state: RootState) => state.profit.errors;
export const selectPercent = (state: RootState) => state.profit.percent;
export const selectItem = (state: RootState) => state.profit.selected.selectedItem;
export const selectFood = (state: RootState) => state.profit.selected.selectedFood;
export const selectResource = (state: RootState) => state.profit.selected.selectedResource;
export const selectItemType = (state: RootState) => state.profit.itemSelector.itemType;
export const selectItemNode = (state: RootState) => state.profit.itemSelector.itemNode;
export const selectCraftedItemData = (state: RootState) => state.profit.craftedItemData;
export const selectCraftedFoodData = (state: RootState) => state.profit.craftedFoodData;
export const selectConsumableItemQuantity = (state: RootState) => state.profit.consumableItemQuantity;


