import React from "react";
import {GMProfitSliceActions} from "../../../../../../store/GMProfit/gm-profit-slice";
import {useAppDispatch} from "../../../../../../store";
import StyledCompleteResetButton from "../../../../StyledComponentsCommon/StyledСompleteResetButton";

const BackpackResetButton = () => {
    const dispatchAction = useAppDispatch();

    const resetBackpackHandler = () => {
        dispatchAction(GMProfitSliceActions.resetBackpack());
    }

    return <StyledCompleteResetButton
        onClick={() => resetBackpackHandler()}
    />
}

export default BackpackResetButton;