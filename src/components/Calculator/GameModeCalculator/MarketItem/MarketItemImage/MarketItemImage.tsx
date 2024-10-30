import styles from './MarketItemImage.module.scss'
import {useSelector} from "react-redux";
import {selectMarketItem} from "../../../../../store/GMProfit/gm-profit-selectors";
import {selectLanguage} from "../../../../../store/language/language-selector";
import {selectInterfaceLanguageData} from "../../../../../store/interface/interface-selector";

const MarketItemImage = () => {
    const selectedMarketItem = useSelector(selectMarketItem);
    const {itemImage} = selectedMarketItem;
    const {selectedLanguage} = useSelector(selectLanguage);
    const languageData = useSelector(selectInterfaceLanguageData);
    const itemName = languageData?.[selectedMarketItem.itemId!]?.[selectedLanguage] || '';

    return (
        <img
            src={itemImage}
            className={styles.itemImage}
            title={itemName}
            alt=''
        />
    )
}

export default MarketItemImage;