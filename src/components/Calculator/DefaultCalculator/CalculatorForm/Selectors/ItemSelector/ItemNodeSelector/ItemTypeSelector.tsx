import {mainNodesItems} from "../../../MainNodesItems/mainNodesItems";
import {
    arrowRight,
    leftSwipeButton,
    rightSwipeButton
} from "../../../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";
import React, {useState} from "react";
import {TCraftItemType, TItemNode} from "../../../../../../../types/craftItemsType";
import {profitSliceActions} from "../../../../../../../store/profit/profit-slice";
import {useAppDispatch} from "../../../../../../../store";
import {useSelector} from "react-redux";
import styles from './ItemTypeSelector.module.scss'
import {useDefineSelectorImg} from "../../../Hooks/useDefineSelectorImg";
import {selectItemType} from "../../../../../../../store/profit/profit-selectors";
import ItemNodeSelector from "./ItemNodeSelector/ItemNodeSelector";


const ItemTypeSelector = () => {

    const dispatchAction = useAppDispatch();

    const itemType = useSelector(selectItemType);

    const [count, setCount] = useState({left: 0, right: 5});

    const {selectedItemTier} = useDefineSelectorImg();

    const selectItemTypeHandler = ({selectedType, selectedNode}: { selectedType: TCraftItemType, selectedNode: TItemNode }) => {
        dispatchAction(profitSliceActions.setSelectedType(selectedType));
        dispatchAction(profitSliceActions.setSelectedNode(selectedNode));
    }


    const srcRoute = 'https://render.albiononline.com/v1/item/';

    return <>
        <img
            alt=''
            src={arrowRight}
            style={{
                width: '11px',
                height: '50px',
                marginLeft: '64px',
                marginTop: '6px',
                position: "absolute"
            }}
        />
        <div className={styles.itemTypeButtonSelector}>
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
                return (
                    <span
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
                            className={styles.imgLoaderBackground}
                            src={`${srcRoute}${selectedItemTier}_${itemForTypeSelect.itemId}`}
                            alt=''
                        />

                        {itemForTypeSelect.itemType === itemType &&
                            <ItemNodeSelector
                                typeOfTypeSelector={itemForTypeSelect.itemType!}
                                selectedItemTier={selectedItemTier}
                            />}
                    </span>
                )
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
    </>
}

export default ItemTypeSelector;