import {craftItems} from "../../../../../../../../store/Items/craftItems";
import {arrowDown} from "../../../../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";
import React from "react";
import {TCraftObjectTypes, TItemNode} from "../../../../../../../../types/craftItemsType";
import styles from './ItemNodeSelector.module.scss';
import {profitSliceActions} from "../../../../../../../../store/profit/profit-slice";
import {useAppDispatch} from "../../../../../../../../store";
import Items from "./Items/Items";
import {useSelector} from "react-redux";
import {selectItemType} from "../../../../../../../../store/profit/profit-selectors";

const objectTypeKeys = Object.keys(craftItems) as TCraftObjectTypes[];

interface IItemNodeSelectorProps {
    typeOfTypeSelector: string;
    selectedItemTier: string;
}

const ItemNodeSelector = (props: IItemNodeSelectorProps) => {
    const {typeOfTypeSelector, selectedItemTier} = props;
    const dispatchAction = useAppDispatch();

    const itemType = useSelector(selectItemType);

    const selectItemNodeHandler = (selectedNode: TItemNode) => {
        dispatchAction(profitSliceActions.setSelectedNode(selectedNode))
    }


    const srcRoute = 'https://render.albiononline.com/v1/item/';

    return (
        <>
            {typeOfTypeSelector === itemType && <div className={styles.itemNodeButtonSelector}>
                <img
                    src={arrowDown}
                    alt=''
                    style={{width: '50px', height: '11px', marginLeft: '7px'}}
                />
                {objectTypeKeys.map(itemTypeKey => craftItems[itemTypeKey].map((itemForNodeSelect) => {
                    let itemBodyId: string;
                    if ((itemTypeKey === 'BAG' && itemForNodeSelect.itemId !== 'INSIGHT') || itemTypeKey === 'CAPE') {
                        itemBodyId = itemForNodeSelect.itemId;
                    } else {
                        itemBodyId = `${itemTypeKey}_${itemForNodeSelect.itemId}`
                    }

                    return typeOfTypeSelector === itemForNodeSelect.itemType && !!itemForNodeSelect.itemExample &&
                        <div
                            key={`${selectedItemTier}_${itemBodyId}`}
                            style={{display: 'flex'}}
                            onClick={event => event.stopPropagation()}
                        >
                            <img
                                className={styles.imgLoaderBackground}
                                src={`${srcRoute}${selectedItemTier}_${itemBodyId}`}
                                alt=""
                                title={itemForNodeSelect.itemNode}
                                onClick={(event) => {
                                    selectItemNodeHandler(itemForNodeSelect.itemNode!)
                                    event.stopPropagation();
                                }}
                            />

                            {/*селектор определенной вещи*/}
                            <Items
                                imgLoaderBackground={styles.imgLoaderBackground}
                                itemNodeOfNodeSelector={itemForNodeSelect.itemNode!}
                                selectedItemTier={selectedItemTier}
                            />
                        </div>
                }))}
            </div>}
        </>

    )
}

export default ItemNodeSelector;