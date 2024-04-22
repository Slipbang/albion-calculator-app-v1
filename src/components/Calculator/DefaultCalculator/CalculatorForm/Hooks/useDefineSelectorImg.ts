import {useSelector} from "react-redux";
import {selectDivFactor, selectItem} from "../../../../../store/profit/profit-selectors";
import {srcRoute} from "../../../../../store/api/api";

const useDefineSelectorImg = () => {
    const selectedItem = useSelector(selectItem);
    const {itemDivFactor, resourcesDivFactor} = useSelector(selectDivFactor);

    const {selectedItemBodyId, selectedItemTier, selectedItemType, itemName} = selectedItem;

    const selectorImg = ((selectedItemType === 'BAG' && selectedItemBodyId !== 'INSIGHT') || selectedItemType === 'CAPE')
        ? `${srcRoute}${selectedItemTier}_${selectedItemBodyId}`
        : `${srcRoute}${selectedItemTier}_${selectedItemType}_${selectedItemBodyId}`;

    return {
        itemName,
        selectedItemBodyId,
        selectedItemTier,
        selectedItemType,
        selectorImg,
        itemDivFactor,
        resourcesDivFactor,
    }
}

export {useDefineSelectorImg};