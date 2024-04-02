import StyledCustomCheckButton from "../../../StyledComponentsCommon/StyledCustomCheckButton";
import CustomPriceSelector from "../../../CustomSelectors/CustomPriceSelector";
import StyledImageBox from "../../../StyledComponentsCommon/StyledImageBox";
import {silver} from "../../../CommonImgReexports/CommonImgReexports";
import StyledInfoIcon from "../GMCraftingFormSC/StyledInfoIcon";
import {useArtefacts} from "../Hooks/useArtefacts";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../../../store";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useLazyGetItemsDataQuery} from "../../../../../store/api/api";
import styles from './ArtefactsBox.module.scss';
import {selectLanguage} from "../../../../../store/language/language-selector";
import {selectWorkBenchItem} from "../../../../../store/GMProfit/gm-profit-selectors";
import {
    selectArtefactPriceCF,
    selectArtefactPriceFetchedStateCF, selectItemsQuantityCF,
    selectOwnArtefactPriceCF
} from "../../../../../store/interface/interface-selector";

const ArtefactsBox = () => {
    const dispatchAction = useAppDispatch();

    const itemsQuantity = useSelector(selectItemsQuantityCF);
    const isArtefactPriceFetched = useSelector(selectArtefactPriceFetchedStateCF);
    const ownArtefactPrice = useSelector(selectOwnArtefactPriceCF);
    const selectedWorkBenchItem = useSelector(selectWorkBenchItem);
    const fetchedArtefactPrice = useSelector(selectArtefactPriceCF);

    const {artefactItemId} = selectedWorkBenchItem;

    const {language} = useSelector(selectLanguage);
    const {GMCraftingFormStrings} = language;

    const {
        totalArtefactPrice,
    } = useArtefacts({
        isArtefactPriceFetched,
        fetchedArtefactPrice,
        ownArtefactPrice,
        itemsQuantity,
        selectedWorkBenchItem
    });

    const [fetchArtefactsData, {
        isFetching: isArtefactsFetching,
        isError: isArtefactsError,
        data: artefactsData
    }] = useLazyGetItemsDataQuery();

    const fetchArtefactsDataHandler = () => {
        fetchArtefactsData({itemsParams: artefactItemId!, isBlackMarket: false});
    }

    const setIsArtefactPriceFetchedHandler = () => {
        dispatchAction(interfaceSliceActions.setIsArtefactPriceFetchedCF())
    }

    const setOwnArtefactPriceHandler = (value: number) => {
        dispatchAction(interfaceSliceActions.setOwnArtefactPriceCF(value));
    }

    const setArtefactPriceHandler = (value: number) => {
        dispatchAction(interfaceSliceActions.setArtefactPriceCF(value));
    }

    useEffect(() => {
        fetchArtefactsDataHandler()
    }, [artefactItemId])

    return (
        <>
            {!!artefactItemId &&
                <div
                    className={styles.artefactPrice}
                    draggable={true}
                    onDragStart={event => event.preventDefault()}
                    onDragOver={event => event.preventDefault()}
                    onDrag={event => event.preventDefault()}
                    onDragEnter={event => event.preventDefault()}
                >
                    <div className={styles.artefactsLabel}>
                        <p>{GMCraftingFormStrings.artefactLabel}</p>
                    </div>
                    <StyledCustomCheckButton
                        $isSelected={isArtefactPriceFetched}
                        onClick={() => {
                            setIsArtefactPriceFetchedHandler();
                            !isArtefactPriceFetched && fetchArtefactsDataHandler();

                        }}
                    />
                    {isArtefactPriceFetched &&
                        <div className={styles.artefactSelectCity}>

                            {!isArtefactsFetching && !isArtefactsError &&
                                <CustomPriceSelector
                                    itemsData={artefactsData!}
                                    selectorStyles={styles.artefactSelector}
                                    selectedCityStyles={styles.selectedArtefactCity}
                                    optionsStyles={styles.artefactOptions}
                                    cityListStyles={styles.cityList}
                                    setFunction={setArtefactPriceHandler}
                                />}

                            {!!isArtefactsFetching && <p className={styles.loader}>loading...</p>}
                            {!!isArtefactsError && <p className={styles.loader}>error!</p>}
                        </div>}

                    {!isArtefactPriceFetched
                        && <>
                            <StyledImageBox $position={'static'} $image={silver} $height={30} $width={30}/>
                            <input
                                id='CFArtefactPriceInput'
                                value={ownArtefactPrice}
                                type="number"
                                step={0}
                                min={1}
                                onChange={(event) => {
                                    if (+event.target.value >= 1) {
                                        setOwnArtefactPriceHandler(+event.target.value);
                                    }
                                }}
                            />
                        </>}

                    <StyledInfoIcon
                        title={`${GMCraftingFormStrings.artefactInfoIconText} ${totalArtefactPrice.toLocaleString('en')}`}
                    />
                </div>}
        </>
    )
}

export default ArtefactsBox;