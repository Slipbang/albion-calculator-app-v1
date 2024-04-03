import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';
import {TCalcProps} from "../../types/calculatorPropsType";
import {TCraftItemType, TCraftObjectTypes, TResourceType, TTier} from "../../types/craftItemsType";
import {calculateJQ_DFC} from "../../components/Calculator/DefaultCalculator/calculateJQ_DFC";

export interface IItemName {
    ru: string;
    en: string;
}

export interface ISpentQuantityPerItem {
    mainMatsQuantity: string;
    subMatsQuantity?: string;
}

export interface ITableData {
    mainResourceQuantity: number;
    percent: number;
    subResourceQuantity?: number;
    output: number;
    id: string;
    resourceId?: string;
    itemId?: string;
    mainMatsId: string;
    subMatsId?: string | undefined;
    mainDiv?: number;
    subDiv?: number;
    foodConsumption: number;
    defaultFoodConsumption: number;
    spentQuantityPerItem?: ISpentQuantityPerItem;
    journalId?: string,
    emptyJournalId?: string;
    journalsQuantity?: number;
    itemName?: IItemName;
    tier: string
    artefactId?: string | null;
}



interface IInitialState {
    craftResourcesList: ITableData[];
    craftItemsList: ITableData[];
    craftedItemData: null | ITableData;
    output: {
        resourcesOutput: number;
        itemsOutput: number
    };
    errors: {
        percentError: boolean;
        quantityError: boolean;
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
        selectedResource: {
            resourceId: string;
            resourceTier: TTier,
            foodConsumption: 1.8, // всегда 1.8
            defaultFoodConsumption: 1.8; // всегда 1.8
            resourceName: {
                ru: string,
                en: string,
            }
        },
        selectedItem: {
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
    }
}

const initialState: IInitialState = {
    craftResourcesList: [],
    craftItemsList: [],
    craftedItemData: null,
    output: {
        resourcesOutput: 0,
        itemsOutput: 0
    },

    errors: {
        percentError: false,
        quantityError: false,
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
        }
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
        setSelected(state, action: PayloadAction<{ type: TCalcProps; selectedType?: TCraftObjectTypes; journalId?: string; emptyJournalId?: string; selectedItem?: string; itemName: {ru: string, en: string} , artefactId?: string; selectedResourceId?: string, resourceTier?: TTier, foodConsumption?: number}>) {
            if (action.payload.type === 'resource') {
                state.selected.selectedResource = {
                    ...state.selected.selectedResource,
                    resourceId: action.payload.selectedResourceId as string,
                    resourceTier: action.payload.resourceTier!,
                    resourceName: action.payload.itemName,
                }
            }

            if (action.payload.type === 'items') {
                state.selected.selectedItem = {
                    ...state.selected.selectedItem,
                    selectedItemType: action.payload.selectedType as TCraftObjectTypes,
                    selectedItemBodyId: action.payload.selectedItem!,
                    foodConsumption: action.payload.foodConsumption!,
                    journalId: action.payload.journalId!,
                    emptyJournalId: action.payload.emptyJournalId!,
                    itemName: action.payload.itemName,
                    artefactId: action.payload.artefactId,
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
        getResourceProfitHandler(state, action: PayloadAction<{ calculatorType: TCalcProps }>) {
            let id = uuidv4();
            let percent: number = +state.percent;
            let divFactor: number = 0;
            let subDivFactor: number = 0;
            let output: number = 0;
            let subResMatsQuantity: number = 0;
            const mainResourceQuantity: number = +state.initialQuantity;

            if (action.payload.calculatorType === "items") {
                state.errors.quantityError = state.initialQuantity < state.divFactor.itemDivFactor.mainDivFactor;

                if (state.percent < 15.2 || state.percent > 70) {
                    state.errors.percentError = true;
                    return;
                } else {
                    state.errors.percentError = false;

                    divFactor = +state.divFactor.itemDivFactor.mainDivFactor;
                    subDivFactor = +state.divFactor.itemDivFactor.subDivFactor;
                }
            }

            if (action.payload.calculatorType === "resource") {
                state.errors.quantityError = state.initialQuantity < state.divFactor.resourcesDivFactor.mainDivFactor;

                if (state.percent < 15.2 || state.percent > 70) {
                    state.errors.percentError = true;
                    return;
                } else {
                    state.errors.percentError = false;

                    divFactor = +state.divFactor.resourcesDivFactor.mainDivFactor;
                    subDivFactor = +state.divFactor.resourcesDivFactor.subDivFactor;
                    subResMatsQuantity = Number((state.initialQuantity / divFactor).toFixed(0));
                }
            }

            output = Math.floor(mainResourceQuantity / (divFactor - (divFactor * (percent / 100))));

            if (action.payload.calculatorType === "resource" && !state.errors.percentError && !state.errors.quantityError) {
                state.output.resourcesOutput = output;
                state.craftResourcesList.unshift({
                    output,
                    mainResourceQuantity,
                    percent,
                    id,
                    foodConsumption: state.selected.selectedResource.foodConsumption,
                    defaultFoodConsumption: state.selected.selectedResource.defaultFoodConsumption,
                    subResourceQuantity: subResMatsQuantity,
                    resourceId: state.selected.selectedResource.resourceId,
                    mainMatsId: state.resourceMaterials.mainMaterialId,
                    subMatsId: state.resourceMaterials.subMaterialId,
                    itemName: state.selected.selectedResource.resourceName,
                    tier: state.selected.selectedResource.resourceTier,
                    spentQuantityPerItem: {
                        mainMatsQuantity: (divFactor - (divFactor * (percent / 100))).toFixed(2),
                        subMatsQuantity: (subDivFactor - (subDivFactor * (percent / 100))).toFixed(2),
                    }
                });
            }

            const {journalsQuantity, defaultFoodConsumption} = calculateJQ_DFC(state.selected.selectedItem.selectedItemType,state.selected.selectedItem.selectedItemTier);

            let itemId = (state.selected.selectedItem.selectedItemType === 'BAG' && state.selected.selectedItem.selectedItemBodyId !== 'INSIGHT')
            || state.selected.selectedItem.selectedItemType === 'CAPE'
                ? `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.selectedItemBodyId}`
                : `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.selectedItemType}_${state.selected.selectedItem.selectedItemBodyId}`;

            if (action.payload.calculatorType === "items" && !state.errors.percentError && !state.errors.quantityError) {
                state.output.itemsOutput = output;
                state.craftItemsList.unshift({
                    output,
                    mainResourceQuantity: Math.ceil(output * (divFactor - (divFactor * (percent / 100)))),
                    percent,
                    id,
                    foodConsumption: state.selected.selectedItem.foodConsumption,
                    defaultFoodConsumption,
                    subResourceQuantity: Math.ceil(output * (subDivFactor - (subDivFactor * (percent / 100)))),
                    itemId,
                    journalId: `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.journalId}`,
                    emptyJournalId: `${state.selected.selectedItem.selectedItemTier}_${state.selected.selectedItem.emptyJournalId}`,
                    journalsQuantity,
                    mainMatsId: `${state.itemsMaterials.materialsTier}_${state.itemsMaterials.mainMaterialId}`,
                    subMatsId: !!state.itemsMaterials.subMaterialId ? `${state.itemsMaterials.materialsTier}_${state.itemsMaterials.subMaterialId}` : undefined,
                    mainDiv: divFactor,
                    subDiv: subDivFactor,
                    spentQuantityPerItem: {
                        mainMatsQuantity: (divFactor - (divFactor * (percent / 100))).toFixed(2),
                        subMatsQuantity: (subDivFactor - (subDivFactor * (percent / 100))).toFixed(2),
                    },
                    itemName: state.selected.selectedItem.itemName,
                    tier: state.selected.selectedItem.selectedItemTier,
                    artefactId: !!state.selected.selectedItem.artefactId ? `${!state.selected.selectedItem.artefactId.includes('T4_SKILLBOOK_STANDARD') ? `${state.selected.selectedItem.selectedItemTier}_` : ''}${state.selected.selectedItem.artefactId}` : '',
                });
            }

            if (state.craftResourcesList.length > 8) {
                state.craftResourcesList.pop();
            }
            if (state.craftItemsList.length > 8) {
                state.craftItemsList.pop();
            }
        },
        deleteLiFunction(state, action: PayloadAction<{ type: string; id: string }>) {
            if (action.payload.type === "items") {
                state.craftItemsList = state.craftItemsList.filter(elem => elem.id !== action.payload.id);
            }
            if (action.payload.type === "resource") {
                state.craftResourcesList = state.craftResourcesList.filter(elem => elem.id !== action.payload.id);
            }
        },
    }
})

export const profitSliceActions = profitSlice.actions;
export default profitSlice;