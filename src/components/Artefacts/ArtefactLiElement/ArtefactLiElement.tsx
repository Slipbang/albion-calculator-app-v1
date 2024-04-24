import {TArtefactData} from "../../../types/artefactTypes";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../store/language/language-selector";
import {TArtefactsTier} from "../../../store/artefacts/artefact-slice";
import styles from './ArtefactLiElement.module.scss';
import {memo, useState} from "react";
import StyledCompleteResetButton from "../../Calculator/StyledComponentsCommon/StyledСompleteResetButton";
import {IItemsData} from "../../../types/InfoTableTypes";
import {ClockLoader} from "react-spinners";
import {artefactsPrices} from "./artefactsPricesClass";
import {ISelectedLanguage} from "../../../types/languageTypes";
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

const ArtefactLiElement = memo((props: IArtefactsDataProps) => {
    const {
        artefactData,
        selectedTier,
    } = props;
    const {id, itemValue, artefactId, artefactName} = artefactData;

    const [isChecked, setIsChecked] = useState(false);
    const [wasCopied, setWasCopied] = useState(false);

    const {language, selectedLanguage} = useSelector(selectLanguage);
    const {artefactsStrings} = language;

    const fullArtefactId = `${selectedTier}_${artefactId}`;

    const copyTextHandler = (title: string) => {
        navigator.clipboard.writeText(title).then(() => {
            setWasCopied(true);
        }).then(() => {
            setIsChecked(true);
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
        ];

    const artefactTable = new artefactsPrices(...artefactsArgs);

    return (
        <>
            <li
                key={id}
                className={styles.listElem}
                data-checked={isChecked ? 'checked' : 'non-checked'}
            >
                <div
                    className={styles.imageBox}
                    data-tooltip-id="artefacts-table-tooltip-data-html"
                    data-tooltip-html={artefactTable.titleTable}
                >
                    <img
                        draggable={false}
                        alt=''
                        src={`${srcRoute}${fullArtefactId}`}
                    />
                    <ClockLoader
                        className={styles.spinnerStyles}
                        color='gb(235, 198, 159)'
                        loading={isArtefactsFetching}
                        size={15}
                        aria-label='Loading Spinner'
                        data-testid='loader'
                    />
                    {!isArtefactsFetching && !isErrorArtefacts && <p>ℹ</p>}
                </div>
                <p
                    onClick={() => copyTextHandler(artefactName[selectedLanguage])}
                >{!wasCopied ? (artefactName[selectedLanguage]) : (artefactsStrings.copyState)}</p>
                <StyledCompleteResetButton
                    onClick={() => setIsChecked(false)}
                    title={artefactsStrings.resetButtonTitle}
                />
            </li>

        </>
    )
})

export default ArtefactLiElement;