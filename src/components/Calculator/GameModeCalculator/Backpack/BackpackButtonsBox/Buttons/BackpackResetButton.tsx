import React, {useEffect, useRef} from "react";
import {GMProfitSliceActions} from "../../../../../../store/GMProfit/gm-profit-slice";
import {useAppDispatch} from "../../../../../../store";
import StyledCompleteResetButton from "../../../../StyledComponentsCommon/StyledСompleteResetButton";
import {useSelector} from "react-redux";
import {selectDemoMode, selectGuide} from "../../../../../../store/interface/interface-selector";

const BackpackResetButton = () => {
    const dispatchAction = useAppDispatch();

    const buttonRef = useRef<HTMLButtonElement>(null);
    const {script} = useSelector(selectGuide);
    const isDemo = useSelector(selectDemoMode);

    const resetBackpackHandler = () => {
        dispatchAction(GMProfitSliceActions.resetBackpack());
    }

    useEffect(() => {
        if (script === 24) {
            buttonRef.current?.click();
            buttonRef.current?.focus();
        }
    }, [script])

    return (
        <StyledCompleteResetButton
            ref={buttonRef}
            $isDemo={isDemo}
            onClick={() => resetBackpackHandler()}
        />
    )
}

export default BackpackResetButton;