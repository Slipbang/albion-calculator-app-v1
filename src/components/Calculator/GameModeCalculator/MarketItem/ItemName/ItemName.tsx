import {useSelector} from "react-redux";
import {selectMarketItem} from "../../../../../store/GMProfit/gm-profit-selectors";
import styles from './ItemName.module.scss';
import {selectLanguage} from "../../../../../store/language/language-selector";

const ItemName = () => {
    const {selectedLanguage} = useSelector(selectLanguage);

    const selectedMarketItem = useSelector(selectMarketItem);
    const {itemName} = selectedMarketItem;

    return <p className={styles.itemName}>{itemName?.[selectedLanguage]}</p>
}

export default ItemName;