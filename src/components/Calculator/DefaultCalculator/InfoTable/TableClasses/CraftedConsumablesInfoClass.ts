import {IItemsData, TCities} from "../../../../../types/InfoTableTypes";
import {IFoodTableData} from "../../../../../store/profit/profit-slice";

export class CraftedConsumablesInfoClass {
    constructor(
        public city: TCities,
        public enchantment: string,
        public infoTableData: IFoodTableData,
        public consumableResourcesData: IItemsData[] | undefined,
    ) {}
    craftedFood = this.infoTableData.craftedFood;
    consumableItemId = this.craftedFood.itemId;
    consumableResourcesKeys = Object.keys(this.infoTableData.craftedFood).filter(key => key.toUpperCase() !== key);

    profitPerItem = 0;
    totalProfit = '';
    profitPerItemTitle = '';
    title = '';
}