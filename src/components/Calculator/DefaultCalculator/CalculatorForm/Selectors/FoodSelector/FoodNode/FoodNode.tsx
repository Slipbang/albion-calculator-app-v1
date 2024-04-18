import {foodSelectorItems} from "../../../../../../../store/Items/foodItems";
import {srcRoute} from "../../../../../../../store/api/api";
import {TTier} from "../../../../../../../types/craftItemsType";
import styles from '../FoodSelector.module.scss'
import {IFoodObject} from "../../../../../../../types/foodTypes";
import {useAppDispatch} from "../../../../../../../store";
import {profitSliceActions} from "../../../../../../../store/profit/profit-slice";
import {useSelector} from "react-redux";
import {selectCalculatorType} from "../../../../../../../store/interface/interface-selector";

const FoodNode = ({tier}: {tier: Exclude<TTier, 'T3'>}) => {

    const dispatchAction = useAppDispatch();
    const calculatorType = useSelector(selectCalculatorType);

    const selectFoodItemHandler = (item: IFoodObject) => {
        dispatchAction(profitSliceActions.setSelected({type: calculatorType, selectedFood: item}))
    }

    return (
        <div style={{display: "flex"}}>
            {foodSelectorItems[tier].map(item => {
                const {itemId, quantity} = item;

                return (
                    <div key={itemId}>
                        <img
                            src={`${srcRoute}${itemId}`}
                            alt=""
                            onClick={() => selectFoodItemHandler(item)}
                        />
                        <div className={styles.resourceQuantity}>
                            <p>{quantity}</p>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default FoodNode;