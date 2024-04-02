import StyledMarketButton from "../MarketMenuSC/StyledMarketButton";
import {
    marketBuyPageButtonActive,
    marketBuyPageButtonInactive,
    marketSellPageButtonActive,
    marketSellPageButtonInactive
} from "../MarketMenuImgReexports/MarketMenuImgReexports";
import React from "react";
import {useSelector} from "react-redux";
import {selectMarketMenuShown} from "../../../../../store/interface/interface-selector";
import {selectMarketAction} from "../../../../../store/GMProfit/gm-profit-selectors";
import {GMProfitSliceActions, TMarketActions} from "../../../../../store/GMProfit/gm-profit-slice";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../store";
import {selectLanguage} from "../../../../../store/language/language-selector";


const MarketMenuTypeButtons = () => {
    const isMarketMenuShown = useSelector(selectMarketMenuShown);
    const marketActionSelected = useSelector(selectMarketAction);
    const {language} = useSelector(selectLanguage);
    const {marketMenuStrings} = language;

    const dispatchAction = useAppDispatch();

    const setMarketTypeActionHandler = (actionType: TMarketActions) => {
        dispatchAction(GMProfitSliceActions.setMarketTypeAction(actionType));
        dispatchAction(interfaceSliceActions.resetMarketMenuSelectors());
    }

    return <>
        <StyledMarketButton
            $isMenuShown={isMarketMenuShown}
            $isSelected={marketActionSelected === 'buy' && isMarketMenuShown}
            $hoverimg={marketBuyPageButtonActive}
            $buttonoimg={marketBuyPageButtonInactive}
            $top={145}
            $left={-50}
            onClick={() => setMarketTypeActionHandler('buy')}
            title={marketMenuStrings.buy}
        />
        <StyledMarketButton
            $isMenuShown={isMarketMenuShown}
            $isSelected={marketActionSelected === 'sell' && isMarketMenuShown}
            $hoverimg={marketSellPageButtonActive}
            $buttonoimg={marketSellPageButtonInactive}
            $top={220}
            $left={-50}
            onClick={() => setMarketTypeActionHandler('sell')}
            title={marketMenuStrings.sell}
        />
    </>
}

export default MarketMenuTypeButtons;