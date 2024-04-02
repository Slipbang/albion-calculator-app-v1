import StyledImageBox from "../../../StyledComponentsCommon/StyledImageBox";
import {silver} from "../../../CommonImgReexports/CommonImgReexports";
import FoodTaxInput from "./FoodTaxInput/FoodTaxInput";
import React from "react";
import styles from './FoodTaxBox.module.scss';
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../../store/language/language-selector";

const FoodTaxBox = () => {
    const {language} = useSelector(selectLanguage);
    const {GMItemSelectorStings} = language;

    return <div className={styles.foodTax}>
        <p>{GMItemSelectorStings.nutritionUsage1}</p>
        <div className={styles.inputBox}>
            <p>{GMItemSelectorStings.nutritionUsage2}</p>
            <StyledImageBox
                style={{margin: '-5px'}}
                $width={23}
                $height={23}
                $image={silver}
                $position={'static'} $hasDropShadow={false}
            />
            <FoodTaxInput />
        </div>
    </div>
}

export default FoodTaxBox;