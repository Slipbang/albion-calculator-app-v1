import StyledCustomCheckButton from "../../../../StyledComponentsCommon/StyledCustomCheckButton";
import StyledImageBox from "../../../../StyledComponentsCommon/StyledImageBox";
import {silver} from "../../../../CommonImgReexports/CommonImgReexports";
import CustomPriceSelector from "../../../../CustomSelectors/CustomPriceSelector";
import {useJournals} from "../../Hooks/useJournals";
import {useEffect, useRef} from "react";
import {useAppDispatch} from "../../../../../../store";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import {useLazyGetItemsDataQuery} from "../../../../../../store/api/api";
import styles from './JournalsSelectors.module.scss';
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../../../store/language/language-selector";
import {selectWorkBenchItem} from "../../../../../../store/GMProfit/gm-profit-selectors";
import {
    selectEnchantmentNumCF,
    selectItemsQuantityCF,
    selectJournalPriceFetchedStateCF,
    selectJournalUsageCF,
    selectOwnJournalPriceCF
} from "../../../../../../store/interface/interface-selector";
import {selectServerId} from "../../../../../../store/queryParams/query-params-selectors";

const JournalsSelectors = () => {

    const dispatchAction = useAppDispatch();

    const {language} = useSelector(selectLanguage);
    const {GMCraftingFormStrings} = language;

    const journalPriceInputRef = useRef<HTMLInputElement>(null)

    const isJournalUsed = useSelector(selectJournalUsageCF);
    const enchantmentNum = useSelector(selectEnchantmentNumCF);
    const itemsQuantity = useSelector(selectItemsQuantityCF);
    const ownJournalPrice = useSelector(selectOwnJournalPriceCF);
    const isJournalPriceFetched = useSelector(selectJournalPriceFetchedStateCF);
    const selectedWorkBenchItem = useSelector(selectWorkBenchItem);
    const serverId = useSelector(selectServerId);


    const {emptyJournalId} = useJournals({isJournalUsed, selectedWorkBenchItem, itemsQuantity, enchantmentNum});

    const [fetchJournalsData, {
        isFetching: isJournalsFetching,
        isError: isJournalsError,
        data: journalsData
    }] = useLazyGetItemsDataQuery();

    const fetchJournalsDataHandler = () => {
        fetchJournalsData({itemsParams: emptyJournalId, isBlackMarket: false, serverId});
    }

    const setIsJournalPriceFetchedHandler = () => {
        dispatchAction(interfaceSliceActions.setIsJournalPriceFetchedCF());
    }

    const setOwnJournalPriceHandler = (value: number) => {
        dispatchAction(interfaceSliceActions.setOwnJournalPriceCF(value));
    }

    const setJournalPriceHandler = (value: number) => {
        dispatchAction(interfaceSliceActions.setJournalPriceCF(value));
    }

    useEffect(() => {
        fetchJournalsDataHandler();
    }, [emptyJournalId, serverId])

    return <>
        {isJournalUsed &&
            <div
                className={styles.journalLabels}
                draggable={true}
                onDragStart={event => event.preventDefault()}
                onDragOver={event => event.preventDefault()}
                onDrag={event => event.preventDefault()}
                onDragEnter={event => event.preventDefault()}
            >
                <p>{GMCraftingFormStrings.price}</p>
                <StyledCustomCheckButton
                    $isSelected={isJournalPriceFetched}
                    onClick={() => {
                        setIsJournalPriceFetchedHandler();
                        !isJournalPriceFetched && fetchJournalsDataHandler();
                    }}
                />

                {!isJournalPriceFetched &&
                    <div className={styles.journalLabels}>
                        <StyledImageBox $position={'static'} $image={silver} $height={30} $width={30}/>
                        <input
                            ref={journalPriceInputRef}
                            value={ownJournalPrice}
                            id='CFJournalPriceInput'
                            type="number"
                            step={1}
                            min={0}
                            onFocus={() => journalPriceInputRef.current?.select()}
                            onChange={(event) => {
                                if (+event.target.value >= 0) {
                                    setOwnJournalPriceHandler(+event.target.value);
                                }
                            }}
                        />
                    </div>}

                {isJournalPriceFetched &&
                    <div className={styles.journalSelectCity}>
                        {!isJournalsFetching && !isJournalsError &&
                            <CustomPriceSelector
                                itemsData={journalsData!}
                                selectorStyles={styles.journalSelector}
                                selectedCityStyles={styles.selectedJournalCity}
                                optionsStyles={styles.journalOptions}
                                cityListStyles={styles.cityList}
                                setFunction={setJournalPriceHandler}
                            />}

                        {!!isJournalsFetching && <p className={styles.loader}>loading...</p>}
                        {!!isJournalsError && <p className={styles.loader}>error!</p>}
                    </div>}
            </div>}

    </>
}

export default JournalsSelectors;