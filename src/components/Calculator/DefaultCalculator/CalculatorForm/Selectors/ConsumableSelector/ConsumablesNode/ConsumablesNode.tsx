import {srcRoute} from "../../../../../../../store/api/api";
import {TTier} from "../../../../../../../types/craftItemsType";
import styles from '../ConsumablesSelector.module.scss'
import {IConsumableObject} from "../../../../../../../types/consumableTypes";
import {useAppDispatch} from "../../../../../../../store";
import {profitSliceActions} from "../../../../../../../store/profit/profit-slice";
import {useSelector} from "react-redux";
import {
    selectCalculatorType,
    selectInterfaceConsumablesSelectorItems, selectInterfaceLanguageData
} from "../../../../../../../store/interface/interface-selector";
import {TCalcProps} from "../../../../../../../types/calculatorPropsType";
import {TSelectedLanguage} from "../../../../../../../types/languageTypes";

interface IConsumablesNodeProps {
    tier: Exclude<TTier, 'T3'>;
    selectedLanguage: TSelectedLanguage;
}

const ConsumablesNode = ({tier, selectedLanguage}: IConsumablesNodeProps) => {

    const dispatchAction = useAppDispatch();
    const calculatorType = useSelector(selectCalculatorType);
    const languageData = useSelector(selectInterfaceLanguageData);
    const getItemTranslations = (itemId: string) => languageData[itemId];
    const consumablesSelectorItems = useSelector(selectInterfaceConsumablesSelectorItems);

    const selectConsumableItemHandler = (item: IConsumableObject) => {
        dispatchAction(profitSliceActions.setSelected({type: calculatorType, selectedConsumable: item}));
    }

    return (
        <div style={{display: "flex"}}>
            {consumablesSelectorItems[calculatorType as Extract<TCalcProps, 'FOOD' | 'POTIONS'>][tier].map(item => {
                const {itemId, amountCrafted} = item;
                const itemName = getItemTranslations(itemId)?.[selectedLanguage] || 'name is not found';
                return (
                    <div
                        style={{cursor: 'pointer'}}
                        key={itemId}
                        onClick={() => selectConsumableItemHandler(item)}
                    >
                        <img
                            src={`${srcRoute}${itemId}`}
                            alt=""
                            title={itemName}
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