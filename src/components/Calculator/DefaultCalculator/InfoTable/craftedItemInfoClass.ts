import {IItemsData, TCities} from "../../../../types/InfoTableTypes";
import {materials} from "../../../../store/Items/materials";
import {IOwnPrice, TArtefactName} from "./InfoTable";
import {IItemName, ISpentQuantityPerItem} from "../../../../store/profit/profit-slice";
import {ISelectedLanguage} from "../../../../types/languageTypes";

export class craftedItemInfoClass {
    constructor(public city: TCities,
                public enchantment: string,
                public itemName: IItemName,
                public artefactName: TArtefactName,
                public spentQuantityPerItem: ISpentQuantityPerItem | undefined,
                public selectedLanguage: 'ru' | 'en',
                public itemId: string | undefined,
                public resourceId: string | undefined,
                public artefactId: string | undefined,
                public subMatsId: string | undefined,
                public journalId: string | undefined,
                public emptyJournalId: string | undefined,
                public infoTableStrings: ISelectedLanguage['infoTableStrings'],
                public materialsData: IItemsData[] | undefined,
                public itemsData: IItemsData[] | undefined,
                public artefactsData: IItemsData[] | undefined,
                public journalsData: IItemsData[] | undefined,
                public defaultFoodConsumption: number,
                public mainMatsId: string,
                public output: number,
                public foodTax: number,
                public foodConsumption: number,
                public artefact: IOwnPrice,
                public journal: IOwnPrice,
                public emptyJournal: IOwnPrice,
                public journalsQuantity: number,
                public mainMaterialCity: TCities,
                public artefactCity: TCities,
                public subMaterialCity: TCities,
                public journalCity: TCities,
                public emptyJournalCity: TCities,
                public isJournalsUsed: boolean,
                public tier: string,
                public currentDate: Date,
    ) {
    }

    itemTierNum = +this.tier!.split('T')[1];

    subMatsTier = (!!this.resourceId) ? `T${this.itemTierNum - 1}` : this.tier;

    mainMatsName = materials.find(elem => elem.itemId === this.mainMatsId)!.itemName?.[this.selectedLanguage];

    subMatsName = materials.find(elem => elem.itemId === this.subMatsId)?.itemName?.[this.selectedLanguage] || '';

    getMatPrice = (itemId: string, selectedCity: TCities) => {
        return this.materialsData?.find(matItem => matItem.itemId === itemId && matItem.location === selectedCity)?.buyPriceMax || 0;
    }

    itemIdWithEnchantment(id: string, enchantment: string) {
        const {itemId, resourceId} = this;

        if (!!itemId) {
            return enchantment === '' ? id : `${id}@${enchantment}`;
        }

        if (!!resourceId) {
            return (enchantment === '' || id?.includes('STONEBLOCK')) ? id : `${id}_LEVEL${enchantment}@${enchantment}`;
        }
    }

    getTime = (date: string) => {
        if (date === '1970-01-01T00:00:00.000Z') return ''

        const hours = (this.currentDate.getTime() - Date.parse(date)) / (60 * 60 * 1000);

        return `<span style="color: ${hours <= 5 ? "green" : "red"}">(${hours <= 24 ? `${Math.round(hours) || '<1'}h` : `${Math.round(hours / 24)}d`})</span>`;
    }

    getMaxBuyPriceDate = (itemId: string, selectedCity: TCities) => {
        return this.materialsData?.find(matItem => matItem.itemId === itemId && matItem.location === selectedCity)?.sellPriceMinDate || 0
    }

    get averageItemPrice() {
        const {multiplication, itemsData, materialsData, itemId, resourceId, enchantment, city, infoTableStrings} = this;

        if (!!itemId) {
            return itemsData?.find(itemElem => itemElem.itemId === this.itemIdWithEnchantment(itemId, enchantment) && itemElem.location === city)?.sellPriceMin || infoTableStrings.noData;
        }

        if (!!resourceId) {
            return materialsData?.find(itemElem => itemElem.itemId === this.itemIdWithEnchantment(resourceId, enchantment) && itemElem.location === city)?.sellPriceMin! * multiplication || infoTableStrings.noData;
        }
    }

