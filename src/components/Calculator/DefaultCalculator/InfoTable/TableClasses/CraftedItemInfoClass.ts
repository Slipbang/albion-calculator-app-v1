import {IItemsData, TCities} from "../../../../../types/InfoTableTypes";
import {TOwnPriceStates, TSelectedCityStates} from "../InfoTable";
import {ISelectedLanguage, TLanguageData, TSelectedLanguage} from "../../../../../types/languageTypes";
import {UtilsMethodsClass} from "./UtilsMethodsClass";
import {IInfoTableData} from "../../../../../types/defaultCalculatorTypes";
import {ICraftItem} from "../../../../../types/craftItemsType";

export class CraftedItemInfoClass extends UtilsMethodsClass{
    public city!: TCities;
    public enchantment!: string;
    public itemData: IInfoTableData | undefined = undefined;
    public selectedLanguage!: TSelectedLanguage;
    public infoTableStrings!: ISelectedLanguage['infoTableStrings'];
    public materialsData: IItemsData[] | undefined = undefined;
    public itemsData: IItemsData[] | undefined = undefined;
    public artefactsData: IItemsData[] | undefined = undefined;
    public journalsData: IItemsData[] | undefined = undefined;
    public foodTax!: number;
    public ownPrices!: TOwnPriceStates;
    public selectedCities!: TSelectedCityStates;
    public isJournalsUsed!: boolean;
    public quality!: number;
    public materials!: ICraftItem[];
    public languageData!: TLanguageData;

    constructor(
        city: TCities,
        enchantment: string,
        itemData: IInfoTableData | undefined,
        selectedLanguage: TSelectedLanguage,
        infoTableStrings: ISelectedLanguage['infoTableStrings'],
        materialsData: IItemsData[] | undefined,
        itemsData: IItemsData[] | undefined,
        artefactsData: IItemsData[] | undefined,
        journalsData: IItemsData[] | undefined,
        foodTax: number,
        ownPrices: TOwnPriceStates,
        selectedCities: TSelectedCityStates,
        isJournalsUsed: boolean,
        currentDate: Date,
        quality: number,
        materials: ICraftItem[],
        languageData: TLanguageData,
    ) {
        super(currentDate);
        this.city = city;
        this.enchantment = enchantment;
        this.itemData = itemData;
        this.selectedLanguage = selectedLanguage;
        this.infoTableStrings = infoTableStrings;
        this.materialsData = materialsData;
        this.itemsData = itemsData;
        this.artefactsData = artefactsData;
        this.journalsData = journalsData;
        this.foodTax = foodTax;
        this.ownPrices = ownPrices;
        this.selectedCities = selectedCities;
        this.isJournalsUsed = isJournalsUsed;
        this.currentDate = currentDate;
        this.quality = quality;
        this.materials = materials;
        this.languageData = languageData;
    }

    get itemTierNum() {
        return +this.itemData?.tier?.split('T')[1]!;
    }

    get subMatsTier() {
        return (!!this.itemData?.resourceId) ? `T${this.itemTierNum - 1}` : this!.itemData?.tier;
    }

    get itemName() {
        if (this.itemData?.itemId) {
            return this.languageData[this.itemData?.itemId];
        } else {
            return {
                ru: 'no item name fetched',
                en: 'no item name fetched'
            };
        }
    }
    get mainMatsName() {
        if (this.itemData?.mainMatsId && this.selectedLanguage) {
            return this.languageData[this.itemData?.mainMatsId]?.[this.selectedLanguage];
        } else {
            return {
                ru: 'no main material name fetched',
                en: 'no main material name fetched'
            };
        }
    }
    get subMatsName() {

        if (this.itemData?.subMatsId && this.selectedLanguage) {
            return this.languageData[this.itemData?.subMatsId]?.[this.selectedLanguage];
        } else {
            return {
                ru: 'no name fetched',
                en: 'no name fetched'
            };
        }
    }
    get artefactName() {
        if (this.itemData?.artefactId && this.selectedLanguage) {
            return this.languageData[this.itemData?.artefactId]?.[this.selectedLanguage] || '';
        } else {
            return {
                ru: 'no artifact name fetched',
                en: 'no artifact name fetched',
            };
        }
    }

    getMatPrice = (itemId: string, selectedCity: TCities) => {
        return this.materialsData?.find(matItem => matItem.itemId === itemId && matItem.location === selectedCity)?.sellPriceMin || 0;
    }

    itemIdWithEnchantment(id: string, enchantment: string) {
        const {itemId, resourceId} = this.itemData!;

        if (!!itemId) {
            return enchantment === '' ? id : `${id}@${enchantment}`;
        }

        if (!!resourceId) {
            return (enchantment === '' || id?.includes('STONEBLOCK')) ? id : `${id}_LEVEL${enchantment}@${enchantment}`;
        }
    }

    getSellPriceMinDate = (itemId: string, selectedCity: TCities) => {
        return this.materialsData?.find(matItem => matItem.itemId === itemId && matItem.location === selectedCity)?.sellPriceMinDate || 0;
    }

