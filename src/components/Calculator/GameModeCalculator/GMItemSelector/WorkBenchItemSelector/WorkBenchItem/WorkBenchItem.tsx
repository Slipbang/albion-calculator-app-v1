import {silver} from "../../../../CommonImgReexports/CommonImgReexports";
import styles from './WorkBenchItem.module.scss';
import {useSelector} from "react-redux";
import {
    selectCalculatorType, selectGuide,
    selectInputIS,
    selectInterfaceLanguageData,
    selectNodeIS,
    selectTierIS
} from "../../../../../../store/interface/interface-selector";
import {selectLanguage} from "../../../../../../store/language/language-selector";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import {
    dummyEnchantmentButtons
} from "../../../../../../store/interface/DummyEnchantmentButtons/DummyEnchantmentButtons";
import {useAppDispatch} from "../../../../../../store";
import {GMProfitSliceActions, ISelectedWorkBenchItem} from "../../../../../../store/GMProfit/gm-profit-slice";
import TotalFoodTax from "./TotalFoodTax/TotalFoodTax";
import {srcRoute} from "../../../../../../store/api/api";
import {IGMCraftItem} from "../../../../../../store/utils/createWorkBenchSelectorItems";
import {escapeRegex} from "../../../FunctionUtils/escapeRegex";
import {useEffect, useRef} from "react";

type TCraftItemsKeys = keyof Omit<IGMCraftItem, 'itemName'>;

interface IWorkBenchItemProps {
    item: IGMCraftItem;
}

const WorkBenchItem = ({item}: IWorkBenchItemProps) => {
    const {itemId, itemTier, itemNode, itemImage, artefactItemId, enchantment, foodConsumption} = item;

    const inputSearch = useSelector(selectInputIS);
    const selectedNode = useSelector(selectNodeIS);
    const selectedTier = useSelector(selectTierIS);
    const calculatorType = useSelector(selectCalculatorType);
    const {selectedLanguage} = useSelector(selectLanguage);
    const languageData = useSelector(selectInterfaceLanguageData);
    const itemName = languageData[itemId!];
    const {script} = useSelector(selectGuide)
    const dispatchAction = useAppDispatch();

    const buttonRef = useRef<HTMLDivElement>(null)

    const selectItemHandler = (selectedItem: ISelectedWorkBenchItem) => {
        dispatchAction(interfaceSliceActions.setIsCraftingFormVisible(true));
        dispatchAction(GMProfitSliceActions.setSelectedWorkBenchItem(selectedItem));
    }

    const calculateMatsTier = (tier: number, quantity: number) => {
        return tier - (quantity === 1 ? 1 : 0);
    }

    const defineEnchantment = (enchantment: string, tier: number, matsQuantity: number) => {
        if (tier === 4 && matsQuantity === 1) {
            return '';
        } else {
            return enchantment || '';
        }
    }

    const validateItemHandler = (itemTier: number, itemNode: string, itemName: string) => {
        const fixedValue = escapeRegex(inputSearch);

        return !!(selectedTier.value.includes(`T${itemTier}`)
            && selectedNode.value.includes(itemNode)
            && (!!fixedValue.trim() ? itemName.toLowerCase().match(fixedValue.toLowerCase()) : true));
    }

    const defineFontSize = (itemName: string) => {
        return itemName.length > 18 ? 9 : itemName.length > 14 ? 12 : 16
    }

    const artefactName = languageData[artefactItemId || ''];

    const itemKeys = Object.keys(item) as TCraftItemsKeys[];

    let matsKeys: TCraftItemsKeys[] = [];

    itemKeys.forEach(key => {
        if (key.toUpperCase() === key) {
            matsKeys.push(key);
        }
    })

    const resetEnchantmentHandler = (itemId: string, enchantment: string) => {
        if (calculatorType === 'RESOURCES' && !itemId!.includes('STONEBLOCK')) {
            dispatchAction(interfaceSliceActions.setMaterialEnchantmentCF(enchantment!));
            dispatchAction(interfaceSliceActions.setItemEnchantmentCF(''));
            dispatchAction(interfaceSliceActions.setEnchantmentNumCF(enchantment?.split('@')[1]!));
        }
        if (calculatorType === 'ITEMS' || (calculatorType === 'RESOURCES' && itemId!.includes('STONEBLOCK'))) {
            dispatchAction(interfaceSliceActions.setEnchantmentButtons(dummyEnchantmentButtons))
            dispatchAction(interfaceSliceActions.setMaterialEnchantmentCF(''));
            dispatchAction(interfaceSliceActions.setItemEnchantmentCF(''));
            dispatchAction(interfaceSliceActions.setEnchantmentNumCF(''));
        }
    }

    useEffect(() => {
        if (script === 12) {
            buttonRef.current?.click()
        }
    }, [script])

    return (
        <div
            ref={itemId === 'T6_ARMOR_LEATHER_MORGANA' ? buttonRef : null}
            key={itemId}
            className={styles.itemBox}
            style={validateItemHandler(itemTier, itemNode!, itemName?.[selectedLanguage]!) ? {display: 'grid'} : {display: 'none'}}
            onClick={() => {

                selectItemHandler({...item, artefactsQuantity: item.artefactItemId ? 1 : 0})
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
                    <TotalFoodTax
                        calculatorType={calculatorType}
                        foodConsumption={foodConsumption!}
                        itemTier={itemTier}
                    />
                </span>

                {matsKeys.map(key => {
                    return !!item[key] &&
                        <span
                            key={key}
                        >
                            <img
                                className={styles.backgroundSkeleton}
                                src={`${srcRoute}T${calculateMatsTier(itemTier, +item[key]!)}_${key}${defineEnchantment(enchantment!, itemTier, +item[key]!)}`}
                                draggable={false}
                                alt=''
                                title={key}
                            />
                            <p>{item[key]}</p>
                        </span>
                })}

                {!!artefactItemId &&
                    <span>
                            <img
                                className={styles.backgroundSkeleton}
                                src={`${srcRoute}${artefactItemId}`}
                                draggable={false}
                                title={artefactName?.[selectedLanguage] || ''}
                                alt=''
                            />
                            <p>1</p>
                    </span>}
            </div>

            <p
                className={styles.itemName}
                style={{fontSize: `${defineFontSize(itemName?.[selectedLanguage] || '')}px`}}
            >{itemName?.[selectedLanguage]}</p>
            <hr className={styles.hrStyles}/>
        </div>
    )
}

export default WorkBenchItem;