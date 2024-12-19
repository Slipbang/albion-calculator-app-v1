import StyledCloseButton from "../../../StyledComponentsCommon/StyledCloseButton";
import React from "react";
import {useAppDispatch} from "../../../../../store";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";

const CloseButton = () => {
    const dispatchAction = useAppDispatch();

    const closeCraftingFormHandler = () => {
        dispatchAction(interfaceSliceActions.setIsCraftingFormVisible(false));
        dispatchAction(interfaceSliceActions.setIsJournalsUsedCF(false));
        dispatchAction(interfaceSliceActions.setIsJournalPriceFetchedCF(false));
        dispatchAction(interfaceSliceActions.setIsArtefactPriceFetchedCF(false));
    };

    return (
        <StyledCloseButton
            onClick={() => closeCraftingFormHandler()}
            onMouseDown={(event) => event.preventDefault()}
        />
    )
}

export default CloseButton;