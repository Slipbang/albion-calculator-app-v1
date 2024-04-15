import {mainNodesItems} from "../../../MainNodesItems/mainNodesItems";
import {
    arrowRight,
    leftSwipeButton,
    rightSwipeButton
} from "../../../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";
import {TCraftItemType, TItemNode} from "../../../../../../../types/craftItemsType";
import {profitSliceActions} from "../../../../../../../store/profit/profit-slice";
import {useAppDispatch} from "../../../../../../../store";
import styles from './ItemTypeSelector.module.scss'
import {useDefineSelectorImg} from "../../../Hooks/useDefineSelectorImg";
import ItemNodeSelector from "./ItemNodeSelector/ItemNodeSelector";
import {useSelector} from "react-redux";
import SwipeButton from "./SwipeButton/SwipeButton";
import {selectSwiperCount} from "../../../../../../../store/interface/interface-selector";
import {srcRoute} from "../../../../../../../store/api/api";


const ItemTypeSelector = () => {

    const dispatchAction = useAppDispatch();

    const count = useSelector(selectSwiperCount);

    const {selectedItemTier} = useDefineSelectorImg();

    const selectItemTypeHandler = ({selectedType, selectedNode}: { selectedType: TCraftItemType, selectedNode: TItemNode }) => {
        dispatchAction(profitSliceActions.setSelectedType(selectedType));
        dispatchAction(profitSliceActions.setSelectedNode(selectedNode));
    }

    return (
        <>
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
                <SwipeButton
                    swipeButtonImage={leftSwipeButton}
                    isLeft={true}
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

                             <ItemNodeSelector
                                 typeOfTypeSelector={itemForTypeSelect.itemType!}
                                 selectedItemTier={selectedItemTier}
                             />
                    </span>
                    )
                })}

                <SwipeButton
                    swipeButtonImage={rightSwipeButton}
                    isLeft={false}
                />
            </div>
        </>
    )
}

export default ItemTypeSelector;