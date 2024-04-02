import styles from './MarketItemImage.module.scss'
import {useSelector} from "react-redux";
import {selectMarketItem} from "../../../../../store/GMProfit/gm-profit-selectors";
import {selectLanguage} from "../../../../../store/language/language-selector";

const MarketItemImage = () => {
    const selectedMarketItem = useSelector(selectMarketItem);
    const {itemImage, itemName} = selectedMarketItem;
    const {selectedLanguage} = useSelector(selectLanguage);

    return (
        <img
            src={itemImage}
            className={styles.itemImage}
            title={itemName?.[selectedLanguage]}
            alt=''
        />
    )
}

export default MarketItemImage;