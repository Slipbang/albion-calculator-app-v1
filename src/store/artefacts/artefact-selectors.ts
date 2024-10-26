import {RootState} from "../index";

export const selectArtefactsClass = (state: RootState) => state.artefacts.selectedClass;
export const selectArtefactsType = (state: RootState) => state.artefacts.selectedType;
export const selectArtefactsSort = (state: RootState) => state.artefacts.selectedSort;
export const selectArtefactsTier = (state: RootState) => state.artefacts.selectedTier;
export const selectArtefactsParams = (state: RootState) => state.artefacts.artefactsParams;
