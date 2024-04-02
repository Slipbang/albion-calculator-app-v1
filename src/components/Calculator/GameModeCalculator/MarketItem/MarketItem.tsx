import {useAppDispatch} from "../../../../store";

import StyledCloseButton from "../../StyledComponentsCommon/StyledCloseButton";
import StyledMarketItem from "./MarketItemSC/StyledMarketItem";
import {interfaceSliceActions} from "../../../../store/interface/interface-slice";

import OwnPriceButtonBox from "./OwnPriceButtonBox/OwnPriceButtonBox";
import MarketActionButton from "./MarketActionButton/MarketActionButton";
import MarketItemImage from "./MarketItemImage/MarketItemImage";
import MaxItemQuantity from "./MaxItemQuantity/MaxItemQuantity";
import ItemName from "./ItemName/ItemName";
import MarketItemForm from "./MarketItemForm/MarketItemForm";


const MarketItem = () => {
    const dispatchAction = useAppDispatch();

    const closeMarketItemHandler = () => {
        dispatchAction(interfaceSliceActions.setMarketItemVisibility(false));
        dispatchAction(interfaceSliceActions.setIsPriceFetchedMI(false));
    }

    return (
        <StyledMarketItem>
            <StyledCloseButton onClick={() => closeMarketItemHandler()} />

            <MarketItemImage />

            <OwnPriceButtonBox />

            <MaxItemQuantity />

            <ItemName />

            <MarketItemForm />

            <MarketActionButton />
        </StyledMarketItem>
    )
}

export default MarketItem;

