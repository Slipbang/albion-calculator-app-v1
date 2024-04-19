import styles from './FoodSelector.module.scss'
import {ISelectedLanguage, TSelectedLanguage} from "../../../../../../types/languageTypes";
import {useSelector} from "react-redux";
import {selectConsumableItemQuantity, selectFood, selectPercent} from "../../../../../../store/profit/profit-selectors";
import {srcRoute} from "../../../../../../store/api/api";
import {useEffect, useRef, useState} from "react";
import {TTier} from "../../../../../../types/craftItemsType";
import FoodNode from "./FoodNode/FoodNode";
import StyledImageBox from "../../../../StyledComponentsCommon/StyledImageBox";
import {useAppDispatch} from "../../../../../../store";
import {profitSliceActions} from "../../../../../../store/profit/profit-slice";

interface IFoodSelectorProps {
    calculatorFormStrings: ISelectedLanguage['calculatorFormStrings'];
    selectedLanguage: TSelectedLanguage;
}

const tiers: Exclude<TTier, 'T3'>[] = ['T4', 'T5', 'T6', 'T7', 'T8'];

const FoodSelector = (props: IFoodSelectorProps) => {
    const {calculatorFormStrings, selectedLanguage} = props;

    const dispatchAction = useAppDispatch();

    const selectedFood = useSelector(selectFood);
    const {itemId, quantity} = selectedFood;
    const itemQuantityInput = useSelector(selectConsumableItemQuantity)
    const returnPercent = useSelector(selectPercent);

    const consumableItemSelectorRef = useRef<HTMLImageElement>(null)

    const foodKeys = Object.keys(selectedFood);

    const defineStates = () => {
        const resourceKeys: string[] = [];
        foodKeys.forEach(key => {
            if (key.toUpperCase() === key) {
                resourceKeys.push(key);
            }
        })

        const initialResources: {
            [key: string]: number;
        } = {};

        resourceKeys.forEach(key => {
            initialResources[key] = selectedFood[key] as number;
        })

        return {initialResources, resourceKeys};
    }

    const {initialResources, resourceKeys} = defineStates();

    const [resourceQuantityInput, setResourceQuantityInput] = useState(initialResources);
    const [isSelectorVisible, setIsSelectorVisible] = useState(false);

    const defineParams = () => {
        const consumptionItemQueryParams: string[] = [itemId,...resourceKeys].filter(item => item !== 'FISHSAUCE');

        [1, 2, 3].forEach(enchantment => {
            consumptionItemQueryParams.push(`${itemId}@${enchantment}`);
            consumptionItemQueryParams.push(`T1_FISHSAUCE_LEVEL${enchantment}`);
        })

        return consumptionItemQueryParams.join(',');
    }

    const consumptionItemQueryParams = defineParams();

    const resetSelector = () => {
        setResourceQuantityInput(initialResources);
        dispatchAction(profitSliceActions.setConsumableItemQuantity(1));
        dispatchAction(profitSliceActions.setConsumptionItemQueryParams(consumptionItemQueryParams));
    }

    useEffect(() => {
        resetSelector();

        const clickOutResourceSelectorHandler = (event: MouseEvent) => {
            if (!event.composedPath().includes(consumableItemSelectorRef.current!)) {
                setIsSelectorVisible(false);
            }
        }

        document.body.addEventListener('click', clickOutResourceSelectorHandler);

        return () => {
            document.body.removeEventListener('click', clickOutResourceSelectorHandler);
        };
    }, [selectedFood])

    const changeInputsHandler = (value: number, resourceId: string, resourceCount: number) => {

        const itemsOutput = Math.round(value / resourceCount);

        dispatchAction(profitSliceActions.setConsumableItemQuantity(itemsOutput));

        const newState: { [key: string]: number } = {}

        resourceKeys.forEach(key => {
            newState[key] = initialResources[key] * itemsOutput;
        })

        setResourceQuantityInput({
            ...newState,
        })
    }

    const resourcesWithReturnPercent = (key: string) => {
        if (key === 'QUESTITEM_TOKEN_AVALON') {
            return resourceQuantityInput[key];
        }

        return Math.ceil(resourceQuantityInput[key] - resourceQuantityInput[key] * (returnPercent / 100));
    }

    return (
        <div className={styles.wrapper}>
            <p>{calculatorFormStrings.type}</p>
            <div className={styles.selectedMeal}>
                <img
                    ref={consumableItemSelectorRef}
                    src={`${srcRoute}${itemId}`}
                    onClick={() => setIsSelectorVisible(prevState => !prevState)}
                    alt=""
                />
                <div className={styles.resourceQuantity}>
                    <p>{quantity}</p>
                </div>
                <div className={styles.quantityInput}>
                    <input
                        type="number"
                        min={quantity}
                        step={quantity}
                        value={itemQuantityInput * quantity || 0}
                        onChange={(event) => changeInputsHandler(+event.target.value, itemId, quantity)}
                    />
                </div>
                <div className={styles.totalQuantity}>итого:</div>
            </div>

            {!!isSelectorVisible && (
                <div style={{display: "flex", flexDirection: 'column', position: "absolute", zIndex: 5, top: 55, left: 155}}>
                    {tiers.map(tier => {

                        return <FoodNode key={tier} tier={tier} />
                    })}
                </div>
            )}

            {!isSelectorVisible && <div className={styles.mealResources}>
                {resourceKeys.map(key => {

                    if (key.toUpperCase() !== key) return;

                    return (
                        <div key={key} className={styles.resourceUnit}>

                            {!key.includes('FISHSAUCE')
                                ? <img src={`${srcRoute}${key}`} alt=""/>
                                : (<div className={styles.fishSauce}>
                                    <StyledImageBox $position={'static'} $image={`${srcRoute}T1_${key}_LEVEL1`} $width={25} $height={65} $backgroundPosition={'left'} />
                                    <StyledImageBox $position={'static'} $image={`${srcRoute}T1_${key}_LEVEL2`} $width={15} $height={65} $backgroundPosition={'center'} />
                                    <StyledImageBox $position={'static'} $image={`${srcRoute}T1_${key}_LEVEL3`} $width={25} $height={65} $backgroundPosition={'right'} />
                                </div>)
                            }

                            <div style={{marginTop: `${!key.includes('FISHSAUCE') ? -30 : -26}px`}} className={styles.resourceQuantity}>
                                <p>{selectedFood[key] || 0}</p>
                            </div>
                            <div style={{marginTop: `${!key.includes('FISHSAUCE') ? 0 : 4}px`}} className={styles.quantityInput}>
                                <input
                                    type="number"
                                    value={resourceQuantityInput[key] || 0}
                                    min={initialResources[key]}
                                    step={initialResources[key]}
                                    onChange={(event) => changeInputsHandler(+event.target.value, key, initialResources[key])}
                                />
                            </div>
                            <div className={styles.totalQuantity}>{resourcesWithReturnPercent(key) || 0}</div>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default FoodSelector;