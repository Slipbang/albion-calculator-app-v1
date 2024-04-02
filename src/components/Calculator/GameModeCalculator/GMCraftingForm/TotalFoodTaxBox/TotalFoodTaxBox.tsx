import StyledImageBox from "../../../StyledComponentsCommon/StyledImageBox";
import {silver} from "../../../CommonImgReexports/CommonImgReexports";
import StyledInfoIcon from "../GMCraftingFormSC/StyledInfoIcon";
import {useTotalFoodTaxCalculation} from "../Hooks/useTotalFoodTaxCalculation";
import {TCalcProps} from "../../../../../types/calculatorPropsType";
import styles from './TotalFoodTaxBox.module.scss';
import {selectLanguage} from "../../../../../store/language/language-selector";
import {useSelector} from "react-redux";
import {selectFoodTax, selectWorkBenchItem} from "../../../../../store/GMProfit/gm-profit-selectors";
import {selectEnchantmentNumCF, selectItemsQuantityCF} from "../../../../../store/interface/interface-selector";

interface ITotalFoodTaxBoxProps {
    calculatorType: TCalcProps;
}

const TotalFoodTaxBox = (props: ITotalFoodTaxBoxProps) => {
    const {calculatorType} = props;

    const {language} = useSelector(selectLanguage);
    const {GMCraftingFormStrings} = language;

    const itemsQuantity = useSelector(selectItemsQuantityCF);
    const selectedWorkBenchItem = useSelector(selectWorkBenchItem);
    const foodTax = useSelector(selectFoodTax);
    const enchantmentNum = useSelector(selectEnchantmentNumCF);

    const {totalFoodTax} = useTotalFoodTaxCalculation({
        calculatorType,
        foodTax,
        itemsQuantity,
        selectedWorkBenchItem,
        enchantmentNum
    });

    return (
        <div className={styles.totalPrice}>
            <div className={styles.totalPriceLabel}>
                <p>{GMCraftingFormStrings.totalPriceLabel}</p>
            </div>
            <StyledImageBox $position={'static'} $image={silver} $height={30} $width={30}/>
            <p className={styles.totalPriceInt}>{totalFoodTax.toLocaleString('en')}</p>
            <StyledInfoIcon title={GMCraftingFormStrings.foodTaxInfoIconText}/>
        </div>
    )
}

export default TotalFoodTaxBox;