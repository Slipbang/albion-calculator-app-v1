import styles from './DefaultCalculator.module.scss'
import CalculatorForm from "./CalculatorForm/CalculatorForm";
import CraftTable from "./CrafTable/CraftTable";
import {useSelector} from "react-redux";
import {
    selectCraftTableVisibility,
    selectGameMode,
    selectInfoTableVisibility
} from "../../../store/interface/interface-selector";
import {useLazyGetItemsDataQuery} from "../../../store/api/api";
import InfoTable from "./InfoTable/InfoTable";
import {PulseLoader} from "react-spinners";
import ErrorNotification from "./ErrorNotification/ErrorNotification";

const DefaultCalculator = () => {
    const gameMode = useSelector(selectGameMode);
    const isCraftTableShown = useSelector(selectCraftTableVisibility);
    const isInfoTableShown = useSelector(selectInfoTableVisibility);

    const [fetchItems, {
        isFetching: isItemFetching,
        isError: isErrorItems,
        data: itemsData,
    }] = useLazyGetItemsDataQuery();

    const [fetchMaterials, {
        isFetching: isMaterialsFetching,
        isError: isErrorMaterials,
        data: materialsData,
    }] = useLazyGetItemsDataQuery();

    const [fetchArtefacts, {
        isFetching: isArtefactsFetching,
        isError: isErrorArtefacts,
        data: artefactsData,
    }] = useLazyGetItemsDataQuery();

    const [fetchJournals, {
        isFetching: isJournalsFetching,
        isError: isErrorJournals,
        data: journalsData,
    }] = useLazyGetItemsDataQuery();

    const defineStyles = () => {
        let defaultCalculatorStyles = styles.defaultCalculatorWrapper;
        let craftTableStyles = styles.craftTableStyles;

        if (gameMode){
            defaultCalculatorStyles = `${styles.defaultCalculatorWrapper} ${styles.defaultCalculatorWrapperHidden}`;
        }

        if (isCraftTableShown){
            craftTableStyles = `${styles.craftTableStyles} ${styles.craftTableOpenedStyles}`;
            defaultCalculatorStyles = `${styles.defaultCalculatorWrapper} ${styles.defaultCalculatorWrapperOpened}`
        }

        return {defaultCalculatorStyles, craftTableStyles};
    }

    const {defaultCalculatorStyles, craftTableStyles} = defineStyles();

    return <div className={styles.wrapper}>
        {isInfoTableShown && <>
                {(!isItemFetching && !isMaterialsFetching && !isArtefactsFetching && !isJournalsFetching && !isErrorItems && !isErrorMaterials && !isErrorArtefacts && !isErrorJournals) &&
                    <InfoTable
                        journalsData={journalsData!}
                        materialsData={materialsData!}
                        itemsData={itemsData!}
                        artefactsData={artefactsData!}
                    />}
                {(isItemFetching || isMaterialsFetching || isArtefactsFetching || isJournalsFetching) &&
                    <PulseLoader
                        color={'rgb(235, 198, 159)'}
                        className={styles.pulseLoader}
                        size={60}
                        aria-label='Loading Spinner'
                        data-testid='loader'
                    />}
                {(isErrorItems || isErrorArtefacts || isErrorMaterials || isErrorJournals) && <ErrorNotification />}
        </>}

        <div className={defaultCalculatorStyles}>
            <CalculatorForm />

            <div className={craftTableStyles}>
                <CraftTable
                    fetchItemsData={fetchItems}
                    fetchMaterialsData={fetchMaterials}
                    fetchArtefactsData={fetchArtefacts}
                    fetchJournalsData={fetchJournals}
                />
            </div>
        </div>
    </div>
}

export default DefaultCalculator;