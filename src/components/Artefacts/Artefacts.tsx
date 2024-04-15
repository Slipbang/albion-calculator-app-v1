import styles from "./Artefacts.module.scss";
import ArtefactsSelectorButtons from "./ArtefactsSelectorButtons/ArtefactsSelectorButtons";
import ArtefactsSelectors from "./ArtefactsSelectors/ArtefactsSelectors";
import ArtefactLiElement from "./ArtefactLiElement/ArtefactLiElement";
import {useArtefacts} from "./Hooks/useArtefacts";

const Artefacts = () => {
    const {
        artefactsToRender,
        selectedTier,
        selectedSort,
    } = useArtefacts();

    return (
        <div className={styles.artefacts}>
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
        </div>
    )
}
export default Artefacts;   