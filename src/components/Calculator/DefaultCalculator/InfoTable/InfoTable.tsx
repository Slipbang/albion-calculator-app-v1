import styles from './InfoTable.module.scss'
import {IItemsData, TCities} from "../../../../types/InfoTableTypes";
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../store/language/language-selector";
import {Tooltip} from 'react-tooltip';
import {TArtefactData} from "../../../../types/artefactTypes";
import {selectCraftedFoodData, selectCraftedItemData} from "../../../../store/profit/profit-selectors";
import {useAppDispatch} from "../../../../store";
import {interfaceSliceActions} from "../../../../store/interface/interface-slice";
import {
    IFoodTableData,
    IInfoTableData,
    ITableQueryParams,
    profitSliceActions
} from "../../../../store/profit/profit-slice";
import {defineArtefactsName} from "../../Definers/defineArtefactsName";
import MaterialSelectors from "./MaterialSelectors/MaterialSelectors";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../types/languageTypes";
import {srcRoute, useLazyGetItemsDataQuery} from "../../../../store/api/api";
import {selectServerId} from "../../../../store/queryParams/query-params-selectors";
import {PulseLoader} from "react-spinners";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import {selectCalculatorType, selectTheme} from "../../../../store/interface/interface-selector";
import TableTdElement from "./TableTdElement/TableTdElement";
import StyledCloseButton from "../../StyledComponentsCommon/StyledCloseButton";
import {IFoodObject} from "../../../../types/foodTypes";

export type ICraftItemInfoTuple = [
    itemData: IInfoTableData | undefined,
    artefactName: TArtefactName,
    selectedLanguage: TSelectedLanguage,
    infoTableStrings: ISelectedLanguage['infoTableStrings'],
    materialsData: IItemsData[] | undefined,
    itemsData: IItemsData[] | undefined,
    artefactsData: IItemsData[] | undefined,
    journalsData: IItemsData[] | undefined,
    foodTax: number,
    ownPrices: TOwnPriceStates,
    selectedCities: TSelectedCityStates,
    isJournalsUsed: boolean,
    currentDate: Date,
];

export type ICraftConsumableInfoTuple = [
    infoTableData: IFoodTableData,
    consumableResourcesData: IItemsData[] | undefined,
]

export interface IOwnPrice {
    ownPrice: number,
    isSelectedOwn: boolean,
}

export type TOnwPriceType = 'journal' | 'emptyJournal' | 'artefact';

export type TOwnPriceStates = {
    [key in TOnwPriceType]: IOwnPrice
}

export type TSelectCityType =
    'mainMaterialCity'
    | 'subMaterialCity'
    | 'artefactCity'
    | 'journalCity'
    | 'emptyJournalCity';

export type TSelectedCityStates = {
    [key in TSelectCityType]: TCities
}

export type TArtefactName = TArtefactData['artefactName'] | undefined;

