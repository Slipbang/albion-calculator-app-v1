import {createSlice} from "@reduxjs/toolkit";
import language from "../Items/language";
import {ISelectedLanguage} from "../../types/languageTypes";


interface IInitialState {
    language: ISelectedLanguage;
    selectedLanguage: 'ru' | 'en';
}

const initialLanguageState: IInitialState = {language: language.ru, selectedLanguage: "ru"};

const languageSwitcherSlice = createSlice({
    name: 'languageSlice',
    initialState: initialLanguageState,
    reducers: {
        changeLanguageHandler(state){
            if (state.selectedLanguage === 'ru') {
                state.selectedLanguage = 'en';
                state.language = language[state.selectedLanguage];

            } else  {
                state.selectedLanguage = 'ru';
                state.language = language[state.selectedLanguage];
            }
        }
    }
});

export const languageSwitcherActions = languageSwitcherSlice.actions;
export default languageSwitcherSlice;