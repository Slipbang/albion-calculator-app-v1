import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {useSelector} from "react-redux";
import {selectWorkBenchItem} from "../../../../../store/GMProfit/gm-profit-selectors";
import {selectInterfaceLanguageData, selectItemEnchantmentCF} from "../../../../../store/interface/interface-selector";
import styles from './MainItemImageBox.module.scss';
import {selectLanguage} from "../../../../../store/language/language-selector";
import {srcRoute} from "../../../../../store/api/api";

const MainItemImageBox = (props: {type: TCalcProps}) => {
    const {type} = props;

    const {selectedLanguage} = useSelector(selectLanguage);

    const itemEnchantment = useSelector(selectItemEnchantmentCF);
    const selectedWorkBenchItem = useSelector(selectWorkBenchItem);
    const languageData = useSelector(selectInterfaceLanguageData);
    const {itemId} = selectedWorkBenchItem;

    const itemName = languageData[itemId!]?.[selectedLanguage] ?? [];

    return (
        <div className={styles.itemImage} data-text={itemName.length >= 29 ? 'long' : 'short'}>
            <img
                src={`${srcRoute}${itemId}${type === 'ITEMS' ? itemEnchantment : ''}`}
                alt=""
            />

            <p>{itemName}</p>
        </div>
    )
}

export default MainItemImageBox;