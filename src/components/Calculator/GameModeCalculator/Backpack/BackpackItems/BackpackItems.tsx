import StyledThumb from "../../../StyledComponentsCommon/StyledThumb";
import React, {useCallback, useState} from "react";
import {useAppDispatch} from "../../../../../store";
import {useSelector} from "react-redux";
import {selectBackpackItems} from "../../../../../store/GMProfit/gm-profit-selectors";
import {GMProfitSliceActions} from "../../../../../store/GMProfit/gm-profit-slice";
import styles from './BackpackItems.module.scss';
import BackpackCell from "./BackpackCell/BackpackCell";
import {Tooltip} from "react-tooltip";
import {IBagCell} from "../../../../../store/Items/workBenchSelectorItems_marketItems";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import StyledBackpackButton from "../BackpackSC/StyledBackpackButton";
import {backpackFastSell, backpackFastSellHovered} from "../BackpackImgReexports/BackpackImgReexports";

export interface ITooltipData {
    item: null | IBagCell;
    index: null | number;
}

const BackpackItems = () => {

    const dispatchAction = useAppDispatch();

    const backpackItems = useSelector(selectBackpackItems);

    const [touchedItemIndex, setTouchedItemIndex] = useState<number | null>(null);
    const [tooltipData, setTooltipData] = useState<ITooltipData>({item: null, index: null})

    const handleDragStart = useCallback((event: React.DragEvent<HTMLDivElement>, dragItemIndex: number) => {
        setTouchedItemIndex(dragItemIndex);
    }, []);

    const handleDrag = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, [setTouchedItemIndex]);

    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>, dropItemIndex: number, isShiftPressed: boolean) => {
        event.preventDefault();

        dispatchAction(GMProfitSliceActions.swapItems({
            dragItemIndex: touchedItemIndex!,
            dropItemIndex: dropItemIndex,
            isShiftPressed
        }));
    }, [touchedItemIndex])

    const openMarket = (item: IBagCell, index: number) => {
        const selectedMarketItem: IBagCell = {
            ...item,
            itemIndex: index,
        }
        dispatchAction(GMProfitSliceActions.setMarketTypeAction('sell'));
        dispatchAction(interfaceSliceActions.resetMarketMenuSelectors());
        dispatchAction(GMProfitSliceActions.setSelectedMarketItem(selectedMarketItem));
        dispatchAction(interfaceSliceActions.setMarketItemVisibility(true));
    }

    return (
        <StyledThumb>
            <div className={styles.wrapper}>
                {backpackItems.map((item, index) => {

                    return (
                        <BackpackCell
                            key={index}
                            item={item}
                            index={index}
                            handleDragStart={handleDragStart}
                            handleDrag={handleDrag}
                            onDrop={onDrop}
                            setTooltipData={setTooltipData}
                        />
                    )
                })}
            </div>
            <Tooltip
                id='backpack-item-tooltip-data-html'
                clickable
                offset={5}
                style={{
                    backgroundColor: "transparent",
                    zIndex: 9999,
                }}
            >
                <StyledBackpackButton
                    $image={backpackFastSell}
                    $hoveredImage={backpackFastSellHovered}
                    onClick={() => openMarket(tooltipData.item!, tooltipData.index!)}
                >продать</StyledBackpackButton>
            </Tooltip>
        </StyledThumb>
    )
}

export default BackpackItems;