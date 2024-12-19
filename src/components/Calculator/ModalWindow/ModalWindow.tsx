import StyledModalWindow from "../StyledComponentsCommon/StyledModalWindow";
import React from "react";
import {useSelector} from "react-redux";
import {
    selectDemoMode,
    selectInfoTableVisibility,
    selectMarketItemVisibility
} from "../../../store/interface/interface-selector";

const ModalWindow = () => {
    const isMarketItemVisible = useSelector(selectMarketItemVisibility);
    const isInfoTableShown = useSelector(selectInfoTableVisibility);
    const isDemo = useSelector(selectDemoMode);

    return <>
        {(isMarketItemVisible || isInfoTableShown || isDemo) && <StyledModalWindow/>}
    </>
}

export default ModalWindow;