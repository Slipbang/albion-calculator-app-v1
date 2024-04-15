import {
    allClassesButton,
    allClassesButtonHovered,
    huntersButton,
    huntersButtonHovered,
    magesButton,
    magesButtonHovered,
    relictsButton,
    relictsButtonHovered,
    runesButton,
    runesButtonHovered,
    selectedAllClassesButton,
    selectedHuntersButton,
    selectedMagesButton,
    selectedRelicsButton,
    selectedRunesButton,
    selectedShardsButton,
    selectedSoulsButton,
    selectedWarriorsButton,
    shardsButton,
    shardsButtonHovered,
    soulsButton,
    soulsButtonHovered,
    warriorsButton,
    warriorsButtonHovered
} from "../ImgReexports/imgArtefactsReExports";
import {TExtendedTClass} from "../../../store/artefacts/artefact-slice";
import styles from './ArtefactsSelectorButtons.module.scss'
import React from "react";
import ArtefactButton from "./ArtefactButton/ArtefactButton";
import {TArtefactTypes} from "../../../types/artefactTypes";

interface IArtefactsButton {
    image: string;
    hoveredImage: string;
    selectedImage: string;
    type: TArtefactTypes | TExtendedTClass;
}

type TArtefactsButtons = IArtefactsButton[];

const artefactsButtons: TArtefactsButtons = [
    {
        image: runesButton,
        hoveredImage: runesButtonHovered,
        selectedImage: selectedRunesButton,
        type: 'RUNES',
    },
    {
        image: soulsButton,
        hoveredImage: soulsButtonHovered,
        selectedImage: selectedSoulsButton,
        type: 'SOULS',
    },
    {
        image: relictsButton,
        hoveredImage: relictsButtonHovered,
        selectedImage: selectedRelicsButton,
        type: 'RELICTS',
    },
    {
        image: shardsButton,
        hoveredImage: shardsButtonHovered,
        selectedImage: selectedShardsButton,
        type: 'AVALONIANSHARDS',
    },
    {
        image: warriorsButton,
        hoveredImage: warriorsButtonHovered,
        selectedImage: selectedWarriorsButton,
        type: 'WARRIOR',
    },
    {
        image: magesButton,
        hoveredImage: magesButtonHovered,
        selectedImage: selectedMagesButton,
        type: 'MAGE',
    },
    {
        image: huntersButton,
        hoveredImage: huntersButtonHovered,
        selectedImage: selectedHuntersButton,
        type: 'HUNTER',
    },
    {
        image: allClassesButton,
        hoveredImage: allClassesButtonHovered,
        selectedImage: selectedAllClassesButton,
        type: 'allClasses',
    },
]

const ArtefactsSelectorButtons = React.memo(() => {

    return <div className={styles.buttonsBox}>
        {artefactsButtons.map((button) => {
            const {image, hoveredImage, selectedImage, type} = button;

            return (
                <ArtefactButton
                    image={image}
                    selectedImage={selectedImage}
                    hoveredImage={hoveredImage}
                    type={type}
                    key={type}
                />
            )
            }
        )}
    </div>
})

export default ArtefactsSelectorButtons;