const InfoTable = () => {
    const calculatorType = useSelector(selectCalculatorType);
    const craftedItem = useSelector(selectCraftedItemData);
    const serverId = useSelector(selectServerId);

    const craftedFoodData = useSelector(selectCraftedFoodData);

    let tableQueryParams: ITableQueryParams | undefined,
        infoTableData: IInfoTableData | undefined;

    let itemId: string | undefined,
        artefactId: string | undefined,
        resourceId: string | undefined,
        mainMatsId: string | undefined,
        subMatsId: string | undefined,
        journalId: string | undefined,
        emptyJournalId: string | undefined;

    let queryItemsParams: string | undefined,
        queryJournalsParams: string | undefined,
        queryMatsParams: string | undefined;

    if (craftedItem !== null) {
        ({tableQueryParams, infoTableData} = craftedItem!);
        ({queryItemsParams, queryJournalsParams, queryMatsParams} = tableQueryParams!);
        ({itemId, artefactId, resourceId, mainMatsId, subMatsId, journalId, emptyJournalId} = infoTableData!);
    }

    let queryConsumableParams: string | undefined, craftedFood: IFoodObject | undefined, consumablesItemId: string | undefined;

    if (craftedFoodData !== null) {
        ({queryParams: queryConsumableParams, craftedFood} = craftedFoodData!);
        ({itemId: consumablesItemId} = craftedFood);
    }

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

    const [fetchConsumables, {
        isFetching: isConsumablesFetching,
        isError: isErrorConsumables,
        data: consumablesData,
    }] = useLazyGetItemsDataQuery();

    useEffect(() => {
        if (calculatorType === 'items') {
            fetchItems({itemsParams: queryItemsParams!, isBlackMarket: true, serverId});
            fetchJournals({itemsParams: queryJournalsParams!, isBlackMarket: false, serverId})


            if (!!artefactId) {
                fetchArtefacts({itemsParams: artefactId!, isBlackMarket: false, serverId});
            }
        }

        if (calculatorType === 'resource' || calculatorType === 'items') {
            fetchMaterials({itemsParams: queryMatsParams!, isBlackMarket: false, serverId});
        }

        if (calculatorType === 'food' || calculatorType === 'potions') {
            fetchConsumables({itemsParams: queryConsumableParams!, isBlackMarket: false, serverId});
        }
    }, [queryItemsParams, queryMatsParams, queryJournalsParams, artefactId, serverId, itemId])

    const dispatchAction = useAppDispatch();

    const theme = useSelector(selectTheme);
    const isDark = theme === 'dark';

    const {selectedLanguage, language} = useSelector(selectLanguage);
    const {infoTableStrings} = language;

    const [ownPrices, setOwnPrices] = useState<TOwnPriceStates>({
        journal: {
            ownPrice: 0,
            isSelectedOwn: false,
        },
        emptyJournal: {
            ownPrice: 0,
            isSelectedOwn: false,
        },
        artefact: {
            ownPrice: 0,
            isSelectedOwn: false,
        },
    })

    const [selectedCities, setSelectedCities] = useState<TSelectedCityStates>({
        mainMaterialCity: 'Fort Sterling',
        subMaterialCity: 'Fort Sterling',
        artefactCity: 'Fort Sterling',
        journalCity: 'Fort Sterling',
        emptyJournalCity: 'Fort Sterling',
    });

    const [isJournalsUsed, setIsJournalsUsed] = useState(false);
    const [foodTax, setFoodTax] = useState(0);

    const {artefactName} = useMemo(() => defineArtefactsName({artefactId: artefactId || ''}), [artefactId])

    const closeInfoTableHandler = () => {
        dispatchAction(interfaceSliceActions.setInfoTableVisibility(false));
        dispatchAction(profitSliceActions.resetData());
    }

    const currentDate: Date = new Date();

    const craftInfoParams: ICraftItemInfoTuple | ICraftConsumableInfoTuple =
        (calculatorType === 'items' || calculatorType === 'resource')
            ? [
                infoTableData,
                artefactName,
                selectedLanguage,
                infoTableStrings,
                materialsData,
                itemsData,
                artefactsData,
                journalsData,
                foodTax,
                ownPrices,
                selectedCities,
                isJournalsUsed,
                currentDate,
            ] as ICraftItemInfoTuple
            : [
                craftedFoodData!,
                consumablesData!,
            ] as ICraftConsumableInfoTuple

    const defineSrc = (enchantment: string) => {
        if (calculatorType === 'items' && !!itemId) {
            return `${itemId}${!enchantment ? '' : `@${enchantment}`}`;
        }

        if (calculatorType === 'resource' && !!resourceId) {
            return `${resourceId}${(!enchantment || resourceId?.includes?.('STONEBLOCK')) ? '' : `_LEVEL${enchantment}@${enchantment}`}`;
        }

        if (calculatorType === 'food') {
            return `${consumablesItemId}${(enchantment === '4' || !enchantment) ? '' : `@${enchantment}`}`
        }
    }

    return (
        <>
            {(!isItemFetching && !isMaterialsFetching && !isArtefactsFetching && !isJournalsFetching && !isErrorItems && !isErrorMaterials && !isErrorArtefacts && !isErrorJournals && !isErrorConsumables) &&
                <div className={styles.wrapper} data-theme={theme}>
                    {(calculatorType === 'resource' || calculatorType === 'items')
                        && <MaterialSelectors
                            mainMatsId={mainMatsId!}
                            subMatsId={subMatsId!}
                            emptyJournalId={emptyJournalId!}
                            journalId={journalId!}
                            artefactId={artefactId!}
                            setOwnPrices={setOwnPrices}
                            ownPrices={ownPrices}
                            setFoodTax={setFoodTax}
                            artefactsData={artefactsData!}
                            journalsData={journalsData!}
                            infoTableStrings={infoTableStrings}
                            isJournalsUsed={isJournalsUsed}
                            setIsJournalsUsed={setIsJournalsUsed}
                            setSelectedCities={setSelectedCities}
                            artefactName={artefactName}
                            foodTax={foodTax}
                            selectedLanguage={selectedLanguage}
                            selectedCities={selectedCities}
                        />}

                    <table>
                        <thead>
                        <tr>
                            <th>{infoTableStrings.item}</th>
                            <th>{infoTableStrings.saleIn} Brecilien</th>
                            <th>{infoTableStrings.saleIn} Caerleon</th>
                            <th>{infoTableStrings.saleIn} Fort Sterling</th>
                            <th>{infoTableStrings.saleIn} Bridgewatch</th>
                            <th>{infoTableStrings.saleIn} Martlock</th>
                            <th>{infoTableStrings.saleIn} Thetford</th>
                            <th>{infoTableStrings.saleIn} Lymhurst</th>
                            {!!itemId &&
                                <th>{infoTableStrings.saleIn} Black Market</th>
                            }
                        </tr>
                        </thead>
                        <tbody>

                        {['', '1', '2', '3', '4'].map((enchantment, index) => {
                                if (!!resourceId && resourceId.includes('STONEBLOCK') && enchantment === '4') return;
                                if (!!consumablesItemId && enchantment === '4') return;

                                const finalSrc = defineSrc(enchantment);

                                return (
                                    <tr key={index}>
                                        <td>
                                            <img
                                                src={`${srcRoute}${finalSrc}`}
                                                alt={itemId}
                                            />
                                        </td>
                                        <TableTdElement
                                            enchantment={enchantment}
                                            craftInfoParams={craftInfoParams}
                                            calculatorType={calculatorType}
                                        />
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </table>

                    <StyledCloseButton
                        className={styles.closeButtonStyles}
                        onClick={() => closeInfoTableHandler()}
                    />

                    <Tooltip
                        id="info-table-tooltip-data-html"
                        place="bottom-start"
                        className={styles.infoTableTooltip}
                        style={{
                            filter: 'drop-shadow(5px 5px 6px black)',
                            borderRadius: '10px 10px',
                            backgroundColor: `${isDark ? 'rgb(58,58,58)' : 'wheat'}`,
                            color: `${isDark ? 'white' : 'black'}`,
                            fontSize: 'inherit',
                            zIndex: 9999
                        }}
                    />
                </div>}

            {(isItemFetching || isMaterialsFetching || isArtefactsFetching || isJournalsFetching || isConsumablesFetching) &&
                <PulseLoader
                    color={isDark ? 'white' : 'rgb(235, 198, 159)'}
                    className={styles.pulseLoader}
                    size={60}
                    aria-label='Loading Spinner'
                    data-testid='loader'
                />}
            {(isErrorItems || isErrorArtefacts || isErrorMaterials || isErrorJournals || isErrorConsumables) &&
                <ErrorNotification theme={theme}/>}
        </>
    )
}

export default InfoTable;