import {useSelector} from "react-redux";
import {selectLanguage} from "../../../store/language/language-selector";
import styles from './ArtefactsSelector.module.scss';
import {useAppDispatch} from "../../../store";
import React, {ChangeEventHandler} from "react";
import {artefactActions, TArtefactsTier} from "../../../store/artefacts/artefact-slice";
import {selectArtefactsTier} from "../../../store/artefacts/artefact-selectors";
import StyledCompleteResetButton from "../../Calculator/StyledComponentsCommon/StyledСompleteResetButton";

const ArtefactsSelectors = React.memo(({refetchHandler}:{refetchHandler: () => void}) => {
    const {language} = useSelector(selectLanguage);
    const selectedTier = useSelector(selectArtefactsTier);
    const {artefactsStrings} = language;

    const dispatchAction = useAppDispatch();

    const selectSortHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
        dispatchAction(artefactActions.setSelectedSort(event.target.value as 'descending' | 'ascending'))
    }

    const resetAllArtefactCheckHandler = () => {
        dispatchAction(artefactActions.resetArtefactCheck({}));
    }

    const selectArtefactsTierHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
        dispatchAction(artefactActions.setArtefactsTier(event.target.value as TArtefactsTier));
    }

    //needs refactoring

    return (
        <div className={styles.wrapper}>
            <div>
                <p>{artefactsStrings.sortLabel}</p>
                <select id="artefactSortSelect" onChange={(event) => selectSortHandler(event)}>
                    <option value='descending'>{artefactsStrings.itemValueDescendingSelector}</option>
                    <option value='ascending'>{artefactsStrings.itemValueAscendingSelector}</option>
                </select>
            </div>

            <div>
                <p>{artefactsStrings.getArtefactsPrice}</p>
                <StyledCompleteResetButton
                    onClick={() => refetchHandler()}
                />
            </div>

            <div>
                <p>{artefactsStrings.resetAllMarkers}</p>
                <StyledCompleteResetButton
                    onClick={resetAllArtefactCheckHandler}
                />
            </div>

            <div>
                <p>{artefactsStrings.artefactsTier}</p>
                <select value={selectedTier} id="artefactTierSelect" onChange={(event) => selectArtefactsTierHandler(event)}>
                    <option value='T4'>T4</option>
                    <option value='T5'>T5</option>
                    <option value='T6'>T6</option>
                    <option value='T7'>T7</option>
                    <option value='T8'>T8</option>
                </select>
            </div>
        </div>
    )
})

export default ArtefactsSelectors;