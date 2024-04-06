import StyledMarketActionButton from "../../MarketMenu/MarketMenuSC/StyledMarketActionButton";
import {GMProfitSliceActions} from "../../../../../store/GMProfit/gm-profit-slice";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../store";
import {useSelector} from "react-redux";
import {useMaxQuantityCalculation} from "../Hooks/useMaxQuantityCalculation";
import {useTotalPriceCalculation} from "../Hooks/useTotalPriceCalculation";
import styles from './MarketActionButton.module.scss';
import {selectLanguage} from "../../../../../store/language/language-selector";

const MarketActionButton = () => {
    const dispatchAction = useAppDispatch();

    const {selectedLanguage} = useSelector(selectLanguage)
    const isRuSelected = selectedLanguage === 'ru';

    const {maxQuantity, selectedMarketItem, marketAction, backpackItems} = useMaxQuantityCalculation();

    const {
        itemNode,
        itemTier,
        itemEnchantmentNum,
        itemId,
        itemName,
        itemImage,
        itemIndex,
        itemEnchantment,
    } = selectedMarketItem;

    const {totalPrice, itemInputQuantity} = useTotalPriceCalculation();

    const sellItemsHandler = (index: number, quantity: number,) => {
        dispatchAction(GMProfitSliceActions.calculateBagSilver(Math.floor(totalPrice-(totalPrice * 0.065))));

        dispatchAction(GMProfitSliceActions.sellBagItems({
            index,
            quantity,
        }))

        dispatchAction(interfaceSliceActions.setItemQuantityMI(maxQuantity! - quantity));

        if (quantity === maxQuantity){
            dispatchAction(interfaceSliceActions.setMarketItemVisibility(false))
        }
    }

    const buyMaterialHandler = () => {
        if (backpackItems.filter(item => item.itemId !== null).length < 48) {
            dispatchAction(GMProfitSliceActions.buyMaterials({
                itemQuantity: itemInputQuantity,
                itemNode,
                itemImage,
                itemEnchantment,
                itemId,
                itemTier,
                itemName,
                itemEnchantmentNum,
            }));

            dispatchAction(GMProfitSliceActions.calculateBagSilver(-Math.floor(totalPrice)));
        }
    }

    return <StyledMarketActionButton
        $isActionBuy={marketAction === 'buy'}
        $isRuSelected={isRuSelected}
        className={styles.buyButton}
        disabled={isNaN(totalPrice) || typeof totalPrice !== "number"}
        onClick={() => {
            if (marketAction === 'buy'){
                buyMaterialHandler();
            }
            if (marketAction === 'sell'){
                sellItemsHandler(itemIndex!, itemInputQuantity);
            }
        }}
    />
}

export default MarketActionButton;