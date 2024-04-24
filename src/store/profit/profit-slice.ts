import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';
import {TCalcProps} from "../../types/calculatorPropsType";
import {TCraftItemType, TCraftObjectTypes, TItemNode, TResourceType, TTier} from "../../types/craftItemsType";
import {calculateJQ_DFC} from "../utils/calculateJQ_DFC";
import {IConsumableObject} from "../../types/consumableTypes";

export interface IItemName {
    ru: string;
    en: string;
}

export interface ISpentQuantityPerItem {
    mainMatsQuantity: number;
    subMatsQuantity?: number;
}

export interface IInfoTableData {
    output: number;
    resourceId?: string;
    itemId?: string;
    mainMatsId: string;
    subMatsId?: string | undefined;
    foodConsumption: number;
    defaultFoodConsumption: number;
    spentQuantityPerItem?: ISpentQuantityPerItem;
    journalId?: string,
    emptyJournalId?: string;
    journalsQuantity?: number;
    itemName?: IItemName;
    tier: string
    artefactId?: string | undefined;
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

type TSimilarErrors = {
    [key in TCalcProps]: string | undefined;
}

type TCraftedLists = {
    [key in TCalcProps]: IConsumableTableData[] | ITableData[];
}

type TDivFactor = {
    [key in Exclude<TCalcProps, 'FOOD' | 'POTIONS'>]: {
        mainDivFactor: number;
        subDivFactor: number;
    }
}

interface IInitialState {
    craftLists: TCraftedLists;

    craftedItemData: null | ITableData;
    craftedConsumablesData: null | IConsumableTableData;

    consumableItemQuantity: number;
    consumptionItemQueryParams: string;

    errors: {
        percentError: boolean;
        quantityError: boolean;
        similarError: TSimilarErrors;
    };

    initialQuantity: number

    percent: number;

    divFactor: TDivFactor;

    itemSelector: {
        itemNode: TItemNode;
        itemType: TCraftItemType;
    }

    resourceMaterials: {
        mainMaterialId: string | '';
        subMaterialId: string | '';
    }

    itemsMaterials: {
        mainMaterialId: TResourceType | string;
        subMaterialId: TResourceType | string;
        materialsTier: TTier;
    }

