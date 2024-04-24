import {TCraftObjectTypes, TItemName, TTier} from "./craftItemsType";
import {IConsumableObject} from "./consumableTypes";
import {TCalcProps} from "./calculatorPropsType";

export interface ISpentQuantityPerItem {
    mainMatsQuantity: number;
    subMatsQuantity?: number;
}

export interface IInfoTableData {
    output: number;
    resourceId?: string;
    itemId?: string;
    mainMatsId: string;
    subMatsId?: string;
    foodConsumption: number;
    defaultFoodConsumption: number;
    spentQuantityPerItem?: ISpentQuantityPerItem;
    journalId?: string,
    emptyJournalId?: string;
    journalsQuantity?: number;
    itemName?: TItemName;
    tier: string
    artefactId?: string;
}

export interface ICraftTableData {
    id: string;
    percent: number;
    mainResourceQuantity: number;
    subResourceQuantity?: number;
}

export interface ITableQueryParams {
    queryMatsParams: string;
    queryItemsParams?: string;
    queryJournalsParams?: string;
}

export interface ITableData {
    infoTableData: IInfoTableData;
    tableQueryParams?: ITableQueryParams;
    craftTableData: ICraftTableData
}

export interface IConsumableTableData {
    quantity: number;
    percent: number;
    queryParams: string;
    craftedConsumable: IConsumableObject;
    id: string;
}

export interface ISelectedItem {
    selectedItemType: TCraftObjectTypes;
    selectedItemTier: TTier;
    foodConsumption: number,
    selectedItemBodyId: string;
    journalId: string;
    emptyJournalId: string;
    artefactId?: string;
    itemName: {
        ru: string,
        en: string,
    }
}

export interface ISelectedResource {
    resourceId: string;
    resourceTier: TTier,
    foodConsumption: 1.8, // всегда 1.8
    defaultFoodConsumption: 1.8; // всегда 1.8
    resourceName: {
        ru: string,
        en: string,
    }
}

export type TSimilarErrors = {
    [key in TCalcProps]: string | null;
}

export type TCraftedLists = {
    [key in TCalcProps]: IConsumableTableData[] | ITableData[];
}

export type TDivFactor = {
    [key in Exclude<TCalcProps, 'FOOD' | 'POTIONS'>]: {
        mainDivFactor: number;
        subDivFactor: number;
    }
}