    get averageItemPrice() {
        const {multiplication, itemsData, materialsData, enchantment, city, infoTableStrings} = this;
        let itemPrice: number;

        if (!!this.itemData?.itemId) {
            itemPrice = itemsData?.find(itemElem => itemElem.itemId === this.itemIdWithEnchantment(this.itemData!.itemId!, enchantment) && itemElem.location === city && itemElem.quality === this.quality)?.buyPriceMax || 0;
        }

        if (!!this.itemData?.resourceId) {
            itemPrice = materialsData?.find(itemElem => itemElem.itemId === this.itemIdWithEnchantment(this.itemData!.resourceId!, enchantment) && itemElem.location === city)?.buyPriceMax! * multiplication || 0;
        }
        return Math.round((itemPrice! - itemPrice! * 0.065)) || infoTableStrings?.noData;
    }

    get totalFoodFee() {
        return Math.ceil(((this.itemData?.foodConsumption || 0) * (Math.pow(2, this.itemTierNum - 4)) + ((this.itemData?.defaultFoodConsumption || 0) * Math.pow(2, this.itemTierNum - 4) * (Math.pow(2, +this.enchantment) - 1))) * (this.foodTax / 100));
    }
    get mainMaterialId() {
        return this.enchantment === '' ? this.itemData?.mainMatsId : `${this.itemData?.mainMatsId}_LEVEL${this.enchantment}@${this.enchantment}`;
    }
    get mainMaterialPrice(): number {
        return  this.getMatPrice(this.mainMaterialId!, this.selectedCities?.mainMaterialCity) || 0;
    }

    get subMaterialId() {
        const {enchantment} = this;

        if (!!this.itemData?.itemId) {
            return enchantment === '' ? this.itemData.subMatsId : `${this.itemData.subMatsId}_LEVEL${enchantment}@${enchantment}`;
        }
        if (!!this.itemData?.resourceId) {
            return (enchantment === '' || this.itemData.subMatsId!.includes('STONEBLOCK') || this.itemData.subMatsId!.includes('T3')) ? this.itemData.subMatsId : `${this.itemData.subMatsId}_LEVEL${enchantment}@${enchantment}`;
        }
    }

    get subMaterialPrice(): number {
        return this.getMatPrice?.(this.subMaterialId!, this.selectedCities?.subMaterialCity);
    }

    get itemPriceDate() {
        const {enchantment, city, itemsData, materialsData} = this;

        if (!!this.itemData?.itemId && !this.itemData?.resourceId) {
            return itemsData?.find(item => item.itemId === this.itemIdWithEnchantment(this.itemData!.itemId!, enchantment) && item.location === city)?.buyPriceMaxDate || '';
        }

        if (!!this.itemData?.resourceId && !this.itemData?.itemId) {
            return materialsData?.find(item => item.itemId === this.itemIdWithEnchantment(this.itemData!.resourceId!, enchantment) && item.location === city)?.buyPriceMaxDate || '';
        }
    }

    get mainMatsPriceDate() {
        return this.getSellPriceMinDate(this.mainMaterialId || '', this.selectedCities?.mainMaterialCity) || '';
    }
    get subMatsPriceDate() {
        return this.getSellPriceMinDate(this.subMaterialId!, this.selectedCities?.subMaterialCity) || '';
    }
    get artefactPriceDate() {
        return this.artefactsData?.find(item => item.itemId === this.itemData?.artefactId && item.location === this.selectedCities.artefactCity)?.sellPriceMinDate || '';
    }

    get itemWasUpdate() {
        return this.getTime(this.itemPriceDate || '');
    }
    get mainMatsWasUpdate() {
        return this.getTime(this.mainMatsPriceDate);
    }
    get subMatsWasUpdate() {
        return this.getTime(this.subMatsPriceDate);
    }
    get artefactWasUpdate() {
        return this.getTime(this.artefactPriceDate);
    }

    get artefactPrice() {
        return this.ownPrices?.artefact?.isSelectedOwn ? this.ownPrices?.artefact?.ownPrice : this.artefactsData?.find(artefact => artefact.location === this.selectedCities.artefactCity)?.sellPriceMin || 0;
    }

    get mainMatsPricePerItem() {
        return Math.floor(+this.mainMaterialPrice * +(this.itemData?.spentQuantityPerItem?.mainMatsQuantity || 0));
    }

    get multiplication() {
        return  (!!this.itemData?.resourceId && this.itemData?.resourceId?.includes('STONEBLOCK') && this.enchantment !== '') ? Math.pow(2, +this.enchantment) : 1;
    }

    get subMatsQuantity() {
        return +(this.itemData?.spentQuantityPerItem?.subMatsQuantity || 0) * this.multiplication;
    }

    get subMatsPricePerItem() {
        return Math.floor(this.subMaterialPrice * this.subMatsQuantity!) || 0;
    }

    get journalPrice() {
        return this.ownPrices?.journal.isSelectedOwn ? this.ownPrices?.journal.ownPrice : this.journalsData?.find(item => item.location === this.selectedCities.journalCity && item.itemId === this.itemData!.journalId)?.sellPriceMin || 0;
    }
    get emptyJournalsPrice() {
        return this.ownPrices?.emptyJournal.isSelectedOwn ? this.ownPrices?.emptyJournal.ownPrice : this.journalsData?.find(item => item.location === this.selectedCities?.emptyJournalCity && item.itemId === this.itemData?.emptyJournalId)?.buyPriceMax || 0;
    }

