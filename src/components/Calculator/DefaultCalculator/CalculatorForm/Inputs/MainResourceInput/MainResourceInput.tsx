import styles from './MainResourceInput.module.scss';
import StyledCalculatorFormSelector from "../../CalculatorFormSC/StyledCalculatorFormSelector";
import {profitSliceActions} from "../../../../../../store/profit/profit-slice";
import React, {ChangeEvent, useEffect, useRef} from "react";
import {TCalcProps} from "../../../../../../types/calculatorPropsType";
import {useAppDispatch} from "../../../../../../store";
import {useSelector} from "react-redux";
import {selectDivFactor, selectInitialQuantity} from "../../../../../../store/profit/profit-selectors";
import {ISelectedLanguage} from "../../../../../../types/languageTypes";

interface TMainResourceInputProps {
    calculatorType: Extract<TCalcProps, 'ITEMS' | 'RESOURCES'>;
    calculatorFormStrings: ISelectedLanguage['calculatorFormStrings'];
}

const MainResourceInput = (props: TMainResourceInputProps) => {
    const {calculatorType, calculatorFormStrings} = props;

    const dispatchAction = useAppDispatch();

    const inputAmountRef = useRef<HTMLInputElement>(null);

    const quantity = useSelector(selectInitialQuantity);
    const divFactors = useSelector(selectDivFactor);

    const {mainDivFactor} = divFactors[calculatorType];

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
                {calculatorType === "RESOURCES" && calculatorFormStrings.labelResourceAmount}
                {calculatorType === "ITEMS" && calculatorFormStrings.labelItemsAmount}
            </p>
                <StyledCalculatorFormSelector>
                    <input
                        min={mainDivFactor}
                        step={mainDivFactor}
                        ref={inputAmountRef}
                        id="DCItemQuantityInput"
                        type="number"
                        onFocus={() => inputAmountRef.current?.select()}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                dispatchAction(profitSliceActions.getProfitHandler({calculatorType}))
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