import styles from './CalculatorForm.module.scss'

import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../store/language/language-selector";

import StyledCalculatorFormWrapper from "./CalculatorFormSC/StyledCalculatorFormWrapper";

import FormButton from "./Buttons/FormButton";
import PercentInput from "./Inputs/PercentInput/PercentInput";

import ItemTierSelector from "./Selectors/ItemTierSelector/ItemTierSelector";
import ResourceSelector from "./Selectors/ResourceSelector/ResourceSelector";
import ItemSelector from "./Selectors/ItemSelector/ItemSelector";
import React from 'react';
import PercentError from "./Errors/PercentError";
import AmountError from "./Errors/AmountError";
import MainResourceInput from "./Inputs/MainResourceInput/MainResourceInput";
import ConsumablesSelector from "./Selectors/ConsumableSelector/ConsumablesSelector";
import {TCalcProps} from "../../../../types/calculatorPropsType";

const CalculatorForm = React.memo(({calculatorType}: {calculatorType: TCalcProps}) => {

    const {language, selectedLanguage} = useSelector(selectLanguage);
    const {calculatorFormStrings} = language;

    return (
        <StyledCalculatorFormWrapper>
            <div className={styles.calculatorForm}>
                <h3 className={styles.headerStyles}>{calculatorFormStrings.craftHeader[calculatorType]}</h3>

                {calculatorType === 'items' &&
                    <>
                        <ItemSelector
                            calculatorFormStrings={calculatorFormStrings}
                            selectedLanguage={selectedLanguage}
                        />
                        <ItemTierSelector
                            calculatorFormStrings={calculatorFormStrings}
                            selectedLanguage={selectedLanguage}
                        />
                    </>}

                {calculatorType === 'resource' &&
                    <ResourceSelector
                        calculatorType={calculatorType}
                        calculatorFormStrings={calculatorFormStrings}
                        selectedLanguage={selectedLanguage}
                    />}

                {(calculatorType === 'food' || calculatorType === 'potions') &&
                    <ConsumablesSelector
                        calculatorFormStrings={calculatorFormStrings}
                        selectedLanguage={selectedLanguage}
                    />}

                {(calculatorType === 'items' || calculatorType === 'resource') &&
                    <>
                        <MainResourceInput
                            calculatorType={calculatorType}
                            calculatorFormStrings={calculatorFormStrings}
                        />

                        <AmountError
                            errorStyles={styles.errorStyles}
                            calculatorFormStrings={calculatorFormStrings}
                        />
                    </>}


                 <PercentInput
                    calculatorFormStrings={calculatorFormStrings}
                />

                <PercentError
                    errorStyles={styles.errorStyles}
                    calculatorFormStrings={calculatorFormStrings}
                />

                <FormButton
                    calculatorType={calculatorType}
                />
            </div>
        </StyledCalculatorFormWrapper>
    )
})

export default CalculatorForm;


