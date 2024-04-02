import {RootState} from "../index";

export const selectCraftResourcesList = (state: RootState) => state.profit.craftResourcesList;
export const selectCraftItemsList = (state: RootState) => state.profit.craftItemsList;
export const selectInitialQuantity = (state: RootState) => state.profit.initialQuantity;
export const selectErrors = (state: RootState) => state.profit.errors;
export const selectPercent = (state: RootState) => state.profit.percent;
export const selectItem = (state: RootState) => state.profit.selected.selectedItem;
export const selectResource = (state: RootState) => state.profit.selected.selectedResource;
export const selectItemSelector = (state: RootState) => state.profit.itemSelector;
export const selectCraftedItemData = (state: RootState) => state.profit.craftedItemData;


