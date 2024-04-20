import styles from "./Artefacts.module.scss";
import ArtefactsSelectorButtons from "./ArtefactsSelectorButtons/ArtefactsSelectorButtons";
import ArtefactsSelectors from "./ArtefactsSelectors/ArtefactsSelectors";
import ArtefactLiElement from "./ArtefactLiElement/ArtefactLiElement";
import {useArtefacts} from "./Hooks/useArtefacts";
import {Tooltip} from "react-tooltip";
import React from "react";
import {useSelector} from "react-redux";
import {selectTheme} from "../../store/interface/interface-selector";

const Artefacts = () => {
    const {
        artefactsToRender,
        selectedTier,
        selectedSort,
    } = useArtefacts();

    const theme = useSelector(selectTheme);
    const isDark = theme === 'dark';

    return (
        <div className={styles.artefacts} data-theme={theme}>
            <ArtefactsSelectorButtons />

            <ArtefactsSelectors />

            <ul>
                {artefactsToRender.sort((a, b) => {
                    switch (selectedSort) {
                        case 'descending':
                            return a.itemValue[0] > b.itemValue[0] ? -1 : 1;
                        case 'ascending':
                            return a.itemValue[0] > b.itemValue[0] ? 1 : -1;
                    }
                }).map((item) => {
                    return (
                        <ArtefactLiElement
                            artefactData={item}
                            selectedTier={selectedTier}
                            key={item.id}
                        />
                    )
                })}
            </ul>
            <Tooltip
                id="artefacts-table-tooltip-data-html"
                place='left-start'
                className={styles.artefactsTooltip}
                style={{
                    filter: 'drop-shadow(3px 3px 6px black)',
                    borderRadius: '10px 10px',
                    backgroundColor: `${isDark ? '#675F5AFF' : '#EBC69FFF'}`,
                    color: `${isDark ? 'white' : 'rgb(96, 67, 47)'}`,
                    fontSize: 'inherit',
                    zIndex: 6,
                }}
            />
        </div>
    )
}
export default Artefacts;   