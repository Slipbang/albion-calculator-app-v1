import QuantityInput from "./QuantityInput/QuantityInput";
import EnchantmentButtons from "./EnchantmentButtons/EnchantmentButtons";
import ReturnRateInput from "./ReturnRateInput/ReturnRateInput";
import ResourceBox from "./ResourcesBox/ResourceBox";
import React from "react";
import styles from './CalculatorForm.module.scss';
import {TCalcProps} from "../../../../../types/calculatorPropsType";

const CalculatorForm = (props: {calculatorType: TCalcProps}) => {
    const {calculatorType} = props

    return (
        <div className={styles.calculatorForm}>
            <QuantityInput />

            <EnchantmentButtons
                calculatorType={calculatorType}
            />

            <ReturnRateInput />

            <ResourceBox />
        </div>
    )
}

export default CalculatorForm;