    totalFoodFee = Math.floor((this.foodConsumption * (Math.pow(2, this.itemTierNum - 4)) + (this.defaultFoodConsumption! * Math.pow(2, this.itemTierNum - 4) * (Math.pow(2, +this.enchantment) - 1))) * (this.foodTax / 100));

    mainMaterialId = this.enchantment === '' ? this.mainMatsId : `${this.mainMatsId}_LEVEL${this.enchantment}@${this.enchantment}`;
    mainMaterialPrice: number = this.getMatPrice(this.mainMaterialId!, this.mainMaterialCity) || 0;

    get subMaterialId() {
        const {enchantment, subMatsId, resourceId, itemId} = this;

        if (!!itemId) {
            return enchantment === '' ? subMatsId : `${subMatsId}_LEVEL${enchantment}@${enchantment}`;
        }
        if (!!resourceId) {
            return (enchantment === '' || subMatsId!.includes('STONEBLOCK') || subMatsId!.includes('T3')) ? subMatsId : `${subMatsId}_LEVEL${enchantment}@${enchantment}`;
        }
    }

    subMaterialPrice: number = this.getMatPrice?.(this.subMaterialId!, this.subMaterialCity);

    get itemSellPriceMinDate () {
        const {resourceId, itemId, enchantment, city, itemsData, materialsData} = this;

        if (!!itemId && !resourceId) {
            return itemsData?.find(item => item.itemId === this.itemIdWithEnchantment(itemId!, enchantment) && item.location === city)?.sellPriceMinDate || '';
        }

        if (!!resourceId && !itemId) {
            return materialsData?.find(item => item.itemId === this.itemIdWithEnchantment(resourceId!, enchantment) && item.location === city)?.sellPriceMinDate || '';
        }
    }

    mainMatsMaxBuyPriceDate = this.getMaxBuyPriceDate(this.mainMaterialId, this.mainMaterialCity) || '';
    subMatsMaxBuyPriceDate = this.getMaxBuyPriceDate(this.subMaterialId!, this.subMaterialCity) || '';
    artefactMaxBuyPriceDate = this.artefactsData?.find(item => item.itemId === this.artefactId && item.location === this.artefactCity)?.buyPriceMaxDate || '';

    itemWasUpdate = this.getTime(this.itemSellPriceMinDate!);
    mainMatsWasUpdate = this.getTime(this.mainMatsMaxBuyPriceDate);
    subMatsWasUpdate = this.getTime(this.subMatsMaxBuyPriceDate);
    artefactWasUpdate = this.getTime(this.artefactMaxBuyPriceDate);

    artefactPrice = this.artefact.isSelectedOwn ? this.artefact.ownPrice : this.artefactsData?.find(artefact => artefact.location === this.artefactCity)?.sellPriceMin || 0;

    mainMatsPricePerItem = Math.floor(+this.mainMaterialPrice * +this.spentQuantityPerItem!.mainMatsQuantity);

    multiplication = (!!this.resourceId && this.resourceId?.includes('STONEBLOCK') && this.enchantment !== '') ? Math.pow(2, +this.enchantment) : 1

    subMatsQuantity = +this.spentQuantityPerItem!.subMatsQuantity! * this.multiplication;

    subMatsPricePerItem = Math.floor(this.subMaterialPrice * this.subMatsQuantity!) || 0;

    journalPrice = this.journal.isSelectedOwn ? this.journal.ownPrice : this.journalsData?.find(item => item.location === this.journalCity && item.itemId === this.journalId)?.sellPriceMin || 0;
    emptyJournalsPrice = this.emptyJournal.isSelectedOwn ? this.emptyJournal.ownPrice : this.journalsData?.find(item => item.location === this.emptyJournalCity && item.itemId === this.emptyJournalId)?.buyPriceMax || 0;

    totalJournalsQuantity = +(Math.pow(2, +this.enchantment) * this.journalsQuantity!).toFixed(2);
    journalsProfitPerItem = Math.floor((this.journalPrice - this.emptyJournalsPrice) * this.totalJournalsQuantity);

