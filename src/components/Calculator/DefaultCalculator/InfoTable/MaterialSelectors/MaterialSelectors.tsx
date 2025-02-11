import {IItemsData, TCities} from "../../../../../types/InfoTableTypes";
import React, {ChangeEvent, Dispatch, SetStateAction, useRef} from "react";
import styles from './MaterialSelectors.module.scss';
import {
    TOnwPriceType,
    TOwnPriceStates,
    TSelectCityType,
    TSelectedCityStates,
} from "../InfoTable";
import {cityOptions} from "../../../../../store/Options/CityOptions";
import {ISelectedLanguage, TLanguageData, TSelectedLanguage} from "../../../../../types/languageTypes";
import {qualityOptions} from "../../../../../store/Options/CustomSelecrorsOptions";

interface IMaterialSelectorsProps {
    languageData: TLanguageData;
    mainMatsId: string;
    subMatsId: string;
    emptyJournalId: string;
    journalId: string;
    artefactId: string;
    selectedLanguage: TSelectedLanguage;
    infoTableStrings: ISelectedLanguage['infoTableStrings'];
    artefactsData: IItemsData[];
    journalsData: IItemsData[];
    isJournalsUsed: boolean;
    setIsJournalsUsed: Dispatch<SetStateAction<boolean>>;
    foodTax: number;
    setFoodTax: Dispatch<SetStateAction<number>>;
    selectedCities: TSelectedCityStates;
    setSelectedCities: Dispatch<SetStateAction<TSelectedCityStates>>;
    setOwnPrices: Dispatch<SetStateAction<TOwnPriceStates>>;
    ownPrices: TOwnPriceStates;
    setQuality: Dispatch<SetStateAction<number>>;
    quality: number;
}

