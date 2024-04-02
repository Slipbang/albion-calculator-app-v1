import {useSelector} from "react-redux";
import {selectItemsQuantityCF} from "../../../../../store/interface/interface-selector";
import styles from './ItemsQuantityBox.module.scss';

const ItemsQuantityBox = () => {

    const itemsQuantity = useSelector(selectItemsQuantityCF);

    return (
        <div
            className={itemsQuantity < 99 ? styles.itemsCounterBig : itemsQuantity < 999 ? styles.itemsCounterMedium : styles.itemsCounterSmall}
        >
            <p>{Math.floor(itemsQuantity)}</p>
        </div>
    )
}

export default ItemsQuantityBox;