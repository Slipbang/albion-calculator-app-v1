import StyledImageBox from "../../../StyledComponentsCommon/StyledImageBox";
import {marketAvatar} from "../MarketMenuImgReexports/MarketMenuImgReexports";
import React from "react";
import styles from './MarketMenuHeader.module.scss';
import MarketMenuSelectors from "./MarketMenuSelectors/MarketMenuSelectors";
import {selectLanguage} from "../../../../../store/language/language-selector";
import {useSelector} from "react-redux";

const MarketMenuHeader = () => {
    const {language} = useSelector(selectLanguage);
    const {marketMenuStrings} = language;

    return (
        <div className={styles.marketMenuHeader}>
            <div className={styles.headerItemsWrapper}>
                <StyledImageBox
                    $image={marketAvatar}
                    $height={75}
                    $width={75}
                    $position={'static'}
                />
                <p>{marketMenuStrings.marketHeader}</p>
            </div>

            <MarketMenuSelectors />
        </div>
    )
}

export default MarketMenuHeader;