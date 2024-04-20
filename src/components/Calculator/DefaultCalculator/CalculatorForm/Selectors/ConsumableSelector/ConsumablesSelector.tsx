import styles from './ConsumablesSelector.module.scss'
import {ISelectedLanguage, TSelectedLanguage} from "../../../../../../types/languageTypes";
import {useSelector} from "react-redux";
import {
    selectConsumable,
    selectConsumableItemQuantity,
    selectPercent
} from "../../../../../../store/profit/profit-selectors";
import {srcRoute} from "../../../../../../store/api/api";
import {useEffect, useRef, useState} from "react";
import {TTier} from "../../../../../../types/craftItemsType";
import ConsumablesNode from "./ConsumablesNode/ConsumablesNode";
import StyledImageBox from "../../../../StyledComponentsCommon/StyledImageBox";
import {useAppDispatch} from "../../../../../../store";
import {profitSliceActions} from "../../../../../../store/profit/profit-slice";
import {consumablesNamesData} from "../../../../../../store/Items/consumablesNamesData";

interface IFoodSelectorProps {
    calculatorFormStrings: ISelectedLanguage['calculatorFormStrings'];
    selectedLanguage: TSelectedLanguage;
}

const tiers: Exclude<TTier, 'T3'>[] = ['T4', 'T5', 'T6', 'T7', 'T8'];

const ConsumablesSelector = (props: IFoodSelectorProps) => {
    const {calculatorFormStrings, selectedLanguage} = props;

    const dispatchAction = useAppDispatch();

    const selectedConsumable = useSelector(selectConsumable);
    const {itemId, amountCrafted} = selectedConsumable!;
    const itemQuantityInput = useSelector(selectConsumableItemQuantity)
    const returnPercent = useSelector(selectPercent);

    const consumableItemSelectorRef = useRef<HTMLImageElement>(null)

    const consumableKeys = Object.keys(selectedConsumable!);

    const defineStates = () => {
        const resourceKeys: string[] = [];
        consumableKeys.forEach(key => {
            if (key.toUpperCase() === key) {
                resourceKeys.push(key);
            }
        })

        const initialResources: {
            [key: string]: number;
        } = {};

        resourceKeys.forEach(key => {
            initialResources[key] = selectedConsumable![key] as number;
        })

        return {initialResources, resourceKeys};
    }

    const {initialResources, resourceKeys} = defineStates();

    const [resourceQuantityInput, setResourceQuantityInput] = useState(initialResources);
    const [isSelectorVisible, setIsSelectorVisible] = useState(false);

    const defineParams = () => {
        const consumptionItemQueryParams: string[] = [itemId,...resourceKeys].filter(item => !item.includes('FISHSAUCE') && !item.includes('ALCHEMY_EXTRACT'));
        const extraResourceKey = [...resourceKeys].filter(item => item.includes('FISHSAUCE') || item.includes('ALCHEMY_EXTRACT')).join('');

        [1, 2, 3].forEach(enchantment => {
            consumptionItemQueryParams.push(`${itemId}@${enchantment}`);
            consumptionItemQueryParams.push(`${extraResourceKey}${enchantment}`);
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
    }, [selectedConsumable])

    const changeInputsHandler = (value: number, resourceId: string, resourceCount: number) => {

        const itemsOutput = Math.round(value / resourceCount);

        dispatchAction(profitSliceActions.setConsumableItemQuantity(itemsOutput));

        const newState: { [key: string]: number } = {}

        resourceKeys.forEach(key => {
            newState[key] = initialResources[key] * itemsOutput;
        })

        setResourceQuantityInput({...newState})
    }

    const resourcesWithReturnPercent = (key: string) => {
        if (key.includes('QUESTITEM_TOKEN_AVALON') || key.includes('ALCHEMY_RARE')) {
            return resourceQuantityInput[key];
        }

        return Math.ceil(resourceQuantityInput[key] - resourceQuantityInput[key] * (returnPercent / 100));
    }

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.selectedConsumableItem}
            >
                <p>{calculatorFormStrings.type}</p>
                <div
                    ref={consumableItemSelectorRef}
                    style={{marginLeft: 20}}
                >
                    <div
                        onClick={() => setIsSelectorVisible(prevState => !prevState)}
                        title={consumablesNamesData[itemId][selectedLanguage] || 'name is not found'}
                    >
                        <img
                            src={`${srcRoute}${itemId}`}
                            alt=""
                        />
                        <div className={styles.resourceQuantity}>
                            <p>{amountCrafted}</p>
                        </div>
                    </div>
                    <div className={styles.quantityInput}>
                        <input
                            type="number"
                            min={amountCrafted}
                            step={amountCrafted}
                            value={itemQuantityInput * amountCrafted || 0}
                            onChange={(event) => changeInputsHandler(+event.target.value, itemId, amountCrafted)}
                        />
                    </div>
                    <div className={styles.totalQuantity}>{calculatorFormStrings.total}</div>
                </div>
            </div>

            {!!isSelectorVisible && (
                <div style={{display: "flex", flexDirection: 'column', position: "absolute", zIndex: 5, top: 55, left: 155}}>
                    {tiers.map(tier => {

                        return (
                            <ConsumablesNode
                                key={tier}
                                tier={tier}
                                selectedLanguage={selectedLanguage}
                            />
                        )
                    })}
                </div>
            )}

            {!isSelectorVisible && <div className={styles.resources}>
                {resourceKeys.map(key => {

                    if (key.toUpperCase() !== key) return;

                    return (
                        <div key={key} className={styles.resourceUnit}>
                            {!key.includes('FISHSAUCE') && !key.includes('ALCHEMY_EXTRACT')
                                ? <img src={`${srcRoute}${key}`} title={consumablesNamesData[key][selectedLanguage] || 'name is not found'} alt=""/>
                                : (<div className={styles.extraResource} title={consumablesNamesData[key][selectedLanguage] || 'name is not found'}>
                                    <StyledImageBox $position={'static'} $image={`${srcRoute}${key}1`} $width={25} $height={65} $backgroundPosition={'left'} />
                                    <StyledImageBox $position={'static'} $image={`${srcRoute}${key}2`} $width={15} $height={65} $backgroundPosition={'center'} />
                                    <StyledImageBox $position={'static'} $image={`${srcRoute}${key}3`} $width={25} $height={65} $backgroundPosition={'right'} />
                                </div>)
                            }

                            <div style={{marginTop: `${(!key.includes('FISHSAUCE') && !key.includes('ALCHEMY_EXTRACT')) ? -30 : -26}px`}} className={styles.resourceQuantity}>
                                <p>{selectedConsumable![key] || 0}</p>
                            </div>
                            <div style={{marginTop: `${(!key.includes('FISHSAUCE') && !key.includes('ALCHEMY_EXTRACT')) ? 0 : 4}px`}} className={styles.quantityInput}>
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

export default ConsumablesSelector;