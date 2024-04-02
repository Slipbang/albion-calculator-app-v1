import StyledThumb from "../../../StyledComponentsCommon/StyledThumb";
import StyledMarketActionButton from "../MarketMenuSC/StyledMarketActionButton";
import {IBagCell} from "../../../../../store/Items/craftItems";
import {GMProfitSliceActions} from "../../../../../store/GMProfit/gm-profit-slice";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../store";
import {selectLanguage} from "../../../../../store/language/language-selector";
import {useSelector} from "react-redux";
import {
    selectEnchantmentMM,
    selectInputMM,
    selectItemTypeMM,
    selectTierMM
} from "../../../../../store/interface/interface-selector";
import {
    selectBackpackItems,
    selectMarketAction,
    selectMarketItems
} from "../../../../../store/GMProfit/gm-profit-selectors";
import Notification from "./Notification/Notification";
import styles from './MarketMenuItemList.module.scss';
import {useDeferredValue} from "react";
import MarketItemLoader from "../../GMItemSelector/ItemsLoaders/MarketItemLoader";

const MarketMenuItemList = () => {
    const dispatchAction = useAppDispatch();

    const selectedTier = useSelector(selectTierMM);
    const selectedItemType = useSelector(selectItemTypeMM);
    const selectedEnchantment = useSelector(selectEnchantmentMM);
    const inputSearch = useSelector(selectInputMM);
    const marketActionSelected = useSelector(selectMarketAction);
    const selectedMarketItems = useSelector(marketActionSelected === 'buy' ? selectMarketItems : selectBackpackItems);
    const {selectedLanguage} = useSelector(selectLanguage);
    const isRuSelected = selectedLanguage === 'ru';
    const deferredMarketItems = useDeferredValue(selectedMarketItems);

    const setMarketItemHandler = (selectedMarketItem: IBagCell) => {
        dispatchAction(GMProfitSliceActions.setSelectedMarketItem(selectedMarketItem))
        dispatchAction(interfaceSliceActions.setMarketItemVisibility(true))
    }

    const validateItemHandler = (type: string, enchantment: string, tier: string, title: string) => {
        return (selectedItemType.value !== '' ? selectedItemType.value.includes(type) : true)
            && selectedEnchantment.value.includes(enchantment || '0')
            && selectedTier.value.includes(tier)
            && title.toLowerCase().match(inputSearch.toLowerCase())
    }

    return <StyledThumb>
        <div className={styles.materials}>
            {selectedMarketItems === deferredMarketItems && deferredMarketItems.map((item, index) => {

                const {
                    itemQuantity,
                    itemName,
                    itemId,
                    itemImage,
                    itemTier,
                    itemNode,
                    itemEnchantmentNum,
                    itemEnchantment,
                } = item;

                return (itemId !== null) && <div
                    key={index}
                    className={styles.materialItem}
                    style={validateItemHandler(itemNode, itemEnchantmentNum, itemTier, itemName?.[selectedLanguage]!) ? {display: 'flex'} : {display: 'none'}}
                >
                    <div
                        title={itemName?.[selectedLanguage]}
                        className={styles.itemImg}
                    >
                        <img
                            className={styles.backgroundSkeleton}
                            draggable={false}
                            src={itemImage}
                            alt={itemName?.['en']}
                        />
                        <div className={styles.itemQuantity}>
                            <p>{itemQuantity}</p>
                        </div>
                    </div>

                    <div
                        className={styles.itemName}
                        style={{fontSize: `${(itemName![selectedLanguage]!.length) < 17 ? 15 : 12}px`}}
                    >
                        <p>{itemName?.[selectedLanguage]}</p>
                    </div>

                    <StyledMarketActionButton
                        $isActionBuy={marketActionSelected === 'buy'}
                        $isRuSelected={isRuSelected}
                        onClick={() =>
                            setMarketItemHandler({
                                itemQuantity,
                                itemName,
                                itemImage,
                                itemId,
                                itemTier,
                                itemIndex: index,
                                itemNode,
                                itemEnchantmentNum,
                                itemEnchantment,
                            })
                        }
                    />
                </div>
            })}
            {selectedMarketItems !== deferredMarketItems && Array.from({length: 10}).map((_, index) => <MarketItemLoader key={index} />)}

            <Notification/>
        </div>
    </StyledThumb>
}

export default MarketMenuItemList;