    selected: {
        selectedResource: ISelectedResource,
        selectedItem: ISelectedItem;
        selectedConsumable: IConsumableObject | null;
    }
}

const initialState: IInitialState = {
    craftLists: {
        ITEMS: [],
        RESOURCES: [],
        FOOD: [],
        POTIONS: [],
    },

    craftedItemData: null,
    craftedConsumablesData: null,

    consumableItemQuantity: 1,
    consumptionItemQueryParams: '',

    errors: {
        percentError: false,
        quantityError: false,
        similarError: {
            ITEMS: undefined,
            RESOURCES: undefined,
            FOOD: undefined,
            POTIONS: undefined,
        },
    },

    initialQuantity: 1,
    percent: 15.2,
    divFactor: {
        RESOURCES: {
            mainDivFactor: 2,
            subDivFactor: 1,
        },
        ITEMS: {
            mainDivFactor: 16,
            subDivFactor: 8,
        }
    },

    resourceMaterials: {
        mainMaterialId: 'T4_ORE',
        subMaterialId: 'T3_METALBAR',
    },

    itemsMaterials: {
        mainMaterialId: 'METALBAR',
        subMaterialId: 'LEATHER',
        materialsTier: 'T4',
    },

    itemSelector: {
        itemNode: 'sword',
        itemType: 'warriorWeapon',
    },

    selected: {
        selectedResource: {
            resourceId: 'T4_METALBAR',
            resourceTier: 'T4',
            foodConsumption: 1.8,
            defaultFoodConsumption: 1.8,
            resourceName: {
                ru: 'Слиток стали',
                en: 'Steel Bar',
            }
        },
        selectedItem: {
            selectedItemType: 'MAIN',
            selectedItemTier: 'T4',
            selectedItemBodyId: 'SWORD',
            foodConsumption: 43.2,
            journalId: 'JOURNAL_WARRIOR_FULL',
            emptyJournalId: 'JOURNAL_WARRIOR_EMPTY',
            artefactId: undefined,
            itemName: {
                ru: 'Палаш',
                en: 'Broadsword',
            }
        },
        selectedConsumable: null,
    },
};

const profitSlice = createSlice({
    name: '@profit',
    initialState,
    reducers: {
        setAmount(state, action: PayloadAction<number>) {
            state.initialQuantity = action.payload;
        },
        setPercent(state, action: PayloadAction<number>) {
            state.percent = action.payload;
        },
        setDivFactor(state, action: PayloadAction<{ type: Exclude<TCalcProps, 'FOOD' | 'POTIONS'>; divFactor: number; subDivFactor?: number }>) {
            state.divFactor[action.payload.type].mainDivFactor = action.payload.divFactor;
            state.divFactor[action.payload.type].subDivFactor = action.payload.subDivFactor || 0;
        },
        setSelectedItemTier(state, action: PayloadAction<TTier>) {
            state.selected.selectedItem.selectedItemTier = action.payload;
            state.itemsMaterials.materialsTier = action.payload;
        },
        setSelectedType(state, action: PayloadAction<TCraftItemType>) {
            state.itemSelector.itemType = action.payload;
        },
        setSelectedNode(state, action: PayloadAction<TItemNode>) {
            state.itemSelector.itemNode = action.payload;
        },
        setSelected(state, action: PayloadAction<{ type: TCalcProps; selectedItem?: Omit<ISelectedItem, 'selectedItemTier'>; selectedResource?: Pick<ISelectedResource, 'resourceId' | 'resourceTier' | 'resourceName'>; selectedConsumable?: IConsumableObject }>) {
            if (action.payload.type === 'RESOURCES') {
                state.selected.selectedResource = {
                    ...state.selected.selectedResource,
                    ...action.payload.selectedResource,
                }
            }

            if (action.payload.type === 'ITEMS') {
                state.selected.selectedItem = {
                    ...state.selected.selectedItem,
                    ...action.payload.selectedItem,
                }
            }

            if (action.payload.type === 'FOOD' || action.payload.type === 'POTIONS') {
                state.selected.selectedConsumable = {
                    ...action.payload.selectedConsumable!,
                }
            }
        },
        setSelectedMaterials(state, action: PayloadAction<{ type: TCalcProps, mainMaterialId: TResourceType | string; subMaterialId: TResourceType | string }>) {
            if (action.payload.type === 'ITEMS') {
                state.itemsMaterials.mainMaterialId = action.payload.mainMaterialId;
                state.itemsMaterials.subMaterialId = action.payload.subMaterialId;
            }
            if (action.payload.type === 'RESOURCES') {
                state.resourceMaterials.mainMaterialId = action.payload.mainMaterialId;
                state.resourceMaterials.subMaterialId = action.payload.subMaterialId;
            }
        },
        setCraftedItem(state, action: PayloadAction<ITableData>) {
            state.craftedItemData = action.payload;
        },
        showConsumablesCalculations(state) {
            state.craftedConsumablesData = {
                id: 'fastCalculation',
                quantity: state.consumableItemQuantity,
                percent: state.percent,
                craftedConsumable: state.selected.selectedConsumable!,
                queryParams: state.consumptionItemQueryParams,
            }
        },
        setConsumableItem(state, action: PayloadAction<IConsumableTableData>) {
            state.craftedConsumablesData = action.payload;
        },
        setConsumableItemQuantity(state, action: PayloadAction<number>) {
            state.consumableItemQuantity = action.payload;
        },
        resetData(state) {
            state.craftedItemData = initialState.craftedItemData;
            state.craftedConsumablesData = initialState.craftedConsumablesData;
        },
        setConsumptionItemQueryParams(state, action: PayloadAction<string>) {
            state.consumptionItemQueryParams = action.payload;
        },
        getResourceProfitHandler(state, action: PayloadAction<{ calculatorType: TCalcProps }>) {
            let id = uuidv4();
            let percent: number = +state.percent;
            let divFactor: number = 0;
            let subDivFactor: number = 0;
            let output: number = 0;
            const mainResourceQuantity: number = +state.initialQuantity;

            state.errors.percentError = (state.percent < 15.2 || state.percent > 70);
            if (state.errors.percentError) return;

            if ((action.payload.calculatorType === 'ITEMS' || action.payload.calculatorType === "RESOURCES") && !state.errors.percentError) {
                state.errors.quantityError = state.initialQuantity < state.divFactor[action.payload.calculatorType].mainDivFactor;
                if (state.errors.quantityError) return;

                divFactor = +state.divFactor[action.payload.calculatorType].mainDivFactor;
                subDivFactor = +state.divFactor[action.payload.calculatorType].subDivFactor;

                output = Math.floor(mainResourceQuantity / (divFactor - (divFactor * (percent / 100))));

                const hasSimilarItems = (craftResourcesList: ITableData[], itemId: string, percent: number, output: number) => {
                    let isSimilar = false;
                    let similarItemId = undefined;
                    craftResourcesList.some(item => {
                        const {craftTableData, infoTableData} = item;
                        const {percent: prevPercent, id} = craftTableData;
                        const {output: prevOutput} = infoTableData;
                        let prevId: string;
                        if (!!infoTableData.resourceId) {
                            ({resourceId: prevId} = infoTableData);
                        }
                        if (!!infoTableData.itemId) {
                            ({itemId: prevId} = infoTableData);
                        }
                        if (prevId! === itemId && prevPercent === percent && prevOutput === output) {
                            isSimilar = true;
                            similarItemId = id;
                            return true;
                        }
                    })
                    return {isSimilar, similarItemId};
                }

                const {
                    journalsQuantity,
                    defaultFoodConsumption
                } = calculateJQ_DFC(state.selected.selectedItem.selectedItemType, state.selected.selectedItem.selectedItemTier);

                let itemId = (state.selected.selectedItem.selectedItemType === 'BAG' && state.selected.selectedItem.selectedItemBodyId !== 'INSIGHT')
                || state.selected.selectedItem.selectedItemType === 'CAPE'
                    ? `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.selectedItemBodyId}`
                    : `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.selectedItemType}_${state.selected.selectedItem.selectedItemBodyId}`;

                const spentQuantityPerItem = {
                    mainMatsQuantity: divFactor - (divFactor * (percent / 100)),
                    subMatsQuantity: subDivFactor - (subDivFactor * (percent / 100)),
                }

                const infoTableData = (action.payload.calculatorType === 'ITEMS')
                    ? {
                        output,
                        foodConsumption: state.selected.selectedItem.foodConsumption,
                        defaultFoodConsumption,
                        itemId,
                        journalsQuantity,
                        mainMatsId: `${state.itemsMaterials.materialsTier}_${state.itemsMaterials.mainMaterialId}`,
                        subMatsId: !!state.itemsMaterials.subMaterialId ? `${state.itemsMaterials.materialsTier}_${state.itemsMaterials.subMaterialId}` : undefined,
                        journalId: `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.journalId}`,
                        emptyJournalId: `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.emptyJournalId}`,
                        itemName: state.selected.selectedItem.itemName,
                        tier: state.selected.selectedItem.selectedItemTier,
                        artefactId: !!state.selected.selectedItem.artefactId
                            ? `${!state.selected.selectedItem.artefactId.includes('T4_SKILLBOOK_STANDARD') ? `${state.selected.selectedItem.selectedItemTier}_` : ''}${state.selected.selectedItem.artefactId}`
                            : undefined,
                        spentQuantityPerItem,
                    }
                    : (action.payload.calculatorType === 'RESOURCES')
                        ? {
                            output,
                            foodConsumption: state.selected.selectedResource.foodConsumption,
                            defaultFoodConsumption: state.selected.selectedResource.defaultFoodConsumption,
                            resourceId: state.selected.selectedResource.resourceId,
                            mainMatsId: state.resourceMaterials.mainMaterialId,
                            subMatsId: state.resourceMaterials.subMaterialId,
                            itemName: state.selected.selectedResource.resourceName,
                            tier: state.selected.selectedResource.resourceTier,
                            spentQuantityPerItem,
                        } : undefined;

                const usableItem = {
                    craftTableData: {
                        percent,
                        id,
                        mainResourceQuantity: Math.ceil(output * (divFactor - (divFactor * (percent / 100)))),
                        subResourceQuantity: Math.ceil(output * (subDivFactor - (subDivFactor * (percent / 100)))),
                    },
                    infoTableData,
                } as ITableData;

                const {
                    isSimilar,
                    similarItemId
                } = hasSimilarItems(
                    state.craftLists[action.payload.calculatorType] as ITableData[],
                    (action.payload.calculatorType === "ITEMS") ? itemId : state.selected.selectedResource.resourceId,
                    percent,
                    output
                );


                state.errors.similarError[action.payload.calculatorType] = similarItemId;
                if (isSimilar) return;

                (state.craftLists[action.payload.calculatorType] as ITableData[]).unshift(usableItem);
            }

            //---------------------------------------------------------------------------------------------------------------------------------------------------------

            if ((action.payload.calculatorType === 'FOOD' || action.payload.calculatorType === 'POTIONS') && !state.errors.percentError) {
                const craftedConsumableItem: IConsumableTableData = {
                    id,
                    quantity: state.consumableItemQuantity,
                    percent: state.percent,
                    craftedConsumable: state.selected.selectedConsumable!,
                    queryParams: state.consumptionItemQueryParams,
                }

                const hasConsumableSimilar = (listToCheck: IConsumableTableData[], itemToCheck: IConsumableTableData) => {
                    const {quantity: newQuantity, percent: newPercent, craftedConsumable} = itemToCheck;
                    const {itemId: newItemId} = craftedConsumable;

                    let isSimilar = false;
                    let similarItemId = undefined;
                    listToCheck.some(item => {
                        const {craftedConsumable, percent: prevPercent, quantity: prevQuantity, id} = item;
                        const {itemId: prevItemId} = craftedConsumable;
                        if (prevQuantity === newQuantity && prevPercent === newPercent && prevItemId === newItemId) {
                            isSimilar = true;
                            similarItemId = id;
                            return true;
                        }
                    })

                    return {isSimilar, similarItemId};
                }

                const {
                    isSimilar,
                    similarItemId
                } = hasConsumableSimilar(state.craftLists[action.payload.calculatorType] as IConsumableTableData[], craftedConsumableItem);
                state.errors.similarError[action.payload.calculatorType] = similarItemId;
                if (isSimilar) return;

                (state.craftLists[action.payload.calculatorType] as IConsumableTableData[]).unshift(craftedConsumableItem);
            }

            if (state.craftLists[action.payload.calculatorType].length > 8) {
                state.craftLists[action.payload.calculatorType].pop();
            }
        },
        deleteLiFunction(state, action: PayloadAction<{ type: TCalcProps; id: string }>) {
            if (action.payload.type === "ITEMS" || action.payload.type === "RESOURCES") {
                state.craftLists[action.payload.type] = (state.craftLists[action.payload.type] as ITableData[]).filter(item => item.craftTableData.id !== action.payload.id);
            }

            if (action.payload.type === 'FOOD' || action.payload.type === 'POTIONS') {
                state.craftLists[action.payload.type] = (state.craftLists[action.payload.type] as IConsumableTableData[]).filter(item => item.id !== action.payload.id);
            }
        },
    }
})

export const profitSliceActions = profitSlice.actions;
export default profitSlice;