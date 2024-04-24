import {useSelector} from "react-redux";
import {selectItemsQuantityCF} from "../../../../../store/interface/interface-selector";
import styles from './ItemsQuantityBox.module.scss';

const ItemsQuantityBox = () => {

    const itemsQuantity = useSelector(selectItemsQuantityCF);

    return (
        <div
            data-count={itemsQuantity < 100 ? 'large' : itemsQuantity < 1000 ? 'medium' : 'small'}
            className={styles.itemsCounter}
        >
            <p>{Math.floor(itemsQuantity)}</p>
        </div>
    )
}

export default ItemsQuantityBox;