import {useMaxQuantityCalculation} from "../Hooks/useMaxQuantityCalculation";
import styles from './MaxItemQuantity.module.scss';

const MaxItemQuantity = () => {
    const {maxQuantity} = useMaxQuantityCalculation()

    return <p className={styles.maxItemQuantity}>{maxQuantity}</p>
}

export default MaxItemQuantity;