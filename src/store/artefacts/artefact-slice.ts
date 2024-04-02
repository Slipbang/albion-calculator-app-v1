import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import artefacts from "../Items/artefacts";
import {IArtefacts, TClass} from "../../types/artefactTypes";
import {TConsumables} from "../../types/artefactTypes";
import {TTier} from "../../types/craftItemsType";

export type TExtendedTClass = TClass | 'allClasses';

export const artefactsClassesKeys = Object.keys(artefacts) as TClass[];
export type TArtefactsTier = Exclude<TTier, 'T3'>

export interface IInitialState {
    selectedClass: TExtendedTClass;
    selectedType: TConsumables;
    selectedSort: 'descending' | 'ascending';
    selectedTier: TArtefactsTier;
    artefacts: IArtefacts;
}

const initialState: IInitialState = {
    selectedClass: 'warrior',
    selectedType: 'runes',
    selectedSort: 'descending',
    selectedTier: 'T6',
    artefacts: JSON.parse(JSON.stringify(artefacts)),
};

const artefactSlice = createSlice({
    name: '@artefacts',
    initialState,
    reducers: {
        setWasCopied(state, action: PayloadAction<string>){
            artefactsClassesKeys.forEach(key => state.artefacts[key][state.selectedType].forEach(artefact => {
                if(artefact.id === action.payload){
                    artefact.wasCopied = !artefact.wasCopied;
                }
            }))
        },
        setArtefactsTier(state, action: PayloadAction<TArtefactsTier>){
            state.selectedTier = action.payload;
        },
        setWasChecked(state, action: PayloadAction<string>){
            artefactsClassesKeys.forEach(key => state.artefacts[key][state.selectedType].forEach(artefact => {
                if(artefact.id === action.payload){
                    artefact.wasChecked = true;
                }
            }))
        },
        resetArtefactCheck(state, action: PayloadAction<{id?: string}>){
            artefactsClassesKeys.forEach(key => state.artefacts[key][state.selectedType].forEach(artefact => {
                if(artefact.id === action.payload.id){
                    artefact.wasChecked = false;
                }
                if (action.payload.id === undefined){
                    artefact.wasChecked = false;
                }
            }))
        },
        setSelectedClass(state, action: PayloadAction<TExtendedTClass>) {
            state.selectedClass = action.payload;
        },
        setSelectedType(state, action: PayloadAction<TConsumables>) {
            state.selectedType = action.payload;
        },
        setSelectedSort(state, action: PayloadAction<'descending' | 'ascending'>){
            state.selectedSort = action.payload;
        },
    },
})

export const artefactActions = artefactSlice.actions;
export default artefactSlice;
