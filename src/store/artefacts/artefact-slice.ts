import {createAsyncThunk, createSlice, Observable, PayloadAction} from "@reduxjs/toolkit";
import artefacts from "../Items/artefacts";
import {TArtefactClass, TArtefactData, TArtefacts, TArtefactTypes} from "../../types/artefactTypes";
import {TTier} from "../../types/craftItemsType";
import {IItemsData} from "../../types/InfoTableTypes";


export type TExtendedTClass = TArtefactClass | 'allClasses';

export const artefactsClassesKeys = ['WARRIOR', 'HUNTER', "MAGE"] as TArtefactClass[];
export const artefactsTypesKeys = ['RUNES', "RELICTS", 'AVALONIANSHARDS'] as TArtefactTypes[];

export type TArtefactsTier = Exclude<TTier, 'T3'>


interface IInitialState {
    selectedClass: TExtendedTClass;
    selectedType: TArtefactTypes;
    selectedSort: 'descending' | 'ascending';
    selectedTier: TArtefactsTier;
    artefacts: TArtefacts;
    artefactsParams: string;
}

const initialState: IInitialState = {
    selectedClass: 'WARRIOR',
    selectedType: 'RUNES',
    selectedSort: 'descending',
    selectedTier: 'T6',
    artefacts: JSON.parse(JSON.stringify(artefacts)),
    artefactsParams: '',
};

const artefactSlice = createSlice({
    name: 'artefacts',
    initialState,
    reducers: {
        setArtefactsTier(state, action: PayloadAction<TArtefactsTier>) {
            state.selectedTier = action.payload;
        },
        setSelectedClass(state, action: PayloadAction<TExtendedTClass>) {
            state.selectedClass = action.payload;
        },
        setSelectedType(state, action: PayloadAction<TArtefactTypes>) {
            state.selectedType = action.payload;
        },
        setSelectedSort(state, action: PayloadAction<'descending' | 'ascending'>) {
            state.selectedSort = action.payload;
        },
        setArtefactsParams(state, action: PayloadAction<string>) {
            state.artefactsParams = action.payload;
        }
    },
})

export const artefactActions = artefactSlice.actions;
export default artefactSlice;
