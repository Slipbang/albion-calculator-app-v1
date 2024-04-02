import StyledMarketSelector from "../../MarketMenuSC/StyledMarketSelector";
import MarketMenuItemInput from "./MarketMenuItemInput/MarketMenuItemInput";
import TierSelector from "./TierSelector/TierSelector";
import EnchantmentSelector from "./EnchantmentSelector/EnchantmentSelector";
import TypeSelector from "./TypeSelector/TypeSelector";
import ResetButton from "./ResetButton/ResetButton";
import React from "react";

const MarketMenuSelectors = () => {

    return <StyledMarketSelector>
        <MarketMenuItemInput />

        <TierSelector />

        <EnchantmentSelector />

        <TypeSelector />

        <ResetButton />
    </StyledMarketSelector>
}

export default MarketMenuSelectors;