import {TArtefactData} from "../../../types/artefactTypes";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../store/language/language-selector";
import {TArtefactsTier} from "../../../store/artefacts/artefact-slice";
import styles from './ArtefactLiElement.module.scss';
import React, {useState} from "react";
import StyledCompleteResetButton from "../../Calculator/StyledComponentsCommon/StyledСompleteResetButton";
import {Tooltip} from "react-tooltip";
import {IItemsData} from "../../../types/InfoTableTypes";
import {ClockLoader} from "react-spinners";
import {artefactsPrices} from "./artefactsPricesClass";
import {ISelectedLanguage} from "../../../types/languageTypes";
import {selectTheme} from "../../../store/interface/interface-selector";
import {srcRoute} from "../../../store/api/api";
import {useArtefactsQuery} from "../Hooks/useArtefactsQuery";

type artefactsArgsTuple = [
    artefactsStrings: ISelectedLanguage['artefactsStrings'],
    artefactsPriceData: IItemsData[] | undefined,
    isArtefactsFetching: boolean,
    isErrorArtefacts: boolean,
    artefactTier: TArtefactsTier,
    itemValue: number[],
    artefactId: string,
    currentDate: Date,
]

interface IArtefactsDataProps{
    artefactData: TArtefactData,
    key: string,
    selectedTier: TArtefactsTier,
}

const ArtefactLiElement = React.memo((props: IArtefactsDataProps) => {
    const {
        artefactData,
        selectedTier,
    } = props;
    const {id, itemValue, artefactId, artefactName} = artefactData;

    const [wasChecked, setWasChecked] = useState(false);
    const [wasCopied, setWasCopied] = useState(false);

    const {language, selectedLanguage} = useSelector(selectLanguage);
    const {artefactsStrings} = language;

    const theme = useSelector(selectTheme);
    const isDark = theme === 'dark';

    const fullArtefactId = `${selectedTier}_${artefactId}`;

    const copyTextHandler = (title: string) => {
        navigator.clipboard.writeText(title).then(() => {
            setWasCopied(true);
        }).then(() => {
            setWasChecked(true);
        }).then(() => setTimeout(() => {
            setWasCopied(false);
        }, 1000))
    }

    const {artefactsPriceData, isArtefactsFetching, isErrorArtefacts} = useArtefactsQuery();

    const currentDate = new Date();

    const artefactsArgs: artefactsArgsTuple =
        [
            artefactsStrings,
            artefactsPriceData,
            isArtefactsFetching!,
            isErrorArtefacts!,
            selectedTier,
            itemValue,
            artefactId,
            currentDate
        ]

    const artefactTable = new artefactsPrices(...artefactsArgs);

    return (
        <>
            <li
                data-theme={theme}
                key={id}
                className={styles.listElem}
            >
                <div
                    className={styles.imageBox}
                    data-tooltip-id="artefacts-table-tooltip-data-html"
                    data-tooltip-html={artefactTable.titleTable}
                >
                    <img
                        draggable={false}
                        alt=""
                        src={`${srcRoute}${fullArtefactId}`}
                    />
                    <ClockLoader
                        className={styles.spinnerStyles}
                        color="rgb(235, 198, 159)"
                        loading={isArtefactsFetching}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    {!isArtefactsFetching && !isErrorArtefacts && <p>ℹ</p>}
                </div>
                <p
                    className={wasChecked ? styles.checkedArtefact : ''}
                    onClick={() => copyTextHandler(artefactName[selectedLanguage])}
                >{!wasCopied ? (artefactName[selectedLanguage]) : (artefactsStrings.copyState)}</p>
                <StyledCompleteResetButton
                    onClick={() => setWasChecked(false)}
                    title={artefactsStrings.resetButtonTitle}
                />
            </li>
            <Tooltip
                id="artefacts-table-tooltip-data-html"
                place={'left-start'}
                className={styles.artefactsTooltip}
                style={{
                    filter: 'drop-shadow(2px 2px 2px black)',
                    borderRadius: '10px 10px',
                    backgroundColor: `${isDark ? 'rgb(58,58,58)' : 'wheat'}`,
                    color: `${isDark ? 'white' : 'rgb(96, 67, 47)'}`,
                    fontSize: 'inherit',
                    zIndex: 6,
                }}
            />
        </>
    )
})

export default ArtefactLiElement;