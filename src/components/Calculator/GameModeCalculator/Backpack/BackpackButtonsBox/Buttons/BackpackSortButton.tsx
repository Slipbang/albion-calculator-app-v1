import React from "react";
import {GMProfitSliceActions} from "../../../../../../store/GMProfit/gm-profit-slice";
import {useAppDispatch} from "../../../../../../store";
import StyledDefaultButton from "../../../../StyledComponentsCommon/StyledDefaultButton";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../../../store/language/language-selector";

const BackpackSortButton = () => {
    const dispatchAction = useAppDispatch();
    const {language, selectedLanguage} = useSelector(selectLanguage);
    const isRuSelected = selectedLanguage === 'ru'
    const {backpackString} = language;

    const sortBackpackItemsHandler = () => {
        dispatchAction(GMProfitSliceActions.sortBackpackItems());
    }

    return <StyledDefaultButton
        $width={71}
        $height={25}
        style={{fontSize: `${isRuSelected ? 9 : 12}px`, lineHeight: '15px'}}
        onClick={() => sortBackpackItemsHandler()}
    >
        {backpackString.sortButton}
    </StyledDefaultButton>
}

export default BackpackSortButton;