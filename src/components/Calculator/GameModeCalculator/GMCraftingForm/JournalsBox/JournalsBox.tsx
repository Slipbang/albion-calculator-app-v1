import JournalUsageButton from "./JournalUsageButton/JournalUsageButton";
import JournalsSelectors from "./JournalsSelectors/JournalsSelectors";
import React from "react";
import {TCalcProps} from "../../../../../types/calculatorPropsType";
import styles from './JournalsBox.module.scss';

const JournalsBox = (props: {calculatorType: TCalcProps}) => {
    const {calculatorType} = props;

    return <>
        {calculatorType === 'ITEMS' && <div
            className={styles.journalPrice}
        >
            <JournalUsageButton />
            <JournalsSelectors />
        </div>}
    </>
}

export default JournalsBox;