import React from "react";
import {ICraftItem, TCraftObjectTypes, TItemNode, TItems} from "../../../../../../../../../types/craftItemsType";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../../../../../../store/language/language-selector";
import {profitSliceActions} from "../../../../../../../../../store/profit/profit-slice";
import {defineMaterials} from "../../../../../../../Definers/defineMaterials";
import {useAppDispatch} from "../../../../../../../../../store";
import {
    selectCalculatorType, selectInterfaceLanguageData,
} from "../../../../../../../../../store/interface/interface-selector";
import {selectItemNode, selectItemType} from "../../../../../../../../../store/profit/profit-selectors";
import {arrowRight} from "../../../../../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";
import {interfaceSliceActions} from "../../../../../../../../../store/interface/interface-slice";
import styles from './Items.module.scss'
import {srcRoute} from "../../../../../../../../../store/api/api";
import {defineDivisionsFactors} from "../../../../../../../Definers/defineDivisionsFactors";
import {TCalcProps} from "../../../../../../../../../types/calculatorPropsType";

interface IItemsProps {
    selectedItemTier: string;
    itemNodeOfNodeSelector: TItemNode;
    imgLoaderBackground: string;
    craftItems: TItems;
    objectTypeKeys: TCraftObjectTypes[]
}

const Items = (props: IItemsProps) => {
    const {selectedItemTier, itemNodeOfNodeSelector, imgLoaderBackground, craftItems, objectTypeKeys,} = props;
    const dispatchAction = useAppDispatch();

    const {selectedLanguage} = useSelector(selectLanguage);
    const calculatorType = useSelector(selectCalculatorType);

    const itemNode = useSelector(selectItemNode);
    const itemType = useSelector(selectItemType);

    const languageData = useSelector(selectInterfaceLanguageData);
    const getItemName = (itemId: string) => languageData[itemId];

    const selectItemHandler = ({itemType, item}: { itemType: TCraftObjectTypes, item: ICraftItem }) => {
        const {itemId, artefactItemId, foodConsumption, itemClass} = item;

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

        const selectedItemId = ((itemType === 'BAG' && itemId !== 'INSIGHT') || itemType === 'CAPE')
            ? `${selectedItemTier}_${itemId}`
            : `${selectedItemTier}_${itemType}_${itemId}`;

        dispatchAction(profitSliceActions.setSelected({
            type: calculatorType,
            selectedItem: {
                selectedItemType: itemType,
                selectedItemId,
                foodConsumption: foodConsumption!,
                journalId,
                emptyJournalId,
                artefactId: artefactItemId,
            },
        }));

        const {
            mainMaterialQuantity,
            subMaterialQuantity,
            mainMaterialId,
            subMaterialId
        } = defineMaterials(item);

        dispatchAction(profitSliceActions.setSelectedMaterials({
            calculatorType: calculatorType as Extract<TCalcProps, 'ITEMS' | 'RESOURCES'>,
            mainMaterialId: `${selectedItemTier}_${mainMaterialId}`,
            subMaterialId: !!subMaterialId ? `${selectedItemTier}_${subMaterialId}` : undefined,
        }));
        dispatchAction(profitSliceActions.setDivFactor({
            type: calculatorType as Extract<TCalcProps, 'ITEMS' | 'RESOURCES'>,
            divFactor: mainMaterialQuantity,
            subDivFactor: subMaterialQuantity,
        }));
    }

    return (
        <>
            {itemNodeOfNodeSelector === itemNode && (
                <>
                    <img
                        src={arrowRight}
                        alt=""
                        style={{
                            width: '11px',
                            height: '50px',
                            marginTop: '7px'
                        }}
                    />
                    {objectTypeKeys.map(itemTypeKey => craftItems[itemTypeKey].map(itemToSelect => {
                        const {mainDiv, subDiv} = defineDivisionsFactors(itemToSelect);

                        let completedItemId: string;
                        if ((itemTypeKey === 'BAG' && itemToSelect.itemId !== 'INSIGHT') || itemTypeKey === 'CAPE') {
                            completedItemId = itemToSelect.itemId!;
                        } else {
                            completedItemId = `${itemTypeKey}_${itemToSelect.itemId}`;
                        }

                        const itemName = getItemName(`${selectedItemTier}_${completedItemId}`)

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
                                    title={itemName?.[selectedLanguage]}
                                    className={imgLoaderBackground}
                                    src={`${srcRoute}${selectedItemTier}_${completedItemId}`}
                                    alt=""
                                />
                                <div>
                                    <p>{mainDiv}/{subDiv}</p>
                                </div>
                            </div>
                        )
                    }))}
                </>
            )}
        </>
    )
}

export default Items;