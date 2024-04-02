import React from "react";
import {GMProfitSliceActions} from "../../../../../../store/GMProfit/gm-profit-slice";
import {useAppDispatch} from "../../../../../../store";
import {useSelector} from "react-redux";
import {selectFoodTax} from "../../../../../../store/GMProfit/gm-profit-selectors";


const FoodTaxInput = () => {
    const dispatchAction = useAppDispatch();
    const foodTax = useSelector(selectFoodTax);

    const changeFoodTaxHandler = (tax: number) => {
        if (tax >= 0 && tax <= 9999) {
            dispatchAction(GMProfitSliceActions.setFoodTax(tax));
        }
    }

    return <input
        id='foodTaxInput'
        type="number"
        min={0}
        max={9999}
        value={foodTax}
        onChange={(event) => changeFoodTaxHandler(+event.target.value)}
    />
}

export default FoodTaxInput;