import {srcRoute} from "../../../../../../../store/api/api";
import {TTier} from "../../../../../../../types/craftItemsType";
import styles from '../ConsumablesSelector.module.scss'
import {IConsumableObject} from "../../../../../../../types/consumableTypes";
import {useAppDispatch} from "../../../../../../../store";
import {profitSliceActions} from "../../../../../../../store/profit/profit-slice";
import {useSelector} from "react-redux";
import {selectCalculatorType} from "../../../../../../../store/interface/interface-selector";
import {consumablesSelectorItems} from "../../../../../../../store/Items/consumablesSelectorItems";
import {TCalcProps} from "../../../../../../../types/calculatorPropsType";
import {consumablesNamesData} from "../../../../../../../store/Items/consumablesNamesData";
import {TSelectedLanguage} from "../../../../../../../types/languageTypes";

interface IConsumablesNodeProps {
    tier: Exclude<TTier, 'T3'>;
    selectedLanguage: TSelectedLanguage;
}

const ConsumablesNode = ({tier, selectedLanguage}: IConsumablesNodeProps) => {

    const dispatchAction = useAppDispatch();
    const calculatorType = useSelector(selectCalculatorType);

    const selectConsumableItemHandler = (item: IConsumableObject) => {
        dispatchAction(profitSliceActions.setSelected({type: calculatorType, selectedConsumable: item}));
    }

    return (
        <div style={{display: "flex"}}>
            {consumablesSelectorItems[calculatorType as Exclude<TCalcProps, 'items' | 'resource'>][tier].map(item => {
                const {itemId, amountCrafted} = item;

                return (
                    <div key={itemId}>
                        <img
                            src={`${srcRoute}${itemId}`}
                            alt=""
                            onClick={() => selectConsumableItemHandler(item)}
                            title={consumablesNamesData[itemId][selectedLanguage] || 'name is not found'}
                        />

                        <div className={styles.resourceQuantity}>
                            <p>{amountCrafted}</p>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default ConsumablesNode;