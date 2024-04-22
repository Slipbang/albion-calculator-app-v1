import styles from './MainResourceInput.module.scss';
import StyledCalculatorFormSelector from "../../CalculatorFormSC/StyledCalculatorFormSelector";
import {profitSliceActions} from "../../../../../../store/profit/profit-slice";
import React, {ChangeEvent, useEffect, useRef} from "react";
import {TCalcProps} from "../../../../../../types/calculatorPropsType";
import {useAppDispatch} from "../../../../../../store";
import {useSelector} from "react-redux";
import {selectDivFactor, selectInitialQuantity} from "../../../../../../store/profit/profit-selectors";
import {ISelectedLanguage} from "../../../../../../types/languageTypes";

const MainResourceInput = (props: {calculatorType: TCalcProps, calculatorFormStrings: ISelectedLanguage['calculatorFormStrings']}) => {
    const {calculatorType, calculatorFormStrings} = props;

    const dispatchAction = useAppDispatch();

    const inputAmountRef = useRef<HTMLInputElement>(null);

    const quantity = useSelector(selectInitialQuantity);
    const {resourcesDivFactor, itemDivFactor} = useSelector(selectDivFactor);

    let divFactor: number;
    if (calculatorType === 'items'){
        divFactor = itemDivFactor.mainDivFactor;
    }
    if (calculatorType === 'resource'){
        divFactor = resourcesDivFactor.mainDivFactor;
    }

    const changeQuantityHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        dispatchAction(profitSliceActions.setAmount(+event.target.value));
    }

    useEffect(() => {
        dispatchAction(profitSliceActions.setAmount(1));
    }, [calculatorType])

    return (
        <div className={styles.wrapper}>
            <p>
                {calculatorType === "resource" && calculatorFormStrings.labelResourceAmount}
                {calculatorType === "items" && calculatorFormStrings.labelItemsAmount}
            </p>
                <StyledCalculatorFormSelector>
                    <input
                        min={divFactor!}
                        step={divFactor!}
                        ref={inputAmountRef}
                        id="DCItemQuantityInput"
                        type="number"
                        onFocus={() => inputAmountRef.current?.select()}
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