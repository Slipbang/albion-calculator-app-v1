import styles from './CalculatorForm.module.scss'

import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../store/language/language-selector";

import StyledCalculatorFormWrapper from "./CalculatorFormSC/StyledCalculatorFormWrapper";

import FormButtons from "./FormButtons/FormButtons";
import PercentInput from "./Inputs/PercentInput/PercentInput";

import ItemTierSelector from "./Selectors/ItemTierSelector/ItemTierSelector";
import ResourceSelector from "./Selectors/ResourceSelector/ResourceSelector";
import ItemSelector from "./Selectors/ItemSelector/ItemSelector";
import {memo} from 'react';
import PercentError from "./Errors/PercentError";
import AmountError from "./Errors/AmountError";
import MainResourceInput from "./Inputs/MainResourceInput/MainResourceInput";
import ConsumablesSelector from "./Selectors/ConsumableSelector/ConsumablesSelector";
import {TCalcProps} from "../../../../types/calculatorPropsType";

const CalculatorForm = memo(({calculatorType}: {calculatorType: TCalcProps}) => {

    const {language, selectedLanguage} = useSelector(selectLanguage);
    const {calculatorFormStrings} = language;

    const selectorsProps = {
        calculatorFormStrings,
        selectedLanguage,
        calculatorType,
    }

    return (
        <StyledCalculatorFormWrapper>
            <div className={styles.calculatorForm}>
                <h3 className={styles.headerStyles}>{calculatorFormStrings.craftHeader[calculatorType]}</h3>

                {calculatorType === 'ITEMS' && (
                    <>
                        <ItemSelector {...selectorsProps}/>
                        <ItemTierSelector {...selectorsProps}/>
                    </>
                )}

                {calculatorType === 'RESOURCES' && <ResourceSelector {...selectorsProps}/>}

                {(calculatorType === 'ITEMS' || calculatorType === 'RESOURCES') && (
                    <>
                        <MainResourceInput
                            calculatorType={calculatorType}
                            calculatorFormStrings={calculatorFormStrings}
                        />

                        <AmountError
                            errorStyles={styles.errorStyles}
                            calculatorFormStrings={calculatorFormStrings}
                        />
                    </>
                )}

                {(calculatorType === 'FOOD' || calculatorType === 'POTIONS') && <ConsumablesSelector {...selectorsProps}/>}

                <PercentInput calculatorFormStrings={calculatorFormStrings} />

                <PercentError
                    errorStyles={styles.errorStyles}
                    calculatorFormStrings={calculatorFormStrings}
                />

                <FormButtons
                    calculatorType={calculatorType}
                />
            </div>
        </StyledCalculatorFormWrapper>
    )
})

export default CalculatorForm;


