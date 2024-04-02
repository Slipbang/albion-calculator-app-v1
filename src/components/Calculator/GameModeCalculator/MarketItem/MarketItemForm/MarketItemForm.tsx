import ActionButtons from "./ActionButtons/ActionButtons";
import QuantityInput from "./QuantityInput/QuantityInput";
import ItemPriceSelector from "./ItemPriceSelector/ItemPriceSelector";
import TotalPriceBox from "./TotalPriceBox/TotalPriceBox";
import styles from './MarketItemForm.module.scss'

const MarketItemForm = () => {

    return (
        <div className={styles.formWrapper}>
            <ActionButtons />

            <QuantityInput />

            <ItemPriceSelector />

            <TotalPriceBox />
        </div>
    )
}

export default MarketItemForm;