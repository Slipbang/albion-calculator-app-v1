import {useMaxQuantityCalculation} from "../Hooks/useMaxQuantityCalculation";
import styles from './MaxItemQuantity.module.scss';

const MaxItemQuantity = () => {
    const {maxQuantity} = useMaxQuantityCalculation()

    return (
        <div className={styles.maxItemQuantity}>
            <p>{maxQuantity}</p>
        </div>
    )
}

export default MaxItemQuantity;