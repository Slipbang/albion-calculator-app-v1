import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {useSelector} from "react-redux";
import {
    selectCraftedMealsList,
    selectCraftedPotionsList,
    selectSimilarTypeErrors
} from "../../../../../store/profit/profit-selectors";
import styles from './ConsumablesList.module.scss';
import {ISelectedLanguage, TSelectedLanguage} from "../../../../../types/languageTypes";
import {IConsumableObject} from "../../../../../types/consumableTypes";
import StyledDefaultButton from "../../../StyledComponentsCommon/StyledDefaultButton";
import {IConsumableTableData, profitSliceActions} from "../../../../../store/profit/profit-slice";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../store";
import ConsumableItemImage from "../ConsumableItemImage/ConsumableItemImage";

interface TConsumablesTableProps {
    craftTableStrings: ISelectedLanguage['craftTableStrings'];
    deleteLiHandler: (type: TCalcProps, id: string) => void;
    calculatorType: TCalcProps;
    selectedLanguage: TSelectedLanguage;
}

const ConsumablesList = (props: TConsumablesTableProps) => {
    const {deleteLiHandler, calculatorType, selectedLanguage, craftTableStrings} = props;

    const dispatchAction = useAppDispatch();

    const selectList = () => {
        switch (calculatorType) {
            case 'food':
                return selectCraftedMealsList;
            case 'potions':
                return selectCraftedPotionsList;
        }
    }
    const selectedList = selectList();
    const craftedConsumablesList = useSelector(selectedList!);
    const similarError = useSelector(selectSimilarTypeErrors);
    let similarItemId: string | undefined;
    if (calculatorType === 'food'){
        similarItemId = similarError.similarFoodId;
    }
    if (calculatorType === 'potions'){
        similarItemId = similarError.similarPotionsId;
    }

    const resourcesWithReturnPercent = (craftedFood: IConsumableObject, key: string, returnPercent: number, totalQuantity: number) => {

        if (key.includes('QUESTITEM_TOKEN_AVALON') || key.includes('ALCHEMY_RARE')) {
            return +craftedFood[key] * totalQuantity;
        }
        if (key === craftedFood.itemId) {
            return craftedFood.amountCrafted * totalQuantity;
        }
        return Math.ceil((+craftedFood[key] - +craftedFood[key] * (returnPercent / 100)) * totalQuantity);
    }

    const fetchItemDataHandler = (item: IConsumableTableData) => {
        dispatchAction(profitSliceActions.setConsumableItem(item));
        dispatchAction(interfaceSliceActions.setInfoTableVisibility(true));
    }

    return <div className={styles.wrapper} data-notification={craftTableStrings.alert}>
        {craftedConsumablesList.map(item => {
            const {craftedConsumable, percent, quantity, id} = item;
            const consumableKeys = Object.keys(craftedConsumable);

            const resourceKeys: string[] = [craftedConsumable.itemId, ...[...consumableKeys].filter(key => key.toUpperCase() === key)];

            return (
                <div className={styles.craftedItem} key={id} data-similar-allert={id === similarItemId ? 'similar' : 'non-similar'}>
                    <div className={styles.resources}>
                        {resourceKeys.map(key => {
                            const resourceQuantity = resourcesWithReturnPercent(craftedConsumable, key, percent, quantity);

                            return (
                                <div key={key} style={{position: 'relative'}}>
                                    <ConsumableItemImage
                                        resourceKeys={key}
                                        selectedLanguage={selectedLanguage}
                                        extraResourceStyles={styles.extraResource}
                                    />

                                    <div style={{marginTop: `${(!key.includes('FISHSAUCE') && !key.includes('ALCHEMY_EXTRACT')) ? -30 : -26}px`}} className={styles.resourceQuantity}>
                                        <p>{craftedConsumable![key] || craftedConsumable.amountCrafted || 0}</p>
                                    </div>
                                    <div style={{marginTop: `${(!key.includes('FISHSAUCE') && !key.includes('ALCHEMY_EXTRACT')) ? 0 : 3}px`}} className={styles.totalQuantity}>{resourceQuantity || 0}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.buttonsBox}>
                        <p>{percent}%</p>
                        <StyledDefaultButton
                            $width={70}
                            $height={23}
                            onClick={() => deleteLiHandler(calculatorType, id)}
                        >Delete</StyledDefaultButton>

                        <StyledDefaultButton
                            $width={70}
                            $height={23}
                            onClick={() => fetchItemDataHandler(item)}
                        >Info</StyledDefaultButton>
                    </div>
                </div>
            )}
        )}
    </div>
}

export default ConsumablesList;