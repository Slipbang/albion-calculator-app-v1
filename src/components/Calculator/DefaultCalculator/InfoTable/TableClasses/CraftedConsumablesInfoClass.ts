import {IItemsData, TCities} from "../../../../../types/InfoTableTypes";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../../types/languageTypes";
import {TConsumablesSelectors} from "../InfoTable";
import {UtilsMethodsClass} from "./UtilsMethodsClass";
import {IConsumableTableData} from "../../../../../types/defaultCalculatorTypes";
import {TConsumableNames} from "../../../../../types/ConsumableNamesType";

export class CraftedConsumablesInfoClass extends UtilsMethodsClass{
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
        public currentDate: Date,
    ) {
        super(currentDate);
    }
    percent = this.infoTableData.percent;
    consumableItemId = `${this.infoTableData.craftedConsumable.itemId}${!!this.enchantment ? `@${this.enchantment}` : ''}`;

    consumableResourcePrices = () => {
        const {consumableResourcesKeys, consumableResourcesData,enchantment} = this;

        const resourcePrices: {[key: string]: number} = {};
        const resourcePricesDates: {[key: string]: string} = {};

        consumableResourcesKeys!.forEach(key => {
            const resourcePricesKey = (!key.includes('FISHSAUCE') && !key.includes('ALCHEMY_EXTRACT')) ? key : `${key}${enchantment}`;
            const consumableResourceDataObject =  consumableResourcesData?.find(item => item.itemId === resourcePricesKey && item.location === this.consumableSelectors![resourcePricesKey]);
            resourcePrices[resourcePricesKey] = consumableResourceDataObject?.sellPriceMin || 0;
            resourcePricesDates[resourcePricesKey] = consumableResourceDataObject?.sellPriceMinDate || '';
        })

        const consumableItemPriceObject = consumableResourcesData?.find(item => item.itemId === this.consumableItemId && item.location === this.city);
        const consumableItemPrice = consumableItemPriceObject?.sellPriceMin || 0;
        const consumableItemPriceDate = consumableItemPriceObject?.sellPriceMinDate || '';

        return {resourcePrices, resourcePricesDates, consumableItemPrice, consumableItemPriceDate};
    }

    prices = this.consumableResourcePrices();

    totalFoodTax = Math.ceil(this.infoTableData.craftedConsumable.foodConsumption * (this.foodTax/100));

    resourcePrices = this.prices.resourcePrices;
    resourcePricesDates = this.prices.resourcePricesDates;
    consumableItemPrice = Math.floor(this.prices.consumableItemPrice - (this.prices.consumableItemPrice * 0.065)) || this.infoTableStrings.noData;
    consumableItemPriceDate = this.prices.consumableItemPriceDate;

    resourcePricesCalculation = () => {
        const {consumableResourcesKeys, infoTableData, percent, consumablesNames, selectedLanguage, resourcePrices, enchantment, consumableItemPrice, totalFoodTax, resourcePricesDates} = this;
        const {craftedConsumable} = infoTableData;

        const resourcesPricesTitle: string[] = [];
        let totalCost: number = totalFoodTax;

        consumableResourcesKeys?.map(key => {
            if (!enchantment && (key.includes('FISHSAUCE') || key.includes('ALCHEMY_EXTRACT'))) return;

            const resourcePricesKey = (!key.includes('FISHSAUCE') && !key.includes('ALCHEMY_EXTRACT')) ? key : `${key}${enchantment}`;

            const totalQuantity = (key.includes('QUESTITEM_TOKEN_AVALON') || key.includes('ALCHEMY_RARE')) ? +craftedConsumable[key] : (+craftedConsumable[key] - +craftedConsumable[key] * percent / 100);
            const totalItemCost = Math.floor(resourcePrices[resourcePricesKey] * totalQuantity);

            resourcesPricesTitle.push(`${consumablesNames?.[resourcePricesKey]?.[selectedLanguage] || 'err'}: ${resourcePrices[resourcePricesKey]?.toLocaleString('en')} * ${totalQuantity?.toLocaleString('en')} = ${totalItemCost?.toLocaleString('en')} ${this.getTime(resourcePricesDates[resourcePricesKey])}<hr><br>`);
            totalCost += totalItemCost;
        })

        const profitPerItem = (+consumableItemPrice * craftedConsumable.amountCrafted - totalCost) || this.infoTableStrings.noData;
        const profitPerItemTitle = `${consumableItemPrice.toLocaleString('en')} * ${craftedConsumable.amountCrafted} - ${totalCost.toLocaleString('en')} = ${profitPerItem.toLocaleString('en')}`;
        const totalProfit = +profitPerItem * infoTableData.quantity;

        return {
            resourcesPricesTitle: resourcesPricesTitle.join(''),
            profitPerItemTitle,
            profitPerItem,
            totalProfit
        }
    }

    itemPriceTitle = `${this.consumablesNames![this.infoTableData.craftedConsumable.itemId][this.selectedLanguage]}: ${this.consumableItemPrice.toLocaleString('en')} ${this.getTime(this.consumableItemPriceDate)}`;
    foodTaxTitle = `${this.infoTableStrings.tax} ${this.totalFoodTax}`;

    resourcesPricesTitle = this.resourcePricesCalculation().resourcesPricesTitle;
    profitPerItem = this.resourcePricesCalculation().profitPerItem || this.infoTableStrings.noData;
    totalProfit = this.resourcePricesCalculation().totalProfit || this.infoTableStrings.noData;
    profitPerItemTitle = `${this.infoTableStrings.profitPerItem} ${this.resourcePricesCalculation().profitPerItemTitle}`;

    totalProfitTitle = `${this.infoTableStrings.total} ${this.profitPerItem} * ${this.infoTableData.quantity} = ${this.totalProfit.toLocaleString('en')}`;
    title = `${this.foodTaxTitle}<hr><br>
             ${this.itemPriceTitle}<hr><br>
             ${this.resourcesPricesTitle}
             ${this.profitPerItemTitle}<hr><br>
             ${this.totalProfitTitle}<hr><br>`;
}