import StyledImageBox from "../../../../StyledComponentsCommon/StyledImageBox";
import {silver} from "../../../../CommonImgReexports/CommonImgReexports";
import {selectCity} from '../../MarketItemImgReexports/MarketItemImgReexports';
import CustomPriceSelector from "../../../../CustomSelectors/CustomPriceSelector";
import StyledInputPrice from "../../MarketItemSC/StyledInputPrice";
import StyledDecreasePriceButton from "../../MarketItemSC/StyledDecreasePriceButton";
import StyledIncreasePriceButton from "../../MarketItemSC/StyledIncreasePriceButton";
import {useSelector} from "react-redux";
import {
    selectItemQualityMI,
    selectOwnItemPriceMI,
    selectPriceFetchedState
} from "../../../../../../store/interface/interface-selector";
import {useEffect, useRef} from "react";
import {useLazyGetItemsDataQuery} from "../../../../../../store/api/api";
import {selectMarketAction, selectMarketItem} from "../../../../../../store/GMProfit/gm-profit-selectors";
import {useAppDispatch} from "../../../../../../store";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import styles from './ItemPriceSelector.module.scss'
import {selectLanguage} from "../../../../../../store/language/language-selector";
import {selectServerId} from "../../../../../../store/queryParams/query-params-selectors";
import {isTypeResource} from "../../../FunctionUtils/defineType";

const ItemPriceSelector = () => {
    const dispatchAction = useAppDispatch();

    const {language} = useSelector(selectLanguage);
    const {marketItemStings} = language;
    const selectedQuality = useSelector(selectItemQualityMI);
    const isPriceFetched = useSelector(selectPriceFetchedState);
    const marketAction = useSelector(selectMarketAction);
    const ownItemPrice = useSelector(selectOwnItemPriceMI);
    const selectedMarketItem = useSelector(selectMarketItem);
    const {itemId, itemNode} = selectedMarketItem;
    const serverId = useSelector(selectServerId);

    const itemOwnPriceInputRef = useRef<HTMLInputElement>(null)

    const setOwnItemPriceHandler = (value: number) => {
        if (value >= 0) {
            dispatchAction(interfaceSliceActions.setOwnItemPriceMI(value));
        }
    }

    const [fetchItemsData, {
        isFetching: isDataFetching,
        isError: isItemsHasError,
        data: itemsData
    }] = useLazyGetItemsDataQuery();

    const fetchDataHandler = () => {
        fetchItemsData({itemsParams: itemId!, isBlackMarket: (marketAction === 'sell' && itemId !== null), serverId, isEquipment: !isTypeResource(itemNode!)});
    }

    const setItemPriceHandler = (value: number) => {
        dispatchAction(interfaceSliceActions.setItemPriceMI(value));
    }

    useEffect(() => {
        if (!!isPriceFetched) {
            fetchDataHandler();
        }
    }, [isPriceFetched, serverId]);

    return (
        <div className={styles.itemPrice}>
            <div className={styles.priceLabel}>
                <p>{marketItemStings.priceLabel}</p>
            </div>
            {!!isPriceFetched && (
                <div>
                    <StyledImageBox $position={'static'} $image={selectCity} $width={250} $height={27}>
                        {!isDataFetching && !isItemsHasError &&
                            <CustomPriceSelector
                                selectorStyles={styles.citySelector}
                                selectedCityStyles={styles.selectedCity}
                                optionsStyles={styles.cityOptions}
                                cityListStyles={styles.cityList}
                                setFunction={setItemPriceHandler}
                                itemsData={itemsData!}
                                quality={+selectedQuality.value}
                            />}
                        {!!isDataFetching && <p className={styles.loaderStyles}>loading...</p>}
                        {!!isItemsHasError && <p className={styles.loaderStyles}>error!</p>}
                    </StyledImageBox>
                </div>
            )}
            {!isPriceFetched && (
                <StyledInputPrice>
                    <StyledDecreasePriceButton
                        $isDisabled={ownItemPrice <= 0}
                        disabled={ownItemPrice <= 0}
                        onClick={() => setOwnItemPriceHandler(ownItemPrice - 1)}
                    />
                    <StyledImageBox
                        $position={'absolute'}
                        $image={silver}
                        $height={23}
                        $width={23}
                        $left={152}
                        $top={120}
                    />
                    <input
                        id='MIItemPriceInput'
                        type="number"
                        value={ownItemPrice}
                        ref={itemOwnPriceInputRef}
                        onChange={(event) => setOwnItemPriceHandler(+event.target.value)}
                        onFocus={() => itemOwnPriceInputRef.current?.select()}
                    />
                    <StyledIncreasePriceButton
                        onClick={() => setOwnItemPriceHandler(ownItemPrice + 1)}
                    />
                </StyledInputPrice>
            )}
        </div>
    )
}

export default ItemPriceSelector;