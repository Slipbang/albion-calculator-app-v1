import StyledThumb from "../../../StyledComponentsCommon/StyledThumb";
import {silver} from "../../../CommonImgReexports/CommonImgReexports";
import {useSelector} from "react-redux";
import {selectCraftingItems, selectFoodTax} from "../../../../../store/GMProfit/gm-profit-selectors";
import {TCraftItems} from "../../../../../store/Items/craftItems";
import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {selectInputIS, selectNodeIS, selectTierIS} from "../../../../../store/interface/interface-selector";
import {GMProfitSliceActions, ISelectedWorkBenchItem} from "../../../../../store/GMProfit/gm-profit-slice";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../store";
import styles from './WorkBenchItemSelector.module.scss'
import {selectLanguage} from "../../../../../store/language/language-selector";
import {useDeferredValue} from "react";
import WorkBenchItemsLoader from "../ItemsLoaders/WorkBenchItemsLoader";
import {defineArtefactsName} from "../../../Definers/defineArtefactsName";
import {dummyEnchantmentButtons} from "../../../../../store/interface/DummyEnchantmentButtons/DummyEnchantmentButtons";

type TCraftItemsKeys =  keyof Omit<TCraftItems, 'itemName'>;

const WorkBenchItemSelector = (props: {calculatorType: TCalcProps}) => {
    const {calculatorType} = props;
    const craftingItems = useSelector(selectCraftingItems);
    const foodTax = useSelector(selectFoodTax);
    const inputSearch = useSelector(selectInputIS);
    const selectedNode = useSelector(selectNodeIS);
    const selectedTier = useSelector(selectTierIS);
    const {selectedLanguage} = useSelector(selectLanguage);
    const deferredCraftingItems = useDeferredValue(craftingItems);

    const dispatchAction = useAppDispatch();

    const calculateArtefactsQuantityHandler = (artefactItemId: string, itemNode: string, itemTier: number) => {
        let artefactsQuantity: number = 1;

        if (artefactItemId?.includes('QUESTITEM_TOKEN_ROYAL')) {
            switch (itemNode) {
                case 'leatherArmor':
                case 'clothArmor':
                case 'plateArmor':
                    artefactsQuantity = itemTier >= 6 ? 16 : itemTier === 5 ? 8 : 4;
                    break;
                default:
                    artefactsQuantity = itemTier >= 6 ? 8 : itemTier === 5 ? 4 : 2;
                    break;
            }
        }

        return artefactsQuantity;
    }

    const calculateFoodTax = (foodConsumption: number, itemTier: number) => {

        if (calculatorType === 'resource') {
            return Math.floor(foodConsumption * (foodTax / 100));
        } else {
            return Math.floor(foodConsumption! * Math.pow(2, itemTier - 4) * (foodTax / 100));
        }
    }

    const validateItemHandler = (itemTier: number, itemNode: string, itemName: string) => {
        return !!(selectedTier.value.includes(`T${itemTier}`)
            && selectedNode.value.includes(itemNode)
            && (!!inputSearch.trim() ? itemName.toLowerCase().match(inputSearch.toLowerCase()) : true));
    }

    const selectItemHandler = (selectedItem: ISelectedWorkBenchItem) => {
        dispatchAction(interfaceSliceActions.setIsCraftingFormVisible(true));
        dispatchAction(GMProfitSliceActions.setSelectedWorkBenchItem(selectedItem));
    }

    const calculateMatsTier = (tier: number, quantity: number) => {
        return tier - (quantity === 1 ? 1 : 0);
    }

    const defineEnchantment = (enchantment: string, tier: number, matsQuantity: number) => {
        if (tier === 4 && matsQuantity === 1){
            return '';
        } else {
            return enchantment || '';
        }
    }

    const defineFontSize = (itemName: string) => {
        return itemName.length > 18 ? 10 : itemName.length > 14 ? 12 : 16
    }

    const imgRoute = 'https://render.albiononline.com/v1/item/';

    const resetEnchantmentHandler = (itemId: string, enchantment: string) => {
        if (calculatorType === 'resource' && !itemId!.includes('STONEBLOCK')) {
            dispatchAction(interfaceSliceActions.setMaterialEnchantmentCF(enchantment!));
            dispatchAction(interfaceSliceActions.setItemEnchantmentCF(''));
            dispatchAction(interfaceSliceActions.setEnchantmentNumCF(enchantment?.split('@')[1]!));
        }
        if (calculatorType === 'items' || (calculatorType === 'resource' && itemId!.includes('STONEBLOCK'))) {
            dispatchAction(interfaceSliceActions.setEnchantmentButtons(dummyEnchantmentButtons))
            dispatchAction(interfaceSliceActions.setMaterialEnchantmentCF(''));
            dispatchAction(interfaceSliceActions.setItemEnchantmentCF(''));
            dispatchAction(interfaceSliceActions.setEnchantmentNumCF(''));
        }
    }

    return <StyledThumb>
        <div className={styles.wrapper}>
            {craftingItems === deferredCraftingItems && deferredCraftingItems.map(item => {
                const {
                    itemId,
                    itemTier,
                    itemNode,
                    itemImage,
                    artefactItemId,
                    foodConsumption,
                    enchantment,
                    itemName,
                } = item;

                let itemKeys = Object.keys(item) as TCraftItemsKeys[];

                let matsKeys: TCraftItemsKeys[] = [];

                itemKeys.forEach(key=> {
                    if (key.toUpperCase() === key){
                        matsKeys.push(key);
                    }
                })

                const {artefactName} = defineArtefactsName({artefactId: artefactItemId!});
                const artefactsQuantity = calculateArtefactsQuantityHandler(artefactItemId!, itemNode, itemTier);
                const foodTax = calculateFoodTax(foodConsumption!, itemTier)

                return <div
                    key={itemId}
                    className={styles.itemBox}
                    style={validateItemHandler(itemTier, itemNode!, itemName?.[selectedLanguage]!) ? {display: 'grid'} : {display: 'none'}}
                    onClick={() => {
                        selectItemHandler({...item, artefactsQuantity: artefactsQuantity})
                        resetEnchantmentHandler(itemId!, enchantment!)
                    }}
                >
                    <div className={styles.itemImage}>
                        <img
                            className={styles.backgroundSkeleton}
                            src={itemImage}
                            draggable={false}
                            alt=''
                            title={itemName?.[selectedLanguage]!}
                        />
                    </div>

                    <div className={styles.resourcesBox}>
                        <span>
                            <img
                                title='silver'
                                src={silver}
                                draggable={false}
                                alt="sil"
                            />
                            <p>{foodTax.toLocaleString('en')}</p>
                        </span>

                        {matsKeys.map(key => {
                            return item[key] && <span
                                key={key}
                            >
                                <img
                                    className={styles.backgroundSkeleton}
                                    src={`${imgRoute}T${calculateMatsTier(itemTier, +item[key]!)}_${key}${defineEnchantment(enchantment!, itemTier,+item[key]!)}`}
                                    draggable={false}
                                    alt=''
                                    title={key}
                                />
                                <p>{item[key]}</p>
                            </span>
                        })}

                        {!!artefactItemId && <span>
                            <img
                                className={styles.backgroundSkeleton}
                                src={`${imgRoute}${artefactItemId}`}
                                draggable={false}
                                title={artefactName?.[selectedLanguage] || ''}
                                alt=''
                            />
                            <p>{artefactsQuantity}</p>
                        </span>}
                    </div>

                    <p
                        className={styles.itemName}
                        style={{fontSize: `${defineFontSize(itemName?.[selectedLanguage]!)}px`}}
                    >{`${itemName?.[selectedLanguage]} T${itemTier}`}</p>
                    <hr className={styles.hrStyles}/>
                </div>
            })}
            {craftingItems !== deferredCraftingItems && Array.from({length: 10}).map((_, index) => (
                <div key={index} style={{margin: '10px 0 10px 0',}}>
                    <WorkBenchItemsLoader/>
                </div>
            ))}
        </div>
    </StyledThumb>
}

export default WorkBenchItemSelector;