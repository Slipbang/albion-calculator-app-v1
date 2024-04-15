import {useSelector} from "react-redux";
import {selectLanguage} from "../../../store/language/language-selector";
import styles from './ArtefactsSelector.module.scss';
import {useAppDispatch} from "../../../store";
import React, {ChangeEventHandler} from "react";
import {artefactActions} from "../../../store/artefacts/artefact-slice";
import {selectTheme} from "../../../store/interface/interface-selector";
import ResetButton from "./ResetButton/ResetButton";
import TierSelector from "./TierSelector";

const ArtefactsSelectors = React.memo(() => {
    const theme = useSelector(selectTheme);
    const {language} = useSelector(selectLanguage);
    const {artefactsStrings} = language;

    const dispatchAction = useAppDispatch();

    const selectSortHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
        dispatchAction(artefactActions.setSelectedSort(event.target.value as 'descending' | 'ascending'))
    }

    return (
        <div
            className={styles.wrapper}
            data-theme={theme}
        >
            <div>
                <p>{artefactsStrings.sortLabel}</p>
                <select id="artefactSortSelect" onChange={(event) => selectSortHandler(event)}>
                    <option value='descending'>{artefactsStrings.itemValueDescendingSelector}</option>
                    <option value='ascending'>{artefactsStrings.itemValueAscendingSelector}</option>
                </select>
            </div>

            <div>
                <p>{artefactsStrings.getArtefactsPrice}</p>
                <ResetButton />
            </div>

            <div>
                <p>{artefactsStrings.artefactsTier}</p>
                <TierSelector />
            </div>
        </div>
    )
})

export default ArtefactsSelectors;