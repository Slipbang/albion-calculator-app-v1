import {RootState} from "../index";

export const selectMarketItem = (state: RootState) => state.GMProfit.selectedMarketItem;
export const selectMarketItems = (state: RootState) => state.GMProfit.marketItems;
export const selectWorkBenchItem = (state: RootState) => state.GMProfit.selectedWorkBenchItem;
export const selectBackpackItems = (state: RootState) => state.GMProfit.backpackItems;
export const selectFoodTax = (state: RootState) => state.GMProfit.foodTax;
export const selectMarketAction = (state: RootState) => state.GMProfit.marketActionSelected;
export const selectBackpackSilver = (state: RootState) => state.GMProfit.backpackSilver;
export const selectItemType = (state: RootState) => state.GMProfit.itemTypeSelected;
export const selectWorkBenchType = (state: RootState) => state.GMProfit.workBenchTypeSelected;
export const selectWorkBenchAvatar = (state: RootState) => state.GMProfit.workBenchAvatar;
export const selectWorkBenchWorkerAvatar = (state: RootState) => state.GMProfit.workBenchWorkerAvatar;