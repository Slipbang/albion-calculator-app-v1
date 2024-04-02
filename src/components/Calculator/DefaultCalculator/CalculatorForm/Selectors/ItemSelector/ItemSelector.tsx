import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import {
    arrowDown,
    arrowRight,
    leftSwipeButton,
    rightSwipeButton
} from "../../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";
import {mainNodesItems} from "../../MainNodesItems/mainNodesItems";
import {craftItems} from "../../../../../../store/Items/craftItems";
import React, {useEffect, useRef, useState} from "react";
import {ICraftItem, TCraftItemType, TCraftItemTypes, TItemNode} from "../../../../../../types/craftItemsType";
import {profitSliceActions} from "../../../../../../store/profit/profit-slice";
import {TCalcProps} from "../../../../../../types/calculatorPropsType";
import {useSelector} from "react-redux";
import {selectItemSelector} from "../../../../../../store/profit/profit-selectors";
import {useAppDispatch} from "../../../../../../store";
import {ISelectedLanguage} from "../../../../../../types/languageTypes";
import {useDefineSelectorImg} from "../../Hooks/useDefineSelectorImg";
import styles from './ItemSelector.module.scss';
import {defineMaterials} from "../../../../Definers/defineMaterials";

const itemTypeKeys = Object.keys(craftItems) as TCraftItemTypes[];

interface IItemSelectorProps {
    calculatorType: TCalcProps;
    calculatorFormStrings: ISelectedLanguage['calculatorFormStrings'];
    selectedLanguage: 'ru' | 'en';
}

