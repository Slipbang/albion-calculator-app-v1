import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import language from "../Items/language";
import {ISelectedLanguage, TSelectedLanguage} from "../../types/languageTypes";


interface IInitialState {
    language: ISelectedLanguage;
    selectedLanguage: TSelectedLanguage;
}

const initialLanguageState: IInitialState = {language: language.ru, selectedLanguage: "ru"};

const languageSwitcherSlice = createSlice({
    name: 'languageSlice',
    initialState: initialLanguageState,
    reducers: {
        changeLanguageHandler(state, action: PayloadAction<TSelectedLanguage>){
            state.selectedLanguage = action.payload;
            state.language = language[state.selectedLanguage];
        }
    }
});

export const languageSwitcherActions = languageSwitcherSlice.actions;
export default languageSwitcherSlice;