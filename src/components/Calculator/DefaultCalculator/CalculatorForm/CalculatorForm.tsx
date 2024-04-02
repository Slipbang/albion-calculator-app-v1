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
import {selectCalculatorType} from "../../../../store/interface/interface-selector";
import MainResourceInput from "./Inputs/MainResourceInput/MainResourceInput";

const CalculatorForm = React.memo(() => {
    const calculatorType = useSelector(selectCalculatorType);

    const {language, selectedLanguage} = useSelector(selectLanguage);
    const {calculatorFormStrings} = language;

    return (
        <StyledCalculatorFormWrapper>
            <div className={styles.calculatorForm}>
                <h3 className={styles.headerStyles}>{calculatorType === "resource" ? calculatorFormStrings.resourceCraftHeader : calculatorFormStrings.itemsCraftHeader}:</h3>

                {calculatorType === 'items' &&
                    <>
                        <ItemSelector
                            calculatorType={calculatorType}
                            calculatorFormStrings={calculatorFormStrings}
                            selectedLanguage={selectedLanguage}
                        />
                        <ItemTierSelector
                            calculatorFormStrings={calculatorFormStrings}
                            selectedLanguage={selectedLanguage}
                        />
                    </>
                }

                {calculatorType === 'resource' &&
                    <ResourceSelector
                        calculatorType={calculatorType}
                        calculatorFormStrings={calculatorFormStrings}
                        selectedLanguage={selectedLanguage}
                    />
                }

                <MainResourceInput
                    calculatorType={calculatorType}
                    calculatorFormStrings={calculatorFormStrings}
                />

                <AmountError
                    errorStyles={styles.errorStyles}
                    calculatorFormStrings={calculatorFormStrings}
                />

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


