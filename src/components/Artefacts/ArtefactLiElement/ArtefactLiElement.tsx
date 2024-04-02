import {TArtefactData} from "../../../types/artefactTypes";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../store/language/language-selector";
import {artefactActions, TArtefactsTier} from "../../../store/artefacts/artefact-slice";
import {useAppDispatch} from "../../../store";
import styles from './ArtefactLiElement.module.scss';
import React from "react";
import StyledCompleteResetButton from "../../Calculator/StyledComponentsCommon/StyledСompleteResetButton";
import {Tooltip} from "react-tooltip";
import {IItemsData} from "../../../types/InfoTableTypes";
import {ClockLoader} from "react-spinners";
import {artefactsPrices} from "./artefactsPricesClass";
import {ISelectedLanguage} from "../../../types/languageTypes";

type artefactsArgsTuple = [
    artefactsStrings: ISelectedLanguage['artefactsStrings'],
    artefactsPriceData: IItemsData[] | undefined,
    isArtefactsFetching: boolean,
    isErrorArtefacts: boolean,
    artefactTier: TArtefactsTier,
    itemValue: number[],
    artefactId: string,
]

interface IArtefactsDataProps{
    artefactData: TArtefactData,
    key: string,
    artefactsPriceData: IItemsData[],
    selectedTier: TArtefactsTier,
    isArtefactsFetching: boolean,
    isErrorArtefacts: boolean,
}

const ArtefactLiElement = React.memo((props: IArtefactsDataProps) => {
    const {artefactData, artefactsPriceData, selectedTier, isArtefactsFetching, isErrorArtefacts} = props;
    const {id, itemValue, wasCopied, wasChecked, artefactId, artefactName} = artefactData;
    const {language, selectedLanguage} = useSelector(selectLanguage);
    const {artefactsStrings} = language;

    const fullArtefactId = `${selectedTier}_${artefactId}`;

    const dispatchAction = useAppDispatch();

    const copyTextHandler = (title: string, id: string) => {
        navigator.clipboard.writeText(title).then(() => {
            dispatchAction(artefactActions.setWasCopied(id));
        }).then(() => {
            dispatchAction(artefactActions.setWasChecked(id));
        }).then(() => setTimeout(() => {
            dispatchAction(artefactActions.setWasCopied(id));
        }, 1000))
    }

    const artefactCheckResetHandler = (id: string) => {
        dispatchAction(artefactActions.resetArtefactCheck({id}));
    }

    const artefactsArgs: artefactsArgsTuple = [artefactsStrings, artefactsPriceData, isArtefactsFetching, isErrorArtefacts, selectedTier, itemValue, artefactId]

    const artefactTable = new artefactsPrices(...artefactsArgs);

    return (
        <>
            <li
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
                        src={`https://render.albiononline.com/v1/item/${fullArtefactId}`}
                    />
                    <ClockLoader
                        className={styles.spinnerStyles}
                        color={"rgb(235, 198, 159)"}
                        loading={isArtefactsFetching}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    {!isArtefactsFetching && <p>ℹ</p>}
                </div>
                <p
                    className={wasChecked ? styles.checkedArtefact : ''}
                    onClick={() => copyTextHandler(artefactName[selectedLanguage], id)}
                >{!wasCopied ? (artefactName[selectedLanguage]) : (artefactsStrings.copyState)}</p>
                <StyledCompleteResetButton
                    onClick={() => artefactCheckResetHandler(id)}
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
                    backgroundColor: 'wheat',
                    color: 'rgb(96, 67, 47)',
                    fontSize: 'inherit',
                    zIndex: 6,
                }}
            />
        </>
    )
})

export default ArtefactLiElement;