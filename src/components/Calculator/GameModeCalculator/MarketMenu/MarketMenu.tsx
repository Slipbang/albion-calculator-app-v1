import {memo} from "react";

import StyledMarketMenu from "./MarketMenuSC/StyledMarketMenu";

import MarketMenuTypeButtons from "./MarketMenuButtons/MarketMenuTypeButtons";
import MarketMenuItemList from "./MarketMenuItemList/MarketMenuItemList";
import MarketMenuToggleButton from "./MarketMenuButtons/MarketMenuToggleButton";
import MarketMenuHeader from "./MarketMenuHeader/MarketMenuHeader";

const MarketMenu = () => {

    return (
        <>
            <MarketMenuTypeButtons />

            <StyledMarketMenu>
                <MarketMenuToggleButton />

                <MarketMenuHeader />

                <MarketMenuItemList />
            </StyledMarketMenu>
        </>
    )
}

export default memo(MarketMenu);