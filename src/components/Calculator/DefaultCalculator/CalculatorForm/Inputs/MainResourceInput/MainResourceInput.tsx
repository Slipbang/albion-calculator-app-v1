import styles from './MainResourceInput.module.scss';
import StyledCalculatorFormSelector from "../../CalculatorFormSC/StyledCalculatorFormSelector";
import {profitSliceActions} from "../../../../../../store/profit/profit-slice";
import React, {ChangeEvent} from "react";
import {TCalcProps} from "../../../../../../types/calculatorPropsType";
import {useAppDispatch} from "../../../../../../store";
import {useSelector} from "react-redux";
import {selectInitialQuantity} from "../../../../../../store/profit/profit-selectors";
import {ISelectedLanguage} from "../../../../../../types/languageTypes";

const MainResourceInput = (props: {calculatorType: TCalcProps, calculatorFormStrings: ISelectedLanguage['calculatorFormStrings']}) => {
    const {calculatorType, calculatorFormStrings} = props;

    const dispatchAction = useAppDispatch();

    const quantity = useSelector(selectInitialQuantity);

    const changeQuantityHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        dispatchAction(profitSliceActions.setAmount(+event.target.value));
    }

    return (
        <div className={styles.wrapper}>
            <p>
                {calculatorType === "resource" && calculatorFormStrings.labelResourceAmount}
                {calculatorType === "items" && calculatorFormStrings.labelItemsAmount}
            </p>
                <StyledCalculatorFormSelector>
                    <input
                        id="DCItemQuantityInput"
                        type="number"
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                dispatchAction(profitSliceActions.getResourceProfitHandler({calculatorType}))
                            }
                        }}
                        onChange={event => changeQuantityHandler(event)}
                        value={quantity}
                    />
                </StyledCalculatorFormSelector>
        </div>
    )
}

export default MainResourceInput;