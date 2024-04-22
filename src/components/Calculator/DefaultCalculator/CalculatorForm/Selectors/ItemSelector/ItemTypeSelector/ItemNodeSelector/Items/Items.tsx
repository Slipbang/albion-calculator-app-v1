import {craftItems} from "../../../../../../../../../store/Items/craftItems";
import React from "react";
import {ICraftItem, TCraftObjectTypes, TItemNode} from "../../../../../../../../../types/craftItemsType";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../../../../../../store/language/language-selector";
import {profitSliceActions} from "../../../../../../../../../store/profit/profit-slice";
import {defineMaterials} from "../../../../../../../Definers/defineMaterials";
import {useAppDispatch} from "../../../../../../../../../store";
import {selectCalculatorType} from "../../../../../../../../../store/interface/interface-selector";
import {selectItemNode, selectItemType} from "../../../../../../../../../store/profit/profit-selectors";
import {arrowRight} from "../../../../../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";
import {interfaceSliceActions} from "../../../../../../../../../store/interface/interface-slice";
import styles from './Items.module.scss'
import {srcRoute} from "../../../../../../../../../store/api/api";
import {defineDivisionsFactors} from "../../../../../../../Definers/defineDivisionsFactors";

const objectTypeKeys = Object.keys(craftItems) as TCraftObjectTypes[];

interface IItemsProps {
    selectedItemTier: string;
    itemNodeOfNodeSelector: TItemNode;
    imgLoaderBackground: string;
}

const Items = (props: IItemsProps) => {
    const {selectedItemTier, itemNodeOfNodeSelector, imgLoaderBackground} = props;
    const dispatchAction = useAppDispatch();

    const {selectedLanguage} = useSelector(selectLanguage);
    const calculatorType = useSelector(selectCalculatorType);

    const itemNode = useSelector(selectItemNode);
    const itemType = useSelector(selectItemType);

    const selectItemHandler = ({itemType, item}: { itemType: TCraftObjectTypes, item: ICraftItem }) => {
        const {itemId, artefactItemId, foodConsumption, itemClass, itemName} = item;

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
        const emptyJournalId = `${journalBodyId}_EMPTY`;

        dispatchAction(interfaceSliceActions.toggleItemSelectorVisibility(false));

        dispatchAction(profitSliceActions.setSelected({
            type: calculatorType,
            selectedItem: {
                selectedItemType: itemType,
                foodConsumption: foodConsumption!,
                selectedItemBodyId: itemId!,
                journalId,
                emptyJournalId,
                artefactId: artefactItemId,
                itemName: itemName!,
            },
        }));

        const {
            mainMaterialQuantity,
            subMaterialQuantity,
            mainMaterialId,
            subMaterialId
        } = defineMaterials(item);

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
    }

    return (
        <>
            {itemNodeOfNodeSelector === itemNode &&
                <>
                    <img
                        src={arrowRight}
                        alt=""
                        style={{
                            width: '11px',
                            height: '50px',
                            marginTop: '6px'
                    }}
                    />
                    {objectTypeKeys.map(itemTypeKey => craftItems[itemTypeKey].map(itemToSelect => {
                        const {mainDiv, subDiv} = defineDivisionsFactors(itemToSelect);

                        let imgHref: string;
                        if ((itemTypeKey === 'BAG' && itemToSelect.itemId !== 'INSIGHT') || itemTypeKey === 'CAPE') {
                            imgHref = itemToSelect.itemId!;
                        } else {
                            imgHref = `${itemTypeKey}_${itemToSelect.itemId}`;
                        }

                        return itemToSelect.itemNode === itemNode && itemToSelect.itemType === itemType && !itemToSelect.itemId!.includes('ROYAL') && (
                            <div
                                key={`${itemTypeKey}_${itemToSelect.itemId}`}
                                className={styles.item}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    selectItemHandler({
                                        itemType: itemTypeKey,
                                        item: itemToSelect,
                                    })
                                }}
                            >
                                <img
                                    title={itemToSelect.itemName?.[selectedLanguage]}
                                    className={imgLoaderBackground}
                                    src={`${srcRoute}${selectedItemTier}_${imgHref}`}
                                    alt=""
                                />
                                <div>
                                    <p>{mainDiv}/{subDiv}</p>
                                </div>
                            </div>
                        )
                    }))}
                </>}
        </>
    )
}

export default Items;