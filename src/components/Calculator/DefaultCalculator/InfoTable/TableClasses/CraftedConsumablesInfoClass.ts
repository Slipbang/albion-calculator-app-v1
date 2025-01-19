import {IItemsData, TCities} from "../../../../../types/InfoTableTypes";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../../types/languageTypes";
import {TConsumablesSelectors} from "../InfoTable";
import {UtilsMethodsClass} from "./UtilsMethodsClass";
import {IConsumableTableData} from "../../../../../types/defaultCalculatorTypes";
import {TConsumableNames} from "../../../../../types/ConsumableNamesType";

export class CraftedConsumablesInfoClass extends UtilsMethodsClass{
    public city!: TCities;
    public enchantment!: string;
    public infoTableData!: IConsumableTableData;
    public consumableResourcesData: IItemsData[] | undefined;
    public consumableResourcesKeys: string[] | undefined;
    public selectedLanguage!: TSelectedLanguage;
    public consumablesNames: TConsumableNames | undefined = undefined;
    public infoTableStrings!: ISelectedLanguage['infoTableStrings'];
    public consumableSelectors: TConsumablesSelectors | undefined;
    public foodTax!: number;

    constructor(
        city: TCities,
        enchantment: string,
        infoTableData: IConsumableTableData,
        consumableResourcesData: IItemsData[] | undefined,
        consumableResourcesKeys: string[] | undefined,
        selectedLanguage: TSelectedLanguage,
        consumablesNames: TConsumableNames | undefined,
        infoTableStrings: ISelectedLanguage['infoTableStrings'],
        consumableSelectors: TConsumablesSelectors | undefined,
        foodTax: number,
        currentDate: Date,
    ) {
        super(currentDate);

        this.city = city;
        this.enchantment = enchantment;
        this.infoTableData = infoTableData;
        this.consumableResourcesData = consumableResourcesData;
        this.consumableResourcesKeys = consumableResourcesKeys;
        this.selectedLanguage = selectedLanguage;
        this.consumablesNames = consumablesNames;
        this.infoTableStrings = infoTableStrings;
        this.consumableSelectors = consumableSelectors;
        this.foodTax = foodTax;
        this.currentDate = currentDate;
    }
    get percent() {
        return this.infoTableData.percent;
    }
    get consumableItemId() {
        return `${this.infoTableData?.craftedConsumable.itemId}${!!this.enchantment ? `@${this.enchantment}` : ''}`;
    }

    consumableResourcePrices = () => {
        const {consumableResourcesKeys, consumableResourcesData,enchantment} = this;

        const resourcePrices: {[key: string]: number} = {};
        const resourcePricesDates: {[key: string]: string} = {};

        consumableResourcesKeys!.forEach(key => {
            const resourcePricesKey = (!key.includes('FISHSAUCE') && !key.includes('ALCHEMY_EXTRACT')) ? key : `${key}${enchantment}`;
            const consumableResourceDataObject = !!consumableResourcesData ? consumableResourcesData.find(item => item.itemId === resourcePricesKey && item.location === this.consumableSelectors![resourcePricesKey]) : undefined;
            resourcePrices[resourcePricesKey] = consumableResourceDataObject?.sellPriceMin || 0;
            resourcePricesDates[resourcePricesKey] = consumableResourceDataObject?.sellPriceMinDate || '';
        })

        const consumableItemPriceObject = !!consumableResourcesData ? consumableResourcesData.find(item => item.itemId === this.consumableItemId && item.location === this.city) : undefined;
        const consumableItemPrice = consumableItemPriceObject?.sellPriceMin || 0;
        const consumableItemPriceDate = consumableItemPriceObject?.sellPriceMinDate || '';

        return {resourcePrices, resourcePricesDates, consumableItemPrice, consumableItemPriceDate};
    }

    customLocaleString(value: number | string) {
        return typeof value === 'number' ? value.toLocaleString('en') : value;
    }

    get prices() {
        return this.consumableResourcePrices();
    }

    get totalFoodTax() {
        return Math.ceil(this.infoTableData.craftedConsumable.foodConsumption * (this.foodTax/100));
    }

    get resourcePrices() {
        return this.prices.resourcePrices;
    }
    get resourcePricesDates() {
        return this.prices.resourcePricesDates;
    }
    get consumableItemPrice() {
        return Math.floor(this.prices.consumableItemPrice - (this.prices.consumableItemPrice * 0.065)) || this.infoTableStrings.noData;
    }
    get consumableItemPriceDate() {
        return this.prices.consumableItemPriceDate;
    }

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
        const profitPerItemTitle = `${this.customLocaleString(consumableItemPrice)} * ${craftedConsumable.amountCrafted} - ${totalCost.toLocaleString('en')} = ${this.customLocaleString(profitPerItem)}`;
        const totalProfit = +profitPerItem * infoTableData.quantity;

        return {
            resourcesPricesTitle: resourcesPricesTitle.join(''),
            profitPerItemTitle,
            profitPerItem,
            totalProfit
        }
    }

    get itemPriceTitle() {
        return `${this.consumablesNames![this.infoTableData.craftedConsumable.itemId][this.selectedLanguage]}: ${this.customLocaleString(this.consumableItemPrice)} ${this.getTime(this.consumableItemPriceDate)}`;
    }
    get foodTaxTitle() {
        return `${this.infoTableStrings.tax} ${this.totalFoodTax}`;
    }

    get resourcesPricesTitle() {
        return this.resourcePricesCalculation().resourcesPricesTitle;
    }
    get profitPerItem() {
        return this.resourcePricesCalculation().profitPerItem || this.infoTableStrings.noData;
    }
    get totalProfit() {
        return this.resourcePricesCalculation().totalProfit || this.infoTableStrings.noData;
    }
    get profitPerItemTitle() {
        return `${this.infoTableStrings.profitPerItem} ${this.resourcePricesCalculation().profitPerItemTitle}`;
    }

    get totalProfitTitle() {
        return `${this.infoTableStrings.total} ${this.profitPerItem} * ${this.infoTableData.quantity} = ${this.customLocaleString(this.totalProfit)}`;
    }
    get title() {
        return `${this.foodTaxTitle}<hr><br>
             ${this.itemPriceTitle}<hr><br>
             ${this.resourcesPricesTitle}
             ${this.profitPerItemTitle}<hr><br>
             ${this.totalProfitTitle}<hr><br>`;
    }
}