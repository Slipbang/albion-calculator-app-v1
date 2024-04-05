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
import {srcRoute} from "../../../../../../../../../store/api/api";

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

    const selectItemHandler = ({itemType, selectedItem}: { itemType: TCraftObjectTypes, selectedItem: ICraftItem }) => {
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
        const emptyJournalId = `${journalBodyId}_EMPTY`;

        dispatchAction(interfaceSliceActions.toggleItemSelectorVisibility(false));

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
    }

    return (
        <>
            {itemNodeOfNodeSelector === itemNode &&
                <>
                    <img src={arrowRight}
                         alt=""
                         style={{
                             width: '11px',
                             height: '50px',
                             marginTop: '6px'
                         }}
                    />
                    {objectTypeKeys.map(itemTypeKey => craftItems[itemTypeKey].map(itemToSelect => {
                        let imgHref: string;
                        if ((itemTypeKey === 'BAG' && itemToSelect.itemId !== 'INSIGHT') || itemTypeKey === 'CAPE') {
                            imgHref = itemToSelect.itemId;
                        } else {
                            imgHref = `${itemTypeKey}_${itemToSelect.itemId}`;
                        }
                        return itemToSelect.itemNode === itemNode && itemToSelect.itemType === itemType && !itemToSelect.itemId.includes('ROYAL') && (
                            <img
                                key={`${itemTypeKey}_${itemToSelect.itemId}`}
                                title={itemToSelect.itemName?.[selectedLanguage]}
                                className={imgLoaderBackground}
                                src={`${srcRoute}${selectedItemTier}_${imgHref}`}
                                alt=""
                                onClick={(event) => {
                                    event.stopPropagation();
                                    selectItemHandler({
                                        itemType: itemTypeKey,
                                        selectedItem: itemToSelect,
                                    })
                                }}
                            />
                        )
                    }))}
                </>}
        </>
    )
}

export default Items;