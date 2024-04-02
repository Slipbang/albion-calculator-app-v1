import styles from './GMItemSelector.module.scss'
import React from "react";

import StyledWorkBench from "./GMItemSelectorSC/StyledWorkBench";

import WorkBenchTypeSelector from "./WorkBenchTypeSelector/WorkBenchTypeSelector";
import WorkBenchButtons from "./WorkBenchButtons/WorkBenchButtons";
import WorkBenchItemInput from "./WorkBenchItemInput/WorkBenchItemInput";
import WorkBenchItemSelector from "./WorkBenchItemSelector/WorkBenchItemSelector";
import WorkBenchHeader from "./WorkBenchHeader/WorkBenchHeader";
import {useSelector} from "react-redux";
import {selectCalculatorType} from "../../../../store/interface/interface-selector";
import FoodTaxBox from "./FoodTaxBox/FoodTaxBox";
import WorkBenchSelectors from "./WorkBenchSelector/WorkBenchSelectors";

export const GMItemSelector = React.memo(() => {
    const calculatorType = useSelector(selectCalculatorType);

    return (
        <>
            {calculatorType === 'items' && <WorkBenchButtons />}

            <StyledWorkBench>
                <div className={styles.wrapper}>
                    <WorkBenchTypeSelector />

                    <WorkBenchHeader />

                    <FoodTaxBox />

                    <WorkBenchItemInput />

                    <WorkBenchSelectors />

                    <WorkBenchItemSelector />
                </div>
            </StyledWorkBench>
        </>
    )
})