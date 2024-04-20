import {TCalcProps} from "./calculatorPropsType";

interface ICalculatorFormStrings {
    craftHeader: {
        [key in TCalcProps]: string;
    }
    metrics: string;
    labelResourceAmount: string;
    labelItemsAmount: string;
    labelOwnPercent: string;
    labelPercent: string;
    percentError: string;
    amountError: string;
    type: string;
    materialsOutput: string;
    itemsOutput: string;
    itemTier: string;
    craftListHeader: string;
    subMaterialsQuantity: string;
    copied: string;
    total: string;
}

interface IInfoTableStrings {
    profitPerItem: string;
    total: string;
    noData: string;
    from: string;
    saleIn: string;
    item: string;
    un: string;
    tax: string;
    taxLabel: string;
    taxPerOneItem: string;
    journalLabel: string;
    buyJournals: string;
    sellJournals: string;
    journalQuantity: string;
    journalProfit: string;
    errorNotification: string;
    multipleCities: string;
    resourcesFrom: string;
}

interface ITransportationFormStrings {
    server: string;
    from: string;
    albionWest: string;
    albionEast: string;
    into: string;
    sortBy: string;
    percentageProfit: string;
    silverProfit: string;
    profitVolume: string;
    sortByLastChecked: string;
}

interface ICraftTableStrings {
    metrics: string;
    materialQuant: string;
    subMatsQuant: string;
    returnPercentage: string;
    itemsOutput: string;
    deleteButton: string;
    materialsOutput: string;
    materialTier: string;
    resQuant: string;
    alert: string;
    unPerItem: string;
}

interface IArtefactsStrings {
    sortLabel: string;
    itemValueDescendingSelector: string;
    itemValueAscendingSelector: string;
    itemValueTitle: string;
    copyState: string;
    resetButtonTitle: string;
    value: string;
    city: string;
    price: string;
    getArtefactsPrice: string,
    resetAllMarkers: string,
    artefactsTier: string,
}

interface ITransportationTableStrings {
    requestError: string;
    item: string;
    itemName: string;
    excludingTax: string;
    profit: string;
    percentageProfit: string;
    dailyTurnover: string;
    copyAlert: string;
    unPerDay: string;

}

interface IBackpackString {
    gatherButton: string;
    sortButton: string;
    iconTitle: string;
}

interface IMarketItemStings {
    ownPriceLabel: string;
    actionLabel: string;
    sell: string;
    buy: string;
    amountLabel: string;
    priceLabel: string;
    totalPriceLabel: string;
    tax: string;
}
interface IMarketMenuStrings {
    marketHeader: string;
    sell: string;
    buy: string;
    alert: string;
    search: string;
}

interface IGMItemSelectorStings {
    dialogText: string;
    nutritionUsage1: string;
    nutritionUsage2: string;
    search: string,
}

interface IGMCraftingFormStrings {
    journalUsageButton: string;
    price: string;
    quantity: string;
    journalInfoIconText: string;
    enchantment: string;
    returnRateLabel: string;
    resourceLabel: string;
    artefactLabel: string;
    artefactInfoIconText: string;
    totalPriceLabel: string;
    foodTaxInfoIconText: string;
}

interface IHeaderStrings {
    server: string;
    language: string;
}

interface INotFoundStings {
    notFound: string;
    returnTitle: string;
}

interface IHomeStrings {
    artefacts: string;
    craftCalculator: string;
    transportation: string;
    artefactsDescription: string;
    craftCalculatorDescription: string;
    transportationDescription: string;
    language: string;
}

interface IFAQStrings {
    description1: string;
    description2: string;
    description3: string;
}

export interface ISelectedLanguage {
    craftTableStrings: ICraftTableStrings;
    calculatorFormStrings: ICalculatorFormStrings;
    infoTableStrings: IInfoTableStrings;
    artefactsStrings: IArtefactsStrings;
    transportationFormStrings: ITransportationFormStrings;
    transportationTableStrings: ITransportationTableStrings;
    backpackString: IBackpackString;
    marketItemStings: IMarketItemStings;
    marketMenuStrings: IMarketMenuStrings;
    GMItemSelectorStings: IGMItemSelectorStings;
    GMCraftingFormStrings: IGMCraftingFormStrings;
    headerStrings: IHeaderStrings;
    notFoundStings: INotFoundStings;
    homeStrings: IHomeStrings;
    FAQStrings: IFAQStrings;
}

export type TSelectedLanguage = 'ru' | 'en';

export type TLanguage = {
    [key in TSelectedLanguage]: ISelectedLanguage;
}
