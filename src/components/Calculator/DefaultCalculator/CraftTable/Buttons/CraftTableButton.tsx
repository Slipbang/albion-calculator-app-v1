import StyledCraftTableButton from "../CraftTableSC/StyledCraftTableButton";
import React from "react";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../store";
import {useSelector} from "react-redux";
import {selectCraftTableVisibility} from "../../../../../store/interface/interface-selector";

const CraftTableButton = () => {
    const dispatchAction = useAppDispatch();

    const isCraftTableShown = useSelector(selectCraftTableVisibility);

    const toggleCraftTableVisibilityHandler = () => {
        dispatchAction(interfaceSliceActions.toggleCraftTableVisibility());
    }

    return <StyledCraftTableButton
        $isCraftTableShown={isCraftTableShown}
        onClick={() => toggleCraftTableVisibilityHandler()}
    />
}

export default CraftTableButton;