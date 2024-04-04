import styles from './InfoTable.module.scss'
import {IItemsData, TCities} from "../../../../types/InfoTableTypes";
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../store/language/language-selector";
import {Tooltip} from 'react-tooltip';
import {TArtefactData} from "../../../../types/artefactTypes";
import {selectCraftedItemData} from "../../../../store/profit/profit-selectors";
import {useAppDispatch} from "../../../../store";
import {interfaceSliceActions} from "../../../../store/interface/interface-slice";
import StyledCloseButton from "../../StyledComponentsCommon/StyledCloseButton";
import {craftedItemInfoClass} from "./craftedItemInfoClass";
import {IItemName, ISpentQuantityPerItem} from "../../../../store/profit/profit-slice";
import {defineArtefactsName} from "../../Definers/defineArtefactsName";
import MaterialSelectors from "./MaterialSelectors/MaterialSelectors";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../types/languageTypes";
import {useLazyGetItemsDataQuery} from "../../../../store/api/api";
import {selectServerId} from "../../../../store/queryParams/query-params-selectors";
import {PulseLoader} from "react-spinners";
import ErrorNotification from "../ErrorNotification/ErrorNotification";

type ICraftInfoTuple = [
    itemName: IItemName,
    artefactName: TArtefactName,
    spentQuantityPerItem: ISpentQuantityPerItem | undefined,
    selectedLanguage: TSelectedLanguage,
    itemId: string | undefined,
    resourceId: string | undefined,
    artefactId: string | undefined,
    subMatsId: string | undefined,
    journalId: string | undefined,
    emptyJournalId: string | undefined,
    infoTableStrings: ISelectedLanguage['infoTableStrings'],
    materialsData: IItemsData[] | undefined,
    itemsData: IItemsData[] | undefined,
    artefactsData: IItemsData[] | undefined,
    journalsData: IItemsData[] | undefined,
    defaultFoodConsumption: number,
    mainMatsId: string,
    output: number,
    foodTax: number,
    foodConsumption: number,
    artefact: IOwnPrice,
    journal: IOwnPrice,
    emptyJournal: IOwnPrice,
    journalsQuantity: number,
    mainMaterialCity: TCities,
    artefactCity: TCities,
    subMaterialCity: TCities,
    journalCity: TCities,
    emptyJournalCity: TCities,
    isJournalsUsed: boolean,
    tier: string,
];

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
    const craftedItem = useSelector(selectCraftedItemData);
    const serverId = useSelector(selectServerId);

    const {
        itemId,
        resourceId,
        itemName,
        tier,
        subMatsId,
        mainMatsId,
        spentQuantityPerItem,
        output,
        artefactId,
        foodConsumption,
        defaultFoodConsumption,
        journalsQuantity,
        journalId,
        emptyJournalId,
        queryItemsParams,
        queryJournalsParams,
        queryMatsParams,
    } = craftedItem!;

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

    useEffect(() => {
        fetchItems({itemsParams: queryItemsParams!, isBlackMarket: true, serverId});
        fetchMaterials({itemsParams: queryMatsParams!, isBlackMarket: false, serverId});
        fetchJournals({itemsParams: queryJournalsParams!, isBlackMarket: false, serverId})
        if (!!artefactId) {
            fetchArtefacts({itemsParams: artefactId!, isBlackMarket: false, serverId});
        }
    }, [serverId])

    const dispatchAction = useAppDispatch();

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

    const {journal, emptyJournal, artefact} = ownPrices;

    const [selectedCities, setSelectedCities] = useState<TSelectedCityStates>({
        mainMaterialCity: 'Fort Sterling',
        subMaterialCity: 'Fort Sterling',
        artefactCity: 'Fort Sterling',
        journalCity: 'Fort Sterling',
        emptyJournalCity: 'Fort Sterling',
    });

    const {mainMaterialCity, subMaterialCity, journalCity, emptyJournalCity, artefactCity} = selectedCities;

    const [isJournalsUsed, setIsJournalsUsed] = useState(false);
    const [foodTax, setFoodTax] = useState(0);

    const {artefactName} = useMemo(() => defineArtefactsName({artefactId: artefactId || ''}), [artefactId])

    const closeInfoTableHandler = () => {
        dispatchAction(interfaceSliceActions.setInfoTableVisibility(false));
    }

    const craftInfoParams: ICraftInfoTuple = [
        itemName as IItemName,
        artefactName,
        spentQuantityPerItem,
        selectedLanguage,
        itemId,
        resourceId,
        artefactId as string | undefined,
        subMatsId,
        journalId,
        emptyJournalId,
        infoTableStrings,
        materialsData,
        itemsData,
        artefactsData,
        journalsData,
        defaultFoodConsumption,
        mainMatsId,
        output,
        foodTax,
        foodConsumption,
        artefact,
        journal,
        emptyJournal,
        journalsQuantity as number,
        mainMaterialCity,
        artefactCity,
        subMaterialCity,
        journalCity,
        emptyJournalCity,
        isJournalsUsed,
        tier,
    ];

    const srcRoute = 'https://render.albiononline.com/v1/item/';

    return (
        <>
            {(!isItemFetching && !isMaterialsFetching && !isArtefactsFetching && !isJournalsFetching && !isErrorItems && !isErrorMaterials && !isErrorArtefacts && !isErrorJournals) &&
                <div className={styles.wrapper}>
                    <MaterialSelectors
                        mainMatsId={mainMatsId}
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
                    />

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
                            {!resourceId &&
                                <th>{infoTableStrings.saleIn} Black Market</th>
                            }
                        </tr>
                        </thead>
                        <tbody>

                        {['', '1', '2', '3', '4'].map((enchantment, index) => {
                            if (resourceId?.includes('STONEBLOCK') && enchantment === '4') return;

                            const caerleonInfo = new craftedItemInfoClass('Caerleon', enchantment, ...craftInfoParams);
                            const fortSterlingInfo = new craftedItemInfoClass('Fort Sterling', enchantment, ...craftInfoParams);
                            const bridgewatchInfo = new craftedItemInfoClass('Bridgewatch', enchantment, ...craftInfoParams);
                            const martlockInfo = new craftedItemInfoClass('Martlock', enchantment, ...craftInfoParams);
                            const thetfordInfo = new craftedItemInfoClass('Thetford', enchantment, ...craftInfoParams);
                            const lymhurstInfo = new craftedItemInfoClass('Lymhurst', enchantment, ...craftInfoParams);
                            const brecilienInfo = new craftedItemInfoClass('Brecilien', enchantment, ...craftInfoParams);
                            const blackMarketInfo = !resourceId ? new craftedItemInfoClass('Black Market', enchantment, ...craftInfoParams) : undefined;


                            let itemHref = enchantment === '' ? itemId : `${itemId}@${enchantment}`;

                            let resourceHref = enchantment === '' || resourceId?.includes('STONEBLOCK') ? resourceId : `${resourceId}_LEVEL${enchantment}@${enchantment}`;

                            return (
                                <tr key={index}>
                                    <td>
                                        {!!itemId &&
                                            <img
                                                src={`${srcRoute}${itemHref}`}
                                                alt={itemId}
                                            />
                                        }
                                        {!!resourceId &&
                                            <img
                                                src={`${srcRoute}${resourceHref}`}
                                                alt={resourceId}
                                            />
                                        }
                                    </td>
                                    <td
                                        data-tooltip-id="info-table-tooltip-data-html"
                                        data-tooltip-html={brecilienInfo.title}

                                    >
                                        {brecilienInfo.totalProfit.toLocaleString('en')}
                                    </td>
                                    <td
                                        data-tooltip-id="info-table-tooltip-data-html"
                                        data-tooltip-html={caerleonInfo.title}
                                    >
                                        {caerleonInfo.totalProfit.toLocaleString('en')}
                                    </td>
                                    <td
                                        data-tooltip-id="info-table-tooltip-data-html"
                                        data-tooltip-html={fortSterlingInfo.title}
                                    >
                                        {fortSterlingInfo.totalProfit.toLocaleString('en')}
                                    </td>
                                    <td
                                        data-tooltip-id="info-table-tooltip-data-html"
                                        data-tooltip-html={bridgewatchInfo.title}
                                    >
                                        {bridgewatchInfo.totalProfit.toLocaleString('en')}
                                    </td>
                                    <td
                                        data-tooltip-id="info-table-tooltip-data-html"
                                        data-tooltip-html={martlockInfo.title}
                                    >
                                        {martlockInfo.totalProfit.toLocaleString('en')}
                                    </td>
                                    <td
                                        data-tooltip-id="info-table-tooltip-data-html"
                                        data-tooltip-html={thetfordInfo.title}
                                    >
                                        {thetfordInfo.totalProfit.toLocaleString('en')}
                                    </td>
                                    <td
                                        data-tooltip-id="info-table-tooltip-data-html"
                                        data-tooltip-html={lymhurstInfo.title}
                                    >
                                        {lymhurstInfo.totalProfit.toLocaleString('en')}

                                        {!!resourceId && (!resourceId?.includes('STONEBLOCK') ? index === 4 : index === 3) &&
                                            <div className={styles.closeButtonStyles}>
                                                <StyledCloseButton onClick={() => closeInfoTableHandler()}/>
                                            </div>}
                                    </td>
                                    {!!blackMarketInfo && !resourceId && <td
                                        data-tooltip-id="info-table-tooltip-data-html"
                                        data-tooltip-html={blackMarketInfo.title}
                                    >
                                        {blackMarketInfo.totalProfit.toLocaleString('en')}

                                        {!!itemId && index === 4 && <div className={styles.closeButtonStyles}>
                                            <StyledCloseButton onClick={() => closeInfoTableHandler()}/>
                                        </div>}
                                    </td>}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                    <Tooltip
                        id="info-table-tooltip-data-html"
                        place="bottom-start"
                        className={styles.infoTableTooltip}
                        style={{
                            filter: 'drop-shadow(5px 5px 6px black)',
                            borderRadius: '10px 10px',
                            backgroundColor: 'wheat',
                            color: 'black',
                            fontSize: 'inherit',
                            zIndex: 9999
                        }}
                    />
                </div>}

            {(isItemFetching || isMaterialsFetching || isArtefactsFetching || isJournalsFetching) &&
                <PulseLoader
                    color={'rgb(235, 198, 159)'}
                    className={styles.pulseLoader}
                    size={60}
                    aria-label='Loading Spinner'
                    data-testid='loader'
                />}
            {(isErrorItems || isErrorArtefacts || isErrorMaterials || isErrorJournals) && <ErrorNotification/>}
        </>
    )
}

export default InfoTable;