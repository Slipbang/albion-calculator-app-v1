import React from "react";
import {useAppDispatch} from "../../../../../../../store";
import {interfaceSliceActions} from "../../../../../../../store/interface/interface-slice";
import {useSelector} from "react-redux";
import {selectInputMM} from "../../../../../../../store/interface/interface-selector";
import styles from './MarketMenuItemInput.module.scss';
import {selectLanguage} from "../../../../../../../store/language/language-selector";

const MarketMenuItemInput = () => {
    const dispatchAction = useAppDispatch();
    const {language} = useSelector(selectLanguage);
    const {marketMenuStrings} = language;

    const inputSearch = useSelector(selectInputMM);

    const setInputSearch = (value: string) => {
        dispatchAction(interfaceSliceActions.setInputSearchMM(value));
    }

    return (
        <input
            id='MMSearchItemInput'
            type="text"
            className={styles.inputTextStyle}
            placeholder={marketMenuStrings.search}
            value={inputSearch}
            onChange={(event) => setInputSearch(event.target.value)}
        />
    )
}

export default MarketMenuItemInput;