const MaterialSelectors = (props: IMaterialSelectorsProps) => {
    const {
        languageData,
        mainMatsId,
        subMatsId,
        emptyJournalId,
        journalId,
        artefactId,
        setOwnPrices,
        setFoodTax,
        artefactsData,
        journalsData,
        ownPrices,
        infoTableStrings,
        isJournalsUsed,
        setIsJournalsUsed,
        setSelectedCities,
        foodTax,
        selectedLanguage,
        selectedCities,
        setQuality,
        quality,
    } = props;

    const journalInputRef = useRef<HTMLInputElement | null>(null);
    const emptyJournalInputRef = useRef<HTMLInputElement | null>(null);
    const artefactInputRef = useRef<HTMLInputElement | null>(null);
    const foodTaxInputRef = useRef<HTMLInputElement | null>(null);

    const {emptyJournal, journal, artefact} = ownPrices;

    const mainMatsName = languageData[mainMatsId];
    const subMatsName = languageData[subMatsId];
    const artefactName = languageData[artefactId];

    const changeFoodTaxHandler = (value: number) => {
        if (value >= 0 && value <= 9999) {
            setFoodTax(value);
        }
    }

    const setOwnPriceHandler = (value: number, ownPriceKey: TOnwPriceType) => {
        if (value >= 0) {
            setOwnPrices((prevState) => ({
                ...prevState,
                [ownPriceKey]: {
                    ...prevState[ownPriceKey],
                    ownPrice: value,
                },
            }))
        }
    }

    const setCheckedOwnPriceHandler = (event: ChangeEvent<HTMLInputElement>, ownPriceKey: TOnwPriceType) => {
        setOwnPrices((prevState) => ({
            ...prevState,
            [ownPriceKey]: {
                ...prevState[ownPriceKey],
                isSelectedOwn: event.target.checked,
            },
        }))
    }

    const selectCityHandler = (city: TCities, selectCityType: TSelectCityType) => {
        setSelectedCities((prevState) => ({
            ...prevState,
            [selectCityType]: city,
        }))
    }

    const artefactPrice = (city: TCities) => artefactsData?.find(artefact => artefact.location === city)?.sellPriceMin || 0;
    const emptyJournalPrice = (city: TCities) => journalsData?.find(journal => journal.location === city && journal.itemId === emptyJournalId)?.sellPriceMin || 0;
    const journalPrice = (city: TCities) => journalsData?.find(journal => journal.location === city && journal.itemId === journalId)?.sellPriceMin || 0;


    return (
        <div className={styles.materialSelector}>
            {!!journalId &&
                <div>
                    <p>{infoTableStrings.journalLabel}</p>
                    <input
                        id='ITJournalUsageCheckbox'
                        type="checkbox"
                        checked={isJournalsUsed}
                        onChange={(event) => setIsJournalsUsed(event.target.checked)}
                    />
                </div>}

            {isJournalsUsed &&
                <div>
                    <p>{infoTableStrings.buyJournals}</p>
                    {!emptyJournal.isSelectedOwn &&
                        <select
                            id='ITEmptyJournalCitySelect'
                            onChange={(event) => selectCityHandler(event.target.value as TCities, 'emptyJournalCity')}
                            style={{width: '109px'}}
                            value={selectedCities.emptyJournalCity}
                        >
                            {cityOptions.map(city => {
                                if (city === 'Black Market') return;

                                return (
                                    <option
                                        value={city}
                                        key={city}
                                    >{city}: {emptyJournalPrice(city)}</option>
                                )
                            })}
                        </select>}
                    {emptyJournal.isSelectedOwn &&
                        <input
                            ref={emptyJournalInputRef}
                            id='ITEmptyJournalPriceInput'
                            type="number"
                            value={emptyJournal.ownPrice}
                            onChange={(event) => setOwnPriceHandler(+event.target.value, 'emptyJournal')}
                            onFocus={() => emptyJournalInputRef.current?.select()}
                        />}
                    <input
                        id='ITEmptyJournalCheckbox'
                        type="checkbox"
                        checked={emptyJournal.isSelectedOwn}
                        onChange={(event) => setCheckedOwnPriceHandler(event, 'emptyJournal')}
                    />
                </div>}

            {isJournalsUsed && <div>
                <p>{infoTableStrings.sellJournals}</p>
                {!journal.isSelectedOwn &&
                    <select
                        id='ITFilledJournalCitySelect'
                        onChange={(event) => selectCityHandler(event.target.value as TCities, 'journalCity')}
                        style={{width: '109px'}}
                        value={selectedCities.journalCity}
                    >
                        {cityOptions.map(city => {
                            if (city === 'Black Market') return;

                            return (
                                <option
                                    value={city}
                                    key={city}
                                >{city}: {journalPrice(city)}</option>
                            )
                        })}
                    </select>}
                {journal.isSelectedOwn &&
                    <input
                        ref={journalInputRef}
                        id='ITFilledJournalPriceInput'
                        type='number'
                        value={journal.ownPrice}
                        onChange={(event) => setOwnPriceHandler(+event.target.value, 'journal')}
                        onFocus={() => journalInputRef.current?.select()}
                    />}
                <input
                    id='ITFilledJournalCheckbox'
                    type="checkbox"
                    checked={journal.isSelectedOwn}
                    onChange={(event) => setCheckedOwnPriceHandler(event, 'journal')}
                />
            </div>}

            {!!artefactId && <div>
                <p>{artefactName![selectedLanguage]}{infoTableStrings.from}</p>
                {!artefact.isSelectedOwn &&
                    <select
                        id='ITArtefactsCitySelect'
                        onChange={(event) => selectCityHandler(event.target.value as TCities, 'artefactCity')}
                        style={{width: '109px'}}
                        value={selectedCities.artefactCity}
                    >
                        {cityOptions.map(city => {
                            if (city === 'Black Market') return;

                            return (
                                <option
                                    value={city}
                                    key={city}
                                >{city}: {artefactPrice(city)}</option>
                            )
                        })}
                    </select>}

                {artefact.isSelectedOwn &&
                    <input
                        ref={artefactInputRef}
                        id='ITArtefactsPriceInput'
                        type='number'
                        value={artefact.ownPrice}
                        onChange={(event) => setOwnPriceHandler(+event.target.value, 'artefact')}
                        onFocus={() => artefactInputRef.current?.select()}
                    />}

                <input
                    id='ITArtefactsCheckbox'
                    type="checkbox"
                    checked={artefact.isSelectedOwn}
                    onChange={(event) => setCheckedOwnPriceHandler(event, 'artefact')}
                />
            </div>}

            <div>
                <p>{mainMatsName?.[selectedLanguage] || ''}{infoTableStrings.from}</p>
                <select
                    id='ITMainMatsCitySelect'
                    onChange={(event) => selectCityHandler(event.target.value as TCities, 'mainMaterialCity')}
                    value={selectedCities.mainMaterialCity}
                >
                    {cityOptions.map(city => {
                        if (city === 'Black Market') return;

                        return (
                            <option
                                value={city}
                                key={city}
                            >{city}</option>
                        )
                    })}
                </select>
            </div>

            {!!subMatsId &&
                <div>
                    <p>{subMatsName?.[selectedLanguage]}{infoTableStrings.from}</p>
                    <select
                        id='ITSubMatsCitySelect'
                        onChange={(event) => selectCityHandler(event.target.value as TCities, 'subMaterialCity')}
                        value={selectedCities.subMaterialCity}
                    >
                        {cityOptions.map(city => {
                            if (city === 'Black Market') return;

                            return (
                                <option
                                    value={city}
                                    key={city}
                                >{city}</option>
                            )
                        })}
                    </select>
                </div>}

            {!!journalId && <div>
                <p>Качество:</p>
                <select
                    id="ITQuality"
                    onChange={(event) => setQuality(+event.target.value)}
                    value={quality}
                >
                    {qualityOptions.map(opt => <option value={opt.value}>{opt.labelName[selectedLanguage]}</option>)}
                </select>
            </div>}

            <div>
                <p>{infoTableStrings.tax}</p>
                <input
                    ref={foodTaxInputRef}
                    id='ITTaxInput'
                    type='number'
                    style={{width: '122px'}}
                    value={foodTax}
                    onChange={(event) => changeFoodTaxHandler(+event.target.value)}
                    onFocus={() => foodTaxInputRef.current?.select()}
                />
            </div>
        </div>
    )
}

export default MaterialSelectors;