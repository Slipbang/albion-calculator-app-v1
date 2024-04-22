import React from "react";
import {useDefineSelectorImg} from "../../../Hooks/useDefineSelectorImg";
import {TSelectedLanguage} from "../../../../../../../types/languageTypes";
import styles from './SelectedItemImage.module.scss';

const SelectedItemImage = ({selectedLanguage}: {selectedLanguage: TSelectedLanguage}) => {

    const {selectorImg, selectedItemTier, itemName, itemDivFactor} = useDefineSelectorImg();
    const {mainDivFactor, subDivFactor} = itemDivFactor;

    return (
        <div className={styles.itemImage}>
            <img
                className={styles.imgLoaderBackground}
                title={`${itemName?.[selectedLanguage]} ${selectedItemTier}`}
                src={selectorImg}
                alt=""
            />
            <div>
                <p>{mainDivFactor}/{subDivFactor}</p>
            </div>
        </div>
    )
}

export default SelectedItemImage;