import {memo} from "react";

import StyledMarketMenu from "./MarketMenuSC/StyledMarketMenu";

import MarketMenuTypeButtons from "./MarketMenuButtons/MarketMenuTypeButtons";
import MarketMenuItemList from "./MarketMenuItemList/MarketMenuItemList";
import MarketMenuToggleButton from "./MarketMenuButtons/MarketMenuToggleButton";
import MarketMenuHeader from "./MarketMenuHeader/MarketMenuHeader";
import {useSelector} from "react-redux";
import {selectTheme} from "../../../../store/interface/interface-selector";

const MarketMenu = () => {

    const theme = useSelector(selectTheme);

    return (
        <>
            <MarketMenuTypeButtons />

            <StyledMarketMenu data-theme={theme}>
                <svg
                    id="Line"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    className='shopSVG'
                >
                    <path d="m8 33a1 1 0 0 0 1-1v-3h9a1 1 0 0 0 0-2h-10a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1z" />
                    <circle cx="22" cy="28" r="1" />
                    <path d="m60 23h-12.65l-14.7255-11.7808a1 1 0 0 0 -1.249 0l-14.7255 11.7808h-12.65a1 1 0 0 0 -1 1v28a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1v-28a1 1 0 0 0 -1-1zm-28-9.7192 12.15 9.7192h-24.2995zm27 37.7192h-54v-26h54z" />
                    <path d="m37 43a3.0033 3.0033 0 0 0 3-3v-4a3 3 0 0 0 -6 0v4a3.0033 3.0033 0 0 0 3 3zm-1-7a1 1 0 0 1 2 0v4a1 1 0 0 1 -2 0z" />
                    <path d="m45 43a1 1 0 0 0 1-1v-3h1a3 3 0 0 0 0-6h-2a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1zm1-8h1a1 1 0 0 1 0 2h-1z" />
                    <path d="m17 33a3 3 0 0 0 0 6 1 1 0 0 1 0 2h-2a1 1 0 0 0 0 2h2a3 3 0 0 0 0-6 1 1 0 0 1 0-2h2a1 1 0 0 0 0-2z" />
                    <path d="m25 43a1 1 0 0 0 1-1v-3h2v3a1 1 0 0 0 2 0v-8a1 1 0 0 0 -2 0v3h-2v-3a1 1 0 0 0 -2 0v8a1 1 0 0 0 1 1z" />
                </svg>

                <MarketMenuToggleButton />

                <MarketMenuHeader />

                <MarketMenuItemList />
            </StyledMarketMenu>
        </>
    )
}

export default memo(MarketMenu);