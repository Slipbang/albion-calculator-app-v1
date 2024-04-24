import StyledWorkBenchInput from "../GMItemSelectorSC/StyledWorkBenchInput";
import React from "react";
import {useAppDispatch} from "../../../../../store";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useSelector} from "react-redux";
import {selectInputIS} from "../../../../../store/interface/interface-selector";
import styles from './WorkBenchItemInput.module.scss';
import {selectLanguage} from "../../../../../store/language/language-selector";

const WorkBenchItemInput = () => {
    const inputSearch = useSelector(selectInputIS);
    const {language} = useSelector(selectLanguage);
    const {GMItemSelectorStings} = language;

    const dispatchAction = useAppDispatch();

    const setInputSearchHandler = (value: string) => {
        dispatchAction(interfaceSliceActions.setInputSearchIS(value));
    }

    return (
        <StyledWorkBenchInput>
            <input
                id='WBSearchItemInput'
                type="text"
                className={styles.inputTextStyle}
                value={inputSearch}
                placeholder={GMItemSelectorStings.search}
                onChange={(event) => {
                    setInputSearchHandler(event.target.value);
                }}
            />
        </StyledWorkBenchInput>
    )
}

export default WorkBenchItemInput;