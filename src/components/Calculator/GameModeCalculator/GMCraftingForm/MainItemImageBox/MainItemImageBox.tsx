import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {useSelector} from "react-redux";
import {selectWorkBenchItem} from "../../../../../store/GMProfit/gm-profit-selectors";
import {selectItemEnchantmentCF} from "../../../../../store/interface/interface-selector";
import styles from './MainItemImageBox.module.scss';
import {selectLanguage} from "../../../../../store/language/language-selector";

const MainItemImageBox = (props: {type: TCalcProps}) => {
    const {type} = props;

    const {selectedLanguage} = useSelector(selectLanguage);

    const itemEnchantment = useSelector(selectItemEnchantmentCF);
    const selectedWorkBenchItem = useSelector(selectWorkBenchItem);
    const {itemId, itemTier, itemName} = selectedWorkBenchItem;

    const srcRoute = 'https://render.albiononline.com/v1/item/';

    return (
        <div className={styles.itemImage}>
            <img
                src={`${srcRoute}${itemId}${type === 'items' ? itemEnchantment : ''}`}
                alt=""
            />

            <p>{`${itemName?.[selectedLanguage]} T${itemTier}`}</p>
        </div>
    )
}

export default MainItemImageBox;