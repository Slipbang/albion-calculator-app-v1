import React from "react";
import {useSelector} from "react-redux";
import {selectErrors} from "../../../../../store/profit/profit-selectors";
import {ISelectedLanguage} from "../../../../../types/languageTypes";

interface IPercentErrorProps {
    errorStyles: string;
    calculatorFormStrings: ISelectedLanguage['calculatorFormStrings'];
}

const PercentError = (props: IPercentErrorProps) => {
    const {errorStyles ,calculatorFormStrings} = props;

    const {percentError} = useSelector(selectErrors);

    return <>
        {percentError && <p className={errorStyles}>{calculatorFormStrings.percentError}</p>}
    </>
}

export default PercentError;