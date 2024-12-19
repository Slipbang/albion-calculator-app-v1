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
import ItemQualitySelector from "./ItemQualitySelector/ItemQualitySelector";
import {qualityOptions} from "../../../../store/Options/CustomSelecrorsOptions";

const MarketItem = ({script}: {script: number}) => {
    const dispatchAction = useAppDispatch();

    const closeMarketItemHandler = () => {
        dispatchAction(interfaceSliceActions.setMarketItemVisibility(false));
        dispatchAction(interfaceSliceActions.setIsPriceFetchedMI(false));
        dispatchAction(interfaceSliceActions.setItemQualityMI(qualityOptions[0]));
    }

    return (
        <StyledMarketItem $noPointersEvents={[4,5,6,20,22].includes(script)}>
            <StyledCloseButton onClick={() => closeMarketItemHandler()} />

            <MarketItemImage />

            <ItemQualitySelector />

            <OwnPriceButtonBox />

            <MaxItemQuantity />

            <ItemName />

            <MarketItemForm />

            <MarketActionButton />
        </StyledMarketItem>
    )
}

export default MarketItem;

