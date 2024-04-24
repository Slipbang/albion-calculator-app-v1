import React from "react";
import {GMProfitSliceActions} from "../../../../../../store/GMProfit/gm-profit-slice";
import {useAppDispatch} from "../../../../../../store";
import StyledDefaultButton from "../../../../StyledComponentsCommon/StyledDefaultButton";
import {selectLanguage} from "../../../../../../store/language/language-selector";
import {useSelector} from "react-redux";

const BackpackGatherButton = () => {
    const dispatchAction = useAppDispatch();
    const {language} = useSelector(selectLanguage);
    const {backpackString} = language;

    const gatherBackpackItemsHandler = () => {
        dispatchAction(GMProfitSliceActions.gatherBackpackItems());
    }
    return (
        <StyledDefaultButton
            $width={71}
            $height={25}
            style={{fontSize: '12px'}}
            onClick={() => gatherBackpackItemsHandler()}
        >
            {backpackString.gatherButton}
        </StyledDefaultButton>
    )
}

export default BackpackGatherButton;