import StyledImageBox from "../../../../StyledComponentsCommon/StyledImageBox";
import {silver} from "../../../../CommonImgReexports/CommonImgReexports";
import {useTotalPriceCalculation} from "../../Hooks/useTotalPriceCalculation";
import styles from './TotalPriceBox.module.scss';
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../../../store/language/language-selector";
import {selectMarketAction} from "../../../../../../store/GMProfit/gm-profit-selectors";
import StyledInfoIcon from "../../../GMCraftingForm/GMCraftingFormSC/StyledInfoIcon";

const TotalPriceBox = () => {
    const {language} = useSelector(selectLanguage);
    const {marketItemStings} = language;
    const marketAction = useSelector(selectMarketAction);

    const {totalPrice} = useTotalPriceCalculation();

    const totalPriceWithTax = Math.floor(marketAction === 'buy' ? totalPrice : (totalPrice - (totalPrice * 0.065)));

    return (
        <div className={styles.totalPrice}>
            <div className={styles.totalPriceLabel}>
                <p>{marketItemStings.totalPriceLabel}</p>
            </div>
            <StyledImageBox
                $position='static'
                $image={silver}
                $height={25}
                $width={25}
            />
            <p>{totalPriceWithTax || 0}</p>
            {marketAction === 'sell' &&
                <StyledInfoIcon
                    title={marketItemStings.tax}
                />
            }
        </div>
    )
}

export default TotalPriceBox;