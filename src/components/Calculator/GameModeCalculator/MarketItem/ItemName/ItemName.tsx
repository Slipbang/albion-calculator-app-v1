import {useSelector} from "react-redux";
import {selectMarketItem} from "../../../../../store/GMProfit/gm-profit-selectors";
import styles from './ItemName.module.scss';
import {selectLanguage} from "../../../../../store/language/language-selector";
import {selectInterfaceLanguageData} from "../../../../../store/interface/interface-selector";

const ItemName = () => {
    const {selectedLanguage} = useSelector(selectLanguage);
    const languageData = useSelector(selectInterfaceLanguageData);

    const selectedMarketItem = useSelector(selectMarketItem);
    const itemName = languageData?.[selectedMarketItem.itemId!]?.[selectedLanguage] || '';

    return <p className={styles.itemName} data-text={itemName.length >= 29 ? 'long' : 'short'}>{itemName}</p>
}

export default ItemName;