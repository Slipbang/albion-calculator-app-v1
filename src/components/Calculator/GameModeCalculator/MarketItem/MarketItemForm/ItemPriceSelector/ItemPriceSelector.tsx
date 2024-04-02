import StyledImageBox from "../../../../StyledComponentsCommon/StyledImageBox";
import {silver} from "../../../../CommonImgReexports/CommonImgReexports";
import {selectCity} from '../../MarketItemImgReexports/MarketItemImgReexports';
import CustomPriceSelector from "../../../../CustomSelectors/CustomPriceSelector";
import StyledInputPrice from "../../MarketItemSC/StyledInputPrice";
import StyledDecreasePriceButton from "../../MarketItemSC/StyledDecreasePriceButton";
import StyledIncreasePriceButton from "../../MarketItemSC/StyledIncreasePriceButton";
import {useSelector} from "react-redux";
import {selectOwnItemPriceMI, selectPriceFetchedState} from "../../../../../../store/interface/interface-selector";
import {useEffect} from "react";
import {useLazyGetItemsDataQuery} from "../../../../../../store/api/api";
import {selectMarketAction, selectMarketItem} from "../../../../../../store/GMProfit/gm-profit-selectors";
import {useAppDispatch} from "../../../../../../store";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import styles from './ItemPriceSelector.module.scss'
import {selectLanguage} from "../../../../../../store/language/language-selector";

const ItemPriceSelector = () => {
    const dispatchAction = useAppDispatch();

    const {language} = useSelector(selectLanguage);
    const {marketItemStings} = language;
    const isPriceFetched = useSelector(selectPriceFetchedState);
    const marketAction = useSelector(selectMarketAction);
    const ownItemPrice = useSelector(selectOwnItemPriceMI);
    const selectedMarketItem = useSelector(selectMarketItem);
    const {itemId} = selectedMarketItem;

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
        fetchItemsData({itemsParams: itemId!, isBlackMarket: (marketAction === 'sell' && itemId !== null)});
    }

    const setItemPriceHandler = (value: number) => {
        dispatchAction(interfaceSliceActions.setItemPriceMI(value));
    }

    useEffect(() => {
        if (!!isPriceFetched) {
            fetchDataHandler();
        }
    }, [isPriceFetched]);

    return (
        <div className={styles.itemPrice}>
            <div className={styles.priceLabel}>
                <p>{marketItemStings.priceLabel}</p>
            </div>
            {!!isPriceFetched && <div>
                <StyledImageBox $position={'static'} $image={selectCity} $width={250} $height={27}>
                    {!isDataFetching && !isItemsHasError &&
                        <CustomPriceSelector
                            selectorStyles={styles.citySelector}
                            selectedCityStyles={styles.selectedCity}
                            optionsStyles={styles.cityOptions}
                            cityListStyles={styles.cityList}
                            setFunction={setItemPriceHandler}
                            itemsData={itemsData!}
                        />}
                    {!!isDataFetching && <p className={styles.loaderStyles}>loading...</p>}
                    {!!isItemsHasError && <p className={styles.loaderStyles}>error!</p>}
                </StyledImageBox>
            </div>}
            {!isPriceFetched && <StyledInputPrice>
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
                    $left={150}
                    $top={149}
                />
                <input
                    id='MIItemPriceInput'
                    type="number"
                    value={ownItemPrice}
                    onChange={(event) => setOwnItemPriceHandler(+event.target.value)}
                />
                <StyledIncreasePriceButton
                    onClick={() => setOwnItemPriceHandler(ownItemPrice + 1)}
                />
            </StyledInputPrice>}
        </div>
    )
}

export default ItemPriceSelector;