import StyledMarketActionButton from "../../MarketMenuSC/StyledMarketActionButton";
import {IBagCell} from "../../../../../../store/Items/craftItems";
import {useAppDispatch} from "../../../../../../store";
import {useSelector} from "react-redux";
import {
    selectEnchantmentMM,
    selectInputMM,
    selectItemTypeMM,
    selectTierMM
} from "../../../../../../store/interface/interface-selector";
import {selectMarketAction} from "../../../../../../store/GMProfit/gm-profit-selectors";
import {selectLanguage} from "../../../../../../store/language/language-selector";
import {GMProfitSliceActions} from "../../../../../../store/GMProfit/gm-profit-slice";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import styles from './MarketMenuItem.module.scss';

const MarketMenuItem = ({item, index}: { item: IBagCell, index: number }) => {
    const {itemId, itemImage, itemTier, itemNode, itemEnchantmentNum, itemEnchantment, itemName, itemQuantity} = item;
    const dispatchAction = useAppDispatch();

    const selectedTier = useSelector(selectTierMM);
    const selectedItemType = useSelector(selectItemTypeMM);
    const selectedEnchantment = useSelector(selectEnchantmentMM);
    const inputSearch = useSelector(selectInputMM);
    const marketActionSelected = useSelector(selectMarketAction);
    const {selectedLanguage} = useSelector(selectLanguage);
    const isRuSelected = selectedLanguage === 'ru';

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

    return (
        <div
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
    )
}

export default MarketMenuItem;