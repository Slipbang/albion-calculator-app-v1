import {TSelectedLanguage} from "./languageTypes";


export type TConsumableNames = {
    [key: string]: {
        [key in TSelectedLanguage]: string;
    }
}