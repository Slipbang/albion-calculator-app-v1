import {mainNodesItems} from "../../../../MainNodesItems/mainNodesItems";
import React from "react";
import {TCraftItemType, TItemNode} from "../../../../../../../../types/craftItemsType";
import {profitSliceActions} from "../../../../../../../../store/profit/profit-slice";
import {useAppDispatch} from "../../../../../../../../store";
import {useSelector} from "react-redux";
import {selectItemType} from "../../../../../../../../store/profit/profit-selectors";
import {selectSwiperCount} from "../../../../../../../../store/interface/interface-selector";
import {interfaceSliceActions} from "../../../../../../../../store/interface/interface-slice";

interface ISwipeButtonProps {
    swipeButtonImage: string;
    isLeft: boolean
}

const SwipeButton = (props: ISwipeButtonProps) => {
    const {swipeButtonImage, isLeft} = props;

    const {left, right} = useSelector(selectSwiperCount);

    const dispatchAction = useAppDispatch();

    const itemType = useSelector(selectItemType);

    const selectItemTypeHandler = ({
                                       selectedType,
                                       selectedNode
                                   }: { selectedType: TCraftItemType, selectedNode: TItemNode }) => {
        dispatchAction(profitSliceActions.setSelectedType(selectedType));
        dispatchAction(profitSliceActions.setSelectedNode(selectedNode));
    }

    const handle = () => {
        if (isLeft ? left > 0 : left < 3){
            dispatchAction(interfaceSliceActions.setSwiperCount({isLeft}));

            if (mainNodesItems[isLeft ? (+right-1) : +left].itemType === itemType) {
                selectItemTypeHandler({
                    selectedType: mainNodesItems[isLeft ? (+right - 2) : (+left + 1)].itemType!,
                    selectedNode: mainNodesItems[isLeft ? (+right - 2) : (+left + 1)].itemNode!,
                })
            }
        }

    }

    return (
        <img
            src={swipeButtonImage}
            alt=""
            style={{height: '50px', width: '11px', marginBottom: '7px'}}
            onClick={(event) => {
                event.stopPropagation();
                handle();
            }}
        />
    )
}

export default SwipeButton;