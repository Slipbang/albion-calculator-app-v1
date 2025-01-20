import React, {useEffect, useRef} from "react";
import {GMProfitSliceActions} from "../../../../../../store/GMProfit/gm-profit-slice";
import {useAppDispatch} from "../../../../../../store";
import {useSelector} from "react-redux";
import {selectFoodTax} from "../../../../../../store/GMProfit/gm-profit-selectors";
import {selectGuide} from "../../../../../../store/interface/interface-selector";


const FoodTaxInput = () => {
    const dispatchAction = useAppDispatch();
    const foodTax = useSelector(selectFoodTax);
    const {script} = useSelector(selectGuide);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const changeFoodTaxHandler = (tax: number) => {
        if (tax >= 0 && tax <= 9999) {
            dispatchAction(GMProfitSliceActions.setFoodTax(tax));
        }
    }

    useEffect(() => {
        if (script === 10) {
            changeFoodTaxHandler(2000);
            inputRef.current?.focus();
        }
    }, [script])

    return (
        <input
            ref={inputRef}
            id='foodTaxInput'
            type="number"
            min={0}
            max={9999}
            value={foodTax}
            onChange={(event) => changeFoodTaxHandler(+event.target.value)}
            onFocus={() => inputRef.current?.select()}
        />
    )
}

export default FoodTaxInput;