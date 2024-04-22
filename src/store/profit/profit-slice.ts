import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';
import {TCalcProps} from "../../types/calculatorPropsType";
import {TCraftItemType, TCraftObjectTypes, TResourceType, TTier} from "../../types/craftItemsType";
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
    mainDiv?: number;
    subDiv?: number;
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

interface IInitialState {
    craftResourcesList: ITableData[];
    craftItemsList: ITableData[];
    craftedMealsList: IConsumableTableData[];
    craftedPotionsList: IConsumableTableData[];
    craftedItemData: null | ITableData;
    craftedConsumablesData: null | IConsumableTableData;

    consumableItemQuantity: number;
    consumptionItemQueryParams: string;

    errors: {
        percentError: boolean;
        quantityError: boolean;
        similarError: {
            similarItemId: string | undefined;
            similarResourceId: string | undefined;
            similarFoodId: string | undefined;
            similarPotionsId: string | undefined;
        };
    };

    initialQuantity: number

    percent: number;

    divFactor: {
        resourcesDivFactor: {
            mainDivFactor: number;
            subDivFactor: number;
        };
        itemDivFactor: {
            mainDivFactor: number;
            subDivFactor: number;
        };
    };

    itemSelector: {
        itemNode: string;
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
    craftResourcesList: [],
    craftItemsList: [],
    craftedMealsList: [],
    craftedPotionsList: [],
    craftedItemData: null,
    craftedConsumablesData: null,

    consumableItemQuantity: 1,
    consumptionItemQueryParams: '',

    errors: {
        percentError: false,
        quantityError: false,
        similarError: {
            similarItemId: undefined,
            similarResourceId: undefined,
            similarFoodId: undefined,
            similarPotionsId: undefined,
        },
    },

    initialQuantity: 1,
    percent: 15.2,
    divFactor: {
        resourcesDivFactor: {
            mainDivFactor: 2,
            subDivFactor: 1,
        },
        itemDivFactor: {
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
        setDivFactor(state, action: PayloadAction<{ type: TCalcProps; divFactor: number; subDivFactor?: number }>) {
            if (action.payload.type === "items" && action.payload.divFactor > 0) {
                state.divFactor.itemDivFactor.mainDivFactor = action.payload.divFactor;
                if (!!action.payload.subDivFactor) {
                    state.divFactor.itemDivFactor.subDivFactor = action.payload.subDivFactor;
                } else {
                    state.divFactor.itemDivFactor.subDivFactor = 0;
                }
            }
            if (action.payload.type === "resource" && action.payload.divFactor > 0) {
                state.divFactor.resourcesDivFactor.mainDivFactor = action.payload.divFactor;
                state.divFactor.resourcesDivFactor.subDivFactor = action.payload.subDivFactor!;
            }
        },
        setSelectedItemTier(state, action: PayloadAction<TTier>) {
            state.selected.selectedItem.selectedItemTier = action.payload;
            state.itemsMaterials.materialsTier = action.payload;
        },
        setSelectedType(state, action: PayloadAction<TCraftItemType>) {
            state.itemSelector.itemType = action.payload;
        },
        setSelectedNode(state, action: PayloadAction<string>) {
            state.itemSelector.itemNode = action.payload;
        },
        setSelected(state, action: PayloadAction<{ type: TCalcProps; selectedItem?: Omit<ISelectedItem, 'selectedItemTier'>; selectedResource?: Pick<ISelectedResource, 'resourceId' | 'resourceTier' | 'resourceName'>; selectedConsumable?: IConsumableObject }>) {
            if (action.payload.type === 'resource') {
                state.selected.selectedResource = {
                    ...state.selected.selectedResource,
                    ...action.payload.selectedResource,
                }
            }

            if (action.payload.type === 'items') {
                state.selected.selectedItem = {
                    ...state.selected.selectedItem,
                    ...action.payload.selectedItem,
                }
            }

            if (action.payload.type === 'food' || action.payload.type === 'potions') {
                state.selected.selectedConsumable = {
                    ...action.payload.selectedConsumable!,
                }
            }
        },
        setSelectedMaterials(state, action: PayloadAction<{ type: TCalcProps, mainMaterialId: TResourceType | string; subMaterialId: TResourceType | string }>) {
            if (action.payload.type === 'items') {
                state.itemsMaterials.mainMaterialId = action.payload.mainMaterialId;
                state.itemsMaterials.subMaterialId = action.payload.subMaterialId;
            }
            if (action.payload.type === 'resource') {
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
        setConsumableItem(state, action: PayloadAction<IConsumableTableData>){
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
            let subResMatsQuantity: number = 0;
            const mainResourceQuantity: number = +state.initialQuantity;
            state.errors.percentError = (state.percent < 15.2 || state.percent > 70);

            if (action.payload.calculatorType === "items") {
                state.errors.quantityError = state.initialQuantity < state.divFactor.itemDivFactor.mainDivFactor;

                if (state.errors.percentError) {
                    return;
                } else {
                    divFactor = +state.divFactor.itemDivFactor.mainDivFactor;
                    subDivFactor = +state.divFactor.itemDivFactor.subDivFactor;
                }
            }

            if (action.payload.calculatorType === "resource") {
                state.errors.quantityError = state.initialQuantity < state.divFactor.resourcesDivFactor.mainDivFactor;

                if (state.errors.percentError) {
                    return;
                } else {
                    divFactor = +state.divFactor.resourcesDivFactor.mainDivFactor;
                    subDivFactor = +state.divFactor.resourcesDivFactor.subDivFactor;
                    subResMatsQuantity = Number((state.initialQuantity / divFactor).toFixed(0));
                }
            }

            output = Math.floor(mainResourceQuantity / (divFactor - (divFactor * (percent / 100))));

            const hasSimilarItems = (craftResourcesList: ITableData[], itemId: string, percent: number, output: number) => {
                let isSimilar = false;
                let similarItemId = undefined;
                craftResourcesList.some(item => {
                    const {craftTableData, infoTableData} = item;
                    const {percent: prevPercent, id} = craftTableData;
                    const {output: prevOutput} = infoTableData;
                    let prevId: string;
                    if(!!infoTableData.resourceId) {
                        ({resourceId: prevId} = infoTableData);
                    }
                    if(!!infoTableData.itemId) {
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

            if (action.payload.calculatorType === "resource" && !state.errors.percentError && !state.errors.quantityError) {
                const {isSimilar, similarItemId} = hasSimilarItems(state.craftResourcesList, state.selected.selectedResource.resourceId, percent, output);
                state.errors.similarError.similarResourceId = similarItemId;
                if (isSimilar) {
                    return;
                }

                state.craftResourcesList.unshift({
                    craftTableData: {
                        mainResourceQuantity,
                        subResourceQuantity: subResMatsQuantity,
                        percent,
                        id,
                    },
                    infoTableData: {
                        output,
                        foodConsumption: state.selected.selectedResource.foodConsumption,
                        defaultFoodConsumption: state.selected.selectedResource.defaultFoodConsumption,
                        resourceId: state.selected.selectedResource.resourceId,
                        mainMatsId: state.resourceMaterials.mainMaterialId,
                        subMatsId: state.resourceMaterials.subMaterialId,
                        itemName: state.selected.selectedResource.resourceName,
                        tier: state.selected.selectedResource.resourceTier,
                        spentQuantityPerItem: {
                            mainMatsQuantity: divFactor - (divFactor * (percent / 100)),
                            subMatsQuantity: subDivFactor - (subDivFactor * (percent / 100)),
                        }
                    },
                });
            }

            const {
                journalsQuantity,
                defaultFoodConsumption
            } = calculateJQ_DFC(state.selected.selectedItem.selectedItemType, state.selected.selectedItem.selectedItemTier);

            let itemId = (state.selected.selectedItem.selectedItemType === 'BAG' && state.selected.selectedItem.selectedItemBodyId !== 'INSIGHT')
            || state.selected.selectedItem.selectedItemType === 'CAPE'
                ? `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.selectedItemBodyId}`
                : `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.selectedItemType}_${state.selected.selectedItem.selectedItemBodyId}`;

            if (action.payload.calculatorType === "items" && !state.errors.percentError && !state.errors.quantityError) {
                const {isSimilar, similarItemId} = hasSimilarItems(state.craftItemsList, itemId, percent, output);
                state.errors.similarError.similarItemId = similarItemId;
                if (isSimilar) return;

                state.craftItemsList.unshift({
                    craftTableData: {
                        mainDiv: divFactor,
                        subDiv: subDivFactor,
                        percent,
                        id,
                        mainResourceQuantity: Math.ceil(output * (divFactor - (divFactor * (percent / 100)))),
                        subResourceQuantity: Math.ceil(output * (subDivFactor - (subDivFactor * (percent / 100)))),
                    },
                    infoTableData: {
                        defaultFoodConsumption,
                        output,
                        itemId,
                        journalsQuantity,
                        mainMatsId: `${state.itemsMaterials.materialsTier}_${state.itemsMaterials.mainMaterialId}`,
                        subMatsId: !!state.itemsMaterials.subMaterialId ? `${state.itemsMaterials.materialsTier}_${state.itemsMaterials.subMaterialId}` : undefined,
                        foodConsumption: state.selected.selectedItem.foodConsumption,
                        journalId: `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.journalId}`,
                        emptyJournalId: `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.emptyJournalId}`,
                        itemName: state.selected.selectedItem.itemName,
                        tier: state.selected.selectedItem.selectedItemTier,
                        artefactId: !!state.selected.selectedItem.artefactId
                            ? `${!state.selected.selectedItem.artefactId.includes('T4_SKILLBOOK_STANDARD')
                                ? `${state.selected.selectedItem.selectedItemTier}_`
                                : ''}${state.selected.selectedItem.artefactId}`
                            : '',
                        spentQuantityPerItem: {
                            mainMatsQuantity: divFactor - (divFactor * (percent / 100)),
                            subMatsQuantity: subDivFactor - (subDivFactor * (percent / 100)),
                        },
                    },
                });
            }

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
                    if (prevQuantity === newQuantity && prevPercent === newPercent && prevItemId === newItemId){
                        isSimilar = true;
                        similarItemId = id;
                        return true;
                    }
                })

                return {isSimilar, similarItemId};
            }

            if (action.payload.calculatorType === 'food' && !state.errors.percentError) {
                const {isSimilar, similarItemId} = hasConsumableSimilar(state.craftedMealsList, craftedConsumableItem);
                state.errors.similarError.similarFoodId = similarItemId;
                if (isSimilar) return;

                state.craftedMealsList.unshift(craftedConsumableItem);
            }

            if (action.payload.calculatorType === 'potions' && !state.errors.percentError) {
                const {isSimilar, similarItemId} = hasConsumableSimilar(state.craftedPotionsList, craftedConsumableItem);
                state.errors.similarError.similarPotionsId = similarItemId;
                if (isSimilar) return;

                state.craftedPotionsList.unshift(craftedConsumableItem);
            }

            if (state.craftResourcesList.length > 8) {
                state.craftResourcesList.pop();
            }
            if (state.craftItemsList.length > 8) {
                state.craftItemsList.pop();
            }
            if (state.craftedMealsList.length > 8) {
                state.craftedMealsList.pop();
            }
            if (state.craftedPotionsList.length > 8) {
                state.craftedPotionsList.pop();
            }
        },
        deleteLiFunction(state, action: PayloadAction<{ type: TCalcProps; id: string }>) {
            if (action.payload.type === "items") {
                state.craftItemsList = state.craftItemsList.filter(item => item.craftTableData.id !== action.payload.id);
            }
            if (action.payload.type === "resource") {
                state.craftResourcesList = state.craftResourcesList.filter(item => item.craftTableData.id !== action.payload.id);
            }
            if (action.payload.type === 'food') {
                state.craftedMealsList = state.craftedMealsList.filter(item => item.id !== action.payload.id);
            }
            if (action.payload.type === 'potions') {
                state.craftedPotionsList = state.craftedPotionsList.filter(item => item.id !== action.payload.id);
            }
        },
    }
})

export const profitSliceActions = profitSlice.actions;
export default profitSlice;