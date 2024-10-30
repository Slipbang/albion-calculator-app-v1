import {useSelector} from "react-redux";
import {selectDivFactor, selectItem} from "../../../../../store/profit/profit-selectors";
import {srcRoute} from "../../../../../store/api/api";

const useDefineSelectorImg = () => {
    const selectedItem = useSelector(selectItem);
    const {ITEMS:  itemDivFactor, RESOURCES: resourcesDivFactor} = useSelector(selectDivFactor);

    const {
        selectedItemTier,
        selectedItemId,
    } = selectedItem;

    const selectorImg = `${srcRoute}${selectedItemId}`;

    return {
        selectedItemTier,
        selectedItemId,
        selectorImg,
        itemDivFactor,
        resourcesDivFactor,
    }
}

export {useDefineSelectorImg};