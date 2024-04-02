import StyledModalWindow from "../StyledComponentsCommon/StyledModalWindow";
import React from "react";
import {useSelector} from "react-redux";
import {selectInfoTableVisibility, selectMarketItemVisibility} from "../../../store/interface/interface-selector";

const ModalWindow = () => {
    const isMarketItemVisible = useSelector(selectMarketItemVisibility);
    const isInfoTableShown = useSelector(selectInfoTableVisibility);

    return <>
        {(!!isMarketItemVisible || isInfoTableShown) && <StyledModalWindow/>}
    </>
}

export default ModalWindow;