import StyledBackpackSilverIcon from "../BackpackSC/StyledBackpackSilverIcon";
import React from "react";
import {useSelector} from "react-redux";
import {selectBackpackSilver} from "../../../../../store/GMProfit/gm-profit-selectors";
import styles from './SilverIcon.module.scss'
import {selectLanguage} from "../../../../../store/language/language-selector";

const SilverIcon = () => {
    const {language} = useSelector(selectLanguage);
    const {backpackString} = language;

    const backpackSilver = useSelector(selectBackpackSilver);

    return (
        <div className={styles.backPackSilverIconStyles}>
            <StyledBackpackSilverIcon
                title={backpackString.iconTitle}
            />
            <p>{backpackSilver.toLocaleString('en')}</p>
        </div>
    )
}

export default SilverIcon;