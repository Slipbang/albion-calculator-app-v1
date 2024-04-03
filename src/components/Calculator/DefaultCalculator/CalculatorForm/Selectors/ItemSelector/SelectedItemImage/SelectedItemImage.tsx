import React from "react";
import {useDefineSelectorImg} from "../../../Hooks/useDefineSelectorImg";
import {TSelectedLanguage} from "../../../../../../../types/languageTypes";
import styles from '../ItemSelector.module.scss'

const SelectedItemImage = ({selectedLanguage}: {selectedLanguage: TSelectedLanguage}) => {

    const {selectorImg, selectedItemTier, itemName} = useDefineSelectorImg();

    return (
        <img
            className={styles.imgLoaderBackground}
            title={`${itemName?.[selectedLanguage]} ${selectedItemTier}`}
            src={selectorImg}
            alt=""
        />
    )
}

export default SelectedItemImage;