    get totalJournalsQuantity() {
        return +(Math.pow(2, +this.enchantment) * this.itemData?.journalsQuantity!).toFixed(2);
    }
    get journalsProfitPerItem() {
        return Math.floor((this.journalPrice - this.emptyJournalsPrice) * this.totalJournalsQuantity);
    }

    get profitPerItem() {
        return typeof this.averageItemPrice === 'number' ? Math.ceil(this.averageItemPrice + (this.isJournalsUsed ? this.journalsProfitPerItem : 0) - (this.mainMatsPricePerItem + this.subMatsPricePerItem! + this.artefactPrice + this.totalFoodFee)) : this.infoTableStrings?.noData;
    }
    get totalProfit() {
        return typeof this.averageItemPrice === 'number' ? (+this.profitPerItem * this.itemData!.output) : this.infoTableStrings?.noData;
    }

    enchantmentString(id: string) {
        const {enchantment} = this;

        return (!!enchantment && (!id?.includes('STONEBLOCK') && !id?.includes('T3'))) ? `.${enchantment}` : ``;
    }

    get units() {
        return (this.itemData?.resourceId?.includes('STONEBLOCK') && this.enchantment !== '') ? ` (${Math.pow(2, +this.enchantment)}${this.infoTableStrings.un})` : '';
    }
    get journalsQuantityString() {
        return `${this.infoTableStrings?.journalQuantity} ${this.totalJournalsQuantity}`;
    }
    get journalsProfitPerItemSting() {
        return `${this.infoTableStrings?.journalProfit} (${this.journalPrice} - ${this.emptyJournalsPrice}) * ${this.totalJournalsQuantity} = ${this.journalsProfitPerItem}`;
    }
    get itemTitleString() {
        return `${this.itemData?.tier}${this.enchantmentString(this.itemData?.itemId! || this.itemData?.resourceId || '')} ${this.itemName?.[this.selectedLanguage]}(-6.5%):  ${this.averageItemPrice?.toLocaleString('en')}${this.units} ${this.itemWasUpdate}`;
    }
    get mainMatsTitleString() {
        return `${this.itemData?.tier}${this.enchantmentString(this.itemData?.mainMatsId || '')} ${this.mainMatsName}: ${this.itemData?.spentQuantityPerItem?.mainMatsQuantity} * ${this.mainMaterialPrice} = ${this.mainMatsPricePerItem?.toLocaleString('en')} ${this.mainMatsWasUpdate}`;
    }
    get totalFoodFeeSting() {
        return `${this.infoTableStrings?.taxPerOneItem} ${this.totalFoodFee}`;
    }
    get subMatsTitleString() {
        return `${this.subMatsTier}${this.enchantmentString(this.itemData?.subMatsId || '')} ${this.subMatsName}: ${this.subMatsQuantity} * ${this.subMaterialPrice} = ${this.subMatsPricePerItem?.toLocaleString('en')} ${this.subMatsWasUpdate}`;
    }
    get artefactString() {
        return `${this.itemData?.tier} ${this.artefactName}: ${this.artefactPrice?.toLocaleString('en')} ${this.artefactWasUpdate}`;
    }
    get profitPerItemTitle() {
        return `${this.infoTableStrings?.profitPerItem} ${this.averageItemPrice?.toLocaleString('en')}${this.isJournalsUsed ? ` + ${this.journalsProfitPerItem}` : ''} - (${this.mainMatsPricePerItem?.toLocaleString('en')} ${!!this.itemData?.subMatsId ? `+ ${this.subMatsPricePerItem?.toLocaleString('en')}` : ''}${this.totalFoodFee ? ` + ${this.totalFoodFee?.toLocaleString('en')}` : ''}${!!this.itemData?.artefactId ? ` + ${this.artefactPrice?.toLocaleString('en')}` : ''}) = ${this.profitPerItem?.toLocaleString('en')}`;
    }
    get totalProfitTitle() {
        return `${this.infoTableStrings?.total} ${this.itemData?.output} * ${this.profitPerItem?.toLocaleString('en')} = ${this.totalProfit}`;
    }

    get title() {
        return `<div>${this.totalFoodFeeSting}</div><hr>
             ${this.isJournalsUsed ? `<div>${this.journalsQuantityString}<div><hr>` : ''}
             <div>${this.itemTitleString}</div><hr>
             ${this.isJournalsUsed ? `<div>${this.journalsProfitPerItemSting}</div><hr>` : ''}
             <div>${this.mainMatsTitleString}</div><hr>
             ${!!this.subMatsName ? `<div>${this.subMatsTitleString}</div><hr>` : ''}
             ${!!this.itemData?.artefactId ? `<div>${this.artefactString}</div><hr>` : ''}
             <div>${this.profitPerItemTitle}</div><hr>
             <div>${this.totalProfitTitle}</div><hr>`;
    }
}