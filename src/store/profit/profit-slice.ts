import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';
import {TCalcProps} from "../../types/calculatorPropsType";
import {TCraftItemType, TItemNode, TTier} from "../../types/craftItemsType";
import {calculateJQ_DFC} from "../utils/calculateJQ_DFC";
import {IConsumableObject} from "../../types/consumableTypes";
import {
    IConsumableTableData,
    IInfoTableData,
    ISelectedItem,
    ISelectedResource,
    ITableData,
    TCraftedLists,
    TDivFactor, TMaterials,
    TSimilarErrors
} from "../../types/defaultCalculatorTypes";

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

    materials: TMaterials;

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
            ITEMS: null,
            RESOURCES: null,
            FOOD: null,
            POTIONS: null,
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

    materials: {
        ITEMS: {
            mainMaterialId: 'T4_METALBAR',
            subMaterialId: 'T4_LEATHER',
        },
        RESOURCES: {
            mainMaterialId: 'T4_ORE',
            subMaterialId: 'T3_METALBAR',
        },
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
            selectedItemId: 'T4_MAIN_SWORD',
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
            state.materials.ITEMS = {
                mainMaterialId: `${action.payload}_${state.materials.ITEMS.mainMaterialId.split(/T\d_/)[1]}`,
                subMaterialId: !!state.materials.ITEMS.subMaterialId ? `${action.payload}_${state.materials.ITEMS.subMaterialId.split(/T\d_/)[1]}` : undefined,
            }

            const itemBodyId = `${state.selected.selectedItem.selectedItemId}`.split(/T\d_/)[1];
            state.selected.selectedItem.selectedItemId = `${action.payload}_${itemBodyId}`;
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
        setSelectedMaterials(state, action: PayloadAction<{ calculatorType: Extract<TCalcProps, 'ITEMS' | 'RESOURCES'>, mainMaterialId: string; subMaterialId?: string }>) {
            state.materials[action.payload.calculatorType] = {
                mainMaterialId: action.payload.mainMaterialId,
                subMaterialId: action.payload.subMaterialId,
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
        getProfitHandler(state, action: PayloadAction<{ calculatorType: TCalcProps }>) {
            let id = uuidv4();
            let percent: number = +state.percent;
            let divFactor: number = 0;
            let subDivFactor: number = 0;
            let output: number = 0;
            const mainResourceQuantity: number = +state.initialQuantity;

            state.errors.percentError = (state.percent < 15.2 || state.percent > 70);
            if (state.errors.percentError) return;

            // items and resource calculation ------------------------------------------------------------------------------------------------

            if ((action.payload.calculatorType === 'ITEMS' || action.payload.calculatorType === "RESOURCES") && !state.errors.percentError) {
                state.errors.quantityError = state.initialQuantity < state.divFactor[action.payload.calculatorType].mainDivFactor;
                if (state.errors.quantityError) return;

                divFactor = +state.divFactor[action.payload.calculatorType].mainDivFactor;
                subDivFactor = +state.divFactor[action.payload.calculatorType].subDivFactor;

                output = Math.floor(mainResourceQuantity / (divFactor - (divFactor * (percent / 100))));

                const hasSimilarItems = (craftResourcesList: ITableData[], itemId: string, percent: number, output: number) => {
                    let isSimilar = false;
                    let similarItemId = null;
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

                const spentQuantityPerItem = {
                    mainMatsQuantity: divFactor - (divFactor * (percent / 100)),
                    subMatsQuantity: subDivFactor - (subDivFactor * (percent / 100)),
                }

                const materials = {
                    mainMatsId: state.materials[action.payload.calculatorType].mainMaterialId,
                    subMatsId: state.materials[action.payload.calculatorType].subMaterialId,
                }

                let infoTableData: IInfoTableData | undefined = undefined;

                if (action.payload.calculatorType === 'ITEMS') {
                    const {
                        defaultFoodConsumption,
                        journalsQuantity
                    } = calculateJQ_DFC(state.selected.selectedItem.selectedItemType, state.selected.selectedItem.selectedItemTier);

                    const artefactId = !!state.selected.selectedItem.artefactId
                        ? `${!state.selected.selectedItem.artefactId.includes('T4_SKILLBOOK_STANDARD') ? `${state.selected.selectedItem.selectedItemTier}_` : ''}${state.selected.selectedItem.artefactId}`
                        : undefined;

                    infoTableData = {
                        output,
                        defaultFoodConsumption,
                        journalsQuantity,
                        ...materials,
                        spentQuantityPerItem,
                        foodConsumption: state.selected.selectedItem.foodConsumption,
                        itemId: state.selected.selectedItem.selectedItemId,
                        journalId: `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.journalId}`,
                        emptyJournalId: `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.emptyJournalId}`,
                        itemName: state.selected.selectedItem.itemName,
                        tier: state.selected.selectedItem.selectedItemTier,
                        artefactId,
                    }
                }

                if (action.payload.calculatorType === 'RESOURCES') {
                    infoTableData = {
                        output,
                        ...materials,
                        spentQuantityPerItem,
                        foodConsumption: state.selected.selectedResource.foodConsumption,
                        defaultFoodConsumption: state.selected.selectedResource.defaultFoodConsumption,
                        resourceId: state.selected.selectedResource.resourceId,
                        itemName: state.selected.selectedResource.resourceName,
                        tier: state.selected.selectedResource.resourceTier,
                    }
                }

                const usableItem = {
                    craftTableData: {
                        percent,
                        id,
                        mainResourceQuantity: Math.ceil(output * (divFactor - (divFactor * (percent / 100)))),
                        subResourceQuantity: Math.ceil(output * (subDivFactor - (subDivFactor * (percent / 100)))),
                    },
                    infoTableData,
                } as ITableData;

                const {isSimilar, similarItemId} = hasSimilarItems(
                    state.craftLists[action.payload.calculatorType] as ITableData[],
                    (action.payload.calculatorType === "ITEMS")
                        ? state.selected.selectedItem.selectedItemId
                        : state.selected.selectedResource.resourceId,
                    percent,
                    output
                );

                state.errors.similarError[action.payload.calculatorType] = similarItemId;
                if (isSimilar) return;

                (state.craftLists[action.payload.calculatorType] as ITableData[]) = [usableItem, ...(state.craftLists[action.payload.calculatorType] as ITableData[])];
                //(state.craftLists[action.payload.calculatorType] as ITableData[]).unshift(usableItem);
            }

            // food and potions calculation ----------------------------------------------------------------------------------------------------------------

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
                    let similarItemId = null;
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

                (state.craftLists[action.payload.calculatorType] as IConsumableTableData[]) = [craftedConsumableItem, ...(state.craftLists[action.payload.calculatorType] as IConsumableTableData[])];
                //(state.craftLists[action.payload.calculatorType] as IConsumableTableData[]).unshift(craftedConsumableItem);
            }

            if (state.craftLists[action.payload.calculatorType].length > 8) {
                const poppedCraftList = [...state.craftLists[action.payload.calculatorType]];
                poppedCraftList.pop();
                state.craftLists[action.payload.calculatorType] = [...poppedCraftList] as IConsumableTableData[] | ITableData[];

                //state.craftLists[action.payload.calculatorType].pop();
            }
        },
        deleteLiFunction(state, action: PayloadAction<{ calculatorType: TCalcProps; id: string }>) {
            if (action.payload.calculatorType === "ITEMS" || action.payload.calculatorType === "RESOURCES") {
                state.craftLists[action.payload.calculatorType] = [...(state.craftLists[action.payload.calculatorType] as ITableData[])].filter(item => item.craftTableData.id !== action.payload.id);
            }

            if (action.payload.calculatorType === 'FOOD' || action.payload.calculatorType === 'POTIONS') {
                state.craftLists[action.payload.calculatorType] = [...(state.craftLists[action.payload.calculatorType] as IConsumableTableData[])].filter(item => item.id !== action.payload.id);
            }
        },
    }
})

export const profitSliceActions = profitSlice.actions;
export default profitSlice;