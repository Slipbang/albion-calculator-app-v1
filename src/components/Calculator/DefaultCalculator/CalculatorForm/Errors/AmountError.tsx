import React from "react";
import {useSelector} from "react-redux";
import {selectErrors} from "../../../../../store/profit/profit-selectors";
import {ISelectedLanguage} from "../../../../../types/languageTypes";
interface IAmountErrorProps {
    errorStyles: string;
    calculatorFormStrings: ISelectedLanguage['calculatorFormStrings'];
}

const AmountError = (props: IAmountErrorProps) => {
    const {errorStyles, calculatorFormStrings} = props;

    const {quantityError} = useSelector(selectErrors);

    return (
        <>
            {quantityError &&
                <p className={errorStyles}>{calculatorFormStrings.amountError}</p>}
        </>
    )
}

export default AmountError;