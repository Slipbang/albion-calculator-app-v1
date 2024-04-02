import {useSelector} from "react-redux";
import {selectItem} from "../../../../../store/profit/profit-selectors";

const useDefineSelectorImg = () => {
    const selectedItem = useSelector(selectItem);

    const {selectedItemBodyId, selectedItemTier, selectedItemType, itemName} = selectedItem;

    const selectorImg = ((selectedItemType === 'BAG' && selectedItemBodyId !== 'INSIGHT') || selectedItemType === 'CAPE')
        ? `https://render.albiononline.com/v1/item/${selectedItemTier}_${selectedItemBodyId}`
        : `https://render.albiononline.com/v1/item/${selectedItemTier}_${selectedItemType}_${selectedItemBodyId}`;

    return {
        itemName,
        selectedItemBodyId,
        selectedItemTier,
        selectedItemType,
        selectorImg
    }
}

export {useDefineSelectorImg};