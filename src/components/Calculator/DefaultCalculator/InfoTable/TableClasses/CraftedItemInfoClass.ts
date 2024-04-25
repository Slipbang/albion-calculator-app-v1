import {IItemsData, TCities} from "../../../../../types/InfoTableTypes";
import {materials} from "../../../../../store/Items/materials";
import {TArtefactName, TOwnPriceStates, TSelectedCityStates} from "../InfoTable";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../../types/languageTypes";
import {UtilsMethodsClass} from "./UtilsMethodsClass";
import {IInfoTableData} from "../../../../../types/defaultCalculatorTypes";

export class CraftedItemInfoClass extends UtilsMethodsClass{
    constructor(
        public city: TCities,
        public enchantment: string,
        public itemData: IInfoTableData | undefined,
        public artefactName: TArtefactName,
        public selectedLanguage: TSelectedLanguage,
        public infoTableStrings: ISelectedLanguage['infoTableStrings'],
        public materialsData: IItemsData[] | undefined,
        public itemsData: IItemsData[] | undefined,
        public artefactsData: IItemsData[] | undefined,
        public journalsData: IItemsData[] | undefined,
        public foodTax: number,
        public ownPrices: TOwnPriceStates,
        public selectedCities: TSelectedCityStates,
        public isJournalsUsed: boolean,
        public currentDate: Date,
    ) {
        super(currentDate);
    }

    test = () => {
        const {} = this.itemData!;
    }

    itemTierNum = +this.itemData!.tier!.split('T')[1];

    subMatsTier = (!!this.itemData!.resourceId) ? `T${this.itemTierNum - 1}` : this!.itemData!.tier;

    mainMatsName = materials.find(elem => elem.itemId === this.itemData!.mainMatsId)!.itemName?.[this.selectedLanguage];

    subMatsName = materials.find(elem => elem.itemId === this.itemData!.subMatsId)?.itemName?.[this.selectedLanguage] || '';

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
        const {itemId, resourceId,} = this.itemData!;
        let itemPrice: number;

        if (!!itemId) {
            itemPrice = itemsData?.find(itemElem => itemElem.itemId === this.itemIdWithEnchantment(itemId, enchantment) && itemElem.location === city)?.buyPriceMax || 0;
        }

