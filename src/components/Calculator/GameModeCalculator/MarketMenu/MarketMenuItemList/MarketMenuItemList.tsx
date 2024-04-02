import StyledThumb from "../../../StyledComponentsCommon/StyledThumb";
import StyledMarketActionButton from "../MarketMenuSC/StyledMarketActionButton";
import {IBagCell} from "../../../../../store/Items/craftItems";
import {GMProfitSliceActions} from "../../../../../store/GMProfit/gm-profit-slice";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../store";
import {selectLanguage} from "../../../../../store/language/language-selector";
import {useSelector} from "react-redux";
import {
    selectBackpackItems,
    selectMarketAction,
    selectMarketItems
} from "../../../../../store/GMProfit/gm-profit-selectors";
import Notification from "./Notification/Notification";
import styles from './MarketMenuItemList.module.scss';
import {useDeferredValue} from "react";
import MarketItemLoader from "../../GMItemSelector/ItemsLoaders/MarketItemLoader";
import MarketMenuItem from "./MarketMenuItem/MarketMenuItem";

const MarketMenuItemList = () => {

    const marketActionSelected = useSelector(selectMarketAction);
    const selectedMarketItems = useSelector(marketActionSelected === 'buy' ? selectMarketItems : selectBackpackItems);
    const deferredMarketItems = useDeferredValue(selectedMarketItems);

    return <StyledThumb>
        <div className={styles.materials}>
            {selectedMarketItems === deferredMarketItems && deferredMarketItems.map((item, index) => {

                const {itemId} = item;

                return (itemId !== null) && <MarketMenuItem item={item} key={index} index={index}/>

            })}
            {selectedMarketItems !== deferredMarketItems && Array.from({length: 10}).map((_, index) => <MarketItemLoader key={index} />)}

            <Notification/>
        </div>
    </StyledThumb>
}

export default MarketMenuItemList;