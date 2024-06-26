import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import language from "./language";
import {ISelectedLanguage, TSelectedLanguage} from "../../types/languageTypes";

const defineLanguage = (): TSelectedLanguage => {
    const systemLanguage = navigator.language.split('-')[0];

    if (systemLanguage === 'en' || systemLanguage === 'ru'){
        return systemLanguage;
    }

    return 'en';
}

const systemLanguage = defineLanguage();

export interface ILanguageInitialState {
    language: ISelectedLanguage;
    selectedLanguage: TSelectedLanguage;
}

const initialLanguageState: ILanguageInitialState = {
    language: language[systemLanguage],
    selectedLanguage: systemLanguage,
};

const languageSlice = createSlice({
    name: 'languageSlice',
    initialState: initialLanguageState,
    reducers: {
        changeLanguageHandler(state, action: PayloadAction<TSelectedLanguage>){
            state.selectedLanguage = action.payload;
            state.language = language[state.selectedLanguage];
        }
    }
});

export const languageSwitcherActions = languageSlice.actions;
export default languageSlice;