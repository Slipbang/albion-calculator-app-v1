import StyledMarketMenuButton from "../MarketMenuSC/StyledMarketMenuButton";
import React from "react";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../store";
import {useSelector} from "react-redux";
import {selectMarketMenuShown} from "../../../../../store/interface/interface-selector";

const MarketMenuToggleButton = () => {
    const dispatchAction = useAppDispatch();

    const isMarketMenuShown = useSelector(selectMarketMenuShown);


    const toggleMarketMenuVisibilityHandler = () => {
        dispatchAction(interfaceSliceActions.toggleMarketMenuShown());
    }
    return <StyledMarketMenuButton
        $isMarketMenuShown={isMarketMenuShown}
        onClick={toggleMarketMenuVisibilityHandler}
    />
}

export default MarketMenuToggleButton;