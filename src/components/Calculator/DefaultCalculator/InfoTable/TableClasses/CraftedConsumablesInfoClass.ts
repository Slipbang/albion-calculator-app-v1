import {IItemsData, TCities} from "../../../../../types/InfoTableTypes";
import {IConsumableTableData} from "../../../../../store/profit/profit-slice";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../../types/languageTypes";
import {TConsumableNames} from "../../../../../store/Items/consumablesNamesData";
import {TConsumablesSelectors} from "../InfoTable";

export class CraftedConsumablesInfoClass {
    constructor(
        public city: TCities,
        public enchantment: string,
        public infoTableData: IConsumableTableData,
        public consumableResourcesData: IItemsData[] | undefined,
        public consumableResourcesKeys: string[] | undefined,
        public selectedLanguage: TSelectedLanguage,
        public consumablesNames: TConsumableNames | undefined,
        public infoTableStrings: ISelectedLanguage['infoTableStrings'],
        public consumableSelectors: TConsumablesSelectors | undefined,
        public foodTax: number,
    ) {

    }
    percent = this.infoTableData.percent;
    consumableItemId = `${this.infoTableData.craftedFood.itemId}${!!this.enchantment ? `@${this.enchantment}` : ''}`;

    consumableResourcePrices = () => {
        const {consumableResourcesKeys, consumableResourcesData,enchantment} = this;

        const resourcePrices: {[key: string]: number} = {};

        consumableResourcesKeys!.forEach(key => {
            const finalKey = (!key.includes('FISHSAUCE') && !key.includes('ALCHEMY_EXTRACT')) ? key : `${key}${enchantment}`;
            resourcePrices[key] = consumableResourcesData?.find(item => item.itemId === finalKey && item.location === this.consumableSelectors![finalKey])?.sellPriceMin || 0;
        })

        const consumableItemPrice = consumableResourcesData?.find(item => item.itemId === this.consumableItemId && item.location === this.city)?.sellPriceMin || 0;

        return {resourcePrices, consumableItemPrice};
    }

    prices = this.consumableResourcePrices();

    totalFoodTax = Math.ceil(this.infoTableData.craftedFood.foodConsumption * (this.foodTax/100));

    resourcePrices = this.prices.resourcePrices;
    consumableItemPrice = Math.floor(this.prices.consumableItemPrice - (this.prices.consumableItemPrice * 0.065)) || this.infoTableStrings.noData;

    resourcePricesCalculation = () => {
        const {consumableResourcesKeys, infoTableData, percent, consumablesNames, selectedLanguage, resourcePrices, enchantment, consumableItemPrice, totalFoodTax} = this;
        const {craftedFood} = infoTableData;


        const resourcesPricesTitle: string[] = [];
        let totalCost: number = totalFoodTax;

        consumableResourcesKeys?.map(key => {
            if (!enchantment && (key.includes('FISHSAUCE') || key.includes('ALCHEMY_EXTRACT'))) return;

            const totalQuantity = (key === 'QUESTITEM_TOKEN_AVALON') ? +craftedFood[key] : (+craftedFood[key] - +craftedFood[key] * percent / 100);
            const totalItemCost = Math.floor(resourcePrices[key] * totalQuantity);

            resourcesPricesTitle.push(`${consumablesNames?.[(!key.includes('FISHSAUCE') && !key.includes('ALCHEMY_EXTRACT')) ? key : `${key}${enchantment}`]?.[selectedLanguage] || 'err'}: ${resourcePrices[key].toLocaleString('en')} * ${totalQuantity} = ${totalItemCost.toLocaleString('en')}<hr><br>`);
            totalCost += totalItemCost;
        })

        const profitPerItem = (+consumableItemPrice * craftedFood.amountCrafted - totalCost) || this.infoTableStrings.noData;
        const profitPerItemTitle = `${consumableItemPrice.toLocaleString('en')} * ${craftedFood.amountCrafted} - ${totalCost.toLocaleString('en')} = ${profitPerItem.toLocaleString('en')}`
        const totalProfit = +profitPerItem * infoTableData.quantity;

        return {
            resourcesPricesTitle: resourcesPricesTitle.join(''),
            profitPerItemTitle,
            profitPerItem,
            totalProfit
        }
    }

    itemPriceTitle = `${this.consumablesNames![this.infoTableData.craftedFood.itemId][this.selectedLanguage]}: ${this.consumableItemPrice.toLocaleString('en')}`;
    foodTaxTitle = `${this.infoTableStrings.tax} ${this.totalFoodTax}`;

    resourcesPricesTitle = this.resourcePricesCalculation().resourcesPricesTitle;
    profitPerItem = this.resourcePricesCalculation().profitPerItem || this.infoTableStrings.noData;
    totalProfit = this.resourcePricesCalculation().totalProfit || this.infoTableStrings.noData;
    profitPerItemTitle = `${this.infoTableStrings.profitPerItem} ${this.resourcePricesCalculation().profitPerItemTitle}`;

    totalProfitTitle = `${this.infoTableStrings.total} ${this.profitPerItem} * ${this.infoTableData.quantity} = ${this.totalProfit.toLocaleString('en')}`
    title = `${this.foodTaxTitle}<hr><br>
             ${this.itemPriceTitle}<hr><br>
             ${this.resourcesPricesTitle}
             ${this.profitPerItemTitle}<hr><br>
             ${this.totalProfitTitle}<hr><br>`;
}