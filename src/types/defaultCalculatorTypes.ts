import {TCraftObjectTypes, TTier} from "./craftItemsType";
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
    selectedItemId: string;
    foodConsumption: number,
    journalId: string;
    emptyJournalId: string;
    artefactId?: string;
}

export interface ISelectedResource {
    resourceId: string;
    resourceTier: TTier,
    foodConsumption: 1.8, // всегда 1.8
    defaultFoodConsumption: 1.8; // всегда 1.8
}

export type TMaterials = {
    [key in Extract<TCalcProps, 'ITEMS' | 'RESOURCES'>]: {
        mainMaterialId: string;
        subMaterialId?: string;
    }
}

export type TSimilarErrors = {
    [key in TCalcProps]: string | null;
}

export type TCraftedLists = {
    [key in TCalcProps]: IConsumableTableData[] | ITableData[];
}

export type TDivFactor = {
    [key in Extract<TCalcProps, 'ITEMS' | 'RESOURCES'>]: {
        mainDivFactor: number;
        subDivFactor: number;
    }
}