    profitPerItem = typeof this.averageItemPrice === 'number' ? Math.ceil(this.averageItemPrice + (this.isJournalsUsed ? this.journalsProfitPerItem : 0) - (this.mainMatsPricePerItem + this.subMatsPricePerItem! + this.artefactPrice + this.totalFoodFee)) : this.infoTableStrings.noData;
    totalProfit = typeof this.averageItemPrice === 'number' ? (+this.profitPerItem * this.output) : this.infoTableStrings.noData;

    enchantmentString(id: string) {
        const {enchantment} = this;

        return (!!enchantment && (!id?.includes('STONEBLOCK') && !id?.includes('T3'))) ? `.${enchantment}` : ``;
    }

    units = (this.resourceId?.includes('STONEBLOCK') && this.enchantment !== '') ? ` (${Math.pow(2, +this.enchantment)}${this.infoTableStrings.un})` : '';
    journalsQuantityString = `${this.infoTableStrings.journalQuantity} ${this.totalJournalsQuantity}`;
    journalsProfitPerItemSting = `${this.infoTableStrings.journalProfit} (${this.journalPrice} - ${this.emptyJournalsPrice}) * ${this.totalJournalsQuantity} = ${this.journalsProfitPerItem}`;
    itemTitleString = `${this.tier}${this.enchantmentString(this.itemId! || this.resourceId!)} ${this.itemName![this.selectedLanguage]}:  ${this.averageItemPrice?.toLocaleString('en')}${this.units} ${this.itemWasUpdate}`;
    mainMatsTitleString = `${this.tier}${this.enchantmentString(this.mainMatsId)} ${this.mainMatsName}: ${this.spentQuantityPerItem!.mainMatsQuantity} * ${this.mainMaterialPrice} = ${this.mainMatsPricePerItem.toLocaleString('en')} ${this.mainMatsWasUpdate}`;
    totalFoodFeeSting = `${this.infoTableStrings.taxPerOneItem} ${this.totalFoodFee}`;
    subMatsTitleString = `${this.subMatsTier}${this.enchantmentString(this.subMatsId!)} ${this.subMatsName}: ${this.subMatsQuantity} * ${this.subMaterialPrice} = ${this.subMatsPricePerItem?.toLocaleString('en')} ${this.subMatsWasUpdate}`;
    artefactString = `${this.tier} ${this.artefactName?.[this.selectedLanguage]}: ${this.artefactPrice.toLocaleString('en')} ${this.artefactWasUpdate}`;
    profitPerItemTitle = `${this.infoTableStrings.profitPerItem} ${this.averageItemPrice?.toLocaleString('en')}${this.isJournalsUsed ? ` + ${this.journalsProfitPerItem}` : ''} - (${this.mainMatsPricePerItem.toLocaleString('en')} ${!!this.subMatsId ? `+ ${this.subMatsPricePerItem!.toLocaleString('en')}` : ''}${this.totalFoodFee ? ` + ${this.totalFoodFee.toLocaleString('en')}` : ''}${!!this.artefactId ? ` + ${this.artefactPrice.toLocaleString('en')}` : ''}) = ${this.profitPerItem.toLocaleString('en')}`;
    totalProfitTitle = `${this.infoTableStrings.total} ${this.output} * ${this.profitPerItem.toLocaleString('en')} = ${this.totalProfit.toLocaleString('en')}`;

    title = `${this.totalFoodFeeSting}<hr><br>
             ${this.isJournalsUsed ? `${this.journalsQuantityString}<hr><br>` : ''}
             ${this.itemTitleString}<hr><br>
             ${this.isJournalsUsed ? `${this.journalsProfitPerItemSting}<hr><br>` : ''}
             ${this.mainMatsTitleString}<hr><br>
             ${!!this.subMatsName ? `${this.subMatsTitleString}<hr><br>` : ''}
             ${!!this.artefactId ? `${this.artefactString}<hr><br>` : ''}
             ${this.profitPerItemTitle}<hr><br>
             ${this.totalProfitTitle}<hr>`;
}