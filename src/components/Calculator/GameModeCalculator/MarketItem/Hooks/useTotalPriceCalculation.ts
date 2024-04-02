import {useSelector} from "react-redux";
import {
    selectItemPriceMI,
    selectItemQuantityMI,
    selectOwnItemPriceMI,
    selectPriceFetchedState
} from "../../../../../store/interface/interface-selector";

const useTotalPriceCalculation = () => {
    const itemInputQuantity = useSelector(selectItemQuantityMI);
    const isPriceFetched = useSelector(selectPriceFetchedState);
    const ownItemPrice = useSelector(selectOwnItemPriceMI);
    const fetchedItemPrice = useSelector(selectItemPriceMI);

    const totalPrice = itemInputQuantity * (!isPriceFetched ? ownItemPrice : fetchedItemPrice!);

    return {totalPrice, itemInputQuantity};
}

export {useTotalPriceCalculation};