import {useSelector} from "react-redux";
import {
    selectBackpackItems,
    selectMarketAction,
    selectMarketItem
} from "../../../../../store/GMProfit/gm-profit-selectors";

const useMaxQuantityCalculation = () => {
    const marketAction = useSelector(selectMarketAction);
    const backpackItems = useSelector(selectBackpackItems);
    const selectedMarketItem = useSelector(selectMarketItem);
    const {
        itemQuantity,
        itemIndex,
    } = selectedMarketItem;

    const bagItemQuantity = backpackItems.find((item,index) => index === itemIndex!)?.itemQuantity;
    const maxQuantity = marketAction === 'sell' ? (bagItemQuantity || 0) : itemQuantity;

    return {maxQuantity, selectedMarketItem, marketAction, backpackItems};
}

export {useMaxQuantityCalculation};