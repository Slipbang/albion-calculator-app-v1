import StyledThumb from "../../../StyledComponentsCommon/StyledThumb";
import {selectLanguage} from "../../../../../store/language/language-selector";
import {useSelector} from "react-redux";
import {
    selectBackpackItems,
    selectMarketAction,
    selectMarketItems
} from "../../../../../store/GMProfit/gm-profit-selectors";
import styles from './MarketMenuItemList.module.scss';
import {useDeferredValue} from "react";
import MarketItemLoader from "../../GMItemSelector/ItemsLoaders/MarketItemLoader";
import MarketMenuItem from "./MarketMenuItem/MarketMenuItem";

const MarketMenuItemList = () => {

    const marketActionSelected = useSelector(selectMarketAction);
    const selectedMarketItems = useSelector(marketActionSelected === 'buy' ? selectMarketItems : selectBackpackItems);
    const deferredMarketItems = useDeferredValue(selectedMarketItems);
    const {language, selectedLanguage} = useSelector(selectLanguage);
    const {marketMenuStrings} = language;

    return (
        <StyledThumb>
            <div className={styles.materials} data-notification={marketMenuStrings.alert}>
                {selectedMarketItems === deferredMarketItems && deferredMarketItems.map((item, index) => {
                    const {itemId} = item;

                    return (itemId !== null) && (
                        <MarketMenuItem
                            item={item}
                            key={index}
                            index={index}
                            selectedLanguage={selectedLanguage}
                        />
                    )

                })}
                {selectedMarketItems !== deferredMarketItems && Array.from({length: 10}).map((_, index) => <MarketItemLoader key={index}/>)}
            </div>
        </StyledThumb>
    )
}

export default MarketMenuItemList;