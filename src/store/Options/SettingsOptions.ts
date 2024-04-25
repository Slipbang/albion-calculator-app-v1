import {TSelectedLanguage} from "../../types/languageTypes";
import {IOptions} from "./CustomSelecrorsOptions";

interface ILanguageOptions {
    label: string,
    value: TSelectedLanguage,
}

export const languageOptions: ILanguageOptions[] = [
    {
        label: 'русский',
        value: 'ru',
    },
    {
        label: 'english',
        value: 'en',
    }
]

export const serverOptions: IOptions[] = [
    {
        labelName: {
            ru: 'Америка (AOD)',
            en: 'America (AOD)'
        },
        value: 'aod_west',
    },
    {
        labelName: {
            ru: 'Европа (AOD)',
            en: 'Europe (AOD)'
        },
        value: 'aod_europe',
    },
    {
        labelName: {
            ru: 'Азия (AOD)',
            en: 'Asia (AOD)'
        },
        value: 'aod_east',
    },
]