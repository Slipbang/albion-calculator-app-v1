import React from "react";
import {useDefineSelectorImg} from "../../../Hooks/useDefineSelectorImg";
import {TSelectedLanguage} from "../../../../../../../types/languageTypes";
import styles from './SelectedItemImage.module.scss';
import {useSelector} from "react-redux";
import {selectInterfaceLanguageData} from "../../../../../../../store/interface/interface-selector";

const SelectedItemImage = ({selectedLanguage}: {selectedLanguage: TSelectedLanguage}) => {

    const {selectorImg, itemDivFactor, selectedItemId} = useDefineSelectorImg();
    const {mainDivFactor, subDivFactor} = itemDivFactor;
    const languageData = useSelector(selectInterfaceLanguageData);
    const itemName = languageData?.[selectedItemId]?.[selectedLanguage];

    return (
        <div className={styles.itemImage}>
            <img
                className={styles.imgLoaderBackground}
                title={itemName}
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