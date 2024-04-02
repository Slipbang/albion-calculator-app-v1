import {IItemsData, TCities} from "../../../../types/InfoTableTypes";
import {materials} from "../../../../store/Items/materials";
import {IOwnPrice, TArtefactName} from "./InfoTable";
import {IItemName, ISpentQuantityPerItem} from "../../../../store/profit/profit-slice";
import {ISelectedLanguage} from "../../../../types/languageTypes";

export class craftedItemInfoClass {
    constructor(public city: TCities,
                public enchantment: string,
                public itemName:  IItemName,
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
                ) {}

    itemTierNum = +this.tier!.split('T')[1];

    get subMatsTier() {
        const {itemTierNum} = this;
        if(!!this.itemId){
            return this.tier
        }

        if (!!this.resourceId){
            return `T${itemTierNum - 1}`;
        }
    }

    mainMaterialsNames = materials.find(elem => elem.itemId === this.mainMatsId);
    mainMatsName = this.mainMaterialsNames!.itemName?.[this.selectedLanguage] ;

    subMaterialsNames = materials.find(elem => elem.itemId === this.subMatsId) || null;
    subMatsName = this.subMaterialsNames?.itemName?.[this.selectedLanguage] || '';

    matPrice = (itemId: string, selectedCity: TCities) => {
        return this.materialsData?.find(matItem => matItem.itemId === itemId && matItem.location === selectedCity)?.buyPriceMax || 0;
    }

    itemIdWithEnchantment(id: string, enchantment: string) {
        if (!!this.itemId){
            return enchantment === '' ? id : `${id}@${enchantment}`;
        }

        if(!!this.resourceId){
            return (enchantment === '' || id.includes('STONEBLOCK')) ? id : `${id}_LEVEL${enchantment}@${enchantment}`;
        }
    }

    get averageItemPrice() {
        const {multiplication} = this;
        if (!!this.itemId){
            return this.itemsData?.find(itemElem => itemElem.itemId === this.itemIdWithEnchantment(this.itemId!, this.enchantment) && itemElem.location === this.city)?.sellPriceMin || this.infoTableStrings.noData;
        }

        if (!!this.resourceId){
            return this.materialsData?.find(itemElem => itemElem.itemId === this.itemIdWithEnchantment(this.resourceId!, this.enchantment) && itemElem.location === this.city)?.sellPriceMin! * multiplication || this.infoTableStrings.noData;
        }
    }

    totalFoodFee = Math.floor((this.foodConsumption * (Math.pow(2, this.itemTierNum - 4)) + (this.defaultFoodConsumption! * Math.pow(2, this.itemTierNum - 4) * (Math.pow(2, +this.enchantment) - 1))) * (this.foodTax / 100));

    mainMaterialId = this.enchantment === '' ? this.mainMatsId : `${this.mainMatsId}_LEVEL${this.enchantment}@${this.enchantment}`;
    mainMaterialPrice: number = this.matPrice(this.mainMaterialId!, this.mainMaterialCity) || 0;

    get subMaterialId() {
        const {enchantment,subMatsId,resourceId, itemId} = this;
        if (!!itemId && !resourceId) {
            return enchantment === '' ? subMatsId : `${subMatsId}_LEVEL${enchantment}@${enchantment}`;
        }
        if (!!resourceId && !itemId) {
            return (enchantment === '' || subMatsId!.includes('STONEBLOCK')  || subMatsId!.includes('T3')) ? subMatsId : `${subMatsId}_LEVEL${enchantment}@${enchantment}`;
        }
    }

    subMaterialPrice: number = this.matPrice?.(this.subMaterialId!, this.subMaterialCity);

    artefactPrice = this.artefact.isSelectedOwn ? this.artefact.ownPrice : this.artefactsData?.find(artefact => artefact.location === this.artefactCity)?.buyPriceMax || 0;

    mainMatsPricePerItem = Math.floor(+this.mainMaterialPrice * +this.spentQuantityPerItem!.mainMatsQuantity);

    multiplication = !!this.resourceId && this.resourceId?.includes('STONEBLOCK') && this.enchantment !== '' ? Math.pow(2, +this.enchantment) : 1

    subMatsQuantity = +this.spentQuantityPerItem!.subMatsQuantity! * (!!this.resourceId ? this.multiplication : 1)

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

    get units() {
        const {enchantment} = this;

        if (!!this.resourceId && !this.itemId) {
            return (this.resourceId?.includes('STONEBLOCK') && enchantment !== '') ? ` (${Math.pow(2, +enchantment)}${this.infoTableStrings.un})` : '';
        }

        return '';
    }

    journalsQuantityString = `${this.infoTableStrings.journalQuantity} ${this.totalJournalsQuantity}`;
    journalsProfitPerItemSting = `${this.infoTableStrings.journalProfit} (${this.journalPrice} - ${this.emptyJournalsPrice}) * ${this.totalJournalsQuantity} = ${this.journalsProfitPerItem}`;
    itemTitleString = `${this.tier}${this.enchantmentString(this.itemId! || this.resourceId!)} ${this.itemName![this.selectedLanguage]}:  ${this.averageItemPrice?.toLocaleString('en')}${this.units}`;
    mainMatsTitleString = `${this.tier}${this.enchantmentString(this.mainMatsId)} ${this.mainMatsName}: ${this.spentQuantityPerItem!.mainMatsQuantity} * ${this.mainMaterialPrice} = ${this.mainMatsPricePerItem.toLocaleString('en')}`;
    totalFoodFeeSting = `${this.infoTableStrings.taxPerOneItem} ${this.totalFoodFee}`;
    subMatsTitleString = `${this.subMatsTier}${this.enchantmentString(this.subMatsId!)} ${this.subMatsName}: ${this.subMatsQuantity} * ${this.subMaterialPrice} = ${this.subMatsPricePerItem?.toLocaleString('en')}`;
    artefactString = `${this.tier} ${this.artefactName?.[this.selectedLanguage]}: ${this.artefactPrice.toLocaleString('en')}`;
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