        if (!!resourceId) {
            itemPrice = materialsData?.find(itemElem => itemElem.itemId === this.itemIdWithEnchantment(resourceId, enchantment) && itemElem.location === city)?.buyPriceMax! * multiplication || 0;
        }
        return Math.round((itemPrice! - itemPrice! * 0.065)) || infoTableStrings.noData;
    }

    totalFoodFee = Math.ceil((this.itemData!.foodConsumption * (Math.pow(2, this.itemTierNum - 4)) + (this.itemData!.defaultFoodConsumption! * Math.pow(2, this.itemTierNum - 4) * (Math.pow(2, +this.enchantment) - 1))) * (this.foodTax / 100));

    mainMaterialId = this.enchantment === '' ? this.itemData!.mainMatsId : `${this.itemData!.mainMatsId}_LEVEL${this.enchantment}@${this.enchantment}`;
    mainMaterialPrice: number = this.getMatPrice(this.mainMaterialId!, this.selectedCities.mainMaterialCity) || 0;

    get subMaterialId() {
        const {enchantment} = this;
        const {subMatsId, resourceId, itemId} = this.itemData!;

        if (!!itemId) {
            return enchantment === '' ? subMatsId : `${subMatsId}_LEVEL${enchantment}@${enchantment}`;
        }
        if (!!resourceId) {
            return (enchantment === '' || subMatsId!.includes('STONEBLOCK') || subMatsId!.includes('T3')) ? subMatsId : `${subMatsId}_LEVEL${enchantment}@${enchantment}`;
        }
    }

    subMaterialPrice: number = this.getMatPrice?.(this.subMaterialId!, this.selectedCities.subMaterialCity);

    get itemPriceDate() {
        const {enchantment, city, itemsData, materialsData} = this;
        const {resourceId, itemId} = this.itemData!;

        if (!!itemId && !resourceId) {
            return itemsData?.find(item => item.itemId === this.itemIdWithEnchantment(itemId!, enchantment) && item.location === city)?.buyPriceMaxDate || '';
        }

        if (!!resourceId && !itemId) {
            return materialsData?.find(item => item.itemId === this.itemIdWithEnchantment(resourceId!, enchantment) && item.location === city)?.buyPriceMaxDate || '';
        }
    }

    mainMatsPriceDate = this.getSellPriceMinDate(this.mainMaterialId, this.selectedCities.mainMaterialCity) || '';
    subMatsPriceDate = this.getSellPriceMinDate(this.subMaterialId!, this.selectedCities.subMaterialCity) || '';
    artefactPriceDate = this.artefactsData?.find(item => item.itemId === this.itemData!.artefactId && item.location === this.selectedCities.artefactCity)?.sellPriceMinDate || '';

    itemWasUpdate = this.getTime(this.itemPriceDate!);
    mainMatsWasUpdate = this.getTime(this.mainMatsPriceDate);
    subMatsWasUpdate = this.getTime(this.subMatsPriceDate);
    artefactWasUpdate = this.getTime(this.artefactPriceDate);

    artefactPrice = this.ownPrices.artefact.isSelectedOwn ? this.ownPrices.artefact.ownPrice : this.artefactsData?.find(artefact => artefact.location === this.selectedCities.artefactCity)?.sellPriceMin || 0;

    mainMatsPricePerItem = Math.floor(+this.mainMaterialPrice * +this.itemData!.spentQuantityPerItem!.mainMatsQuantity);

    multiplication = (!!this.itemData!.resourceId && this.itemData!.resourceId?.includes('STONEBLOCK') && this.enchantment !== '') ? Math.pow(2, +this.enchantment) : 1;

    subMatsQuantity = +this.itemData!.spentQuantityPerItem!.subMatsQuantity! * this.multiplication;

    subMatsPricePerItem = Math.floor(this.subMaterialPrice * this.subMatsQuantity!) || 0;

    journalPrice = this.ownPrices.journal.isSelectedOwn ? this.ownPrices.journal.ownPrice : this.journalsData?.find(item => item.location === this.selectedCities.journalCity && item.itemId === this.itemData!.journalId)?.sellPriceMin || 0;
    emptyJournalsPrice = this.ownPrices.emptyJournal.isSelectedOwn ? this.ownPrices.emptyJournal.ownPrice : this.journalsData?.find(item => item.location === this.selectedCities.emptyJournalCity && item.itemId === this.itemData!.emptyJournalId)?.buyPriceMax || 0;

    totalJournalsQuantity = +(Math.pow(2, +this.enchantment) * this.itemData!.journalsQuantity!).toFixed(2);
    journalsProfitPerItem = Math.floor((this.journalPrice - this.emptyJournalsPrice) * this.totalJournalsQuantity);

    profitPerItem = typeof this.averageItemPrice === 'number' ? Math.ceil(this.averageItemPrice + (this.isJournalsUsed ? this.journalsProfitPerItem : 0) - (this.mainMatsPricePerItem + this.subMatsPricePerItem! + this.artefactPrice + this.totalFoodFee)) : this.infoTableStrings.noData;
    totalProfit = typeof this.averageItemPrice === 'number' ? (+this.profitPerItem * this.itemData!.output) : this.infoTableStrings.noData;

    enchantmentString(id: string) {
        const {enchantment} = this;

        return (!!enchantment && (!id?.includes('STONEBLOCK') && !id?.includes('T3'))) ? `.${enchantment}` : ``;
    }

    units = (this.itemData!.resourceId?.includes('STONEBLOCK') && this.enchantment !== '') ? ` (${Math.pow(2, +this.enchantment)}${this.infoTableStrings.un})` : '';
    journalsQuantityString = `${this.infoTableStrings.journalQuantity} ${this.totalJournalsQuantity}`;
    journalsProfitPerItemSting = `${this.infoTableStrings.journalProfit} (${this.journalPrice} - ${this.emptyJournalsPrice}) * ${this.totalJournalsQuantity} = ${this.journalsProfitPerItem}`;
    itemTitleString = `${this.itemData!.tier}${this.enchantmentString(this.itemData!.itemId! || this.itemData!.resourceId!)} ${this.itemData!.itemName![this.selectedLanguage]}(-6.5%):  ${this.averageItemPrice?.toLocaleString('en')}${this.units} ${this.itemWasUpdate}`;
    mainMatsTitleString = `${this.itemData!.tier}${this.enchantmentString(this.itemData!.mainMatsId)} ${this.mainMatsName}: ${this.itemData!.spentQuantityPerItem!.mainMatsQuantity} * ${this.mainMaterialPrice} = ${this.mainMatsPricePerItem.toLocaleString('en')} ${this.mainMatsWasUpdate}`;
    totalFoodFeeSting = `${this.infoTableStrings.taxPerOneItem} ${this.totalFoodFee}`;
    subMatsTitleString = `${this.subMatsTier}${this.enchantmentString(this.itemData!.subMatsId!)} ${this.subMatsName}: ${this.subMatsQuantity} * ${this.subMaterialPrice} = ${this.subMatsPricePerItem?.toLocaleString('en')} ${this.subMatsWasUpdate}`;
    artefactString = `${this.itemData!.tier} ${this.artefactName?.[this.selectedLanguage]}: ${this.artefactPrice.toLocaleString('en')} ${this.artefactWasUpdate}`;
    profitPerItemTitle = `${this.infoTableStrings.profitPerItem} ${this.averageItemPrice?.toLocaleString('en')}${this.isJournalsUsed ? ` + ${this.journalsProfitPerItem}` : ''} - (${this.mainMatsPricePerItem.toLocaleString('en')} ${!!this.itemData!.subMatsId ? `+ ${this.subMatsPricePerItem!.toLocaleString('en')}` : ''}${this.totalFoodFee ? ` + ${this.totalFoodFee.toLocaleString('en')}` : ''}${!!this.itemData!.artefactId ? ` + ${this.artefactPrice.toLocaleString('en')}` : ''}) = ${this.profitPerItem.toLocaleString('en')}`;
    totalProfitTitle = `${this.infoTableStrings.total} ${this.itemData!.output} * ${this.profitPerItem.toLocaleString('en')} = ${this.totalProfit.toLocaleString('en')}`;

    title = `${this.totalFoodFeeSting}<hr><br>
             ${this.isJournalsUsed ? `${this.journalsQuantityString}<hr><br>` : ''}
             ${this.itemTitleString}<hr><br>
             ${this.isJournalsUsed ? `${this.journalsProfitPerItemSting}<hr><br>` : ''}
             ${this.mainMatsTitleString}<hr><br>
             ${!!this.subMatsName ? `${this.subMatsTitleString}<hr><br>` : ''}
             ${!!this.itemData!.artefactId ? `${this.artefactString}<hr><br>` : ''}
             ${this.profitPerItemTitle}<hr><br>
             ${this.totalProfitTitle}<hr>`;
}