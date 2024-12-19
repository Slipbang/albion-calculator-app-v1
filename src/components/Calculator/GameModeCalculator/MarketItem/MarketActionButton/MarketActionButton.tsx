import StyledMarketActionButton from "../../MarketMenu/MarketMenuSC/StyledMarketActionButton";
import {GMProfitSliceActions} from "../../../../../store/GMProfit/gm-profit-slice";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../store";
import {useSelector} from "react-redux";
import {useMaxQuantityCalculation} from "../Hooks/useMaxQuantityCalculation";
import {useTotalPriceCalculation} from "../Hooks/useTotalPriceCalculation";
import styles from './MarketActionButton.module.scss';
import {selectLanguage} from "../../../../../store/language/language-selector";
import {selectDemoMode, selectGuide, selectItemsDataLoading} from "../../../../../store/interface/interface-selector";
import {useEffect, useRef} from "react";

const MarketActionButton = () => {
    const dispatchAction = useAppDispatch();

    const isItemsDataLoading = useSelector(selectItemsDataLoading);
    const {selectedLanguage} = useSelector(selectLanguage);
    const {script} = useSelector(selectGuide);
    const isRuSelected = selectedLanguage === 'ru';
    const isDemo = useSelector(selectDemoMode);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const {maxQuantity, selectedMarketItem, marketAction, backpackItems} = useMaxQuantityCalculation();

    const {itemIndex} = selectedMarketItem;

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
                ...selectedMarketItem,
                itemQuantity: itemInputQuantity,
            }));
            dispatchAction(GMProfitSliceActions.calculateBagSilver(-Math.floor(totalPrice)));
        }
    }

    const isButtonDisabled = () => {
        return isNaN(totalPrice) || typeof totalPrice !== "number" || isItemsDataLoading;
    }

    useEffect(() => {
        if ([6, 21,23].includes(script)) {
            buttonRef.current?.click();
            buttonRef.current?.focus();
        }
    }, [script])

    return (
        <StyledMarketActionButton
            $isDemo={isDemo}
            ref={buttonRef}
            $isActionBuy={marketAction === 'buy'}
            $isRuSelected={isRuSelected}
            className={styles.buyButton}
            disabled={isButtonDisabled()}
            onClick={() => {
                if (marketAction === 'buy') {
                    buyMaterialHandler();
                }
                if (marketAction === 'sell') {
                    sellItemsHandler(itemIndex!, itemInputQuantity);
                }
            }}
        />
    )
}

export default MarketActionButton;