const ItemSelector = (props: IItemSelectorProps) => {
    const {calculatorType, selectedLanguage, calculatorFormStrings} = props;

    const dispatchAction = useAppDispatch();

    const classSelectorRef = useRef<HTMLDivElement>(null);

    const itemSelector = useSelector(selectItemSelector);
    const {itemNode, itemType} = itemSelector;

    const {selectorImg, selectedItemTier, itemName} = useDefineSelectorImg();

    const [isItemSelectorShown, setIsItemSelectorShown] = useState(false);
    const [count, setCount] = useState({left: 0, right: 5});

    const selectItemTypeHandler = ({selectedType, selectedNode}: { selectedType: TCraftItemType, selectedNode: TItemNode }) => {
        dispatchAction(profitSliceActions.setSelectedType(selectedType));
        dispatchAction(profitSliceActions.setSelectedNode(selectedNode));
    }

    const selectItemNodeHandler = (selectedNode: TItemNode) => {
        dispatchAction(profitSliceActions.setSelectedNode(selectedNode))
    }

    const selectItemHandler = ({itemType, selectedItem}: { itemType: TCraftItemTypes, selectedItem: ICraftItem }) => {
        const {itemId, artefactItemId, foodConsumption, itemClass, itemName} = selectedItem;

        let journalBodyId = '';

        switch (itemClass) {
            case 'warrior':
                journalBodyId = 'JOURNAL_WARRIOR';
                break;
            case 'hunter':
                journalBodyId = 'JOURNAL_HUNTER';
                break;
            case 'mage':
                journalBodyId = 'JOURNAL_MAGE';
                break;
            case 'toolmaker':
                journalBodyId = 'JOURNAL_TOOLMAKER';
        }

        const journalId = `${journalBodyId}_FULL`;
        const emptyJournalId = `${journalBodyId}_EMPTY`

        dispatchAction(profitSliceActions.setSelected({
            foodConsumption: foodConsumption!,
            type: calculatorType,
            selectedType: itemType,
            selectedItem: itemId,
            itemName: itemName!,
            journalId,
            emptyJournalId,
            artefactId: artefactItemId,
        }));

        const {
            mainMaterialQuantity,
            subMaterialQuantity,
            mainMaterialId,
            subMaterialId
        } = defineMaterials(selectedItem);

        dispatchAction(profitSliceActions.setSelectedMaterials({
            type: calculatorType,
            mainMaterialId,
            subMaterialId
        }));
        dispatchAction(profitSliceActions.setDivFactor({
            type: calculatorType,
            divFactor: mainMaterialQuantity,
            subDivFactor: subMaterialQuantity
        }));
        setIsItemSelectorShown(false)
    }

    useEffect(() => {
        const clickOutsideTypeSelectorHandler = (event: MouseEvent) => {
            if (!event.composedPath().includes(classSelectorRef.current!)) {
                setIsItemSelectorShown(false);
            }
        }

        document.body.addEventListener('click', clickOutsideTypeSelectorHandler);

        return () => {
            document.body.removeEventListener('click', clickOutsideTypeSelectorHandler);
        };
    }, []);

    const srcRoute = 'https://render.albiononline.com/v1/item/';

    //alt атрибуты при заполнении поломают верстку в случае срабатывания!
    return (
        <div className={styles.wrapper}>
            <p>{calculatorFormStrings.type}</p>
            <div className={styles.itemTypeSelector}
                 ref={classSelectorRef}
                 onClick={() => {
                     setIsItemSelectorShown(prevState => !prevState);
                     dispatchAction(interfaceSliceActions.toggleCraftTableVisibility(true));
                 }}
            >
                <img
                    className={styles.backgroundSkeleton}
                    title={`${itemName?.[selectedLanguage]} ${selectedItemTier}`}
                    src={selectorImg}
                    alt=""

                />
                {isItemSelectorShown && <img
                    src={arrowRight} alt=''
                    style={{width: '11px', height: '50px', marginLeft: '64px', marginTop: '6px', position: "absolute"}}
                />}
                <div
                    className={isItemSelectorShown ? styles.itemTypeButtonSelector : styles.itemTypeButtonSelectorHidden}
                >
                    <img
                        src={leftSwipeButton}
                        alt=""
                        style={{height: '50px', width: '11px', marginBottom: '8px'}}
                        onClick={(event) => {
                            event.stopPropagation();
                            if (count.left > 0) {
                                setCount({left: count.left - 1, right: count.right - 1})
                                if (mainNodesItems[count.right - 1].itemType === itemType) {
                                    selectItemTypeHandler({
                                        selectedType: mainNodesItems[count.right - 2].itemType!,
                                        selectedNode: mainNodesItems[count.right - 2].itemNode!,
                                    })
                                }
                            }
                        }}
                    />
                    {/*селектор ветки вещей*/}
                    {mainNodesItems.sort((a, b) => a.index - b.index).map((itemForTypeSelect) => {
                        return <span
                            style={{display: `${itemForTypeSelect.index >= count.left && itemForTypeSelect.index < count.right ? '' : 'none'}`}}
                            key={itemForTypeSelect.itemId}
                            title={itemForTypeSelect.itemType}
                            onClick={(event) => {
                                event.stopPropagation();
                                selectItemTypeHandler({
                                    selectedType: itemForTypeSelect.itemType!,
                                    selectedNode: itemForTypeSelect.itemNode!,
                                })
                            }}
                        >
                        <img
                            className={styles.backgroundSkeleton}
                            src={`${srcRoute}${selectedItemTier}_${itemForTypeSelect.itemId}`}
                            alt=''
                        />

                            <div className={styles.itemNodeButtonSelector}>
                            {itemForTypeSelect.itemType === itemType &&
                                <img
                                    src={arrowDown}
                                    alt=''
                                    style={{width: '50px', height: '11px', marginLeft: '7px'}}
                                />}
                                {itemTypeKeys.map(itemTypeKey => craftItems[itemTypeKey].map((itemForNodeSelect) => {
                                    let itemBodyId: string;
                                    if ((itemTypeKey === 'BAG' && itemForNodeSelect.itemId !== 'INSIGHT') || itemTypeKey === 'CAPE') {
                                        itemBodyId = itemForNodeSelect.itemId;
                                    } else {
                                        itemBodyId = `${itemTypeKey}_${itemForNodeSelect.itemId}`
                                    }
                                    return itemForTypeSelect.itemType === itemForNodeSelect.itemType && !!itemForNodeSelect.itemExample &&
                                        <div
                                            key={`${selectedItemTier}_${itemBodyId}`}
                                            style={{
                                                display: `${itemForNodeSelect.itemType !== itemType ? 'none' : 'flex'}`,
                                            }}
                                        >
                                            <div
                                                title={itemForNodeSelect.itemNode}
                                                onClick={(event) => {
                                                    selectItemNodeHandler(itemForNodeSelect.itemNode!)
                                                    event.stopPropagation();
                                                }}>
                                                <img
                                                    className={styles.backgroundSkeleton}
                                                    src={`${srcRoute}${selectedItemTier}_${itemBodyId}`}
                                                    alt=""
                                                />
                                            </div>
                                            {itemForNodeSelect.itemNode === itemNode &&
                                                <img src={arrowRight} alt="" style={{
                                                    width: '11px',
                                                    height: '50px',
                                                    marginTop: '6px'
                                                }}/>}

                                            {/*селектор определенной вещи*/}
                                            {itemTypeKeys.map(itemTypeKey => craftItems[itemTypeKey].map(itemToSelect => {
                                                let imgHref: string;
                                                if ((itemTypeKey === 'BAG' && itemToSelect.itemId !== 'INSIGHT') || itemTypeKey === 'CAPE') {
                                                    imgHref = itemToSelect.itemId;
                                                } else {
                                                    imgHref = `${itemTypeKey}_${itemToSelect.itemId}`;
                                                }
                                                return itemToSelect.itemNode === itemForNodeSelect.itemNode && itemToSelect.itemType === itemForNodeSelect.itemType && !itemToSelect.itemId.includes('ROYAL') && (

                                                    <span
                                                        key={`${itemTypeKey}_${itemToSelect.itemId}`}
                                                        style={{display: `${itemToSelect.itemNode !== itemNode ? 'none' : 'initial'}`}}
                                                        title={itemToSelect.itemName?.[selectedLanguage]}
                                                        onClick={(event) => {
                                                            event.stopPropagation()
                                                            selectItemHandler({
                                                                itemType: itemTypeKey,
                                                                selectedItem: itemToSelect,
                                                            })
                                                        }}
                                                    >
                                                        <img
                                                            className={styles.backgroundSkeleton}
                                                            src={`${srcRoute}${selectedItemTier}_${imgHref}`}
                                                            alt=""
                                                        />
                                                    </span>
                                                )
                                            }))}
                                        </div>
                                }))}
                        </div>
                    </span>
                    })}
                    <img
                        src={rightSwipeButton}
                        alt=""
                        style={{height: '50px', width: '11px', marginBottom: '8px'}}
                        onClick={(event) => {
                            event.stopPropagation();
                            if (count.left < 3) {
                                setCount({left: count.left + 1, right: count.right + 1})
                                if (mainNodesItems[count.left].itemType === itemType) {
                                    selectItemTypeHandler({
                                        selectedType: mainNodesItems[count.left + 1].itemType!,
                                        selectedNode: mainNodesItems[count.left + 1].itemNode!,
                                    })
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ItemSelector;